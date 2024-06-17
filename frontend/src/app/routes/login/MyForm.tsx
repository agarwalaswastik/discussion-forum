import { Form, Formik, type FormikHelpers } from "formik";
import MyButton from "../../../common/MyButton";
import type { ReactNode } from "react";

interface MyFormAttributes<T> {
  initialValues: T;
  onSubmit: (values: T, actions: FormikHelpers<T>) => Promise<void>;
  children: ReactNode;
}
export default function MyForm<T extends object>({ initialValues, onSubmit, children, ...props }: MyFormAttributes<T>) {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} {...props}>
      <Form className="flex w-full flex-col items-center gap-2 lg:gap-4">
        {children}
        <MyButton className="mt-2" type="submit">
          Submit
        </MyButton>
      </Form>
    </Formik>
  );
}
