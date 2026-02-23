import { HotelCardsList } from "@entities";
import { Box, Stack } from "@mantine/core";

import Header from "./header";

const HomePage = () => {
  return (
    <Box
      h="100%"
      w="100%">
      <Stack>
        <Header />
        <HotelCardsList />
      </Stack>
    </Box>
  );
};

export default HomePage;
