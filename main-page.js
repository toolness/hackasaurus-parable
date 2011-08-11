function updateBugsLeftText(n) {
  var help = $(".help");
  help.find(".remaining").text(n);
  help.find(".singular").hide();
  help.find(".plural").hide();
  help.find(".not-done").hide();
  help.find(".done").hide();
  if (n == 0) {
    help.find(".done").show();
  } else {
    help.find(".not-done").show();
    if (n == 1) {
      help.find(".singular").show();
    } else {
      help.find(".plural").show();
    }
  }
}

function absoluteURL(url) {
  var a = $('<a></a>').attr('href', url);
  return a[0].href;
}

function installHints(ui, hints) {
  var currentTarget = null;
  
  function genericChange() {
    currentTarget = ui.focusedOverlay.getPrimaryElement();
    hints.refresh(currentTarget);
  }
  
  ui.focusedOverlay.on('change', genericChange);
  ui.styleInfoOverlay.on('show', genericChange);
  ui.styleInfoOverlay.on('hide', genericChange);
  ui.styleInfoOverlay.on('lock', function(info) {
    currentTarget = info.element;
    hints.refresh(currentTarget);
  });

  function domEventChange() {
    hints.refresh(currentTarget);
  }

  $(".webxray-row").live({
    mouseover: domEventChange,
    mouseout: domEventChange
  });
}

function BugDisplay(bugs) {
  var fixedBefore = {};
  var self = {
    update: function update() {
      var bugsLeft = 0;
      for (var name in bugs) {
        var bug = bugs[name];
        if (!bug.isFixed())
          bugsLeft++;
        else {
          if (!(name in fixedBefore)) {
            fixedBefore[name] = true;
            if (bug.achievement)
              $(bug.achievement).delay(500).slideDown().delay(2500).slideUp();
          }
        }
      }
      updateBugsLeftText(bugsLeft);
    }
  };
  
  self.update();
  
  return self;
}

$(window).ready(function() {  
  var bugDisplay = BugDisplay(bugs);

  window.webxrayWhenGogglesLoad = function(ui) {
    var hints = HintManager(ui);

    hints.plant({
      content: ".deletion.hint",
      when: {
        matches: ".curtain",
        notFixed: bugs.curtain
      }
    });

    hints.plant({
      content: ".remix.hint",
      when: {
        matches: "p.needs-fixing",
        notFixed: bugs.typo
      }
    });

    hints.plant({
      content: ".remix.hint",
      when: {
        matches: "img#supergirl",
        notFixed: bugs.brokenImage
      }
    });
    
    hints.plant({
      content: ".float.hint",
      when: {
        matches: "div.drop-cap",
        isOnCssProperty: "float",
        notFixed: bugs.dropCap
      }
    });
    
    hints.plant({
      content: ".pin.hint",
      when: {
        matches: "div.drop-cap",
        isStyleOverlayVisible: true,
        isStyleOverlayLocked: false,
        notFixed: bugs.dropCap
      }
    });

    hints.plant({
      content: ".style.hint",
      when: {
        matches: "div.drop-cap",
        isStyleOverlayVisible: false,
        notFixed: bugs.dropCap
      }
    });

    installHints(ui, hints);
    ui.commandManager.on('state-change', bugDisplay.update);
    ui.mixMaster.setDialogPageMods({
      stylesheets: [$("link.hints")[0].href],
      scripts: [
        absoluteURL('bugs.js'),
        absoluteURL('hints.js'),
        absoluteURL('remix-dialog-pagemod.js')
      ]
    });
    ui.styleInfoOverlay.setPropertyNames([
      "float",
      "font-family",
      "font-size",
      "color",
      "background-color"
    ]);
    ui.focusedOverlay.set($("#bookmarklet")[0]);
  };
});
