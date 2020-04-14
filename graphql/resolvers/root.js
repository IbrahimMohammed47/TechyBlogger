const {
  DateTimeResolver,
  EmailAddressResolver,
  PhoneNumberResolver,
  PositiveFloatResolver,
  PositiveIntResolver,
  JSONResolver,
  JSONObjectResolver
} = require('graphql-scalars')

module.exports = {
  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,
  PhoneNumber: PhoneNumberResolver,
  PositiveFloat: PositiveFloatResolver,
  PositiveInt: PositiveIntResolver,
  JSON: JSONResolver,
  JSONObject: JSONObjectResolver
}
