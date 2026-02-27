import { Title } from "@shared/ui-kit";

interface IProps {
  message: string;
}

const ErrorMessage = ({ message }: IProps) => (
  <Title
    order={3}
    c="red">
    {message}
  </Title>
);

export default ErrorMessage;
