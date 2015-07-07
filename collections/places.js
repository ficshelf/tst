Places = new Mongo.Collection('places');

Meteor.methods({
  'fetchNearbyLocations': function(coords) {
    if(Meteor.isServer) {
      console.log(coords);
	//coords.latitude=51.528167; //51.500152;
	//coords.longitude=-0.192800; //-0.126236;
      results = HTTP.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + coords.latitude + "," + coords.longitude + "&radius=500&types=pub|restaurant|bar&key=AIzaSyC5v6nzaHgaoHN54MC4vcCbOxl_Dz29eQI"); //AIzaSyCtfoCAldCEf8hXUlkVUd4UljqKR6W_aF4");
      console.log(results);
      _(results.data.results).each(function(loc) {
        _.extend(loc, {loc: {type: "Point", coordinates: [loc.geometry.location.lng, loc.geometry.location.lat]}});
        Places.upsert({id: loc.id}, {$set: loc});
      });
    }
  }
});
