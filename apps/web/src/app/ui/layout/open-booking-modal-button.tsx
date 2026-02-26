import { useManageBookingModalStore } from "@entities";
import { Tooltip, ActionIcon } from "@mantine/core";
import { IconBookmarkPlus } from "@tabler/icons-react";

const actionIconColor =
  "light-dark(var(--mantine-color-orange-4), var(--mantine-color-orange-6))";

const OpenBookingModalButton = () => {
  const { openModal } = useManageBookingModalStore();

  return (
    <Tooltip
      position="bottom"
      withArrow
      openDelay={150}
      label="Нажмите, чтобы открыть меню создания брони">
      <ActionIcon
        radius="md"
        size="lg"
        variant="filled"
        color={actionIconColor}
        onClick={() => openModal()}
        aria-label="Открыть меню создания брони">
        <IconBookmarkPlus
          size={18}
          aria-hidden="true"
        />
      </ActionIcon>
    </Tooltip>
  );
};

export default OpenBookingModalButton;
