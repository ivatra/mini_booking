import { useRooms } from "@entities";
import type { DatesRangeValue, DateValue } from "@mantine/dates";
import { MOCK_HOTELS } from "@shared";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getGetRoomsParams, getIsUiRangeValid } from "./helpers";

const useDetailsPage = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const { getRooms, rooms, loading, error } = useRooms();

  const hotel = MOCK_HOTELS.find((v) => v.id === hotelId);

  const [date, setDate] = useState<DatesRangeValue<DateValue>>([null, null]);

  useEffect(() => {
    if (!hotelId) return;

    if (hotelId && getIsUiRangeValid(date)) {
      const params = getGetRoomsParams({ hotelId, date });

      getRooms(params);
    }
  }, [hotelId, date, getRooms]);

  return { hotel, rooms, date, setDate, loading, error };
};

export default useDetailsPage;
