import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
}>;

function Button({ children, disabled, type }: Props) {
  return (
    <button
      className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
