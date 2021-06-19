import * as React from "react";
import { useField } from "react-final-form";
import "../intermediary-form.css";

type FieldErrorProps = {
  name: string;
};

const FieldError = React.memo<FieldErrorProps>((props) => {
  const field = useField(props.name, {
    subscription: { submitFailed: true, error: true, touched: true },
  });
  const { submitFailed, error, touched } = field.meta;

  return submitFailed && touched && error ? <div className="form__fieldError" role="alert">{error}</div> : null;
});

export { FieldError };
