import { Box, Paper } from "@mantine/core";

import { mockHotels } from "../mockData";
import HotelCard from "./HotelCard";
import s from "./HotelCardsList.module.css";

const HotelCardsList = () => {
  return (
    <Box className={s.scrollWrapper}>
      <Paper
        className={s.grid}
        component="section">
        {mockHotels.map((hotel) => (
          <HotelCard {...hotel} />
        ))}
      </Paper>
    </Box>
  );
};

export default HotelCardsList;
