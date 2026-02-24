import type { DatesRangeValue, DateValue } from "@mantine/dates";
import { MOCK_HOTELS, MOCK_ROOMS } from "@shared";
import dayjs from "dayjs";
import { useState } from "react";
import { useParams } from "react-router-dom";

const useDetailsPage = () => {
  const { numId } = useParams<{ numId: string }>();

  const hotel = MOCK_HOTELS.find((v) => v.id === numId);
  const rooms = MOCK_ROOMS.filter((v) => v.hotelId === numId);

  const today = dayjs().format("YYYY-MM-DD");
  const todayPlusWeek = dayjs().add(7, "day").format("YYYY-MM-DD");

  const [date, setDate] = useState<DatesRangeValue<DateValue>>([
    today,
    todayPlusWeek,
  ]);

  return { hotel, rooms, date, setDate };
};

export default useDetailsPage;
