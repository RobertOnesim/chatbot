#Project User

# Install node
		
	download https://nodejs.org/en/
	$ node --version

# Start the project
		
	$ npm install gulp -g
	$ npm install mongodb -g
	
	Open another console: Program Files/MongoDB/Server/3.2/bin 
	Program Files/MongoDB/Server/3.2/bin $ mongod                  #start the mongo server
	
	Modul-II/project $ npm install   #install all the dependencies
	Modul-II/project $ gulp          #start the server
	
# Postman      - 46.32.235.176:8000/api/chatbot/
	
	<b>GET</b> http://localhost:8000/api/chatbot/user
	
	<b>POST</b> http://localhost:8000/api/chatbot/user
	{ "username": "John", "password": "John" }
	
	<b>POST</b> http://localhost:8000/api/chatbot/user/login
	{ "username": "John", "password": "John" }
	
	<b>PUT</b> http://localhost:8000/api/chatbot/user/:username
	{ "predicates": {"age": 20, "school": "Computer science", "diseases": ["flu"]}}
	
	<b>POST</b> http://localhost:8000/api/chatbot/wolfram
	{ "content": "34+5" }
	
	<b>POST</b> http://localhost:8000/api/chatbot/imdb
	{ "content": "Teen wolf" }
	
	<b>GET</b> http://localhost:8000/api/chatbot/news/sources
	
	<b>GET</b> http://localhost:8000/api/chatbot/news?source=talksport   {talksport = id from /news/sources}
	
	
	
	
<b> POST /api/charbot/user/login </b>
request body

	{
		"username": "John",
		"password": "John"
	}	
response 

	{
		"data": {
			"username": "John",
			"password": "John",
			"predicates": {
				"age": 18,
				"school": "Computer science",
				"diseases": ["cancer", "diabetes"],
				"car": "BMW"
			}
		}
		"error": null
	}

bad response

	{
		"data": null
		"error": {
			"statusCode": 404,
			"errorMessage": "user not found in db"
		}
	}
	

<b> POST /api/charbot/user/ </b>

request body

	{
		"username": "John",
		"password": "John"
	}

response 

	{
		"data": "succes",
		"error": null
	}
	
bad response

	{
		"data": null,
		"error": {
			"statusCode": 500,
			"errorMessage": "Internal server error"
		}
	}

<b> PUT /api/charbot/user/:username </b>

request body

	{
		"predicates": {
			"age": 20,
			"school": "Computer science",
			"diseases": ["flu"]
		}
	}

response 

	{
		"data": {
			"username": "John",
			"password": "John",
			"predicates": {
				"age": 20,
				"school": "Computer science",
				"diseases": ["cancer", "diabetes",  "flu"],
				"car": "BMW"
			}
		}
		"error": null
	}
	
bad response

	{
		"data": null,
		"error": {
			"statusCode": 404,
			"errorMessage": "User not found"
		}
	}
	
<b>POST</b> http://localhost:8000/api/chatbot/wolfram
request

	{
		"content": "34+5" 
	}
response

	{
  		"data": {
    			"result": "5"
  		},
		"error": null
	}
		
<b>POST</b> http://localhost:8000/api/chatbot/imdb
request	
	
	{ 
		"content":  "Men in Black"
	}
response

	{
	  "data": {
	    "title": "Men in Black",
	    "_year_data": "1997",
	    "year": 1997,
	    "rated": "PG-13",
	    "released": "1997-07-01T21:00:00.000Z",
	    "runtime": "98 min",
	    "genres": "Adventure, Comedy, Family",
	    "director": "Barry Sonnenfeld",
	    "writer": "Lowell Cunningham (comic), Ed Solomon (screen story), Ed Solomon (screenplay)",
	    "actors": "Tommy Lee Jones, Will Smith, Linda Fiorentino, Vincent D'Onofrio",
	    "plot": "A police officer joins a secret organization that polices and monitors extraterrestrial interactions on Earth.",
	    "languages": "English, Spanish",
	    "country": "USA",
	    "awards": "Won 1 Oscar. Another 18 wins & 39 nominations.",
	    "poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BNzA2MzI5Nzc0N15BMl5BanBnXkFtZTcwODE2NDU2MQ@@._V1_SX300.jpg",
	    "metascore": "71",
	    "rating": "7.3",
	    "votes": "413,662",
	    "imdbid": "tt0119654",
	    "type": "movie",
	    "response": "True",
	    "series": false,
	    "imdburl": "https://www.imdb.com/title/tt0119654"
	  },
	  "error": null
	}


