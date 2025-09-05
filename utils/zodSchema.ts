import { z, ZodType } from "zod";

export const generateZodSchema = (fields: any[]): ZodType<any> => {
  const shape: any = {};

  fields.forEach(field => {
    let validator: any;

    switch (field.type) {
      case "text":
      case "textarea":
        validator = z.string();

        if (field.validation.required) {
          validator = validator.min(1, `${field.label} is required`);
        }
        if (field.validation.minLength) {
          validator = validator.min(field.validation.minLength, `${field.label} must be at least ${field.validation.minLength} characters`);
        }
        if (field.validation.maxLength) {
          validator = validator.max(field.validation.maxLength, `${field.label} must be at most ${field.validation.maxLength} characters`);
        }

        break;

      case "email":
        validator = z.string().email("Invalid email");

        if (field.validation.required) {
          validator = validator.min(1, `${field.label} is required`);
        }

        break;

      case "number":
        validator = z.coerce.number({ message: `${field.label} must be a number` });

        if (field.validation.required) {
          validator = validator.refine((val: number) => val !== undefined && val !== null, { message: `${field.label} is required` });
        }
        if (field.validation.min !== undefined) {
          validator = validator.min(field.validation.min, `${field.label} must be at least ${field.validation.min}`);
        }
        if (field.validation.max !== undefined) {
          validator = validator.max(field.validation.max, `${field.label} must be at most ${field.validation.max}`);
        }

        break;

      case "select":
        validator = z.string();

        if (field.validation.required) {
          validator = validator.min(1, `${field.label} is required`);
        }
        
        break;

      default:
        validator = z.any();
    }

    shape[field.name] = validator;
  });

  return z.object(shape);
};
