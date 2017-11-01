(function (win) {
  const
  doc = win.document;

  let
  smoothieActive   = false,
  smoothieCallback,
  smoothieOffset;

  /**
   *  Add event listeners to all elements with
   *  with the data-attribute "smoothie"
   */
  function addListeners () {
    const
    elements = doc.querySelectorAll("[data-smoothie]"),
    {length} = elements;

    let
    index = 0;

    for (; index < length; index += 1) {
      elements[index].addEventListener("click", onClick);
    }
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
    //  so let's make it positive and return it
    return distance < 1 ? -distance : distance;

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
   *  Event handler for alla smoothie-elements
   */
  function onClick (event) {

    //  Prevent anchors or other linked events from firing
    event.preventDefault();

    const
    pageOffset    = win.pageYOffset,
    element       = event.target,
    targetId      = element.getAttribute("data-smoothie"),
    targetElement = getElement(targetId),
    targetOffset  = getOffset(targetElement),
    duration      = getDuration(targetOffset);

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
      distance = targetOffset * easing(elapsed / duration);

      //  Scroll to the calculated position:
      //  offset of window + distance
      win.scrollTo(0, pageOffset + distance);

      if (elapsed < duration) {

        //  Not finished; one more round
        win.requestAnimationFrame(loop);

      } else {

        //  Finished, but let's scroll to the defined offset
        //  to prevent the odd pixels here and there
        win.scrollTo(0, pageOffset + targetOffset);

        //  Call the user's callback when finished
        if (typeof smoothieCallback === "function") {
          smoothieCallback.call(event, element, targetElement);
        }
      }
    }

    //  Start the looping
    win.requestAnimationFrame(loop);
  }

  /**
   *  Smoothie!
   *  Attached to the window so it's easy to get started.
   */
  win.smoothie = function (options) {

    //  No need for more than one Smoothie to be active
    if (smoothieActive) {
      return;
    }

    //  Set Smoothie as active
    smoothieActive   = true;

    //  Save the options for later
    smoothieCallback = options ? options.callback || null : null;
    smoothieOffset   = options ? options.offset || 0 : 0;

    //  Set up event listeners
    addListeners();
  };
}(this));