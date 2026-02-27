import { IconRefresh } from "@shared/icons";
import { Tooltip, ActionIcon, type ActionIconProps } from "@shared/ui-kit";

// позже заменишь на свой store
const isSuccessConnection = true; // store.isSuccessConnection
const refreshSubscription = () => {
  // store.refreshSubscription()
};

const actionIconProps: ActionIconProps = {
  radius: "md",
  size: "lg",
  variant: "filled",
};

const getIsSuccessConLabel = (v: boolean) =>
  v
    ? "Соединение активно. Нажмите чтобы обновить подписку на обновление"
    : "Соединение неактивно. Нажмите чтобы обновить подписку на обновление";

const RefreshSubscriptionButton = () => (
  <Tooltip
    position="bottom"
    withArrow
    openDelay={150}
    label="Нажмите чтобы обновить подписку на обновление">
    <ActionIcon
      onClick={refreshSubscription}
      aria-label={getIsSuccessConLabel(isSuccessConnection)}
      color={isSuccessConnection ? "green.4" : "red.4"}
      {...actionIconProps}>
      <IconRefresh
        size={18}
        aria-hidden="true"
      />
    </ActionIcon>
  </Tooltip>
);

export default RefreshSubscriptionButton;
