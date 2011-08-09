(function() {
  var preview = $("#preview").contents();
  var hints = preview.find(".remix-dialog-hints").clone();
  $(document.body).append(hints.show());

  $(".element .text").live({
    mouseover: function() {
      var parent = $(this).closest(".element");
      var linkedNode = parent.data("linked-node");
      if (linkedNode == preview.find("p.needs-fixing")[0]) {
        hints.find(".txt").fadeIn();
      }
    },
    mouseout: function() {
      hints.find(".txt").fadeOut();
    }
  });

  $(".attributes .value").live({
    mouseover: function() {
      var parent = $(this).closest(".element");
      var linkedNode = parent.data("linked-node");
      var attr = $(this).prev(".name").text();
      if (linkedNode == preview.find("img#supergirl")[0] &&
          attr == "src") {
        hints.find(".attr").fadeIn();
      }
    },
    mouseout: function() {
      hints.find(".attr").fadeOut();
    }
  });
})();
