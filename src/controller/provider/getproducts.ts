import { Request, Response } from 'express';
import CategoryModel, { ICategory } from '../../model/provider/productmodel';

const getCategoryProducts = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    const category: ICategory | null = await CategoryModel.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ products: category.products });
  } catch (error) {
    console.error('Error retrieving category products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default getCategoryProducts;
