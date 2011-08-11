(function() {
  var preview = $("#preview").contents();
  var hints = HintManager(null, RemixDialogHintFilters, preview);

  $(document.body).append(preview.find(".remix-dialog-hints").clone());
  remixDialogBugHints.forEach(hints.plant);
  $("#dom-rendering").live({
    mouseover: function(event) { hints.refresh(event.target); },
    mouseout: function(event) { hints.refresh(null); }
  });
})();
