var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var request = require('request'); 
var cheerio = require('cheerio');
var PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

// mongoose.connect('mongodb://localhost/craigslist-scraper');
var mongoUrl = process.env.MONGODB_URI || 'mongodb://heroku_61f5839k:4dqgf4fjotb7bqmtomufevmg44@ds033116.mlab.com:33116/heroku_61f5839k'
console.log(mongoUrl);

// var mongoDB = 'mongodb://localhost/Craigslist_DB'
var mongoDB = 'mongodb://' + mongoUrl + '/Craigslist_DB'

mongoose.connect(mongoDB, function(err) {
	if (err) {
		console.log ('ERROR connecting to: ' + mongoDB + ' . ' + err);
	} else {
		console.log ('Succeeded connected to: ' + mongoDB);
	}
});

var db = mongoose.connection;

 db.on('error', function(err) {
	console.log('Mongoose Error: ', err);
 });
 db.once('open', function() {
	console.log('Mongoose connection successful.');
 });

var Note = require('./models/Note.js');
var JobPosting = require('./models/JobPosting.js');

app.get('/', function(req, res) {
	res.send(index.html);
});

// app.get('/news', function(req, res) {
// 	request('http://www.nj.com/news', function (error, response, html) {
// 		var $ = cheerio.load(html);
// 		$('.item-photo').each(function(i, element){
// 			// console.log(element);
// 			var img = $(element).children().first(); //.attr('href')
// 			console.log(img);
// 		});
// 	});
// 	res.send("Scrape Complete");
// });

app.get('/scrape', function(req, res) {
	request('https://newjersey.craigslist.org/search/jjj?query=web+developer', function (error, response, html) {
		var $ = cheerio.load(html);
		$('a.hdrlnk').each(function(i, element){
			var job = {}
			job.title = $(element).text();
			job.link = $(element).attr('href');
			var entry = new JobPosting(job);
			console.log(entry)
			entry.save(function(err, doc) {
				if (err) {
					console.log(err);
				} else {
					console.log(doc);
				}
			});
		});
	});
	res.redirect('/');
});

app.get('/JobPostings', function(req, res){
	JobPosting.find({}, function(err, doc){
		if (err){
			console.log(err);
		} else {
			res.json(doc);
		}
	});
});

app.get('/JobPostings/:id', function(req, res){

	JobPosting.findOne({'_id': req.params.id})
	.populate('note')
	.exec(function(err, doc){
		console.log('getting notes', doc);
		if (err){
			console.log(err);
		} else {
			res.json(doc);
		}
	});
});

app.post('/JobPostings/:id', function(req, res){

	var newNote = new Note(req.body);
	console.log(newNote);
	newNote.save(function(err, doc){
		if(err){
			console.log(err);
		} else {
			JobPosting.findOneAndUpdate({'_id': req.params.id}, {'note':doc._id})
			.exec(function(err, doc){
				if (err){
					console.log(err);
				} else {
					res.send(doc);
				}
			});
		}
	});
});

app.listen(PORT, function() {
	console.log('App running on port 8080!');
});
