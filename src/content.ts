export type Language = "pt" | "en";
export type Theme = "light" | "dark";
export type Localized = { pt: string; en: string };
export const l = (pt: string, en: string): Localized => ({ pt, en });

export const profiles = [
  { name: "GitHub", url: "https://github.com/juniorrondini" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/juniorrondini" },
];

export const copy = {
  pt: {
    skip: "Pular para o conteúdo",
    nav: ["Projetos", "Sobre", "Laboratório", "Contato"],
    language: "Switch to English",
    theme: "Alternar tema",
    menu: "Abrir menu",
    close: "Fechar",
    menuLabel: "Menu",
    light: "Claro",
    dark: "Escuro",
    inFocus: "EM FOCO",
    heroPreview: "Abrir prévia",
    previewControls: "Prévias dos trabalhos",
    selectPreview: "Mostrar prévia",
    pausePreview: "Pausar alternância das prévias",
    resumePreview: "Retomar alternância das prévias",
    pause: "Pausar",
    resume: "Reproduzir",
    galleryLabel: "Índice dos trabalhos",
    galleryInstruction: "ESCOLHA UM TRABALHO",
    chooseProject: "Selecionar projeto",
    role: "Desenvolvedor full stack",
    hello: "DIGA OLÁ",
    heroLine: ["Do clique", "ao sistema."],
    selected: "Ver projetos",
    index: "ÍNDICE",
    workTitle: ["Projetos", "selecionados."],
    workIntro:
      "Do portal de uma empresa de software ao site de um serviço de nutrição. Explore o contexto, as tecnologias e as páginas publicadas.",
    viewProject: "Explorar projeto",
    screenCapture: "CAPTURA DO SITE PUBLICADO",
    code: "Ver código",
    privateCode: "Código privado",
    visit: "Visitar site",
    details: "Sobre o projeto",
    stack: "TECNOLOGIAS",
    features: "O QUE EXISTE NO CÓDIGO",
    context: "CONTEXTO",
    archive: "OUTROS ESTUDOS",
    archiveIntro: "Projetos sem captura pública disponível.",
    aboutLabel: "(02 — SOBRE O TRABALHO)",
    aboutTitle: ["Código,", "interface", "e contexto."],
    aboutIntro:
      "Sou Junior Rondini, desenvolvedor full stack. Trabalho com interfaces, APIs, dados e automação.",
    aboutBlocks: [
      {
        n: "01",
        title: "Interfaces e serviços.",
        body: "No Genesys Website, trabalhei em colaboração em um portal ligado a serviços externos. No Saúde Alimentar, a interface se conecta a um fluxo de avaliações.",
      },
      {
        n: "02",
        title: "Dados e automação.",
        body: "Também desenvolvo ferramentas menores, de um servidor HTTP em Node.js a scripts para organizar informações e automatizar tarefas.",
      },
      {
        n: "03",
        title: "Estudo contínuo.",
        body: "Investigo performance, integrações com IA e linguagens como Rust, Go e Zig. Os experimentos abaixo mostram parte desse processo.",
      },
    ],
    toolsLabel: "REPERTÓRIO TÉCNICO",
    toolsTitle: "Ferramentas de trabalho\ne de estudo.",
    verified: "Usadas nos projetos apresentados",
    profile: "Também listadas no meu perfil",
    exploring: "Interesses e estudos em andamento",
    labLabel: "(03 — LABORATÓRIO)",
    labTitle: ["Estudos", "em aberto."],
    labIntro:
      "Projetos menores para aprender linguagens, testar ferramentas e investigar problemas específicos.",
    labLink: "Explorar repositório",
    contactLabel: "(04 — CONTATO)",
    contactTitle: ["Tem um", "projeto", "em mente?"],
    contactIntro:
      "Para conversar sobre um projeto, colaboração ou desenvolvimento, escreva para mim.",
    email: "ESCREVA PARA MIM",
    top: "Voltar ao início",
    footer: "Desenvolvimento e experimentação.",
    source: "Código deste site",
    privateNote:
      "Repositório com acesso restrito. A apresentação mostra apenas o contexto do projeto.",
    overview: "VISÃO GERAL",
    footerRole: "DESENVOLVIMENTO FULL STACK & EXPLORAÇÃO CRIATIVA",
    seo: "Junior Rondini — desenvolvimento full stack, interfaces, sistemas e experimentos.",
    toolNames: [
      "Frontend",
      "Backend & Dados",
      "DevOps & Ferramentas",
      "Bancos de dados",
      "Em exploração",
    ],
    ai: "IA",
    esoteric: "Linguagens esotéricas",
  },
  en: {
    skip: "Skip to content",
    nav: ["Work", "About", "Lab", "Contact"],
    language: "Mudar para português",
    theme: "Toggle theme",
    menu: "Open menu",
    close: "Close",
    menuLabel: "Menu",
    light: "Light",
    dark: "Dark",
    inFocus: "IN FOCUS",
    heroPreview: "Open preview",
    previewControls: "Work previews",
    selectPreview: "Show preview",
    pausePreview: "Pause preview rotation",
    resumePreview: "Resume preview rotation",
    pause: "Pause",
    resume: "Play",
    galleryLabel: "Work index",
    galleryInstruction: "CHOOSE A PROJECT",
    chooseProject: "Select project",
    role: "Full stack developer",
    hello: "SAY HELLO",
    heroLine: ["From the click", "to the system."],
    selected: "View projects",
    index: "INDEX",
    workTitle: ["Selected", "projects."],
    workIntro:
      "From a software company’s portal to a nutrition practice’s website. Explore the context, technologies and published sites.",
    viewProject: "Explore project",
    screenCapture: "LIVE WEBSITE CAPTURE",
    code: "View source",
    privateCode: "Private source",
    visit: "Visit website",
    details: "About the project",
    stack: "TECHNOLOGIES",
    features: "IMPLEMENTED FEATURES",
    context: "CONTEXT",
    archive: "OTHER STUDIES",
    archiveIntro: "Projects without a public capture available.",
    aboutLabel: "(02 — ABOUT THE WORK)",
    aboutTitle: ["Code,", "interface", "and context."],
    aboutIntro:
      "I’m Junior Rondini, a full stack developer working with interfaces, APIs, data and automation.",
    aboutBlocks: [
      {
        n: "01",
        title: "Interfaces and services.",
        body: "I collaborated on Genesys Website, a portal connected to external services. Saúde Alimentar pairs its interface with a reviews flow.",
      },
      {
        n: "02",
        title: "Data and automation.",
        body: "I also build smaller tools, from a Node.js HTTP server to scripts that organize information and automate tasks.",
      },
      {
        n: "03",
        title: "Ongoing study.",
        body: "I’m studying performance, AI integrations and languages including Rust, Go and Zig. The experiments below show part of that process.",
      },
    ],
    toolsLabel: "TECHNICAL REPERTOIRE",
    toolsTitle: "Tools for work\nand study.",
    verified: "Used in the featured projects",
    profile: "Also listed on my profile",
    exploring: "Interests and ongoing studies",
    labLabel: "(03 — LAB)",
    labTitle: ["Studies", "in progress."],
    labIntro:
      "Smaller projects for learning languages, testing tools and investigating specific problems.",
    labLink: "Explore repository",
    contactLabel: "(04 — CONTACT)",
    contactTitle: ["Have a", "project", "in mind?"],
    contactIntro:
      "To discuss a project, collaboration or development, send me a message.",
    email: "DROP ME A LINE",
    top: "Back to top",
    footer: "Development and experimentation.",
    source: "This site’s source",
    privateNote:
      "This repository has restricted access. This presentation shares only the project context.",
    overview: "OVERVIEW",
    footerRole: "FULL STACK DEVELOPMENT & CREATIVE EXPLORATION",
    seo: "Junior Rondini — full stack development, interfaces, systems and experiments.",
    toolNames: [
      "Frontend",
      "Backend & Data",
      "DevOps & Tools",
      "Databases",
      "Exploring",
    ],
    ai: "AI",
    esoteric: "Esoteric languages",
  },
};
export type Copy = typeof copy.pt;

export type Project = {
  id: string;
  number: string;
  name: string;
  category: Localized;
  description: Localized;
  context: Localized;
  features: Localized[];
  stack: string[];
  repo: string;
  private?: boolean;
  demo?: string;
  preview?: {
    src: string;
    smallSrc: string;
    width: number;
    height: number;
    source: string;
    alt: Localized;
  };
  year?: string;
};

export const projects: Project[] = [
  {
    id: "genesys",
    number: "01",
    name: "Genesys Website",
    preview: {
      src: "/projects/genesys-desktop.webp",
      smallSrc: "/projects/genesys-desktop-768.webp",
      width: 1280,
      height: 960,
      source: "genesyssoft.com.br",
      alt: l(
        "Interface real do Genesys Website: página inicial azul com a marca Genesys, a frase Seu negócio. Em movimento. e o mascote branco e laranja.",
        "Actual Genesys Website interface: blue homepage with the Genesys brand, the Portuguese headline Seu negócio. Em movimento. and the white and orange mascot.",
      ),
    },
    private: true,
    category: l("PLATAFORMA WEB / COLABORAÇÃO", "WEB PLATFORM / COLLABORATION"),
    description: l(
      "Uma presença digital conectada aos serviços de uma empresa de software.",
      "A digital presence connected to a software company’s services.",
    ),
    context: l(
      "Portal institucional desenvolvido em colaboração com outros dois desenvolvedores. Reúne apresentação da empresa, conteúdo e acesso a serviços do cliente. A aplicação Angular se conecta a um backend externo.",
      "A company portal built in collaboration with two other developers. It brings together company information, content and access to client services. The Angular application connects to an external backend.",
    ),
    features: [
      l(
        "Páginas institucionais, serviços e notícias.",
        "Company pages, services and news.",
      ),
      l(
        "Área do cliente e consultas de licenças e documentos.",
        "Client area and license and document queries.",
      ),
      l(
        "Assistente com respostas baseadas em regras locais.",
        "Assistant with responses based on local rules.",
      ),
      l(
        "Configuração de SSR/PWA e testes no repositório.",
        "SSR/PWA configuration and tests in the repository.",
      ),
    ],
    stack: ["Angular", "TypeScript", "Tailwind CSS", "SCSS", "RxJS"],
    repo: "https://github.com/juniorrondini/genesys-website",
    demo: "https://www.genesyssoft.com.br/",
  },
  {
    id: "saude",
    number: "02",
    name: "Saúde Alimentar",
    preview: {
      src: "/projects/saude-desktop.webp",
      smallSrc: "/projects/saude-desktop-768.webp",
      width: 1280,
      height: 960,
      source: "saudealimentar.vercel.app",
      alt: l(
        "Interface real do Saúde Alimentar: navegação verde, apresentação da profissional e serviços de consulta nutricional e acompanhamento mensal.",
        "Actual Saúde Alimentar interface: green navigation, introduction to the nutrition professional and nutrition consultation and monthly support services.",
      ),
    },
    category: l("SAÚDE / EXPERIÊNCIA WEB", "HEALTH / WEB EXPERIENCE"),
    description: l(
      "Uma interface para apresentar serviços de nutrição e reunir avaliações.",
      "An interface for presenting nutrition services and collecting reviews.",
    ),
    context: l(
      "Aplicação com Next.js e React voltada à apresentação de serviços de saúde alimentar. Combina páginas de conteúdo com um fluxo de avaliações integrado ao Firestore.",
      "A Next.js and React application presenting nutrition services. It combines content pages with a review flow connected to Firestore.",
    ),
    features: [
      l(
        "Apresentação de serviços e página sobre.",
        "Service presentation and about page.",
      ),
      l(
        "Formulário de avaliação com estrelas e comentários.",
        "Review form with star ratings and comments.",
      ),
      l(
        "Rotas GET/POST para avaliações armazenadas no Firestore.",
        "GET/POST routes for reviews stored in Firestore.",
      ),
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Firebase"],
    repo: "https://github.com/juniorrondini/saudealimentar",
    demo: "https://saudealimentar.vercel.app/",
  },
  {
    id: "curriculum",
    number: "03",
    name: "Curriculum",
    private: true,
    category: l("FERRAMENTA / PRODUTIVIDADE", "TOOL / PRODUCTIVITY"),
    description: l(
      "Da trajetória profissional a um currículo pronto para exportar.",
      "From professional experience to an exportable résumé.",
    ),
    context: l(
      "Editor de currículos construído com React e TypeScript. Permite preencher informações, escolher entre três modelos e exportar o documento em PDF. O projeto ainda possui limitações documentadas de responsividade e exportação.",
      "A résumé editor built with React and TypeScript. Users can enter their information, choose from three templates and export a PDF. The project still has documented limitations in responsive layouts and PDF export.",
    ),
    features: [
      l(
        "Edição de informações pessoais, experiência e formação.",
        "Editing personal information, experience and education.",
      ),
      l(
        "Upload de foto e visualização do documento.",
        "Photo upload and document preview.",
      ),
      l(
        "Modelos Minimalista, Criativo e Clássico.",
        "Minimalist, Creative and Classic templates.",
      ),
      l(
        "Exportação com html2canvas e jsPDF; sem persistência no fluxo analisado.",
        "Export with html2canvas and jsPDF; no persistence in the reviewed flow.",
      ),
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "jsPDF"],
    repo: "https://github.com/juniorrondini/curriculum",
  },
  {
    id: "razor",
    number: "04",
    name: "Razor Haven",
    category: l("PROTÓTIPO DE INTERFACE", "INTERFACE PROTOTYPE"),
    description: l(
      "Estudo de interface para barbearia em Angular, com navegação lateral e uma rota de agendamentos.",
      "An Angular barbershop interface study with sidebar navigation and an appointments route.",
    ),
    context: l(
      "Protótipo visual em Angular 16. A tela de agendamentos contém uma tabela estática de exemplo. Não há fluxo funcional de reservas implementado.",
      "A visual prototype in Angular 16. The appointments screen contains a static example table. A working booking flow is not implemented.",
    ),
    features: [
      l(
        "Navegação e identidade visual de barbearia.",
        "Barbershop navigation and visual identity.",
      ),
      l(
        "Rota de agendamentos com conteúdo estático.",
        "Appointments route with static content.",
      ),
    ],
    stack: ["Angular", "TypeScript", "Tailwind CSS"],
    repo: "https://github.com/juniorrondini/Project-Razor-Haven",
  },
  {
    id: "node",
    number: "05",
    name: "Node Backend",
    category: l("ESTUDO DE FUNDAMENTOS", "FUNDAMENTALS STUDY"),
    description: l(
      "Um servidor HTTP básico em Node.js. O início da conversa entre uma requisição e uma resposta.",
      "A basic HTTP server in Node.js. The beginning of the conversation between a request and a response.",
    ),
    context: l(
      "Estudo usando o módulo nativo http do Node.js. O servidor escuta na porta 3000 e retorna HTML fixo. Express consta das dependências, mas não é usado no servidor examinado.",
      "A study using Node.js’s built-in http module. The server listens on port 3000 and returns fixed HTML. Express is listed as a dependency but is not used by the reviewed server.",
    ),
    features: [
      l("Servidor com http.createServer.", "Server using http.createServer."),
      l(
        "Resposta HTML fixa na porta 3000.",
        "Fixed HTML response on port 3000.",
      ),
    ],
    stack: ["Node.js", "JavaScript", "HTTP"],
    repo: "https://github.com/juniorrondini/node_backend",
  },
];

export const experiments = [
  {
    id: "zentinel",
    n: "L.01",
    name: "Zentinel",
    tags: "ZIG / SHA-256 / CLI",
    url: "https://github.com/juniorrondini/Zentinel",
    description: l(
      "Snapshots de arquivos e comparação de integridade com SHA-256, em Zig.",
      "File snapshots and integrity comparisons with SHA-256, written in Zig.",
    ),
  },
  {
    id: "esoteric",
    n: "L.02",
    name: "Esoteric Suite",
    tags: "PYTHON / BRAINFUCK / EXPERIMENTS",
    url: "https://github.com/juniorrondini/Esoteric-Suite",
    description: l(
      "Uma coleção de ferramentas e artefatos de linguagens incomuns, incluindo uma API Python que executa programas Brainfuck.",
      "A collection of tools and artifacts from unusual languages, including a Python API that runs Brainfuck programs.",
    ),
  },
  {
    id: "infopc",
    n: "L.03",
    name: "InfoPC",
    tags: "BATCH / POWERSHELL / WINDOWS",
    url: "https://github.com/juniorrondini/infopc",
    description: l(
      "Script que reúne informações básicas da máquina e da rede em um arquivo de texto.",
      "A script that collects basic machine and network information in a text file.",
    ),
  },
];

export const toolGroups = [
  {
    name: "Frontend",
    items: ["React", "Angular", "Next.js", "TypeScript", "Tailwind CSS"],
    type: "verified",
  },
  {
    name: "Backend & Data",
    items: ["Node.js", "HTTP", "Firebase / Firestore", "Python"],
    type: "verified",
  },
  {
    name: "DevOps & Tools",
    items: ["Git", "GitHub", "Vite", "PowerShell", "Batch"],
    type: "verified",
  },
  {
    name: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "SQLite", "Redis"],
    type: "profile",
  },
  {
    name: "Exploring",
    items: ["Rust", "Go", "Zig", "AI", "Performance", "Esoteric languages"],
    type: "exploring",
  },
];