<b>GET</b> http://localhost:8000/api/chatbot/news/sources

	[
	  {
	    "id": "abc-news-au",
	    "description": "Australia's most trusted source of local, national and world news. Comprehensive, independent, in-depth analysis, the latest business, sport, weather and more.",
	    "category": "general"
	  },
	  {
	    "id": "ars-technica",
	    "description": "The PC enthusiast's resource. Power users and the tools they love, without computing religion.",
	    "category": "technology"
	  },
	  {
	    "id": "associated-press",
	    "description": "The AP delivers in-depth coverage on the international, politics, lifestyle, business, and entertainment news.",
	    "category": "general"
	  },
	  {
	    "id": "bbc-news",
	    "description": "Use BBC News for up-to-the-minute news, breaking news, video, audio and feature stories. BBC News provides trusted World and UK news as well as local and regional perspectives. Also entertainment, business, science, technology and health news.",
	    "category": "general"
	  },
	  {
	    "id": "bbc-sport",
	    "description": "The home of BBC Sport online. Includes live sports coverage, breaking news, results, video, audio and analysis on Football, F1, Cricket, Rugby Union, Rugby League, Golf, Tennis and all the main world sports, plus major events such as the Olympic Games.",
	    "category": "sport"
	  },
	  {
	    "id": "bild",
	    "description": "Die Seite 1 für aktuelle Nachrichten und Themen, Bilder und Videos aus den Bereichen News, Wirtschaft, Politik, Show, Sport, und Promis.",
	    "category": "general"
	  },
	  {
	    "id": "bloomberg",
	    "description": "Bloomberg delivers business and markets news, data, analysis, and video to the world, featuring stories from Businessweek and Bloomberg News.",
	    "category": "business"
	  },
	  {
	    "id": "business-insider",
	    "description": "Business Insider is a fast-growing business site with deep financial, media, tech, and other industry verticals. Launched in 2007, the site is now the largest business news site on the web.",
	    "category": "business"
	  },
	  {
	    "id": "business-insider-uk",
	    "description": "Business Insider is a fast-growing business site with deep financial, media, tech, and other industry verticals. Launched in 2007, the site is now the largest business news site on the web.",
	    "category": "business"
	  },
	  {
	    "id": "buzzfeed",
	    "description": "BuzzFeed is a cross-platform, global network for news and entertainment that generates seven billion views each month.",
	    "category": "entertainment"
	  },
 
	  {
	    "id": "football-italia",
	    "description": "Italian football news, analysis, fixtures and results for the latest from Serie A, Serie B and the Azzurri.",
	    "category": "sport"
	  },
	  {
	    "id": "fortune",
	    "description": "Fortune 500 Daily and Breaking Business News",
	    "category": "business"
	  },
	  {
	    "id": "four-four-two",
	    "description": "The latest football news, in-depth features, tactical and statistical analysis from FourFourTwo, the UK's favourite football monthly.",
	    "category": "sport"
	  },
	  {
	    "id": "fox-sports",
	    "description": "Find live scores, player and team news, videos, rumors, stats, standings, schedules and fantasy games on FOX Sports.",
	    "category": "sport"
	  },
	  {
	    "id": "google-news",
	    "description": "Comprehensive, up-to-date news coverage, aggregated from sources all over the world by Google News.",
	    "category": "general"
	  }
	]


<b>GET</b> http://localhost:8000/api/chatbot/news?source=talksport    {talksport = id from /news/sources}

	{
	  "data": {
	    "status": "ok",
	    "source": "talksport",
	    "sortBy": "top",
	    "articles": [
	      {
		"author": "talkSPORT",
		"title": "Chelsea striker Diego Costa dropped after bust-up with Antonio Conte and fitness coach",
		"description": "Chelsea striker Diego Costa will not feature in tomorrow's Premier League game at Leicester, it is understood. Costa has been prolific this season for a Chelsea side five points clear at the top of the table entering this weekend's fixtures.  The Blues declined to comment on reports that the 28-year-old had had a disagreement with head coach Antonio Conte and his coaching staff.  Conte on Friday afternoon said he had some undisclosed doubts for the game, but mentioned no names or reasons for potential absences.",
		"url": "http://talksport.com/football/chelsea-striker-diego-costa-dropped-after-bust-antonio-conte-and-fitness-coach-170113223618",
		"urlToImage": "http://talksport.com/sites/default/files/field/image/201701/gettyimages-619283112.jpg",
		"publishedAt": "2017-01-13T19:21:00Z"
	      }
    	    ]
	  },
	  "error": null
	}

# To Do

	add unit test and integration test
		
