/assets/Simplabs Logo.png
size: contain
	https://simplabs.com
	@simplabs

---

# Ember.js Core Concepts

---

/assets/Clipboard_1.png
size: contain

---

## The Router
	describes the application's route hierarchy and maps URLs to Ember.js routes

---

/assets/Clipboard_2.png
size: contain

---

## Routes
	load models and render templates

---

/assets/Clipboard_3.png
size: contain

---

## Models
	represent persistent state

---

/assets/Clipboard.png
size: contain

---

## Templates
	render a DOM

---

/assets/Clipboard_4.png
size: contain

---

## Controllers
	implement logic that can be used in templates

will be deprecated once routable components land and removed in the following major release

---

/assets/Clipboard_5.png

---

## Components
	combine a template and associated code as a reusable UI element

---

/assets/Clipboard_6.png

---

/assets/Clipboard_7.png
size: contain

---

## Ember CLI
	http://ember-cli.com

---

	Ember CLI is Ember.js' command line interface and build tool

---

	it provides a standard project/directory structure

---

	`app/`
	contains the application code

---

	`app/app.js`
	is the application's entry point

---

	`app/index.html`
	is the single page of the Single Page App which starts the Ember application

---

	`app/styles`
	contains the application's stylesheets

the stylesheets can also be written in LESS or SASS

---

	`app/router.js`
	contains the route configuration; the routes defined here correspond to routes in `app/routes/`

---

	`app/routes`
	contains the application's routes

---

	`app/templates`
	contains the application's route templates

---

	`app/models`
	contains the application's models

---

	`app/controllers`
	contains the application's controllers

---

	`app/components`
	contains the application's components

---

	`dist/`
	is where the distributable which is deployed to a server is placed by the build process

---

	`public/`
	contains static assets such as images, fonts etc.

---

	for the above example app this looks roughly like this:
```txt
app
├── app.js
├── controllers
│   └── songs.js
├── components
│   └── song-tile
|       └── template.hbs
├── index.html
├── models
│   └── song.js
├── router.js
├── routes
│   └── songs.js
├── styles
│   └── app.css
└── templates
    ├── application.hbs
    └── songs.hbs
```

(some files are left out intentionally)

---

	Each of the (JavaScript) files in `app/` is a separate JavaScript module

---

	All these modules are transpiled to AMD modules and combined in one file
	`<app-name>.js` that's loaded from index.html

---

```html
<script src="assets/vendor.js"></script>
<script src="assets/song-list.js"></script>
```

vendor.js contains Ember itself and other dependencies

---

```js
// ...
define(
  'song-list/models/song',
  ['exports', 'ember-data'],
  function(exports, _emberData) {
    var attr = _emberData['default'].attr;
    exports['default'] = _emberData['default'].Model.extend({
      name: attr('string'),
      cover: attr('string')
    });
  }
);
// ...
```

don’t need to understand this in detail

---

	Ember CLI also provides a command line utility for common tasks

---

```txt
ember new <my-app>
```
	creates a new application

---

```txt
ember test
```
	runs the application's tests

---

```txt
ember serve
```
	starts the application

---

```txt
ember generate <element>
```
	creates an element of the application incl. tests etc., e.g. controllers, components etc.

---

## Demo
	https://github.com/simplabs/ember-workshop/tree/master/examples/core-concepts

---

## Practice Session
	Use the Ember Inspector to look at the internals of the application and understand what is going on

---

/assets/Simplabs Logo.png
size: contain
	https://simplabs.com
	@simplabs