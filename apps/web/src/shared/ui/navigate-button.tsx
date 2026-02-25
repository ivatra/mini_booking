import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

interface IProps {
  text: string;
  goTo: string;
}
const NavigateButton = ({ text, goTo }: IProps) => (
  <Button
    variant="light"
    fullWidth
    component={Link}
    to={goTo}>
    {text}
  </Button>
);

export default NavigateButton;
