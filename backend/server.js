const apiKey = "voc-912598181104020273548265f0c59c074831.67956388"

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { LangChain, OpenAI } = require('langchain');

const app = express();
const port = 3001;

// Middlewares for CORS and JSON parsing
app.use(express.json());
app.use(cors());

// Langchain setup
const openAI = new OpenAI({
    model: "gpt-3.5-turbo-instruct",
    apiKey: apiKey, // Securely pulling in the API key from the environment
    configuration: {
        baseURL: "https://openai.vocareum.com/v1",
    },
});
const langchain = new LangChain(openAI);

// Proxy endpoint for generating text
app.post('/generate', async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await langchain.generate({
            prompt,
            temperature: 0.9, // Modify other parameters as needed
        });
        res.json(response); // Send response back to client
    } catch (error) {
        console.error('Langchain error:', error);
        res.status(500).send(error.message);
    }
});

