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
      if (email) {
        var baseURI = $('<a href="./"></a>')[0].href;
        var assertion = {
          "recipient": email,
          "badge": {
            "version": "0.0.1",
            "name": "Web Navigator",
            "image": $("#badge")[0].src,
            "description": "Can operate a Web browser with celerity.",
            "criteria": baseURI,
            "issuer": {
              "origin": baseURI,
              "name": "Hackasaurus",
              "org": "Experimental Badge Authority",
              "contact": "rawr@hksr.us"
            }
          }
        };
        console.log(assertion);
        var deferred = jQuery.ajax({
          type: 'POST',
          url: "http://hackpub.hackasaurus.org/publish",
          data: {
            'json': JSON.stringify(assertion),
            'original-url': baseURI,
          },
          crossDomain: true
        });
        $("#win form").fadeOut(function() {
          $("#throbber").fadeIn(function() {
            deferred.done(function() {
              $("#throbber").fadeOut(function() {
                // TODO: This code is temporary.
                var url = JSON.parse(deferred.responseText)['published-url'];
                var iframe = issuer.sendIt(url, "http://localhost:8888");
                $(document.body).append(iframe);
                $(iframe).hide();
                alert("The badge is now in your backpack!");
                //$("#win form").fadeIn();
              });
            });
          });
        });
      } else
        alert("Please provide your e-mail address.");
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
  
  //setTimeout(win, 100);
  
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
