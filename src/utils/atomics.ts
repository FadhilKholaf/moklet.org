import { randomFillSync } from "crypto";

//#region Date relateds
export function getMonthName(month: number) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return months[month];
}

export function stringifyDate(date: Date) {
  const year = date.getFullYear(),
    month = getMonthName(date.getMonth()),
    day = date.getDate();
  return `${month} ${day}, ${year}`;
}
//#endregion

export function stringifyCompleteDate(date: Date) {
  const year = date.getFullYear(),
    month = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2),
    hour = ("0" + date.getHours()).slice(-2),
    minute = ("0" + date.getMinutes()).slice(-2);
  return `${year}/${month}/${day} at ${hour}:${minute}`;
}

//#region Pagination relateds
export function isInteger(value: string) {
  return /^\d+$/.test(value);
}

export function validatePage(page: string) {
  return isInteger(page) && parseInt(page) > 0;
}
//#endregion

export function generateRandomString(length: number): string {
  const buffer = Buffer.alloc(length);
  randomFillSync(buffer);

  return buffer.toString("base64").slice(0, length);
}

export const formToJSON = (elements: HTMLElement) =>
  [].reduce.call(
    elements,
    (data: any, element: HTMLInputElement) => {
      data[element.name] =
        element.type == "checkbox"
          ? data[element.name]
            ? element.checked
              ? [...data[element.name], element.value]
              : data[element.name]
            : [element.value]
          : element.value;
      return data;
    },
    {},
  ) as Array<string | Array<string>>;

export const convertToDateTimeLocalString = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
