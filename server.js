require('dotenv');


var express = require('express');
var bodyParser = require('body-parser');
var middleWare = require('./_middleware/hash');
var cors = require('cors')
var mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

var journalSchema = new mongoose.Schema({
  title: String,
  content: String,
});

var Journal = mongoose.model('Journal', journalSchema);



var app = new express();

app.use(cors())
app.use(bodyParser.json());

app.get('', function(req, res) {
  res.send('ok');
});

app.get('/chicken', function (req, res) {
  Journal.find(function (err, data) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.status(200).send({ data: data });
    }
  })

  // res.send(journal);
})

app.post('/beef', function (req, res) {
  var data = req.body;

  var new_journal = new Journal(data);

  console.log('hi')
  new_journal.save(function (err, data) {
    if (err) {
      console.log(err)
    }
    else {
      console.log(data)
    }
  })

  console.log(new_journal)

})

app.post('/getBlog', function (req, res) {
  var id = req.body.id;

  Journal.findById(id, function (err, data) {
    res.send({data: data})
  });
})


var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('listening on port', port);
})
