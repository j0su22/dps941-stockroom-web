export function isPositiveQuantity(value: number) {
  return Number.isFinite(value) && value > 0;
}

export function hasEnoughStock(stock: number, requested: number) {
  return requested > 0 && requested <= stock;
}
