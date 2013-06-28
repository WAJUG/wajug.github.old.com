'use strict';


angular.module('wajug', ['ui', 'ui.bootstrap', 'wajug.filters', 'wajug.services', 'wajug.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/start.html', controller: StartCtrl});
    $routeProvider.when('/mission', {templateUrl: 'partials/mission.html', controller: MissionCtrl});
    $routeProvider.when('/events', {templateUrl: 'partials/events.html', controller: EventsCtrl});
    $routeProvider.when('/sponsoring', {templateUrl: 'partials/sponsoring.html', controller: SponsoringCtrl});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);

$(function() {
  var $doc = $(document);
  $doc.on("click", '.sponsorFlip', function(){
    // $(this) point to the clicked .sponsorFlip element (caching it in elem for speed):
    var elem = $(this);
    if(elem.data('flipped'))
    {
      elem.revertFlip();
      elem.data('flipped',false)
    }
    else
    {
      elem.flip({
        direction:'lr',
        speed: 350,
        onBefore: function(){
          elem.html(elem.siblings('.sponsorData').html());
        }
      });
      elem.data('flipped',true);
    }
  });


  var navbar = $("#navbar");
  $(".ribbon").css("top", navbar.offset().top + navbar.height());
  $(window).resize(function() {
    $(".ribbon").css("top", navbar.offset().top + navbar.height())
  });
});
