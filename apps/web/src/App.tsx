import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import HotelDetailsPage from "./pages/HotelDetailsPage";
import HotelRoomsPage from "./pages/HotelRoomsPage";
import Layout from "./ui/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<HotelRoomsPage />}
          />
          <Route
            path="/:numId"
            element={<HotelDetailsPage />}
          />
          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
