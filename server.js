const next = require('next');
const express = require('express');
const sslRedirect = require('heroku-ssl-redirect').default; 

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(sslRedirect());

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, err => {
    if (err) throw err;

    console.log(`Server starts on ${PORT}.`);
  });
});