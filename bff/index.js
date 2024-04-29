const express = require('express')
const fs = require('fs')
const path = require('path');
const http = require('http');
const https = require('https');

require('dotenv').config();

const app = express();

app.use(express.static('build'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

const { HOME, PORT = 80, HTTPS_PORT = 443 } = process.env;

http.createServer({}, app)
  .listen(PORT, function () {
    console.log(`HTTP server listening at http://localhost:${PORT}/`)
  })

const certFiles = {
  key: path.resolve(`./certs/leaf.key`),
  cert: path.resolve(`./certs/leaf.pem`),
  intermediate: path.resolve(`./certs/intermediate.pem`),
  root: path.resolve(`./certs/root.pem`),
};


if (fs.existsSync(certFiles.key)
  && fs.existsSync(certFiles.cert)
  && fs.existsSync(certFiles.intermediate)
  && fs.existsSync(certFiles.root)) {
  const key = fs.readFileSync(certFiles.key);
  const cert = fs.readFileSync(certFiles.cert);
  const ca = [fs.readFileSync(certFiles.intermediate), fs.readFileSync(certFiles.root)];

  https.createServer({ key, cert, ca }, app)
    .listen(HTTPS_PORT, function () {
      console.log(`HTTPS server listening at https://localhost:${HTTPS_PORT}/`)
    })
}