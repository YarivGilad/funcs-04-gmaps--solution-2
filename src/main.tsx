import * as ReactDOMClient from "react-dom/client";
import { App } from "./view/app";
import "./styles/global.styles.css";

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOMClient.createRoot(container);
root.render(<App />);
