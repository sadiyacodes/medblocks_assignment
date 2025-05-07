import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { PGliteProvider } from "@electric-sql/pglite-react";
import { PGlite } from "@electric-sql/pglite";
import { live } from "@electric-sql/pglite/live";

const db = await PGlite.create({
  extensions: { live },
  dataDir: "idb://patient-db",
});

await db.exec(`
   CREATE TABLE IF NOT EXISTS patients 
        (id SERIAL PRIMARY KEY,
        name TEXT,
        email TEXT,
        age INTEGER,
        symptoms TEXT);
`);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PGliteProvider db={db}>
      <App />
    </PGliteProvider>
  </StrictMode>
);
