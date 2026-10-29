# S.I.G.M.A. (Front-end)

O **SIGMA** (Sistema Integrado de Gestão, Medição e Avaliação) é uma plataforma web para recepção, gerenciamento e processamento de dados gerados por equipamentos de campo.

## 🚀 Começando

Estas instruções ajudarão você a obter uma cópia do projeto em execução na sua máquina local para fins de desenvolvimento e teste.

### 📋 Pré-requisitos

Certifique-se de ter os seguintes softwares instalados:

- **[Docker](https://www.docker.com/)**
- **[Docker Compose](https://docs.docker.com/compose/install/)**

### 🔧 Instalação

Siga os passos abaixo para configurar o ambiente de desenvolvimento:

1. **Clone o repositório** (é necessário ter uma chave SSH cadastrada):

   ```bash
   git clone git@github.com:gtots-dev/web-sigma-frontend.git
   ```

2. **Configure as variáveis de ambiente:**

   Copie o arquivo `.env.example` para a raiz do projeto e renomeie-o para `.env`.

3. **Geração chave secreta (JWT):**

   Execute o comando abaixo em seu terminal, em seguida adicione no campo `AUTH_SECRET` localizado em sua `.env`.

   ```bash
   openssl rand -base64 33
   ```

4. **(Opcional) Configuração do DevContainer para VS Code:**

   - Instale a extensão do [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) em seu VS Code.
   - Crie uma pasta chamada `.devcontainer` na raiz do projeto.
   - Dentro dessa pasta, crie um arquivo chamado `devcontainer.json` com o seguinte conteúdo:

   ```json
   {
     "name": "SIGMA (Container)",
     "dockerComposeFile": "../docker-compose.yaml",
     "service": "app",
     "workspaceFolder": "/app",
     "settings": {},
     "extensions": [
       "EditorConfig.EditorConfig",
       "bradlc.vscode-tailwindcss",
       "esbenp.prettier-vscode",
       "editorconfig.editorconfig",
       "dbaeumer.vscode-eslint"
     ]
   }
   ```

5. **Criação do container Docker:**

   Execute o comando abaixo para subir o ambiente de desenvolvimento (via `Makefile` ou `docker compose`):

   ```bash
   make dev
   # ou: docker compose -f docker-compose.dev.yaml up --build
   ```

6. **Acesse o projeto:**

   O sistema estará disponível em [http://localhost:3000](http://localhost:3000).

## ⚡ Comandos úteis (`Makefile`)

O projeto conta com atalhos no `Makefile` para facilitar o fluxo diário de desenvolvimento e validação:

| Comando | Descrição |
| :--- | :--- |
| `make dev` | Sobe o ambiente de desenvolvimento (`sigma-frontend-dev`) com *build*. |
| `make dev-down` | Derruba os containers do ambiente de desenvolvimento. |
| `make validate` | Executa a varredura completa do projeto (**ESLint** + **TypeScript** `tsc --noEmit`). |
| `make format` | Formata todos os arquivos do projeto automaticamente utilizando o **Prettier**. |
| `make prod` | Sobe o ambiente em modo de produção. |
| `make prod-down` | Derruba os containers do ambiente de produção. |
| `make clean` | Remove containers, volumes e órfãos dos ambientes de desenvolvimento e produção. |

## 🛠️ Tecnologias utilizadas

O projeto foi desenvolvido com as seguintes tecnologias:

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React.js](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [ShadCN/UI](https://ui.shadcn.com/)
- [Lucide](https://lucide.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Zod](https://zod.dev/)
- [Jest](https://jestjs.io/) & [Testing Library](https://testing-library.com/)
- [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/), [lint-staged](https://github.com/lint-staged/lint-staged) & [Commitlint](https://commitlint.js.org/)

## 📌 Controle de versão e Padrão de Commits

Utilizamos [Git](https://git-scm.com/) para controle de versão, com validações automatizadas via **Husky** para garantir a padronização e a qualidade do código antes de cada commit.

### 🔒 Hooks automatizados (`.husky/`)

1. **`pre-commit` (Qualidade e Formatação):**
   - Executa o **`lint-staged`** apenas nos arquivos adicionados ao *stage* (`git add`):
     - Corrige problemas automáticos de lint (`eslint --fix`);
     - Formata o código nos padrões do projeto (`prettier --write`);
     - Executa os testes unitários relacionados aos arquivos alterados (`jest --bail --findRelatedTests`).
   - Executa a checagem estática de tipos do TypeScript (`tsc --noEmit`).
2. **`commit-msg` (Padronização de Mensagens):**
   - Valida a mensagem do commit com o **Commitlint** garantindo o uso do padrão *Conventional Commits*.

### 📋 Estrutura da mensagem de commit

```text
<tipo>: <Descrição da alteração>
```

| Tipo | Quando utilizar |
| :--- | :--- |
| `feat` | Adição de uma nova funcionalidade |
| `fix` | Correção de um bug ou comportamento inesperado |
| `refactor` | Refatoração de código que não altera comportamento nem corrige bug |
| `style` | Ajustes de formatação de código (Prettier, espaçamentos, ponto e vírgula) |
| `chore` | Configurações de ferramentas, atualização de pacotes ou scripts |
| `test` | Criação ou alteração de testes automatizados |
| `docs` | Inclusão ou atualização de documentação (`README.md`, comentários, etc.) |
| `perf` | Alterações focadas em melhoria de desempenho |
| `ci` | Ajustes nos fluxos de integração e entrega contínua (`.github/workflows`) |
| `build` | Alterações em `Dockerfile`, `docker-compose`, `Makefile` ou build |
| `revert` | Reversão de um commit anterior |

#### 💡 Exemplos válidos:
```bash
git commit -m "feat: Suporte ao envio de logotipo na edição de contrato"
git commit -m "fix: Proteção contra envio de dados não mutados no submit"
git commit -m "chore: Adição das dependências do Husky, lint-staged e Commitlint"
```

