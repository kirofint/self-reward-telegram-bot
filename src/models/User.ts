import { prop, getModelForClass, DocumentType } from '@typegoose/typegoose'

export class User {
  @prop({ required: true, index: true, unique: true })
  id: number
  @prop({ default: null })
  username: string
  @prop({ default: 'en' })
  language: string

  _id?: string
}

const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
})

export async function findOrCreateUser (id: number, username: string | null, language: string): Promise<DocumentType<User>> {
  return await UserModel.findOne({ id }).lean() ?? await new UserModel({ id, username, language }).save()
}

export async function updateUser (user: User, changes_keys: Array<string>) {
  const update_db_values = {}
    for (const item_key of changes_keys)
      update_db_values[item_key] = user[item_key]

  await UserModel.updateMany({ _id: user._id }, { $set: update_db_values })
}

export default UserModel
