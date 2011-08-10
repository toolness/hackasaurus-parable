(function() {
  var preview = $("#preview").contents();
  var hints = preview.find(".remix-dialog-hints").clone();
  $(document.body).append(hints.show());

  function hintify(options) {
    var filter = options.filter || function() { return true; };
    $(options.domField).live({
      mouseover: function() {
        var parent = $(this).closest(".element");
        var linkedNode = parent.data("linked-node");
        if (linkedNode == preview.find(options.target)[0] &&
            filter.call(this))
          options.hint.fadeIn();
      },
      mouseout: function() {
        options.hint.fadeOut();
      }
    });
  }

  hintify({
    domField: ".element .text",
    target: "p.needs-fixing",
    hint: hints.find(".txt")
  });

  hintify({
    domField: ".attributes .value",
    target: "img#supergirl",
    filter: function() {
      return $(this).prev(".name").text() == "src";
    },
    hint: hints.find(".attr")
  });
})();
