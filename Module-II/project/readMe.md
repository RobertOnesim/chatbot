#Project User

# Install node
		
	$ node --version
	or download https://nodejs.org/en/

# Start the project
		
	$ npm install gulp -g
	$ npm install mongodb -g
	
	Open another console: Program Files/MongoDB/Server/3.2/bin 
	Program Files/MongoDB/Server/3.2/bin $ mongod
	
	projectUser $ npm install   #install all the dependencies
	projectUser $ gulp          #start the server
	
# Postman
	
	GET http://localhost:8000/api/chatbot/user
	POST http://localhost:8000/api/chatbot/user
	{ "username": "John", "password": "John" }
	
	POST http://localhost:8000/api/chatbot/user/login
	{ "username": "John", "password": "John" }
	
	PUT http://localhost:8000/api/chatbot/user/:username
	

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
	


# To Do

	add unit test and integration test
		
