// These are 'bugs' on the page that need to be fixed by the
// user.

var bugs = {
  addressBarHacker: {
    isFixed: function() {
      return (window.location.hash.indexOf($("#secret-hash").text()) != -1);
    },
    achievement: "#address-bar-hacker"
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
    achievement: "#paster"
  },
  massivePaster: {
    isFixed: function() {
      return ($("#massive-paster-field").val() == $("#massive").val());
    },
    achievement: "#massive-paster"
  },
  linker: {
    isFixed: function() {
      return ($("#linker-field").val() == $("#badgepic")[0].src);
    },
    achievement: "#linker"
  }
};
