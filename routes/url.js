const functions = require('../functions');
const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const jsonParser = bodyparser.json();
const db = require('../mysql-db');
const {body} = require("express-validator");


router.get('/l/:code', (req, res) => {
    let query = req.params.code;
    let blanko = {
        
    };
    db.getURL(query, (err, result) => {

        if (err){
            if(err.errno == 1054){
                res.status(404).send("Not Found");
                return;
            }
            res.send(err).end;
            return;
        }
        if(result.length == 0)
            return res.status(404).send("Not Found!").end();
        
        res.writeHead(301, { "Location": result[0].url });
        return res.end();
    });
});
  
router.get ('/url', (req, res)=> {
    db.getAllUrls( (err, result) => {
        if (err){
            res.send(err).end;
            return;
        }
        res.send(result).end;
    });
});
  
router.post('/url', jsonParser, [
    body('name')
    .trim()
    .blacklist('\\(\\)\\[\\]\\<\\>\\"')
    ,
    body('url')
    .trim()
    .blacklist('\\(\\)\\[\\]\\<\\>\\"'),
    body('random')
    .blacklist('\\(\\)\\[\\]\\<\\>\\"')
    ],
   (req, res) => {
    let url = req.body.url;
    let name;
    if (req.body.random == "true")
       name = functions.getRanHex(6);
    else
        name = req.body.name;
    if (url == undefined || name == undefined){
        res.status(400).send("url or name mustn't be undefined!");
        return;
    }
    db.insertUrl(name, url, (err, result) => {
        if (err){
            if(err.errno == 1062){
                res.send('Name already in use. Please take another name!').end;
                return;
            }
            res.send(err).end;
            return;
        }
        res.send(`https://linkurz.de/l/${name}`).end;

    });
});

module.exports = router;