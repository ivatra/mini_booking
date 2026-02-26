import { expect, test } from "@playwright/test";

test("home page shows hotels from mock data", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Aurora Hotel")).toBeVisible();
  await expect(page.getByText("Neva Hotel")).toBeVisible();
});

test("details page opens and shows room cards", async ({ page }) => {
  await page.goto("/hotels/hotel-1");

  await expect(page.getByText("Отель Aurora Hotel")).toBeVisible();
  await expect(page.getByText("Комната 101")).toBeVisible();
});

test("booking page opens and shows room info", async ({ page }) => {
  await page.goto("/rooms/room-101");

  await expect(page.getByText("Комната 101")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Забронировать" }),
  ).toBeVisible();
});
