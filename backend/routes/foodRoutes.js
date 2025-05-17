import express from 'express';
import { createFood, getFoodById, getFoods, updateFood, deleteFood} from '../controllers/foodController.js';
import { foodValidationRules, foodQueryValidationRules, validate, validateObjectId} from '../middlewares/validators.js';

const router = express.Router();

router.post('/foods', foodValidationRules(), validate, createFood);
router.get('/foods', foodQueryValidationRules(), validate, getFoods);
router.get('/foods/:id', validateObjectId('id'), validate, getFoodById);
router.put('/foods/:id', validateObjectId('id'), foodValidationRules(), validate, updateFood);
router.delete('/foods/:id', validateObjectId('id'), validate, deleteFood);

export default router;
