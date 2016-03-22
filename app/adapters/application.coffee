`import DS from 'ember-data'`

ApplicationAdapter = DS.RESTAdapter.extend
  namespace: 'api/v1',
  host: 'http://api.hatora.de'
  # host: 'http://lvh.me:3000'

`export default ApplicationAdapter`
