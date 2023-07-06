import { Request,Response } from 'express'
import CategoryModel, { IProduct,ICategory} from '../../model/provider/productmodel'

const createCategory = async (req: Request, res: Response) => {
  try {
    const { catogory_name } = req.body;

    const category: ICategory = new CategoryModel({
      catogory_name,
      products: [],
    });

    await category.save();

    res.status(201).json({ message: 'Category created successfully' });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Internal server error' }); 
  }
};

const createProduct = async (req: Request, res: Response) => {
    try {
      const { categoryId } = req.params;
      const { product } = req.body;
  
      const category: ICategory | null = await CategoryModel.findById(categoryId);
  
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      const newProduct: IProduct = { ...product };
               
      category.products.push(newProduct);
      await category.save();
  
      res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

export { createCategory ,createProduct}
