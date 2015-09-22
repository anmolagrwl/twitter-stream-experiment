var Twitter = require('twitter');
var Firebase = require("firebase");

var client = new Twitter({
  consumer_key: 'YlVGaBB8eays0Mo4JzVX9tt4p',
  consumer_secret: 'SHwVqxgHJtR7MPxLNo50voUNFAvqqqPhPLfhQ2d62ViDtgqoeK',
  access_token_key: '440801166-DQ3Hk31bwfXp6L8jD07ygX1ilJukryQtkuWyOYTE',
  access_token_secret: 'RGcuVbGdaGUwV5E15sUHvcUDWQMDM4J05x4C3MfbdUb34'
});

var myFirebaseRef = new Firebase("https://twitter-firebase.firebaseio.com/");
// var onComplete = function(error) {
//   if (error) {
//     console.log('Synchronization failed');
//   } else {
//     console.log('Synchronization succeeded');
//   }
// };
// myFirebaseRef.remove(onComplete);

client.stream('statuses/filter', {track: 'fuck'}, function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text);
    myFirebaseRef.push({
      text: tweet.text
    });
  });

  stream.on('error', function(error) {
    throw error;
  });
});
