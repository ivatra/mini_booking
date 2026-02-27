import { Center, Stack, Loader } from "@shared/ui-kit";

export const CenterLoader = () => (
  <Center
    w="100%"
    h="100%">
    <Stack>
      <Loader size="xl" />
    </Stack>
  </Center>
);
