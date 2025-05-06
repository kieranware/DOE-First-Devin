# Employee Experience Platform

This PR implements the initial phase of a React-based Employee Experience Platform for an Irish public sector HCM system. The platform creates a unified interface that sits on top of four instances of the underlying HCM and payroll system (Primary, Post Primary, Non Teaching Staff, and Pensioners).

**Requested by:** Kieran.Ware@theaccessgroup.com
**Link to Devin run:** https://app.devin.ai/sessions/c16b266954284bb085359f145028ce99

## Features Implemented

- **Core UI Framework**
  - Smart left menu that adapts to user personas
  - Card-based main dashboard with priority tasks
  - Analytics panel
  - Responsive design (desktop and iPad)
  - Language switching between English and Irish

- **Personal Information Management**
  - View and edit contact details
  - Emergency contact details
  - Bank account details
  - Civil status
  - Conflict resolution UI

- **Document Viewing**
  - Interfaces for viewing/downloading payslips
  - Salary certificates
  - Other employee documents

- **Navigation & Context Awareness**
  - Smart instance routing
  - Quick links to frequently accessed functions
  - Instance selector for multi-instance users

## Technical Implementation

- **Mock API Services**
  - HCM System API
  - API Router for OLCS Integration
  - Data Synchronization Service
  - Authentication Service

- **UI Components**
  - Implemented using the Access design system
  - WCAG 2.2 AA compliant
  - Bilingual support

- **State Management**
  - React Context API with useReducer
  - Separate contexts for authentication, language, instance, personal info, and documents

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

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

## Testing

The application has been tested for:
- Functionality across all features
- Responsive design
- Accessibility compliance
- Bilingual support
- Mock API integration

## Accessibility

The application is designed to meet WCAG 2.2 AA compliance standards. See the accessibility compliance report in `frontend/accessibility-compliance-report.md` for details.

## Next Steps

- Implement additional features for the next phase
- Add comprehensive unit and integration tests
- Enhance analytics functionality
- Connect to real backend services when available
