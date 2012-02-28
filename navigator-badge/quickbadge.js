var QuickBadge = (function() {
  var BADGE_REQUIRED_FIELDS = [
    "version",
    "name",
    "image",
    "description",
    "criteria"
  ];

  var ISSUER_REQUIRED_FIELDS = [
    "origin",
    "name"
  ];

  // From http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
  function validateEmail(email) { 
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }

  function attachCallbacks(deferred, callbacks) {
    callbacks = callbacks || {};
    if (callbacks.success)
      deferred.done(callbacks.success);
    if (callbacks.error)
      deferred.fail(callbacks.error);
    return deferred;
  }

  return {
    validateEmail: validateEmail,
    publish: function(options) {
      var assertion = options.assertion;
      var publish = jQuery.Deferred();
      if (!assertion || !assertion.badge || !assertion.badge.issuer)
        throw new Error("invalid assertion");
      BADGE_REQUIRED_FIELDS.forEach(function(field) {
        if (!assertion.badge[field])
          throw new Error("Missing field: badge." + field);
      });
      ISSUER_REQUIRED_FIELDS.forEach(function(field) {
        if (!assertion.badge.issuer[field])
          throw new Error("Missing field: badge.issuer." + field);
      });
      if (!validateEmail(assertion.recipient))
        throw new Error("invalid recipient");
      jQuery.ajax({
        type: 'POST',
        url: options.service,
        data: {
          'json': JSON.stringify(assertion),
          'original-url': window.location.href,
        },
        crossDomain: true,
        dataType: 'json',
        success: function(response) {
          publish.resolve(response['published-url']);
        },
        error: function() {
          publish.reject.apply(publish, arguments);
        }
      });
      return attachCallbacks(publish, options);
    },
    issue: function(url, options) {
      var issue = jQuery.Deferred();
      OpenBadges.issue([url], function(errors, successes) {
        if (errors.length)
          issue.reject(errors[0]);
        else
          issue.resolve(successes[0]);
      });
      return attachCallbacks(issue, options);
    }
  };
})();
