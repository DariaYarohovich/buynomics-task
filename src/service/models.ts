type BaseIntermediary = {
  id: string;
  name: string;
  order: number;
  createdAt: string;
  type: INTERMEDIARY_TYPE;
};

export type RangeIntermediary = BaseIntermediary & {
  type: INTERMEDIARY_TYPE.RANGE;
  from: number;
  to: number;
  step: number;
};

export type DropdownIntermediary = BaseIntermediary & {
  type: INTERMEDIARY_TYPE.DROPDOWN;
  options: DropdownOption[];
};

export type DropdownOption = {
  id: string;
  name: string;
  value: number;
};

export enum INTERMEDIARY_TYPE {
  RANGE = "RANGE",
  DROPDOWN = "DROPDOWN",
}
