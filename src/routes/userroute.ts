
import { homepage,login,verifyOTP } from '../controller/logincontroller';
import  express,{Router} from 'express';
import createUser from '../controller/usercontroller';
import { authenticateToken } from '../middleware/authenticateToken';
import  { createCategory,createProduct} from '../controller/provider/productcontroller';
import getCategoryProducts from '../controller/provider/getproducts';


const router: Router = express.Router();

router.get('/', homepage);
router.post('/login',login)
router.post('/login/verify',verifyOTP)
router.post('/createuser',authenticateToken,createUser)
router.post('/createcatogory',createCategory)
router.post('/categories/:categoryId/products', createProduct);
router.get('/categories/:categoryId/getproducts', getCategoryProducts);

export default router;





