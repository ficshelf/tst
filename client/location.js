Meteor.startup(function() {
  navigator.geolocation.getCurrentPosition(success);
});

success = function(position) {
  Session.set('location', position);
  console.log(position);
  Meteor.call('fetchNearbyLocations', position.coords);
};
