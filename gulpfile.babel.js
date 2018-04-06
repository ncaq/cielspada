import path from 'path';

import gulp from 'gulp';
import del from 'del';
import htmlmin from 'gulp-htmlmin';
import cssmin from 'gulp-cssmin';
import svgmin from 'gulp-svgmin';
import { default as uglify } from 'gulp-uglify-es';

//
// 設定
//

// ソースディレクトリ
const SOURCE_DIR = 'src';

// ビルド先ディレクトリ
const BUILD_DIR = 'build';

//
// タスク
//

// ビルドディレクトリを削除するタスク
function clean() {
  return del([BUILD_DIR]);
}

// フィアルをコピーするタスク
function copy() {
  return gulp.src([
      path.join(SOURCE_DIR, '**/*'),
      path.join(SOURCE_DIR, '**/.*'),
      `!${path.join(SOURCE_DIR, '**/*.html')}`,
      `!${path.join(SOURCE_DIR, '**/*.css')}`,
      `!${path.join(SOURCE_DIR, '**/*.svg')}`,
      `!${path.join(SOURCE_DIR, '**/*.js')}`
    ],
    { base: SOURCE_DIR }
  ).pipe(gulp.dest(BUILD_DIR));
}

// HTMLファイルをminifyするタスク
function minifyHtml() {
  const options = {
    collapseWhitespace: true, // 空白を消す
    removeComments: true, // コメントを削除する
    minifyJS: true // HTML内のJavaScriptをminifyする
  };

  return gulp.src(path.join(SOURCE_DIR, '**/*.html'))
    .pipe(htmlmin(options))
    .pipe(gulp.dest(BUILD_DIR));
}

// CSSファイルをminifyするタスク
function minifyCss() {
  return gulp.src(path.join(SOURCE_DIR, '**/*.css'))
    .pipe(cssmin())
    .pipe(gulp.dest(BUILD_DIR));
}

// JSファイルをminifyするタスク
function minifyJs() {
  return gulp.src(path.join(SOURCE_DIR, '**/*.js'))
    .pipe(uglify())
    .pipe(gulp.dest(BUILD_DIR));
}

// SVGファイルをminifyするタスク
function minifySvg() {
  return gulp.src(path.join(SOURCE_DIR, '**/*.svg'))
    .pipe(svgmin())
    .pipe(gulp.dest(BUILD_DIR));
}

export const build = gulp.series(clean, gulp.parallel(copy, minifyHtml, minifyCss, minifyJs, minifySvg));