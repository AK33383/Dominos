

import { Request,Response } from 'express'
import PhoneNumberModel from '../model/loginmodel'
import generateOTP from '../utils/otpgenration'
import VerificationModel from '../model/otpverifymodel'
import jwt from 'jsonwebtoken'


const homepage = (req:Request,res:Response):void => {

    try{

        res.send({
            "message":"welcome to homepage"
        })
    }
    catch(error){
        res.send(error)
    }




}
const login = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.body;

    // Check if phone number already exists in the PhoneNumber collection
    let existingPhoneNumber = await PhoneNumberModel.findOne({ phoneNumber });

    if (!existingPhoneNumber) {
      // Create a new phone number document if it doesn't exist
      existingPhoneNumber = new PhoneNumberModel({
        phoneNumber
      });
    }

    // Generate OTP
    const otp: string = generateOTP();

    // Create Verification document
    const verification = new VerificationModel({
      otp,
      phoneNumber: existingPhoneNumber._id
    });

    // Save both PhoneNumber and Verification documents
    await existingPhoneNumber.save();
    await verification.save();

    res.status(201).json({ message: 'Phone number saved successfully and OTP sent successfully' });
  } catch (error) {
    console.error('Error creating phone number:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
  

const verifyOTP = async (req: Request, res: Response) => {
  
  try {
    const { otp } = req.body;

    // Find the verification document in the database
    const verification = await VerificationModel.findOne({ otp }).populate('phoneNumber');


   if (!verification) {
      return res.status(404).json({ message: 'Invalid OTP' });
    }

    // Update PhoneNumber's verified field to true
    const phoneNumber = verification.phoneNumber as any; 
    phoneNumber.verified = true;
    await phoneNumber.save(); 
          
    await VerificationModel.deleteOne({ otp }); 
 
    const token = jwt.sign({ phoneNumber: phoneNumber.phoneNumber }, 'your-secret-key'); 

    res.json({ message: 'OTP verification successful',token }); 
  } catch (error) { 
    console.error('Error verifying OTP:', error); 
    res.status(500).json({ message: 'Internal server error' }); 
  } 
};

    export { homepage,login,verifyOTP}
