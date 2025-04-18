const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.json());

//route for registration
app.post('/register', async (req, res) => {
    const { email, name, mobileNo, githubUsername, rollNo, collegeName } = req.body;

    // Validate required fields
    if (!email || !name || !mobileNo || !githubUsername || !rollNo || !collegeName) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Send the request to the external API
        const response = await axios.post('http://20.244.56.144/evaluation-service/register', {
            email,
            name,
            mobileNo,
            githubUsername,
            rollNo,
            collegeName,
            accessCode: "CNneGT" 
        });

        
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error occurred:', error.message); 
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ error: 'An internal server error occurred' });
        }
    }
});

//route for authorisation token
app.post('/auth', async (req, res) => {
    const { email, name, rollNo, accessCode, clientID, clientSecret } = req.body;

    
    if (!email || !name || !rollNo || !accessCode || !clientID || !clientSecret) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        
        const response = await axios.post('http://20.244.56.144/evaluation-service/auth', {
            email,
            name,
            rollNo,
            accessCode,
            clientID,
            clientSecret
        });

        
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error occurred:', error.message);
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ error: 'An internal server error occurred' });
        }
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log("server is running");
});

//registration
// {"email":"sartik.sharma_cs22@gla.ac.in","name":"sartik sharma","rollNo":"2215001598","accessCode":"CNneGT","clientID":"a47a75f7-a6da-4025-8f7f-3ecffc2beab0","clientSecret":"FwgCvUATBNMZaGne"}

//token
// {"token_type":"Bearer","access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ0OTU3MzgzLCJpYXQiOjE3NDQ5NTcwODMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImE0N2E3NWY3LWE2ZGEtNDAyNS04ZjdmLTNlY2ZmYzJiZWFiMCIsInN1YiI6InNhcnRpay5zaGFybWFfY3MyMkBnbGEuYWMuaW4ifSwiZW1haWwiOiJzYXJ0aWsuc2hhcm1hX2NzMjJAZ2xhLmFjLmluIiwibmFtZSI6InNhcnRpayBzaGFybWEiLCJyb2xsTm8iOiIyMjE1MDAxNTk4IiwiYWNjZXNzQ29kZSI6IkNObmVHVCIsImNsaWVudElEIjoiYTQ3YTc1ZjctYTZkYS00MDI1LThmN2YtM2VjZmZjMmJlYWIwIiwiY2xpZW50U2VjcmV0IjoiRndnQ3ZVQVRCTk1aYUduZSJ9.r_Ih1EMp_t9GNtdGTVp3t94Nvg1zduIED_rSgArf9sc","expires_in":1744957383}