"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import ApplicationLogo from "@/app/components/common/ApplicationLogo";
import AuthCard from "@/app/components/common/AuthCard";
import AuthSessionStatus from "@/app/(auth)/components/AuthSessionStatus";
import Button from "@/app/components/common/Button";
import Input from "@/app/components/common/Input";
import InputError from "@/app/components/common/InputError";
import Label from "@/app/components/common/Label";
import useAuth from "@/app/hooks/auth";

function ForgotPassword() {
  const { forgotPassword } = useAuth({ middleware: "guest" });

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    forgotPassword({ email, setErrors, setStatus });
  };

  return (
    <AuthCard
      logo={
        <Link href="/">
          <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
        </Link>
      }
    >
      <div className="mb-4 text-sm text-gray-600">
        Forgot your password? No problem. Just let us know your email address
        and we will email you a password reset link that will allow you to
        choose a new one.
      </div>

      {/* Session Status */}
      <AuthSessionStatus className="mb-4" status={!!status} />

      <form onSubmit={submitForm}>
        {/* Email Address */}
        <div>
          <Label>Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={email}
            className="block mt-1 w-full"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value)
            }
            required
            autoFocus
          />

          <InputError messages={errors.email} className="mt-2" />
        </div>

        <div className="flex items-center justify-end mt-4">
          <Button>Email Password Reset Link</Button>
        </div>
      </form>
    </AuthCard>
  );
}

export default ForgotPassword;
