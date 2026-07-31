export function getStarFills(rating: number, total = 5): number[] {
  let value = Number(rating) || 0;

  value = Math.round(value * 2) / 2;

  return Array.from({ length: total }, (_, index) => {
    const portion = Math.min(Math.max(value - index, 0), 1);
    return portion * 100;
  });
}
