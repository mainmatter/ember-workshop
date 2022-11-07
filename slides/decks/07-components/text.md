# Components

---

&shy;<!-- .element: class="r-stretch" --> ![](assets/mainmatter-logo.svg)

https://mainmatter.com

@mainmatter

---

- Components are reusable UI elements that combine both a template and associated logic
- They are isolated from their surroundings and provide an interface for setting attributes and subscribing actions to events that they trigger
- Ember's components are modeled after the W3C Custom Elements spec (aka Web Components) that will eventually be supported in browsers natively

---

&shy;<!-- .element: class="r-stretch" --> ![](assets/web_components_logo.svg)

---

Components (like W3C Custom Elements) must have at least one dash in their name to distinguish them from native elements

---

```hbs

<SongTile @song={{currentSong}} />

```
<!-- .element: class="r-syntax-octane" -->

[https://github.com/rwjblue/ember-angle-bracket-invocation-polyfill](https://github.com/rwjblue/ember-angle-bracket-invocation-polyfill)

***

```hbs

{{song-title song=currentSong}}

```
<!-- .element: class="r-syntax-classic" -->

---

### Defining a component

in an Ember.js application

---

Components are defined by creating a template in `app/components/<component-name>/template.hbs` and (optionally) a backing class in `app/components/<component-name>/component.js`

---

```hbs
<h4>{{@song.name}}</h4>

{{#if this.isGreat}}
  <i class="star-icon"/>
{{/if}}

<img src="{{@song.coverUrl}}">
```

---

Components must extend Ember’s (Glimmer’s really) Component class

---

```js
import Component from '@glimmer/component';

export default class SongComponent extends Component {
  // ...
}
```
<!-- .element: class="r-syntax-octane" -->

***

```js
import Component from '@glimmer/component';

export Component.extend({
  // ...
})
```
<!-- .element: class="r-syntax-classic" -->

---

### Setting a component's data

As components are isolated from their surroundings, all data they need must be set externally

---

```hbs
<SongTile @song={{currentSong}} />
```
<!-- .element: class="r-syntax-octane" -->

Use `@song={{currentSong}}` to set the component's `song` attribute. The `@` prefix distinguishes a component's arguments from HTML attributes

***

```hbs
{{song-title song=currentSong}}
```
<!-- .element: class="r-syntax-classic" -->

Use `song=currentSong` to set the component's `song` attribute.

---

```hbs
<SongTile @song={{currentSong}} class="song-element" />
```
<!-- .element: class="r-syntax-octane" -->

will set the class on the component's root element

***

```hbs
{{song-title song=currentSong class="song-element"}}
```
<!-- .element: class="r-syntax-classic" -->

will set the class on the component's root element

---

Where HTML attributes are inserted can be controlled via the "splattributes" mechanism

```hbs
<div ...attributes>
  <h4>{{@song.name}}</h4>

  {{#if this.isGreat}}
    <i class="star-icon"/>
  {{/if}}

  <img src="{{@song.coverUrl}}">
</div>
```

---

All external attributes that are set on a component are available as properties with the same name in the component

---

```hbs
{{!-- app/templates/components/song-tile/template.hbs --}}
<h4>{{@song.name}}</h4>
<img src={{@song.coverUrl}}>
```

---

Actions that are assigned to events of the component are also accessible via the respectively named properties

---

```hbs
<SongTile
  @song={{currentSong}}
  @onRatingChange={{fn this.setSongRating song}}
/>
```
<!-- .element: class="r-syntax-octane" -->

The `@onRatingChange={{fn this.setSongRating song}}` argument assigns an action

***

```hbs
{{song-title
  song=currentSong
  onRatingChange=(action this.setSongRating song)
}}
```
<!-- .element: class="r-syntax-classic" -->

The onRatingChange=(action this.setSongRating song)` argument assigns an action

---

```js
import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class SongComponent extends Component {
  @action
  makeFavorite() {
    this.args.onRatingChange();
  }
}
```
<!-- .element: class="r-syntax-octane" -->

Call the assigned action using `this.args.onRatingChange();`

***

```js
import Component from '@glimmer/component';

export default Component.extend({
  actions: {
    makeFavorite() {
      this.args.onRatingChange();
    },
  },
})
```
<!-- .element: class="r-syntax-classic" -->

Call the assigned action using `this.args.onRatingChange();`

---

### Components with blocks

---

Components can also accept blocks so that nested structures can be built

```hbs
<SongTile @song={{currentSong}}>
  Details: {{currentSong.notes}}
</SongTile>
```
<!-- .element: class="r-syntax-octane" -->

***

Components can also accept blocks so that nested structures can be built

```hbs
{{#song-title song=currentSong}}
  Details: {{currentSong.notes}}
{{/song-tile}}
```
<!-- .element: class="r-syntax-classic" -->

---

To insert the provided block in the component's template, use the yield keyword

```hbs
<h4>{{@song.name}}</h4>
<img src={{@song.coverUrl}}>

<div class="additional">
  {{yield}}
</div>
```
<!-- .element: class="r-syntax-octane" -->

***

To insert the provided block in the component's template, use the yield keyword

```hbs
<h4>{{this.song.name}}</h4>
<img src={{this.song.coverUrl}}>

<div class="additional">
  {{yield}}
</div>
```
<!-- .element: class="r-syntax-classic" -->

---

The component can use the `hasBlock` attribute to determine whether a block was passed or not

```hbs
<h4>{{@song.name}}</h4>
<img src={{@song.coverUrl}}>

{{#if hasBlock}}
  <div class="additional">
    {{yield}}
  </div>
{{/if}}
```
<!-- .element: class="r-syntax-octane" -->

***

The component can use the `hasBlock` attribute to determine whether a block was passed or not

```hbs
<h4>{{this.song.name}}</h4>
<img src={{this.song.coverUrl}}>

{{#if hasBlock}}
  <div class="additional">
    {{yield}}
  </div>
{{/if}}
```
<!-- .element: class="r-syntax-octane" -->


---

Components can also pass arguments to blocks

```js
// app/components/modern-browser-guard/component.js
import Component from '@glimmer/component';

export default class ModernBrowserGuardComponent extends Component {
  browser = navigator.userAgent;

  get isModernBrowser() {
    return this.browser.indexOf('MSIE') === -1;
  }
}
```
<!-- .element: class="r-octane-classic" -->

```hbs
{{!-- app/templates/components/modern-browser-guard.hbs --}}
{{#if this.isModernBrowser}}
  {{yield this.theBrowser}}
{{else}}
  Update your browser!
{{/if}}
```

***

Components can also pass arguments to blocks

```js
// app/components/modern-browser-guard/component.js
import Component from '@glimmer/component';
import { computed } from '@ember/object';

export default Component.extend({
  browser: navigator.userAgent;

  isModernBrowser: computed(function() {
    return this.browser.indexOf('MSIE') === -1;
  })
}
```
<!-- .element: class="r-syntax-classic" -->

```hbs
{{!-- app/templates/components/modern-browser-guard.hbs --}}
{{#if this.isModernBrowser}}
  {{yield this.theBrowser}}
{{else}}
  Update your browser!
{{/if}}
```

---

```hbs
<ModernBrowserGuard as |browser|>
  <AudioPlayer @song={{currentSong}} @browser={{browser}} />
</ModernBrowserGuard>
```
<!-- .element: class="r-syntax-octane" -->

***

```hbs
{{#modern-browser-guard as |browser|}}
  {{audio-player song=currentSong browser=browser}}
{{/modern-browser-guard}}
```
<!-- .element: class="r-syntax-classic" -->

---

### The Component Lifecycle

Unlike controllers, components are not singletons and will be created, inserted into the doc, updated (re-rendered) and destroyed as needed

---

`ember-render-modifiers`

provides a set of special modifiers that can be used to react to those events in the component’s JavaScript code

`ember install ember-render-modifiers`

***

`Ember.Compnent` hooks:

* `didInsertElement`

---

`did-insert`

is called after the template has rendered initially and the element has been inserted into the DOM

---

```hbs
<div {{did-insert this.fadeIn}}>
  {{yield}}
</div>
```

```js
// app/components/fade-in/component.js
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class FadeInComponent extends Component {
  @action
  fadeIn(element) {
    element.classList.add('fade-in');
  }
}
```

***

`did-insert`

is called after the template has rendered initially and the element has been inserted into the DOM

---

```hbs
<div {{did-insert this.fadeIn}}>
  {{yield}}
</div>
```

```js
// app/components/fade-in/component.js
import Component from '@glimmer/component';

export default Component.extend({
  actions: {
    fadeIn(element) {
      element.classList.add('fade-in');
    }
  }
})
```

---

`did-update`

can be used to run code when a particular value changes

---

```hbs
<textarea {{did-update this.resizeArea @text}}>
  {{@text}}
</textarea>
```

```js
// app/components/textarea/component.js
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class TextareaComponent extends Component {
  @action
  resizeArea(element) {
    element.style.height = `${element.scrollHeight}px`;
  }
}
```
<!-- .element: class="r-syntax-octane -->

***

`did-update`

can be used to run code when a particular value changes

---

```hbs
<textarea {{did-update this.resizeArea @text}}>
  {{@text}}
</textarea>
```

```js
// app/components/textarea/component.js
import Component from '@glimmer/component';

export default Component.extend({
  actions: {
    resizeArea(element) {
      element.style.height = `${element.scrollHeight}px`;
    };
  },
})
```
<!-- .element: class="r-syntax-classic" -->

---

`will-destroy`

is called before the component is destroyed and the element will be removed from the DOM

---

### Data Down, Actions Up

is the guiding principle for using components

---

Historically, Ember.js used (and is still using) 2 way data bindings by default

Note:

2 way bindings mean a connection between references where each side can change and will update the other side, e.g.
property on a model that's bound to a text field - if model change, text field updated, if user changes text field, value in model updates

---

While 2 way data bindings make building consistent interfaces simple, they tend to make applications more complex and harder to understand

---

The recommended approach for passing data and making modifications to it is to only pass data down in a read-only way in the hierarchy and send notifications of changes up in the hierarchy via actions

---

This approach is referred to as Data Down, Actions Up

---

What that means is that data only flows top down in the view hierarchy and lower levels in the hierarchy do not directly modify the data

---

Instead, lower levels send actions up the hierarchy to notify higher levels that certain events occurred which might lead to the data being modified

---

This change is then performed by the level in the hierarchy that *"owns"* the data

---

Any changes made will be synced back down the hierarchy through the read-only (one way) data bindings

---

Data down

```hbs
<SongTile
  @song={{currentSong}}
  @onRatingChange={{fn this.setSongRating currentSong}}
/>
```
<!-- .element: class="r-syntax-octane" -->

***

Data down

```hbs
{{song-title
  song=currentSong
  onRatingChange=(action this.setSongRating currentSong)
}}
```
<!-- .element: class="r-syntax-classic" -->

Actions up

---

Actions up

```js
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SongComponent extends Component {
  @tracked rating = null;

  @action
  makeFavorite() {
    this.args.onRatingChange(this.rating);
  }
}
```
<!-- .element: class="r-syntax-octane" -->

Note:

we’re ignoring *how* the rating is changed within the component – maybe a select box

***

Actions up

```js
import Component from '@glimmer/component';

export default Component({
  rating: null,

  actions: {
    makeFavorite() {
      this.args.onRatingChange(this.rating);
    },
  },
})
```
<!-- .element: class="r-syntax-classic" -->

Note:

we’re ignoring *how* the rating is changed within the component – maybe a select box

---

Modify the data

```js
import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class SongController extends Controller {
  @action
  setSongRating(song, rating) {
    song.rating = rating;
  }
}
```
<!-- .element: class="r-syntax-octane" -->

***

Modify the data

```js
import Controller from '@ember/controller';

export default Controller({
  actions: {
    setSongRating(song, rating) {
      song.set('rating', rating);
    },
  },
}
```
<!-- .element: class="r-syntax-classic" -->

---

# Demo

[https://github.com/simplabs/ember-workshop/tree/master/examples/components](https://github.com/simplabs/ember-workshop/tree/master/examples/components)

---

### Composing Components

to build complex UIs

---

Modern Ember.js applications consist of many nested components that together render complex UIs

---

Components are nested using their block form, passing data down from components higher in the hierarchy to ones lower in the hierarchy, following the Data Down principle

---

Data down

```hbs
<ListView @items={{songs}} as |item|>
  <SongTile @song={{item}} />
</ListView>
```
<!-- .element: class="r-syntax-octane" -->

Data down

***

```hbs
{{#list-view items=songs as |item|}}
  {{song-title song=item}}
{{/list-view}}
```
<!-- .element: class="r-syntax-classic" -->

---

In order to notify components higher in the hierarchy of changes from ones lower in the hierarchy, actions are used, following the Actions Up principle

---

Components can even yield actions that can then be used in the block to bind them to events of other components 

---

Actions up: `@onClick={{removeItem}}`

```hbs
<ListView
  @items={{songs}}
  @selectedItem={{mySong}}
  as |item removeItem|
>
  <SongTile @song={{item}} @onClick={{removeItem}} />
</ListView>
```
<!-- .element: class="r-syntax-octane" -->

Note:

`ListView` handles a selected item, `SongTile` has support for selecting - here we connect the 2

***

Actions up: `@onClick={{removeItem}}`

```hbs
{{#list-view
  items=songs
  selectedItem=mySong
  as |item removeItem|
}}
  {{song-title song=item onClick=removeItem}}
{{/list-view}}
```
<!-- .element: class="r-syntax-classic" -->

Note:

`ListView` handles a selected item, `SongTile` has support for selecting - here we connect the 2

---

By leveraging these patterns, complex applications can be built as nested structures of independent components

---

These applications will still be relatively easy to understand as they build on a clear data flow, following the Data Down, Actions Up principle

---

# Demo

[https://github.com/simplabs/ember-workshop/tree/master/examples/component-composition](https://github.com/simplabs/ember-workshop/tree/master/examples/component-composition)

Note:

Use the Ember Inspector to have a look at the internals of the demo application

---

# Practice Session

Use components to display albums and songs;

also add comments to albums and a component that creates a new comment for an album

(optional: display the average rating for each album)

Note:

[https://github.com/simplabs/ember-workshop/commit/5906f7d0a11d0b88dc93b14d38eb34dc00960156](https://github.com/simplabs/ember-workshop/commit/5906f7d0a11d0b88dc93b14d38eb34dc00960156)

(the server handles comments already)

`git reset --hard step-3`