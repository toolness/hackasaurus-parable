// These are 'bugs' on the page that need to be fixed by the
// user.

var bugs = {
  dropCap: {
    // This method returns true or false depending on whether
    // the bug has been fixed yet. It needs to take a jQuery
    // context, because it's sometimes run in the remix dialog,
    // which is structured in an unusual way.
    //
    // Also, because this source code is injected into both the
    // original page and the remix dialog, any dependent scripts
    // or CSS should be added to the 'remixDialogPageMods'
    // object below.
    isFixed: function isFloatOnCorrectSide(context) {
      return $(".drop-cap", context).css("float") == "left";
    },
    // The achievement to display once the bug has been fixed.
    achievement: "#style-hacker.achievement"
  },
  curtain: {
    isFixed: function isCurtainRemoved(context) {
      return $(".curtain", context).length == 0;
    },
    achievement: "#deleter.achievement"
  },
  typo: {
    isFixed: function isTypoFixed(context) {
      var text = $("p.needs-fixing", context).text();
      return text.indexOf("weeb") == -1;
    },
    achievement: "#typo-fixer.achievement"
  },
  brokenImage: {
    isFixed: function isBrokenImageFixed(context) {
      return $("img#supergirl", context).attr("src").match(/images\/supergirl\.png$/);
    },
    achievement: "#url-hacker.achievement"
  }
};

// These are hints to display as the user explores the page and UI.

var bugHints = [
  {
    // The selector identifying the content of the hint.
    content: ".deletion.hint",
    // The set of conditionals which must all be satisfied in
    // order for the hint to be displayed.
    when: {
      // A selector that the focused element in the goggles
      // must match in order for the hint to be displayed.
      matches: ".curtain",
      // A bug that must not yet be fixed in order for the
      // hint to be displayed.
      notFixed: bugs.curtain
    }
  },
  {
    content: ".remix.hint",
    when: {
      matches: "p.needs-fixing",
      notFixed: bugs.typo
    }
  },
  {
    content: ".remix.hint",
    when: {
      matches: "img#supergirl",
      notFixed: bugs.brokenImage
    }
  },
  {
    content: ".float.hint",
    when: {
      matches: "div.drop-cap",
      // A CSS property that the user must be hovering over
      // in the style editor overlay for the hint to be displayed.
      isOnCssProperty: "float",
      notFixed: bugs.dropCap
    }
  },
  {
    content: ".pin.hint",
    when: {
      matches: "div.drop-cap",
      // The style overlay must be visible in order for 
      // the hint to be shown.
      isStyleOverlayVisible: true,
      // The user must not have "pinned" the style overlay
      // into edit mode for the hint to be shown.
      isStyleOverlayLocked: false,
      notFixed: bugs.dropCap
    }
  },
  {
    content: ".style.hint",
    when: {
      matches: "div.drop-cap",
      isStyleOverlayVisible: false,
      notFixed: bugs.dropCap
    }
  }
];

// These are hints to display to the user explores the
// remix dialog. All hints to display must be in the
// 'remix-dialog-hints' div in index.html.

var remixDialogBugHints = [
  {
    content: ".txt.hint",
    when: {
      matches: "p.needs-fixing",
      // The user must be hovering over any text node in the
      // element's 'pretty view' for the hint to be displayed.
      isOnTextNode: true,
      notFixed: bugs.typo
    }
  },
  {
    content: ".attr.hint",
    when: {
      matches: "img#supergirl",
      // The user must be hovering over a particular attribute's
      // value in the element's 'pretty view' for the hint to
      // be displayed.
      isOnAttributeValue: "src",
      notFixed: bugs.brokenImage
    }
  }
];

// These are the CSS style properties to show in the style info
// overlay.

var stylePropertiesToShow = [
  "float",
  "font-family",
  "font-size",
  "color",
  "background-color"
];

// If the remix dialog needs any additional stylesheets or scripts
// for this script to execute properly, they should be added here.

var remixDialogPageMods = {
  stylesheets: [],
  scripts: []
};
