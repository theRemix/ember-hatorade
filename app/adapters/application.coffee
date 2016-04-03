`import DS from 'ember-data'`
`import config from '../config/environment';`

ApplicationAdapter = DS.RESTAdapter.extend
  namespace: 'api/v1',
  host: config.apiScheme + config.apiHost + config.apiPort

`export default ApplicationAdapter`
