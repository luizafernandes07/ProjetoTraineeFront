# AgnusGestao — Front-End

Aplicação web (React + TypeScript + Vite) do sistema de gestão do **Grupo de Oração Agnus Dei** (Paróquia São Vicente Ferrer, Formiga — MG). Atende três perfis: o **ADMIN** gerencia produtos, voluntários, vendas e caixa; o **VOLUNTARIO** registra vendas presenciais; o **CLIENTE** compra artigos religiosos online. Consome a API REST do repositório `agnus-backend`. Desafio Front-End 2026/2.

> Entidades, DER, regras de negócio e a documentação completa dos endpoints estão no README do **back-end**.

## Sumário

1. [Como executar](#1-como-executar)
2. [Perfis, telas e permissões](#2-perfis-telas-e-permissões)
3. [Funcionalidades](#3-funcionalidades)
4. [Integração com a API](#4-integração-com-a-api)
5. [Roteiro de testes](#5-roteiro-de-testes)
6. [Tecnologias e estrutura](#6-tecnologias-e-estrutura)

---

## 1. Como executar

**Pré-requisitos:** Node.js 20+, npm e o **back-end em execução** em `http://localhost:3002` (ele precisa estar com `FRONTEND_ORIGIN=http://localhost:5180`, que é o padrão do `.env.example` e do `docker-compose.yml` do back-end).

**Passo 1 — subir o back-end** (na pasta `agnus-backend`, seguindo o README dele):

```bash
cp .env.example .env     # preencher DB_PASSWORD, JWT_SECRET e ADMIN_PASSWORD
docker compose up --build
```

**Passo 2 — subir o front-end:**

```bash
git clone URL_DO_REPOSITORIO
cd agnus-frontend
npm install
cp .env.example .env     # PowerShell: Copy-Item .env.example .env
npm run dev
```

Acesse **`http://localhost:5180`**. A porta é fixa (`strictPort`): se estiver ocupada, o Vite não inicia em outra.

| Comando           | Função                                   |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Servidor de desenvolvimento (porta 5180) |
| `npm run build`   | Verifica os tipos e gera a pasta `dist/` |
| `npm run preview` | Serve o build em `http://localhost:5180` |
| `npm run lint`    | Análise estática (oxlint)                |

**Variável de ambiente** (`.env`):

| Variável       | Valor                       | Observação                                                                                                              |
| -------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `VITE_API_URL` | `http://localhost:3002/api` | URL-base da API, com `/api` e sem barra final. Se omitida, esse valor é o padrão. Reinicie o `npm run dev` ao alterá-la |

### Usuários para teste

| Perfil       | Como obter                                                              |
| ------------ | ----------------------------------------------------------------------- |
| `ADMIN`      | Já existe: use `ADMIN_EMAIL` e `ADMIN_PASSWORD` do `.env` do back-end   |
| `CLIENTE`    | Tela **Cadastro** (`/cadastro`), acessível por um link na tela de login |
| `VOLUNTARIO` | Logado como ADMIN, menu **Voluntários** (`/cadastro-voluntario`)        |

> ⚠️ **Recuperação de senha indisponível:** o servidor SMTP não está funcionando no momento. Em **Esqueci minha senha**, o usuário vê _"Não foi possível enviar o e-mail de recuperação. Verifique o servidor SMTP."_ e nenhum e-mail é enviado. Enquanto isso, o ADMIN redefine a senha em **Voluntários → editar** (para voluntários) ou pela API (qualquer perfil; passo a passo no README do back-end). A tela de nova senha (`/redefinir-senha`) só é alcançada pelo link do e-mail, portanto também não pode ser testada agora.

---

## 2. Perfis, telas e permissões

Usuário sem login é redirecionado para `/login`. Usuário logado em rota de outro perfil é redirecionado para `/dashboard`. A API valida as permissões de novo; o bloqueio do front-end é só de navegação.

| Rota                         | Quem acessa         | Tela                                                                |
| ---------------------------- | ------------------- | ------------------------------------------------------------------- |
| `/login`                     | Público             | Login                                                               |
| `/cadastro`                  | Público             | Cadastro de cliente                                                 |
| `/recuperar-senha`           | Público             | Solicita o e-mail de recuperação (indisponível: SMTP fora do ar)    |
| `/redefinir-senha?token=...` | Público             | Define a nova senha (link do e-mail; indisponível: SMTP fora do ar) |
| `/dashboard`                 | Logado              | ADMIN: painel; CLIENTE e VOLUNTARIO: loja                           |
| `/loja`                      | CLIENTE, VOLUNTARIO | Catálogo de artigos religiosos                                      |
| `/minhas-compras`            | CLIENTE             | Histórico de pedidos                                                |
| `/caixa`                     | VOLUNTARIO          | Caixa presencial                                                    |
| `/produtos`                  | ADMIN               | Gestão de produtos                                                  |
| `/vendas-admin`              | ADMIN               | Vendas e pedidos                                                    |
| `/financeiro`                | ADMIN               | Caixa e relatórios                                                  |
| `/cadastro-voluntario`       | ADMIN               | Gestão de voluntários                                               |

Após o login, todos vão para `/dashboard`. O `CLIENTE` não vê produtos da lanchonete (a API também os recusa em pedidos online).

---

## 3. Funcionalidades

### CLIENTE

- **Loja:** lista artigos religiosos com preços e estoque.
- **Carrinho:** adicionar, alterar quantidade, remover itens e ver o total.
- **Entrega:** digitar o CEP busca o endereço (ViaCEP, via API); o cliente informa **número** e, se quiser, **complemento**.
- **Pagamento na entrega:** `PIX` ou `DINHEIRO`; em dinheiro, pode pedir troco informando o valor.
- **Minhas compras:** histórico dos pedidos com itens e status.

### VOLUNTARIO

- **Caixa presencial** (`/caixa`): escolher produtos (lanchonete e artigos religiosos), definir quantidades, ver o total, escolher `DINHEIRO` ou `PIX` e registrar. A venda baixa o estoque e lança a entrada no caixa.

### ADMIN

- **Painel:** atalhos para Produtos, Vendas e caixa, Voluntários e Caixa e financeiro.
- **Produtos:** criar, editar e excluir (a exclusão desativa o produto). Campos: nome, descrição, categoria, preço e estoque.
- **Vendas:** listar vendas e pedidos e alterar o status (aguardando retirada, aguardando entrega, concluído, cancelado). Cancelar devolve o estoque.
- **Voluntários:** cadastrar, editar, desativar e reativar.
- **Financeiro:** resumo do caixa (entradas, saídas e saldo), histórico, registro de entradas e saídas manuais, exclusão de lançamentos manuais e exportação do relatório em **Excel** ou **CSV**.

### Em todas as telas

- Indicador de carregamento nas requisições.
- Mensagens de sucesso e de erro; erros da API aparecem com o texto vindo do back-end.
- Tratados: API fora do ar, timeout de 10 s, erro HTTP e sessão inválida.
- Layout responsivo (desktop, tablet e smartphone).

---

## 4. Integração com a API

- Cliente HTTP único em `src/services/api.ts` (Axios), com a URL de `VITE_API_URL`.
- Após o login, o token JWT e os dados do usuário ficam no `localStorage` (`@AgnusGestao:token` e `@AgnusGestao:user`), mantendo a sessão ao recarregar a página. Cada requisição envia `Authorization: Bearer <token>`. O logout limpa esses dados.

| Tela                        | Chamadas                                                                                                                                                |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Login, Cadastro             | `POST /auth/login`, `POST /auth/register`                                                                                                               |
| Recuperar e redefinir senha | `POST /auth/forgot-password`, `POST /auth/reset-password`                                                                                               |
| Loja, Produtos, Caixa       | `GET /produtos`; ADMIN: `POST`, `PUT`, `DELETE /produtos/:id`                                                                                           |
| Loja (checkout)             | `GET /cep/:cep`, `POST /vendas/online`                                                                                                                  |
| Minhas compras              | `GET /vendas/minhas-compras`                                                                                                                            |
| Caixa presencial            | `POST /vendas/presencial`                                                                                                                               |
| Vendas (ADMIN)              | `GET /vendas`, `PATCH /vendas/:id/status`                                                                                                               |
| Voluntários (ADMIN)         | `GET`, `POST`, `PUT`, `DELETE /usuarios`                                                                                                                |
| Financeiro (ADMIN)          | `GET /movimentacoes`, `GET /movimentacoes/resumo`, `POST /movimentacoes`, `DELETE /movimentacoes/:id`, `GET /movimentacoes/exportar?formato=excel\|csv` |

Métodos, campos e respostas de cada endpoint: README do back-end.

---

## 5. Roteiro de testes

Com back-end e front-end rodando, em `http://localhost:5180`:

| Perfil         | Passos                                                                                                                                                                                                                                   |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Qualquer       | Login com credenciais inválidas mostra erro → login válido leva ao `/dashboard` → acessar uma rota de outro perfil volta ao `/dashboard` → sair e abrir `/produtos` leva ao login                                                        |
| `ADMIN`        | Cadastrar, editar e excluir um produto → cadastrar um voluntário → registrar uma entrada e uma saída e conferir o resumo → exportar o relatório → alterar o status de um pedido                                                          |
| `VOLUNTARIO`   | Entrar em `/caixa` → adicionar produtos e quantidades → escolher o pagamento → registrar a venda → conferir a baixa do estoque e a entrada no Financeiro (como ADMIN)                                                                    |
| `CLIENTE`      | Cadastrar-se → adicionar itens ao carrinho, alterar e remover → informar CEP (ex.: `35570000`) e conferir o endereço → preencher número → escolher pagamento (com troco, se `DINHEIRO`) → finalizar → ver o pedido em **Minhas compras** |
| Responsividade | Repetir os fluxos em desktop, tablet e smartphone (menus, formulários, tabelas e modais)                                                                                                                                                 |

---

## 6. Tecnologias e estrutura

| Tecnologia            | Uso                                 |
| --------------------- | ----------------------------------- |
| React 19 + TypeScript | Interface                           |
| Vite                  | Servidor de desenvolvimento e build |
| React Router DOM 7    | Rotas e proteção por perfil         |
| Axios                 | Requisições à API                   |
| Context API           | Sessão e perfil (`AuthContext`)     |
| Lucide React          | Ícones                              |

```text
src/
├── components/   layout (Header, Footer, MainLayout) e componentes reutilizáveis (VendaPresencial, CardMembro)
├── contexts/     AuthContext.tsx — login, logout e perfil
├── pages/        telas (Login, Loja, Produtos, VendasAdmin, FinanceiroAdmin, ...)
├── routes/       AppRoutes.tsx — rotas e controle por perfil; PrivateRoute.tsx
├── services/     api.ts — cliente Axios
├── types/        tipos TypeScript
├── assets/       imagens
├── App.tsx
└── main.tsx
```
