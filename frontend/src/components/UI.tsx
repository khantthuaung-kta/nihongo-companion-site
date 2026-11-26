import React from "react";

interface Props {
  children: React.ReactNode;
}

export const Card: React.FC<Props> = ({ children }) => (
  <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-6 shadow-lg">
    {children}
  </div>
);

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className, ...props }) => (
  <button
    className={
      "inline-flex items-center justify-center rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-50 " +
      (className ?? "")
    }
    {...props}
  />
);

export const Heading: React.FC<{ level?: 1 | 2 | 3; children: React.ReactNode }> = ({
  level = 2,
  children,
}) => {
  const cls = "text-xl font-bold tracking-tight text-slate-50";
  if (level === 1) return <h1 className={"text-3xl " + cls}>{children}</h1>;
  if (level === 3) return <h3 className={"text-base " + cls}>{children}</h3>;
  return <h2 className={cls}>{children}</h2>;
};

export const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center rounded-full bg-sky-500/15 px-3 py-1 text-xs font-medium text-sky-300 ring-1 ring-inset ring-sky-500/30">
    {children}
  </span>
);