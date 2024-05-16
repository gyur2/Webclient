require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

app.post('/api/generate', async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await openai.completions.create({
            model: "text-davinci-003",
            prompt,
            max_tokens: 50,
        });
        res.json(response);
    } catch (error) {
        console.error('Error generating completion:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
