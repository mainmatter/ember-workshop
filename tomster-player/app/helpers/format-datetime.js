import { helper as buildHelper } from '@ember/component/helper';

export function formatDatetime(datetime) {
  if (datetime) {
    return datetime.toLocaleString();
  }
}

export default buildHelper(formatDatetime);
