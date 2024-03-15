import { ChangeEventHandler, HTMLInputTypeAttribute, ReactNode } from "react";

type Props = {
  disabled?: boolean;
  id?: string;
  label?: ReactNode;
  max?: number;
  min?: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  type?: Exclude<
    HTMLInputTypeAttribute,
    "button" | "checkbox" | "file" | "hidden" | "image" | "reset" | "submit"
  >;
  value?: string | ReadonlyArray<string> | number;
};

function InputGroup({
  disabled,
  id,
  label,
  max,
  min,
  onChange,
  required,
  type,
  value,
}: Props) {
  return (
    <div>
      {label && (
        <label
          className="block text-sm font-medium leading-6 text-gray-900"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <div className="mt-2">
        <input
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          disabled={disabled}
          id={id}
          max={max}
          min={min}
          onChange={onChange}
          required={required}
          type={type}
          value={value}
        />
      </div>
    </div>
  );
}

export default InputGroup;
