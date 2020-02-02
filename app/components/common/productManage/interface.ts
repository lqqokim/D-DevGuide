export interface IProductManage<T> {
  created();
  onclickAddProduct(): void;
  onclickRemoveProduct(): void;
  changeSelectedManageProduct(value: {
    index: number;
    prevIndex: number;
  }): void;
  onclickSave(): void;
  onclickCancel(): void;
  validator(product: T): boolean;
}
