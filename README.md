# Patient Records Dashboard

Frontend application for managing patient records, developed as part of a technical challenge.  
The project focuses on **clean architecture, maintainability, scalability, and automated quality assurance**.

---

## Project Overview

This application allows users to:

- View a list of patients
- Create and edit patient records
- Mark patients as favorites
- Filter patients based on favorites
- Interact with a responsive and consistent user interface

The main objective of the project is not only functional completeness, but also to demonstrate **frontend architectural decisions, code organization, and best practices**.

---

## Architecture

The codebase follows a **feature-oriented architecture**, designed to promote separation of concerns and long-term maintainability.

### Features

Each domain area (e.g. patients) is organized as a feature, encapsulating:

- Domain-specific components
- Types and models
- Hooks and local logic

This structure improves cohesion, simplifies navigation, and makes the application easier to scale as new features are introduced.

---

### UI Layer

The UI layer contains reusable, domain-agnostic components.

Responsibilities include:
- Encapsulating Tailwind CSS styles
- Enforcing consistent layout and spacing
- Providing reusable building blocks (buttons, stacks, tabs, etc.)

This approach avoids style duplication and keeps business logic independent from presentation concerns.

---

### Pages

Pages act as orchestration layers that:

- Compose features and UI components
- Manage page-level UI state
- Coordinate user interactions

Business logic remains outside pages, keeping them focused on composition rather than implementation details.

---

## Technology Stack

- **React** + **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Playwright** for end-to-end testing
- **GitHub Actions** for Continuous Integration
- **Vercel** for deployment

---

## Testing Strategy

The project includes **end-to-end (E2E) tests** implemented with Playwright, covering critical user flows.

Automated tests are part of the CI pipeline to:
- Prevent regressions
- Validate functionality before deployment
- Ensure confidence in production releases

---

## CI / CD Pipeline

- GitHub Actions runs automated tests on every push
- The pipeline fails if any test does not pass
- Vercel deploys the application only after successful checks

This guarantees that the main branch remains stable and production-ready.

---

## Installation and Usage

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run end-to-end tests
npm run test

# Open Playwright test runner
npm run test:ui
