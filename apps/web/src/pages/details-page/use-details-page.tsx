import { useRoomsStore } from "@entities";
import { MOCK_HOTELS, useDateRangeStore } from "@shared";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { getGetRoomsParams, getIsUiRangeValid } from "./helpers";

const useDetailsPage = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const { getRooms, rooms, loading, error } = useRoomsStore();

  const hotel = MOCK_HOTELS.find((v) => v.id === hotelId);

  const { date, setDate } = useDateRangeStore();

  useEffect(() => {
    if (!hotelId) return;

    if (getIsUiRangeValid(date)) {
      const params = getGetRoomsParams({ hotelId, date });

      getRooms(params);
    }
  }, [hotelId, date, getRooms]);

  return { hotel, rooms, date, setDate, loading, error };
};

export default useDetailsPage;
