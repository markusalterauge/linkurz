const express = require('express')
const app = express()
const port = 3000;
const bodyparser = require('body-parser');
const jsonParser = bodyparser.json();
const cors = require('cors');


app.use(express.static(__dirname + '/public'));
app.use(
  cors({
      origin: "https://linkurz/url",
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
  let url = req.body.url;
  console.log(url);
  let random;
  let i = true;
  while (i == true){
    random = getRanHex(6);
    if (urls[random] == undefined) {
      urls[random] = url;
      i = false;
    }
  }
  res.send(random);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
