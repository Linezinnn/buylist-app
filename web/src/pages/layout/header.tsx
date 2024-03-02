import { ReactNode } from "react";

import { SettingsMenu } from "./components/settings-menu";
import { ToggleThemeMenu } from "@/components/toggle-theme-menu";

interface LayoutHeaderProps {
  children?: ReactNode
}

export function LayoutHeader({ children }: LayoutHeaderProps) {
  return (
    <div className="max-w-5xl mx-auto flex flex-col py-8 px-6 gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl md:text-3xl">Lista de Compras</h1>
        <div className="flex">
          <ToggleThemeMenu />
          <SettingsMenu />
        </div>
      </div>
      {children}
    </div>
  )
}