import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FinalFrame } from "./screens/FinalFrame";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <FinalFrame />
  </StrictMode>,
);
