import { University, Scholarship } from '@/lib/types';

export const SCHOLARSHIPS_DATA: Scholarship[] = [
  {
    id: 'lpdp-ri',
    name: 'Beasiswa LPDP Republik Indonesia',
    provider: 'Lembaga Pengelola Dana Pendidikan (Kemenkeu RI)',
    targetUniversities: ['mit', 'oxford', 'harvard', 'cambridge', 'stanford', 'nus', 'eth-zurich', 'univ-tokyo', 'ui', 'itb'],
    coverage: '100% Biaya Kuliah Penuh (Tuition Fee), Tiket Pesawat PP, Visa, Asuransi Kesehatan, Settlement Allowance',
    stipend: 'Living Allowance bulanan Rp 25.000.000 - Rp 45.000.000 (disesuaikan dengan indeks biaya hidup negara tujuan) + Dana Riset/Buku',
    eligibility: [
      'Warga Negara Indonesia (WNI)',
      'IPK minimal 3.00 (S2) / 3.25 (S3) untuk perguruan tinggi dalam/luar negeri',
      'Sertifikat IELTS minimal 6.5 (Luar Negeri) / TOEFL IBT 80 / Duolingo 120',
      'Surat Rekomendasi Akademik & Proposal Rencana Kontribusi Nyata untuk Indonesia',
      'Memiliki LoA Unconditional dari Universitas Mitra LPDP diutamakan'
    ],
    deadline: 'Tahap 1: Februari - Maret | Tahap 2: Juni - Juli setiap tahun',
    link: 'https://lpdp.kemenkeu.go.id',
    flagEmoji: '🇮🇩',
    type: 'Penuh (Full Funded)'
  },
  {
    id: 'chevening-uk',
    name: 'Chevening Scholarship (UK Government)',
    provider: 'Foreign, Commonwealth and Development Office (FCDO UK)',
    targetUniversities: ['oxford', 'cambridge', 'ucl-london', 'imperial-college'],
    coverage: 'Full Tuition Fee untuk Master 1 Tahun di UK, Tiket Pesawat PP, Biaya Akomodasi & Visa',
    stipend: 'Monthly Living Stipend ~£1,400 - £1,800 / bulan + Arrival Allowance',
    eligibility: [
      'Gelar S1 dengan nilai memuaskan (setara 2:1 honours di UK)',
      'Pengalaman kerja profesional minimal 2 tahun (2,800 jam)',
      'Memiliki visi kepemimpinan dan jejaring yang kuat',
      'Mendaftar ke 3 program master berbeda di universitas UK yang eligible'
    ],
    deadline: 'Agustus - Awal November setiap tahun',
    link: 'https://www.chevening.org',
    flagEmoji: '🇬🇧',
    type: 'Penuh (Full Funded)'
  },
  {
    id: 'fulbright-usa',
    name: 'Fulbright Foreign Student Program (USA)',
    provider: 'U.S. Department of State & AMINEF Indonesia',
    targetUniversities: ['mit', 'harvard', 'stanford', 'columbia-univ', 'uc-berkeley'],
    coverage: 'Biaya Kuliah Penuh (Tuition Fee), Asuransi Medis J-1 Exchange, Biaya Buku & Penempatan Universitas',
    stipend: 'Monthly Living Stipend $1,800 - $2,600 / bulan + Tiket PP Indonesia - USA',
    eligibility: [
      'WNI dengan dedikasi kepemimpinan',
      'IPK minimal 3.00 pada skala 4.00',
      'TOEFL ITP minimal 550 / iBT 80 / IELTS 6.5',
      'Komitmen kembali ke tanah air setelah menyelesaikan studi di Amerika Serikat'
    ],
    deadline: 'Batas pendaftaran biasanya 15 Februari setiap tahun',
    link: 'https://www.aminef.or.id',
    flagEmoji: '🇺🇸',
    type: 'Penuh (Full Funded)'
  },
  {
    id: 'mext-japan',
    name: 'MEXT Monbukagakusho Scholarship (Jepang)',
    provider: 'Kementerian Pendidikan, Kebudayaan, Olahraga, Sains & Teknologi Jepang',
    targetUniversities: ['univ-tokyo', 'kyoto-univ', 'tokyo-tech'],
    coverage: 'Gratis 100% Biaya Kuliah, Pendaftaran, dan Tiket Pesawat Garuda/ANA PP',
    stipend: '144.000 - 147.000 Yen/bulan (sekitar Rp 16-17 juta) bebas pajak',
    eligibility: [
      'Usia di bawah 35 tahun saat mendaftar',
      'Lulusan universitas dengan bidang studi linear atau relevan',
      'Nilai akademik memuaskan, kemampuan bahasa Inggris (TOEFL/IELTS) atau JLPT (N2/N1)'
    ],
    deadline: 'Jalur Embassy: April - Mei | Jalur University: September - Desember',
    link: 'https://www.id.emb-japan.go.jp',
    flagEmoji: '🇯🇵',
    type: 'Penuh (Full Funded)'
  },
  {
    id: 'daad-germany',
    name: 'DAAD EPOS & Master Scholarships (Jerman)',
    provider: 'Deutscher Akademischer Austauschdienst (German Academic Exchange Service)',
    targetUniversities: ['eth-zurich', 'tum-munich', 'heidelberg-univ'],
    coverage: 'Biaya kuliah universitas Jerman (kebanyakan universitas negeri Jerman gratis tuition fee) + Asuransi Kesehatan',
    stipend: '€934 - €1,300 / bulan + Tunjangan tiket perjalanan PP & Subsidi sewa tempat tinggal',
    eligibility: [
      'Lulusan S1 dengan masa kelulusan tidak lebih dari 6 tahun',
      'Sertifikat Bahasa Inggris (IELTS 6.5) atau Bahasa Jerman (Goethe B2/TestDaF 4)'
    ],
    deadline: 'Agustus - Oktober setiap tahun tergantung program jurusan',
    link: 'https://www.daad.id',
    flagEmoji: '🇩🇪',
    type: 'Penuh (Full Funded)'
  },
  {
    id: 'gates-cambridge',
    name: 'Gates Cambridge Scholarship',
    provider: 'Bill & Melinda Gates Foundation & University of Cambridge',
    targetUniversities: ['cambridge'],
    coverage: 'Biaya Komposisi Universitas Penuh di Cambridge + Tiket Pesawat Ekonomi Single PP',
    stipend: 'Maintenance Allowance £20,000 / tahun + Dana Pengembangan Akademik hingga £2,000',
    eligibility: [
      'Prestasi intelektual luar biasa (Top 1-2% di kelas)',
      'Potensi kepemimpinan dan komitmen kuat memperbaiki taraf hidup sesama',
      'Kesesuaian proposal riset dengan departemen di Cambridge'
    ],
    deadline: 'Awal Oktober (warga AS) / Awal Desember - Januari (Internasional)',
    link: 'https://www.gatescambridge.org',
    flagEmoji: '🇬🇧',
    type: 'Penuh (Full Funded)'
  }
];

