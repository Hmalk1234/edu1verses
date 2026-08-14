import { Course } from '@/lib/types';

export const COURSES_DATA: Course[] = [
  // 1. FULLSTACK WEB DEVELOPMENT
  {
    id: 'web-dev-mastery',
    title: 'Fullstack Modern Web Development',
    slug: 'fullstack-web-dev',
    category: 'coding',
    categoryLabel: 'Coding & Rekayasa Perangkat Lunak',
    iconName: 'Globe',
    tagline: 'Dari HTML & JavaScript dasar hingga arsitektur Next.js & Serverless cloud production',
    description: 'Pelajari fondasi web standar W3C, DOM manipulation, React ecosystem, arsitektur microservices, REST/GraphQL API, serta deployment CI/CD skala industri.',
    level: 'Pemula (Beginner)',
    totalHours: 42,
    totalLessons: 18,
    color: '#3b82f6',
    badge: {
      title: 'Fullstack Web Architect',
      icon: 'Code2',
    },
    prerequisites: ['Logika Komputasi Dasar', 'Kemauan Belajar'],
    relatedUniversityMajors: ['Computer Science (MIT, Stanford)', 'Software Engineering (Oxford)', 'Informatika (ITB, UI)'],
    outcomes: ['Membangun aplikasi web fullstack responsif', 'Menguasai state management & asynchronous JS', 'Menghubungkan database & serverless backend'],
    modules: [
      {
        id: 'mod-web-1',
        title: 'Modul 1: Fondasi Inti Web & JavaScript Modern (ES6+)',
        description: 'Pahami bagaimana browser me-render DOM, CSS layout engine (Flexbox/Grid), dan eksekusi asynchronous JS (Event Loop).',
        lessons: [
          {
            id: 'lesson-web-1',
            title: '1. Anatomi DOM, CSS Layout Engine & Rendering Pipeline',
            description: 'Memahami bagaimana browser mengurai HTML menjadi DOM Tree, CSSOM, dan proses compositing layar.',
            durationMinutes: 30,
            xpReward: 150,
            difficulty: 'Pemula (Beginner)',
            content: {
              overview: 'Untuk membuat web performa tinggi, kita harus memahami Critical Rendering Path browser: parsing DOM, CSSOM calculation, Layout (Reflow), dan Paint (Repaint).',
              keyConcepts: [
                'DOM (Document Object Model) adalah representasi pohon node berorientasi objek dari dokumen HTML.',
                'CSSOM (CSS Object Model) mendefinisikan gaya yang dipetakan ke node DOM.',
                'Flexbox cocok untuk layout 1 dimensi, sedangkan CSS Grid untuk struktur 2 dimensi.',
                'Reflow terjadi saat ukuran atau posisi elemen berubah, memakan komputasi berat jika tidak dioptimasi.'
              ],
              detailedExplanation: `### Mengapa Memahami Rendering Path Krusial?
Saat pengguna mengetik URL:
1. **Network Layer**: Browser mengunduh byte data HTML dan mengubahnya menjadi karakter, tokens, dan node.
2. **DOM Tree**: Node-node disusun membentuk pohon hierarki hubungan parent-child.
3. **CSSOM Tree**: Browser mem-parse semua stylesheet dan aturan CSS.
4. **Render Tree**: DOM dan CSSOM digabungkan (hanya node yang terlihat yang disertakan, \`display: none\` diabaikan).
5. **Layout Phase**: Menghitung koordinat piksel dan ukuran pasti setiap elemen di viewport.
6. **Paint Phase**: Mengisi piksel warna, background, border, dan bayangan ke layar.

Untuk performa 60 FPS, minimalkan manipulasi DOM langsung di dalam loop dan gunakan animasi CSS dengan \`transform\` dan \`opacity\` yang diproses langsung oleh GPU.`,
              codeExample: {
                language: 'javascript',
                code: `// Contoh efisien memanipulasi DOM menggunakan DocumentFragment
const container = document.getElementById('list-container');
const fragment = document.createDocumentFragment();

const items = ['React.js', 'Next.js', 'TypeScript', 'TailwindCSS'];
items.forEach(tech => {
  const li = document.createElement('li');
  li.className = 'px-3 py-1.5 bg-slate-800 text-white rounded-md my-1';
  li.textContent = tech;
  fragment.appendChild(li); // Belum memicu reflow browser
});

container.appendChild(fragment); // Hanya 1x Reflow & Repaint!`,
                outputExplanation: 'DocumentFragment memungkinkan pembuatan batch elemen di memori sebelum disuntikkan ke DOM nyata, menghemat reflow.'
              },
              interactiveWidgetType: 'code-runner',
              practicalExercise: 'Buatlah sebuah fungsi JavaScript yang menambahkan 5 kartu produk ke dalam container HTML dengan DocumentFragment tanpa memicu multi-reflow.',
              cheatSheetSummary: [
                'Gunakan DocumentFragment untuk batch DOM manipulation',
                'Pilih CSS transform & opacity untuk animasi GPU yang mulus',
                'Hindari membaca properti layout (offsetWidth) berulang kali di dalam perulangan'
              ]
            },
            quiz: {
              minPassScorePercent: 80,
              questions: [
                {
                  id: 'q-w1-1',
                  question: 'Mengapa memanipulasi DOM langsung secara berulang dalam loop besar dianggap sebagai anti-pattern?',
                  options: [
                    'Menyebabkan reflow dan repaint berulang yang memperlambat browser',
                    'Akan merusak struktur HTML secara permanen',
                    'JavaScript tidak mendukung looping elemen',
                    'CSS akan otomatis terhapus saat loop berjalan'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Setiap kali node disisipkan atau diubah ukurannya, browser menghitung ulang layout (reflow), yang memakan CPU secara signifikan jika dilakukan berulang di dalam loop.'
                },
                {
                  id: 'q-w1-2',
                  question: 'Properti CSS manakah yang paling aman untuk animasi performa 60 FPS karena diproses oleh GPU compositing layer?',
                  options: [
                    'transform dan opacity',
                    'width dan height',
                    'top dan margin-left',
                    'border-width dan padding'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'transform dan opacity tidak memicu reflow atau repaint di CPU utama; perhitungannya didelegasikan langsung ke GPU (compositor-only properties).'
                },
                {
                  id: 'q-w1-3',
                  question: 'Apa perbedaan mendasar antara display: none dan visibility: hidden dalam Render Tree?',
                  options: [
                    'display: none sama sekali tidak dimasukkan ke dalam Render Tree, sedangkan visibility: hidden tetap memakan ruang layout',
                    'display: none tetap memakan ruang piksel di layar',
                    'visibility: hidden menghapus elemen dari memori RAM',
                    'Keduanya menghasilkan perilaku rendering yang identik 100%'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Elemen dengan display: none diabaikan dari Render Tree sehingga tidak ada layout box, sedangkan visibility: hidden tetap dibuat layout box-nya namun pikselnya transparan.'
                }
              ]
            }
          },
          {
            id: 'lesson-web-2',
            title: '2. Asynchronous JavaScript, Event Loop, Promises & Microtasks',
            description: 'Memahami eksekusi single-threaded JavaScript, Call Stack, Web APIs, Task Queue, dan Microtask Queue.',
            durationMinutes: 35,
            xpReward: 160,
            difficulty: 'Pemula (Beginner)',
            content: {
              overview: 'JavaScript adalah bahasa single-threaded yang tidak memblokir antarmuka pengguna berkat arsitektur Event Loop dan antrian Microtask/Macrotask.',
              keyConcepts: [
                'Call Stack mengeksekusi instruksi synchronous satu per satu.',
                'Microtask Queue (Promise.then, queueMicrotask) diprioritaskan sebelum Macrotask Queue (setTimeout, setInterval).',
                'async/await adalah syntactic sugar di atas Promise untuk menyederhanakan kode asynchronous.',
                'Hindari long-running synchronous code yang membekukan UI thread.'
              ],
              detailedExplanation: `### Bagaimana Event Loop Bekerja?
1. **Call Stack**: Menjalankan frame eksekusi saat ini.
2. Saat menjumpai operasi async (seperti \`fetch\` atau \`setTimeout\`), JS menyerahkannya ke Web APIs.
3. Setelah selesai, callback ditaruh di antrian:
   - **Microtask Queue**: \`Promise.then\`, \`async/await\` resume, \`MutationObserver\`.
   - **Macrotask/Task Queue**: \`setTimeout\`, \`setInterval\`, I/O events.
4. **Event Loop Rule**: Call stack HARUS kosong terlebih dahulu, lalu SEMUA microtask dieksekusi sampai tuntas, barulah SATU macrotask diambil.`,
              codeExample: {
                language: 'javascript',
                code: `console.log('1. Start');

setTimeout(() => {
  console.log('4. Macrotask (setTimeout)');
}, 0);

Promise.resolve().then(() => {
  console.log('3. Microtask (Promise)');
});

console.log('2. End');
// Output urutan: 1. Start -> 2. End -> 3. Microtask -> 4. Macrotask`,
                outputExplanation: 'Microtask selalu dikuras habis oleh Event Loop sebelum mengambil macrotask dari queue.'
              },
              interactiveWidgetType: 'code-runner',
              practicalExercise: 'Tuliskan fungsi retryWithBackoff(fn, retries, delay) yang mencoba memanggil fungsi async dengan penundaan eksponensial jika gagal.',
              cheatSheetSummary: [
                'Promise.then berjalan di Microtask Queue',
                'setTimeout berjalan di Macrotask Queue',
                'Microtasks selalu dieksekusi lebih dulu sebelum Macrotasks'
              ]
            },
            quiz: {
              minPassScorePercent: 80,
              questions: [
                {
                  id: 'q-w2-1',
                  question: 'Antrian manakah yang dieksekusi terlebih dahulu setelah Call Stack kosong?',
                  options: [
                    'Microtask Queue (Promise, queueMicrotask)',
                    'Macrotask Queue (setTimeout, setInterval)',
                    'Garbage Collection queue',
                    'Network Socket raw buffer'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Event loop selalu memprioritaskan dan menguras habis seluruh Microtask Queue sebelum memproses item berikutnya di Macrotask Queue.'
                },
                {
                  id: 'q-w2-2',
                  question: 'Apa output urutan konsol dari: console.log("A"); setTimeout(()=>console.log("B"),0); Promise.resolve().then(()=>console.log("C")); console.log("D");',
                  options: [
                    'A, D, C, B',
                    'A, B, C, D',
                    'A, C, D, B',
                    'B, C, A, D'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Synchronous: A lalu D. Microtask: C. Macrotask: B. Sehingga urutannya adalah A, D, C, B.'
                }
              ]
            }
          }
        ]
      }
    ]
  },

  // 2. CYBER SECURITY & ETHICAL HACKING
  {
    id: 'cyber-security-core',
    title: 'Cyber Security, Defensive & Ethical Hacking',
    slug: 'cyber-security',
    category: 'coding',
    categoryLabel: 'Cyber Security & Network Defense',
    iconName: 'ShieldAlert',
    tagline: 'Memahami kriptografi, vulnerability assessment, web exploitation, dan arsitektur Zero Trust',
    description: 'Kuasai mitigasi serangan OWASP Top 10, kriptografi modern (RSA, AES, Elliptic Curves), penetration testing beretika, reverse engineering, dan pertahanan infrastruktur digital.',
    level: 'Menengah (Intermediate)',
    totalHours: 38,
    totalLessons: 16,
    color: '#ef4444',
    badge: {
      title: 'Certified Cyber Defender',
      icon: 'ShieldCheck',
    },
    prerequisites: ['Jaringan Komputer Dasar', 'Pemrograman Dasar (Python/C/JS)'],
    relatedUniversityMajors: ['Information Security (CMU, Oxford)', 'Cybersecurity & Cryptography (MIT, NUS)'],
    outcomes: ['Mencegah dan mengaudit kerentanan SQLi, XSS, CSRF, SSRF', 'Mengimplementasikan protokol kriptografi enkripsi end-to-end', 'Merancang arsitektur keamanan Zero Trust'],
    modules: [
      {
        id: 'mod-sec-1',
        title: 'Modul 1: OWASP Top 10 & Anatomi Eksploitasi Web',
        description: 'Menganalisis vektor serangan web paling umum dan mekanisme pertahanan preventif.',
        lessons: [
          {
            id: 'lesson-sec-1',
            title: '1. SQL Injection (SQLi) & Defense-in-Depth',
            description: 'Bagaimana input tak tervalidasi dapat membajak query database dan cara mitigasi absolut dengan Parameterized Queries.',
            durationMinutes: 40,
            xpReward: 200,
            difficulty: 'Menengah (Intermediate)',
            content: {
              overview: 'SQL Injection terjadi ketika data yang dikontrol pengguna disisipkan langsung ke dalam string query SQL tanpa sanitasi atau parameter binding.',
              keyConcepts: [
                'SQLi dapat membocorkan kredensial, menghapus tabel, atau mengeksekusi perintah OS.',
                'Prepared Statements / Parameterized Queries memisahkan logika query dari payload data.',
                'ORM modern melindungi secara default kecuali jika raw query digunakan secara serampangan.',
                'Terapkan Principle of Least Privilege pada user database.'
              ],
              detailedExplanation: `### Mengapa Raw String Concatenation Berbahaya?
Ketika aplikasi menulis:
\`SELECT * FROM users WHERE email = '\` + inputEmail + \`' AND pass = '\` + pass + \`'\`

Jika penyerang memasukkan: \`admin@corp.com' OR '1'='1\`
Query berubah menjadi:
\`SELECT * FROM users WHERE email = 'admin@corp.com' OR '1'='1' AND pass = ''\`
Kondisi \`'1'='1'\` bernilai TRUE dan mengevaluasi seluruh baris, membocorkan akses akun tanpa password!

### Solusi Mutlak: Parameterized Query
Database engine akan meng-compile struktur query terlebih dahulu sebelum menerima parameter input. Sehingga karakter khusus seperti kutip tunggal (\`'\`) hanya diperlakukan sebagai literal string biasa, bukan perintah SQL.`,
              codeExample: {
                language: 'typescript',
                code: `// ✅ CARA AMAN: Menggunakan Parameterized Query (Prepared Statement)
import { db } from './database';

async function safeLogin(email: string, passwordHash: string) {
  // Query terpisah secara tegas dari parameter data ($1, $2)
  const result = await db.query(
    'SELECT id, email, role FROM users WHERE email = $1 AND password_hash = $2',
    [email, passwordHash]
  );
  return result.rows[0];
}`,
                outputExplanation: 'Database tidak akan pernah mengeksekusi karakter injeksi sebagai perintah query.'
              },
              interactiveWidgetType: 'code-runner',
              practicalExercise: 'Tuliskan fungsi audit yang memvalidasi input regex untuk mendeteksi potensi karakter injeksi berbahaya pada input username.',
              cheatSheetSummary: [
                'Wajib gunakan Prepared Statements / Parameterized Queries',
                'Jangan pernah gunakan string template / concatenation pada SQL query',
                'Batasi hak akses akun database (Read-only jika tidak perlu menulis)'
              ]
            },
            quiz: {
              minPassScorePercent: 80,
              questions: [
                {
                  id: 'q-sec1-1',
                  question: 'Metode manakah yang merupakan pertahanan paling efektif dan standar industri terhadap serangan SQL Injection?',
                  options: [
                    'Prepared Statements / Parameterized Queries',
                    'Mengganti huruf kecil menjadi huruf besar',
                    'Memblokir pengguna dengan IP luar negeri',
                    'Menghapus database setiap 24 jam'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Parameterized queries memisahkan struktur query yang dikompilasi dengan parameter data, mencegah parser database mengeksekusi input pengguna sebagai kode SQL.'
                },
                {
                  id: 'q-sec1-2',
                  question: 'Apa maksud dari prinsip "Principle of Least Privilege" dalam konteks keamanan akun database?',
                  options: [
                    'Memberikan hak akses seminimal mungkin yang hanya dibutuhkan aplikasi untuk menjalankan tugasnya',
                    'Memberikan akses administrator penuh ke semua developer',
                    'Membuat password sepanjang 4 karakter saja',
                    'Menonaktifkan semua firewall'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Prinsip hak akses terkecil memastikan jika sebuah akun database terkompromi, penyerang tidak dapat melakukan operasi berbahaya di luar batas hak yang diizinkan (misalnya tidak bisa DROP TABLE jika hanya butuh SELECT).'
                }
              ]
            }
          }
        ]
      }
    ]
  },

  // 3. HIGHER MATHEMATICS & CALCULUS
  {
    id: 'math-calculus-algebra',
    title: 'Matematika Tinggi: Kalkulus & Aljabar Linier',
    slug: 'higher-mathematics',
    category: 'science',
    categoryLabel: 'Matematika Murni & Terapan',
    iconName: 'Calculator',
    tagline: 'Kuasai limit, turunan, integral multivariabel, vektor eigen, dan kalkulus tensor untuk sains & AI',
    description: 'Fondasi matematika tingkat universitas dunia. Membangun intuisi analitis dari kalkulus diferensial hingga dekomposisi matriks untuk algoritma machine learning dan pemodelan fisika kuantum.',
    level: 'Menengah (Intermediate)',
    totalHours: 50,
    totalLessons: 24,
    color: '#8b5cf6',
    badge: {
      title: 'Master of Mathematical Analysis',
      icon: 'Sigma',
    },
    prerequisites: ['Aljabar SMA / Pra-Kalkulus', 'Trigonometri Dasar'],
    relatedUniversityMajors: ['Mathematics & Statistics (Cambridge, Harvard)', 'Computer Science / AI (MIT, Stanford)', 'Teknik Elektro / Fisika (ITB, UI)'],
    outcomes: ['Menurunkan dan menyelesaikan persamaan diferensial', 'Memahami dekomposisi matriks SVD & Eigendecomposition', 'Menerapkan kalkulus multivariabel untuk optimasi Gradient Descent'],
    modules: [
      {
        id: 'mod-math-1',
        title: 'Modul 1: Kalkulus Diferensial & Intuisi Laju Perubahan',
        description: 'Definisi formal limit epsilon-delta, aturan rantai (chain rule), dan turunan parsial.',
        lessons: [
          {
            id: 'lesson-math-1',
            title: '1. Definisi Formal Limit, Laju Perubahan & Turunan Parsial',
            description: 'Memahami turunan sebagai rasio kenaikan sesaat dan generalisasinya ke dimensi tinggi (Gradien).',
            durationMinutes: 45,
            xpReward: 220,
            difficulty: 'Menengah (Intermediate)',
            content: {
              overview: 'Turunan mengukur sensitivitas perubahan nilai fungsi terhadap perubahan variabel inputnya pada interval yang mendekati nol.',
              keyConcepts: [
                'Turunan f\'(x) didefinisikan sebagai limit h -> 0 dari [f(x+h) - f(x)] / h.',
                'Aturan rantai (Chain Rule) memungkinkan diferensiasi fungsi komposit f(g(x)).',
                'Turunan parsial ∂f/∂x mengukur laju perubahan fungsi multivariabel dengan menganggap variabel lain konstan.',
                'Vektor gradien ∇f menunjuk ke arah kenaikan paling curam (prinsip dasar optimasi AI Backpropagation).'
              ],
              detailedExplanation: `### Dari Garis Sekan Menjadi Garis Tangen
Jika kita memiliki fungsi kontinu $f(x)$, gradien antara dua titik $x$ dan $x+h$ adalah:
$$m = \\frac{f(x+h) - f(x)}{h}$$

Ketika $h \\to 0$, rasio ini mendekati nilai batas yang kita sebut sebagai turunan pertama $f'(x)$ atau $\\frac{df}{dx}$.

### Gradien dalam Multivariabel & Machine Learning
Jika $f(x, y) = x^2 + 3xy + y^2$, maka:
- $\\frac{\\partial f}{\\partial x} = 2x + 3y$ (menganggap $y$ sebagai konstanta)
- $\\frac{\\partial f}{\\partial y} = 3x + 2y$ (menganggap $x$ sebagai konstanta)

Vektor gradien $\\nabla f = \\begin{bmatrix} \\frac{\\partial f}{\\partial x} \\\\ \\frac{\\partial f}{\\partial y} \\end{bmatrix}$ selalu tegak lurus terhadap garis kontur dan menunjukkan arah peningkatan nilai fungsi secara maksimal. Algoritma Gradient Descent bergerak ke arah sebaliknya ($-\\nabla f$) untuk meminimalkan error.`,
              interactiveWidgetType: 'math-solver',
              practicalExercise: 'Hitunglah vektor gradien ∇f untuk fungsi kerugian f(w1, w2) = 2(w1)^2 + 4(w2)^2 - 6w1*w2 pada titik (1, 2).',
              cheatSheetSummary: [
                'd/dx [x^n] = n * x^(n-1)',
                'Chain Rule: d/dx [f(g(x))] = f\'(g(x)) * g\'(x)',
                'Gradient Descent: w_new = w_old - learning_rate * ∇f(w)'
              ]
            },
            quiz: {
              minPassScorePercent: 80,
              questions: [
                {
                  id: 'q-m1-1',
                  question: 'Berapakah turunan parsial ∂f/∂x dari fungsi f(x, y) = 4x^3 * y^2 + 7x - 5y?',
                  options: [
                    '12x^2 * y^2 + 7',
                    '12x^2 * 2y + 7',
                    '4x^3 * 2y - 5',
                    '12x^2 + 7 - 5'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Saat menurunkan terhadap x, y diperlakukan sebagai konstanta. d/dx(4x^3 * y^2) = 12x^2 * y^2, d/dx(7x) = 7, dan d/dx(-5y) = 0.'
                },
                {
                  id: 'q-m1-2',
                  question: 'Ke manakah arah yang ditunjukkan oleh vektor gradien ∇f pada sebuah titik?',
                  options: [
                    'Arah peningkatan nilai fungsi yang paling curam (maksimal)',
                    'Arah penurunan nilai fungsi paling drastis',
                    'Arah horizontal konstan',
                    'Arah acak tergantung seed'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Vektor gradien selalu menunjuk ke arah laju pertumbuhan fungsi paling maksimum. Oleh karena itu algoritma minimisasi bergerak ke arah sebaliknya (-∇f).'
                }
              ]
            }
          }
        ]
      }
    ]
  },

  // 4. MODERN PHYSICS & QUANTUM MECHANICS
  {
    id: 'physics-modern-quantum',
    title: 'Fisika Modern, Mekanika Klasik & Teori Kuantum',
    slug: 'modern-physics',
    category: 'science',
    categoryLabel: 'Fisika Teoretis & Eksperimental',
    iconName: 'Atom',
    tagline: 'Dari hukum gerak Newton, termodinamika, elektrodinamika Maxwell hingga dualitas gelombang-partikel',
    description: 'Menjelajahi hukum fundamental alam semesta. Pelajari mekanika Lagrangian, elektrodinamika klasik, relativitas khusus Einstein, hingga persamaan Schrödinger dalam mekanika kuantum.',
    level: 'Lanjutan (Advanced)',
    totalHours: 48,
    totalLessons: 20,
    color: '#06b6d4',
    badge: {
      title: 'Quantum Theoretical Physicist',
      icon: 'Orbit',
    },
    prerequisites: ['Kalkulus Dasar', 'Fisika SMA'],
    relatedUniversityMajors: ['Physics (Oxford, Cambridge, MIT, Caltech)', 'Applied Physics / Nuclear Engineering (ITB, UI)'],
    outcomes: ['Memahami formulasi Lagrangian dan kekekalan simetri (Teorema Noether)', 'Menjelaskan fenomena dualitas gelombang partikel dan ketidakpastian Heisenberg', 'Menyelesaikan persamaan Schrödinger satu dimensi'],
    modules: [
      {
        id: 'mod-phy-1',
        title: 'Modul 1: Revolusi Kuantum & Dualitas Gelombang-Partikel',
        description: 'Efek fotolistrik, radiasi benda hitam, dan persamaan de Broglie.',
        lessons: [
          {
            id: 'lesson-phy-1',
            title: '1. Radiasi Benda Hitam, Efek Fotolistrik & Kuantisasi Energi Planck',
            description: 'Bagaimana bencana ultraviolet memicu lahirnya fisika kuantum modern oleh Max Planck dan Albert Einstein.',
            durationMinutes: 45,
            xpReward: 230,
            difficulty: 'Lanjutan (Advanced)',
            content: {
              overview: 'Fisika klasik gagal menjelaskan spektrum radiasi benda hitam (Ultraviolet Catastrophe). Max Planck mempostulatkan bahwa energi dipancarkan dalam paket diskret (kuanta): E = hf.',
              keyConcepts: [
                'Kuantisasi energi: E = h * f (h = konstanta Planck 6.626 x 10^-34 J.s).',
                'Efek Fotolistrik membuktikan bahwa cahaya memiliki sifat partikel (foton).',
                'Fungsi kerja (Work Function Φ) adalah energi minimum yang diperlukan untuk melepaskan elektron dari permukaan logam.',
                'Panjang gelombang de Broglie: λ = h / p (setiap partikel bermassa memiliki sifat gelombang).'
              ],
              detailedExplanation: `### Bencana Ultraviolet & Solusi Planck
Hukum Rayleigh-Jeans klasik memprediksi intensitas radiasi benda hitam akan tak berhingga pada frekuensi tinggi (ultraviolet), yang melanggar hukum kekekalan energi.

Max Planck mengusulkan solusi radikal: osilator atomik hanya dapat menyerap atau memancarkan energi dalam kelipatan diskret:
$$E = n \\cdot h \\cdot f, \\quad n \\in \\{1, 2, 3, \\dots\\}$$

### Einstein & Efek Fotolistrik (Nobel Fisika 1921)
Ketika cahaya ditembakkan ke logam, elektron terpental hanya jika frekuensi cahaya ($f$) melebihi frekuensi ambang ($f_0$), tanpa memedulikan intensitas cahaya.
Persamaan fotolistrik Einstein:
$$E_k = hf - \\Phi$$
Di mana $E_k$ adalah energi kinetik maksimum elektron, $hf$ energi foton datang, dan $\\Phi$ adalah fungsi kerja logam.`,
              interactiveWidgetType: 'math-solver',
              practicalExercise: 'Sebuah permukaan logam memiliki fungsi kerja 2.2 eV. Jika disinari foton dengan energi 3.5 eV, berapakah energi kinetik maksimum fotoelektron yang terlepas dalam satuan eV?',
              cheatSheetSummary: [
                'E = h * f = h * c / λ',
                'Ek_maks = hf - Φ',
                '1 eV = 1.602 x 10^-19 Joule'
              ]
            },
            quiz: {
              minPassScorePercent: 80,
              questions: [
                {
                  id: 'q-p1-1',
                  question: 'Pada efek fotolistrik, faktor apa yang secara langsung menentukan apakah elektron akan terlepas dari permukaan logam?',
                  options: [
                    'Frekuensi foton cahaya yang datang (harus melebihi frekuensi ambang)',
                    'Intensitas/kecerahan cahaya saja tanpa peduli panjang gelombangnya',
                    'Ketebalan logam yang digunakan',
                    'Suhu ruangan tempat percobaan'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Elektron hanya dapat terlepas jika energi satu foton (E = hf) mampu mengatasi fungsi kerja logam (Φ), sehingga ditentukan oleh frekuensi, bukan intensitas.'
                },
                {
                  id: 'q-p1-2',
                  question: 'Jika fungsi kerja suatu logam adalah 2.0 eV dan ditembakkan foton berenergi 3.8 eV, berapa energi kinetik maksimum elektron yang lepas?',
                  options: [
                    '1.8 eV',
                    '5.8 eV',
                    '0.9 eV',
                    '0 eV (tidak ada elektron lepas)'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Ek = E_foton - Φ = 3.8 eV - 2.0 eV = 1.8 eV.'
                }
              ]
            }
          }
        ]
      }
    ]
  },

  // 5. PHILOSOPHY, LOGIC & CRITICAL REASONING
  {
    id: 'philosophy-logic-ethics',
    title: 'Filsafat, Logika Formal & Etika Kritis',
    slug: 'philosophy-logic',
    category: 'humanities',
    categoryLabel: 'Filsafat, Etika & Humaniora',
    iconName: 'BookOpen',
    tagline: 'Dari epistemologi Sokrates, logika predikat, hingga etika kecerdasan buatan & moralitas modern',
    description: 'Pelajari seni berpikir jernih, epistemologi (hakikat pengetahuan), dialektika, argumentasi deduktif/induktif, identifikasi kesesatan berpikir (logical fallacies), serta etika filsafat sosial.',
    level: 'Pemula (Beginner)',
    totalHours: 32,
    totalLessons: 15,
    color: '#f59e0b',
    badge: {
      title: 'Philosophical Dialectician',
      icon: 'Scale',
    },
    prerequisites: ['Pikiran Terbuka', 'Minat Membaca Kritis'],
    relatedUniversityMajors: ['Philosophy, Politics and Economics / PPE (Oxford)', 'Philosophy & Law (Harvard, Cambridge, UI)'],
    outcomes: ['Menyusun argumen silogisme valid dan sound', 'Mendeteksi 20+ jenis logical fallacy dalam debat dan media', 'Menganalisis dilema moral berbasis deontologi, utilitarianisme, dan virtue ethics'],
    modules: [
      {
        id: 'mod-phil-1',
        title: 'Modul 1: Fondasi Logika Formal & Identifikasi Fallacy',
        description: 'Premis, kesimpulan, silogisme kategoris, dan jebakan bias kognitif.',
        lessons: [
          {
            id: 'lesson-phil-1',
            title: '1. Struktur Argumen Deduktif, Validitas vs Kebenaran, & Fallacies',
            description: 'Membedakan argumen valid vs sound, serta membongkar Ad Hominem, Strawman, dan False Equivalence.',
            durationMinutes: 35,
            xpReward: 170,
            difficulty: 'Pemula (Beginner)',
            content: {
              overview: 'Logika adalah alat epistemik untuk mengevaluasi apakah sebuah kesimpulan niscaya mengikuti premis-premisnya secara rasional tanpa kontradiksi.',
              keyConcepts: [
                'Argumen terdiri dari Premis (alasan pendukung) dan Konklusi (klaim utama).',
                'Validitas berkaitan dengan bentuk logika (jika premis benar, konklusi pasti benar).',
                'Soundness (kesahihan) mensyaratkan argumen valid DAN semua premisnya secara faktual benar di dunia nyata.',
                'Fallacy adalah kesalahan penalaran yang membuat argumen cacat meskipun terdengar meyakinkan.'
              ],
              detailedExplanation: `### Validitas vs Soundness (Kesahihan)
Perhatikan dua silogisme ini:

**Contoh 1 (Valid tapi Unsound):**
- Premis 1: Semua ikan bisa terbang. (Faktual salah)
- Premis 2: Paus adalah ikan. (Faktual salah)
- Konklusi: Paus bisa terbang.
*Struktur logikanya valid secara deduktif, tetapi tidak Sound karena premisnya salah.*

**Contoh 2 (Valid & Sound):**
- Premis 1: Semua manusia fana (akan mati). (Benar)
- Premis 2: Sokrates adalah manusia. (Benar)
- Konklusi: Sokrates fana. (Pasti benar)

### Mengenal Logical Fallacies Paling Umum:
1. **Ad Hominem**: Menyerang pribadi/karakter lawan alih-alih substansi argumennya.
2. **Strawman (Orang-orangan Sawah)**: Memelintir argumen lawan menjadi versi yang lebih ekstrem/konyol agar mudah diserang.
3. **False Dichotomy**: Memaksa pilihan hanya ada dua ekstrem (hitam/putih) padahal terdapat spektrum opsi lain.`,
              interactiveWidgetType: 'law-case',
              practicalExercise: 'Analisis argumen berikut dan tentukan jenis logical fallacy-nya: "Kita tidak boleh mendengarkan teori ekonomi Dr. X tentang pajak, karena dia sendiri suka mengendarai mobil mewah!"',
              cheatSheetSummary: [
                'Valid = Struktur benar',
                'Sound = Valid + Premis faktual benar',
                'Debat yang baik menyerang argumen, bukan pribadi penutur'
              ]
            },
            quiz: {
              minPassScorePercent: 80,
              questions: [
                {
                  id: 'q-ph1-1',
                  question: 'Jika seorang pembicara berkata: "Pendapatmu tentang efisiensi energi surya salah karena kamu bahkan tidak lulus kuliah tepat waktu!", kesesatan logika apakah ini?',
                  options: [
                    'Argumentum Ad Hominem',
                    'Strawman Fallacy',
                    'Post Hoc Ergo Propter Hoc',
                    'Circular Reasoning (Begging the Question)'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Ad Hominem adalah cacat logika ketika seseorang menyerang identitas, masa lalu, atau karakter pribadi seseorang alih-alih membantah substansi argumen teknisnya.'
                },
                {
                  id: 'q-ph1-2',
                  question: 'Kapan sebuah argumen deduktif dapat dikatakan "Sound" (sahih paripurna)?',
                  options: [
                    'Ketika struktur silogismenya valid DAN seluruh premisnya benar secara faktual',
                    'Ketika argumennya disampaikan dengan intonasi meyakinkan',
                    'Ketika disetujui oleh suara mayoritas orang',
                    'Ketika kesimpulannya tidak bisa dibantah oleh hukum'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Dalam logika formal, argumen Sound harus memenuhi dua syarat mutlak: strukturnya valid secara deduktif dan setiap premis pendukungnya benar secara empiris/faktual.'
                }
              ]
            }
          }
        ]
      }
    ]
  },

  // 6. LAW & CONSTITUTIONAL JURISPRUDENCE
  {
    id: 'law-jurisprudence-cyber',
    title: 'Ilmu Hukum, Konstitusi & Regulasi Digital',
    slug: 'law-jurisprudence',
    category: 'humanities',
    categoryLabel: 'Ilmu Hukum & Tata Negara',
    iconName: 'Landmark',
    tagline: 'Prinsip tata negara, doktrin pemisahan kekuasaan, asas legalitas, hingga hukum privasi data & AI',
    description: 'Pahami hierarki perundang-undangan, asas peradilan yang adil (due process of law), hukum perdata & pidana internasional, serta regulasi privasi data (GDPR/UU PDP) dan etika hukum kecerdasan buatan.',
    level: 'Menengah (Intermediate)',
    totalHours: 34,
    totalLessons: 14,
    color: '#10b981',
    badge: {
      title: 'Juris Doctor Scholar',
      icon: 'FileCheck2',
    },
    prerequisites: ['Kemampuan Literasi Analitis'],
    relatedUniversityMajors: ['Law / Jurisprudence (Oxford, Harvard, Cambridge)', 'Ilmu Hukum (UI, UGM, Unpad)'],
    outcomes: ['Menganalisis judicial review dan asas hukum tata negara', 'Memahami perlindungan data pribadi dan liabilitas hukum AI', 'Menyusun legal reasoning terstruktur berbasis IRAC (Issue, Rule, Application, Conclusion)'],
    modules: [
      {
        id: 'mod-law-1',
        title: 'Modul 1: Teori Hukum Tata Negara & Asas Legalitas',
        description: 'Hierarki norma hukum Hans Kelsen, Trias Politica, dan Judicial Review.',
        lessons: [
          {
            id: 'lesson-law-1',
            title: '1. Stufenbau Theory (Hans Kelsen) & Supremasi Konstitusi',
            description: 'Bagaimana tata urutan norma hukum bekerja dari Grundnorm (Norma Dasar) hingga regulasi teknis operasional.',
            durationMinutes: 40,
            xpReward: 190,
            difficulty: 'Menengah (Intermediate)',
            content: {
              overview: 'Teori Hierarki Norma Hukum (Stufenbautheorie) menyatakan bahwa norma hukum yang lebih rendah tidak boleh bertentangan dengan norma hukum yang lebih tinggi tingkatannya.',
              keyConcepts: [
                'Grundnorm adalah norma dasar tertinggi yang menjadi sumber legitimasi seluruh sistem hukum.',
                'Lex Superior Derogat Legi Inferiori: Hukum yang lebih tinggi mengesampingkan hukum yang lebih rendah.',
                'Lex Specialis Derogat Legi Generali: Hukum khusus mengesampingkan hukum umum.',
                'Lex Posterior Derogat Legi Priori: Hukum baru mengesampingkan hukum lama yang setingkat.'
              ],
              detailedExplanation: `### Hierarki Norma & Asas-Asas Preferensi Hukum
Dalam sistem hukum modern (berdasarkan ajaran Hans Kelsen dan Nawiasky):
1. **Staatsfundamentalnorm**: Pancasila / Norma Fundamental Negara.
2. **Staatsgrundgesetz**: Undang-Undang Dasar (Konstitusi).
3. **Formell Gesetz**: Undang-Undang / Perpu.
4. **Verordnung**: Peraturan Pemerintah, Perpres, dan Perda.

Jika terjadi pertentangan norma:
- Uji materiil terhadap Undang-Undang terhadap UUD diuji oleh Mahkamah Konstitusi.
- Uji materiil peraturan di bawah UU terhadap UU diuji oleh Mahkamah Agung.

Penerapan metode penalaran hukum **IRAC**:
- **Issue**: Apa sengketa hukum yang dihadapi?
- **Rule**: Pasal, undang-undang, atau preseden apa yang mengatur?
- **Application**: Bagaimana fakta peristiwa dicocokkan dengan unsur pasal?
- **Conclusion**: Apa konsekuensi atau putusan hukumnya?`,
              interactiveWidgetType: 'law-case',
              practicalExercise: 'Jika ada Peraturan Daerah yang membatasi hak asasi warga bertentangan dengan UU Hak Asasi Manusia dan UUD 1945, lembaga peradilan manakah yang berwenang menguji pembatalannya?',
              cheatSheetSummary: [
                'Lex Superior Derogat Legi Inferiori (Tingkat)',
                'Lex Specialis Derogat Legi Generali (Kekhususan)',
                'Lex Posterior Derogat Legi Priori (Waktu terbit)'
              ]
            },
            quiz: {
              minPassScorePercent: 80,
              questions: [
                {
                  id: 'q-l1-1',
                  question: 'Asas hukum manakah yang menegaskan bahwa aturan hukum yang kedudukannya lebih tinggi mengesampingkan aturan hukum yang lebih rendah jika keduanya bertentangan?',
                  options: [
                    'Lex Superior Derogat Legi Inferiori',
                    'Lex Specialis Derogat Legi Generali',
                    'Lex Posterior Derogat Legi Priori',
                    'Pacta Sunt Servanda'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Lex Superior Derogat Legi Inferiori adalah doktrin hierarki norma yang menyatakan norma yang lebih tinggi selalu mengalahkan norma yang lebih rendah.'
                },
                {
                  id: 'q-l1-2',
                  question: 'Metode penalaran analisis sengketa hukum klasik yang terdiri dari Issue, Rule, Application, dan Conclusion dikenal dengan akronim:',
                  options: [
                    'IRAC Method',
                    'CRUD Pattern',
                    'REST Protocol',
                    'SWOT Matrix'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'IRAC (Issue, Rule, Application, Conclusion) adalah kerangka baku analisis hukum di sekolah hukum terkemuka dunia untuk menyusun argumen legal yang presisi.'
                }
              ]
            }
          }
        ]
      }
    ]
  },

  // 7. ASTRONOMY & ASTROPHYSICS
  {
    id: 'astronomy-astrophysics-space',
    title: 'Astronomi, Astrofisika & Kosmologi Kosmik',
    slug: 'astronomy-astrophysics',
    category: 'science',
    categoryLabel: 'Ilmu Kebumian & Antariksa',
    iconName: 'Telescope',
    tagline: 'Evolusi bintang, horizon peristiwa lubang hitam, mekanika orbit Kepler, dan ekspansi alam semesta',
    description: 'Menjelajahi kosmos dari mekanika tata surya hingga kosmologi relativitas umum. Pelajari spektroskopi bintang, diagram Hertzsprung-Russell, materi gelap (Dark Matter), dan gelombang gravitasi.',
    level: 'Menengah (Intermediate)',
    totalHours: 36,
    totalLessons: 16,
    color: '#38bdf8',
    badge: {
      title: 'Astrophysical Cosmic Pioneer',
      icon: 'Sparkles',
    },
    prerequisites: ['Fisika Mekanika Dasar', 'Kalkulus Dasar'],
    relatedUniversityMajors: ['Astronomy & Astrophysics (Harvard, Cambridge, Caltech)', 'Astronomi (ITB)'],
    outcomes: ['Menghitung orbit planet dengan Hukum Kepler & Newton', 'Menganalisis siklus hidup bintang dari nebula hingga supernova / neutron star', 'Memahami metrik ekspansi Friedmann-Lemaître-Robertson-Walker'],
    modules: [
      {
        id: 'mod-astro-1',
        title: 'Modul 1: Mekanika Benda Langit & Evolusi Bintang',
        description: 'Hukum Kepler, gravitasi universal, dan fusi nuklir dalam inti bintang.',
        lessons: [
          {
            id: 'lesson-astro-1',
            title: '1. Hukum Kepler, Gravitasi Universal & Keseimbangan Hidrostatis Bintang',
            description: 'Bagaimana bintang mempertahankan kestabilannya melawan keruntuhan gravitasi melalui fusi termonuklir.',
            durationMinutes: 40,
            xpReward: 200,
            difficulty: 'Menengah (Intermediate)',
            content: {
              overview: 'Sebuah bintang seperti Matahari berada dalam Keseimbangan Hidrostatis (Hydrostatic Equilibrium): tekanan radiasi termonuklir ke arah luar menyeimbangkan tarikan gravitasi ke arah dalam secara sempurna.',
              keyConcepts: [
                'Hukum Kepler 1: Orbit planet berbentuk elips dengan Matahari di salah satu fokusnya.',
                'Hukum Kepler 3: T^2 proporsional dengan a^3 (kuadrat periode orbit sebanding dengan pangkat tiga sumbu semi-mayor).',
                'Fusi Hidrogen menjadi Helium melalui siklus Proton-Proton menghasilkan energi foton masif (E = mc^2).',
                'Batas Chandrasekhar (~1.4 Massa Matahari) menentukan apakah sisa inti bintang menjadi Katai Putih atau Runtuh menjadi Bintang Neutron / Black Hole.'
              ],
              detailedExplanation: `### Persamaan Keseimbangan Hidrostatis
Untuk setiap lapisan bintang pada radius $r$:
$$\\frac{dP}{dr} = -\\frac{G \\cdot M(r) \\cdot \\rho(r)}{r^2}$$
Di mana $P$ adalah tekanan gas dan radiasi, $M(r)$ massa di dalam radius $r$, dan $\\rho(r)$ massa jenis lokal.

Jika bahan bakar hidrogen habis di inti:
1. Tekanan radiasi turun.
2. Inti mengerut karena gravitasi, memicu pembakaran helium di kulit terluar (fase Raksasa Merah / Red Giant).
3. Tergantung massa awal bintang:
   - $M < 8 M_{\\odot}$: Menjadi Katai Putih (White Dwarf) dilindungi oleh tekanan degenerasi elektron.
   - $8 M_{\\odot} < M < 20 M_{\\odot}$: Supernova menghasilkan Bintang Neutron.
   - $M > 20 M_{\\odot}$: Keruntuhan gravitasi total membentuk Lubang Hitam (Black Hole).`,
              interactiveWidgetType: 'math-solver',
              practicalExercise: 'Jika sebuah planet mengorbit bintang pada jarak 4 AU (Satuan Astronomi), berapa tahun periode revolusi planet tersebut mengitari bintangnya?',
              cheatSheetSummary: [
                'Kepler III: T^2 = a^3 (dalam satuan tahun dan AU)',
                'Batas Chandrasekhar = 1.44 M_sun',
                'E = Δm * c^2 (Defek massa fusi nuklir)'
              ]
            },
            quiz: {
              minPassScorePercent: 80,
              questions: [
                {
                  id: 'q-as1-1',
                  question: 'Berdasarkan Hukum III Kepler, jika jarak rata-rata sebuah planet ke Matahari adalah 4 AU, berapa periode orbit (T) planet tersebut?',
                  options: [
                    '8 tahun (karena 4^3 = 64, dan akar kuadrat dari 64 adalah 8)',
                    '16 tahun',
                    '2 tahun',
                    '64 tahun'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Rumus T^2 = a^3. a = 4, maka a^3 = 64. T = sqrt(64) = 8 tahun.'
                },
                {
                  id: 'q-as1-2',
                  question: 'Batas massa maksimum sebesar ~1.44 Massa Matahari di mana sebuah bintang katai putih masih dapat bertahan dari keruntuhan gravitasi disebut:',
                  options: [
                    'Batas Chandrasekhar',
                    'Batas Event Horizon Schwarzschild',
                    'Batas Roche',
                    'Batas Hubble'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Batas Chandrasekhar dirumuskan oleh fisikawan Subrahmanyan Chandrasekhar sebagai batas massa stabil katai putih sebelum runtuh menjadi bintang neutron.'
                }
              ]
            }
          }
        ]
      }
    ]
  },

  // 8. ARCHITECTURE & SPATIAL DESIGN
  {
    id: 'architecture-spatial-design',
    title: 'Arsitektur, Desain Spasial & Rekayasa Bangunan Berkelanjutan',
    slug: 'architecture-spatial',
    category: 'engineering',
    categoryLabel: 'Arsitektur & Rekayasa Spasial',
    iconName: 'Compass',
    tagline: 'Prinsip tektonika struktur, zonasi spasial, biomimikri, dan pemodelan BIM berkelanjutan',
    description: 'Kuasai keterpaduan estetika, fungsionalitas ruang, analisis pencahayaan alami, struktur cantilever, pemilihan material ramah lingkungan (Net-Zero Building), serta prinsip arsitektur modern.',
    level: 'Menengah (Intermediate)',
    totalHours: 35,
    totalLessons: 15,
    color: '#14b8a6',
    badge: {
      title: 'Sustainable Master Architect',
      icon: 'Building2',
    },
    prerequisites: ['Geometri Spasial Dasar'],
    relatedUniversityMajors: ['Architecture (MIT, Harvard GSD, TU Delft, UCL Bartlett)', 'Arsitektur (ITB, UI)'],
    outcomes: ['Merancang denah ergonomis dengan sirkulasi ruang efisien', 'Menerapkan strategi pasif pencahayaan dan penghawaan alami', 'Menguasai integrasi Building Information Modeling (BIM)'],
    modules: [
      {
        id: 'mod-arch-1',
        title: 'Modul 1: Tektonika Ruang, Skala Antropometri & Desain Pasif',
        description: 'Hubungan proporsi tubuh manusia dengan ruang, sun-path analysis, dan ventilasi silang.',
        lessons: [
          {
            id: 'lesson-arch-1',
            title: '1. Desain Pasif Surya (Passive Solar) & Optimasi Cross-Ventilation',
            description: 'Memaksimalkan efisiensi energi bangunan tropis dan subtropis melalui orientasi massa bangunan dan sun-shading.',
            durationMinutes: 35,
            xpReward: 180,
            difficulty: 'Menengah (Intermediate)',
            content: {
              overview: 'Arsitektur berkelanjutan mengutamakan strategi desain pasif (Passive Design) untuk meminimalkan ketergantungan pada pendingin/pemanas mekanis elektrik aktif.',
              keyConcepts: [
                'Orientasi fasad utama menghadap Utara-Selatan di daerah tropis untuk meminimalkan radiasi termal langsung.',
                'Cross Ventilation (Ventilasi Silang) memanfaatkan perbedaan tekanan udara antar bukaan berseberangan.',
                'Thermal Mass (massa termal bahan) menyerap panas siang hari dan melepaskannya perlahan di malam hari.',
                'Sun-shading (overhang / louver) memblokir sinar matahari tinggi saat siang terik namun memasukkan pencahayaan alami difus.'
              ],
              detailedExplanation: `### Mengapa Orientasi Bangunan Menjadi Penentu Utama Efisiensi Energi?
Di iklim tropis seperti Asia Tenggara:
- Matahari bergerak dari Timur ke Barat dengan sudut zenith tinggi.
- Bukaan kaca besar di sisi Timur dan Barat menyebabkan efek rumah kaca internal yang meningkatkan beban konsumsi AC hingga 40%.
- Fasad Utara dan Selatan menerima radiasi panas terendah sepanjang tahun, menjadikannya lokasi ideal untuk jendela ruang kerja utama.

### Efek Stack (Cerobong Udara Alami)
Udara hangat secara alami memiliki massa jenis lebih rendah dan naik ke atas. Dengan menyediakan void atau bukaan atas pada atap (skylight louvers), udara panas ditarik keluar dan menciptakan tarikan udara segar dingin dari bukaan bawah tanpa kipas mekanik.`,
              interactiveWidgetType: 'circuit-diagram',
              practicalExercise: 'Rancanglah diagram zonasi ruang untuk rumah tinggal 2 lantai di daerah tropis agar ruang keluarga mendapatkan pencahayaan alami tanpa silau panas matahari barat.',
              cheatSheetSummary: [
                'Bukaan utama utara-selatan',
                'Tinggi plafon minimal 3.2m untuk sirkulasi udara tropis',
                'Gunakan kisi-kisi peneduh (brise-soleil) pada fasad barat'
              ]
            },
            quiz: {
              minPassScorePercent: 80,
              questions: [
                {
                  id: 'q-ar1-1',
                  question: 'Di wilayah tropis khatulistiwa, orientasi bukaan jendela kaca utama terbaik untuk meminimalkan beban panas radiasi matahari langsung adalah menghadap:',
                  options: [
                    'Utara dan Selatan',
                    'Barat dan Timur',
                    'Hanya Barat',
                    'Tergantung arah kiblat'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Fasad Utara dan Selatan menerima radiasi langsung matahari paling sedikit di daerah tropis, sehingga ruangan tetap terang alami tanpa suhu panas ekstrem.'
                },
                {
                  id: 'q-ar1-2',
                  question: 'Fenomena naiknya udara hangat ke atas yang dimanfaatkan untuk sirkulasi alami tanpa listrik pada arsitektur disebut:',
                  options: [
                    'Stack Effect (Efek Cerobong)',
                    'Coanda Effect',
                    'Doppler Shift',
                    'Bernoulli Stall'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Stack effect memanfaatkan perbedaan densitas udara panas (lebih ringan) untuk mengalir keluar melalui ventilasi atas, menarik udara sejuk dari bawah.'
                }
              ]
            }
          }
        ]
      }
    ]
  },

  // 9. GEOLOGY & EARTH SYSTEMS
  {
    id: 'geology-earth-systems',
    title: 'Geologi, Tektonik Lempeng & Kebumian Dinamis',
    slug: 'geology-earth-systems',
    category: 'science',
    categoryLabel: 'Ilmu Geologi & Kebumian',
    iconName: 'Mountain',
    tagline: 'Dari siklus batuan, dinamika mantel bumi, sesar tektonik, hingga mitigasi bencana gempa bumi',
    description: 'Pahami struktur internal bumi, mekanika lempeng tektonik litosfer, vulkanologi, mineralogi optik, stratigrafi pengendapan sedimen, serta eksplorasi sumber daya bumi berkelanjutan.',
    level: 'Menengah (Intermediate)',
    totalHours: 32,
    totalLessons: 14,
    color: '#84cc16',
    badge: {
      title: 'Geological Earth Pioneer',
      icon: 'Layers',
    },
    prerequisites: ['Sains IPA Dasar'],
    relatedUniversityMajors: ['Earth & Planetary Sciences (Stanford, Harvard, ETH Zurich)', 'Teknik Geologi (ITB, UGM)'],
    outcomes: ['Mengidentifikasi jenis batuan beku, sedimen, dan metamorf', 'Menganalisis tipe batas lempeng konvergen, divergen, dan transform', 'Menjelaskan mekanisme rambat gelombang seismik P dan S'],
    modules: [
      {
        id: 'mod-geo-1',
        title: 'Modul 1: Tektonik Lempeng & Gelombang Seismik',
        description: 'Batas lempeng, zona subduksi Ring of Fire, dan pencatatan seismograf.',
        lessons: [
          {
            id: 'lesson-geo-1',
            title: '1. Teori Tektonik Lempeng, Zona Subduksi & Propagasi Seismik',
            description: 'Mengapa lempeng bergerak karena konveksi mantel bumi dan bagaimana gelombang P & S mendeteksi episentrum gempa.',
            durationMinutes: 35,
            xpReward: 180,
            difficulty: 'Menengah (Intermediate)',
            content: {
              overview: 'Kerak bumi dan mantel atas (litosfer) terbagi menjadi lempeng-lempeng kaku yang terapung di atas astenosfer plastis yang digerakkan oleh arus konveksi panas.',
              keyConcepts: [
                'Batas Konvergen: Dua lempeng bertumbukan (Subduksi lempeng samudra di bawah lempeng benua memicu palung laut dan cincin gunung api).',
                'Batas Divergen: Dua lempeng saling menjauh (Membentuk punggungan tengah samudra / Mid-Ocean Ridge).',
                'Batas Transform: Dua lempeng saling bergesekan mendatar (misalnya Sesar San Andreas atau Sesar Semangko).',
                'Gelombang Primer (P-wave) adalah gelombang longitudinal kompresional tercepat; Gelombang Sekunder (S-wave) adalah gelombang transversal yang tidak dapat merambat melalui fluida/cair.'
              ],
              detailedExplanation: `### Mengapa Inti Luar Bumi Diketahui Berbentuk Cair?
Bukti paling elegan dalam geofisika global adalah **Zona Bayangan Seismik (Seismic Shadow Zone)**:
1. Gelombang P (kompresi) dapat merambat melalui zat padat, cair, maupun gas.
2. Gelombang S (geser) HANYA dapat merambat melalui zat padat karena fluida tidak memiliki modulus geser (shear stress).
3. Ketika gempa bumi besar terjadi, seismograf di belahan bumi seberang mencatat ketiadaan gelombang S langsung pada sudut > 104°, membuktikan bahwa inti luar bumi (Outer Core) berada dalam wujud logam cair (nikel-besi).`,
              interactiveWidgetType: 'none',
              practicalExercise: 'Jika stasiun seismograf mencatat selisih waktu tiba gelombang S dan gelombang P (S-P interval) sebesar 30 detik, hitung perkiraan jarak episentrum gempa menggunakan rumus Laska: Delta = ((S-P) - 1 menit) x 1000 km.',
              cheatSheetSummary: [
                'Gelombang P = Longitudinal (Cepat, merambat di padat & cair)',
                'Gelombang S = Transversal (Hanya merambat di padat)',
                'Cincin Api Pasifik terbentuk dari zona subduksi konvergen'
              ]
            },
            quiz: {
              minPassScorePercent: 80,
              questions: [
                {
                  id: 'q-g1-1',
                  question: 'Mengapa gelombang seismik S (transversal) tidak dapat merambat melalui lapisan inti luar (outer core) bumi?',
                  options: [
                    'Karena inti luar bumi berwujud cair dan fluida tidak memiliki ketahanan modulus geser',
                    'Karena inti luar bumi terlalu dingin',
                    'Karena gelombang S terserap oleh medan magnet',
                    'Karena gelombang S hanya merambat di udara'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Gelombang S membutuhkan medium elastis padat untuk mentransmisikan gaya geser; fluida/cairan tidak memiliki elastisitas geser sehingga gelombang S berhenti.'
                },
                {
                  id: 'q-g1-2',
                  question: 'Tipe batas lempeng tektonik di mana lempeng samudra yang lebih padat menunjam ke bawah lempeng benua disebut:',
                  options: [
                    'Zona Subduksi (Batas Konvergen)',
                    'Mid-Ocean Ridge (Batas Divergen)',
                    'Strike-Slip Fault (Batas Transform)',
                    'Hotspot Volcanism'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Zona subduksi adalah batas konvergen di mana lempeng samudra tenggelam ke mantel bumi di bawah lempeng lain, menghasilkan gempa megathrust dan busur gunung api.'
                }
              ]
            }
          }
        ]
      }
    ]
  },

  // 10. CIVICS, PPKN & STATECRAFT
  {
    id: 'civics-ppkn-geopolitics',
    title: 'Pendidikan Pancasila, Kewarganegaraan & Geopolitik Global',
    slug: 'civics-ppkn',
    category: 'humanities',
    categoryLabel: 'Pendidikan Karakter & Tata Negara',
    iconName: 'Flag',
    tagline: 'Filsafat Pancasila, wawasan nusantara, hak asasi manusia, integritas publik, dan diplomasi geopolitik',
    description: 'Kaji landasan filosofis kebangsaan Indonesia, konstitusi UUD 1945, sistem peradilan, etika anti-korupsi, wawasan nusantara, demokrasi deliberatif, serta pergeseran kekuatan geopolitik Indo-Pasifik.',
    level: 'Pemula (Beginner)',
    totalHours: 30,
    totalLessons: 12,
    color: '#e11d48',
    badge: {
      title: 'Civic Statesman Scholar',
      icon: 'Shield',
    },
    prerequisites: ['Literasi Kebangsaan'],
    relatedUniversityMajors: ['Political Science & International Relations (Harvard, Oxford, Sciences Po)', 'Ilmu Politik & Hubungan Internasional (UI, UGM)'],
    outcomes: ['Menganalisis nilai instrumental dan praksis Pancasila dalam kebijakan publik', 'Memahami perlindungan HAM dan checks and balances lembaga negara', 'Menganalisis dinamika geopolitik kawasan dan kedaulatan maritim'],
    modules: [
      {
        id: 'mod-civ-1',
        title: 'Modul 1: Pancasila Sebagai Ideologi Terbuka & Demokrasi Konstitusional',
        description: 'Nilai dasar, instrumental, praksis, dan sistem pemisahan kekuasaan negara.',
        lessons: [
          {
            id: 'lesson-civ-1',
            title: '1. Dimensi Pancasila Ideologi Terbuka & Prinsip Checks and Balances',
            description: 'Bagaimana nilai universal Pancasila berdialog dengan perkembangan zaman tanpa kehilangan jati diri bangsa.',
            durationMinutes: 30,
            xpReward: 160,
            difficulty: 'Pemula (Beginner)',
            content: {
              overview: 'Pancasila sebagai ideologi terbuka memiliki kelenturan dinamis untuk menyerap nilai-nilai kemajuan peradaban global sambil tetap berpijak kokoh pada nilai fundamental ketuhanan, kemanusiaan, persatuan, kerakyatan, dan keadilan.',
              keyConcepts: [
                'Dimensi Realitas: Nilai-nilai berakar dari kehidupan nyata masyarakat nusantara.',
                'Dimensi Idealisme: Mengandung cita-cita masa depan bangsa yang adil dan makmur.',
                'Dimensi Fleksibilitas: Mampu mengadaptasi perkembangan sains dan teknologi tanpa kehilangan prinsip moral.',
                'Checks and Balances: Pembagian kekuasaan antara Eksekutif, Legislatif, dan Yudikatif untuk mencegah tirani kekuasaan.'
              ],
              detailedExplanation: `### Tiga Tingkatan Nilai dalam Pancasila
1. **Nilai Dasar (Aksologis)**: Bersifat abadi dan fundamental dalam 5 sila (Ketuhanan, Kemanusiaan, Persatuan, Musyawarah, Keadilan).
2. **Nilai Instrumental**: Penjabaran nilai dasar dalam bentuk pasal UUD 1945, UU, Perpu, dan regulasi kelembagaan.
3. **Nilai Praksis**: Realisasi nyata dalam perilaku sehari-hari warga negara, integritas anti-korupsi, dan toleransi kebhinekaan.`,
              interactiveWidgetType: 'none',
              practicalExercise: 'Jelaskan bagaimana sila kedua dan kelima Pancasila menjadi landasan etis dalam pengembangan kecerdasan buatan (AI) agar tidak menimbulkan diskriminasi sosial.',
              cheatSheetSummary: [
                'Ideologi Terbuka = Realitas + Idealisme + Fleksibilitas',
                'Trias Politica = Pembagian dan pengawasan silang kekuasaan',
                'Integritas dan meritokrasi adalah wujud praksis keadilan sosial'
              ]
            },
            quiz: {
              minPassScorePercent: 80,
              questions: [
                {
                  id: 'q-c1-1',
                  question: 'Ciri utama Pancasila sebagai ideologi terbuka adalah:',
                  options: [
                    'Mampu beradaptasi dengan perkembangan zaman tanpa mengubah nilai-nilai dasarnya',
                    'Dapat diubah setiap kali terjadi pergantian presiden',
                    'Hanya berlaku untuk satu golongan agama tertentu',
                    'Menolak semua bentuk kemajuan teknologi luar negeri'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Ideologi terbuka bersifat dinamis, mampu merespons tantangan zaman melalui penafsiran instrumental dan praksis yang relevan dengan kemajuan peradaban.'
                },
                {
                  id: 'q-c1-2',
                  question: 'Mekanisme pengawasan dan perimbangan kekuasaan antar lembaga eksekutif, legislatif, dan yudikatif dalam negara hukum dikenal dengan istilah:',
                  options: [
                    'Checks and Balances',
                    'Oligarki Terpimpin',
                    'Monarki Absolut',
                    'Veto unilateral'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Checks and balances memastikan tidak ada satu cabang kekuasaan negara pun yang menjadi mutlak dan tidak terkontrol.'
                }
              ]
            }
          }
        ]
      }
    ]
  },

  // 11. ISLAMIC EDUCATION & CIVILIZATION (PAI)
  {
    id: 'pai-islamic-civilization',
    title: 'Pendidikan Agama Islam, Peradaban & Epistemologi Sains Islam',
    slug: 'pai-islamic-civilization',
    category: 'humanities',
    categoryLabel: 'Pendidikan Agama & Peradaban',
    iconName: 'Moon',
    tagline: 'Dari Golden Age Baghdad/Cordoba, fiqih muamalah digital, hingga etika integrasi sains dan wahyu',
    description: 'Pelajari tauhid, ushul fiqh, warisan keilmuan era keemasan Islam (Al-Khwarizmi, Ibnu Sina, Ibnu Rusyd, Al-Biruni), fiqih teknologi kontemporer (fintech & etika bioetika), serta akhlak mulia.',
    level: 'Pemula (Beginner)',
    totalHours: 30,
    totalLessons: 12,
    color: '#059669',
    badge: {
      title: 'Islamic Civilizational Thinker',
      icon: 'HeartHandshake',
    },
    prerequisites: ['Literasi Dasar'],
    relatedUniversityMajors: ['Islamic Studies & Near Eastern Studies (Oxford, Harvard, SOAS London)', 'Kajian Islam & Peradaban (UIN, UI)'],
    outcomes: ['Memahami metodologi Ushul Fiqh dalam ijtihad kontemporer', 'Menganalisis sumbangan ilmuwan muslim terhadap sains dan matematika modern', 'Menerapkan akhlakul karimah dalam pergaulan global dan etika digital'],
    modules: [
      {
        id: 'mod-pai-1',
        title: 'Modul 1: Epistemologi Islam & Sumbangan Sains Golden Age',
        description: 'Integrasi wahyu dan akal, Baitul Hikmah Baghdad, dan kelahiran Aljabar.',
        lessons: [
          {
            id: 'lesson-pai-1',
            title: '1. Epistemologi Sains Islam: Al-Khwarizmi, Ibnu Sina & Ushul Fiqh',
            description: 'Bagaimana ilmuwan muslim abad pertengahan menggabungkan ketelitian empiris dengan kesadaran tauhid.',
            durationMinutes: 35,
            xpReward: 160,
            difficulty: 'Pemula (Beginner)',
            content: {
              overview: 'Dalam tradisi keilmuan Islam, pencarian sains alam (ayat kauniyyah) dan pemahaman wahyu (ayat qauliyyah) adalah dua jalan yang saling melengkapi untuk mengagungkan Sang Pencipta.',
              keyConcepts: [
                'Al-Khwarizmi mendirikan dasar Aljabar (Kitab al-Jabr wa-l-Muqabala) dan sistem angka nol algoritma.',
                'Ibnu Sina (Avicenna) menyusun The Canon of Medicine yang menjadi rujukan kedokteran Eropa selama 500 tahun.',
                'Maqashid Syariah (Tujuan Utama Syariat): Menjaga Agama (Hifdz ad-Din), Jiwa (an-Nafs), Akal (al-Aql), Keturunan (an-Nasl), dan Harta (al-Mal).',
                'Ijtihad dan Qiyas sebagai metode penetapan hukum pada masalah-masalah modern yang belum ada di teks klasik.'
              ],
              detailedExplanation: `### Maqashid Syariah Sebagai Kompas Etika Teknologi Modern
Segala inovasi teknologi—termasuk AI, rekayasa genetika, dan fintech—dapat dievaluasi kemaslahatan publiknya (Jalb al-Manfa'ah wa Dar' al-Mafsadah) menggunakan lima pilar pelindung Maqashid Syariah:
1. **Menjaga Akal (Hifdz al-Aql)**: Teknologi informasi harus mencerdaskan dan bebas dari disinformasi/hoaks.
2. **Menjaga Harta (Hifdz al-Mal)**: Larangan transaksi riba, gharar (ketidakjelasan ekstrem), dan penipuan digital.
3. **Menjaga Jiwa (Hifdz an-Nafs)**: Keamanan siber dan perlindungan nyawa manusia dalam sistem otomasi.`,
              interactiveWidgetType: 'none',
              practicalExercise: 'Jelaskan penerapan prinsip Hifdz al-Aql (menjaga akal) dan Hifdz al-Mal (menjaga harta) dalam memilih instrumen investasi syariah modern.',
              cheatSheetSummary: [
                'Al-Jabr = Pemulihan/Penyelesaian persamaan (Aljabar)',
                '5 Pilar Maqashid Syariah menjaga: Agama, Jiwa, Akal, Keturunan, Harta',
                'Kemaslahatan umum (Maslahah Mursalah) adalah inti hukum Islam'
              ]
            },
            quiz: {
              minPassScorePercent: 80,
              questions: [
                {
                  id: 'q-pai1-1',
                  question: 'Siapakah matematikawan muslim yang memperkenalkan konsep aljabar dan algoritma ke dunia peradaban global?',
                  options: [
                    'Muhammad ibn Musa Al-Khwarizmi',
                    'Ibnu Khaldun',
                    'Al-Ghazali',
                    'Ibnu Battuta'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Al-Khwarizmi menulis karya monumental Al-Kitab al-mukhtasar fi hisab al-jabr wa-l-muqabala, yang menjadi asal-usul kata Algebra dan Algorithm.'
                },
                {
                  id: 'q-pai1-2',
                  question: 'Konsep dalam Ushul Fiqh yang merujuk pada lima tujuan fundamental perlindungan manusia (agama, jiwa, akal, keturunan, harta) dikenal sebagai:',
                  options: [
                    'Maqashid Syariah',
                    'Ijma Sahabat',
                    'Urf Shahih',
                    'Sadd az-Zari\'ah'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Maqashid Syariah adalah prinsip universal hukum Islam yang bertujuan mewujudkan kemaslahatan dan menolak kemudaratan bagi seluruh umat manusia.'
                }
              ]
            }
          }
        ]
      }
    ]
  }
];
