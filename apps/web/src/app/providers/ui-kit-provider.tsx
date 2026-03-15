import { UIKitProvider } from "@shared/ui-kit";

interface IProps {
  children: React.ReactNode;
}

const RootUiKitProvider = ({ children }: IProps) => (
  <UIKitProvider defaultColorScheme="dark">{children}</UIKitProvider>
);

export default RootUiKitProvider;
