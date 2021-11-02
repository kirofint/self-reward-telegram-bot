import { connect } from 'mongoose'
import { setGlobalOptions, Severity } from '@typegoose/typegoose'

connect(process.env.MONGO)

setGlobalOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
})
