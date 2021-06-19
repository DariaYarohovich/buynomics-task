import * as React from "react";
import { Field, useField } from "react-final-form";
import { Validators } from "../utils";
import "../intermediary-form.css";
import { FieldError } from "./field-error";

const Name = React.memo(() => {
  const nameField = useField("name");
  const { onChange: nameFieldOnChange } = nameField.input;

  const onNameChange = React.useCallback<
    (e: React.ChangeEvent<HTMLInputElement>) => void
  >(
    (e) => {
      const nameValue = e.target.value;

      if (nameValue.length > 255) {
        return;
      }

      nameFieldOnChange(nameValue);
    },
    [nameFieldOnChange]
  );

  return (
    <div className="form__fieldWrapper">
      <Field
        name="name"
        component="input"
        type="text"
        className="form__field"
        placeholder="Name"
        validate={Validators.required}
        onChange={onNameChange}
      />
      <FieldError name="name" />
    </div>
  );
});

export { Name };
