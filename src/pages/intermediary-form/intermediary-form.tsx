import * as React from "react";
import { Form } from "react-final-form";
import { useHistory } from "react-router";
import {
  RangeIntermediary,
  DropdownIntermediary,
  DropdownOption,
} from "../../service/models";
import { PrimaryButton, DangerButton } from "../../components";
import {
  DropdownOptions,
  RangeFields,
  Order,
  Name,
  Type,
  TypeOption,
} from "./form-fields";
import "./intermediary-form.css";

export type RangeIntermediaryFormValues = Omit<
  RangeIntermediary,
  "createdAt" | "id" | "type"
> & {
  type: TypeOption;
};

export type FormDropdownOptions = { [key in string]: Partial<DropdownOption> };

export type DropdownIntermediaryFormValues = Omit<
  DropdownIntermediary,
  "createdAt" | "id" | "type" | "options"
> & {
  type: TypeOption;
  options: FormDropdownOptions;
};

type IntermediaryFormProps = {
  onSubmit: (value: any) => void;
  mode: "edit" | "create";
  initialValues?: RangeIntermediaryFormValues | DropdownIntermediaryFormValues;
  options?: DropdownOption[];
};

const IntermediaryForm = React.memo<IntermediaryFormProps>((props) => {
  const history = useHistory();

  const onCancel = React.useCallback(() => {
    history.push("/intermediary/list");
  }, [history]);

  const onSubmit = React.useCallback(
    (values: any) => {
      props.onSubmit(values);
      history.push("/intermediary/list");
    },
    [props.onSubmit, history]
  );

  return (
    <Form onSubmit={onSubmit} initialValues={props.initialValues}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="form">
          <Name />
          <Order />
          <Type mode={props.mode} />
          <RangeFields />
          <DropdownOptions />
          <div className="form__buttonsContainer">
            <PrimaryButton type="submit" label="Save" />
            <DangerButton type="button" onClick={onCancel} label="Cancel" />
          </div>
        </form>
      )}
    </Form>
  );
});

export { IntermediaryForm };
