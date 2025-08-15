# Spring Boot Backend

This is a Spring Boot 3.x application built with Java 17 and Maven.

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher

## Running the Application

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Run the application using Maven:
   ```bash
   mvn spring-boot:run
   ```

   Or build and run:
   ```bash
   mvn clean package
   java -jar target/demo-0.0.1-SNAPSHOT.jar
   ```

3. The application will start on `http://localhost:8080`

## API Endpoints

- `GET /api/hello` - Returns a hello message
- `GET /api/health` - Returns health status

## CORS Configuration

The application is configured to allow requests from `http://localhost:4200` (Angular frontend) with full access to all endpoints.
