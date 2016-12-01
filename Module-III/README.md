# Chatbot Knowledge Base

<b>Chatbot Knowledge Base</b>

__Team members__: Baincescu Catalina, Birsan Alexandra, Gusa Diana, Iacob Madalina, Astefanesei Iulian

	1. Define a schema (question and answer): use aiml resource files
	2. Introduce data to medical.ailm
	3. Update the other aiml files
	4. Define a schme for users
	

#Aiml files
	
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
				"description":"List of learned tags fomr user",
				"type": "object",
				"properties": {
					"age": {
						"type": "string"
					},
					"school": {
						"type": "string"
					},
					"disease": {
						"type": "array",
						"description": "list of disseases",
						"itmes": {
							"type": "string"
						}
					}
				}
			}
		}
	}
