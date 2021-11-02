import { prop, getModelForClass, DocumentType } from '@typegoose/typegoose'
import logger from '@/helpers/logger'

class Collector {
  @prop({ required: true, index: true, unique: true })
  id: number
  @prop({ required: true })
  chatId: number
  @prop({ default: () => Date.now() })
  createdAt?: number

  _id?: string
}

const CollectorModel = getModelForClass(Collector)

export async function addGarbageMessage (messageID: number, chatId: number): Promise<DocumentType<Collector>> {
  try {
    return await new CollectorModel({ id: messageID, chatId }).save()
  } catch (error) {
    logger(error)
  }
}

export async function getAllGarbageMessages () {
  return await CollectorModel.find().lean()
}

export async function removeCollector (id: number) {
  await CollectorModel.deleteOne({ id })
}

export default Collector
