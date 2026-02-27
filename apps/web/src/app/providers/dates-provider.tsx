import { DatesProvider } from "@shared/ui-kit";

interface IProps {
  children: React.ReactNode;
}

const RootDatesProvider = ({ children }: IProps) => (
  <DatesProvider settings={{ locale: "ru" }}>{children}</DatesProvider>
);

export default RootDatesProvider;
