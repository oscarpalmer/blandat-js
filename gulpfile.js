const
gulp     = require("gulp"),
babel    = require("gulp-babel"),
composer = require("gulp-uglify/composer"),
eslint   = require("gulp-eslint"),
rename   = require("gulp-rename"),
pump     = require("pump"),
uglify   = require("uglify-es"),

//  Uglify + ES6+
minify   = composer(uglify, console);

["knuff", "smoothie"].forEach( (name) => {

  gulp.task(name, () => {

    //  Task for finding errors and problems in a script,
    //  though it will still run the minification and babel tasks
    pump([,
      gulp.src("src/" + name + ".js"),
      eslint(),
      eslint.format(),
      eslint.failAfterError()
    ]);

    //  Task for minifying the
    //  ES6+ friendly version of the script
    pump([,
      gulp.src("src/" + name + ".js"),
      minify(),
      rename(name + ".min.js"),
      gulp.dest("dist")
    ]);

    //  Task for running a script through Babel,
    //  and then minifying it for older browsers
    pump([,
      gulp.src("src/" + name + ".js"),
      babel({ presets: ["env"] }),
      minify(),
      rename(name + ".babel.js"),
      gulp.dest("dist")
    ]);

  });
});