import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

import s from "../hotel-card.module.css";

interface IProps {
  id: string;
}

const NavigateHotelPageButton = ({ id }: IProps) => (
  <Button
    className={s.openRoomsButton}
    variant="light"
    fullWidth
    component={Link}
    to={`/${id}`}>
    Перейти к номерам
  </Button>
);

export default NavigateHotelPageButton;
