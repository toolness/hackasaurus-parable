(function() {
  var preview = $("#preview").contents();
  var hints = HintManager(null, RemixDialogHintFilters, preview);

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
