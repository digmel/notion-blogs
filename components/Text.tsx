import React from "react";

type TTypography =
  | "headline-xl"
  | "headline"
  | "title"
  | "subtitle"
  | "body"
  | "button"
  | "description"
  | "label"
  | "link";

type TText = {
  children: React.ReactNode;
  variant: TTypography;
  className?: string;
};

export const Text = ({ children, variant, className }: TText) => {
  switch (variant) {
    case "headline-xl":
      return (
        <h1 className={`font-semibold md:text-4xl text-xl ${className}`}>
          {children}
        </h1>
      );
    case "headline":
      return (
        <h1 className={`font-semibold md:text-xl text-base ${className}`}>
          {children}
        </h1>
      );
    case "title":
      return (
        <h1 className={`font-bold md:text-base text-sm ${className}`}>
          {children}
        </h1>
      );

    case "subtitle":
      return (
        <h2 className={`font-semibold text-lg ${className}`}>{children}</h2>
      );

    case "body":
      return <p className={`font-light text-base ${className}`}>{children}</p>;

    case "button":
      return <p className={`font-medium text-sm ${className}`}>{children}</p>;

    case "description":
      return <p className={`font-normal text-sm ${className}`}>{children}</p>;

    case "label":
      return (
        <p className={`font-normal md:text-sm text-xs  ${className}`}>
          {children}
        </p>
      );

    case "link":
      return <p className={`font-medium text-base ${className}`}>{children}</p>;

    default:
      return <p className={className}>{children}</p>;
  }
};
