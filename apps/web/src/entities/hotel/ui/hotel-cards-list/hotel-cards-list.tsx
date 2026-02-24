import { GridList } from "@shared";

import HotelCard from "./hotel-card/hotel-card";
import type { IHotel } from "../../data/types";

interface IProps {
  hotels: IHotel[];
}

const HotelCardsList = ({ hotels }: IProps) => (
  <GridList>
    {hotels.map((hotel) => (
      <HotelCard
        key={hotel.id}
        {...hotel}
      />
    ))}
  </GridList>
);

export default HotelCardsList;
