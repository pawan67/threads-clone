"use client";
import { FC, useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { Laptop, Moon, Sun } from "lucide-react";
interface ThemeChangeProps {}

const ThemeChange: FC<ThemeChangeProps> = ({}) => {
  return (
    <div className=" flex justify-between  space-x-5 ">
      <div>
        <h2 className="  font-medium">Application Appearence</h2>
        <div className=" text-sm text-muted-foreground">
          Change how the application looks by selecting a theme from the options
        </div>
      </div>
      <ThemeChanger />
    </div>
  );
};

export default ThemeChange;

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className=" p-2.5" size="icon" variant="secondary">
          {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun size={16} className=" mr-2" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon size={16} className=" mr-2" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Laptop size={16} className=" mr-2" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
