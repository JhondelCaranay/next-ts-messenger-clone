"use client";

import { BsGithub, BsGoogle } from "react-icons/bs";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/app/components/inputs/Input";
import { z } from "zod";
import Button from "@/app/components/Button";
import AuthSocialButton from "./AuthSocialButton";

type Variant = "LOGIN" | "REGISTER";

const schema = z.object({
  name: z.string().nonempty("Name is required").nullish(),
  email: z.string().nonempty("Name is required").email("Email format is not valid"),
  password: z.string().nonempty("Password is required"),
});

export type FormValues = z.infer<typeof schema> | FieldValues;

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  /* hook form */
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      name: null,
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    reset();
    variant === "LOGIN" ? setValue("name", null) : setValue("name", "");
  }, [variant]);

  /* switch between login and register */
  const toggleVariant = useCallback(() => {
    variant === "LOGIN" ? setVariant("REGISTER") : setVariant("LOGIN");
  }, [variant]);

  const onSubmit = async (data: FormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log({ data });

    if (variant === "LOGIN") {
      // Axios Register
    }
    if (variant === "REGISTER") {
      // Next auth sign in
    }

    reset();
  };

  /* social login */
  const socialAction = (action: string) => {
    // setIsLoading(true);
    // signIn(action, { redirect: false })
    //   .then((callback) => {
    //     if (callback?.error) {
    //       toast.error("Invalid credentials!");
    //     }
    //     if (callback?.ok) {
    //       router.push("/conversations");
    //     }
    //   })
    //   .finally(() => setIsLoading(false));
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div
        className="
        bg-white
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
        "
      >
        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            disabled={isLoading || isSubmitting}
            register={register}
            errors={errors}
            required
            id="name"
            label="Name"
            hidden={variant === "LOGIN"}
          />
          <Input
            disabled={isLoading || isSubmitting}
            register={register}
            errors={errors}
            required
            id="email"
            label="Email address"
            type="email"
          />
          <Input
            disabled={isLoading || isSubmitting}
            register={register}
            errors={errors}
            required
            id="password"
            label="Password"
            type="password"
          />
          <div>
            <Button disabled={isLoading || isSubmitting} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div
              className="
                absolute 
                inset-0 
                flex 
                items-center
              "
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton icon={BsGithub} onClick={() => socialAction("github")} />
            <AuthSocialButton icon={BsGoogle} onClick={() => socialAction("google")} />
          </div>
        </div>
        <div
          className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          "
        >
          <div>{variant === "LOGIN" ? "New to Messenger?" : "Already have an account?"}</div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthForm;