export const UNIVERSITIES_DATA: University[] = [
  {
    id: 'mit',
    name: 'Massachusetts Institute of Technology (MIT)',
    country: 'Amerika Serikat',
    city: 'Cambridge, Massachusetts',
    worldRank: 1,
    logo: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=300&auto=format&fit=crop&q=80',
    flag: '🇺🇸',
    popularMajors: [
      'Computer Science & Artificial Intelligence (EECS)',
      'Mechanical Engineering & Robotics',
      'Physics & Quantum Computing',
      'Mathematics & Quantitative Finance'
    ],
    admissionRequirements: {
      minGPA: '3.90 / 4.00 (Unweighted)',
      satScore: '1540 - 1580 (Math: 790-800)',
      ieltsScore: '7.5+ (TOEFL iBT 110+)',
      toeflScore: '110+',
      acceptanceRate: '3.96%',
      essayRequirements: [
        'Karya/Proyek orisinal yang pernah dibuat untuk memecahkan masalah nyata',
        'Refleksi mengatasi kegagalan teknis (resilience)',
        'Kolaborasi tim lintas disiplin'
      ],
      prerequisiteSkills: [
        {
          courseId: 'web-dev-mastery',
          courseTitle: 'Fullstack Modern Web Development',
          category: 'coding',
          minimumScorePercent: 85
        },
        {
          courseId: 'cyber-security-core',
          courseTitle: 'Cyber Security, Defensive & Ethical Hacking',
          category: 'coding',
          minimumScorePercent: 85
        },
        {
          courseId: 'math-calculus-algebra',
          courseTitle: 'Matematika Tinggi: Kalkulus & Aljabar Linier',
          category: 'science',
          minimumScorePercent: 90
        },
        {
          courseId: 'physics-modern-quantum',
          courseTitle: 'Fisika Modern, Mekanika Klasik & Teori Kuantum',
          category: 'science',
          minimumScorePercent: 85
        }
      ]
    },
    scholarshipsAvailable: ['lpdp-ri', 'fulbright-usa'],
    tuitionFeeRange: '$60,150 / tahun (Need-Blind Financial Aid tersedia)',
    applicationDeadlines: {
      fall: '1 Januari (Regular Decision) / 1 November (Early Action)'
    },
    website: 'https://mit.edu',
    description: 'Institut teknologi nomor satu di dunia yang memelopori kecerdasan buatan, rekayasa fisika nuklir, eksplorasi antariksa, dan komputasi kuantum.'
  },
  {
    id: 'oxford',
    name: 'University of Oxford',
    country: 'Inggris (UK)',
    city: 'Oxford, Oxfordshire',
    worldRank: 2,
    logo: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=300&auto=format&fit=crop&q=80',
    flag: '🇬🇧',
    popularMajors: [
      'Philosophy, Politics and Economics (PPE)',
      'Computer Science & Software Engineering',
      'Law / Jurisprudence',
      'Mathematical Sciences & Astrophysics'
    ],
    admissionRequirements: {
      minGPA: '3.85 / 4.00 (A*A*A pada A-Level / IB 40+)',
      ieltsScore: '7.5 (Minimal 7.0 per band)',
      toeflScore: '110+',
      acceptanceRate: '13.5% (Tergantung jurusan, CS/PPE ~5%)',
      essayRequirements: [
        'UCAS Personal Statement (Fokus 80% pada kedalaman akademik & bacaan kritis)',
        'Tes Masuk Khusus (misal: MAT untuk Math/CS, LNAT untuk Law, TSA untuk PPE)',
        'Academic Interview bersama Profesor Oxford (Tutorial System)'
      ],
      prerequisiteSkills: [
        {
          courseId: 'philosophy-logic-ethics',
          courseTitle: 'Filsafat, Logika Formal & Etika Kritis',
          category: 'humanities',
          minimumScorePercent: 90
        },
        {
          courseId: 'law-jurisprudence-cyber',
          courseTitle: 'Ilmu Hukum, Konstitusi & Regulasi Digital',
          category: 'humanities',
          minimumScorePercent: 85
        },
        {
          courseId: 'civics-ppkn-geopolitics',
          courseTitle: 'Pendidikan Pancasila & Geopolitik Global',
          category: 'humanities',
          minimumScorePercent: 85
        },
        {
          courseId: 'math-calculus-algebra',
          courseTitle: 'Matematika Tinggi: Kalkulus & Aljabar Linier',
          category: 'science',
          minimumScorePercent: 85
        }
      ]
    },
    scholarshipsAvailable: ['lpdp-ri', 'chevening-uk'],
    tuitionFeeRange: '£33,050 - £48,620 / tahun',
    applicationDeadlines: {
      fall: '15 Oktober (Early UCAS Deadline khusus Oxbridge)'
    },
    website: 'https://ox.ac.uk',
    description: 'Universitas tertua di dunia berbahasa Inggris, terkenal dengan sistem tutorial 1-on-1 bersama para pakar terkemuka di bidang filsafat, hukum, sains, dan teknologi.'
  },
  {
    id: 'stanford',
    name: 'Stanford University',
    country: 'Amerika Serikat',
    city: 'Stanford, Silicon Valley, California',
    worldRank: 3,
    logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=300&auto=format&fit=crop&q=80',
    flag: '🇺🇸',
    popularMajors: [
      'Computer Science & Machine Learning',
      'Management Science & Engineering',
      'Earth & Planetary Systems (Geology & Climate)',
      'Bioengineering & Sustainable Architecture'
    ],
    admissionRequirements: {
      minGPA: '3.95 / 4.00 (Unweighted)',
      satScore: '1520 - 1570',
      ieltsScore: '7.5+',
      toeflScore: '108+',
      acceptanceRate: '3.68%',
      essayRequirements: [
        'Stanford "What matters to you, and why?" essay',
        'Letter to your future roommate',
        'Bukti kepemimpinan inovatif & dampak sosial di Silicon Valley ecosystem'
      ],
      prerequisiteSkills: [
        {
          courseId: 'web-dev-mastery',
          courseTitle: 'Fullstack Modern Web Development',
          category: 'coding',
          minimumScorePercent: 85
        },
        {
          courseId: 'math-calculus-algebra',
          courseTitle: 'Matematika Tinggi: Kalkulus & Aljabar Linier',
          category: 'science',
          minimumScorePercent: 85
        },
        {
          courseId: 'geology-earth-systems',
          courseTitle: 'Geologi, Tektonik Lempeng & Kebumian Dinamis',
          category: 'science',
          minimumScorePercent: 80
        },
        {
          courseId: 'architecture-spatial-design',
          courseTitle: 'Arsitektur, Desain Spasial & Rekayasa Bangunan Berkelanjutan',
          category: 'engineering',
          minimumScorePercent: 80
        }
      ]
    },
    scholarshipsAvailable: ['lpdp-ri', 'fulbright-usa'],
    tuitionFeeRange: '$61,731 / tahun',
    applicationDeadlines: {
      fall: '5 Januari (Regular Decision) / 1 November (Restrictive Early Action)'
    },
    website: 'https://stanford.edu',
    description: 'Pusat lahirnya inovasi Silicon Valley (Google, Hewlett-Packard, Sun Microsystems). Mengedepankan integrasi teknologi, kewirausahaan, dan solusi iklim bumi.'
  },
  {
    id: 'cambridge',
    name: 'University of Cambridge',
    country: 'Inggris (UK)',
    city: 'Cambridge, Cambridgeshire',
    worldRank: 4,
    logo: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=300&auto=format&fit=crop&q=80',
    flag: '🇬🇧',
    popularMajors: [
      'Natural Sciences (Physics & Chemistry Tripos)',
      'Mathematics (Wrangler Mathematical Tripos)',
      'Computer Science',
      'Engineering & Applied Mechanics'
    ],
    admissionRequirements: {
      minGPA: '3.90 / 4.00 (A*A*A pada A-Level Matematika & Fisika Lanjutan)',
      ieltsScore: '7.5 (Minimal 7.0 di setiap sub-tes)',
      acceptanceRate: '15.8% (Maths Tripos ~8%)',
      essayRequirements: [
        'UCAS Personal Statement & Cambridge SAQ (Supplementary Application Questionnaire)',
        'Tes Masuk STEP (Sixth Term Examination Paper) untuk Matematika'
      ],
      prerequisiteSkills: [
        {
          courseId: 'math-calculus-algebra',
          courseTitle: 'Matematika Tinggi: Kalkulus & Aljabar Linier',
          category: 'science',
          minimumScorePercent: 95
        },
        {
          courseId: 'physics-modern-quantum',
          courseTitle: 'Fisika Modern, Mekanika Klasik & Teori Kuantum',
          category: 'science',
          minimumScorePercent: 90
        },
        {
          courseId: 'astronomy-astrophysics-space',
          courseTitle: 'Astronomi, Astrofisika & Kosmologi Kosmik',
          category: 'science',
          minimumScorePercent: 85
        }
      ]
    },
    scholarshipsAvailable: ['lpdp-ri', 'chevening-uk', 'gates-cambridge'],
    tuitionFeeRange: '£35,000 - £60,000 / tahun',
    applicationDeadlines: {
      fall: '15 Oktober setiap tahun'
    },
    website: 'https://cam.ac.uk',
    description: 'Tempat lahirnya Teori Gravitasi Isaac Newton, Struktur DNA Watson & Crick, dan Teori Lubang Hitam Stephen Hawking. Kampus tradisi sains murni terkuat di Eropa.'
  },
  {
    id: 'nus',
    name: 'National University of Singapore (NUS)',
    country: 'Singapura',
    city: 'Kent Ridge, Singapore',
    worldRank: 8,
    logo: 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?w=300&auto=format&fit=crop&q=80',
    flag: '🇸🇬',
    popularMajors: [
      'Computer Science & Data Science (School of Computing)',
      'Electrical & Electronic Engineering',
      'Architecture & Built Environment',
      'Business Analytics & Fintech'
    ],
    admissionRequirements: {
      minGPA: '3.80 / 4.00 (Nilai Rata-rata Rapor SMA > 90)',
      satScore: '1480+ (Math: 750+)',
      ieltsScore: '6.5 - 7.0 (TOEFL iBT 95+)',
      acceptanceRate: '6.2%',
      essayRequirements: [
        '5 Personal Statement Prompts (Prestasi olimpiade, kepemimpinan, dan rencana studi)',
        'Portofolio untuk jurusan arsitektur dan computing'
      ],
      prerequisiteSkills: [
        {
          courseId: 'web-dev-mastery',
          courseTitle: 'Fullstack Modern Web Development',
          category: 'coding',
          minimumScorePercent: 85
        },
        {
          courseId: 'cyber-security-core',
          courseTitle: 'Cyber Security, Defensive & Ethical Hacking',
          category: 'coding',
          minimumScorePercent: 80
        },
        {
          courseId: 'math-calculus-algebra',
          courseTitle: 'Matematika Tinggi: Kalkulus & Aljabar Linier',
          category: 'science',
          minimumScorePercent: 85
        },
        {
          courseId: 'architecture-spatial-design',
          courseTitle: 'Arsitektur, Desain Spasial & Rekayasa Bangunan Berkelanjutan',
          category: 'engineering',
          minimumScorePercent: 80
        }
      ]
    },
    scholarshipsAvailable: ['lpdp-ri'],
    tuitionFeeRange: 'SGD $17,550 - $39,000 / tahun (dengan MOE Tuition Grant)',
    applicationDeadlines: {
      fall: 'Akhir Februari untuk kualifikasi SMA Internasional/Indonesia'
    },
    website: 'https://nus.edu.sg',
    description: 'Universitas ranking 1 di Asia dengan fasilitas komputasi mutakhir, jaringan industri global Asia-Pasifik, dan riset sains terapan berdaya saing tinggi.'
  },
  {
    id: 'itb',
    name: 'Institut Teknologi Bandung (ITB)',
    country: 'Indonesia',
    city: 'Bandung, Jawa Barat',
    worldRank: 256,
    logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&auto=format&fit=crop&q=80',
    flag: '🇮🇩',
    popularMajors: [
      'Teknik Informatika & Sistem Informasi (STEI)',
      'Teknik Geologi & Geofisika (FITB)',
      'Arsitektur & Desain Spasial (SAPPK)',
      'Astronomi & Fisika Teoretik (FMIPA)'
    ],
    admissionRequirements: {
      minGPA: 'Nilai Rapor Matematika & IPA > 88 (SNBP / SNBT / Seleksi Mandiri ITB)',
      ieltsScore: 'ELPT ITB min. 77 atau TOEFL iBT 80 (Khusus Program Internasional IELTS 6.5)',
      acceptanceRate: '3.5% (STEI-K & SAPPK paling kompetitif)',
      essayRequirements: [
        'Esai Motivasi & Portofolio Karya (khusus FSRD & SAPPK)',
        'Tes Kemampuan Akademik (TKA) Matematika & Fisika'
      ],
      prerequisiteSkills: [
        {
          courseId: 'web-dev-mastery',
          courseTitle: 'Fullstack Modern Web Development',
          category: 'coding',
          minimumScorePercent: 80
        },
        {
          courseId: 'math-calculus-algebra',
          courseTitle: 'Matematika Tinggi: Kalkulus & Aljabar Linier',
          category: 'science',
          minimumScorePercent: 85
        },
        {
          courseId: 'astronomy-astrophysics-space',
          courseTitle: 'Astronomi, Astrofisika & Kosmologi Kosmik',
          category: 'science',
          minimumScorePercent: 80
        },
        {
          courseId: 'geology-earth-systems',
          courseTitle: 'Geologi, Tektonik Lempeng & Kebumian Dinamis',
          category: 'science',
          minimumScorePercent: 80
        },
        {
          courseId: 'architecture-spatial-design',
          courseTitle: 'Arsitektur, Desain Spasial & Rekayasa Bangunan Berkelanjutan',
          category: 'engineering',
          minimumScorePercent: 80
        }
      ]
    },
    scholarshipsAvailable: ['lpdp-ri'],
    tuitionFeeRange: 'UKT Golongan 1 - 8 (Rp 0 - Rp 12.500.000 / semester)',
    applicationDeadlines: {
      fall: 'SNBP (Jan-Feb), SNBT (Maret-April), Mandiri (Mei-Juni)'
    },
    website: 'https://itb.ac.id',
    description: 'Institut teknologi tertua dan paling prestisius di Indonesia, pusat rekayasa teknologi, observatorium Bosscha, dan arsitektur nusantara.'
  },
  {
    id: 'ui',
    name: 'Universitas Indonesia (UI)',
    country: 'Indonesia',
    city: 'Depok & Salemba, Jakarta',
    worldRank: 206,
    logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=300&auto=format&fit=crop&q=80',
    flag: '🇮🇩',
    popularMajors: [
      'Ilmu Hukum & Konstitusi (FHUI)',
      'Ilmu Komputer (Fasilkom UI)',
      'Filsafat & Ilmu Komunikasi (FIB/FISIP UI)',
      'Kajian Ketahanan Nasional & Geopolitik'
    ],
    admissionRequirements: {
      minGPA: 'Nilai Rata-rata Rapor > 88 (SNBP / SNBT / SIMAK UI)',
      ieltsScore: 'TOEFL ITP > 500 atau EPT UI > 500 (Kelas Internasional IELTS 6.5)',
      acceptanceRate: '2.8% (Fakultas Hukum & Fasilkom paling kompetitif)',
      essayRequirements: [
        'Ujian Tulis SIMAK UI (Kemampuan Dasar & Kemampuan IPA/IPS)',
        'Esai Wawasan Kebangsaan & Rencana Studi'
      ],
      prerequisiteSkills: [
        {
          courseId: 'philosophy-logic-ethics',
          courseTitle: 'Filsafat, Logika Formal & Etika Kritis',
          category: 'humanities',
          minimumScorePercent: 85
        },
        {
          courseId: 'law-jurisprudence-cyber',
          courseTitle: 'Ilmu Hukum, Konstitusi & Regulasi Digital',
          category: 'humanities',
          minimumScorePercent: 85
        },
        {
          courseId: 'civics-ppkn-geopolitics',
          courseTitle: 'Pendidikan Pancasila & Geopolitik Global',
          category: 'humanities',
          minimumScorePercent: 85
        },
        {
          courseId: 'pai-islamic-civilization',
          courseTitle: 'Pendidikan Agama Islam, Peradaban & Epistemologi Sains Islam',
          category: 'humanities',
          minimumScorePercent: 80
        }
      ]
    },
    scholarshipsAvailable: ['lpdp-ri'],
    tuitionFeeRange: 'BOP-B / UKT Berkeadilan (Rp 0 - Rp 10.000.000 / semester)',
    applicationDeadlines: {
      fall: 'SNBP, SNBT, SIMAK UI (Juni-Juli)'
    },
    website: 'https://ui.ac.id',
    description: 'Universitas nomor satu di Indonesia yang melahirkan para negarawan, pakar hukum konstitusi, pemikir filsafat, dan teknolog terkemuka bangsa.'
  }
];
