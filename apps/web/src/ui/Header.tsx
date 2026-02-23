import { ActionIcon, Group, Title, Tooltip } from "@mantine/core";
import { IconArrowLeft, IconBuilding, IconRefresh } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";

import type { TActionIconProps } from "../types";
import {
  headerActionIconStaticProps,
  headerGoBackProps,
  headerGroupProps,
} from "./Header.styles";
import { ThemeToggle } from "./ThemeToggle";

// позже заменишь на свой store
const isSuccessConnection = true; // store.isSuccessConnection
const refreshSubscription = () => {
  // store.refreshSubscription()
};

const actionIconProps: TActionIconProps = {
  ...headerActionIconStaticProps,
  color: isSuccessConnection ? "green.4" : "red.4",
  onClick: refreshSubscription,
  "aria-label": isSuccessConnection
    ? "Соединение активно. Нажмите чтобы обновить подписку на обновление"
    : "Соединение неактивно. Нажмите чтобы обновить подписку на обновление",
};

const iconColor =
  "light-dark(var(--mantine-color-blue-6), var(--mantine-color-blue-3))";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMainPage = location.pathname === "/";

  return (
    <Group {...headerGroupProps}>
      <Group gap="xs">
        <IconBuilding
          size={22}
          style={{ color: iconColor }}
        />
        <Title order={4}>MiniBooking</Title>
      </Group>
      <Group gap="sm">
        {!isMainPage ? (
          <Tooltip
            withArrow
            position="bottom"
            openDelay={150}
            label="Вернуться назад">
            <ActionIcon
              {...headerGoBackProps}
              onClick={() => navigate(-1)}
              aria-label="Вернуться назад">
              <IconArrowLeft size={18} />
            </ActionIcon>
          </Tooltip>
        ) : null}
        <ThemeToggle />
        <Tooltip
          position="bottom"
          withArrow
          openDelay={150}
          label="Нажмите чтобы обновить подписку на обновление">
          <ActionIcon {...actionIconProps}>
            <IconRefresh
              size={18}
              aria-hidden="true"
            />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Group>
  );
};

export default Header;
