# Chatbot Knowledge Base

<b>Chatbot Knowledge Base</b>

__Team members__: Baincescu Catalina, Birsan Alexandra, Gusa Diana, Iacob Madalina, Astefanesei Iulian

#Aiml files 
	Go to /aiml directory and find all the categories
	
#Collection user	

	{
		"title": " User information",
		"type": "object",
		"properties": {
			"username": {
				"type": "string"
			},
			"password": {
				"type": "string"
			},
			"predicates": {
				"description":"List of learned tags from user",
				"type": "object",
				"properties": {
					"age": {
						"type": "number"
					},
					"school": {
						"type": "string"
					},
					"diseases": {
						"type": "array",
						"description": "list of diseases",
						"items": {
							"type": "string"
						}
					}
				}
			}
		}
	}

Example:

	{
		"username": "John",
		"password": "John",
		"predicates": {
			"age": 18,
			"school": "Computer science",
			"diseases": ["cancer", "diabetes"],
			"car": "BMW"
		}
	}


##Week 1

	1. Define a schema (question and answer): use aiml resource files        	
	2. Introduce data to medical.aiml     					 
	3. Update the other aiml files        					 
	4. Define a schema and endpoints for users				  
	5. Project user, routes: getAllUsers, postUser, updateUser, loginUser   
	
	Catalina: 1, 3, 4, 5
	Alexandra: 1, 2, 3, 4
	Diana: 1, 2, 3, 4
	Madalina: 1, 2, 3, 4
	Iulian: 1, 2, 3, 5
	
##Week 2

	1. Search about: ontology, YAGO, SUMO
	2. API: Wolfram, Imdb, Music
	3. Integrate the question and answers from Corpus_IA.docx
	4. New route: addQuestionAnswer in a file.aiml
	5. Update files .aiml
	6. Define the topic for chatBot
	
	Catalina: 1, 2, 3, 4
	Alexandra: 1, 2, 3, 5
	Diana: 1, 2, 3, 5
	Madalina: 1, 2, 3, 5
	Iulian: 1, 3, 5
	
##Week 3

	1. Integrate the new files .aiml found
	2. Update all files .aiml
	3. Ontology
	4. Dbpedia 
	
	Catalina: 1, 2, 3
	Alexandra: 1, 2, 3
	Diana: 1, 2, 3, 
	Madalina: 1, 2, 3
	Iulian: 1, 2, 3
	
##Week 4
	
	1. Seach for news.
	2. Define topic.
	3. Python error on aiml files.
	4. New route for dbpedia.
	5. Ontology: rdf.
	
	Catalina: 1, 2, 4
	Alexandra: 1, 2, 4
	
##Week 5

	1. Who works on the integration part
	2. Dbpedia: ask a question, get the possible respone
	3. Define topic.
	4. Talk to module 3 - ??
	
