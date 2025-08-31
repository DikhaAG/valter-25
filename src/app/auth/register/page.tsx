"use server"

import { RegisterForm } from "@/components/auth/RegisterForm"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function RegisterPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session) {
    return redirect("/")
  }
  if (session.user.divisi !== "superadmin") {
    return redirect("/admin")
  }
  return <RegisterForm />
}
