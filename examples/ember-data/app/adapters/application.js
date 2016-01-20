import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  namespace: 'api',
  host: '…' // TODO: configure the backend host here!
});
