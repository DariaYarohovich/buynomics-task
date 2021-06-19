import * as React from "react";
import { Field, useField } from "react-final-form";
import { INTERMEDIARY_TYPE } from "../../../service/models";
import { Validators } from "../utils";
import "../intermediary-form.css";
import { FieldError } from "./field-error";

const RangeFields = () => {
  const intermediaryTypeField = useField("type", {
    subscription: { value: true },
  });

  const fromField = useField("from", {
    subscription: { value: true, initial: true },
  });
  const {
    input: { value: fromFieldValue, onChange: fromFieldOnChange },
    meta: { initial: initialFromValue },
  } = fromField;

  const toField = useField("to", { subscription: { value: true } });
  const { value: toFieldValue, onChange: toFieldOnChange } = toField.input;

  const stepField = useField("step", {
    subscription: { value: true, initial: true },
  });
  const {
    input: { onChange: stepFieldOnChange, value: stepFieldvalue },
    meta: { initial: initialStepValue },
  } = stepField;

  const onFromChange = React.useCallback<
    (e: React.ChangeEvent<HTMLInputElement>) => void
  >(
    (e) => {
      const fromValue = +e.target.value;

      if (
        fromValue < 0 ||
        fromValue > initialFromValue ||
        (initialFromValue - fromValue) % stepFieldvalue
      ) {
        fromFieldOnChange(undefined);
        return;
      }

      if (toFieldValue && fromValue && fromValue > toFieldValue) {
        toFieldOnChange(fromValue);
      }

      fromFieldOnChange(fromValue);
    },
    [
      toFieldValue,
      fromFieldOnChange,
      toFieldOnChange,
      initialFromValue,
      stepFieldvalue,
    ]
  );

  const onToChange = React.useCallback<
    (e: React.ChangeEvent<HTMLInputElement>) => void
  >(
    (e) => {
      const toValue = +e.target.value;

      if (
        toValue < 0 ||
        (fromFieldValue && toValue && fromFieldValue > toValue)
      ) {
        toFieldOnChange(undefined);
        return;
      }

      toFieldOnChange(toValue);
    },
    [fromFieldValue, toFieldOnChange]
  );

  const onStepChange = React.useCallback<
    (e: React.ChangeEvent<HTMLInputElement>) => void
  >(
    (e) => {
      const stepValue = +e.target.value;

      if (stepValue < 0 || stepValue < initialStepValue) {
        stepFieldOnChange(undefined);
        return;
      }

      if ((initialFromValue - fromFieldValue) % stepValue) {
        fromFieldOnChange(undefined);
      }

      stepFieldOnChange(stepValue);
    },
    [stepFieldOnChange, initialStepValue, fromFieldValue, initialFromValue, fromFieldOnChange]
  );

  return intermediaryTypeField.input.value.value === INTERMEDIARY_TYPE.RANGE ? (
    <div className="form__subFieldsContainer">
      <div className="form__fieldWrapper">
        <Field
          className="form__field form__field--sub"
          name="from"
          component="input"
          type="number"
          placeholder="From (enter positive number)"
          onBlur={onFromChange}
          validate={Validators.required}
        />
        <FieldError name="from" />
      </div>

      <div className="form__fieldWrapper">
        <Field
          className="form__field form__field--sub"
          name="to"
          component="input"
          type="number"
          placeholder="To (enter positive number)"
          min={fromFieldValue}
          onBlur={onToChange}
          validate={Validators.required}
        />
        <FieldError name="to" />
      </div>

      <div className="form__fieldWrapper">
        <Field
          className="form__field  form__field--sub"
          name="step"
          component="input"
          type="number"
          placeholder="Step (enter positive number)"
          onBlur={onStepChange}
          validate={Validators.required}
        />
        <FieldError name="step" />
      </div>
    </div>
  ) : null;
};

export { RangeFields };
