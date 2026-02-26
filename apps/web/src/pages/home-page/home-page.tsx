import { HotelCardsList, useHotelsStore } from "@entities";
import { Box, Stack } from "@mantine/core";
import { CenterLoader, ErrorMessage } from "@shared";
import { useEffect } from "react";

import Header from "./header";
import { calcCountOfRooms } from "./helpers";

const HomePage = () => {
  const { hotels, loading, error, getHotels } = useHotelsStore();

  useEffect(() => {
    getHotels();
  }, [getHotels]);

  return (
    <Box
      h="100%"
      w="100%">
      <Stack>
        <Header
          cOfHotels={hotels.length}
          cOfRooms={calcCountOfRooms(hotels)}
        />
        {loading > 0 && <CenterLoader />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && <HotelCardsList hotels={hotels} />}
        {!loading && !hotels.length && (
          <ErrorMessage message="Не найдены отели" />
        )}
      </Stack>
    </Box>
  );
};

export default HomePage;
