import { Button } from "@shared/ui-kit";
import { useNavigate } from "react-router-dom";

interface IProps {
  text: string;
  goTo: string;
  disabled?: boolean;
}

export const NavigateButton = ({ text, goTo, disabled }: IProps) => {
  const navigate = useNavigate();

  return (
    <Button
      disabled={disabled}
      variant="light"
      fullWidth
      onClick={() => !disabled && navigate(goTo)}>
      {text}
    </Button>
  );
};
