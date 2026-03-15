import { BookingPage, DetailsPage, HomePage } from "@pages";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Layout from "./ui/layout/layout";

const RootRouter = () => (
  <BrowserRouter basename="/s/booking">
    <Layout>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/hotels/:hotelId"
          element={<DetailsPage />}
        />
        <Route
          path="/rooms/:roomId"
          element={<BookingPage />}
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

export default RootRouter;
