var bugs = {
  dropCap: {
    isFixed: function isFloatOnCorrectSide() {
      return $(".drop-cap").css("float") == "left";
    },
    achievement: "#style-hacker.achievement"
  },
  curtain: {
    isFixed: function isCurtainRemoved() {
      return $(".curtain").length == 0;
    },
    achievement: "#deleter.achievement"
  },
  typo: {
    isFixed: function isTypoFixed() {
      var text = $("p.needs-fixing").text();
      return text.indexOf("weeb") == -1;
    },
    achievement: "#typo-fixer.achievement"
  },
  brokenImage: {
    isFixed: function isBrokenImageFixed() {
      return $("img#supergirl").attr("src") == "images/supergirl.png";
    },
    achievement: "#url-hacker.achievement"
  }
};
