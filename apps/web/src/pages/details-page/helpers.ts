import type { IGetRoomsParams } from "@entities";
import {
  isValidUiRange,
  convertDateToIso,
  type TUiDatePickerInput,
} from "@shared";

type TGetRoomsStoreParams = {
  hotelId: string;
  date: TUiDatePickerInput;
};

export const getGetRoomsParams = (paramsIn: TGetRoomsStoreParams) => {
  const { date, hotelId } = paramsIn;

  const paramsOut: IGetRoomsParams = {
    hotelId,
  };

  if (isValidUiRange(date)) {
    const [checkIn, checkOut] = convertDateToIso(date);

    paramsOut.range = { checkIn, checkOut };
  }

  return paramsOut;
};

export const getIsUiRangeValid = (date: TUiDatePickerInput) =>
  (!date[0] && !date[1]) || (date[0] && date[1]);

export const buildRoomLink = (roomId: string, date: TUiDatePickerInput) => {
  const params = new URLSearchParams();

  if (date[0]) params.set("in", date[0].toString());
  if (date[1]) params.set("out", date[1].toString());

  return `/rooms/${roomId}${params.toString() ? `?${params.toString()}` : ""}`;
};
