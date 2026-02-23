import { DetailsPage, HomePage } from "@pages";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Layout from "./ui/layout/layout";

const RootRouter = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/:numId"
          element={<DetailsPage />}
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
