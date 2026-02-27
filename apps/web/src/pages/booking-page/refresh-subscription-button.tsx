import { useBookingsStore } from "@entities";
import { useSubscriptionState } from "@shared";
import { Button, Tooltip } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";

import s from "./booking-page.module.css";

const getIsSuccessConLabel = (v: boolean) =>
  v
    ? "Соединение активно. Нажмите, чтобы переподключиться к обновлениям статуса брони."
    : "Соединение неактивно. Нажмите, чтобы переподключиться к обновлениям статуса брони.";

const RefreshSubscriptionButton = () => {
  const { refreshRoomBookingStatusSubscription, subscription } =
    useBookingsStore();

  const store = useSubscriptionState(subscription?.room);

  const isConnected = store.status === "connected";

  const refreshSubscription = () => {
    if (!subscription?.currentRoomId) return;
    void refreshRoomBookingStatusSubscription();
  };

  return (
    <Tooltip
      position="bottom"
      withArrow
      openDelay={120}
      classNames={{ tooltip: s.refreshTooltip }}
      label={store.error || getIsSuccessConLabel(isConnected)}>
      <Button
        variant="light"
        radius="md"
        leftSection={<IconRefresh size={16} />}
        className={s.refreshButton}
        disabled={!subscription?.currentRoomId}
        loading={store.status === "connecting"}
        color={isConnected ? "green" : "red"}
        onClick={refreshSubscription}>
        Переподключиться
      </Button>
    </Tooltip>
  );
};

export default RefreshSubscriptionButton;
