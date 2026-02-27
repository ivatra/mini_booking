import { Group } from "@mantine/core";
import { useLocation } from "react-router-dom";

import s from "../layout.module.css";
import Logo from "./logo";
import NavigateBackButton from "./navigate-back-button";
import ThemeToggleButton from "./theme-toggle-button";
import OpenBookingModalButton from "../open-booking-modal-button";

const Header = () => {
  const location = useLocation();
  const isMainPage = location.pathname === "/";

  return (
    <Group className={s.headerWrapper}>
      <Logo />
      <Group gap="sm">
        {!isMainPage ? <NavigateBackButton /> : null}
        <OpenBookingModalButton />
        <ThemeToggleButton />
      </Group>
    </Group>
  );
};

export default Header;
