"use client";

import ApplicationLogo from "@/app/components/common/ApplicationLogo";
import AuthCard from "@/app/components/common/AuthCard";
import Button from "@/app/components/common/Button";
import Input from "@/app/components/common/Input";
import InputError from "@/app/components/common/InputError";
import Label from "@/app/components/common/Label";
import useAuth from "@/app/hooks/auth";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import AuthSessionStatus from "../components/AuthSessionStatus";

export default function Login() {
  const query = useSearchParams();

  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/monitoring",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shouldRemember, setShouldRemember] = useState(false);
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (query.get("reset")?.length > 0 && errors.length === 0) {
      setStatus(atob(query.get("reset")));
    } else {
      setStatus(null);
    }
  });

  const submitForm = async (event) => {
    event.preventDefault();

    login({
      email,
      password,
      remember: shouldRemember,
      setErrors,
      setStatus,
    });
  };

  return (
    <AuthCard
      logo={
        <Link href="/">
          <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
        </Link>
      }
    >
      <AuthSessionStatus className="mb-4" status={!!status} />
      <form onSubmit={submitForm}>
        {/* Email Address */}
        <div>
          <Label>Email</Label>

          <Input
            id="email"
            type="email"
            value={email}
            className="block mt-1 w-full"
            onChange={(event) => setEmail(event.target.value)}
            required
            autoFocus
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
            autoComplete="current-password"
          />

          <InputError messages={errors.password} className="mt-2" />
        </div>

        {/* Remember Me */}
        <div className="block mt-4">
          <label htmlFor="remember_me" className="inline-flex items-center">
            <input
              id="remember_me"
              type="checkbox"
              name="remember"
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              onChange={(event) => setShouldRemember(event.target.checked)}
            />

            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
        </div>

        <div className="flex items-center justify-end mt-4">
          <Link
            href="/forgot-password"
            className="underline text-sm text-gray-600 hover:text-gray-900"
          >
            Forgot your password?
          </Link>

          <Button className="ml-3">Login</Button>
        </div>
      </form>
    </AuthCard>
  );
}
