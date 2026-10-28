# Gestão do Grupo de Oração Agnus Dei

> **Aplicação Web desenvolvida para o Desafio Front-End 2026.2 da Comp Júnior.**

---

## Sobre o Projeto

O **Gestão do Grupo de Oração Agnus Dei** é uma aplicação web desenvolvida para organizar e gerenciar os membros, eventos e atividades do grupo de oração. O projeto visa centralizar as informações da comunidade em uma plataforma intuitiva, acessível e responsiva.

A aplicação consome dados de uma **API REST desenvolvida como Back-end próprio** no desafio full-stack, integrando operações de **CRUD completo** (Criação, Leitura, Atualização e Exclusão) e um **sistema de autenticação seguro** com rotas protegidas.

---

## Tecnologias Utilizadas

- **Front-End:** React + TypeScript (Vite)
- **Roteamento:** React Router DOM
- **Consumo de API:** Axios
- **Estilização:** CSS / CSS Modules
- **Back-End:** API Própria (Trilha Full-Stack)
- **Controle de Versão:** Git & GitHub

---

## Justificativa das Escolhas Tecnológicas

_(Requisito obrigatório do desafio)_

| Tecnologia             | Justificativa                                                                                                                                                               |
| :--------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **React + TypeScript** | Proporciona tipagem estática e segurança na manipulação das respostas do back-end próprio, reduzindo erros durante o desenvolvimento e facilitando a manutenção do código.  |
| **Vite**               | Oferece um ambiente de desenvolvimento extremamente rápido com Hot Module Replacement (HMR).                                                                                |
| **Axios**              | Facilita a integração com o back-end, permitindo a criação de instâncias personalizadas com interceptores para envio de tokens (JWT) e tratamento centralizado de erros.    |
| **React Router DOM**   | Permite criar uma navegação de Single Page Application (SPA) fluida, com controle dinâmico de rotas públicas e privadas.                                                    |
| **Back-End Próprio**   | Desenvolvido para atender rigorosamente às necessidades específicas de regra de negócio do grupo de oração e garantir total integração entre o front-end e a base de dados. |

---

## Estrutura de Pastas

```text
src/
├── assets/        # Recursos estáticos (imagens, ícones, logos do grupo)
├── components/    # Componentes reutilizáveis (Header, Footer, Inputs, Modais, Cards)
├── pages/         # Páginas da aplicação (Login, Dashboard, Membros, Encontros)
├── routes/        # Configuração de rotas públicas e rotas protegidas
├── services/      # Configuração do Axios e chamadas para a API do Back-End
└── styles/        # Estilos globais e temas
```
## Progresso do Desenvolvimento

- [x] **Semana 1: Configuração do Ambiente e Estrutura Base**
  - Setup do projeto React com Vite e TypeScript.
  - Configuração do container Docker para o ambiente de desenvolvimento.
  - Criação dos componentes estruturais de layout (`Header` e `Footer`).

- [x] **Semana 2: Consumo da API (Read), Componentização e Comunicação com Docker**
  - **Integração com API REST:** Configuração do cliente HTTP Axios (`api.ts`) integrado ao container Back-End Node.js/Express na porta `3000`.
  - **Tratamento de Comunicação Cross-Origin:** Configuração de suporte e liberação de CORS no servidor para viabilizar as requisições originadas do Front-End Vite (`http://localhost:5173`).
  - **Operação de Leitura (Read):** Implementação de requisições assíncronas (GET) na rota `/membros` para renderização dinâmica dos dados na interface.
  - **Gestão Abrangente de Estados:** Controle completo de fluxo de dados com React Hooks (`useState` e `useEffect`), prevendo estados de carregamento (*loading*), tratamento visual de erros de conexão e exibição de estado vazio (*empty state*).
  - **Componentização Reutilizável:** Modularização do layout através do componente `CardMembro` para isolar a responsabilidade de apresentação visual dos dados retornados da API.
  
  - [x] **Semana 3: Autenticação, Gerenciamento de Estado Global e Rotas Protegidas**
  - **Contexto Global de Autenticação (`AuthContext`):** Criação do provedor de autenticação com React Context API para gerenciamento de estado do usuário logado e métodos de `login` e `logout`.
  - **Gerenciamento de Sessão e Persistência:** Armazenamento seguro e inicialização automática de sessão persistente via `localStorage` com as chaves `@AgnusGestao:token` e `@AgnusGestao:user`.
  - **Injeção Automática de Token:** Configuração das requisições via Axios enviando o cabeçalho `Authorization: Bearer <token>` para rotas protegidas da API.
  - **Roteamento Protegido (`PrivateRoute`):** Implementação de componente guardião de rota interceptando acessos não autenticados e realizando o redirecionamento automático para a tela de `/login`.
  - **Formulário de Autenticação e Navegação:** Tratamento e integração do formulário de login com navegação declarativa via `useNavigate` para redirecionamento imediato para o `/dashboard` após sucesso.

  - [x] **Semana 4: Navegação, Layout Reutilizável, Estrutura de Páginas e Responsividade**
    - **Arquitetura de Layout Reutilizável (`MainLayout`, `Header`, `Footer`):** Implementação de uma estrutura unificada e padronizada utilizando o padrão Wrapper/Children (`React.ReactNode`), centralizando o cabeçalho fixo com barra de navegação, área principal de conteúdo e rodapé institucional.
    - **Navegação Declarativa e Central de Rotas (`AppRoutes`):** Mapeamento e proteção de rotas via React Router DOM (`Routes`, `Route`, `Navigate`), garantindo o fluxo contínuo e a blindagem de telas restritas via `PrivateRoute`.
    - **Design System e Identidade Sacra Padronizada:** Consolidação da paleta de cores institucional do Grupo de Oração Agnus Dei (Vinho Sacro `#4a0e17`, Dourado `#d4af37` e Creme `#faf8f5`), alinhando acessibilidade visual, contraste e tipografia para eventos.
    - **Responsividade Multi-Dispositivo (Mobile, Tablet e Desktop):** Desenvolvimento de layout dinâmico adaptável via CSS Breakpoints e navegação retrátil no cabeçalho (Menu Hambúrguer com `Menu` / `X` da biblioteca `lucide-react`) para garantir usabilidade perfeita em celulares e tablets.
    - **Sistema de Navegação Flutuante (One-Page Scroll):** Ancoragem e rolagem suave (`scrollIntoView` com `scroll-behavior: smooth`) integrada ao menu superior, permitindo transições fluidas entre as seções de Início, Lanchonete, Encontros, História, Músicas, Retiros e Apoio.
    - **Catálogo Interativo de Produtos e Simulação de Vendas (PDV):** Exibição dos itens comercializados nos encontros (Lanchonete e Artigos Religiosos) com suporte a filtragem por categoria, exibição de estoque e carrinho de compras interativo em tempo real para os membros servidores.
    - **Integração de Mídia Externa (Spotify Player Embed):** Incorporação nativa via Iframe da conta oficial de artista do grupo no Spotify (`6TTYFyM6N4SZDhKxnHCzTF`), disponibilizando reprodutor de louvores diretamente na aplicação.
    - **Apoio Institucional e Integração PIX:** Módulo dedicado para suporte financeiro das missões com funcionalidade de cópia rápida em um clique da chave PIX institucional (`agnusdeirenovacao@gmail.com`) e feedback visual dinâmico.