# Testing

---

&shy;<!-- .element: class="r-stretch" --> ![](assets/mainmatter-logo.svg)

https://mainmatter.com

@mainmatter

---

Ember.js supports 4 kinds of automated tests

---

## Unit Tests

test isolated chunks of functionality in non-Ember specific code

these are really just general QUnit/Mocha tests

---

## Container Tests
	
test interaction between parts of the application without actually running the full application

---

## Render Tests

allow rendering components or helpers and assert and interact with the resulting DOM

---

## Application Tests

test user interaction and application flow by actually running the full application and simulating a user interacting with it

---

## QUnit

is Ember.js' default testing framework

[http://qunitjs.com](http://qunitjs.com)

---

Ember.js adds a few helpers that make testing applications using QUnit easier

---

## mocha

can be used instead of QUnit with the ember-cli-mocha addon

---

All test files are located in the project's tests/ folder and have to end in `*-test.js`

---

## ESLint

enforces clean code

---

Ember.js automatically runs ESLint against the application's source code, enforcing clean code

---

## Running tests

with Ember CLI

---

`ember test`

runs the tests on the command line with headless Chrome

---

```txt
ok 1 Chrome 75.0 - [178 ms] - Integration | Component | hey-ho: it renders
ok 2 Chrome 75.0 - [0 ms] - ESLint | app: app.js
ok 3 Chrome 75.0 - [1 ms] - ESLint | app: components/hey-ho.js
ok 4 Chrome 75.0 - [0 ms] - ESLint | app: controllers/index.js
ok 5 Chrome 75.0 - [0 ms] - ESLint | app: resolver.js
ok 6 Chrome 75.0 - [0 ms] - ESLint | app: router.js
ok 7 Chrome 75.0 - [0 ms] - ESLint | app: routes/index.js
ok 8 Chrome 75.0 - [0 ms] - TemplateLint: my-app/templates/application.hbs
ok 9 Chrome 75.0 - [0 ms] - TemplateLint: my-app/templates/components/hey-ho.hbs
ok 10 Chrome 75.0 - [1 ms] - TemplateLint: my-app/templates/index.hbs
ok 11 Chrome 75.0 - [0 ms] - TemplateLint: my-app/templates/loading.hbs
ok 12 Chrome 75.0 - [0 ms] - ESLint | tests: integration/components/hey-ho-test.js
ok 13 Chrome 75.0 - [0 ms] - ESLint | tests: test-helper.js
ok 14 Chrome 75.0 - [0 ms] - ESLint | tests: unit/controllers/index-test.js
ok 15 Chrome 75.0 - [24 ms] - Unit | Controller | index: it exists

1..15
# tests 15
# pass  15
# skip  0
# fail  0

# ok
```

---

`ember test --server`

runs the tests in a headful Chrome

---

&shy;<!-- .element: class="r-stretch" --> ![](assets/qunit_html_reporter_screenshot.svg)

---

Running tests in headless Chrome is great for CI systems; always run `ember test --server` during development

---

## QUnit

---

QUnit organizes tests in modules that e.g. can be filtered by in the browser UI

---

```js
import { module, test } from 'qunit';

module('truth tests', function() {
  test('true is true', function(assert) {
    assert.ok(true);
  });

  test('not false is true', function(assert) {
    assert.ok(!false);
  });
});
```

---

Test cases are implemented via the `test` method

---

The `test` method receives the assert method as its first argument and uses that to express expectations on values

---

```js
import { module, test } from 'qunit';

module('truth tests', function() {
  test('true is true', function(assert) {
    assert.ok(true);
  });

  test('not false is true', function(assert) {
    assert.ok(!false);
  });
});
```

- `test()` calls are the test cases
- in `function(assert) { ... }`, `assert` gets passed as an argument
- `assert.ok(true);` asserts that `true` is a truth value

---

QUnit provides a number of assertion methods

---

```js
assert.ok
assert.notOk
assert.equal
assert.deepEqual
assert.throws
…
```

---

## Unit Tests

---

- Unit Tests test parts of the application in isolation by invoking its functionality and asserting on the result
- Unit test files are located in `tests/unit/`

---

```js
// tests/unit/utils/format-duration-test.js
import { formatDuration } from '../../../utils/format-duration';
import { module, test } from 'qunit';

module('Unit | Helper | format duration', function(hooks) {
 test('formats a duration in milliseconds', function(assert) {
    let result = formatDuration(4230000);

    // ⬇️
    assert.equal(result, '70:30');
  });

  test('inserts leading zeroes', function(assert) {
    let result = formatDuration(5000);
   
    // ⬇️
    assert.equal(result, '00:05');
  });
});
```

The two `assert.equal()` calls assert that the helper formats milliseconds correctly

---

## The Container

---

When an Ember.js application starts, it creates a container object that holds all the individual elements that make up the application, e.g. routes, templates, models, etc.

---

&shy;<!-- .element: class="r-stretch" --> ![](assets/ember_inspector_screenshot.svg)

---

Ember uses the container when it needs an instance of an element of the application (e.g. a controller) or needs to resolve an injection (e.g. a service)

---

Qunit does not know about Ember’s container so we need to set it up in tests

---

```js
// ⬇️ Standard QUnit
import { module, test } from 'qunit';
// ⬇️ Ember-specific
import { setupTest } from 'ember-qunit';

// Standard QUnit ⬇️
module('Unit | Controller | index', function(hooks) {
  // ⬇️ Ember-specific
  setupTest(hooks);

  // ⬇️ Standard QUnit
  test('it exists', function(assert) {
    // ...
  });
});
```

so the container is now setup

…but more…

---

```js
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    // ⬇️ get the controller from the container
    let controller = this.owner.lookup('controller:index');

    assert.ok(controller);
  });
});
```

Note:

get it from the container vs. just creating object
so e.g. service injections will be resolved etc.

…this kind of test is called…

---

## Container Tests

---

- Container tests test Ember-specific parts of the application (controllers, routes, services) that might require access to other parts (e.g injected services)
- Access to the container is great for stubbing!

---

```js
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Service from '@ember/service';

module('Unit | Controller | welcome', function(hooks) {
  setupTest(hooks);

  module('welcomeMessage', function(hooks) {
    test('is correct in english', function(assert) {
      let controller = this.owner.lookup('controller:index');

      assert.equal(controller.welcomeMessage, 'Hello friend!');
    });

    test('is correct in french', function(assert) {
      // ⬇️ stub locale service
      this.owner.register(
        'service:i18n',
        class FrenchLocale extends Service {
          getCurrentLocale() {
            return 'fr';
          }
        }
      );
      let controller = this.owner.lookup('controller:index');

      assert.equal(controller.welcomeMessage, 'Salut ami!');
    });
  });
});
```

Note:

allows pretty nice testing
could also assert in the stub etc.

…another test…

---

## Render Tests

---

Render Tests allow rendering components or helpers and assert and interact with the resulting DOM

```js
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | AlbumTile', function(hooks) {
  // ⬇️ Setup rendering test
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.album = {
      title: 'Whitney Houston',
      coverUrl: 'http://example.com/cover.jpg'
    };
    // ⬇️ Render the component
    await render(hbs`<AlbumTile @album={{this.album}} />`);

    assert.equal(this.element.textContent, 'Whitney Houston');
  });
});
```
<!-- .element: class="r-stretch" -->

---

Actions will be looked up on the test context as well

```js
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | AlbumTile', function(hooks) {
  setupRenderingTest(hooks);

  test('it calls "@onClick" when the title is clicked', async function(assert) {
    // ⬇️ Define `onClick` action
    this.onClick = () => {
      assert.ok(true, 'the action was called');
    });
    await render(hbs`<AlbumTile @onClick={{this.onClick}} />`);

    // ⬇️ Click the component which invokes `@onClick`
    await click('.title');
  });
});
```
<!-- .element: class="r-stretch" -->

---

## Application Tests

---

- Acceptance tests start up (and tear down afterwards) an instance of the application and simulate a user interacting with it
- Acceptance test files are located in `tests/acceptance/`
- Instead of testing isolated elements of the application, acceptance tests test complete features including all the elements that are involved in that, e.g. routes, models, components etc.

---

```js
import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | index', function(hooks) {
  // ⬇️ Setup application test
  setupApplicationTest(hooks);

  test('visiting /', async function(assert) {
    // ⬇️ Visit route
    await visit('/');

    assert.equal(currentURL(), '/');
  });
});
```
<!-- .element: class="r-stretch" -->

Note:

asserting current route is index which means route was successfully entered/rendered

---

Ember.js defines several helpers for writing acceptance tests

---

`visit(route)`

visits a route of the application which renders the complete page

---

`click(selector)`

clicks on the element identified by the selector

---

`fillIn(selector, value)`

fills in the element identified by the selector with the specified value

---

`keyEvent(selector, type, keyCode)`

triggers a key event of the specified type and key code on the element identified by the selector

---

`triggerEvent(selector, type)`

triggers an event of the specified type on the element identified by the selector

---

`currentPath()`

returns the current path

---

`currentURL()`

returns the current URL

---

`currentRouteName()`

returns the currently active route name

---

It is generally a good practice to use dedicated CSS classes, IDs or data- attributes to select DOM elements in tests so that tests don't break when the CSS and related classes and IDs change

Note:

more on that later...

---

### Stubbing Server responses

is necessary for most acceptance tests

---

- Most acceptance tests require data from the backend that is read by the respective routes
- Tests should not actually depend on a real backend and need to have a defined data set in order to make 
  
Note:

assertion on the rendered page

although you might want to have proper integration tests

	- The best way to solve this is to stub the server responses and always return a static data set

---

`pretender`

intercepts requests and responds with a static data set

[https://github.com/pretenderjs/pretender](https://github.com/pretenderjs/pretender)

Note:

we'll see how addons work later on

---

```js
import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import Pretender from 'pretender';

const ALBUMS = [{
  id: '1',
  type: 'album',
  attributes: {
    title: 'The Bodyguard',
    'cover-url': 'https://i.scdn.co/image/7bcb439989b592287aeac1599aaa36be17672b73'
  }
}];

module('Acceptance | index', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    // ⬇️ Create new stub server
    this.server = new Pretender(function() {
      this.get('/api/albums', function() {
        return [200, { 'Content-Type': 'application/vnd.api+json' }, JSON.stringify({ data: ALBUMS })];
      });
    });
  });

  // ⬇️ Shutdown server after test ends
  hooks.afterEach(function() {
    afterEach() {
      this.server.shutdown();
    }
  });

  test('visiting /albums renders all albums', function(assert) {
    visit('/albums');

    andThen(function() {
      assert.equal(this.element.querySelector('h4').length, 1);
      assert.ok(this.element.textContent.contains('The Bodyguard"'));
    });
  });
});
```
<!-- .element: class="r-stretch" -->

- we can then assert on the exact rendered data as we know what it’s going to be
- for more complex mocks use Mirage

---

### When to use what kind of test

depends…

---

Unit tests are easy to write and execute fast; they only work for elements that do not depend on the container - you’ll be using them rarely

Note:

really only pure util functions etc.

---

Container tests are great for testing elements of the application that are specific to Ember like services

---

Rendering tests are for testing components and are typically an applications main type of test

---

Application test add good coverage as they involve much of the application but are slow to execute and require quite some setup (like stubbed server responses)

---

A good practice is to write container tests for easily isolated elements of the application like services, rendering tests for components and acceptance tests for the major features and workflows that the application provides

---

# Demo

[https://github.com/simplabs/ember-workshop/tree/master/tomster-player](https://github.com/simplabs/ember-workshop/tree/master/tomster-player)

Note:

Use the Ember Inspector to have a look at the internals of the demo application

---

# Practice Session

Test your application using integration and acceptance tests

Note:

[https://github.com/simplabs/ember-workshop/commit/be2d0fdd35ec937646fce8e0c217177e0f1cc65f](https://github.com/simplabs/ember-workshop/commit/be2d0fdd35ec937646fce8e0c217177e0f1cc65f)

(we added tests in the previous steps already - use them as inspiration)

`git reset --hard step-5`
