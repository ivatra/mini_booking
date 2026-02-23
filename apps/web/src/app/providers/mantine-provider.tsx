import { MantineProvider } from "@mantine/core";

interface IProps {
  children: React.ReactNode;
}

const RootMantineProvider = ({ children }: IProps) => (
  <MantineProvider defaultColorScheme="light">{children}</MantineProvider>
);

export default RootMantineProvider;
