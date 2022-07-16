const express = require('express')
const app = express()
const port = process.env.port || 3000;
const bodyparser = require('body-parser');
const jsonParser = bodyparser.json();
const cors = require('cors');

app.use(express.static(__dirname + '/public'));
app.use(
  cors({
      origin: "*",
  }));

const urlRoutes = require('./routes/url');
app.use(urlRoutes);

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
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

module.exports = urls;