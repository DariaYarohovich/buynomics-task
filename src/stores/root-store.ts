import { IntermediariesStore } from "./intermediaries";
import { ProductsStore } from "./products";

class RootStore {
  intermediariesStore: IntermediariesStore;
  productsStore: ProductsStore;

  constructor() {
    this.intermediariesStore = new IntermediariesStore();
    this.productsStore = new ProductsStore();
  }
}

const rootStore = new RootStore();

export {rootStore, RootStore};
