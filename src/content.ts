export type Language = "pt" | "en";
export type Theme = "light" | "dark";
export type Localized = { pt: string; en: string };
export const l = (pt: string, en: string): Localized => ({ pt, en });

export const copy = {
  pt: {
    skip: "Pular para o conteúdo",
    nav: ["Projetos", "Sobre", "Laboratório", "Contato"],
    language: "Switch to English",
    theme: "Alternar tema",
    menu: "Abrir menu",
    close: "Fechar",
    role: "FULL STACK DEVELOPER",
    discipline: "SISTEMAS / INTERFACES / EXPERIMENTOS",
    portfolio: "PORTFÓLIO",
    selectedCount: "03 / SELECIONADOS",
    hello: "DIGA OLÁ ↗",
    heroLine: ["Construindo sistemas.", "Explorando possibilidades."],
    heroSide: "Entre a lógica e a curiosidade, um espaço para criar.",
    selected: "EXPLORAR PROJETOS",
    scroll: "CONTINUE EXPLORANDO",
    sculpture: "ESTUDO 001 — ARQUITETURA JR",
    sculptureHint: "Uma identidade construída em módulos.",
    index: "ÍNDICE",
    workLabel: "(01 — TRABALHOS SELECIONADOS)",
    workTitle: ["Ideias que", "ganham forma."],
    workIntro:
      "Do primeiro componente ao sistema inteiro. Uma seleção de interfaces e ferramentas que desenvolvi — sozinho e em colaboração.",
    viewProject: "Explorar projeto",
    conceptual: "COMPOSIÇÃO CONCEITUAL",
    notScreenshot: "Ilustração autoral, não uma captura da aplicação.",
    code: "Ver código",
    privateCode: "Código privado",
    visit: "Visitar site",
    details: "Sobre o projeto",
    stack: "TECNOLOGIAS",
    features: "O QUE EXISTE NO CÓDIGO",
    context: "CONTEXTO",
    archive: "OUTROS ESTUDOS",
    archiveIntro: "Pequenos projetos também contam uma parte da história.",
    aboutLabel: "(02 — POR TRÁS DO CÓDIGO)",
    aboutTitle: ["Lógica na base.", "Curiosidade", "em tudo."],
    aboutIntro:
      "Sou Junior Rondini. Desenvolvo interfaces, APIs, bancos de dados e automações para transformar problemas reais em software útil.",
    aboutBlocks: [
      {
        n: "01",
        title: "Entender antes de construir.",
        body: "O problema vem primeiro. A interface, as regras e os dados precisam trabalhar juntos para chegar a uma solução que faça sentido.",
      },
      {
        n: "02",
        title: "Pensar em sistemas.",
        body: "Tenho interesse em arquitetura e automação: conectar partes, organizar fluxos e tornar o trabalho repetitivo um pouco mais simples.",
      },
      {
        n: "03",
        title: "Continuar explorando.",
        body: "Performance, integrações com IA, Rust, Go e Zig fazem parte do meu campo de estudo. E sempre cabe uma linguagem inesperada no caminho.",
      },
    ],
    architecture: ["INTERFACE", "LÓGICA", "DADOS", "POSSIBILIDADES"],
    toolsLabel: "REPERTÓRIO TÉCNICO",
    toolsTitle: "As ferramentas mudam.\nA vontade de construir, não.",
    verified: "Usadas nos projetos apresentados",
    profile: "Também listadas no meu perfil",
    exploring: "Interesses e estudos em andamento",
    labLabel: "(03 — FORA DO ÓBVIO)",
    labTitle: ["Curiosidade", "em execução."],
    labIntro:
      "Um espaço para testar ideias, entender ferramentas e seguir caminhos menos previsíveis. Experimentos reais, em diferentes estágios.",
    labLink: "Explorar repositório",
    labLive: "BRINQUE COM A IDENTIDADE",
    labInstruction: "Arraste o controle e desmonte a estrutura.",
    labReset: "Recompor",
    assembly: "Separação dos módulos",
    contactLabel: "(04 — PRÓXIMA CONEXÃO)",
    contactTitle: ["Vamos criar", "algo", "extraordinário?"],
    contactIntro:
      "Uma ideia, um problema interessante ou uma boa conversa. O próximo projeto pode começar aqui.",
    email: "ESCREVA PARA MIM",
    top: "Voltar ao início",
    footer: "Feito de código e curiosidade.",
    source: "Código deste site",
    privateNote:
      "Repositório com acesso restrito. A apresentação mostra apenas o contexto do projeto.",
    overview: "VISÃO GERAL",
    footerRole: "DESENVOLVIMENTO FULL STACK & EXPLORAÇÃO CRIATIVA",
    sceneLabel:
      "Escultura tridimensional original das iniciais JR, formada por módulos interligados.",
    seo: "Junior Rondini — desenvolvimento full stack, sistemas, interfaces e experimentos. Construindo sistemas. Explorando possibilidades.",
    art: {
      ecosystem: "Um ecossistema conectado.",
      portal: "PORTAL DIGITAL",
      news: "Conteúdo",
      client: "Área do cliente",
      license: "Licenças",
      nutrition: "SAÚDE ALIMENTAR",
      healthy: "Cuidado que começa\nà mesa.",
      services: "Nutrição & bem-estar",
      review: "Serviços · Avaliações",
      resume: "CURRÍCULO-FÁCIL",
      story: "Sua história.\nSeu próximo passo.",
      templates: "03 modelos · Exportação PDF",
      document: "Experiência",
      education: "Formação",
      skills: "Habilidades",
      connected: "SISTEMAS CONECTADOS.",
      nature: "NATUREZA EM INTERFACE.",
      tool: "FERRAMENTA REACT",
    },
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
    role: "FULL STACK DEVELOPER",
    discipline: "SYSTEMS / INTERFACES / EXPERIMENTS",
    portfolio: "PORTFOLIO",
    selectedCount: "03 / SELECTED",
    hello: "SAY HELLO ↗",
    heroLine: ["Building systems.", "Exploring possibilities."],
    heroSide: "Somewhere between logic and curiosity, a space to create.",
    selected: "EXPLORE THE WORK",
    scroll: "KEEP EXPLORING",
    sculpture: "STUDY 001 — JR ARCHITECTURE",
    sculptureHint: "An identity built from modules.",
    index: "INDEX",
    workLabel: "(01 — SELECTED WORK)",
    workTitle: ["Ideas taking", "shape."],
    workIntro:
      "From a single component to the whole system. A selection of interfaces and tools I have built, independently and with others.",
    viewProject: "Explore project",
    conceptual: "CONCEPTUAL COMPOSITION",
    notScreenshot: "Original illustration, not an application screenshot.",
    code: "View source",
    privateCode: "Private source",
    visit: "Visit website",
    details: "About the project",
    stack: "TECHNOLOGIES",
    features: "IMPLEMENTED FEATURES",
    context: "CONTEXT",
    archive: "OTHER STUDIES",
    archiveIntro: "Small projects tell part of the story, too.",
    aboutLabel: "(02 — BEHIND THE CODE)",
    aboutTitle: ["Built on logic.", "Driven by", "curiosity."],
    aboutIntro:
      "I’m Junior Rondini. I build interfaces, APIs, databases and automation to turn real problems into useful software.",
    aboutBlocks: [
      {
        n: "01",
        title: "Understand, then build.",
        body: "The problem comes first. The interface, rules and data need to work together to create a solution that makes sense.",
      },
      {
        n: "02",
        title: "Think in systems.",
        body: "I’m interested in architecture and automation: connecting parts, organizing workflows and making repetitive work a little easier.",
      },
      {
        n: "03",
        title: "Keep exploring.",
        body: "Performance, AI integrations, Rust, Go and Zig are part of my ongoing studies. And there’s always room for an unexpected language along the way.",
      },
    ],
    architecture: ["INTERFACE", "LOGIC", "DATA", "POSSIBILITIES"],
    toolsLabel: "TECHNICAL REPERTOIRE",
    toolsTitle: "The tools evolve.\nThe drive to build stays.",
    verified: "Used in the featured projects",
    profile: "Also listed on my profile",
    exploring: "Interests and ongoing studies",
    labLabel: "(03 — BEYOND THE EXPECTED)",
    labTitle: ["Curiosity", "in execution."],
    labIntro:
      "A space to test ideas, understand tools and take the less predictable path. Real experiments, at different stages.",
    labLink: "Explore repository",
    labLive: "PLAY WITH THE IDENTITY",
    labInstruction: "Move the slider to take the structure apart.",
    labReset: "Reassemble",
    assembly: "Module separation",
    contactLabel: "(04 — NEXT CONNECTION)",
    contactTitle: ["Let’s build", "something", "extraordinary."],
    contactIntro:
      "An idea, an interesting problem or a good conversation. The next project could start here.",
    email: "DROP ME A LINE",
    top: "Back to top",
    footer: "Made of code and curiosity.",
    source: "This site’s source",
    privateNote:
      "This repository has restricted access. This presentation shares only the project context.",
    overview: "OVERVIEW",
    footerRole: "FULL STACK DEVELOPMENT & CREATIVE EXPLORATION",
    sceneLabel:
      "Original three-dimensional JR sculpture made of interconnected modules.",
    seo: "Junior Rondini — full stack development, systems, interfaces and experiments. Building systems. Exploring possibilities.",
    art: {
      ecosystem: "A connected ecosystem.",
      portal: "DIGITAL PORTAL",
      news: "Content",
      client: "Client area",
      license: "Licenses",
      nutrition: "SAÚDE ALIMENTAR",
      healthy: "Care begins\nat the table.",
      services: "Nutrition & wellbeing",
      review: "Services · Reviews",
      resume: "CURRÍCULO-FÁCIL",
      story: "Your story.\nYour next step.",
      templates: "03 templates · PDF export",
      document: "Experience",
      education: "Education",
      skills: "Skills",
      connected: "SYSTEMS, CONNECTED.",
      nature: "NATURE MEETS INTERFACE.",
      tool: "REACT TOOL",
    },
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
  art?: "genesys" | "nutrition" | "resume";
  year?: string;
};

export const projects: Project[] = [
  {
    id: "genesys",
    number: "01",
    name: "Genesys Website",
    art: "genesys",
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
    art: "nutrition",
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
    art: "resume",
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
    mark: "Z_",
    tags: "ZIG / SHA-256 / CLI",
    url: "https://github.com/juniorrondini/Zentinel",
    description: l(
      "Snapshots de arquivos e comparação de integridade com SHA-256. Um estudo em Zig sobre o que muda — e o que permanece.",
      "File snapshots and integrity comparisons with SHA-256. A Zig study of what changes, and what stays the same.",
    ),
  },
  {
    id: "esoteric",
    n: "L.02",
    name: "Esoteric Suite",
    mark: "+[−]",
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
    mark: ">_",
    tags: "BATCH / POWERSHELL / WINDOWS",
    url: "https://github.com/juniorrondini/infopc",
    description: l(
      "Um script para reunir informações básicas da máquina e da rede em um arquivo de texto. Automação nas pequenas coisas.",
      "A script that collects basic machine and network information in a text file. Automation in the little things.",
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
