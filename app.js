const express = require('express')
const app = express()
const port = 3000;
const bodyparser = require('body-parser');
const jsonParser = bodyparser.json();
const cors = require('cors');


app.use(express.static(__dirname + '/public'));
app.use(
  cors({
      origin: "*",
  })
  )

const getRanHex = size => {
  let result = [];
  let hexRef = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

  for (let n = 0; n < size; n++) {
    result.push(hexRef[Math.floor(Math.random() * 16)]);
  }
  return result.join('');
}

var urls = {

};

app.get('/', (req, res) => {
  let query = req.query.q;
  if (urls[query]!= undefined){
    //res.send(querrys[query]);
    res.writeHead(301, { "Location": urls[query] });
    return res.end();
  }
  res.writeHead(200, {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Credentials":true})
  res.sendFile(__dirname + '/public/index.html');
})

app.get('/l/:code', (req, res) => {
  let query = req.params.code;
  if (urls[query]!= undefined){
    //res.send(querrys[query]);
    res.writeHead(301, { "Location": urls[query] });
    return res.end();
  }
    
  res.send("Please enter another parameter!");
})

app.get ('/url', (req, res)=> {
  res.send(urls);
})

app.post('/url', jsonParser, (req, res) => {
  console.log(req.body);
  let url = req.body.url;
  let random;
  let i = true;
  if (req.body.name != "Name"){
    if(urls[req.body.name] == undefined){
      urls[req.body.name] = url;
      res.status(200).send(req.body.name);
    }
    req.status(400).send("Name schon vergeben!");
  }
  while (i == true){
    random = getRanHex(6);
    if (urls[random] == undefined) {
      urls[random] = url;
      i = false;
    }
  }
  res.status(200).send(random);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
