# Ember.js Templates

/assets/About-blend.png
background: true

---

/assets/MainMatter-logo-Negative.svg
size: contain

	https://mainmatter.com
	@mainmatter

/assets/About-blend.png
background: true

---

	Ember.js uses Handlebars (or actually a dialect of it with some added syntax and features) for its templating
	[http://handlebarsjs.com](http://handlebarsjs.com)

---

	Ember.js templates combine static HTML and dynamic content expressions which are invoked with double curly braces
	`{{ }}`

---

## Template Context
	is where values that are used in dynamic content expression are retrieved from

---

	**The template context in Ember.js is always either a component or a controller**

---

```js
// app/controllers/song.js
import Controller from '@ember/controller';

export default class SongController extends Controller {
  name = 'The Greatest Love of All';
  coverUrl = 'https://upload.wikimedia.org/…';
}
```

---

```hbs
{{!-- app/templates/song.hbs --}}
<h4>{{this.name}}</h4>

<img src="{{this.coverUrl}}">
```

	`this.name` & `this.coverUrl` are values read from the context (the controller)

this is the component's template

---

/assets/Clipboard_1.png
size: contain

---

## Handlebars Helpers
	can be used from any context

---

	Handlebars comes with several helpers for conditionals, collections etc. built-in

---

```hbs
{{#if this.song}}
  <h1 class="{{if this.song.isFavorite 'fav'}}">
    {{this.song.title}}
  </h1>
{{else if this.movie}}
  <h1>{{this.movie.title}}</h1>
{{else}}
  <h1>Unknown Media</h1>
{{/if}}
```

---

```hbs
{{#unless this.song}}
  Unknown Song
{{/unless}}
```

---

```hbs
{{#each this.songs as |song index|}}
  {{index}}: {{song.title}}
{{else}}
  You have no songs yet...
{{/each}}
```

---

	Ember.js also defines additional helpers, e.g. `get`, `let`, `array`, `concat`

---

## Modifiers
	allow linking application code to DOM elements

as we don't only want to keep the DOM in sync with the app data but also react to events happening in the DOM

---

	The `{{on}}` modifier connects methods defined in the template context ("actions") to native browser events on DOM nodes

---

	lookup `applyChanges ` action in the template's context
```hbs
{{!-- app/templates/song/edit.hbs --}}
<button {{on "click" this.applyChanges}}>Apply</button>

<button {{on "click" this.discardChanges}}>Cancel</button>
```
	`on "click"` connects the action to the click even of the button

in older Ember there are no modifiers but you'd be using the action helpers

---

```js
// app/controllers/song/edit.js
import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class SongEditController extends Controller {
  @action
  applyChanges(e) {
    // e is the native browser event
  },

  @action
  discardChanges(e) {
    // e is the native browser event
  }
}
```

---

	actions in old Ember would go under the actions key

---

	Dynamic content expressions are "reactive" so that the generated DOM is automatically updated when the expression's value changes

the value must be marked as tracked for that though

---

```js
// app/controllers/song/edit.js
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SongEditController extends Controller {
  @tracked
  name = 'The Greatest Love of All';

  @action
  changeFavoriteSong() {
    this.name = 'Bodyguard';
  }
}
```

- whenever the value itself (or any derived values) change, the DOM is updated
- be aware that `@tracked` overrides setter so you cannot mutate the value bust must reassign

---

## Development Helpers
	help debugging templates

---

	Logging from templates
	`{{log 'Song title is: ' this.song.title}}`

---

	Stopping in the debugger
	`{{debugger}}`
	stops in the debugger - use `get` and `context` to access the template context or retrieve individual values

---

### Custom Helpers
	can be used to extend the functionality the built-in helpers provide

---

	Helpers are most often used for formatting raw values; more complex scenarios are usually not a good fit for helpers and should be implemented as components instead

---

	Helpers are defined in `app/helpers/` by either extending the Helper base class or with the helper function

---

	Helpers accept an arbitrary number of arguments and an optional hash of named parameters - arguments are typically used to pass values while options that configure the helper's behavior are passed as named parameters

---

```js
// app/helpers/yell.js
import helper from '@ember/component/helper';

function yell([text], { mad }) {
  let toYell = text.toUpperCase();

  if (params.mad) {
    toYell = `${toYell}!!!`;
  }

  return toYell;
}

export default helper(yell);
```

---

```hbs
{{yell this.song.title mad=true}} {{!-- => HYPER HYPER!!! --}}
```

---

	Helpers defined with `helper` are stateless and do not have access to services etc. while helpers defined as subclasses of `Helper` can have state and do have access to services

---

	These class based helpers must define a `compute` method that has the same characteristics as the function passed to `helper`

---

```js
// app/helpers/yell.js
import Helper from '@ember/component/helper';

export default class Yell extends Helper {
  compute([text], { mad }) {
    let toYell = text.toUpperCase();

    if (params.mad) {
      toYell = `${toYell}!!!`;
    }

    return toYell;
  }
}
```

This is equivalent to the previously shown helper

---

# Demo
	https://github.com/simplabs/ember-workshop/tree/master/examples/templates

Use the Ember Inspector to have a look at the internals of the demo application

---

# Practice Session
	Render a list of albums and their songs and handle clicks on albums and songs

// https://github.com/simplabs/ember-workshop/commit/736c99c4712e3170140e29a927d0735d62de2626  
you can use `this.model` in the index.hbs template

---

/assets/MainMatter-logo-Negative.svg
size: contain

	https://mainmatter.com
	@mainmatter

/assets/About-blend.png
background: true