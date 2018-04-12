# JeanFern's Folder Structure Bulbasaur
![Build Status](https://img.shields.io/badge/pokedex-001-brightgreen.svg)
![Build Status](https://img.shields.io/badge/version-1.0.0-brightgreen.svg)
![Build Status](https://img.shields.io/badge/running-gulp-brightgreen.svg)

JFS Bulbasaur - JeanFern's Folder Structure Bulbasaur is a very simple folder structure developed by Jean Fernandes.

## How To

> First of all, make sure you have everything you need installed in your computer - Node, Npm, Gulp.
* Node - https://nodejs.org/en/
* Npm - https://www.npmjs.com/get-npm
* Gulp - https://gulpjs.com/

1. Download the folder.
2. Using a Terminal (Command Prompt) to navigate to that folder.
3. run ```npm install```.
4. Relax and catch them all.
5. When thats done run ```gulp```.
7. A wild pokémon appeared! It's running!
8. When you finish your works run ```gulp build``` to get a `dist` folder with optimised and minified file versions.

### Good To Know:

* Pages should be developed in `dev/pages/` folder.
* Includes should be developed in `dev/includes/` folder.
* Adding an include to a page: `@@include('include.html')`.
* Inlining source in a page: use `inline` as a attribute. e.g: `<link type="text/css" rel="stylesheet" href="/files/css/critical.min.css" inline>`.
* Find sass helpful mixins inside `dev/files/scss/settings/_mixins.scss`.

## General
* All folder names should be lowercase and use hyphens.
* CSS name convention in use: http://getbem.com/
* Do not use ID selectors (they introduce an unnecessarily high level of specificity to your rule declarations, and they are not reusable).

## SCSS Descriptions

###Base

The `dev/files/scss/base/` folder holds all your base style for your project. There, we have a reset (Normalize.css) and base stylesheets that should be used accross the website.

Example:

* `_buttons.scss`
* `_content.scss`
* `_fonts.scss`
* `_forms.scss`
* `_normalize.scss`

###Components

For components, there is the `dev/files/scss/components/` folder . Tidy up there all components scss files – header, map, carousels, menus, etc.

Example:

* `_header.scss`
* `_footer.scss`
* `_navigation.scss`


### Plugins

The `dev/files/scss/plugins/` folder contains all the scss files from external libraries and frameworks – Slick Carousel, Fancybox and so on. These files should not be edited. Use your component stylesheets to overwrite any styles that you need to change.

Example:

* `_fancybox.scss`
* `_slick.scss`

### Settings

The `dev/files/scss/settings/` folder gathers all sass tools, helpers and all global variables for the project we’ll use across the project -  functions, mixins, variables etc.

Example:

* `_colors.scss`
* `_mixins.scss`
* `_typography.scss`
* `_variables.scss`

## JS Descriptions

###Plugins
`dev/files/js/plugins/` contains all the js files from external libraries and frameworks – Slick Carousel, Fancybox and so on. These files should not be edited. Use your settings to overwrite any thing that you need to change. They will be compiled and minified to a single file `dev/files/js/plugins.min.js`.

Best Practices:

* Do not put minified files in this folder. It will be compiled and minified by gulp.
* Specify the version being used in each file.

Example:

* `_slick.js`
* `_fancybox.js`

###Settings
The `dev/files/js/settings/` folder should contain all the JS files written by you. They will be compiled and minified to a single file `dev/files/js/settings.min.js`.

Best Practices:

* Every component and/or page should have its own file.
* Page files should use more specific names. e.g: `$('.pagename .componentname').remove();`.
* You can create subfolders - but be careful.
* It'll be compiled by alphabetic order - be careful with that.

Example:

* `_index.js`
* `_header.js`