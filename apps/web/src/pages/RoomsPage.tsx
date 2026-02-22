import { Paper, type PaperProps } from "@mantine/core";
import RoomsPageHeader from "../ui/RoomsPageHeader";

const paperProps: PaperProps = {
  h: "100%",
  w: "100%",
  bg: "blue",
  radius: "md",
};

const RoomsPage = () => {
  return (
    <Paper {...paperProps}>
      <RoomsPageHeader />
    </Paper>
  );
};

export default RoomsPage;
