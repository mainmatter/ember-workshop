import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ErrorReporting extends Component {
  @service errorReporting;
  @tracked errorText = null;

  get errorCount() {
    return this.errorReporting.errorCount;
  }

  get errors() {
    return this.errorReporting.errors;
  }

  @action
  textEntered(e) {
    this.errorText = e.target.value;
  }

  @action
  reportError(e) {
    e.preventDefault();

    this.errorReporting.reportError(this.errorText);
    this.errorText = null;
  }
}
