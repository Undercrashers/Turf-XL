# Turf XL – Frontend

React + Vite + Tailwind CSS client for Turf XL Baisakhi.

## Scripts
```bash
npm install      # install deps
npm run dev      # start dev server on :5173
npm run build    # production build
npm run preview  # preview built output
```

## Folder Purpose

| Folder              | Purpose                                                            |
|---------------------|--------------------------------------------------------------------|
| `src/api/`          | Axios client + per-module API call wrappers                        |
| `src/assets/`       | Images, icons, static files                                        |
| `src/components/`   | Reusable presentational UI (Button, Input, Navbar, etc.)           |
| `src/features/`     | Feature-scoped logic (auth, turf, slots, booking, dashboard)       |
| `src/pages/`        | Route-level page components                                        |
| `src/layouts/`      | Shell layouts (Main / Auth / Admin)                                |
| `src/routes/`       | Route tables + `ProtectedRoute`                                    |
| `src/context/`      | React Context providers (AuthContext, etc.)                        |
| `src/hooks/`        | Custom hooks                                                       |
| `src/utils/`        | Pure helpers (storage, validators, formatters)                     |
| `src/constants/`    | API endpoints, role names, enums                                   |
| `src/services/`     | Feature-agnostic service wrappers over api layer                   |
| `src/styles/`       | Global Tailwind / CSS                                              |

## Env Vars
Copy `.env.example` → `.env.local` and fill values.
