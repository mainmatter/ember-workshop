import resolver from './helpers/resolver';
import { setResolver } from 'ember-qunit';
import './helpers/phantom-shims';
import resetLocalStorage from './helpers/reset-local-storage';

resetLocalStorage();

setResolver(resolver);
