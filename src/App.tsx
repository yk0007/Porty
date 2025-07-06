import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import "./index.css";
import { router } from "./routes";
import { useEffect } from 'react';
const App = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen">
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
};

export default App;