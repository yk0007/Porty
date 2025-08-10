import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import "./index.css";
import { router } from "./routes";
import { useEffect, useState } from 'react';

const App = () => {
  const [mounted, setMounted] = useState(false);

  // Prevent theme flashing on initial load
  useEffect(() => {
    // Force light theme on initial load to prevent flash
    const root = window.document.documentElement;
    root.classList.remove('dark');
    root.classList.add('light');
    
    // Set mounted to true after a small delay to ensure theme is applied
    const timer = setTimeout(() => {
      setMounted(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200" />
    );
  }

  return (
    <ThemeProvider 
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
};

export default App;