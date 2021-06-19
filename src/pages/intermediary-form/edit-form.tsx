import * as React from "react";
import { observer } from "mobx-react";
import { useParams, useHistory } from "react-router";
import { useStore } from "../../hooks/useStore";
import { Layout } from "../../components";
import {
  IntermediaryForm,
  RangeIntermediaryFormValues,
  DropdownIntermediaryFormValues,
  FormDropdownOptions,
} from "./intermediary-form";
import {
  DropdownIntermediary,
  INTERMEDIARY_TYPE,
  RangeIntermediary,
} from "../../service/models";
import { createPayload } from "./utils";

const EditIntermediaryForm = observer(() => {
  const store = useStore();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const intermediary = store.intermediariesStore.getIntermediaryById(id);

  React.useEffect(() => {
    if (!intermediary) {
      history.push("/intermediary/list");
    }
  }, [intermediary, history]);

  const intermediaryFormValues = React.useMemo<
    RangeIntermediaryFormValues | DropdownIntermediaryFormValues | undefined
  >(() => {
    if (!intermediary) {
      return;
    }

    const { name, order, type } = intermediary;

    const baseValues = {
      name,
      order,
      type,
    };

    if (type === INTERMEDIARY_TYPE.RANGE) {
      const { from, to, step } = intermediary as RangeIntermediary;
      return {
        ...baseValues,
        from,
        to,
        step,
        type: {
          value: type,
          label: "Range",
        },
      };
    }

    const { options } = intermediary as DropdownIntermediary;

    let formDropdownOptions: FormDropdownOptions = {};

    options.forEach((option) => {
      formDropdownOptions[option.id] = {
        name: option.name,
        value: option.value,
      };
    });

    return {
      ...baseValues,
      options: formDropdownOptions,
      type: {
        value: type,
        label: "Dropdown",
      },
    };
  }, [intermediary]);

  const onSubmit = React.useCallback(
    (values: any) => {
      store.intermediariesStore.editIntermediary(
        id,
        createPayload(values, intermediary?.createdAt, id)
      );
    },
    [intermediary?.createdAt, id]
  );

  return (
    <Layout
      header="Edit Intermediary"
      content={
        <IntermediaryForm
          onSubmit={onSubmit}
          mode="edit"
          initialValues={intermediaryFormValues}
        />
      }
    />
  );
});

export { EditIntermediaryForm };
