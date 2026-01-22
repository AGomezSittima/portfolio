# Portfolio

A modern, multilingual portfolio website built with Astro, React, and Tailwind CSS.

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- pnpm (recommended) or npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

3. Copy the environment example and update values:

```bash
cp .env.example .env
cp .env.example .env.development # optional
```

Edit the `.env` (and optional `.env.development`).

4. Start the development server:

```bash
pnpm dev
```

The site will be available at `http://localhost:4321`

## 🛠️ Tech Stack

### Core

- **[Astro](https://astro.build)** - Static site generator with islands architecture
- **[React](https://react.dev)** - UI components and interactivity
- **[TypeScript](https://www.typescriptlang.org)** - Type safety

### Styling

- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework

### UI Components

- **[shadcn/ui](https://ui.shadcn.com)** - Re-usable components built with Radix UI and Tailwind CSS
- **[Lucide Icons](https://lucide.dev)** - Icon library

### Forms

- **[@tanstack/react-form](https://tanstack.com/form)** - Form state management
- **[Formspree](https://formspree.io)** - Form backend for contact form submissions

### Deployment

- **[Netlify](https://www.netlify.com)** - Hosting and deployment platform

### Development

- **[Prettier](https://prettier.io)** - Code formatting

## 📁 Project Structure

```text
/
├── public/
│   ├── favicon.svg
│   └── pdfs/                     # CV and other documents
└── src/
    ├── actions/                  # Server actions (contact form, etc.)
    ├── assets/                   # Images and brand logos
    ├── components/               # Reusable components
    │   ├── portfolio-sections/   # Page sections
    │   ├── ui/                   # UI components (buttons, dialogs, etc.)
    │   └── ...
    ├── i18n/             # Internationalization
    │   └── data/         # Translation files
    ├── layouts/          # Page layouts
    ├── lib/              # Utility functions
    ├── pages/            # File-based routing
    └── styles/
```

## 🧞 Commands

All commands are run from the root of the project:

| Command               | Action                                           |
| :-------------------- | :----------------------------------------------- |
| `pnpm install`        | Install dependencies                             |
| `pnpm dev`            | Start dev server at `localhost:4321`             |
| `pnpm build`          | Build production site to `./dist/`               |
| `pnpm astro ...`      | Run CLI commands like `astro add`, `astro check` |
| `pnpm type`           | Run TypeScript type checking                     |
| `pnpm prettier`       | Format code with Prettier                        |
| `pnpm netlify:dev`    | Start Netlify dev server                         |
| `pnpm netlify:serve`  | Serve the built site locally via Netlify         |
| `pnpm netlify:deploy` | Deploy to Netlify                                |

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
