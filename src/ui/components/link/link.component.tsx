import { PropsWithChildren, FC } from "react";

import { Routes } from "@/models/routes.model";
import { useRouter } from "@/hooks/use-router.hook";

interface LinkProps extends PropsWithChildren {
  to: Routes;
  className?: string;
  params?: Record<string, any>
}

const Link: FC<LinkProps> = ({ to, children, className, params }) => {
  const { goto } = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    goto(to, params);
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
};

export default Link;
