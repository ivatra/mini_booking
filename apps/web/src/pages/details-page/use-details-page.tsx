import { useRooms } from "@entities";
import type { DatesRangeValue, DateValue } from "@mantine/dates";
import { MOCK_HOTELS } from "@shared";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getGetRoomsParams, getIsUiRangeValid } from "./helpers";

const useDetailsPage = () => {
  const { numId } = useParams<{ numId: string }>();
  const { getRooms, rooms, loading, error } = useRooms();

  const hotel = MOCK_HOTELS.find((v) => v.id === numId);

  const [date, setDate] = useState<DatesRangeValue<DateValue>>([null, null]);

  useEffect(() => {
    if (!numId) return;

    if (numId && getIsUiRangeValid(date)) {
      const params = getGetRoomsParams({ numId, date });

      getRooms(params);
    }
  }, [numId, date, getRooms]);

  return { hotel, rooms, date, setDate, loading, error };
};

export default useDetailsPage;
