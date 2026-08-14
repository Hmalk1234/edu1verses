import { NextRequest, NextResponse } from "next/server";
import { generateContentWithFallback } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      topic,
      architectureNodes,
      connections,
      capacityStats,
      userQuestion,
      chaosScenario
    } = body;

    const systemPrompt = `You are a World-Class Principal Distributed Systems Architect and Senior Staff Engineering Assessor.
You evaluate distributed system architectures with technical depth, rigorous engineering discipline, and professional composure.
Aspects evaluated:
1. High Availability (HA) & Disaster Recovery (Active-Active multi-region, quorum consensus, automated failover)
2. Scalability & Throughput (Horizontal sharding, consistent hashing, Read/Write splitting, CQRS, backpressure)
3. Latency & Caching (Multi-tier cache hierarchy: in-memory L1, distributed Redis Cluster L2, edge CDN, probabilistic early expiration)
4. Data Consistency & Storage (CAP Theorem trade-offs, ACID vs BASE, Saga pattern, WAL, write amplification)
5. Chaos Resiliency & Single Points of Failure (Rate limiters, circuit breakers, bulkheads, graceful degradation)

Tone and phrasing requirements:
- Use formal, articulate, polite, and precise engineering terminology.
- Provide constructive, actionable recommendations and clear risk assessments.

Return your response strictly as a JSON object with this format:
{
  "score": 92,
  "overallVerdict": "Staff Engineer Level Architecture with exceptional fault-tolerance and clear trade-off justification.",
  "strengths": [
    "Used consistent hashing with virtual nodes to avoid hot partition hotspots.",
    "Integrated asynchronous event broker (Kafka) to decouple ingestion from analytics processing."
  ],
  "weaknessesAndSPOFs": [
    "Database write replica master is a single point of failure without automated Raft/Paxos consensus failover.",
    "Cache invalidation strategy lacks probabilistic early expiration, risking cache stampede during traffic spikes."
  ],
  "detailedRubric": {
    "scalability": { "score": 9, "feedback": "Easily handles 500k+ QPS with tiered read-replicas and distributed caching." },
    "faultTolerance": { "score": 8, "feedback": "Circuit breakers present, but needs multi-AZ failover automation." },
    "dataConsistency": { "score": 9, "feedback": "Saga pattern effectively maintains eventual consistency across distributed services." },
    "costOptimization": { "score": 8, "feedback": "Hot/Cold tiering in S3 reduces long-term storage expenditure by 42%." }
  },
  "capacityAnalysis": {
    "estimatedQpsLimit": "650,000 requests/sec",
    "storageThroughput": "4.2 GB/sec continuous write",
    "ramRequired": "2.4 TB Redis Cluster",
    "recommendations": "Add an ingress Envoy API gateway with token bucket rate limiting at the edge."
  },
  "chaosSimulationVerdict": {
    "scenarioTested": "${chaosScenario || "Regional Datacenter Outage + 10x Flash Spike"}",
    "survivalStatus": "SURVIVED_WITH_DEGRADATION",
    "degradationDetails": "Read queries served seamlessly from cached edge nodes; write latency increased from 14ms to 85ms while consensus leader election completed in 420ms.",
    "mitigationPrescription": "Enable Cross-Region Active-Active DynamoDB/Spanner global tables with conflict-free replicated data types (CRDTs)."
  },
  "interviewerQuestions": [
    "How does your cache handle the 'thundering herd' problem when a viral video finishes encoding?",
    "If the network between Region-A and Region-B is severed for 15 minutes, how do you reconcile concurrent updates?"
  ]
}`;

    const userPrompt = `System Design Topic: ${topic || "Global Low-Latency Video Streaming & Transcoding Pipeline"}
Current Architecture Nodes: ${JSON.stringify(architectureNodes || [])}
Connections & Dataflow: ${JSON.stringify(connections || [])}
Capacity Metrics: ${JSON.stringify(capacityStats || {})}
User Design Notes/Questions: ${userQuestion || "Analyze this architecture for 100M DAU scale, highlight critical bottlenecks and simulate a 50x flash traffic surge."}`;

    const response = await generateContentWithFallback({
      contents: [
        { role: "user", parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }
      ],
      config: {
        responseMimeType: "application/json",
        temperature: 0.2
      }
    });

    const text = response.text || "{}";
    const parsedData = JSON.parse(text);

    return NextResponse.json({ success: true, review: parsedData });
  } catch (error: any) {
    console.error("System design analysis error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to analyze system design architecture."
      },
      { status: 500 }
    );
  }
}
