// Here's my data model
var ViewModel = function(first, last) {
    self = this;
    this.firstName = ko.observable(first);
    this.lastName = ko.observable(last);
 
    this.fullName = ko.computed(function() {
        // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
        return this.firstName() + " " + this.lastName();
    }, this);    
    
    this.points = ko.observableArray([]);
        
    this.requestData = function() {
      $.ajax({
            url: "http://brianschoolcraft.com/api/v1.0/courses/3",
            type: "GET",
            dataType: "jsonp",
            success: function(allData) {
              var points = allData.data.mapPoints;
              var mappedPoints = $.map(points, function(item) { return new Point(item) });
              self.points(mappedPoints);
            }
        }); 
    }
    
    this.requestData();
    
    this.locationString = ko.observable();
    
    var onSuccess = function(position) {
        self.locationString('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');
        
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        self.location = 'code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n';
    }

    document.addEventListener("deviceready", function() {navigator.geolocation.watchPosition(onSuccess, onError, { frequency: 3000, enableHighAccuracy: true });}, false);
            
}
 
var Point = function(data) {
    this.id = ko.observable(data.id)
    this.lat = ko.observable(data.lat)
    this.lon = ko.observable(data.lon)
    this.title = ko.observable(data.title)
    this.type = ko.observable(data.type)
    this.lat = ko.observable(data.lat)
}
ko.applyBindings(new ViewModel("Planet", "Earth")); // This makes Knockout get to work

var Location = function(data) {
    this.latitude = ko.observable(data.latitude);    
    this.longitude = ko.observable(data.longitude);    
    this.altitude = ko.observable(data.altitude);    
    this.accuracy = ko.observable(data.accuracy);    
    this.altitudeAccuracy = ko.observable(data.altitudeAccuracy);    
    this.heading = ko.observable(data.heading);    
    this.speed = ko.observable(data.speed);    
}    
