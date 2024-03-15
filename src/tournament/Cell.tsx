import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type Props = PropsWithChildren<{
  className?: string;
  title: string;
}>;

function Cell({ children, className, title }: Props) {
  return (
    <div className={twMerge("flex flex-col bg-gray-100 p-4", className)}>
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        {title}
      </h3>

      {children}
    </div>
  );
}

export default Cell;
