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
    d4k:        function() {
                  return translate(languages, _contents, ["d4k"]);
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

function StartCtrl($scope, languages, contents, talks, elsewheres) {

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
        });

  $scope.elsewhereInterval = "3000"
  elsewheres.then(function(elsewheres) {
    var now = new Date();
    $scope.elsewheres = elsewheres.filter(function(e) { return (new Date(e.endsAt)) > now; });
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
StartCtrl.$inject = ["$scope", "languages", "contents", "talks", "elsewheres"];


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
  var _contents;

  contents.async()
          .then(function(contents) {
            _contents = contents;
          });

  talks.then(function(talks) {
          $scope.talks = talks;
          angular.forEach($scope.talks, function(t) {
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

function D4KCtrl($scope, $timeout, languages, d4k, contents) {
  $scope.trainersInterval = "2000";

  $scope.sponsors = [
   {
     "name":"Institut Saint-Laurent",
     "description": {
       "en": "Institut Saint-Laurent",
       "fr": "Institut Saint-Laurent"
     },
     "image": "isl.png",
     "site": "www.isl.be"
   },
    {
      "name":"Devoxx4Kids",
      "description": {
        "en": "Devoxx 4 Kids",
        "fr": "Devoxx 4 Kids"
      },
      "image": "devoxx4kids.png",
      "site": "www.devoxx.com/display/4KIDS/Home"
    },
    {
      "name":"IBM",
      "description": {
        "en": "IBM",
        "fr": "IBM"
      },
      "image": "ibm.png",
      "site": "www.ibm.com/be/en/"
    },
    {
      "name":"EVS",
      "description": {
        "en": "EVS",
        "fr": "EVS"
      },
      "image": "evs.png",
      "site": "www.evs.com"
    },
    {
      "name":"CRIFA",
      "description": {
        "en": "Le Centre de Recherche sur l'Instrumentation, la Formation et l'Apprentissage de l'Université de Liège.",
        "fr": "Le Centre de Recherche sur l'Instrumentation, la Formation et l'Apprentissage de l'Université de Liège."
      },
      "image": "crifa.png",
      "site": "www.crifa.ulg.ac.be/"
    }
  ];

  d4k.then(function(d4k) {
            $scope.trainers  = d4k.trainers;
            $scope.practicalinfo  = d4k.practicalinfo;
          });

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
      path.unshift("d4k");
    }
    return translate(languages, _contents, path);
  }
}
D4KCtrl.$inject = ["$scope", "$timeout", "languages", "d4k", "contents"];