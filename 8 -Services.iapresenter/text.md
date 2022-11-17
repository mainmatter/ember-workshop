# Services

---

/assets/Clipboard_1.png
size: contain

[https://simplabs.com](https://simplabs.com)
[@simplabs](https://twitter.com/simplabs)

---

	- Services are long lived singletons that can be used (almost) everywhere in the application

---

	- They are typically used to encapsulate functionality that different parts of the application need access to, e.g. logging, error tracking or authentication

---

	As services are singletons they can also be used to encapsulate shared state, e.g. the current locale

---

	Services that encapsulate shared state are basically globals though and introduce all of the common problems associated with globals

---

	Also services should not be used to break down framework boundaries

---

```js
// app/services/error-reporting.js
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ErrorReportingService extends Service {
  @tracked errors = [];

  get errorCount() {
    return this.errors.length;
  }

  reportError(error) {
    this.errors = [
      ...this.errors,
      error
    ];
  }
}
```

Service that tracks errors

---

### Service backed Components
	are a way to preserve component state beyond the component's lifetime

---

	As a component is destroyed e.g. when the route it is rendered on is exited, its state is reset to the initial value once the component is rendered again later

---

	In order to keep state beyond a component's lifecycle, that state can be moved into a service

---

	Services are injected into classes that want to use them via `@service`

---

```
import Component from "@glimmer/component";
import Service, { inject as service } from '@ember/service';
import { action } from "@ember/object";

export default class ErrorComponent extends Component {
  // ⬇️ Inject the service
  @service errorReporting;

  get errors() {
    // ⬇️ Errors are kept in the service and are still present after the component was destroyed
    return this.errorReporting.errors;
  }

  @action
  reportError(error) {
    this.errorReporting.reportError(error);
  }
}
```

---

# Demo
[https://github.com/simplabs/ember-workshop/tree/master/examples/services](https://github.com/simplabs/ember-workshop/tree/master/examples/services)

Use the Ember Inspector to have a look at the internals of the demo application

---

# Practice Session
	Add a component that is always visible and plays a song using a service (optional: persist the currently playing song in `localStorage` so that it is restored after a page reload)

@ [https://github.com/simplabs/ember-workshop/commit/7fe0326c2cc610e409d664e404489a1814f0a732](https://github.com/simplabs/ember-workshop/commit/7fe0326c2cc610e409d664e404489a1814f0a732)

(fake dev data has mp3 urls already)
(you can use an audio element for playing the music)

@ `git reset --hard step-4`