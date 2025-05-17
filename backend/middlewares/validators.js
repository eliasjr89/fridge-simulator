import { body, validationResult, param, query } from 'express-validator';
import mongoose from 'mongoose';

export const foodValidationRules = () => {
  return [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('category').trim().notEmpty().withMessage('Category is required'),
    body('expirationDate')
      .notEmpty()
      .withMessage('Expiration date is required')
      .isISO8601()
      .withMessage('Invalid expiration date')
      .custom((value) => {
        const date = new Date(value);
        if (date < new Date(1900, 0, 1)) throw new Error('Expiration date is too old');
        return true;
      }),
    body('imageUrl').optional().isURL().withMessage('Image URL must be a valid URL'),
  ];
};

export const validateObjectId = (field) => {
  return param(field).custom((value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error('Invalid ID');
    }
    return true;
  });
};

export const foodQueryValidationRules = () => {
  return [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
    query('category').optional().isString(),
    query('expiringSoon').optional().isBoolean().withMessage('expiringSoon must be boolean'),
  ];
};

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
