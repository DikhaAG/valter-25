"use server"

import { SignInForm } from "@/components/auth/SignInForm"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function SignInPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (session) {
    if (session.user.role === "admin") {
      return redirect("/admin")
    }
    return redirect("/")
  }
  return <SignInForm />
}
