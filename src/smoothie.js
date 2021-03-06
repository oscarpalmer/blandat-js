(function (win) {
  const
  doc = win.document;

  let
  smoothieActive = false,
  smoothieCallback,
  smoothieOffset;

  /**
   *  Add event listeners to all elements with
   *  with the data-attribute "smoothie"
   */
  function addListeners () {
    Array.prototype.forEach.call(

      //  Find all relevant elements
      doc.querySelectorAll("[data-smoothie]"),

      //  And add the onClick-handler
      (element) => {
        element.addEventListener("click", onClick);
      }
    );
  }

  /**
   *  An easeInOutQuadratic-easing function for smooth animations.
   *
   *  https://gist.github.com/bendc/bd064f9111af22354cf33a79edc798b6
   */
  function easing (time) {
    if ((time *= 2) < 1) {
      return 0.5 * time * time;
    }

    return -0.5 * (--time * (time - 2) - 1);
  }

  /**
   *  Set the duration for a specific scroll.
   */
  function getDuration (distance) {

    //  Distance can be negative, but duration cannot,
    //  so let's make it positive, and then return
    //  its closest, greater (or equal) integer to avoid decimals
    return Math.ceil(distance < 1 ? -distance : distance);

  }

  /**
   *  Get an element if we can, document body if not.
   */
  function getElement (id) {
    return doc.getElementById(id) || doc.body;
  }

  /**
   *  Get an element's offset value.
   */
  function getOffset (element) {
    return element.getBoundingClientRect().top - smoothieOffset;
  }

  /**
   *  Event handler for all smoothie elements.
   */
  function onClick (event) {

    //  Prevent anchors or other linked events from firing
    event.preventDefault();

    const
    //  onClick-element
    {target} = event,

    //  Get the id for the target element
    targetID = target.getAttribute("data-smoothie");

    //  Scroll to the target element
    scroll(targetID, target);

  }

  /**
   *  Animate scrolling for the onClick & smoothie.to-methods.
   */
  function scroll (target, origin) {

    const
    //  Base offset for current state
    page     = win.pageYOffset,

    //  Target element and its offset
    element  = target.nodeType ? target : getElement(target),
    offset   = getOffset(element),

    //  Normalised duration for animation
    duration = getDuration(offset);

    let
    start = null;

    /**
     *  Loop function for each tick of requestAnimationFrame
     */
    function loop (time) {

      //  Set a start time for the loops
      if (start === null) {
        start = time;
      }

      const
      //  Set the elapsed time
      elapsed = time - start,

      //  Calculate the distance to travel this loop
      distance = offset * easing(elapsed / duration);

      //  Scroll to the calculated position:
      //  offset of window + distance
      win.scrollTo(0, page + distance);

      if (elapsed < duration) {

        //  Not finished; one more round
        win.requestAnimationFrame(loop);

      } else {

        //  Finished, but let's scroll to the defined offset
        //  to prevent the odd pixels here and there
        win.scrollTo(0, page + offset);

        //  Call the user's callback when finished
        if (typeof smoothieCallback === "function") {
          smoothieCallback.call(element, element, origin);
        }

      }
    }

    //  Start the looping
    win.requestAnimationFrame(loop);
  }

  /**
   *  Smoothie!
   *  Attached to the window so it's easy to get started.
   *
   *  @param {Function} options.callback - Callback to run after scrolling
   *  @param {Number}   options.offset   - Base offset for scrolling
   */
  win.smoothie = (options) => {

    //  No need for more than one Smoothie to be active
    if (smoothieActive) {
      return;
    }

    //  Set Smoothie as active
    smoothieActive = true;

    //  Save the options for later
    smoothieCallback = options ? options.callback || null : null;
    smoothieOffset   = options ? options.offset || 0 : 0;

    //  Set up event listeners
    addListeners();
  };

  /**
   *  Complimentary method for invoking scrolls manually.
   *
   *  @param {Element|String} target - Element or selector for element
   */
  win.smoothie.to = (target) => {

    //  Scrolling to an actual element
    //  or a matching selector is a-ok
    if (target.nodeType || typeof target === "string") {
      scroll(target, win);
    }

  };
}(window));