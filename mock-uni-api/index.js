require('dotenv').config()
const express = require('express');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();

const students = require('./student.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Open API config
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "University student record mock API",
            version: "1.00",
            description:
                "",
        },
        servers: [
            {
                url: `${process.env.SERVER_URL}`,
            },
        ],
    },
    apis: ["./*.js"],
};
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

/**
 * Redirect to api doc
 */
app.use('/', (req, res) => res.redirect('/api-docs'));

app.post('/student/email/validate', (req, res) => {

})


app.get('/student', (req, res) => {
    res.status(200).json(students)
})

/**
 * Handle not found 
 */
app.use('*', (req, res) => {
    res.sendStatus(404)
})

app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.SERVER_URL}`));
