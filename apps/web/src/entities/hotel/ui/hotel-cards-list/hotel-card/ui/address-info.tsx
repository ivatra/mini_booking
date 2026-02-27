import { Group, Text } from "@shared/ui-kit";

import s from "../hotel-card.module.css";

interface IProps {
  city: string;
  address?: string;
}

const AddressInfo = ({ city, address }: IProps) => (
  <Group gap="0.4rem">
    <Text className={s.cityText}>{city},</Text>
    {address ? (
      <Text
        size="sm"
        className={s.address}>
        {address}
      </Text>
    ) : null}
  </Group>
);

export default AddressInfo;
