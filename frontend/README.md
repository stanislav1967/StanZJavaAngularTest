# Angular 17 Frontend

This is an Angular 17 application that communicates with the Spring Boot backend.

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

## Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. Start the development server:
   ```bash
   npm start
   ```

   Or use the Angular CLI directly:
   ```bash
   ng serve
   ```

2. The application will be available at `http://localhost:4200`

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/angular-frontend` directory.

## Testing

```bash
npm test
```

## Features

- Modern Angular 17 standalone components
- HTTP client integration with Spring Boot backend
- Beautiful UI with gradient backgrounds and glassmorphism effects
- API testing interface for backend endpoints
- Responsive design

## Backend Integration

The frontend is configured to communicate with the Spring Boot backend running on `http://localhost:8080`. CORS is properly configured on the backend to allow requests from the Angular application.
