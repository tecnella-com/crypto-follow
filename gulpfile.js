/**
 * @description Tasks to automate processes in the creation of code
 * @module gulpfile
 */
/* **** declarations **** */
const gulp = require("gulp");
const clean = require("gulp-clean");
const concat = require("gulp-concat");
const strip = require("gulp-strip-comments");
const minify = require("gulp-minify");
const jsdoc = require("gulp-jsdoc3");
const eslint = require("gulp-eslint");
const format = require("@o2team/gulp-prettier-eslint");
const jsDocConfig = require("./src/jsDocConfig.json");

/* **** task on required **** */
/**
 * @namespace prettierEslint
 * @description This task takes the files declared in src,
 * applies the configuration declared in the pipe format using eslint more prettier,
 * delivers the result in dest to review it before implementing it.
 * Command to execute this task: gulp prettierEslint
 */
gulp.task("prettierEslint", function () {
    return gulp.src(["src/background-process/*.js", "src/content-script/*.js", "src/user-interface/*.js"])
        .pipe(format({
            eslintConfig: {
                parserOptions: {
                    ecmaVersion: 7
                },
                rules: {
                    indent: ["error", 4],
                    semi: ["error", "always"],
                    "comma-dangle": ["error", "never"],
                    "no-console": "error"
                }
            },
            prettierOptions: {
                bracketSpacing: true
            },
            fallbackPrettierOptions: {
                singleQuote: false
            }
        }))
        .pipe(gulp.dest("./test"));
});

/**
 * @namespace eslint
 * @description This task takes the files declared in src,
 * check the configuration declared in the pipe eslint and give you
 * the result in the terminal to review it.
 * Command to execute this task: gulp eslint
 */
gulp.task("eslint", function () {
    console.info("Executing eslint");
    return gulp.src(["src/background-process/*.js", "src/content-script/*.js", "/src/user-interface/*.js"])
        .pipe(eslint({
            rules: {
                // enable additional rules
                indent: ["error", 4],
                "linebreak-style": ["error", "unix"],
                quotes: ["error", "double"],
                semi: ["error", "always"],
                "no-unused-vars": "error",

                // override default options for rules from base configurations
                "comma-dangle": ["error", "never"],
                "no-cond-assign": ["error", "always"],

                // disable rules from base configurations
                "no-console": "error"
            },
            parserOptions: {
                ecmaVersion: 2017
            },
            env: {
                es6: true
            },
            globals: [
                "jQuery",
                "$"
            ]
        }))
        .pipe(eslint.formatEach("compact", process.stderr));
});

/* **** automatic task **** */
/**
 * @namespace doc
 * @description This task takes the files declared in src,
 * build the web documentation based on the comments with jsdoc structure
 * using the configuration declared in config = jsDocConfig,
 * put the result by default in "./dist/docs".
 * Command to execute this task: gulp doc
 * Is launched automatically when using the command: gulp
 */
gulp.task("doc", function (cb) {
    const config = jsDocConfig;
    gulp.src(["README.md",
        "./src/declarationsAndConfig/*.js",
        "./src/background-process/**/*.js",
        "./src/content-script/**/*.js",
        "./src/user-interface/**/*.js"], { read: true })
        .pipe(jsdoc(config, cb));
});

/**
 * @namespace clean
 * @description This task deletes the files or folders inside the dist folder
 * Command to execute this task: gulp clean
 * Is launched automatically when using the command: gulp
 */
gulp.task("clean", function () {
    console.info("Cleaning Dist folder");
    return gulp.src("./dist/*")
        .pipe(clean());
});

/**
 * @namespace dist
 * @description This task copies the files or folders inside of the src folder,
 * then paste on dest folder, if the file address start with "!" is ignore.
 * Command to execute this task: gulp dist
 * Is launched automatically when using the command: gulp
 */
gulp.task("dist", function () {
    console.info("Creating Dist");
    return gulp.src(
        ["./src/**/*", "!./src/content-script/**", "!./src/background-process/**",
            "!./src/user-interface/**", "!./src/declarationsAndConfig/**"]
    )
        .pipe(gulp.dest("./dist/"));
});

/**
 * @namespace backgroundProcess
 * @description It is a task that concat the files declared in src,
 * then removes the comments on them, then minifies them,
 * and finally places them in the destination folder with the indicated name (background.js)
 * Is launched automatically when using the command: gulp
 */
gulp.task("background-process", function () {
    return gulp.src(["./src/declarationsAndConfig/*.js",
        "./src/background-process/background-process-setup.js",
        "./src/background-process/others/*.js",
        "./src/background-process/background-process-main.js"])
        .pipe(concat("background.js"))
        .pipe(strip())
        .pipe(minify({
            ext: {
                src: "*.js",
                min: ".js"
            },
            noSource: true,
            mangle: true
        }))
        .pipe(gulp.dest("./dist/js/"));
});

/**
 * @namespace contentScript
 * @description It is a task that concat the files declared in src,
 * then removes the comments on them, then minifies them,
 * and finally places them in the destination folder with the indicated name
 * (contenScritpCryptoFollow.js)
 * Is launched automatically when using the command: gulp
 */
gulp.task("content-script", function () {
    return gulp.src(["./src/declarationsAndConfig/*.js",
        "./src/content-script/content-script-setup.js",
        "./src/content-script/others/*.js",
        "./src/content-script/content-script-main.js"])
        .pipe(concat("contenScritpCryptoFollow.js"))
        .pipe(strip())
        .pipe(minify({
            ext: {
                src: "*.js",
                min: ".js"
            },
            noSource: true,
            mangle: true
        }))
        .pipe(gulp.dest("./dist/js/"));
});

/**
 * @namespace userInterface
 * @description It is a task that concat the files declared in src,
 * then removes the comments on them, and finally places them in the destination
 *  folder with the indicated name (userInterface.js)
 * Is launched automatically when using the command: gulp
 */
gulp.task("user-interface", function () {
    return gulp.src(["./src/declarationsAndConfig/*.js",
        "./src/user-interface/user-interface-setup.js",
        "./src/user-interface/others/*.js",
        "./src/user-interface/user-interface-main.js"])
        .pipe(concat("userInterface.js"))
        .pipe(strip())
        .pipe(gulp.dest("./dist/js/"));
});

/**
 * @namespace default
 * @description This task do all the process to convert all the files
 * in the src folder to the application ready to deploy
 * Command to execute this task: gulp
 */
gulp.task("default", gulp.series("clean", "dist", "doc", "content-script", "user-interface", "background-process"));

/**
 * @namespace automatic
 * @description This task is continuously checking for changes in the src
 * folder, when a change is detected the default task is executed to recreate
 * the dist folder.
 * Command to execute this task: gulp automatic
 */
gulp.task("automatic", function () {
    gulp.watch("./", gulp.series("default"));
});
