import mongoose, { Schema, Document } from 'mongoose';

interface IVerification extends Document {
  otp: string;
  phoneNumber: mongoose.Types.ObjectId;
}

const verificationSchema: Schema = new Schema({
  otp: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Schema.Types.ObjectId,
    ref: 'PhoneNumber',
    required: true
  }
});

const VerificationModel = mongoose.model<IVerification>('Verification', verificationSchema);

export default VerificationModel;
