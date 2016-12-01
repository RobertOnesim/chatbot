# Chatbot Knowledge Base

<b>Chatbot Knowledge Base</b>

__Team members__: Baincescu Catalina, Birsan Alexandra, Gusa Diana, Iacob Madalina, Astefanesei Iulian

	1. Define a schema (question and answer)
	2. Define a schema for words
	3. Define the endpoints for words
	4. Define the endpoints for question and answer
	5. Introduce more data to db
	6. Use a module to determine if the word is valid in english and to get the word's synonyms
	

#Collection Q&A
	
	{
		"title": " Question and answer",
		"type": "object",
		"properties": {
			"question": {
				"type": "string"
			},
			"answer": {
				"type": "string"
			},
			"keyWords": {
				"description":"Keywords extracted from question",
				"type": "array",
				"items": {
					"type": "string"
				}
			}
		}
	}

Example: 

	{
		"question": "Who is Albert Einstein?",
		"answer": "Albert Einstein was a German-born physicist who developed the general theory of relativity, among other feats. He is considered the most influential physicist of the 20th century.",
		"keywords":["Albert", "Einstein"]
	}

