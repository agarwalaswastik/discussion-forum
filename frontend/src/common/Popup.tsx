import { ReactNode } from "react";

export default function Popup({ children, title }: { children?: ReactNode; title: string }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-30 flex h-screen w-screen items-center justify-center">
      <div className="border-slate bg-secondary flex max-h-[70%] w-[90%] flex-col gap-4 overflow-auto rounded-lg border-2 p-4 sm:~w-60/120">
        <h1 className="text-heading text-center">{title}</h1>
        {children}
      </div>
    </div>
  );
}
