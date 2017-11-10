(function (win) {
  const
  doc = win.document,
  baseURL = win.location.href,

  //  Common prototypes
  elementProto = Element.prototype,
  objectProto = Object.prototype,

  //  Default options for Knuff
  knuffOptions = {
    baseUrl: win.location.protocol + "//" + win.location.host + "/",
    selector: "[data-knuff]",
    onPop: null,
    onPush: null
  };

  let
  knuffActive = false;

  //  "Polyfill" for matches-method

  if (typeof elementProto.matches === "undefined") {
    elementProto.matches = elementProto.msMatchesSelector ||
                           elementProto.webkitMatchesSelector;
  }

  //  Functions

  /**
   *  Get the correct hyperlink for a Knuff element.
   */
  function getHref (url) {

    //  Regular hyperlink reference so it includes the host
    if (url.substr(0, knuffOptions.baseUrl.length) === knuffOptions.baseUrl) {
      return url;
    }

    //  But a data-knuff value might not, so let's prepend it
    return knuffOptions.baseUrl + url;
  }

  /**
   *  Set the popstate-listener for Knuff.
   */
  function popListener (event) {

    //  If there's a callback, Knuff will call it
    if (typeof knuffOptions.onPop === "function") {
      knuffOptions.onPop.call(event, event, event.state.knuff);
    }

  }

  /**
   *  Set the pushstate-listener for Knuff.
   */
  function pushListener (event) {

    const
    //  Element related to the event
    {target} = event;

    //  New tab? Cool, that works with Knuff
    if (target.matches(knuffOptions.selector) === false ||
        event.metaKey || event.ctrlKey) {
      return true;
    }

    //  Prevent regular anchor events, etc.
    event.preventDefault();

    let
    //  Get the element's hyperlink reference
    href = target.getAttribute("data-knuff") || target.href || false;

    //  Bad hyperlink reference, so let's not do anything with it
    if (href === false || href === win.location.href) {
      return false;
    }

    //  Let's normalize the hyperlink reference
    href = getHref(href);

    //  Push the new state to the browser's history
    win.history.pushState({knuff: href}, null, href);

    //  If there's a callback, Knuff will call it
    if (typeof knuffOptions.onPush === "function") {
      knuffOptions.onPush.call(event, event, href);
    }

    return false;
  }

  /**
   *  Set the options used by Knuff.
   */
  function setOptions (object) {

    //  No options; Knuff will use all the defaults
    if (objectProto.toString.call(object) !== "[object Object]") {
      return;
    }

    //  Overwrite the defaults where possible
    for (const property in object) {
      if (objectProto.hasOwnProperty.call(object, property) &&
          objectProto.hasOwnProperty.call(knuffOptions, property)) {
        knuffOptions[property] = object[property];
      }
    }
  }

  /**
   *  Knuff!
   *  Attached to the window so it's easy to get started.
   *
   *  @param {String}   options.baseUrl  - Base URL for Knuff
   *  @param {String}   options.selector - Selector for Knuff elements
   *  @param {Function} options.onPop    - Handler for popstate-events
   *  @param {Function} options.onPush   - Handler for pushstate-events
   */
  win.knuff = (options) => {

    //  No need for more than one Knuff to be active
    if (knuffActive) {
      return;
    }

    //  Set Knuff as active
    knuffActive = true;

    //  Set the options for later
    setOptions(options);

    //  Add listeners to the window and document
    win.addEventListener("popstate", popListener);
    doc.addEventListener("click", pushListener);

    //  Save the initial state to the browser's history
    win.history.replaceState({knuff: baseURL}, null, baseURL);
  };
}(this));