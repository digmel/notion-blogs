import React from "react";

type TVariant = "input" | "textarea";

type TTextInputProps = {
  label?: string;
  errorMessage?: string;
  isDisabled?: boolean;
  onChange?: any;
  value?: string;
  placeholder?: string;
  variant?: TVariant;
  className?: string;
};

export const TextInput = ({
  label,
  isDisabled = false,
  onChange,
  value,
  placeholder,
  variant = "input",
  className,
}: TTextInputProps) => {
  return (
    <>
      <div className={className}>
        {label && (
          <h1 className="text-opacity-70 font-normal md:text-base text-sm text-gray-500 pb-2 ">
            {label}
          </h1>
        )}

        {variant === "input" ? (
          <input
            className={`rounded-md h-10 md:w-96 w-80 border outline-none border-dark-100 border-opacity-30 focus:border-primary bg-transparent z-0 text-dark-100 px-4`}
            disabled={isDisabled}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            autoCapitalize="none"
          />
        ) : (
          <textarea
            className={`rounded-md md:w-96 w-80 border outline-none border-dark-100 border-opacity-30 focus:border-primary bg-transparent z-0 text-dark-100 px-4 h-32 py-4`}
            disabled={isDisabled}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            autoCapitalize="none"
          />
        )}
      </div>
    </>
  );
};
