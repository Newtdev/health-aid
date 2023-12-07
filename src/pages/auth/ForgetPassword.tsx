/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { InputError } from "../../components/InputError";
import Loader from "../../components/Loader";
import { LogoComp } from "../../components/LogoComp";
import { ROUTE } from "../../contants/AppRoute";
import axiosInstance from "../../api";
import { API_ROUTES } from "../../contants/ApiRoutes";

const Validation = yup.object().shape({
  email: yup.string().label("Email").email().required(),
});

export default function ForgotPassword() {
  const forgotPassword = useMutation(handleForgetPassword);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: Validation,
    onSubmit: (values) => {
      forgotPassword.mutate(values);
    },
  });

  async function handleForgetPassword({ email }: { email: string }) {
    try {
      const response = await axiosInstance.post(API_ROUTES.FORGOT_PASSWORD, {
        email: email,
      });
      toast.error(response?.data?.message);
      navigate(ROUTE.Update_Password);
    } catch (error: { data: { message: string } } | any) {
      toast.error(error?.data?.message);
    }
  }

  return (
    <section className="w-full h-screen  flex justify-center items-center">
      <article className="w-full md:w-[90%] flex items-center justify-center lg:p-16 bg-white rounded-lg ">
        {forgotPassword?.isLoading ? <Loader /> : null}
        {/* {forgotPassword?.isSuccess ? (
					<ModalComp
						header="Update Password"
						text="Check your email for update password link"
						show={forgotPassword.isSuccess}
					/>
				) : null} */}
        <form
          className="w-full flex flex-col gap-4 md:w-[90%]"
          onSubmit={formik.handleSubmit}>
          <div className="my-3">
            <div className="flex justify-center lg:hidden mb-6">
              <LogoComp />
            </div>
            <h1 className="text-primary-dark text-lg md:text-lg lg:text-3xl text-center">
              Forgot Password
            </h1>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Email address" />
            </div>
            <TextInput
              id="email1"
              placeholder=""
              required
              sizing="lg"
              type="email"
              color={
                formik.errors.email && formik.touched.email ? "failure" : "gray"
              }
              helperText={
                <InputError
                  error={formik.errors.email && formik.touched.email}
                  name={formik.errors?.email || ""}
                />
              }
              {...formik.getFieldProps("email")}
            />
          </div>

          <Button
            className="bg-primary-dark"
            disabled={!formik.isValid}
            size="lg"
            type="submit">
            Submit
          </Button>
          <div className="text-gray-700 flex flex-col md:flex-row items-center justify-center  lg:gap-x-2 text-xs md:text-base">
            <p>Don't have an account? </p>{" "}
            <Label htmlFor="remember" className="font-bold text-lg md:ml-2">
              <NavLink
                className="text-primary-dark text-sm md:text-base"
                to={ROUTE.Sign_up}>
                Create account
              </NavLink>
            </Label>
          </div>
        </form>
      </article>
    </section>
  );
}
