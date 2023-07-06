const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const router = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('public', {
  setHeaders: (res, path) => {
    const mimeTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'text/javascript'
    };
    const mimeType = mimeTypes[path.extname(path).toLowerCase()];
    if (mimeType) {
      res.setHeader('Content-Type', mimeType);
    }
  }
}));

// mount the router
app.use(express.static('public', {
  setHeaders: (res, path) => {
    const mimeTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'text/javascript'
    };
    const mimeType = mimeTypes[path.extname(path).toLowerCase()];
    if (mimeType) {
      res.setHeader('Content-Type', mimeType);
    }
  }
}));

app.use(router);

// start the server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
var uuid = require('uuid');
const uuidv1 = require('uuid/v1');

console.log(uuid.v1());