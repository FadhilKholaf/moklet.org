import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  type?: "button" | "reset" | "submit";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
  className?: string;
}

export function PrimaryButton({
  children,
  type,
  onClick,
  isDisabled,
  className = "",
}: Readonly<ButtonProps>) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={
        className +
        " inline-block w-fit rounded-full bg-primary-400 px-6 py-3 h-[54px] transition-all duration-500 hover:bg-primary-500 disabled:bg-neutral-300"
      }
    >
      <span
        className={`text-base ${isDisabled ? "text-neutral-500" : "text-white"}`}
      >
        {children}
      </span>
    </button>
  );
}

export function SecondaryButton({
  children,
  type,
  onClick,
  isDisabled,
}: Readonly<ButtonProps>) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className="inline-block w-fit rounded-full border border-primary-400 hover:bg-primary-50 px-6 py-3 transition-all duration-500 disabled:border-none disabled:bg-neutral-300"
    >
      <span
        className={`text-base ${isDisabled ? "text-neutral-500" : "text-primary-400"}`}
      >
        {children}
      </span>
    </button>
  );
}

export function TertiaryButton({
  children,
  type,
  onClick,
  isDisabled,
}: Readonly<ButtonProps>) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={
        "inline-block w-fit rounded-full border px-6 py-3 transition-all duration-500"
      }
    >
      <span
        className={`text-base ${
          isDisabled
            ? "text-neutral-500"
            : "text-black hover:text-primary-400 transition-all"
        }`}
      >
        {children}
      </span>
    </button>
  );
}

export function FullPrimaryButton({
  children,
  type,
  onClick,
  isDisabled,
}: Readonly<ButtonProps>) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className="inline-block rounded-full bg-primary-400 px-6 py-3 w-full transition-all duration-500 hover:bg-primary-500 disabled:bg-neutral-300"
    >
      <span
        className={`text-base ${isDisabled ? "text-neutral-500" : "text-white"}`}
      >
        {children}
      </span>
    </button>
  );
}
