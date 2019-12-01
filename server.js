const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

const sqlite3 = require('sqlite3').verbose();
const formidable = require('formidable');

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  var data = new sqlite3.Database('data.sqlite');

  data.all("CREATE TABLE IF NOT EXISTS Events (id INTEGER PRIMARY KEY AUTOINCREMENT, eventDate STRING NOT NULL, eventName STRING NOT NULL, eventDescription STRING NOT NULL, eventHour INTEGER NOT NULL, eventMin INTEGER NOT NULL)", function(err) {
    if (err) {
        console.error(err);
    } else {
      console.log("Successfuly created Events table!")
    }
  });

  app.get('/events', (req, res) => {
    res.write(JSON.stringify([
      {
        eventName: "Different UTC Date",
        eventDescription: "Some description",
        eventDate: "2019-12-01T03:40:20.103Z",
        eventDuration: 60
      },
      {
        eventName: "First Event of the Day (Midnight)",
        eventDescription: "Some description",
        eventDate: "2019-12-01T08:00:00.000Z",
        eventDuration: 60
      },
      {
        eventName: "Second Event of the Day ()",
        eventDescription: "Some description",
        eventDate: "2019-12-01T09:30:00.000Z",
        eventDuration: 60
      },
      {
        eventName: "Second Event of the Day ()",
        eventDescription: "Some description",
        eventDate: "2019-12-041T18:30:00.000Z",
        eventDuration: 60
      }
    ]));
    res.end();
  });

  app.post('/saveEvent', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req)
    .on('field', (name, value) => {
      console.log(value);
      console.log(name);

      data.all("INSERT INTO Events (eventDate, eventName, eventDescription, eventHour, eventMin) VALUES (?, ?, ?, ?, ?)", name, value.name, value.description, value.hour, value.minutes)
    })
  });

  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('Listening on port %s. Open localhost:%s in a browser', port, port);
});
