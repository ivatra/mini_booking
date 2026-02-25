import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export type TStringRange = [string, string];
export type TIsoRange = [string, string];

const UI_DATE_FORMAT = "YYYY-MM-DD";

const isStringRange = (v: unknown): v is TStringRange =>
  Array.isArray(v) &&
  v.length === 2 &&
  typeof v[0] === "string" &&
  typeof v[1] === "string";

const isValidUiDate = (s: string): boolean =>
  dayjs(s, UI_DATE_FORMAT, true).isValid(); // strict mode

export const isValidUiRange = (v: unknown): v is TStringRange =>
  isStringRange(v) && isValidUiDate(v[0]) && isValidUiDate(v[1]);

export const convertDateToIso = ([from, to]: TStringRange): TIsoRange => [
  dayjs(from, UI_DATE_FORMAT, true).toISOString(),
  dayjs(to, UI_DATE_FORMAT, true).toISOString(),
];
