`import { moduleForModel, test } from 'ember-qunit'`

moduleForModel 'tweet', 'Unit | Serializer | tweet',
  # Specify the other units that are required for this test.
  needs: ['serializer:tweet']

# Replace this with your real tests.
test 'it serializes records', (assert) ->
  record = @subject()

  serializedRecord = record.serialize()

  assert.ok serializedRecord
