import * as React from "react";
import classes from "classnames";
import "./button.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

const PrimaryButton = (props: ButtonProps) => {
  const { label, ...buttonProps } = props;

  return (
    <button {...buttonProps} className={classes("button", "button--primary", props.className)}>
      {label}
    </button>
  );
};

const DangerButton = (props: ButtonProps) => {
  const { label, ...buttonProps } = props;

  return (
    <button {...buttonProps} className={classes("button", "button--danger", props.className)}>
      {label}
    </button>
  );
};

export { PrimaryButton, DangerButton };
