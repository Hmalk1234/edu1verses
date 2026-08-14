import { NextRequest, NextResponse } from "next/server";
import { generateContentWithFallback } from "@/lib/gemini";

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  affiliation: string;
  abstract: string;
  arxivId: string;
  category: string;
  doi: string;
  publicationDate: string;
  keywords: string[];
  problemFormulation: string;
  theoreticalFramework: string;
  mathFormulas: {
    name: string;
    latex: string;
    explanation: string;
  }[];
  algorithmPseudoCode: string;
  runnableImplementation: {
    language: string;
    code: string;
    explanation: string;
  };
  ablationExperiments: {
    metric: string;
    baseline: string;
    proposed: string;
    improvement: string;
    p_value?: string;
  }[];
  conclusions: string;
  bibtex: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic, mode, paperId, prompt } = body;

    const systemPrompt = `You are a distinguished Professor of Computer Science, AI Systems Researcher, and Peer Review Editor (IEEE / ACM / NeurIPS / ICML Fellow).
Generate a deep, rigorous, mathematically sound academic research paper synthesis.
Return your response STRICTLY as a valid JSON object without markdown fences, matching this structure:
{
  "id": "paper-slug",
  "title": "Title of the Academic Paper",
  "authors": ["Dr. ...", "Prof. ..."],
  "affiliation": "Institute / AI Lab (e.g., Stanford AI Lab / DeepMind / Akademia Research)",
  "abstract": "Dense, formal academic abstract (200-300 words)...",
  "arxivId": "2608.14921",
  "category": "cs.AI / cs.LG / cs.DC / quant-ph",
  "doi": "10.1145/3719284.372190",
  "publicationDate": "August 2026",
  "keywords": ["Attention Mechanisms", "Mixture of Experts", "Distributed Consensus", "Gradient Sparsification"],
  "problemFormulation": "Rigorous definition of the research bottleneck, mathematical formulation of objective function, and constraints...",
  "theoreticalFramework": "Theoretical foundation, proofs or convergence bounds, architectural innovations...",
  "mathFormulas": [
    {
      "name": "Loss Function / Objective",
      "latex": "\\mathcal{L}_{total} = \\alpha \\mathcal{L}_{task} + \\beta \\sum_{i=1}^N \\Omega(\\theta_i) + \\gamma \\mathcal{D}_{KL}(P \\parallel Q)",
      "explanation": "Detailed mathematical decomposition of terms, regularizers, and trade-off coefficients."
    },
    {
      "name": "Routing / Gradient Tensor Calculation",
      "latex": "g(x) = \\text{Softmax}\\left(\\text{TopK}\\left(W_g x + \\epsilon, k\\right)\\right) \\cdot \\sum_{j=1}^E e_j(x)",
      "explanation": "Sparse expert gating mechanism with stochastic noise parameter for load balancing."
    }
  ],
  "algorithmPseudoCode": "Algorithm 1: Autonomous Adaptive Optimization\\nInput: Dataset D, learning rate eta, sparsity factor k\\nOutput: Optimal parameters theta*\\n1: Initialize weights theta_0 in R^d\\n2: for each epoch t in 1...T do\\n3:   Compute stochastic gradients nabla L(theta_t)\\n4:   Apply dynamic gradient clipping and adaptive preconditioning\\n5:   Update parameter vector theta_{t+1} <- theta_t - eta * H^-1 nabla L\\n6: end for\\n7: return theta*",
  "runnableImplementation": {
    "language": "python",
    "code": "import numpy as np\\nimport torch\\nimport torch.nn as nn\\n\\nclass AdvancedResearchModule(nn.Module):\\n    def __init__(self, d_model=512, n_experts=8, top_k=2):\\n        super().__init__()\\n        self.d_model = d_model\\n        self.n_experts = n_experts\\n        self.top_k = top_k\\n        self.gate = nn.Linear(d_model, n_experts)\\n        self.experts = nn.ModuleList([nn.Sequential(\\n            nn.Linear(d_model, d_model * 4),\\n            nn.GELU(),\\n            nn.Linear(d_model * 4, d_model)\\n        ) for _ in range(n_experts)])\\n\\n    def forward(self, x):\\n        logits = self.gate(x)\\n        weights, indices = torch.topk(torch.softmax(logits, dim=-1), self.top_k, dim=-1)\\n        weights = weights / weights.sum(dim=-1, keepdim=True)\\n        out = torch.zeros_like(x)\\n        for i in range(self.top_k):\\n            idx = indices[:, :, i]\\n            w = weights[:, :, i:i+1]\\n            for e_idx in range(self.n_experts):\\n                mask = (idx == e_idx)\\n                if mask.any():\\n                    out[mask] += w[mask] * self.experts[e_idx](x[mask])\\n        return out",
    "explanation": "High-performance vectorized implementation with memory-efficient sparse top-k routing."
  },
  "ablationExperiments": [
    {
      "metric": "MMLU Benchmark Score (%)",
      "baseline": "84.2%",
      "proposed": "91.8%",
      "improvement": "+7.6%",
      "p_value": "< 0.001"
    },
    {
      "metric": "Inference Latency (ms/token)",
      "baseline": "34.5 ms",
      "proposed": "11.2 ms",
      "improvement": "-67.5%",
      "p_value": "< 0.005"
    },
    {
      "metric": "GPU VRAM Allocation (GB)",
      "baseline": "48.0 GB",
      "proposed": "18.4 GB",
      "improvement": "-61.6%",
      "p_value": "< 0.01"
    }
  ],
  "conclusions": "Comprehensive summary of empirical findings, theoretical implications, and future research vectors...",
  "bibtex": "@article{akademia2026,\\n  title={...},\\n  author={...},\\n  journal={IEEE Transactions on Neural Systems and AI},\\n  year={2026}\\n}"
}`;

    const userPrompt = `Generate an in-depth academic paper analysis and full paper artifact for:
Topic / Field: ${topic || "Next-Generation Mixture of Sparse Latent Transformers with Sub-Quadratic Attention"}
Mode: ${mode || "generate"}
Specific User Constraints: ${prompt || "Produce an end-to-end peer-reviewed caliber paper with detailed mathematical rigor, formulas, pseudocode, PyTorch implementation, and ablation benchmarks."}`;

    const response = await generateContentWithFallback({
      contents: [
        { role: "user", parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }
      ],
      config: {
        responseMimeType: "application/json",
        temperature: 0.3
      }
    });

    const text = response.text || "{}";
    const parsedData = JSON.parse(text);

    return NextResponse.json({ success: true, paper: parsedData });
  } catch (error: any) {
    console.error("Research paper generation error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to generate academic research paper."
      },
      { status: 500 }
    );
  }
}
