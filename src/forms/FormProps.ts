type FormProps<T> = {
  disabled?: boolean;
  errorMessage?: string;
  onSubmit: (values: T) => void;
  value?: Partial<T>;
};

export default FormProps;
