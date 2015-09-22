var Twitter = require('twitter');
var r = require('rethinkdb');

var client = new Twitter({
  consumer_key: 'YlVGaBB8eays0Mo4JzVX9tt4p',
  consumer_secret: 'SHwVqxgHJtR7MPxLNo50voUNFAvqqqPhPLfhQ2d62ViDtgqoeK',
  access_token_key: '440801166-DQ3Hk31bwfXp6L8jD07ygX1ilJukryQtkuWyOYTE',
  access_token_secret: 'RGcuVbGdaGUwV5E15sUHvcUDWQMDM4J05x4C3MfbdUb34'
});

// Establish a connection
var connection = null;
r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err;
    connection = conn;
})

client.stream('statuses/filter', {track: 'fuck'}, function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text);
    r.table("tweets").insert({
        text: tweet.text
    }).run(connection, function(err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result, null, 2));
    });
  });

  stream.on('error', function(error) {
    throw error;
  });
});
