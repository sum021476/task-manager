import {createRoot} from "react-dom/client";
import Context from "./components/context/Context";
import App from "./App";
createRoot(document.getElementById('root')).render(<Context><App></App></Context>)