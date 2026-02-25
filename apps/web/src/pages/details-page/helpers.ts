import type { IGetRoomsParams } from "@entities";
import type { DatesRangeValue, DateValue } from "@mantine/dates";
import { isValidUiRange, convertDateToIso } from "@shared";

type TGetRoomsStoreParams = {
  numId: string;
  date: DatesRangeValue<DateValue>;
};

export const getGetRoomsParams = (paramsIn: TGetRoomsStoreParams) => {
  const { date, numId } = paramsIn;

  const paramsOut: IGetRoomsParams = {
    hotelId: numId,
  };

  if (isValidUiRange(date)) {
    const [checkIn, checkOut] = convertDateToIso(date);

    paramsOut.range = { checkIn, checkOut };
  }

  return paramsOut;
};

export const getIsUiRangeValid = (date: DatesRangeValue<DateValue>) =>
  (!date[0] && !date[1]) || (date[0] && date[1]);
