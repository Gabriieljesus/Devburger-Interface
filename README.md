<div align="center">

<img src="https://img.shields.io/badge/status-concluído-brightgreen?style=for-the-badge" />
<img src="https://img.shields.io/badge/versão-1.0.0-blue?style=for-the-badge" />
<img src="https://img.shields.io/badge/licença-MIT-orange?style=for-the-badge" />

# 🍔 DevBurger — Interface

> Plataforma moderna de pedidos de hambúrgueres com experiência de usuário fluida e design responsivo.

[Funcionalidades](#-funcionalidades) • [Tecnologias](#-tecnologias) • [Como rodar](#-como-rodar) • [Integração com API](#-integração-com-a-api) • [Autor](#-autor)

</div>

---

## 📸 Visão Geral

O **DevBurger** é um projeto Full Stack desenvolvido durante a formação no DevClub. Esta interface oferece uma experiência moderna e intuitiva para pedidos de hambúrgueres — do cardápio até a confirmação do pedido.

---

## ✨ Funcionalidades

- 🔐 Login e cadastro de usuários
- 🍔 Listagem de produtos do cardápio
- 🛒 Carrinho de compras interativo
- ✅ Confirmação de pedido
- 💬 Feedback visual de ações (alertas, loading, erros)
- 📱 Layout responsivo para mobile e desktop

---

## 🧰 Tecnologias

| Tecnologia | Finalidade |
|-----------|-----------|
| ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) | Construção da interface |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) | Lógica da aplicação |
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) | Estrutura das páginas |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) | Estilização |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white) | Requisições HTTP |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) | Ambiente de desenvolvimento |

---

## 🚀 Como rodar

### Pré-requisitos

- Node.js instalado
- API do DevBurger rodando ([ver repositório da API](https://github.com/Gabriieljesus/Devburger-Api))

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Gabriieljesus/Devburger-Interface

# Acesse a pasta
cd Devburger-Interface

# Instale as dependências
npm install

# Inicie o projeto
npm run dev
```

Acesse em: `http://localhost:5173`

---

## 🔗 Integração com a API

A interface consome a API do DevBurger para:

- 📦 Buscar produtos do cardápio
- 🛒 Enviar e gerenciar pedidos
- 👤 Criar e autenticar usuários

> Repositório da API: [Devburger-Api](https://github.com/Gabriieljesus/Devburger-Api)

---

## 📁 Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
├── pages/          # Páginas da aplicação
├── services/       # Configuração do Axios e chamadas à API
├── styles/         # Estilos globais
└── main.jsx        # Entrada da aplicação
```

---

## 🎯 O que aprendi com esse projeto

- Construção de um projeto Full Stack completo
- Componentização e organização de código em React
- Integração de front-end com API REST
- Boas práticas de UI/UX
- Gerenciamento de estado e fluxo de dados

---

## 👨‍💻 Autor

<div align="center">

**Gabriel Jesus**

Desenvolvido durante a formação Full Stack no **DevClub**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Gabriieljesus)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gabrieljesus-silva)
[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=About.me&logoColor=white)](https://gabriel-jesus-portfoliodev.vercel.app/)

</div>
