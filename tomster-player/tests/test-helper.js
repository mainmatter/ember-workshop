import resolver from './helpers/resolver';
import { setResolver } from 'ember-qunit';
import 'ember-data';
import './helpers/phantom-shims';

setResolver(resolver);
