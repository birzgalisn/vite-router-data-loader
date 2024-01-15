import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "@/routes/root";
import CountAPI from "@/API/CountAPI";
import SearchParamsCache from "@/helpers/SearchParamsCache";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: async ({ request }) => {
      const { url } = request;

      return {
        fastCount: await SearchParamsCache.onDifferent(
          url,
          "fastCount",
          async (data) => await CountAPI.fetchFastCount(data)
        ),
        slowCount: SearchParamsCache.onDifferent(url, "slowCount", (data) =>
          CountAPI.fetchSlowCount(data)
        ),
      };
    },
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
