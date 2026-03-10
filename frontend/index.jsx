import React from "react";
import { createRoot } from "react-dom/client";
import EduForm from "./EduForm";

const root = createRoot(document.getElementById("root"));
root.render(<EduForm onLogin={() => {}} />);
