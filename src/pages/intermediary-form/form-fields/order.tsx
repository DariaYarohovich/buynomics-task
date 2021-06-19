import * as React from "react";
import { Field, useField } from "react-final-form";
import { Validators } from "../utils";
import "../intermediary-form.css";
import { FieldError } from "./field-error";

const Order = React.memo(() => {
  const orderField = useField("order");
  const { onChange: orderFieldOnChange } = orderField.input;

  const onOrderChange = React.useCallback<
    (e: React.ChangeEvent<HTMLInputElement>) => void
  >(
    (e) => {
      const orderValue = +e.target.value;

      if (orderValue < 0) {
        return;
      }

      orderFieldOnChange(orderValue);
    },
    [orderFieldOnChange]
  );

  return (
    <div className="form__fieldWrapper">
      <Field
        name="order"
        component="input"
        type="number"
        className="form__field"
        placeholder="Order (enter positive number)"
        onChange={onOrderChange}
        validate={Validators.required}
      />
      <FieldError name="order" />
    </div>
  );
});

export { Order };
