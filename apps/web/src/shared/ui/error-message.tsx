import { Title } from "@shared/ui-kit";

interface IProps {
  message: string;
}

export const ErrorMessage = ({ message }: IProps) => (
  <Title
    order={3}
    c="red">
    {message}
  </Title>
);
