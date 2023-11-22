import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Pole 'name' powinno być typu tekstowego.",
    "any.required": "Pole 'name' jest wymagane.",
  }),
  price: Joi.number().required().messages({
    "number.base": "Pole 'price' powinno być liczbą.",
    "number.required": "Pole 'price' jest wymagane.",
    "number.type": "Pole 'price' musi być liczbą.",
  }),
  description: Joi.string(),
});
