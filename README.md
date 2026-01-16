Patient Records Dashboard

Frontend application for managing patient records, developed as part of a technical challenge.
The project emphasizes clean architecture, maintainability, scalability, and automated quality assurance.

Project Overview

This application provides functionality to:

Display a list of patients

Create and edit patient records

Mark patients as favorites

Filter patients based on favorites

Deliver a responsive and consistent user interface

Beyond core functionality, the primary objective of the project is to demonstrate technical decision-making, code organization, and frontend best practices.

Architecture

The codebase is organized into three primary layers, designed to promote separation of concerns and long-term maintainability.

Features

Feature-based folders represent distinct parts of the application domain (e.g. patients).

Each feature encapsulates:

Domain-specific components

Related types and models

Hooks and logic specific to that domain

This approach improves cohesion and reduces the cognitive overhead when working on or extending a specific area of the application.

UI

The UI layer contains reusable, domain-agnostic components.

Responsibilities of this layer include:

Defining shared visual and layout rules

Encapsulating Tailwind CSS styles

Ensuring visual consistency across the application

Maximizing component reuse

By centralizing UI concerns, styling decisions remain consistent and isolated from business logic.

Pages

Pages are responsible for:

Composing features and UI components

Managing page-level UI state

Coordinating user interactions and data flow

Pages do not contain business logic; instead, they act as orchestration layers that connect the different building blocks of the application.

Technology Stack

React with TypeScript

Vite

Tailwind CSS

Playwright for end-to-end testing

GitHub Actions for Continuous Integration

Vercel for deployment

Testing Strategy

The project includes end-to-end (E2E) tests implemented with Playwright, focusing on critical user flows.

Testing is integrated into the development workflow to:

Automatically validate functionality on each push or pull request

Prevent regressions from reaching the main branch

Increase confidence in production deployments

CI / CD Pipeline

GitHub Actions executes automated tests on every push

The pipeline fails if any test does not pass

Vercel handles automatic deployments once all checks succeed

This setup ensures that the deployed application always reflects a verified and tested state.

Installation and Usage
# Install dependencies
npm install

# Start development server
npm run dev

# Run end-to-end tests
npm run test

# Open Playwright test runner
npm run test:ui

Design Decisions and Trade-offs

A feature-based architecture was chosen over file-type-based organization to improve scalability and maintainability

No global state management library was introduced, as the application did not require complex shared state

Responsiveness is handled through CSS and layout strategies rather than JavaScript, reducing unnecessary complexity

The project prioritizes clarity, structure, and long-term maintainability over premature optimization

Conclusion

This project reflects a pragmatic and professional approach to frontend development, focusing on:

Clear architectural boundaries

Maintainable and scalable code

Automated quality assurance

Strong developer experience
