import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/app/theme-provider";
import { Button } from "@/lib/ui/button";

export function ThemeToggle() {
  const { resolved, toggle } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={resolved === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
      title={resolved === "dark" ? "Modo claro" : "Modo escuro"}
    >
      {resolved === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}
