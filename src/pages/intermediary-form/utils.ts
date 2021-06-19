import { v4 as uuid } from "uuid";
import moment from "moment";
import { INTERMEDIARY_TYPE, DropdownOption } from "../../service/models";
import {
  RangeIntermediaryFormValues,
  DropdownIntermediaryFormValues,
} from "./intermediary-form";

type Validator<T> = (value: T) => undefined | string;

const Validators: { [key in string]: Validator<any> } = {
  required: function (value) {
    return value !== undefined && value !== null ? undefined : "Required";
  },
};

const createPayload = (
  values: RangeIntermediaryFormValues | DropdownIntermediaryFormValues,
  createdAt?: string,
  id?: string
) => ({
  createdAt: createdAt || moment().toString(),
  id: id || uuid(),
  name: values.name,
  order: values.order,
  ...(values.type.value === INTERMEDIARY_TYPE.RANGE
    ? {
        type: values.type.value,
        from: (values as RangeIntermediaryFormValues).from,
        to: (values as RangeIntermediaryFormValues).to,
        step: (values as RangeIntermediaryFormValues).step,
      }
    : {
        type: values.type.value,
        options: Object.entries(
          (values as DropdownIntermediaryFormValues).options
        )
          .filter(
            ([key, value]: [key: string, value: Partial<DropdownOption>]) =>
              value.name && value.value !== undefined && value.value !== null
          )
          .map(
            ([key, value]: [key: string, value: Partial<DropdownOption>]) => ({
              id: key,
              name: value.name!,
              value: value.value!,
            })
          ),
      }),
});

export { Validators, createPayload };
