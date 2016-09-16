# craigslist_scraper
Node app to allows you to add comments for job posting found in craigslist

https://serene-ravine-91404.herokuapp.com/

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

# server.js
	1. var mongoUrl = process.env.MONGODB_URI || 'mongodb://heroku_61f5839k:4dqgf4fjotb7bqmtomufevmg44@ds033116.mlab.com:33116/heroku_61f5839k'
	2. var mongoDB = 'mongodb://' + mongoUrl + '/Craigslist_DB'
	3. mongoose.connect(mongoDB, function(err) {});
	4. var PORT = process.env.PORT || 8080;

# heroku deploy
	1. heroku create
	2. git push heroku master
	3. heroku addons:create mongolab
	4. heroku config
		=== serene-ravine-91404 Config Vars
		MONGODB_URI: mongodb://heroku_61f5839k:4dqgf4fjotb7bqmtomufevmg44@ds033116.mlab.com:33116/heroku_61f5839k
	5. Use MONGODB_URI as shown in server.js

