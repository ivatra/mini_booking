import { BookingPage, DetailsPage, HomePage } from "@pages";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import ModalsProvider from "./providers/modals-provider";
import Layout from "./ui/layout/layout";

const RootRouter = () => (
  <BrowserRouter>
    <Layout>
      <ModalsProvider>
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
      </ModalsProvider>
    </Layout>
  </BrowserRouter>
);

export default RootRouter;
