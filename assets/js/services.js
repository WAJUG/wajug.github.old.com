'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('wajug.services', []).
  value('version', '0.1').
  factory("languages", [function() {
    function Languages() {
      this.lggs = [];
      this.lggs[0] = {id:"fr", name: "Français"};
      this.lggs[1] = {id:"en", name: "English"};

      this.selected = this.lggs[0];

      this.translate = function (content) {
        return content[this.selected.id];
      }
    };
    return new Languages();
  }]).
  factory("contents", ["$http", function($http) {
    function Contents() {
      var promise = $http.get('/assets/data/contents.json').
                      then(function(resource) {
                        return resource.data;
                      });
      return promise;
    };
    return {
      async: Contents
    };
  }]).
  factory("speakers", ["$http", function($http) {
    var promise = $http.get('/assets/data/speakers.json').
                    then(function(resource) {
                      return resource.data;
                    });
    return promise;
  }]).
  factory("locations", ["$http", function($http) {
    var promise = $http.get('/assets/data/locations.json').
                    then(function(resource) {
                      return resource.data;
                    });
    return promise;
  }]).
  factory("talks", ["$q", "$http", "speakers", "locations", function($q, $http, speakers, locations) {
    var talks = $http.get('/assets/data/talks.json').
                    then(function(resource) {
                      return resource.data;
                    });
    var promise = $q.all([talks, speakers, locations])
                    .then(function(results) {
                      var talks = results[0];
                      var speakers = results[1];
                      var locations = results[2];
                      angular.forEach(talks, function(talk) {
                        var speakerId = talk.speaker;
                        for (var spId in speakers) {
                          if (spId === speakerId) {
                            talk.speaker = speakers[spId];
                            talk.speaker.id = spId;
                            break;
                          }
                        }
                        var locactionId = talk.location;
                        for (var locId in locations) {
                          if (locId === locactionId) {
                            talk.location = locations[locId];
                            talk.location.id = locId;
                            break;
                          }
                        }
                      });
                      return talks;
                    });

    return promise;
  }]).
  factory("sponsors", ["$http", function($http) {
    var promise = $http.get('/assets/data/sponsors.json').
                    then(function(resource) {
                      return resource.data;
                    });
    return promise;
  }]).
  factory("sponsoring", ["$http", function($http) {
    var promise = $http.get('/assets/data/sponsoring.json').
                    then(function(resource) {
                      return resource.data;
                    });
    return promise;
  }])
;
