import UserDetailsModel,{IUserDetails} from "../model/usermodel";
import{Request,Response} from 'express'

const createUser = async (req: Request, res: Response) => {
    try {
      const { first_name, last_name, email,phoneNumber, delivery_address, house_no, personal_address} = req.body;
  
      const newUser: IUserDetails = new UserDetailsModel({
        
        delivery_address,
        first_name,
        last_name,
        email,
        phoneNumber,
        personal_address,
        house_no,

      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  export default createUser