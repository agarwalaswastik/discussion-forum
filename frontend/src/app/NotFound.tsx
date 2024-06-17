import { selectTheme } from "../features/theme/themeSlice";
import { useAppSelector } from "./hooks";

export default function NotFound() {
  const mode = useAppSelector(selectTheme);

  return (
    <div className={`mx-4 flex h-full flex-col items-center justify-center gap-2`}>
      <h1 className={`text-4xl font-extrabold sm:text-5xl lg:text-6xl text-${mode}-text`}>404</h1>
      <h2 className={`text-heading text-${mode}-text`}>Page Not Found</h2>
    </div>
  );
}
