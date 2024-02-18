import { HTMLAttributes } from "react";

interface ColorDisplayProps extends HTMLAttributes<HTMLDivElement> {
  color: string,
}

export function ColorDisplay({ color, className, ...props }: ColorDisplayProps) {
  return (
    <div 
      style={{backgroundColor: color}}
      className={`
        h-4 w-4 rounded-sm 
        ${className}
      `}
      {...props}
    />
  )
}