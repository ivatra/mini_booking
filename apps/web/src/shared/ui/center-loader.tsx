import { Center, Stack, Loader } from "@shared/ui-kit";

const CenterLoader = () => (
  <Center
    w="100%"
    h="100%">
    <Stack>
      <Loader size="xl" />
    </Stack>
  </Center>
);

export default CenterLoader;
