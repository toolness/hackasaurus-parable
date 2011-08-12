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

jQuery.fn.extend({
  attrArray: function(attr) {
    return $.makeArray(this.map(function() {
      return $(this).attr(attr);
    }));
  }
});

function buildPageMods(remixDialogPageMods) {
  var baseRemixDialogPageMods = {
    stylesheets: $("link.include-in-remix-dialog").attrArray('href'),
    scripts: $("script.include-in-remix-dialog").attrArray('src')
  };
  var finalMods = {stylesheets: [], scripts: []};

  ['stylesheets', 'scripts'].forEach(function(modType) {
    [baseRemixDialogPageMods,
     remixDialogPageMods].forEach(function(mods) {
       var absURLs = mods[modType].map(absoluteURL);
       finalMods[modType] = finalMods[modType].concat(absURLs);
     });
  });

  finalMods.scripts.push(absoluteURL('remix-dialog-pagemod.js'));
  console.log(JSON.stringify(finalMods));

  return finalMods;
}

$(window).ready(function() {  
  var bugDisplay = BugDisplay(bugs);

  window.webxrayWhenGogglesLoad = function(ui) {
    var hints = HintManager(ui);

    bugHints.forEach(hints.plant);
    installHints(ui, hints);
    ui.commandManager.on('state-change', bugDisplay.update);
    ui.mixMaster.setDialogPageMods(buildPageMods(remixDialogPageMods));
    ui.styleInfoOverlay.setPropertyNames(stylePropertiesToShow);
    ui.focusedOverlay.set($("#bookmarklet")[0]);
  };
});
