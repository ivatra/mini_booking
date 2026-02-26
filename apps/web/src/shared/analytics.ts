import posthog from "posthog-js";

import { getEnvVar } from "./data/helpers";

type AnalyticsEventMap = {
  booking_button_clicked: {
    bookingId: string;
    roomId: string;
    action: "book" | "cancel";
    currentStatus: "avaliable" | "busy";
  };
  booking_action_succeeded: {
    bookingId: string;
    action: "book" | "cancel";
  };
  booking_action_failed: {
    bookingId: string;
    action: "book" | "cancel";
    reason: string;
  };
};

const analytics = {
  started: false,
  init() {
    const key = import.meta.env.VITE_POSTHOG_KEY;
    const host = import.meta.env.VITE_POSTHOG_HOST;

    if (!key) {
      if (getEnvVar("DEV")) {
        console.warn(
          "Не получилось достать ключ для posthog. Пропускаю инициализацию",
        );

        return;
      }
    }
    posthog.init(key, {
      api_host: host,
      capture_pageview: true,
    });

    this.started = true;
  },

  track<E extends keyof AnalyticsEventMap>(
    event: E,
    props: AnalyticsEventMap[E],
  ) {
    if (this.started) {
      posthog.capture(event, props);
    }
  },
};

export default analytics;
