import { UIKitProvider } from "@shared/ui-kit";

interface IProps {
  children: React.ReactNode;
}

const RootUiKitProvider = ({ children }: IProps) => (
  <UIKitProvider defaultColorScheme="light">{children}</UIKitProvider>
);

export default RootUiKitProvider;
