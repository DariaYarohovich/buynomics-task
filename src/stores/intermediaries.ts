import { makeObservable, action, observable } from "mobx";
import { RangeIntermediary, DropdownIntermediary } from "../service/models";

class IntermediariesStore {
  intermediaries: (RangeIntermediary | DropdownIntermediary)[] = [];

  constructor() {
    makeObservable(this, {
      intermediaries: observable,
      addIntermediary: action,
      editIntermediary: action,
      deleteIntermediary: action,
    });
  }

  addIntermediary(newIntermediary: RangeIntermediary | DropdownIntermediary) {
    this.intermediaries = [...this.intermediaries, newIntermediary];
    this.intermediaries.sort(sortAscByOrder);
  }

  editIntermediary(
    id: string,
    updatedIntermediary: RangeIntermediary | DropdownIntermediary
  ) {
    this.intermediaries = this.intermediaries.map((intermediary) =>
      intermediary.id === id ? updatedIntermediary : intermediary
    );
  }

  deleteIntermediary(id: string) {
    this.intermediaries = this.intermediaries.filter(
      (intermediary) => intermediary.id !== id
    );
  }

  getIntermediaryById(id: string) {
    return this.intermediaries.find((intermediary) => intermediary.id === id);
  }
}

// TODO: can be made more generic by passing a property name the array should be sorted by
function sortAscByOrder(
  a: RangeIntermediary | DropdownIntermediary,
  b: RangeIntermediary | DropdownIntermediary
): number {
  return a.order - b.order;
}

export { IntermediariesStore };
