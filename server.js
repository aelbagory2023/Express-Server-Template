// path/to/server.js
const express = require('express'); // Import the express module
const cors = require('cors');       // Import the cors module for Cross-Origin Resource Sharing
const dotenv = require('dotenv');   // Import dotenv to load environment variables
const swaggerUi = require('swagger-ui-express'); // Import Swagger UI
const swaggerJsDoc = require('swagger-jsdoc');   // Import Swagger JSDoc

dotenv.config(); // Load environment variables from .env file

const app = express(); // Create an instance of an Express application

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON requests

// Swagger definition
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0', // Specify the OpenAPI version
        info: {
            title: 'My Express API', // Title of the API
            version: '1.0.0', // Version of the API
            description: 'API documentation for my Express server', // Description of the API
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}`, // Server URL
            },
        ],
    },
    apis: ['./server.js'], // Path to the API docs (using JSDoc comments in server.js)
};

const swaggerDocs = swaggerJsDoc(swaggerOptions); // Generate Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Serve Swagger UI

// Define a simple route
/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns a greeting message
 *     responses:
 *       200:
 *         description: A successful response
 */
app.get('/', (req, res) => {
    res.send('Hello World!'); // Respond with a simple message
});

// Start the server
const PORT = process.env.PORT || 3005; // Use the PORT from environment variables or default to 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Log the server start message
    console.log(`API documentation available at http://localhost:${PORT}/api-docs`); // Log the Swagger UI link
});

//Remember to run npm install to install the dependencies
//Remember to run npm run dev to start the server
//Remember to run npm install express cors dotenv
//Remember to run npm install nodemon to automatically restart the server on file changes
//Remember to run npm install swagger-ui-express swagger-jsdoc
