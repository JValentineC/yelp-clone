// import React from "react";
// import ReactDOM from "react-dom";
import App from "./app.jsx";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

import React from 'react';
// import { createRoot } from 'react-dom';
import { createRoot } from "react-dom/client";


const root = createRoot(document.getElementById('root'));

root.render(<App />);