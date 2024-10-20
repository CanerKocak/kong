import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import "tippy.js/dist/tippy.css"; // optional
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { InternetIdentityProvider } from "ic-use-internet-identity";
import { PlugWalletProvider } from "./components/PlugWalletContext";
import { FRONTEND_URL } from "./constants/config";
import NotFoundPage from "./components/NotFoundPage";
import ActorWrapper from "./components/ActorWrapper";

import * as Actors from './Actors/allActors';

const actorList = Object.entries(Actors)
  .filter(([key]) => key.endsWith('Actor'))
  .map(([key, Actor]) => ({ Actor, Provider: Actors[`use${key.replace('Actor', '')}Backend`] }));

const router = createBrowserRouter([
  {
    path: "/", // Root route, this handles "/" only
    element: <App />,
    errorElement: <NotFoundPage />, // Catch all errors
    children: [
      {
        path: "", // This matches the root URL "/"
        element: <></>, // MainPage (or swap page) handled by App itself
      },
      {
        path: "stats", // This matches "/stats"
        element: <></>, // StatsPage handled by App itself
      },
    ],
  },
  {
    path: "*", // Catch-all route outside of the main App component for any other invalid routes
    element: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <InternetIdentityProvider
      loginOptions={{
        maxTimeToLive: BigInt(1) * BigInt(3_600_000_000_000), // 1 hours
        derivationOrigin:
          process.env.DFX_NETWORK === "local"
            ? "http://oaq4p-2iaaa-aaaar-qahqa-cai.localhost:4943"
            : "https://" + FRONTEND_URL + ".icp0.io",
      }}
    >
      <PlugWalletProvider>
        <ActorWrapper actors={actorList}>
          <RouterProvider router={router} />
        </ActorWrapper>
      </PlugWalletProvider>
    </InternetIdentityProvider>
  </React.StrictMode>
);
