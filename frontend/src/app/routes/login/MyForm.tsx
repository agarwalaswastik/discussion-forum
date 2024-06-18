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
      <Form className="~gap-2/4 flex w-full flex-col items-center">
        {children}
        <hr className="~h-1/2" />
        <MyButton type="submit">Submit</MyButton>
      </Form>
    </Formik>
  );
}
