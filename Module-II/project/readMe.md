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
	
# Postman
	
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

# To Do

	add unit test and integration test
		
