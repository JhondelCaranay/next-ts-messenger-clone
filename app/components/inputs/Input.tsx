"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import clsx from "clsx";
// import { FormValues } from "@/app/(site)/components/AuthForm";
// export type Id = keyof FormValues;
// input type list
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
type InputsProps = {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  hidden?: boolean;
};

const Input = ({
  label,
  id,
  register,
  required = false,
  errors,
  type = "text",
  disabled,
  hidden = false,
}: InputsProps) => {
  return (
    <div className={clsx(hidden ? "hidden" : "block")}>
      <label
        htmlFor={id}
        className="
          block 
          text-sm 
          font-medium 
          leading-6 
          text-gray-900
        "
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, {
            required: {
              value: required,
              message: `${label} is required`,
            },
          })}
          // {...register(id)}
          className={clsx(
            `
            form-input
            block 
            w-full 
            rounded-md 
            border-0 
            py-1.5 
            text-gray-900 
            shadow-sm 
            ring-1 
            ring-inset 
            ring-gray-300 
            placeholder:text-gray-400 
            focus:ring-2 
            focus:ring-inset 
            sm:text-sm 
            sm:leading-6
            disabled:opacity-50
            disabled:cursor-default
            `,
            errors[id] ? "ring-rose-500 focus:ring-rose-500" : "focus:ring-sky-600"
            // disabled && "opacity-50 cursor-default"
          )}
        />
      </div>
      <p className={clsx("text-xs text-rose-600", errors[id] ? "visible" : "invisible")}>
        {(errors[id]?.message as string) || "Invalid"}
      </p>
    </div>
  );
};
export default Input;
