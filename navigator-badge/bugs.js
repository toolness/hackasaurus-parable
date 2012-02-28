// These are 'bugs' on the page that need to be fixed by the
// user.

var bugs = (function() {
  var totalToEarn = 0;
  var earned = 0;
  
  function win() {
    $("#challenge").hide();
    $("#win").fadeIn();
    $("#win form").submit(function() {
      var email = $(this).find("input#email").val().trim();
      if (QuickBadge.validateEmail(email)) {
        var baseURI = $('<a href="./"></a>')[0].href;
        var publish = QuickBadge.publish({
          service: "http://hackpub.hackasaurus.org/publish",
          assertion: {
            "recipient": email,
            "badge": {
              "version": "0.0.1",
              "name": "Web Navigator",
              "image": $("#badge")[0].src,
              "description": "Can operate a Web browser with celerity.",
              "criteria": baseURI,
              "issuer": {
                // TODO: The 'origin' isn't checked right now,
                // so we will take advantage of this to use an
                // authoritative domain that's good for
                // demo purposes.
                "origin": "http://navigator-badge.hackasaurus.org/",
                "name": "Hackasaurus",
                "org": "Experimental Badge Authority",
                "contact": "rawr@hksr.us"
              }
            }
          }
        });
        $("#win form").fadeOut(function() {
          $("#throbber").fadeIn(function() {
            publish.fail(function() {
              alert("Sorry, an error occurred. Please try again later.");
              $("#win form").show();
              $("#throbber").hide();
            });
            publish.done(function(url) {
              $("#throbber").fadeOut();
              QuickBadge.issue(url, {
                success: function() {
                  $("#win .instructions").hide();
                },
                error: function(info) {
                  $("#win form").show();
                  $("#throbber").hide();
                  console.log("error", info);
                }
              });
            });
          });
        });
      } else
        alert("Please provide a valid e-mail address.");
      return false;
    });
  }
  
  function achieve(cb) {
    totalToEarn++;
    return function() {
      earned++;
      cb();
      if (earned == totalToEarn)
        win();
    }
  }
  
  //setTimeout(win, 1000);
  
  return {
    addressBarHacker: {
      isFixed: function() {
        return (window.location.hash.indexOf($("#secret-hash").text()) != -1);
      },
      achievement: "#address-bar-hacker",
      onAchieved: achieve(function() {
        $("#secret-hash").parent().slideUp();
      })
    },
    selecter: {
      isFixed: function() {
        var selObj = window.getSelection();
        if (this.achieved)
          return true;
        if (selObj.toString() == $("#select-me").text()) {
          this.achieved = true;
          return true;
        }
        return false;
      },
      achievement: "#selecter"
    },
    paster: {
      isFixed: function() {
        return ($("#paster-field").val() == $("#select-me").text());
      },
      achievement: "#paster",
      onAchieved: achieve(function() {
        $("#paster-field").parent().slideUp();
        $("#select-me").slideUp();
      })
    },
    massivePaster: {
      isFixed: function() {
        return ($("#massive-paster-field").val() == $("#massive").val());
      },
      achievement: "#massive-paster",
      onAchieved: achieve(function() {
        $("#massive-challenge").slideUp();
      })
    },
    linker: {
      isFixed: function() {
        return ($("#linker-field").val() == $("#supergirl")[0].src);
      },
      achievement: "#linker",
      onAchieved: achieve(function() {
        $("#linker-field").parent().slideUp();
      })
    }
  };
})();
