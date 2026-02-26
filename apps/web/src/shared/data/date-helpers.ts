import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";

import type { TUiDatePickerInput } from "../types";

dayjs.extend(customParseFormat);
dayjs.extend(utc);

export type TStringRange = [string, string];
export type TIsoRange = [string, string];

const UI_DATE_FORMAT = "YYYY-MM-DD";

const isStringRange = (v: TUiDatePickerInput): v is TStringRange =>
  Array.isArray(v) &&
  v.length === 2 &&
  typeof v[0] === "string" &&
  typeof v[1] === "string";

const isValidUiDate = (s: string): boolean =>
  dayjs(s, UI_DATE_FORMAT, true).isValid(); // strict mode

export const isValidUiRange = (v: TUiDatePickerInput): v is TStringRange =>
  isStringRange(v) && isValidUiDate(v[0]) && isValidUiDate(v[1]);

export const convertDateToIso = ([from, to]: TStringRange): TIsoRange => [
  dayjs.utc(from, UI_DATE_FORMAT, true).toISOString(),
  dayjs.utc(to, UI_DATE_FORMAT, true).toISOString(),
];
