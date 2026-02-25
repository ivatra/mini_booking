import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import "./index.css";
import RootDatesProvider from "./providers/dates-provider";
import RootMantineProvider from "./providers/mantine-provider";
import RootRouter from "./router";

const App = () => (
  <RootMantineProvider>
    <RootDatesProvider>
      <RootRouter />
    </RootDatesProvider>
  </RootMantineProvider>
);

export default App;
