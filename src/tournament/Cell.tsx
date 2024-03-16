import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type Props = PropsWithChildren<{
  className?: string;
  title: string;
}>;

function Cell({ children, className, title }: Props) {
  return (
    <div
      className={twMerge(
        "flex flex-col bg-gray-50 p-4 text-xl ring-1 ring-gray-300",
        className,
      )}
    >
      <h3 className="mb-1 text-base font-semibold leading-6 text-gray-500">
        {title}
      </h3>

      {children}
    </div>
  );
}

export default Cell;
