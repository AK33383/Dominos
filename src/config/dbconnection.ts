import mongoose from "mongoose";
import { config }  from 'dotenv'

config()

const dbUri:string = process.env.DB_URL || ''

const connectToDatabase = ():void =>{

    mongoose.connect(dbUri).then(result => console.log('db connected ')).catch(err => console.log(err))
    
}

export default connectToDatabase 