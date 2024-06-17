import { useAppSelector } from "../app/hooks";
import { selectTheme } from "../features/theme/themeSlice";

export default function Loading() {
  const mode = useAppSelector(selectTheme);

  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-white bg-opacity-5">
      <div className={`h-20 w-20 rounded-full border-l-4 border-t-4 border-${mode}-accent absolute animate-spin`}></div>
    </div>
  );
}
