
# https://github.com/RDFLib/sparqlwrapper

from SPARQLWrapper import SPARQLWrapper, JSON

sparql = SPARQLWrapper("http://dbpedia.org/sparql")

input = 'Albert_Einstein'
# input = 'Einstein'  # not good, result nulls

sparql.setQuery("""
     PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                        SELECT  ?label
                        WHERE {<http://dbpedia.org/resource/""" + input + """>
                        rdfs:comment  ?label
                        filter langMatches(lang(?label),"en")}
""")
sparql.setReturnFormat(JSON)
results = sparql.query().convert()

for result in results["results"]["bindings"]:
    print(result["label"]["value"].encode('utf-8'))

