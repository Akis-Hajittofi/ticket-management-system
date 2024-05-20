"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import UserAuthForm from "./UserAuthForm";
import { buttonVariants } from "@/components/ui/button";
import { Ticket } from "lucide-react";

function Login() {
  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Ticket className="mr-2 h-6 w-6" />
          TMS
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This system allows me to easily manage support requests,
              the difference of this compared to manual spreadsheets is night
              and day!&rdquo;
            </p>
            <footer className="text-sm">Ahmed Ali</footer>
          </blockquote>
        </div>
      </div>
      <div className="p-8 h-screen flex flex-col justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome</h1>
            <p className="text-sm text-muted-foreground">
              Stay updated with your support tickets
            </p>
          </div>
          <UserAuthForm />
          {/* <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p> */}
        </div>
      </div>
    </div>
  );
}
export default Login;
