import mongoose, { Schema, Document } from 'mongoose';

interface ICartItem extends Document {
  productId: string;
  quantity: number;
}

interface ICart extends Document {
  userId: string;
  items: ICartItem[];
}

const CartItemSchema: Schema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const CartSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [CartItemSchema],
});

const CartModel = mongoose.model<ICart>('Cart', CartSchema);

export default CartModel;
export{ICartItem,ICart}
