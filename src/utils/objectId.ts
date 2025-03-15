import { ObjectId as BsonObjectId } from 'bson';

export class ObjectId extends BsonObjectId {
  constructor(id?: string | Buffer | number | BsonObjectId | Uint8Array) {
    super(id);
  }
}

export default ObjectId;