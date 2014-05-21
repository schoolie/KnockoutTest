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


