import mongoose, { Schema, Document } from 'mongoose';

interface IUserDetails extends Document {
  delivery_address:string
  first_name:string
  last_name: string;
  email: string;
  phoneNumber: string;
  personal_address:string;
  house_no:string
}

const UserDetailsSchema: Schema = new Schema({
  delivery_address: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required:true
  },
  personal_address: {
    type:String,
    required:true
  },
  house_no: {
    type:String,
    required:true
  }
});



const UserDetailsModel = mongoose.model<IUserDetails>('UserDetail', UserDetailsSchema);

export default UserDetailsModel;
export { IUserDetails }