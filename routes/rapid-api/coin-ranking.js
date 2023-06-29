let axios = require('axios');
let express = require('express');
let router = express.Router();
require('dotenv').config()

const apiKey = process.env.RAPIDAPI_KEY;
const host = process.env.RAPIDAPI_HOST;
const currency_ref = process.env.RAPIDAPI_CURRENCY_REF;

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

router.get('/coins', function(req, res, next) {
    const options = {
        method: 'GET',
        url: `${host}/coins`,
        params: {
            referenceCurrencyUuid: currency_ref,
            timePeriod: '24h',
            'tiers[0]': '1',
            orderBy: 'marketCap',
            orderDirection: 'desc',
            limit: '50',
            offset: '0'
        },
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': host.replace("https://","")
        }
    };
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

router.get('/coin-price-history', function(req, res, next) {
    const coin_id = req.headers['coin_id'];
    const options = {
        method: 'GET',
        url: `${host}/coin/${coin_id}/history`,
        params: {
            referenceCurrencyUuid: currency_ref,
            timePeriod: '3m'
          },
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': host.replace("https://","")
        }
    };
    async function getCoinHistory(){
        try {
            const response = await axios.request(options);
            res.send(response.data);
        } 
        catch (error) {
            res.status(500).json({error: "Connection failed"});
        }
    }
    getCoinHistory()
});

module.exports = router;
