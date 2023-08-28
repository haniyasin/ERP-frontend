export function formatHeaders(employeeData: string[]): string[] {
  const formattedData: string[] = [];

  for (const data of employeeData) {
    let formattedValue = data.replace(/([A-Z])/g, " $1");
    formattedValue = formattedValue
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    formattedData.push(formattedValue);
  }

  return formattedData;
}
