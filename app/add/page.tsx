"use client"

import { ApplicationForm } from "@/components/application-form"

export default function AddApplicationPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Add New Application</h2>
      <div className="max-w-2xl mx-auto">
        <ApplicationForm />
      </div>
    </div>
  )
}
