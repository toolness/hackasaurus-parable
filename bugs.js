var bugs = {
  dropCap: {
    isFixed: function isFloatOnCorrectSide(context) {
      return $(".drop-cap", context).css("float") == "left";
    },
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
      return $("img#supergirl", context).attr("src") == "images/supergirl.png";
    },
    achievement: "#url-hacker.achievement"
  }
};

var bugHints = [
  {
    content: ".deletion.hint",
    when: {
      matches: ".curtain",
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
      isOnCssProperty: "float",
      notFixed: bugs.dropCap
    }
  },
  {
    content: ".pin.hint",
    when: {
      matches: "div.drop-cap",
      isStyleOverlayVisible: true,
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

var remixDialogBugHints = [
  {
    content: ".txt.hint",
    when: {
      matches: "p.needs-fixing",
      isOnTextNode: true,
      notFixed: bugs.typo
    }
  },
  {
    content: ".attr.hint",
    when: {
      matches: "img#supergirl",
      isOnAttributeValue: "src",
      notFixed: bugs.brokenImage
    }
  }
];

var stylePropertiesToShow = [
  "float",
  "font-family",
  "font-size",
  "color",
  "background-color"
];

var remixDialogPageMods = {
  stylesheets: [],
  scripts: ['bugs.js']
};
