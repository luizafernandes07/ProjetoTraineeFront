# AgnusGestao — Front-End

Aplicação web do **AgnusGestao**, sistema de gestão desenvolvido para o **Grupo de Oração Agnus Dei**, da Paróquia São Vicente Ferrer, em Formiga — MG.

O projeto foi desenvolvido com React, TypeScript e Vite e integra-se a uma API REST para oferecer uma plataforma de gerenciamento de produtos, vendas, estoque e movimentações financeiras.

O sistema possui três perfis de acesso, com funcionalidades específicas:

- **ADMIN:** gerenciamento administrativo, produtos, voluntários, vendas e financeiro.
- **VOLUNTARIO:** realização de vendas presenciais pelo ponto de venda (PDV).
- **CLIENTE:** acesso à loja virtual para compra de artigos religiosos e acompanhamento de pedidos.

Projeto desenvolvido como parte do **Desafio Front-End 2026.2**.

---

## Sumário

1. [Visão geral](#1-visão-geral)
2. [Tecnologias utilizadas](#2-tecnologias-utilizadas)
3. [Pré-requisitos](#3-pré-requisitos)
4. [Instalação e execução](#4-instalação-e-execução)
5. [Perfis de acesso e funcionalidades](#5-perfis-de-acesso-e-funcionalidades)
6. [Rotas da aplicação](#6-rotas-da-aplicação)
7. [Integração com o Back-End](#7-integração-com-o-back-end)
8. [Estrutura do projeto](#8-estrutura-do-projeto)
9. [Roteiro de testes](#9-roteiro-de-testes)
10. [Segurança e observações](#10-segurança-e-observações)

---

## 1. Visão geral

O AgnusGestao foi desenvolvido para digitalizar e organizar os processos administrativos e comerciais do Grupo de Oração Agnus Dei.

A aplicação oferece uma interface responsiva, com navegação adaptada ao perfil autenticado, permitindo que clientes, voluntários e administradores utilizem o sistema de acordo com suas permissões.

**Repositórios do projeto:**

- Front-End: https://github.com/luizafernandes07/ProjetoTraineeFront
- Back-End: https://github.com/luizafernandes07/ProjetoTrainee

A documentação das entidades, regras de negócio, banco de dados e endpoints está disponível no README do Back-End.

---

## 2. Tecnologias utilizadas

| Tecnologia         | Finalidade                               |
| ------------------ | ---------------------------------------- |
| React 19           | Construção da interface                  |
| TypeScript         | Tipagem estática e organização do código |
| Vite 8             | Servidor de desenvolvimento e build      |
| React Router DOM 7 | Navegação e gerenciamento de rotas       |
| Axios              | Comunicação com a API REST               |
| Context API        | Gerenciamento global de autenticação     |
| Lucide React       | Biblioteca de ícones                     |
| CSS                | Estilização e responsividade             |
| Oxlint             | Análise estática do código               |

---

## 3. Pré-requisitos

Antes de executar a aplicação, é necessário possuir:

- Node.js compatível com Vite 8.
- npm.
- Git.
- Back-End AgnusGestao configurado e em execução.
- PostgreSQL disponível por meio da configuração do Back-End.

O endereço padrão esperado para a API é:

`http://localhost:3002`

A aplicação Front-End utiliza a porta `5180`.

---

## 4. Instalação e execução

### 4.1. Clonar o repositório

```bash
git clone https://github.com/luizafernandes07/ProjetoTraineeFront.git
cd ProjetoTraineeFront
```

### 4.2. Instalar as dependências

```bash
npm ci
```

### 4.3. Configurar as variáveis de ambiente

Crie o arquivo `.env` a partir do modelo disponibilizado:

**PowerShell:**

```powershell
Copy-Item .env.example .env
```

Configure a variável:

```env
VITE_API_URL=http://localhost:3002/api
```

A URL deve apontar para o endereço da API, incluindo o prefixo `/api` e sem barra no final.

O arquivo `.env` é local e não deve ser enviado ao GitHub.

### 4.4. Iniciar o Back-End

Na pasta do projeto Back-End, configure o ambiente conforme as instruções do README correspondente.

Com o Docker configurado, execute:

```bash
docker compose up --build
```

Certifique-se de que a API esteja disponível antes de iniciar o Front-End.

### 4.5. Iniciar o Front-End

Na pasta do projeto Front-End:

```bash
npm run dev
```

Acesse:

**http://localhost:5180**

A porta é fixa e utiliza `strictPort`. Caso esteja ocupada, será necessário liberar a porta antes de iniciar a aplicação.

### 4.6. Comandos disponíveis

| Comando           | Descrição                                               |
| ----------------- | ------------------------------------------------------- |
| `npm run dev`     | Inicia o servidor de desenvolvimento                    |
| `npm run build`   | Verifica os tipos TypeScript e gera o build de produção |
| `npm run preview` | Executa uma prévia do build                             |
| `npm run lint`    | Executa a análise estática com Oxlint                   |

---

## 5. Perfis de acesso e funcionalidades

### 5.1. ADMIN — Administrador

O administrador possui acesso às funcionalidades de gerenciamento do sistema.

**Dashboard administrativo**

- Painel inicial com acesso às principais áreas do sistema.
- Navegação para produtos, vendas, voluntários e financeiro.

**Gerenciamento de produtos**

- Cadastro de produtos.
- Edição de informações.
- Desativação de produtos.
- Gerenciamento de preços, categorias e estoque.

**Gerenciamento de vendas**

- Consulta de vendas presenciais e pedidos online.
- Visualização das informações dos pedidos.
- Atualização do status das vendas.
- Acompanhamento dos pedidos e operações realizadas.

**Gerenciamento de voluntários**

- Cadastro de voluntários.
- Edição de informações.
- Desativação e reativação de usuários.

**Financeiro**

- Consulta de entradas, saídas e saldo.
- Histórico de movimentações.
- Registro manual de entradas e saídas.
- Exclusão de lançamentos manuais.
- Exportação de relatórios em Excel e CSV.

### 5.2. VOLUNTARIO — Voluntário

O voluntário possui acesso ao ponto de venda presencial (PDV).

Funcionalidades:

- Visualização do catálogo de produtos.
- Acesso a artigos religiosos e produtos da lanchonete.
- Seleção de produtos e quantidades.
- Cálculo automático do total da venda.
- Seleção da forma de pagamento: PIX ou DINHEIRO.
- Registro de vendas presenciais.
- Atualização do estoque após a venda.
- Registro da entrada correspondente no caixa.

O voluntário não possui acesso às funcionalidades administrativas exclusivas do ADMIN.

### 5.3. CLIENTE — Cliente

O cliente possui acesso à loja virtual, destinada exclusivamente à compra de artigos religiosos.

**Loja virtual**

- Visualização dos produtos disponíveis.
- Consulta de preços e estoque.
- Adição de produtos ao carrinho.

**Carrinho**

- Adição e remoção de itens.
- Alteração de quantidades.
- Cálculo automático do valor total.

**Entrega**

- Consulta de endereço pelo CEP utilizando a integração com ViaCEP.
- Preenchimento do número do endereço.
- Campo de complemento opcional.

**Pagamento**

- PIX.
- DINHEIRO na entrega.
- Possibilidade de informar o valor para troco em pagamentos em dinheiro.

**Minhas compras**

- Consulta do histórico de pedidos.
- Visualização dos itens comprados.
- Acompanhamento do status dos pedidos.

O cliente não pode realizar compras de produtos da lanchonete. Essa restrição também é validada pelo Back-End.

---

## 6. Rotas da aplicação

As rotas são protegidas conforme o perfil autenticado.

| Rota                         | Acesso                | Funcionalidade                      |
| ---------------------------- | --------------------- | ----------------------------------- |
| `/login`                     | Público               | Autenticação                        |
| `/cadastro`                  | Público               | Cadastro de clientes                |
| `/recuperar-senha`           | Público               | Solicitação de recuperação de senha |
| `/redefinir-senha?token=...` | Público               | Redefinição de senha                |
| `/dashboard`                 | Usuários autenticados | Painel conforme o perfil            |
| `/loja`                      | CLIENTE e VOLUNTARIO  | Catálogo de produtos                |
| `/minhas-compras`            | CLIENTE               | Histórico de pedidos                |
| `/caixa`                     | VOLUNTARIO            | Ponto de venda presencial           |
| `/produtos`                  | ADMIN                 | Gerenciamento de produtos           |
| `/vendas-admin`              | ADMIN                 | Gerenciamento de vendas             |
| `/financeiro`                | ADMIN                 | Caixa e relatórios financeiros      |
| `/cadastro-voluntario`       | ADMIN                 | Gerenciamento de voluntários        |

O acesso às rotas é controlado no Front-End e as permissões são novamente verificadas pela API.

Usuários não autenticados são direcionados para a tela de login. Usuários autenticados que tentam acessar áreas não permitidas são redirecionados conforme as regras de navegação da aplicação.

---

## 7. Integração com o Back-End

A comunicação entre o Front-End e o Back-End é centralizada em:

`src/services/api.ts`

A aplicação utiliza Axios para realizar as requisições HTTP.

### Autenticação

O sistema utiliza autenticação baseada em JWT.

Após o login:

- O token de autenticação é armazenado no `localStorage`.
- Os dados do usuário são armazenados para manter a sessão.
- As requisições autenticadas enviam o token no cabeçalho `Authorization`.
- O logout remove os dados de autenticação armazenados.

### Principais endpoints utilizados

| Funcionalidade            | Endpoint                                    |
| ------------------------- | ------------------------------------------- |
| Login                     | `POST /auth/login`                          |
| Cadastro de cliente       | `POST /auth/register`                       |
| Recuperação de senha      | `POST /auth/forgot-password`                |
| Redefinição de senha      | `POST /auth/reset-password`                 |
| Listagem de produtos      | `GET /produtos`                             |
| Cadastro de produtos      | `POST /produtos`                            |
| Edição de produtos        | `PUT /produtos/:id`                         |
| Exclusão de produtos      | `DELETE /produtos/:id`                      |
| Consulta de CEP           | `GET /cep/:cep`                             |
| Venda online              | `POST /vendas/online`                       |
| Histórico do cliente      | `GET /vendas/minhas-compras`                |
| Venda presencial          | `POST /vendas/presencial`                   |
| Listagem de vendas        | `GET /vendas`                               |
| Atualização de status     | `PATCH /vendas/:id/status`                  |
| Listagem de voluntários   | `GET /usuarios`                             |
| Movimentações financeiras | `/movimentacoes`                            |
| Resumo financeiro         | `GET /movimentacoes/resumo`                 |
| Exportação financeira     | `GET /movimentacoes/exportar?formato=excel` |

Os métodos, parâmetros, regras de acesso e estruturas das respostas estão documentados no README do Back-End e na documentação da API.

---

## 8. Estrutura do projeto

```text
agnus-frontend/
│
├── imagens/
│   └── agnus/
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MainLayout.tsx
│   │   ├── CardMembro.tsx
│   │   └── VendaPresencial.tsx
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx
│   │
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Cadastro.tsx
│   │   ├── CadastroVoluntario.tsx
│   │   ├── Loja.tsx
│   │   ├── MinhasCompras.tsx
│   │   ├── Produtos.tsx
│   │   ├── VendasAdmin.tsx
│   │   ├── FinanceiroAdmin.tsx
│   │   ├── CaixaVoluntario.tsx
│   │   ├── RecuperarSenha.tsx
│   │   ├── RedefinirSenha.tsx
│   │   ├── Dashboard.tsx
│   │   └── NotFound.tsx
│   │
│   ├── routes/
│   │   ├── AppRoutes.tsx
│   │   ├── PrivateRoute.tsx
│   │   └── index.tsx
│   │
│   ├── services/
│   │   └── api.ts
│   │
│   ├── styles/
│   ├── types/
│   │   └── auth.ts
│   │
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

---

## 9. Roteiro de testes

Com o Back-End e o Front-End em execução, acesse `http://localhost:5180`.

| Perfil         | Cenários de teste                                                                                                                                           |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Público        | Login com credenciais inválidas e válidas; cadastro de cliente; navegação para recuperação de senha                                                         |
| ADMIN          | Cadastrar, editar e desativar produtos; cadastrar voluntários; consultar vendas; atualizar status; registrar movimentações financeiras; exportar relatórios |
| VOLUNTARIO     | Acessar o PDV; selecionar produtos e quantidades; escolher forma de pagamento; registrar venda; conferir atualização do estoque                             |
| CLIENTE        | Realizar cadastro; adicionar produtos ao carrinho; consultar CEP; preencher endereço; selecionar pagamento; finalizar pedido; consultar histórico           |
| Responsividade | Verificar menus, formulários, tabelas e componentes em desktop, tablet e smartphone                                                                         |

### Validações importantes

- Usuários sem autenticação não devem acessar rotas privadas.
- Cada perfil deve acessar somente as funcionalidades autorizadas.
- O cliente não deve conseguir comprar produtos da lanchonete.
- O voluntário deve realizar vendas presenciais.
- O administrador deve conseguir consultar as movimentações financeiras.
- As operações realizadas no Front-End devem refletir corretamente no Back-End.

---

## 10. Segurança e observações

- As permissões são controladas também no Back-End, não dependendo exclusivamente da interface.
- O token JWT é enviado nas requisições autenticadas.
- O arquivo `.env` não deve ser versionado.
- O `.env.example` contém o modelo das variáveis necessárias para configuração.
- Não devem ser publicados tokens, senhas ou credenciais reais.
- O projeto utiliza tratamento de erros para falhas de comunicação com a API, requisições HTTP e sessões inválidas.
- A aplicação possui indicadores de carregamento e mensagens de sucesso e erro.

### Recuperação de senha

A aplicação possui telas para solicitação de recuperação e redefinição de senha por token.

**Atenção:** o funcionamento completo desse fluxo depende da configuração correta do serviço de e-mail SMTP no Back-End. Caso o SMTP não está funcionando, o envio das mensagens de recuperação não estará disponível.

---

## Considerações finais

O Front-End do AgnusGestao foi desenvolvido para oferecer uma experiência de utilização organizada, responsiva e adaptada às necessidades do Grupo de Oração Agnus Dei.

A separação por perfis permite organizar as operações de clientes, voluntários e administradores, enquanto a integração com o Back-End centraliza as regras de negócio, a autenticação e a persistência dos dados.

**Projeto AgnusGestao — Grupo de Oração Agnus Dei**

Desafio Front-End 2026.2.
