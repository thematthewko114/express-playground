let axios = require('axios');
let express = require('express');
let router = express.Router();
require('dotenv').config()

const apiKey = process.env.RAPIDAPI_KEY;
const host = process.env.RAPIDAPI_HOST;

router.get('/currency-ref', function(req, res, next) {
    const options = {
        method: 'GET',
        url: `${host}/reference-currencies`,
        params: {
            limit: '50',
            offset: '0'
        },
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': host.replace("https://","")
        }
    };
    console.log(options);
    async function getReferenceCurrencies(){
        try {
            const response = await axios.request(options);
            res.send(response.data);
        } 
        catch (error) {
            res.status(500).json({error: "Connection failed"});
        }
    }
    getReferenceCurrencies()
});

module.exports = router;
