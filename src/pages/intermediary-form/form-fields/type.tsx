import * as React from "react";
import { Field, useField, FieldRenderProps } from "react-final-form";
import Select from "react-select";
import { INTERMEDIARY_TYPE } from "../../../service/models";
import { Validators } from "../utils";
import "../intermediary-form.css";
import { FieldError } from "./field-error";

type TypeFieldProps = {
  mode: "edit" | "create";
};

export type TypeOption = { value: INTERMEDIARY_TYPE; label: string };

const Type = React.memo<TypeFieldProps>((props) => {
  const intermediaryTypeField = useField("type");

  const onTypeChange = (value: any) => {
    intermediaryTypeField.input.onChange(value);
  };

  return (
    <div className="form__fieldWrapper">
      <Field name="type" className="form__field" validate={Validators.required}>
        {(fieldProps: FieldRenderProps<TypeOption>) => (
          <Select
            classNamePrefix="typeField"
            className={"typeField"}
            isDisabled={props.mode === "edit"}
            value={fieldProps.input.value}
            options={[
              { value: INTERMEDIARY_TYPE.RANGE, label: "Range" },
              { value: INTERMEDIARY_TYPE.DROPDOWN, label: "Dropdown" },
            ]}
            onChange={onTypeChange}
            placeholder="Type"
          />
        )}
      </Field>
      <FieldError name="type" />
    </div>
  );
});

export { Type };
