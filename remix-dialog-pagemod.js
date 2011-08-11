(function() {
  var preview = $("#preview").contents();
  var filters = {
    matches: function(selector) {
      return function(ui, target) {
        var parent = $(target).closest(".element");
        if (parent) {
          var linkedNode = parent.data("linked-node");
          return $(linkedNode).is(selector);
        }
        return false;
      };
    },
    isOnAttributeValue: function(attr) {
      return function(ui, target) {
        return ($(target).is(".attributes .value") &&
                $(target).prev(".name").text() == attr);      
      };
    },
    isOnTextNode: function() {
      return function(ui, target) {
        return $(target).is(".element .text");
      };
    },
    notFixed: function(bug) {
      return function() {
        return !bug.isFixed(preview);
      };
    }
  };
  var hints = HintManager(null, filters);

  $(document.body).append(preview.find(".remix-dialog-hints").clone());
  
  hints.plant({
    content: ".txt.hint",
    when: {
      matches: "p.needs-fixing",
      isOnTextNode: true,
      notFixed: bugs.typo
    }
  });

  hints.plant({
    content: ".attr.hint",
    when: {
      matches: "img#supergirl",
      isOnAttributeValue: "src",
      notFixed: bugs.brokenImage
    }
  });

  $("#dom-rendering").live({
    mouseover: function(event) { hints.refresh(event.target); },
    mouseout: function(event) { hints.refresh(null); }
  });
})();
