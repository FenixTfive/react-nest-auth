# 🔐 Basic Login React + NestJS

**Basic Login React + NestJS** is a functional login/register template using a modern stack: React on the frontend and NestJS on the backend. It's ideal as a starting point for applications requiring authentication and a clean, scalable structure.

## 🧱 Tech Stack

### Frontend:

- ⚛️ React JS
- 🎨 TailwindCSS v4
- 🧭 React Router DOM
- 📝 React Hook Form + Yup for form handling and validation
- 🌐 Native Fetch API (via a custom wrapper)
- 🟦 TypeScript
- ⚡️ Vite

### Backend:

- 🚀 NestJS
- 🛢️ PostgreSQL (database)
- 🔧 Prisma ORM

> ⚙️ Runtime: Node.js v20.19.3, NPM v10.8.2

---

## 🚀 Getting Started

1. Clone the repository:
   git clone https://github.com/your-username/basic-login-react-nestjs.git
   cd basic-login-react-nestjs

2. Install dependencies:
   npm install

3. Create an environment file: .env, .env.development, or .env.production and define your backend API URL:
   VITE_API_URL=http://localhost:3000

4. Start the development server:
   npm run dev

## 🌐 Environment Variables

Variable Description
VITE_API_URL Base URL for the backend API

You can define different environments using:

.env

.env.development

.env.production

---

## 🧰 Notes for developers

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
