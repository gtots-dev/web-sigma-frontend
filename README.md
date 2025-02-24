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

   Copie o arquivo `.env-example` para a raiz do projeto e renomeie-o para `.env`.

3. **(Opcional) Configuração do DevContainer para VS Code:**

   - Instale a extenção do [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) em seu VS Code.
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
      "dbaeumer.vscode-eslint",
     ]
   }
   ```

4. **Criação do container Docker:**

   Execute o comando abaixo para criar a imagem e o container do projeto:

   ```bash
   docker-compose up --build
   ```

5. **Acesse o projeto:**

   O sistema estará disponível em [http://localhost:3000](http://localhost:3000).

## 🛠️ Tecnologias utilizadas

O projeto foi desenvolvido com as seguintes tecnologias:

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [ShadCN/UI](https://ui.shadcn.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [React.js](https://react.dev/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Lucide](https://lucide.dev/)

## 📌 Controle de versão

Utilizamos [Git](https://git-scm.com/) para controle de versão. Para visualizar todas as versões disponíveis, consulte as [tags deste repositório](https://github.com/suas/tags/do/projeto).