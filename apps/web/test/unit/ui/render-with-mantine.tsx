import { MantineProvider } from "@mantine/core";
import { render } from "@testing-library/react";

const renderWithMantine = (children: React.ReactNode) =>
  render(<MantineProvider>{children}</MantineProvider>);

export default renderWithMantine;
