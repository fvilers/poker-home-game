import { MouseEventHandler, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "reset" | "button";
}>;

function Button({ children, disabled, onClick, type }: Props) {
  return (
    <button
      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
