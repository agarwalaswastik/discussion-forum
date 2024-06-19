import { useState } from "react";
import clsx from "clsx";
import { Field } from "formik";

import type { FieldAttributes } from "formik";

export default function ThemedTextField({ isError, ...props }: FieldAttributes<unknown> & { isError: boolean }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="contents" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
      <Field
        className={clsx(
          "bg-primary text-content ~p-1/2 w-5/6 rounded-md border-2 outline-none",
          !focused && !isError && "border-slate",
          !focused && isError && "border-red-500",
          focused && "border-accent",
        )}
        {...props}
      />
    </div>
  );
}
