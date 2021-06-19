import * as React from "react";
import { useField, Field } from "react-final-form";
import { v4 as uuid } from "uuid";
import { INTERMEDIARY_TYPE } from "../../../service/models";
import { PrimaryButton, DangerButton } from "../../../components";
import { Validators } from "../utils";
import { FormDropdownOptions } from "../intermediary-form";
import "../intermediary-form.css";
import { FieldError } from "./field-error";

// TODO: implement correct deleting of a dropdown option
const DropdownOptions = () => {
  const intermediaryTypeField = useField("type", {
    subscription: { value: true },
  });

  const optionsField = useField("options", { subscription: { initial: true } });
  const { initial: initialOptions } = optionsField.meta;

  const [options, setOptions] = React.useState<{ id: string }[]>(
    initialOptions
      ? Object.keys(initialOptions as FormDropdownOptions).map(
          (key: string) => ({
            id: key,
          })
        )
      : [{ id: uuid() }]
  );

  const addOption = () => {
    setOptions((prevOptions) => [...prevOptions, { id: uuid() }]);
  };

  const deleteOption = (id: string) => {
    setOptions((prevOptions) => prevOptions.filter((o) => o.id !== id));
  };

  return intermediaryTypeField.input.value.value ===
    INTERMEDIARY_TYPE.DROPDOWN ? (
    <div className="form__subFieldsContainer">
      {options.map((option, i) => (
        <div key={option.id} className="form__optionWrapper">
          <Option
            id={option.id}
            onDeleteOption={i === 0 ? undefined : deleteOption}
          />
        </div>
      ))}
      <PrimaryButton
        className="optionButton"
        label="Add option"
        onClick={addOption}
        type="button"
      />
    </div>
  ) : null;
};

type OptionProps = {
  id: string;
  onDeleteOption?: (id: string) => void;
};

const Option = React.memo<OptionProps>((props) => {
  const optionValueField = useField(`options.${props.id}.value`);
  const { onChange: onOptionValueChange } = optionValueField.input;

  const onValueChange = React.useCallback<
    (e: React.ChangeEvent<HTMLInputElement>) => void
  >(
    (e) => {
      const value = +e.target.value;
      if (value < 0) {
        return;
      }

      onOptionValueChange(value);
    },
    [onOptionValueChange]
  );

  return (
    <>
      <div className="form__fieldWrapper form__fieldWrapper--option">
        <Field
          key={`options.${props.id}.name`}
          component="input"
          name={`options.${props.id}.name`}
          validate={Validators.required}
          className="form__field form__field--option"
          placeholder="Option name"
        />
        <FieldError name={`options.${props.id}.name`} />
      </div>
      <div className="form__fieldWrapper form__fieldWrapper--option">
        <Field
          component="input"
          type="number"
          name={`options.${props.id}.value`}
          validate={Validators.required}
          className="form__field form__field--option"
          placeholder="Option value (enter positive number)"
          onChange={onValueChange}
        />
        <FieldError name={`options.${props.id}.value`} />
      </div>
      {props.onDeleteOption ? (
        <DangerButton
          className="optionButton"
          label="Delete"
          onClick={() => props.onDeleteOption!(props.id)}
          type="button"
        />
      ) : null}
    </>
  );
});

export { DropdownOptions };
