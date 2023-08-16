export default function joinArrayItemNames<T>(items: T[], propertyName: keyof T): string {
  const itemValues = items.map((item) => item[propertyName as keyof T]);
  const joinedItems = itemValues.join(', ');
  return joinedItems;
}