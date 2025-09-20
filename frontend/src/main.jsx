import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ThemeToggle from "./components/ThemeToggle.jsx";
import { UserProvider } from "./context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <ThemeToggle /> */}
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>
);
