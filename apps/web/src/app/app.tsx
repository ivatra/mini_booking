import "./ui-kit-styles";
import "./index.css";
import RootDatesProvider from "./providers/dates-provider";
import RootUiKitProvider from "./providers/ui-kit-provider";
import RootRouter from "./router";

const App = () => (
  <RootUiKitProvider>
    <RootDatesProvider>
      <RootRouter />
    </RootDatesProvider>
  </RootUiKitProvider>
);

export default App;
