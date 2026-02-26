import OpenBookingModalButton from "@app/ui/layout/open-booking-modal-button";
import { useManageBookingModalStore } from "@entities";
import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import renderWithMantine from "./render-with-mantine";

vi.mock("@entities", () => ({
  useManageBookingModalStore: vi.fn(),
}));

describe("OpenBookingModalButton", () => {
  const openModal = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useManageBookingModalStore).mockReturnValue({
      isOpen: false,
      openModal,
      closeModal: vi.fn(),
    });
  });

  it("renders button and calls openModal on click", () => {
    renderWithMantine(<OpenBookingModalButton />);

    const button = screen.getByRole("button", {
      name: /открыть меню создания брони/i,
    });

    fireEvent.click(button);

    expect(openModal).toHaveBeenCalledTimes(1);
    expect(true);
  });
});
