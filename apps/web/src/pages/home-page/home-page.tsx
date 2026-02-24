import { HotelCardsList } from "@entities";
import { Box, Stack } from "@mantine/core";
import { MOCK_HOTELS, MOCK_ROOMS } from "@shared";

import Header from "./header";

const HomePage = () => {
  return (
    <Box
      h="100%"
      w="100%">
      <Stack>
        <Header
          cOfHotels={MOCK_HOTELS.length}
          cOfRooms={MOCK_ROOMS.length}
        />
        <HotelCardsList hotels={MOCK_HOTELS} />
      </Stack>
    </Box>
  );
};

export default HomePage;
