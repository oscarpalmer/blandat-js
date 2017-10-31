# Blandat

[![npm version](https://badge.fury.io/js/blandat-js.svg)](https://badge.fury.io/js/blandat-js)

A collection of JavaScript goodies.

## Setup

Blandat is on [npm](//www.npmjs.com/package/blandat-js) and [yarn](//yarnpkg.com/en/package/blandat-js), but it's just as easy to simply grab the file you want from the [dist-folder](dist) and include it in your project.

## Smoothie

1. Include one of the Smoothie-files in your HTML
2. Add a `data-smoothie` attribute to an element that functions as a local link, with its value being an existing ID on the page
3. Call `smoothie();` in your ready-code

That's it!

### Offset

But what if you've got a fixed header and want Smoothie to scroll to the end of it to avoid cutting off your elements? Easy, just include an offset value in the options object, like so:

```js
smoothie({
  offset: 50
});
```

### Callback

And callbacks? Yup, they work as well, and are called after the scrolling has finished. Same thing, just include it in the options object:

```js
smoothie({
  callback: myCallback
});
```

## Older browsers

These scripts -- well, script -- uses a few things introduced in later version of [ECMAScript](//en.wikipedia.org/wiki/ECMAScript), so if you're unsure of what may or may not be supported, I'd recommend using the files compiled by [Babel](//babeljs.io) instead; these files follow the format of `script.babel.js`.

## License

[MIT Licensed](LICENSE). You're free to do whatever you'd like with these scripts. Have fun! :blush: