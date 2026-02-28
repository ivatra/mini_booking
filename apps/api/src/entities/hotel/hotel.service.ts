import { hotelsStore } from "@common/store.js";

import type { Hotel } from "./hotel.types.js";

export class HotelService {
  getAll(): Hotel[] {
    return hotelsStore;
  }

  public getById(id: string): Hotel | undefined {
    return hotelsStore.find((hotel) => hotel.id === id);
  }
}
