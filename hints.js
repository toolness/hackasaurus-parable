var HintFilters = {
  matches: function(selector) {
    return function(ui, target) {
      var query = $(selector);
      return target && $(target).is(selector);
    };
  },
  isOnCssProperty: function(name) {
    return function(ui, target) {
      var rowHover = $("div.webxray-row:hover");
      if (rowHover.length) {
        var row = rowHover[0];
        var widget = ui.jQuery(row).data("propertyWidget");
        if (widget.name == name && !widget.isBeingEdited())
          return true;
      }
      return false;
    };
  },
  isStyleOverlayLocked: function(isLocked) {
    return function(ui, target) {
      return (ui.styleInfoOverlay.isLocked() == isLocked);
    };
  },
  isStyleOverlayVisible: function(isVisible) {
    return function(ui, target) {
      return (ui.styleInfoOverlay.isVisible() == isVisible);
    };
  },
  notFixed: function(bug) {
    return function() {
      return !bug.isFixed();
    };
  }
};

function HintManager(ui, filters) {
  var hints = [];
  
  filters = filters || HintFilters;
  
  var self = {
    plant: function(options) {
      var content = $(options.content).clone();
      var filterList = [];

      for (var filterName in options.when) {
        var arg = options.when[filterName];
        var filter = filters[filterName];
        
        if (!filter)
          throw new Error("unknown 'when' option: " + filterName);

        filterList.push(filter(arg));
      }
      
      $(document.body).append(content);
      content.hide();
      hints.push({
        content: content,
        filterList: filterList
      });
    },
    refresh: function refresh(currentTarget) {
      hints.forEach(function(hint) {
        for (var i = 0; i < hint.filterList.length; i++) {
          if (!hint.filterList[i](ui, currentTarget)) {
            hint.content.hide();
            return;
          }
        };
        hint.content.fadeIn();
      });
    }
  };

  return self;
}
