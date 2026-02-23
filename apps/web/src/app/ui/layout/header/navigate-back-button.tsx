import { ActionIcon, Tooltip } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const NavigateBackButton = () => {
  const navigate = useNavigate();

  return (
    <Tooltip
      withArrow
      position="bottom"
      openDelay={150}
      label="Вернуться назад">
      <ActionIcon
        radius="md"
        size="lg"
        variant="filled"
        bg="light-dark(var(--mantine-color-blue-6), var(--mantine-color-blue-6))"
        onClick={() => navigate(-1)}
        aria-label="Вернуться назад">
        <IconArrowLeft size={18} />
      </ActionIcon>
    </Tooltip>
  );
};

export default NavigateBackButton;
