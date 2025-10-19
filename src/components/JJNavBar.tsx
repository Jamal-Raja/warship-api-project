import { cn } from "@/util/ClassCombine";
import { useEffect, useState, type ReactNode } from "react";

interface NavBarProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

function NavBar({ children, className, ...props }: NavBarProps) {
  const [visible, setVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const newScrollY = window.scrollY;

      if (newScrollY > scrollY && newScrollY > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setScrollY(newScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  return (
    <div
      {...props}
      className={cn(
        `bg-fuchsia-400/70 rounded-2xl py-1 min-h-4 px-20 duration-300 flex justify-between items-center fixed top-1 left-0 right-0 max-w-11/12 mx-auto ${
          visible ? "translate-y-0" : "-translate-y-[120%]"
        }`,
        className
      )}
    >
      {children}
    </div>
  );
}

export default NavBar;