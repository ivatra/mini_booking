import { Box, Paper } from "@mantine/core";
import { MOCK_HOTELS } from "@shared";

import HotelCard from "./hotel-card/hotel-card";
import s from "./hotel-cards-list.module.css";

const HotelCardsList = () => {
  return (
    <Box className={s.scrollWrapper}>
      <Paper
        className={s.grid}
        component="section">
        {MOCK_HOTELS.map((hotel) => (
          <HotelCard
            key={hotel.id}
            {...hotel}
          />
        ))}
      </Paper>
    </Box>
  );
};

export default HotelCardsList;
