# 🙏 Gestão do Grupo de Oração Agnus Dei

> **Aplicação Web desenvolvida para o Desafio Front-End 2026.2 da Comp Júnior.**

---

## 📌 Sobre o Projeto

O **Gestão do Grupo de Oração Agnus Dei** é uma aplicação web desenvolvida para organizar e gerenciar os membros, eventos e atividades do grupo de oração. O projeto visa centralizar as informações da comunidade em uma plataforma intuitiva, acessível e responsiva.

A aplicação consome dados de uma **API REST desenvolvida como Back-end próprio** no desafio full-stack, integrando operações de **CRUD completo** (Criação, Leitura, Atualização e Exclusão) e um **sistema de autenticação seguro** com rotas protegidas.

---

## 🛠️ Tecnologias Utilizadas

- **Front-End:** React + TypeScript (Vite)
- **Roteamento:** React Router DOM
- **Consumo de API:** Axios
- **Estilização:** CSS / CSS Modules
- **Back-End:** API Própria (Trilha Full-Stack)
- **Controle de Versão:** Git & GitHub

---

## 💡 Justificativa das Escolhas Tecnológicas

_(Requisito obrigatório do desafio)_

| Tecnologia             | Justificativa                                                                                                                                                               |
| :--------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **React + TypeScript** | Proporciona tipagem estática e segurança na manipulação das respostas do back-end próprio, reduzindo erros durante o desenvolvimento e facilitando a manutenção do código.  |
| **Vite**               | Oferece um ambiente de desenvolvimento extremamente rápido com Hot Module Replacement (HMR).                                                                                |
| **Axios**              | Facilita a integração com o back-end, permitindo a criação de instâncias personalizadas com interceptores para envio de tokens (JWT) e tratamento centralizado de erros.    |
| **React Router DOM**   | Permite criar uma navegação de Single Page Application (SPA) fluida, com controle dinâmico de rotas públicas e privadas.                                                    |
| **Back-End Próprio**   | Desenvolvido para atender rigorosamente às necessidades específicas de regra de negócio do grupo de oração e garantir total integração entre o front-end e a base de dados. |

---

## 🏗️ Estrutura de Pastas

```text
src/
├── assets/        # Recursos estáticos (imagens, ícones, logos do grupo)
├── components/    # Componentes reutilizáveis (Header, Footer, Inputs, Modais, Cards)
├── pages/         # Páginas da aplicação (Login, Dashboard, Membros, Encontros)
├── routes/        # Configuração de rotas públicas e rotas protegidas
├── services/      # Configuração do Axios e chamadas para a API do Back-End
└── styles/        # Estilos globais e temas
```
## 📅 Progresso do Desenvolvimento

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