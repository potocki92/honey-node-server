import Joi from "joi";

export const productValidation = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Pole 'name' powinno być typu tekstowego.",
    "string.min": "Pole powinno zawierać przynajmniej 6 znaków.",
    "string.max": "Pole powinno zawierać maksymalnie 20 znaków.",
    "string.required": "Nazwa produktu jest wymagana.",
  }),
  price: Joi.number()
    .required()
    .messages({
      "number.base": "Pole 'price' powinno być liczbą.",
      "number.type": "Pole 'price' musi być liczbą.",
      "number.required": "Cena produktu jest wymagana.",
      "number.positive": "Musisz podać wartość dodatnią",
    })
    .positive(),
  description: Joi.string(),
});
