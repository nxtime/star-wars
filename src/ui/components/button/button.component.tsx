import React, { JSX } from 'react';
import { VariantProps } from 'class-variance-authority';
import { buttonVariants } from './button-variants';
import { Routes } from '@/models/routes.model';
import { useRouter } from '@/hooks/use-router.hook';
import "@/styles/components/button.scss";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    children: React.ReactNode;
    to?: Routes; // Optional prop to specify a route to navigate to
  } & {
    onClick?: (a?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  }

type HTMLElementProps<T extends keyof JSX.IntrinsicElements> = React.ComponentPropsWithoutRef<T>;

const Button = ({
  children,
  className,
  intent,
  size,
  text,
  animation,
  speed,
  timing,
  fullWidth,
  disabled,
  to,
  onClick,
  ...props
}: ButtonProps) => {
  const router = useRouter();

  const classes = buttonVariants({
    intent,
    size,
    animation,
    speed,
    timing,
    fullWidth,
    disabled,
    text,
    active: to === router.route,
    class: className,
  });

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(event);
  };

  if (to) {
    const handleAnchorClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();

      if (onClick) onClick();

      router.goto(to);
    }

    return (
      <a
        className={classes}
        href={to}
        onClick={handleAnchorClick}
        {...props as HTMLElementProps<"a">}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={handleButtonClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
