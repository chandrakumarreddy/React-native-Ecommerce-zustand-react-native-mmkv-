import { create } from "zustand";
import { MMKV } from "react-native-mmkv";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";

const storage = new MMKV();

const zustandStorage: StateStorage = {
  setItem: (name: string, val: string) => storage.set(name, val),
  getItem: (name: string) => storage.getString(name),
  removeItem: (name: string) => storage.delete(name),
};

interface UseCartStore {
  itemCount: number;
  products: any[];
  addProduct: (product: any) => void;
  removeProduct: (product: any) => void;
}

const useCartStore = create<UseCartStore>()(
  persist(
    (set, get) => ({
      itemCount: 0,
      products: [],
      addProduct: (product) =>
        set((state) => {
          const hasProduct = state.products.findIndex(
            (_product) => _product.id === product.id
          );
          let newProducts;
          if (hasProduct > -1) {
            newProducts = [
              ...state.products.slice(0, hasProduct),
              Object.assign(product, {
                quantity: state.products[hasProduct].quantity + 1,
              }),
              ...state.products.slice(hasProduct + 1),
            ];
          } else {
            newProducts = state.products.concat(
              Object.assign(product, { quantity: 1 })
            );
          }
          return {
            products: newProducts,
            itemCount: state.itemCount + 1,
          };
        }),
      removeProduct: (product) =>
        set((state) => {
          if (state.products.length === 0) return state;
          const hasProduct = state.products.findIndex(
            (_product) => _product.id === product.id
          );
          let newProducts;
          if (hasProduct > -1) {
            const existingProductCount =
              state.products[hasProduct].quantity - 1;
            newProducts = state.products.slice(0, hasProduct);
            if (existingProductCount > 0) {
              newProducts.push(
                Object.assign(product, {
                  quantity: state.products[hasProduct].quantity - 1,
                })
              );
            }
            newProducts = newProducts.concat(
              state.products.slice(hasProduct + 1)
            );
          }

          return {
            products: newProducts,
            itemCount: state.itemCount > 0 ? state.itemCount - 1 : 0,
          };
        }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export default useCartStore;
