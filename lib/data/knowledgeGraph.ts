export interface KnowledgeNode {
  id: string;
  label: string;
  courseId?: string;
  category: 'coding' | 'science' | 'engineering' | 'humanities' | 'specialized';
  categoryLabel: string;
  level: 'Fondasi' | 'Menengah' | 'Lanjutan' | 'Mastery';
  description: string;
  coreConcepts: string[];
  prerequisites: string[]; // Node IDs
  unlocks: string[]; // Node IDs
  interdisciplinarySynergy: {
    targetId: string;
    targetName: string;
    relationship: string;
    mathematicalOrTheoreticalLink: string;
  }[];
  realWorldApplication: string;
  estimatedHours: number;
}

export interface KnowledgeLink {
  source: string;
  target: string;
  strength: number; // 1 to 5
  type: 'prerequisite' | 'theoretical-foundation' | 'computational-application' | 'philosophical-interlock';
  label: string;
  description: string;
}

export const KNOWLEDGE_NODES: KnowledgeNode[] = [
  {
    id: 'formal-logic',
    label: 'Logika Formal & Epistemologi',
    courseId: 'philosophy-logic-ethics',
    category: 'humanities',
    categoryLabel: 'Filsafat & Logika',
    level: 'Fondasi',
    description: 'Kalkulus proposisional, logika predikat orde pertama, teori inferensi deduktif, dan analisis epistemik atas justifikasi kebenaran.',
    coreConcepts: ['Propositional Logic', 'First-Order Predicates', 'Truth Tables & Semantic Proofs', 'Gödel Incompleteness Intuition', 'Epistemic Fallacy Detection'],
    prerequisites: [],
    unlocks: ['higher-math', 'cyber-security', 'law-jurisprudence', 'ai-algorithms'],
    interdisciplinarySynergy: [
      {
        targetId: 'higher-math',
        targetName: 'Matematika Tinggi & Aljabar Linier',
        relationship: 'Fondasi Aksiomatik',
        mathematicalOrTheoreticalLink: 'Semua pembuktian teorema kalkulus dan aljabar abstrak dibangun di atas sistem inferensi logika formal (Modus Ponens, Pembuktian Kontradiksi Reductio ad Absurdum).'
      },
      {
        targetId: 'cyber-security',
        targetName: 'Cyber Security & Kriptografi',
        relationship: 'Model Keamanan Formal',
        mathematicalOrTheoreticalLink: 'Verifikasi formal protokol keamanan (Bell-LaPadula, Biba Model) dan Access Control Matrices mengadopsi aljabar logika Boolean dan predikat temporal.'
      },
      {
        targetId: 'law-jurisprudence',
        targetName: 'Ilmu Hukum & Konstitusi',
        relationship: 'Penalaran Silogisme Yudisial',
        mathematicalOrTheoreticalLink: 'Metode penalaran IRAC dan pembuktian asas preferensi hukum mengandalkan silogisme deduktif strictly non-kontradiktif.'
      }
    ],
    realWorldApplication: 'Desain spesifikasi sistem kritis tanpa celah bug (Formal Verification di NASA & Intel), audit argumen konstitusi, dan pembuktian automated theorem proving.',
    estimatedHours: 25
  },
  {
    id: 'higher-math',
    label: 'Kalkulus & Aljabar Linier',
    courseId: 'math-calculus-algebra',
    category: 'science',
    categoryLabel: 'Matematika Murni & Terapan',
    level: 'Fondasi',
    description: 'Kalkulus multivariabel, turunan parsial, ruang vektor $\\mathbb{R}^n$, transformasi linier, dekomposisi matriks (SVD/Eigen), dan kalkulus tensor.',
    coreConcepts: ['Multivariable Gradient & Hessian', 'Eigendecomposition & SVD', 'Vector Spaces & Orthogonality', 'Ordinary Differential Equations (ODE)', 'Tensor Calculus'],
    prerequisites: ['formal-logic'],
    unlocks: ['modern-physics', 'fullstack-web', 'ai-algorithms', 'astrophysics', 'architecture-engineering'],
    interdisciplinarySynergy: [
      {
        targetId: 'modern-physics',
        targetName: 'Fisika Modern & Teori Kuantum',
        relationship: 'Ruang Keadaan Hilbert',
        mathematicalOrTheoreticalLink: 'Keadaan kuantum $|\\psi\\rangle$ dirumuskan sebagai vektor satuan dalam Ruang Hilbert kompleks $\\mathbb{C}^n$, sedangkan observable fisik adalah operator Hermitian.'
      },
      {
        targetId: 'ai-algorithms',
        targetName: 'Algoritma Komputasi & Machine Learning',
        relationship: 'Optimasi Gradient Descent',
        mathematicalOrTheoreticalLink: 'Pelatihan deep neural network menggunakan aturan rantai multivariabel (Backpropagation) dan komputasi tensor dekomposisi matriks pada akselerator GPU.'
      },
      {
        targetId: 'astrophysics',
        targetName: 'Astrofisika & Mekanika Orbit',
        relationship: 'Persamaan Diferensial Gravitasi',
        mathematicalOrTheoreticalLink: 'Mekanika orbit elips Kepler diturunkan dari penyelesaian persamaan diferensial hukum gravitasi universal Newton $\\ddot{\\mathbf{r}} = -\\frac{GM}{r^3}\\mathbf{r}$.'
      }
    ],
    realWorldApplication: 'Pemodelan dinamika fluida aerodinamika pesawat, estimasi risiko keuangan kuantitatif Black-Scholes, dan rendering grafis 3D real-time ray-tracing.',
    estimatedHours: 50
  },
  {
    id: 'modern-physics',
    label: 'Fisika Teoretis & Mekanika Kuantum',
    courseId: 'physics-modern-quantum',
    category: 'science',
    categoryLabel: 'Fisika Teoretis',
    level: 'Lanjutan',
    description: 'Mekanika Lagrangian & Hamiltonian, elektrodinamika Maxwell, relativitas khusus, persamaan Schrödinger, dan superposisi keadaan.',
    coreConcepts: ['Lagrangian Mechanics & Noether Theorem', 'Maxwell Electrodynamics Tensor', 'Time-Dependent Schrödinger Equation', 'Quantum Superposition & Entanglement', 'Special Relativity Lorenz Boosts'],
    prerequisites: ['higher-math'],
    unlocks: ['astrophysics', 'geology-systems', 'cyber-security'],
    interdisciplinarySynergy: [
      {
        targetId: 'astrophysics',
        targetName: 'Astrofisika & Kosmologi Kosmik',
        relationship: 'Fusi Termonuklir & Relativitas Umum',
        mathematicalOrTheoreticalLink: 'Evolusi bintang dan singularitas lubang hitam dianalisis menggunakan persamaan medan Einstein $G_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = \\frac{8\\pi G}{c^4} T_{\\mu\\nu}$.'
      },
      {
        targetId: 'cyber-security',
        targetName: 'Cyber Security & Kriptografi',
        relationship: 'Quantum Cryptography & Shor Algorithm',
        mathematicalOrTheoreticalLink: 'Prinsip ketidakpastian kuantum memungkinkan Quantum Key Distribution (QKD BB84) yang aman secara fisik dari penyadapan (No-Cloning Theorem).'
      }
    ],
    realWorldApplication: 'Perancangan mikroprosesor semikonduktor 2nm EUV, komputasi kuantum superkonduktor, sensor gravitasi atomik, dan fusi nuklir tokamak ITER.',
    estimatedHours: 48
  },
  {
    id: 'fullstack-web',
    label: 'Rekayasa Perangkat Lunak & Sistem Asynchronous',
    courseId: 'web-dev-mastery',
    category: 'coding',
    categoryLabel: 'Software Engineering',
    level: 'Menengah',
    description: 'Arsitektur Event Loop, parsing Critical Rendering Path DOM, state management terdistribusi, Microservices REST/gRPC, dan optimasi performa skala cloud.',
    coreConcepts: ['Event Loop & Microtask Orchestration', 'Virtual DOM & Fiber Tree Reconciler', 'Distributed Caching & Consensus', 'Concurrency & WebSocket Streams', 'CI/CD Pipeline Automation'],
    prerequisites: ['formal-logic', 'higher-math'],
    unlocks: ['cyber-security', 'ai-algorithms'],
    interdisciplinarySynergy: [
      {
        targetId: 'cyber-security',
        targetName: 'Cyber Security & Defensive Hacking',
        relationship: 'Secure Software Development Lifecycle (SSDLC)',
        mathematicalOrTheoreticalLink: 'Mitigasi serangan injeksi, Cross-Origin Resource Sharing (CORS), dan mitigasi Race Condition pada transaksi konkuren di database terdistribusi.'
      }
    ],
    realWorldApplication: 'Infrastruktur aplikasi fintech dengan jutaan TPS, platform video streaming berlatensi rendah, dan portal akademik global.',
    estimatedHours: 42
  },
  {
    id: 'cyber-security',
    label: 'Cyber Security, Kriptografi & Defensive Defense',
    courseId: 'cyber-security-core',
    category: 'coding',
    categoryLabel: 'Security & Cryptography',
    level: 'Lanjutan',
    description: 'Matematika modular, elliptic curve cryptography (ECC), mitigasi OWASP Top 10, arsitektur Zero Trust, reverse engineering malware, dan forensik digital.',
    coreConcepts: ['RSA & Discrete Logarithm Math', 'ECDSA (Elliptic Curve Digital Signature)', 'Zero-Trust Identity Architecture', 'Buffer Overflow & Memory Exploitation', 'Post-Quantum Lattice Cryptography'],
    prerequisites: ['formal-logic', 'higher-math', 'fullstack-web'],
    unlocks: ['law-jurisprudence', 'civics-statecraft'],
    interdisciplinarySynergy: [
      {
        targetId: 'law-jurisprudence',
        targetName: 'Ilmu Hukum & Regulasi Digital',
        relationship: 'Kedaulatan Data & Bukti Digital (Digital Evidence)',
        mathematicalOrTheoreticalLink: 'Validitas alat bukti digital dalam peradilan pidana mensyaratkan integritas rantai bukti (Chain of Custody) berbasis kriptografi hash SHA-256 dan regulasi UU PDP / GDPR.'
      }
    ],
    realWorldApplication: 'Sistem pengamanan perbankan sentral SWIFT, infrastruktur pertahanan siber militer, dan autentikasi desentralisasi Web3.',
    estimatedHours: 38
  },
  {
    id: 'astrophysics',
    label: 'Astrofisika, Dinamika Bintang & Kosmologi',
    courseId: 'astronomy-astrophysics-space',
    category: 'science',
    categoryLabel: 'Ilmu Antariksa',
    level: 'Mastery',
    description: 'Hukum orbit Kepler-Newton, spektroskopi bintang, Keseimbangan Hidrostatis, batas Chandrasekhar, relativitas umum lubang hitam, dan metrik FLRW.',
    coreConcepts: ['Hydrostatic Stellar Equilibrium ODE', 'Kepler Orbital Mechanics & Vis-Viva', 'Chandrasekhar Limit Derivation', 'Schwarzschild Metric Event Horizon', 'Dark Energy & Cosmic Inflation'],
    prerequisites: ['higher-math', 'modern-physics'],
    unlocks: ['geology-systems'],
    interdisciplinarySynergy: [
      {
        targetId: 'geology-systems',
        targetName: 'Geologi Dinamis & Planetologi Komparatif',
        relationship: 'Diferensiasi Inti Planet & Siklus Radiogenik',
        mathematicalOrTheoreticalLink: 'Evolusi geodinamika kerak bumi dibandingkan dengan interior planet batuan Mars dan Venus menggunakan termodinamika pendinginan peluruhan isotop radioaktif.'
      }
    ],
    realWorldApplication: 'Navigasi satelit GNSS/GPS dengan koreksi dilatasi waktu relativistik, desain lintasan wahana antariksa interplanetary, dan teleskop radio interferometer.',
    estimatedHours: 36
  },
  {
    id: 'architecture-engineering',
    label: 'Arsitektur, Desain Spasial & Rekayasa Bangunan',
    courseId: 'architecture-spatial-design',
    category: 'engineering',
    categoryLabel: 'Arsitektur & Rekayasa',
    level: 'Menengah',
    description: 'Tektonika struktur statis, mekanika beban gempa, analisis pencahayaan pasif tropis, termodinamika efek cerobong, dan integrasi BIM Net-Zero.',
    coreConcepts: ['Structural Equilibrium & Moment Distribution', 'Passive Solar & Cross-Ventilation Physics', 'Building Information Modeling (BIM)', 'Seismic Dissipation & Base Isolation', 'Life-Cycle Carbon Assessment'],
    prerequisites: ['higher-math'],
    unlocks: ['geology-systems'],
    interdisciplinarySynergy: [
      {
        targetId: 'geology-systems',
        targetName: 'Geologi Dinamis & Seismologi',
        relationship: 'Rekayasa Bangunan Tahan Gempa (Seismic Engineering)',
        mathematicalOrTheoreticalLink: 'Spektrum respon gempa bumi lokal dari data gelombang seismik batuan dasar digunakan untuk merancang periode alami getaran struktur gedung pencakar langit.'
      }
    ],
    realWorldApplication: 'Perancangan gedung hemat energi Net-Zero, jembatan bentang panjang tahan taifun, dan masterplan kota cerdas berkelanjutan.',
    estimatedHours: 35
  },
  {
    id: 'geology-systems',
    label: 'Geologi Dinamis, Tektonik & Geofisika',
    courseId: 'geology-earth-systems',
    category: 'science',
    categoryLabel: 'Geologi & Kebumian',
    level: 'Menengah',
    description: 'Mekanika lempeng tektonik litosfer, propagasi gelombang seismik P-S tensor, mineralogi optik, vulkanologi dinamik, dan eksplorasi hidrogeologi.',
    coreConcepts: ['Plate Kinematics & Subduction Dynamics', 'Seismic Wave Propagation Tensor', 'Mohs & Optical Mineralogy', 'Mantle Convection Thermal Flow', 'Geohazard Risk Modeling'],
    prerequisites: ['higher-math', 'modern-physics'],
    unlocks: ['civics-statecraft'],
    interdisciplinarySynergy: [
      {
        targetId: 'civics-statecraft',
        targetName: 'Pendidikan Tata Negara & Geopolitik Maritim',
        relationship: 'Geostrategi Sumber Daya & Batas Landas Kontinen',
        mathematicalOrTheoreticalLink: 'Konvensi Hukum Laut Internasional (UNCLOS) menetapkan Zona Ekonomi Eksklusif dan Landas Kontinen berdasarkan pemetaan geologi geomorfologi dasar laut.'
      }
    ],
    realWorldApplication: 'Sistem peringatan dini tsunami nasional, mitigasi bahaya erupsi gunung api aktif, dan eksplorasi energi geotermal terbarukan.',
    estimatedHours: 32
  },
  {
    id: 'law-jurisprudence',
    label: 'Ilmu Hukum, Konstitusi & Tata Regulasi',
    courseId: 'law-jurisprudence-cyber',
    category: 'humanities',
    categoryLabel: 'Ilmu Hukum & Konstitusi',
    level: 'Lanjutan',
    description: 'Teori Stufenbau Hans Kelsen, doktrin pemisahan kekuasaan, judicial review konstitusional, asas preferensi hukum, dan hukum kecerdasan buatan.',
    coreConcepts: ['Stufenbau Hierarchy of Legal Norms', 'Constitutional Judicial Review', 'IRAC Legal Reasoning Matrix', 'Data Privacy Law (GDPR & PDP)', 'AI Accountability & Liability Frameworks'],
    prerequisites: ['formal-logic'],
    unlocks: ['civics-statecraft', 'islamic-civilization'],
    interdisciplinarySynergy: [
      {
        targetId: 'civics-statecraft',
        targetName: 'Tata Negara, PPKN & Demokrasi Konstitusional',
        relationship: 'Pemisahan Kekuasaan & Rule of Law',
        mathematicalOrTheoreticalLink: 'Konsep negara hukum demokratis (Rechtsstaat) membatasi kekuasaan eksekutif melalui uji keabsahan norma di Mahkamah Konstitusi dan pengadilan administratif.'
      }
    ],
    realWorldApplication: 'Perumusan naskah akademik undang-undang perlindungan privasi data, advokasi sengketa konstitusional, dan kontrak lisensi teknologi lintas negara.',
    estimatedHours: 34
  },
  {
    id: 'civics-statecraft',
    label: 'Pendidikan Karakter, PPKN & Geopolitik Global',
    courseId: 'civics-ppkn-geopolitics',
    category: 'humanities',
    categoryLabel: 'Kewarganegaraan & Geopolitik',
    level: 'Fondasi',
    description: 'Filsafat Pancasila sebagai ideologi terbuka, Wawasan Nusantara maritim, integritas integritas meritokratis, dan geopolitik Indo-Pasifik.',
    coreConcepts: ['Pancasila Axiology & Instrumental Norms', 'Checks & Balances Architecture', 'Wawasan Nusantara Maritime Strategy', 'Anti-Corruption Epistemic Framework', 'Indo-Pacific Geopolitical Balance'],
    prerequisites: ['formal-logic', 'law-jurisprudence'],
    unlocks: ['islamic-civilization'],
    interdisciplinarySynergy: [
      {
        targetId: 'islamic-civilization',
        targetName: 'Peradaban Islam & Epistemologi Sains',
        relationship: 'Integrasi Nilai Moral & Kemaslahatan Publik',
        mathematicalOrTheoreticalLink: 'Sila pertama dan kedua Pancasila berdialog harmonis dengan prinsip Maqashid Syariah dalam memajukan peradaban multikultural yang toleran dan adil.'
      }
    ],
    realWorldApplication: 'Penyusunan kebijakan luar negeri maritim, tata kelola pemerintahan berbasis integritas, dan mitigasi konflik antarbangsa.',
    estimatedHours: 30
  },
  {
    id: 'islamic-civilization',
    label: 'Peradaban Islam, Ushul Fiqh & Epistemologi Sains',
    courseId: 'pai-islamic-civilization',
    category: 'humanities',
    categoryLabel: 'Agama & Peradaban',
    level: 'Menengah',
    description: 'Integrasi akal dan wahyu, Maqashid Syariah 5 pilar, ijtihad metodologis Ushul Fiqh, warisan Baitul Hikmah (Al-Khwarizmi, Ibnu Sina), dan etika bioetika.',
    coreConcepts: ['Tawhidic Epistemology (Kauniyyah & Qauliyyah)', '5 Pillars of Maqashid Syariah', 'Ushul Fiqh Qiyas & Maslahah Mursalah', 'Islamic Golden Age Algebraic Heritage', 'Bioethics & Islamic Fintech Ethics'],
    prerequisites: ['formal-logic', 'law-jurisprudence'],
    unlocks: [],
    interdisciplinarySynergy: [
      {
        targetId: 'higher-math',
        targetName: 'Matematika Tinggi & Aljabar Linier',
        relationship: 'Asal-Usul Sejarah Algoritma & Aljabar',
        mathematicalOrTheoreticalLink: 'Metodologi sistematis reduksi dan keseimbangan (al-Jabr wa al-Muqabala) oleh Al-Khwarizmi meletakkan fondasi komputasi prosedural modern.'
      }
    ],
    realWorldApplication: 'Desain regulasi etika AI berorientasi perlindungan martabat kemanusiaan, tata kelola filantropi zakat/wakaf produktif terdigitalisasi, dan riset sejarah sains.',
    estimatedHours: 30
  },
  {
    id: 'ai-algorithms',
    label: 'Algoritma Komputasi & Kecerdasan Buatan',
    category: 'specialized',
    categoryLabel: 'Komputasi Lanjutan & AI',
    level: 'Mastery',
    description: 'Struktur data lanjut, kompleksitas asimtotik Big-O, pemodelan jaringan saraf tiruan (Backprop, Attention Mechanism Transformer), dan komputasi paralel.',
    coreConcepts: ['Asymptotic Complexity Analysis O(n log n)', 'Transformer Self-Attention Math', 'Gradient Descent Optimization Dynamics', 'Stochastic Processes & Monte Carlo', 'Distributed Parallel Matrix Tensors'],
    prerequisites: ['higher-math', 'fullstack-web', 'formal-logic'],
    unlocks: [],
    interdisciplinarySynergy: [
      {
        targetId: 'higher-math',
        targetName: 'Kalkulus & Aljabar Linier',
        relationship: 'Fondasi Komputasi Bobot Neural Net',
        mathematicalOrTheoreticalLink: 'Perkalian matriks dimensi tinggi $Q K^T / \\sqrt{d_k}$ dan normalisasi Softmax dalam Attention Mechanism.'
      }
    ],
    realWorldApplication: 'Pengembangan Large Language Models, sistem kemudi otonom kendaraan, dan akselerasi penemuan obat farmasi komputasional.',
    estimatedHours: 55
  }
];

