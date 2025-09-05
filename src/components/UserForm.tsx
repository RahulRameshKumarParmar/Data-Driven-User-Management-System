'use client'

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { generateZodSchema } from "utils/zodSchema";
import { z, ZodObject } from "zod";

interface UserFormProps {
  schema: any;
  onSave: (data: any, index?: number) => void;
  editData?: any;
  editIndex?: number;
}

const UserForm: React.FC<UserFormProps> = ({ schema, onSave, editData, editIndex }) => {
  // Generate dynamic Zod schema
  const zodSchema = generateZodSchema(schema.fields);

  // Infer TypeScript type from the Zod schema
  type FormData = z.infer<typeof zodSchema>;

  // React Hook Form setup with Zod resolver
  const { register, handleSubmit, reset, formState: { errors } } = useForm<any>({
    resolver: zodResolver(zodSchema as ZodObject<any>),
    defaultValues: editData || {} // preload when editing
  });

  // Load data into form when editing
  useEffect(() => {
    if (editData) reset(editData);
  }, [editData, reset]);

  const submitHandler = (data: FormData) => {
    onSave(data, editIndex);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4 p-8 border rounded-[20px] shadow text-black bg-white">
      {schema.fields.map((field: any) => (
        <div key={field.name}>
          <label className="block mb-1 font-medium">{field.label}</label>

          {field.type === "textarea" ? (
            <textarea
              {...register(field.name)}
              placeholder={field.placeholder}
              className="w-full border p-2 rounded"
            />
          ) : field.type === "select" ? (
            <select
              {...register(field.name)}
              className="w-full border p-2 rounded"
            >
              <option value="">Select {field.label}</option>
              {field.options.map((opt: string) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              {...register(field.name, field.type === "number" ? { valueAsNumber: true } : {})}
              placeholder={field.placeholder}
              className="w-full border p-2 rounded"
            />
          )}

          {errors[field.name] && (
            <p className="text-red-500 text-sm">{errors[field.name]?.message as string}</p>
          )}
        </div>
      ))}

      <button type="submit" className="bg-blue-500 text-white cursor-pointer px-4 py-2 rounded">
        {editData ? "Update User" : "Add User"}
      </button>
    </form>
  );
};

export default UserForm;
