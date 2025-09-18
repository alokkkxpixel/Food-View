import { Sun, Moon } from "lucide-react";
import { useTheme } from "../Hooks/useTheme";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex items-center absolute top-1 left-1 z-100 gap-2 px-2 py-2 bg-gray-200 dark:bg-zinc-900 rounded-full 
                 hover:bg-gray-300 dark:hover:bg-zinc-700 transition"
    >
      {theme === "dark" ? (
        <>
          <Sun size={18} className="text-yellow-400" />
        </>
      ) : (
        <>
          <Moon size={18} className="text-gray-600" />
        </>
      )}
    </button>
  );
}
