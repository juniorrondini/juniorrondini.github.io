# Junior Rondini — portfólio imersivo

Portfólio pessoal bilíngue, com identidade JR original, galeria de projetos e experimentos. Construído com React, TypeScript, Vite, GSAP/ScrollTrigger, Three.js e Lucide. Aplicação estática, sem backend ou credenciais no cliente.

**Site:** https://juniorrondini.github.io/

## Executar e validar

Use **Node.js 24** (mínimo 22.12) e npm.

```sh
npm ci
npm run dev
```

O Vite mostra o endereço local. Para validar a mesma versão que o GitHub publica:

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run preview
```

`build` também verifica os tipos. `dist/` é o único diretório publicado. O projeto não usa serviços de hospedagem intermediários.

## Organização e manutenção

| Arquivo                             | Responsabilidade                                                      |
| ----------------------------------- | --------------------------------------------------------------------- |
| `src/content.ts`                    | Todos os textos PT/EN, dados dos projetos, links e tecnologias.       |
| `src/App.tsx`                       | Seções, navegação, preferências, diálogos e animações de scroll.      |
| `src/components/ProjectArtwork.tsx` | Capas conceituais originais, feitas com HTML/CSS.                     |
| `src/components/Sculpture.tsx`      | Fallback SVG acessível e carregamento progressivo do 3D.              |
| `src/scene.ts`                      | Geometria JR procedural, materiais, iluminação e ciclo de vida WebGL. |
| `src/styles.css`                    | Direção visual, temas e layouts responsivos.                          |
| `src/test/`                         | Testes de jornadas do visitante e do carregamento progressivo.        |
| `public/`                           | Favicon, imagem social, sitemap, robots e licenças das fontes.        |
| `.github/workflows/deploy.yml`      | Verificações, build e publicação no GitHub Pages.                     |

Para adicionar um trabalho, inclua um objeto em `projects`, com textos em ambos os idiomas, stack comprovada e URL do repositório. Use `private: true` para repositórios restritos e adicione `demo` somente após validar uma demonstração pública. `art` seleciona uma composição da galeria; trabalhos sem `art` entram no índice de estudos. Novos experimentos entram em `experiments`.

Mantenha os identificadores das seções (`work`, `about`, `lab`, `contact`): são âncoras públicas. Os detalhes usam diálogos na própria página, evitando problemas de rotas e recarregamento no GitHub Pages.

## Identidade e comportamento

- **Conceito:** arquitetura JR. Duas iniciais extrudadas, conectadas por módulos, remetem a componentes e sistemas. Geometria criada no próprio projeto, sem modelos ou texturas de terceiros.
- **Claro:** papel mineral, grafite, vermelho terroso e metal escuro. **Escuro:** carvão, branco quente, verde ácido e metal com iluminação mais intensa. As cores estão nas variáveis CSS; os materiais ficam em `scene.ts`.
- **Tipografia:** Big Shoulders Display, Manrope e Cormorant Garamond. Arquivos locais em WOFF2, `font-display: swap` e apenas o subconjunto latino necessário a PT/EN. Fontes sob SIL OFL; avisos preservados em `public/licenses/`.
- CSS autoral foi escolhido para as composições e materiais, sem acrescentar um framework de estilos desnecessário.
- PT é o idioma inicial. `jr-lang` e `jr-theme` guardam escolhas no localStorage; falhas de armazenamento não impedem o uso. O tema acompanha o sistema enquanto não houver escolha explícita.
- As ilustrações dos projetos são **composições conceituais**, identificadas como tal. Não são screenshots das aplicações e não demonstram funcionalidades adicionais.

## 3D, movimento e acessibilidade

O texto e o SVG aparecem antes do WebGL. Three.js é carregado em um chunk separado e só inicia em telas maiores que 760 px, sem movimento reduzido, economia de dados ou indicação de memória limitada. Mudanças na preferência de movimento são observadas. Indisponibilidade/perda de contexto mantém o fallback SVG.

O renderer usa resolução limitada, observa o tamanho/visibilidade da área e **não mantém um loop contínuo em repouso**. Renderiza durante a interpolação de uma interação, interrompe fora de vista e descarta geometrias, materiais, ambiente e contexto ao desmontar. O mobile usa a composição vetorial original.

GSAP respeita `prefers-reduced-motion`; não há scroll hijacking, cursor obrigatório ou tela de carregamento bloqueante. Menu e detalhes usam `<dialog>` nativo, com Escape, foco contido e retorno de foco ao acionador. Inclui link para pular ao conteúdo, foco visível, navegação por âncoras e controles sem dependência de hover. O laboratório aceita teclado pelo controle range nativo.

## Publicar

O repositório é `juniorrondini/juniorrondini.github.io`, branch `main`, com `base: '/'`. Em **Settings → Pages**, a origem deve ser **GitHub Actions** (`build_type: workflow`).

Cada push na `main` executa `npm ci`, lint, testes e build, envia `dist` e publica no ambiente `github-pages`. Também é possível executar manualmente pela aba Actions. Apenas o job de deploy recebe `pages: write` e `id-token: write`; o restante usa `contents: read`. Não são necessários tokens ou secrets de deploy.

Para atualizar:

```sh
git add src public README.md
git commit -m "Update portfolio content"
git push origin main
```

Confira o workflow e a URL pública antes de considerar a atualização concluída. Para reverter, reverta o commit e envie à `main`; o workflow republica a versão anterior.

## Conteúdo e fontes

Veja [RESEARCH.md](RESEARCH.md) para os critérios de seleção, evidências e limitações dos projetos. Não transforme interesses do perfil em experiência profissional presumida, nem protótipos em sistemas completos.

O portfólio não replica fontes, modelos, símbolos ou assets de Clay Boan. A referência orienta o ritmo editorial, a integração de 3D e a hierarquia visual.

## Validação

Os testes automatizados verificam idioma, persistência de preferências, detalhes e links dos projetos, repositórios privados, demos confirmadas, navegação móvel, cancelamento de diálogos, retorno de foco, interação do laboratório, falhas de armazenamento e fallback/disposição da cena 3D.

Testes em JSDOM não certificam layout, renderização GPU ou desempenho em dispositivos reais. Nesta sessão, a inspeção do navegador ficou indisponível e a tentativa de controle foi interrompida por Escape. A imagem social foi renderizada e inspecionada como arquivo. Permanecem recomendadas revisões visuais em desktop, tablet e telefone, nos dois temas e idiomas, com movimento normal/reduzido e sem WebGL.

A pasta local `.research/` contém apenas material de análise e ferramentas locais; está ignorada pelo Git. Seu conteúdo e os fontes dos repositórios privados **não integram a publicação**.
