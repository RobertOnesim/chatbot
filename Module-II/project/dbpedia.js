var SparqlClient = require('sparql-client');
var util = require('util');
var endpoint = 'http://dbpedia.org/sparql';


var query = "SELECT ?book ?genre WHERE { ?book <http://dbpedia.org/ontology/literaryGenre> ?genre } LIMIT 5";
var client = new SparqlClient(endpoint);
console.log("Query to " + endpoint);
client.query(query)
    .execute({
        format: 'resource',
        resource: 'genre'
    }, function (error, results) {
        process.stdout.write(util.inspect(arguments, null, 20, true) + "\n");
    });
console.log("Query: " + query);


var query = 'select distinct ?Concept from <http://dbpedia.org> where {[] a ?Concept} limit 5';
var client = new SparqlClient(endpoint);
console.log("Query to " + endpoint);
console.log("Query: " + query);
client.query(query, function (error, results) {
    process.stdout.write(util.inspect(arguments, null, 20, true) + "\n");
});


var query = "SELECT ?city ?leaderName FROM <http://dbpedia.org> WHERE { ?city <http://dbpedia.org/property/leaderName> ?leaderName } LIMIT 10";
var client = new SparqlClient(endpoint);
console.log("Query to " + endpoint);
console.log("Query: " + query);
client.query(query)
// .bind('city', '<http://dbpedia.org/resource/Chicago>')
// .bind('city', '<http://dbpedia.org/resource/Tokyo>')
//.bind('city', '<http://dbpedia.org/resource/Vienna>')
// .bind('city', '<http://dbpedia.org/resource/United_States>')
    .execute({
        format: 'default',
        resource: 'city'
    }, function (error, results) {
        process.stdout.write(util.inspect(arguments, null, 20, true) + "\n");
    });


