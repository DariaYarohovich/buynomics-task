import { observer } from "mobx-react";
import { Layout } from "../../components";
import { useStore } from "../../hooks/useStore";
import {
  IntermediaryForm,
  RangeIntermediaryFormValues,
  DropdownIntermediaryFormValues,
} from "./intermediary-form";
import { createPayload } from './utils';

const CreateIntermediaryForm = observer(() => {
  const store = useStore();

  const onSubmit = (
    values: RangeIntermediaryFormValues | DropdownIntermediaryFormValues
  ) => {
    store.intermediariesStore.addIntermediary(createPayload(values));
  };

  return (
    <Layout
      header={"Create Intermediary"}
      content={<IntermediaryForm onSubmit={onSubmit} mode="create" />}
    />
  );
});

export { CreateIntermediaryForm };
