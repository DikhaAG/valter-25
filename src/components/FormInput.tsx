import {
  FieldValues,
  UseFormRegister,
  FieldErrors,
  Path,
} from 'react-hook-form';
import { Label } from './ui/label';
import { Input } from './ui/input';

interface FormInputProps<T extends FieldValues> {
  label: string;
  type: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

const FormInput = <T extends FieldValues>({
  label,
  type,
  name,
  register,
  errors,
}: FormInputProps<T>) => {
  return (
    <div className="mb-4">
      <Label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </Label>
      <Input
        id={name}
        type={type}
        {...register(name, { required: `${label} is required` })}
        className="w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors[name] && (
        <p className="text-sm text-red-500">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default FormInput;
