import type { IHotel } from "@entities";
import { Card, Stack } from "@mantine/core";
import { NavigateButton } from "@shared";

import s from "./hotel-card.module.css";
import AddressInfo from "./ui/address-info";
import Header from "./ui/header";

const HotelCard = ({ id, city, name, address, roomsLength }: IHotel) => (
  <Card
    key={id}
    className={s.card}
    component="article">
    <Stack gap="sm">
      <Header
        name={name}
        roomsCount={roomsLength}
      />
      <AddressInfo
        city={city}
        address={address}
      />
      <NavigateButton
        text="На страницу отеля"
        goTo={`/hotels/${id}`}
      />
    </Stack>
  </Card>
);

export default HotelCard;
