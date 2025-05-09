"use client"

import { useState } from "react"
import { CalendarIcon, Link2 } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

export function ApplicationForm({ defaultValues = null, onComplete = () => {} }) {
  const [date, setDate] = useState(defaultValues?.dateApplied ? new Date(defaultValues.dateApplied) : new Date())

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would normally save the data
    console.log("Form submitted")
    onComplete()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="company">Company Name</Label>
          <Input id="company" placeholder="Company name" defaultValue={defaultValues?.company || ""} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="position">Position</Label>
          <Input id="position" placeholder="Job title" defaultValue={defaultValues?.position || ""} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="jobLink">Job Link</Label>
        <div className="flex">
          <div className="relative flex-1">
            <Link2 className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="jobLink"
              type="url"
              placeholder="https://example.com/job"
              className="pl-8"
              defaultValue={defaultValues?.jobLink || ""}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" placeholder="City, State or Remote" defaultValue={defaultValues?.location || ""} />
        </div>
        <div className="space-y-2">
          <Label>Date Applied</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Documents Submitted</Label>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="cv" defaultChecked={defaultValues?.cvSubmitted || false} />
            <Label htmlFor="cv" className="font-normal">
              Resume/CV
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="coverLetter" defaultChecked={defaultValues?.coverLetterSubmitted || false} />
            <Label htmlFor="coverLetter" className="font-normal">
              Cover Letter
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="portfolio" defaultChecked={defaultValues?.portfolioSubmitted || false} />
            <Label htmlFor="portfolio" className="font-normal">
              Portfolio
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Current Status</Label>
        <Select defaultValue={defaultValues?.status || "Applied"}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Applied">Applied</SelectItem>
            <SelectItem value="Interview">Interview</SelectItem>
            <SelectItem value="Offer">Offer</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
            <SelectItem value="On Hold">On Hold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          placeholder="Add any notes about this application"
          className="min-h-[100px]"
          defaultValue={defaultValues?.notes || ""}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onComplete}>
          Cancel
        </Button>
        <Button type="submit">{defaultValues ? "Update Application" : "Save Application"}</Button>
      </div>
    </form>
  )
}
