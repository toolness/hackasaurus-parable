// These are 'bugs' on the page that need to be fixed by the
// user.

var bugs = (function() {
  var totalToEarn = 0;
  var earned = 0;
  
  function win() {
    $("#challenge").hide();
    $("#win").fadeIn();
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
