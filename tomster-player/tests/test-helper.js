import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';

import 'ember-data';

if (!String.prototype.includes) {
  String.prototype.includes = function() {
    return String.prototype.indexOf.apply(this, arguments) > -1;
  };
}

setResolver(resolver);
