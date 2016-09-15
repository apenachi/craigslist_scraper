# craigslist_scraper
Node app to allows you to add comments for job posting found in craigslist

# Javascript frameworks
	1. Node.js
	2. Express.js
	3. MongoDB
	4. Mongoose.js
	5. Cheerio.js
	6. Bootstrap

# package.json
	
	{
	  "name": "craigslist-scraper",
	  "version": "1.0.0",
	  "description": "",
	  "main": "public/index.html",
	  "scripts": {
		"test": "echo \"Error: no test specified\" && exit 1",
		"start": "node server.js"
	  },
	  "author": "apenachi@yahoo.com",
	  "license": "ISC",
	  "dependencies": {
		"body-parser": "^1.15.0",
		"cheerio": "^0.20.0",
		"express": "^4.13.4",
		"mongoose": "^4.4.6",
		"morgan": "^1.7.0",
		"request": "^2.69.0"
	  },
	  "engines":{
		"node": "6.2.2",
		"npm": "3.10.5"
	  }
	}

# Heroku Deployment
	1. var mongoUrl = process.env.MONGODB_URI || 'mongodb://heroku_b8mzml2k:7evkgr8g85kjrh28nefeetm8g4@ds029426.mlab.com:29426/heroku_b8mzml2k'
	2. var mongoDB = 'mongodb://' + mongoUrl + '/Craigslist_DB'
	3. mongoose.connect(mongoDB, function(err) {});
	4. var PORT = process.env.PORT || 8080;




	