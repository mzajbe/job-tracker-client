"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ApplicationForm } from "@/components/application-form"

export function ApplicationDialog({ open, onOpenChange, defaultValues = null }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{defaultValues ? "Edit Application" : "Add New Application"}</DialogTitle>
        </DialogHeader>
        <ApplicationForm defaultValues={defaultValues} onComplete={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}
