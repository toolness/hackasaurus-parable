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
