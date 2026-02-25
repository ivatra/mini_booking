import { Box, Title } from "@mantine/core";
import { IconBuilding } from "@tabler/icons-react";
import { Link } from "react-router-dom";

import s from "../layout.module.css";

const iconColor =
  "light-dark(var(--mantine-color-blue-6), var(--mantine-color-blue-3))";

const Logo = () => (
  <Box
    component={Link}
    to="/"
    className={s.headerLogo}>
    <IconBuilding
      size={22}
      style={{ color: iconColor }}
    />
    <Title order={4}>MiniBooking</Title>
  </Box>
);

export default Logo;
