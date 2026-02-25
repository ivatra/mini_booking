import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import "./index.css";
import RootDatesProvider from "./providers/dates-provider";
import RootMantineProvider from "./providers/mantine-provider";
import ModalsProvider from "./providers/modals-provider";
import RootRouter from "./router";

const App = () => (
  <RootMantineProvider>
    <RootDatesProvider>
      <ModalsProvider>
        <RootRouter />
      </ModalsProvider>
    </RootDatesProvider>
  </RootMantineProvider>
);

export default App;
