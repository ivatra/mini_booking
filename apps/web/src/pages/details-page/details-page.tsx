import { Group } from "@mantine/core";
import { useParams } from "react-router";

const DetailsPage = () => {
  const { numId } = useParams<{ numId: string }>();

  return <Group>Hello {numId}</Group>;
};

export default DetailsPage;
