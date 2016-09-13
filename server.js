var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var request = require('request'); 
var cheerio = require('cheerio');

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(express.static('public'));

mongoose.connect('mongodb://localhost/craigslist-scraper');
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

app.get('/jobs', function(req, res) {
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

// this will get the JobPostings we scraped from the mongoDB
app.get('/JobPostings', function(req, res){
	// grab every doc in the JobPostings array
	JobPosting.find({}, function(err, doc){
		// log any errors
		if (err){
			console.log(err);
		} else {
			res.json(doc);
		}
	});
});


// grab an JobPosting by it's ObjectId
app.get('/JobPostings/:id', function(req, res){
	// using the id passed in the id parameter, 
	// prepare a query that finds the matching one in our db...

	console.log('getting notes', doc);
	JobPosting.findOne({'_id': req.params.id})
	// and populate all of the notes associated with it.
	.populate('note')
	// now, execute our query
	.exec(function(err, doc){
		// log any errors
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

// listen on port 3000
app.listen(3000, function() {
	console.log('App running on port 3000!');
});
