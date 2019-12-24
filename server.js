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
const lune = require('lune');

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

  data.all("CREATE TABLE IF NOT EXISTS Events (id INTEGER PRIMARY KEY AUTOINCREMENT, eventDate STRING NOT NULL, eventName STRING NOT NULL, eventDescription STRING NOT NULL, eventDuration INTEGER NOT NULL)", function(err) {
    if (err) {
        console.error(err);
    } else {
      console.log("Successfuly created Events table!")
    }
  });

  app.get('/events', (req, res) => {
    data.all("SELECT * FROM Events", function(err, rows) {
      if (err) {
        console.error(err)
        res.end();
      } else {
        res.write(JSON.stringify(rows));
        res.end();
      }
    });
  });

  app.get('/holidays', (req, res) => {
    function zeroAdd(n) {
      return (n < 10 ? '0' : '') + n;
    }
    // Easter
    var phaseList = lune.phase_range(
      new Date(`${req.query.year}-03-21T00:00:00`), //march 21 is the vernal equilnox
      new Date(`${req.query.year}-04-19T23:59:59`),
      lune.PHASE_FULL
    )
    var easter = new Date(phaseList[0])
    if(easter.getDay() != 7) {
      easter.setDate(easter.getDate() + 7 - easter.getDay());
    } else {
      easter.setDate(easter.getDate() + 7);
    }
    easter.setHours(0)
    easter.setMinutes(0)

    // Thanksgiving
    var date = new Date(req.query.year, 10, 1), thursdays = [];

    date.setDate(date.getDate() + (11 - date.getDay()) % 7)
    while (date.getMonth() === 10) {
      thursdays.push(new Date(date.getTime()).getDate());
      date.setDate(date.getDate() + 7);
    }
    var thanksgivingDay = thursdays[3]

    // Columbus Day
    var date = new Date(req.query.year, 9, 1), mondays = [];

    date.setDate(date.getDate() + (8 - date.getDay()) % 7)
    while (date.getMonth() === 9) {
      mondays.push(new Date(date.getTime()).getDate());
      date.setDate(date.getDate() + 7);
    }
    var columbusDay = mondays[1]

    // Labor Day
    var date = new Date(req.query.year, 8, 1), mondays = [];
    date.setDate(date.getDate() + (8 - date.getDay()) % 7)
    var laborDay = new Date(date.getTime()).getDate()

    // Father's day
    var date = new Date(req.query.year, 5, 1), sundays = [];

    date.setDate(date.getDate() + (7 - date.getDay()) % 7)
    while (date.getMonth() === 5) {
      sundays.push(new Date(date.getTime()).getDate());
      date.setDate(date.getDate() + 7);
    }
    var fathersDay = sundays[2]

    // Mother's day
    var date = new Date(req.query.year, 4, 1), sundays = [];

    date.setDate(date.getDate() + (7 - date.getDay()) % 7)
    while (date.getMonth() === 4) {
      sundays.push(new Date(date.getTime()).getDate());
      date.setDate(date.getDate() + 7);
    }
    var mothersDay = sundays[1]

    // Memorial day
    var date = new Date(req.query.year, 4, 1), mondays = [];

    date.setDate(date.getDate() + (8 - date.getDay()) % 7)
    while (date.getMonth() === 4) {
      mondays.push(new Date(date.getTime()).getDate());
      date.setDate(date.getDate() + 7);
    }
    var memorialDay = mondays[mondays.length-1]

    // President's Day
    var date = new Date(req.query.year, 1, 1), mondays = [];

    date.setDate(date.getDate() + (8 - date.getDay()) % 7)
    while (date.getMonth() === 1) {
      mondays.push(new Date(date.getTime()).getDate());
      date.setDate(date.getDate() + 7);
    }
    var presidentsDay = mondays[2]

    // Martin Luther King Jr Day
    var date = new Date(req.query.year, 0, 1), mondays = [];

    date.setDate(date.getDate() + (8 - date.getDay()) % 7)
    while (date.getMonth() === 0) {
      mondays.push(new Date(date.getTime()).getDate());
      date.setDate(date.getDate() + 7);
    }
    var mlkDay = mondays[2]

    res.write(JSON.stringify([
      {
        holidayDate: `${req.query.year}-12-25T00:00`,
        holidayName: 'Christmas',
        holidayDescription: 'Christmas (which means "Feast day of Christ") is a Christian holiday that refers to the birth of Jesus (whom Christians believe is the Son of God), and a cultural holiday for non-Christians. The day known as Christmas Day is celebrated on the 25th day of December.',
        holidayDuration: 1440
      },
      {
        holidayDate: `${req.query.year}-12-24T00:00`,
        holidayName: 'Christmas Eve',
        holidayDescription: 'The day before Christmas.',
        holidayDuration: 1440
      },
      {
        holidayDate: `${req.query.year}-07-04T00:00`,
        holidayName: 'USA Independance Day',
        holidayDescription: 'The day when the USA declared independance from the British.',
        holidayDuration: 1440
      },
      {
        holidayDate: `${req.query.year}-11-${thanksgivingDay}T00:00`,
        holidayName: 'Thanksgiving',
        holidayDescription: 'An annual national holiday in the United States and Canada celebrating the harvest and other blessings of the past year',
        holidayDuration: 1440
      },
      {
        holidayDate: `${req.query.year}-11-${thanksgivingDay + 1}T00:00`,
        holidayName: 'Black Friday',
        holidayDescription: 'A shopping holiday that follows Thanksgiving.',
        holidayDuration: 1440
      },
      {
        holidayDate: `${req.query.year}-11-11T11:00`,
        holidayName: 'Veteran\'s Day',
        holidayDescription: 'A day to honour veterans. This day is the anniversary of the signing of the armistice to end the first world war.',
        holidayDuration: 1440
      },
      {
        holidayDate: `${req.query.year}-10-31T00:00`,
        holidayName: 'Halloween',
        holidayDescription: 'A celebration that marks the day before the Western Christian feast of All Saints and initiates the season of Allhallowtide, which lasts three days and concludes with All Souls\' Day. It is commonly celebrated in the west.',
        holidayDuration: 1440
      },
      {
        holidayDate: `${req.query.year}-10-${zeroAdd(columbusDay)}T00:00`,
        holidayName: 'Columbus Day (regional in USA)',
        holidayDescription: 'This holiday is only celebrated in certain states of the USA. It celebrates the landing of Christopher Columbus in the Americas.',
        holidayDuration: 1440
      },
      {
        holidayDate: `${req.query.year}-02-${zeroAdd(presidentsDay)}T00:00`,
        holidayName: 'President\'s Day (regional in USA)',
        holidayDescription: 'This holiday is only celebrated in certain states of the USA. It celebrates the birthday of George Washington',
        holidayDuration: 1440
      },
      {
        holidayDate: `${req.query.year}-09-${zeroAdd(laborDay)}T00:00`,
        holidayName: 'Labor Day',
        holidayDescription: 'Labor day celebrates the achievments of American workers.',
        holidayDuration: 1440
      },
      {
        holidayDate: `${req.query.year}-06-${zeroAdd(fathersDay)}T00:00`,
        holidayName: 'Father\'s Day',
        holidayDescription: 'A day that celebrates our fathers.',
        holidayDuration: 1440
      },
      {
        holidayDate: `${req.query.year}-05-${zeroAdd(mothersDay)}T00:00`,
        holidayName: 'Mother\'s Day',
        holidayDescription: 'A day that celebrates our mothers.',
        holidayDuration: 1440
      },
      {
        holidayDate: `${req.query.year}-02-14T00:00`,
        holidayName: 'Valentine\'s Day',
        holidayDescription: 'Valentine\'s day is a festival of romantic love and it is tradition to give cards, letters, flowers or presents to their spouse or partner.',
        holidayDuration: 1440
      },
      {
        holidayDate: `${req.query.year}-05-${memorialDay}T00:00`,
        holidayName: 'Memorial Day',
        holidayDescription: 'A holiday that celebrates the military personnel who died while serving in the United States Armed Forces',
        holidayDuration: 1440
      },
      {
        holidayDate: `${req.query.year}-05-05T00:00`,
        holidayName: 'Cinco De Mayo',
        holidayDescription: 'A holiday celebrated by Mexicans in the USA. It honours the Mexican Army\'s victory over the French Empire at the Battle of Puebla.',
        holidayDuration: 1440
      },
      {
        holidayDate: `${req.query.year}-01-${zeroAdd(mlkDay)}T00:00`,
        holidayName: 'MLK Jr. Day',
        holidayDescription: 'Martin Luther King Jr. Day is an American federal holiday marking the birthday of Martin Luther King Jr.',
        holidayDuration: 1440
      },
      {
        holidayDate: `${req.query.year}-${zeroAdd(easter.getMonth()+1)}-${zeroAdd(easter.getDate())}T00:00`,
        holidayName: 'Easter',
        holidayDescription: 'coming soon',
        holidayDuration: 1440
      },
      {
        holidayDate: `${req.query.year}-1-1T00:00`,
        holidayName: 'New Year\'s Day',
        holidayDescription: 'The start of a new year!',
        holidayDuration: 1440
      },
      {
        holidayDate: `${req.query.year}-25-31T00:00`,
        holidayName: 'New Year\'s Eve',
        holidayDescription: 'The day before the new year.',
        holidayDuration: 1440
      }
    ]));
    res.end();
  });

  app.post('/saveEvent', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req)
    .on('field', (name, value) => {
      data.all("INSERT INTO Events (eventDate, eventName, eventDescription, eventDuration) VALUES (?, ?, ?, ?)", name, value.name, value.description, value.duration)
      res.end();
    })
  });

  app.post('/editEvent', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req)
    .on('field', (name, value) => {
      data.all("UPDATE Events SET eventDate = ?, eventName = ?, eventDescription = ?, eventDuration = ? WHERE id = ?", name, value.name, value.description, value.duration, value.id)
      res.end();
    });
  });

  app.post('/deleteEvent', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req)
    .on('field', (value) => {
      data.all("DELETE FROM Events WHERE id = ?", value)
      res.end();
    });
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
