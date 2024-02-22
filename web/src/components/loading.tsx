import { HTMLAttributes } from "react";

interface LoadingProps extends HTMLAttributes<HTMLDivElement> {}

export function Loading({className, ...props}: LoadingProps) {
  return (
    <div 
      className={`
          w-4 h-4
          rounded-full
          border-l-white border-gray-600 border
          animate-spin
          ease-linear
          self-center
          ${className}
      `}
      {...props}
    />
  )
}