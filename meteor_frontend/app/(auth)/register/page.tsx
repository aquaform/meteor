"use client";

import Link from "next/link";
import { useState } from "react";
import Input from "@/app/components/common/Input";
import Button from "@/app/components/common/Button";
import InputError from "@/app/components/common/InputError";
import Label from "@/app/components/common/Label";
import useAuth from "@/app/hooks/auth";
import GuestLayout from "@/app/components/common/GuestLayout";
import ApplicationLogo from "@/app/components/common/ApplicationLogo";
import AuthCard from "@/app/components/common/AuthCard";

function Register() {
  const { register } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);

  const submitForm = (event) => {
    event.preventDefault();

    register({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
      setErrors,
    });
  };

  return (
    <AuthCard
      logo={
        <Link href="/monitoring">
          <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
        </Link>
      }
    >
      <form onSubmit={submitForm}>
        {/* Name */}
        <div>
          <Label>Name</Label>

          <Input
            id="name"
            type="text"
            value={name}
            className="block mt-2 w-full"
            onChange={(event) => setName(event.target.value)}
            required
            autoFocus
          />

          <InputError messages={errors.name} className="mt-2" />
        </div>

        {/* Email Address */}
        <div className="mt-4">
          <Label>Email</Label>

          <Input
            id="email"
            type="email"
            value={email}
            className="block mt-1 w-full"
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <InputError messages={errors.email} className="mt-2" />
        </div>

        {/* Password */}
        <div className="mt-4">
          <Label>Password</Label>

          <Input
            id="password"
            type="password"
            value={password}
            className="block mt-1 w-full"
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="new-password"
          />

          <InputError messages={errors.password} className="mt-2" />
        </div>

        {/* Confirm Password */}
        <div className="mt-4">
          <Label>Confirm Password</Label>

          <Input
            id="passwordConfirmation"
            type="password"
            value={passwordConfirmation}
            className="block mt-1 w-full"
            onChange={(event) => setPasswordConfirmation(event.target.value)}
            required
          />

          <InputError
            messages={errors.password_confirmation}
            className="mt-2"
          />
        </div>

        <div className="flex items-center justify-end mt-4">
          <Link
            href="/login"
            className="underline text-sm text-gray-600 hover:text-gray-900"
          >
            Already registered?
          </Link>

          <Button className="ml-4">Register</Button>
        </div>
      </form>
    </AuthCard>
  );
}

export default Register;
