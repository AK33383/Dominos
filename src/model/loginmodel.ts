import mongoose, { Schema, Document } from 'mongoose';

interface IPhoneNumber extends Document {
  phoneNumber: string;
  verified: boolean;
  createDate: Date;
}

const PhoneNumberSchema: Schema = new Schema({
  phoneNumber: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  createDate: {
    type: Date,
    default: Date.now
  }
});

const PhoneNumberModel = mongoose.model<IPhoneNumber>('PhoneNumber', PhoneNumberSchema);

export default PhoneNumberModel;
export{IPhoneNumber}
