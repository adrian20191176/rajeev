# Repository Guidelines

## Project Structure & Module Organization
This repository is a minimal Astro app.

- `src/pages/` contains route entrypoints. `src/pages/index.astro` is the current homepage.
- `src/styles/` holds shared CSS, including `src/styles/global.css` for resets and base tokens.
- `astro.config.mjs` and `tsconfig.json` hold project configuration.

Keep the app lean. Add new pages only when they are part of the product, and prefer shared styles in `src/styles/` instead of page-local duplication.

## Build, Test, and Development Commands
Use Node.js `>=22.12.0`.

- `npm install` installs dependencies.
- `npm run dev` starts the Astro development server.
- `npm run build` creates the production build.
- `npm run preview` serves the production build locally.

## Coding Style & Naming Conventions
Follow the current Astro, CSS, and Tailwind conventions:

- Use 2-tab indentation in `.astro` files and CSS.
- Prefer lowercase, descriptive file names such as `about.astro` or `global.css`.
- Keep component and style names clear and functional. Use `PascalCase` for reusable Astro components if they are added later.
- Tailwind CSS is part of the project toolchain and must not be removed. Existing plain CSS in `src/styles/global.css` may stay as-is; use Tailwind utilities where they make new UI work faster and clearer.

## Testing Guidelines
There is no test suite yet. Before opening a change:

- Run `npm run build` to catch syntax or type issues.
- Verify layout and spacing in `npm run dev`, especially on narrow screens.

## Responsive Design Priority
Mobile responsive design is the number one priority in this repository.

- Start with mobile layouts first, then scale up to larger breakpoints.
- Check that spacing, typography, and navigation remain usable on small screens.
- Avoid fixed widths that break on phones. Prefer fluid layouts, flexible spacing, and responsive units.

## Tailwind CSS Context
This project will use Tailwind CSS throughout development.

- Keep `tailwindcss` and `@tailwindcss/vite` installed and configured in `astro.config.mjs`.
- Do not remove Tailwind imports or configuration unless explicitly requested by the project owner.
- For the current initial setup, the global CSS implementation is acceptable and does not need to be converted to Tailwind utilities.

## Commit & Pull Request Guidelines
Use short, imperative commit messages, such as `Add responsive hero`.

Pull requests should include:

- A clear summary of the change.
- Build or manual verification notes.
- Screenshots for UI changes, including mobile views when relevant.
