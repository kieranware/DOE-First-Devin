# Employee Experience Platform

A React-based Employee Experience Platform for an Irish public sector HCM system, focusing on creating a unified interface that sits on top of four instances of the underlying HCM and payroll system (Primary, Post Primary, Non Teaching Staff, and Pensioners).

## Features

- Seamless user experience that hides the complexity of multiple backend instances
- Bilingual support (English and Irish)
- WCAG 2.2 AA compliance
- Built with React and Tailwind CSS
- Mock implementations of all external API calls

## Project Structure

```
employee-experience-platform/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── context/        # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── i18n/           # Internationalization
│   │   ├── services/       # Mock API services
│   │   └── types/          # TypeScript type definitions
│   ├── public/             # Static assets
│   └── ...
└── backend/                # Mock API server (Express)
    └── ...
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Setup Instructions

### Frontend

1. Navigate to the frontend directory:
   ```
   cd employee-experience-platform/frontend
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file with the following content:
   ```
   VITE_API_URL=http://localhost:8000
   VITE_DEFAULT_LANGUAGE=en
   ```

4. Start the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

5. The application will be available at `http://localhost:5173`

### Backend (Mock API Server)

1. Navigate to the backend directory:
   ```
   cd employee-experience-platform/backend
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Start the server:
   ```
   npm run dev
   # or
   yarn dev
   ```

4. The mock API server will be available at `http://localhost:8000`

## Authentication

The application uses a mock authentication service. You can log in with any credentials.

## Multi-instance Support

The platform supports four HCM instances:
- Primary
- Post Primary
- Non Teaching Staff
- Pensioners

Users can have access to one or more instances, and the UI adapts accordingly.

## Accessibility

The application is designed to meet WCAG 2.2 AA compliance standards. See the accessibility compliance report in `frontend/accessibility-compliance-report.md` for details.

## Multilingual Support

The application supports both English and Irish languages. You can switch between languages using the language toggle in the header.
