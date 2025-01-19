import Header from "../Header/Header.tsx";
import { ReactNode } from "react";

interface ILayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
  return (
    <div className="w-full min-h-screen grid grid-rows-[auto_1fr]">
      <Header />
      {children}
    </div>
  );
}
