import { Box, Stack, type PaperProps } from "@mantine/core";

import HotelCardsList from "../ui/HotelCardsList";
import RoomsPageHeader from "../ui/RoomsPageHeader";

const paperProps: PaperProps = {
  h: "100%",
  w: "100%",
  radius: "md",
  bg: "inherit",
};

const HotelRoomsPage = () => {
  return (
    <Box {...paperProps}>
      <Stack>
        <RoomsPageHeader />
        <HotelCardsList />
      </Stack>
    </Box>
  );
};

export default HotelRoomsPage;
