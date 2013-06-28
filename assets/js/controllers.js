'use strict';

/* Controllers */
function SelectLanguagesCtrl($scope, languages, contents) {
  $scope.languages = languages.lggs

  var _contents;

  contents.async().then(function(contents) {
    _contents = contents.languages;
  });

  $scope.title = function() {
    if (_contents) {
      return languages.translate(_contents.title);
    }
  };

  $scope.setLanguage = function(lgg) {
    console.log("Selecting language : " + lgg.name);
    languages.selected = lgg;
  };
}
SelectLanguagesCtrl.$inject = ["$scope", "languages", "contents"];


function oLookup(o, path) {
  var i,
      k = path.shift();
  if (i = k.match(/(.*)\[([0-9]*)\]/)) {
    o = o[i[1]][parseInt(i[2])]
  } else {
    o = o[k];
  }

  if (path.length == 0) {
    return o;
  } else {
    return oLookup(o, path);
  }
}

function translate(languages, contents, path) {
  if (contents) {
    var c = oLookup(contents, path);
    if (c) {
      return languages.translate(c);
    }
  }
}


function NavBarCtrl($scope, languages, contents) {

  var _contents;

  contents.async()
          .then(function(contents) {
            _contents = contents.navbar;
          });

  $scope.contents = {
    home:       function() {
                  return translate(languages, _contents, ["home"]);
                },
    mission:    function() {
                  return translate(languages, _contents, ["mission"]);
                },
    events:     function() {
                  return translate(languages, _contents, ["events"]);
                },
    sponsoring: function() {
                  return translate(languages, _contents, ["sponsoring"]);
                }
  };

}
NavBarCtrl.$inject = ["$scope", "languages", "contents"];

function FooterCtrl($scope, languages, contents, sponsors) {

  var _contents;

  contents.async()
          .then(function(contents) {
            _contents = contents;
          });

  sponsors.then(function(sponsors) {
            $scope.sponsors  = sponsors;
          });

  $scope.translate = function(o) {
    if (angular.isObject(o)) {
      return languages.translate(o);
    }
  };

  $scope.contents = function(pathString, absolute) {
    var path = pathString.split(/\./g);
    if (!absolute) {
      path.unshift("footer");
    }
    return translate(languages, _contents, path);
  }

}
FooterCtrl.$inject = ["$scope", "languages", "contents", "sponsors"];

function StartCtrl($scope, languages, contents, talks) {

  var _contents;

  contents.async()
          .then(function(contents) {
            _contents = contents;
          });

  talks.then(function(talks) {
          $scope.talks = talks;
          $scope.upcoming = [];
          angular.forEach(talks, function(t) {
            if (!$scope.nextTalk && t.done == false) {
              $scope.nextTalk = t;
            }
            if (t.done == false) {
              $scope.upcoming.push(t);
            }
          });
          console.dir($scope.upcoming);
        });

  $scope.translate = function(o) {
    if (angular.isObject(o)) {
      return languages.translate(o);
    }
  };

  $scope.contents = function(pathString, absolute) {
    var path = pathString.split(/\./g);
    if (!absolute) {
      path.unshift("start");
    }
    return translate(languages, _contents, path);
  }

}
StartCtrl.$inject = ["$scope", "languages", "contents", "talks"];


function MissionCtrl($scope, languages, contents) {
  var _contents;

  contents.async()
          .then(function(contents) {
            _contents = contents;
          });

  $scope.contents = function(pathString, absolute) {
    var path = pathString.split(/\./g);
    if (!absolute) {
      path.unshift("mission");
    }
    return translate(languages, _contents, path);
  }
}
MissionCtrl.$inject = ["$scope", "languages", "contents"];

function EventsCtrl($scope, languages, contents, talks) {
  // talks.then(function(talks) {
  //   angular.forEach(talks, function(i) {console.dir(i)});
  // });

  var _contents;

  contents.async()
          .then(function(contents) {
            _contents = contents;
          });

  talks.then(function(talks) {
          $scope.talks = talks;
          angular.forEach($scope.talks, function(t) {
            console.dir($scope.selected)
            if (!$scope.selected && !t.done) {
              $scope.select(t);
            }
          });
        });

  $scope.translate = function(o) {
    if (angular.isObject(o)) {
      return languages.translate(o);
    }
  };

  $scope.contents = function(pathString, absolute) {
    var path = pathString.split(/\./g);
    if (!absolute) {
      path.unshift("events");
    }
    return translate(languages, _contents, path);
  }

  $scope.select = function(talk) {
    if (talk) {
      $scope.selected = talk;
    }
  }

  $scope.url = function(talk) {
    if (talk) {
      return "events/"+talk.speaker.id+"/"+talk.description+".html";
    }
  }


  $scope.title = function(talk) {
    if (talk) {
      return $scope.translate(talk.title);
    }
  }
  $scope.subtitle = function(talk) {
    if (talk) {
      return $scope.translate(talk.subtitle);
    }
  }
  $scope.synopsis = function(talk) {
    if (talk) {
      return $scope.translate(talk.synopsis);
    }
  }
  $scope.bio = function(talk) {
    if (talk && talk.speaker) {
      return $scope.translate(talk.speaker.bio);
    }
  }
  $scope.where_when = function(talk) {
    if (talk) {
      return $scope.translate(talk.date)+"<br>"+talk.location.name+"<br>"+talk.location.address;
    }
  }

}
EventsCtrl.$inject = ["$scope", "languages", "contents", "talks"];

function SponsoringCtrl($scope, $timeout, languages, sponsoring, contents) {

  $scope.headers = {}
  $scope.selectedLevel = 0;

  sponsoring.then(function(sponsoring) {
            $scope.prices  = sponsoring.prices;
            $scope.advantages  = sponsoring.advantages;
            console.dir($scope.prices);
            console.dir($scope.advantages);
          });


  $timeout(function() {
    $scope.headers.who = true;

    $timeout(function() {
      $scope.headers.why = true;

      $timeout(function() {
        $scope.headers.how = true;

        $timeout(function() {
          angular.element("#XXX").removeClass("init");

          $timeout(function() {
            $scope.expanded = true;
            angular.element("#XXX .body").slideDown();
          }, 300);
        }, 400);
      }, 300);
    }, 300);
  }, 300);

  var _contents;
  contents.async()
          .then(function(contents) {
            _contents = contents;
          });


  $scope.translate = function(o) {
    if (angular.isObject(o)) {
      return languages.translate(o);
    }
  };

  $scope.contents = function(pathString, absolute) {
    var path = pathString.split(/\./g);
    if (!absolute) {
      path.unshift("sponsoring");
    }
    return translate(languages, _contents, path);
  }
}
SponsoringCtrl.$inject = ["$scope", "$timeout", "languages", "sponsoring", "contents"];