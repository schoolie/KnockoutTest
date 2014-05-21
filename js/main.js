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
            url: "http://brianschoolcraft.com/api/v1.0/courses/1",
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
    
    self.location = ko.observable();
    
    document.addEventListener("deviceready", onDeviceReady, false);
    
    function onDeviceReady() {
        navigator.geolocation.getCurrentPosition(
        function(position) {
              self.location = $.map(position.coords, function(item) { return new Location(item) });
        }, onError);
    }    
            
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
    this.timestamp = ko.observable(data.timestamp); 
}    
