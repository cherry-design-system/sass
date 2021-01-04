const { gulp, series, parallel, dest, src, watch } = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const cssnano = require("gulp-cssnano");
const autoprefixer = require("gulp-autoprefixer");

/* -------------------------------------------------------------------------------------------------
Development Tasks
-------------------------------------------------------------------------------------------------- */
function startWatching() {
	watch("./src/**/*.scss", stylesDev);
}

function stylesDev() {
	return src("./src/cherry.scss")
		.pipe(sourcemaps.init())
		.pipe(sass({ includePaths: "node_modules" }).on("error", sass.logError))
		.pipe(
			autoprefixer({
				cascade: false,
			})
		)
		.pipe(sourcemaps.write("."))
		.pipe(dest("./dist"));
}
exports.dev = series(stylesDev, startWatching);

/* -------------------------------------------------------------------------------------------------
Build Tasks
-------------------------------------------------------------------------------------------------- */
function stylesBuild() {
	return src("./src/cherry.scss")
		.pipe(sass({ includePaths: "node_modules" }).on("error", sass.logError))
		.pipe(
			autoprefixer({
				cascade: false,
			})
		)
		.pipe(cssnano())
		.pipe(dest("./dist"));
}

exports.build = series(stylesBuild);
