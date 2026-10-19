import { render } from "preact";
import { App } from "./App";
import { bootstrapColorMode } from "./theme/colorMode";
import "./index.css";

bootstrapColorMode();

const root = document.getElementById("app");
if (root) render(<App />, root);
