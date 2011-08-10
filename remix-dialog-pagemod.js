(function() {
  var preview = $("#preview").contents();
  var hints = preview.find(".remix-dialog-hints").clone();
  $(document.body).append(hints.show());

  function hintify(options) {
    var filter = options.filter || function() { return true; };
    $(options.part).live({
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
    target: "p.needs-fixing",
    part: ".element .text",
    hint: hints.find(".txt")
  });

  hintify({
    target: "img#supergirl",
    part: ".attributes .value",
    filter: function() {
      return $(this).prev(".name").text() == "src";
    },
    hint: hints.find(".attr")
  });
})();
