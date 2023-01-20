/* eslint-disable ember/use-ember-data-rfc-395-imports */
import Application from "ember-data/app";
import config from "ember-data/config/environment";
/* eslint-enable ember/use-ember-data-rfc-395-imports */
import { setApplication } from "@ember/test-helpers";
import { start } from "ember-qunit";
import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';

setup(QUnit.assert);
setApplication(Application.create(config.APP));

start();
