# ID Card Manager API

This is the backend API for the ID Card Manager application.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/installation) (or you can use npm/yarn)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone git@github.com:sunilbittu/id_card_manager.git
    cd id_card_manager
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of the project and add the following variables.

    ```env
    # Application
    NODE_ENV=development
    PORT=5000
    
    # Database (PostgreSQL example)
    DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>?schema=public"

    # JWT
    JWT_SECRET="your-super-secret-jwt-key"
    JWT_EXPIRES_IN="1d"
    
    # Auth feature flag
    ENABLE_AUTH=true
    ```

### Database

This project uses [Prisma](https://www.prisma.io/) as the ORM.

-   **Run database migrations:**
    After setting up your `DATABASE_URL` in the `.env` file, run the following command to apply the database schema.

    ```bash
    pnpm prisma migrate dev
    ```

### Running the Application

-   **Development mode:**
    To run the app in development mode with hot-reloading:
    ```bash
    pnpm dev
    ```

-   **Production mode:**
    To build and run the app for production:
    ```bash
    pnpm build
    pnpm start
    ```

### Running Tests

To run the automated tests for the system:

```bash
pnpm test
```

The application should now be running on `http://localhost:5000`.

### API Documentation

This project uses Swagger for API documentation. Once the application is running, you can access the Swagger UI by navigating to:

[http://localhost:5000/docs](http://localhost:5000/docs)

## Deployment

You can deploy this application to Render using the button below.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/sunilbittu/id_card_manager) 