import mongoose, { Schema, Document } from 'mongoose';

interface ISizes extends Document{
  size:string,
  price:string

}



interface IProduct extends Document {
  product_name: string;
  sizes:ISizes[] 
  description: string;
  image:string

}

interface ICategory extends Document {
  catogory_name: string;
  products: IProduct[];
}


export { ICategory, IProduct };
const ProductSchema: Schema<IProduct> = new Schema({
  product_name: {
    type: String,
    required: true,
  },
  sizes: [
    {
      size: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  description: {
    type: String,
    required: true,
  },
  image:{
    type:String,
    required:true
  }
  

});

const CategorySchema: Schema<ICategory> = new Schema({
  catogory_name: {
    type: String,
    required: true,
  },
  products: [ProductSchema],
});

const CategoryModel = mongoose.model<ICategory>('product', CategorySchema);

export default CategoryModel;