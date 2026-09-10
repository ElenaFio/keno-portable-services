import React from "react";
import logoLight from "@/assets/images/logo-keno.png";
import logoDark from "@/assets/images/logo-keno-dark.png";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
}

export const Logo: React.FC<LogoProps> = ({ className = "h-14", variant = "light" }) => {
  const isDark = variant === "dark";
  const logoSrc = isDark ? logoDark : logoLight;

  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src={logoSrc}
        alt="KENO Portable Services LLC"
        className="h-full w-auto max-h-16 object-contain"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

export default Logo;

