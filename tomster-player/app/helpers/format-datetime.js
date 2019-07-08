import { helper } from '@ember/component/helper';

export function formatDatetime(datetime) {
  return datetime.toLocaleString();
}

export default helper(formatDatetime);
