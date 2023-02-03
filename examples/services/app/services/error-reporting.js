import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ErrorReportingService extends Service {
  @tracked errors = [];

  get errorCount() {
    return this.errors.length;
  }

  reportError(error) {
    this.errors = [...this.errors, error];
  }
}
