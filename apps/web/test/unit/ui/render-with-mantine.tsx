import { UIKitProvider } from "@shared/ui-kit";
import { render } from "@testing-library/react";

const renderWithMantine = (children: React.ReactNode) =>
  render(<UIKitProvider>{children}</UIKitProvider>);

export default renderWithMantine;
