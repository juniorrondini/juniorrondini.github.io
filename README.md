# Junior Rondini — portfólio

Portfólio bilíngue com tipografia cinética, prévias reais de interfaces e uma galeria interativa. A identidade usa preto e roxo no tema escuro, bege e lilás no claro. As cores dos projetos são preservadas.

**Site:** https://juniorrondini.github.io/

## Executar e verificar

Node.js 24 (mínimo 22.12) e npm:

```sh
npm ci
npm run dev
```

Para verificar a versão de produção:

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run preview
```

O build verifica os tipos e produz uma aplicação estática em `dist/`.

## Experiência

- **Hero:** entrada letra por letra, movimento da tipografia e da prévia associado à rolagem no desktop, profundidade em resposta ao cursor e alternância entre interfaces reais. Os controles permitem selecionar e pausar as prévias. A alternância para fora da tela, em aba inativa, durante a leitura de um diálogo e quando o sistema solicita movimento reduzido.
- **Projetos:** índice de nomes com seleção por cursor, foco ou clique. Uma única prévia compacta mostra o trabalho selecionado; a troca revela imagem e texto com uma transição. A imagem abre os detalhes, com contexto, tecnologias e links verificados.
- **Sobre e laboratório:** narrativa e índice dos experimentos reais, com hierarquia tipográfica e revelações por rolagem.
- **Contato:** encerramento tipográfico, links reais e navegação textual. Não há setas, ícones genéricos ou esculturas geométricas.

React, TypeScript, Vite e GSAP/ScrollTrigger são a base. Os efeitos usam tipografia e as próprias imagens dos trabalhos; não há modelos 3D, canvas ou dependência de WebGL. Fontes locais: Big Shoulders Display, Manrope e Cormorant Garamond, com licenças SIL OFL preservadas em `public/licenses/`.

## Organização

| Arquivo                             | Conteúdo                                                              |
| ----------------------------------- | --------------------------------------------------------------------- |
| `src/content.ts`                    | Textos PT/EN, dados dos projetos e experimentos.                      |
| `src/App.tsx`                       | Seções, temas, idiomas, menu e diálogos.                              |
| `src/components/Hero.tsx`           | Prévias reais, controles, alternância e resposta ao cursor.           |
| `src/components/WorkGallery.tsx`    | Seleção e apresentação compacta dos trabalhos.                        |
| `src/components/ProjectPreview.tsx` | Imagens responsivas com texto alternativo.                            |
| `src/useMotion.ts`                  | Entrada tipográfica, coreografia de scroll e sincronização do layout. |
| `src/editorial.css`                 | Hero, galeria e controles textuais.                                   |
| `src/styles.css`                    | Temas, estilos globais e demais seções.                               |
| `src/test/`                         | Jornadas de navegação, preferências, galeria e prévias.               |
| `public/projects/README.md`         | Origem e critérios das capturas reais.                                |

Para adicionar um trabalho, inclua um objeto em `projects`, com textos PT/EN e stack comprovada. `preview` só deve apontar para uma captura verificada, com origem, dimensões e texto alternativo. Os projetos com captura entram no índice visual da hero e da galeria; os demais ficam no índice textual. Adicione `demo` apenas quando existir uma demonstração confirmada e `private: true` para repositórios restritos.

Não use imagens inventadas para preencher um projeto. Consulte `AGENTS.md` e `RESEARCH.md` antes de alterar a direção visual ou as afirmações sobre os trabalhos.

## Preferências e acessibilidade

Português é o idioma inicial; `jr-lang` salva PT/EN. `jr-theme` preserva a escolha de tema; sem escolha explícita, o sistema define o tema. O site permanece funcional se o armazenamento estiver bloqueado.

As animações respeitam `prefers-reduced-motion`. A versão mobile tem composição própria e não usa a sequência sticky do desktop. Seleção de trabalhos e prévias continuam funcionando sem movimento. GSAP recalcula os gatilhos após carregamento de fontes, imagens, mudanças de tamanho, troca de idioma e retorno à página.

Menu e detalhes usam `<dialog>` nativo, com Escape, foco contido e retorno ao acionador. Há link para pular ao conteúdo, foco visível e controles de texto acessíveis por teclado e toque. As seções usam âncoras (`work`, `about`, `lab`, `contact`), sem problemas de recarregamento de rotas no GitHub Pages.

## Publicação

Repositório: `juniorrondini/juniorrondini.github.io`, branch `main`, Vite `base: '/'`. GitHub Pages usa **GitHub Actions** (`build_type: workflow`).

O workflow `.github/workflows/deploy.yml` executa `npm ci`, lint, testes e build, envia `dist` e publica no ambiente `github-pages`. Também aceita execução manual. Só o job de deploy recebe `pages: write` e `id-token: write`; o restante usa `contents: read`. Não há credenciais no cliente ou secrets de deploy necessários.

```sh
git add src public README.md
git commit -m "Update portfolio"
git push origin main
```

Confirme o workflow e a URL pública. Para reverter, reverta o commit e envie à `main`.

## Validação

Os testes cobrem preferências, idiomas, menu, diálogos, foco, fontes privadas, demos, seleção dos projetos, origem das imagens, alternância e pausa das prévias e sincronização do layout. Os movimentos visuais são verificados separadamente em navegador Chromium isolado com REA, incluindo desktop, mobile e movimento reduzido; passar nos testes unitários não substitui essa inspeção visual.

As pastas `.qa/` e `.research/` contêm material local de análise e validação e estão ignoradas pelo Git. Código-fonte privado e dados de clientes não integram a publicação.
