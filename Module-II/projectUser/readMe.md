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
	

# To Do

	add unit test and integration test
		