export const KNOWLEDGE_LINKS: KnowledgeLink[] = [
  // Foundations
  {
    source: 'formal-logic',
    target: 'higher-math',
    strength: 5,
    type: 'theoretical-foundation',
    label: 'Aksiomatisasi & Deduksi',
    description: 'Semua teorema kalkulus diturunkan dari kerangka logika proposisional dan teori himpunan formal.'
  },
  {
    source: 'formal-logic',
    target: 'law-jurisprudence',
    strength: 5,
    type: 'philosophical-interlock',
    label: 'Silogisme Legal IRAC',
    description: 'Penalaran yuridis memerlukan inferensi deduktif bebas kontradiksi.'
  },
  {
    source: 'formal-logic',
    target: 'fullstack-web',
    strength: 4,
    type: 'computational-application',
    label: 'Aljabar Boolean & Logika Kontrol',
    description: 'Pohon DOM dan evaluasi kondisi eksekusi program berbasis Boolean logic.'
  },
  {
    source: 'higher-math',
    target: 'modern-physics',
    strength: 5,
    type: 'theoretical-foundation',
    label: 'Kalkulus Diferensial & Ruang Hilbert',
    description: 'Mekanika Lagrangian dan fungsi gelombang kuantum membutuhkan kalkulus multivariabel dan aljabar matriks kompleks.'
  },
  {
    source: 'higher-math',
    target: 'astrophysics',
    strength: 5,
    type: 'theoretical-foundation',
    label: 'Persamaan Diferensial Orbit',
    description: 'Hukum Kepler dan medan gravitasi diselesaikan melalui integrasi persamaan gerak diferensial.'
  },
  {
    source: 'higher-math',
    target: 'architecture-engineering',
    strength: 4,
    type: 'computational-application',
    label: 'Vektor Statika & Geometri Spasial',
    description: 'Perhitungan momen lentur dan distribusi beban struktural menggunakan aljabar vektor.'
  },
  {
    source: 'higher-math',
    target: 'ai-algorithms',
    strength: 5,
    type: 'computational-application',
    label: 'Gradien Tensor & Optimasi',
    description: 'Backpropagation jaringan saraf adalah aplikasi langsung dari kalkulus multivariabel berantai (Chain Rule).'
  },
  {
    source: 'higher-math',
    target: 'cyber-security',
    strength: 4,
    type: 'theoretical-foundation',
    label: 'Aritmatika Modular & Kurva Eliptik',
    description: 'Kriptografi kunci publik (RSA, ECC) bersandar pada teori bilangan murni dan aljabar modulo.'
  },
  {
    source: 'modern-physics',
    target: 'astrophysics',
    strength: 5,
    type: 'theoretical-foundation',
    label: 'Fusi Termonuklir & Relativitas',
    description: 'Siklus hidup bintang dan horizon peristiwa lubang hitam dimodelkan dari relativitas umum dan fisika kuantum.'
  },
  {
    source: 'modern-physics',
    target: 'geology-systems',
    strength: 4,
    type: 'theoretical-foundation',
    label: 'Gelombang Elastis & Termodinamika Mantel',
    description: 'Propagasi gelombang seismik P & S mengikuti persamaan gelombang elastisitas kontinu mekanika klasik.'
  },
  {
    source: 'fullstack-web',
    target: 'cyber-security',
    strength: 5,
    type: 'computational-application',
    label: 'Arsitektur Jaringan & Mitigasi Celah',
    description: 'Pemahaman mendalam tentang HTTP/TLS/DOM mutlak diperlukan untuk mencegah SQLi, XSS, dan serangan Session Hijacking.'
  },
  {
    source: 'fullstack-web',
    target: 'ai-algorithms',
    strength: 4,
    type: 'computational-application',
    label: 'Sistem Terdistribusi & Pipeline Data',
    description: 'Inferensi model AI memerlukan orkestrasi microservices dan concurrency non-blocking performa tinggi.'
  },
  {
    source: 'architecture-engineering',
    target: 'geology-systems',
    strength: 4,
    type: 'prerequisite',
    label: 'Rekayasa Gempa & Geoteknik',
    description: 'Desain pondasi tahan gempa membutuhkan pemahaman karateristik seismisitas dan dinamika tanah lokal.'
  },
  {
    source: 'law-jurisprudence',
    target: 'civics-statecraft',
    strength: 5,
    type: 'philosophical-interlock',
    label: 'Konstitusionalisme & Trias Politica',
    description: 'Sistem tata negara dan checks and balances berakar langsung dari doktrin supremasi hukum tata negara.'
  },
  {
    source: 'law-jurisprudence',
    target: 'cyber-security',
    strength: 4,
    type: 'philosophical-interlock',
    label: 'Hukum Siber & Kedaulatan Privasi',
    description: 'Regulasi perlindungan data (UU PDP / GDPR) mendikte standar teknis enkripsi yang wajib diterapkan pada sistem siber.'
  },
  {
    source: 'civics-statecraft',
    target: 'islamic-civilization',
    strength: 4,
    type: 'philosophical-interlock',
    label: 'Keadilan Sosial & Maqashid',
    description: 'Pancasila Sila Keadilan Sosial memiliki resonansi filosofis erat dengan pilar kemaslahatan publik Maqashid Syariah.'
  },
  {
    source: 'geology-systems',
    target: 'civics-statecraft',
    strength: 3,
    type: 'computational-application',
    label: 'Geopolitik Sumber Daya & Maritim',
    description: 'Batas landas kontinen laut dan potensi mineral kritis membentuk strategi diplomasi kedaulatan negara.'
  }
];
