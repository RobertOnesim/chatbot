# Chatbot Knowledge Base

<b>Chatbot Knowledge Base</b>

__Team members__: Baincescu Catalina, Birsan Alexandra, Gusa Diana, Iacob Madalina, Astefanesei Iulian

	1. Define a schema (question and answer): use aiml resource files
	2. Introduce data to medical.aiml
	3. Update the other aiml files
	4. Define a schema for users
	

#Aiml files (go to "aiml" directory)
	
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
						"type": "string"
					},
					"school": {
						"type": "string"
					},
					"diseases": {
						"type": "array",
						"description": "list of diseases",
						"itmes": {
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
