"use client"

import { useState, useMemo, useCallback } from "react"
import { ArrowUpDown, Download, Filter, MoreHorizontal, PlusCircle, Search } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { mockData } from "@/lib/data"
import { ApplicationDialog } from "@/components/application-dialog"

export default function ApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("dateDesc")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState(null)

  // Memoize filtered and sorted applications
  const filteredApplications = useMemo(() => {
    return mockData
      .filter((app) => {
        const matchesSearch =
          app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.position.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === "all" || app.status === statusFilter

        return matchesSearch && matchesStatus
      })
      .sort((a, b) => {
        if (sortBy === "dateDesc") {
          return new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime()
        } else if (sortBy === "dateAsc") {
          return new Date(a.dateApplied).getTime() - new Date(b.dateApplied).getTime()
        } else if (sortBy === "company") {
          return a.company.localeCompare(b.company)
        } else if (sortBy === "status") {
          return a.status.localeCompare(b.status)
        }
        return 0
      })
  }, [searchTerm, statusFilter, sortBy])

  // Memoize handlers
  const handleEdit = useCallback((application) => {
    setSelectedApplication(application)
    setIsDialogOpen(true)
  }, [])

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value)
  }, [])

  const handleStatusFilter = useCallback((value) => {
    setStatusFilter(value)
  }, [])

  const handleSort = useCallback((value) => {
    setSortBy(value)
  }, [])

  const getStatusBadge = (status) => {
    switch (status) {
      case "Applied":
        return <Badge variant="outline">Applied</Badge>
      case "Interview":
        return <Badge variant="secondary">Interview</Badge>
      case "Offer":
        return <Badge className="bg-green-500">Offer</Badge>
      case "Rejected":
        return <Badge variant="destructive">Rejected</Badge>
      case "On Hold":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            On Hold
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Applications</h2>
        <Button asChild>
          <Link href="/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Application
          </Link>
        </Button>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search applications..."
              className="w-full pl-8"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleStatusFilter("all")}>All Applications</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusFilter("Applied")}>Applied</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusFilter("Interview")}>Interview</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusFilter("Offer")}>Offer</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusFilter("Rejected")}>Rejected</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusFilter("On Hold")}>On Hold</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Select defaultValue="dateDesc" onValueChange={handleSort}>
            <SelectTrigger className="h-9 w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dateDesc">Newest first</SelectItem>
              <SelectItem value="dateAsc">Oldest first</SelectItem>
              <SelectItem value="company">Company name</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Button variant="outline" size="sm" className="h-9">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden rounded-md border md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">
                <div className="flex items-center space-x-1">
                  <span>Company</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Date Applied</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>CV Submitted</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplications.map((application, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{application.company}</TableCell>
                <TableCell>{application.position}</TableCell>
                <TableCell>{new Date(application.dateApplied).toLocaleDateString()}</TableCell>
                <TableCell>{getStatusBadge(application.status)}</TableCell>
                <TableCell>{application.cvSubmitted ? "Yes" : "No"}</TableCell>
                <TableCell>{new Date(application.lastUpdated).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleEdit(application)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="grid gap-4 md:hidden">
        {filteredApplications.map((application, i) => (
          <Card key={i}>
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{application.company}</CardTitle>
                  <CardDescription>{application.position}</CardDescription>
                </div>
                {getStatusBadge(application.status)}
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="grid gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Applied:</span>
                  <span>{new Date(application.dateApplied).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">CV Submitted:</span>
                  <span>{application.cvSubmitted ? "Yes" : "No"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span>{new Date(application.lastUpdated).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-end mt-2">
                  <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(application)}>
                    Edit
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {isDialogOpen && (
        <ApplicationDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} defaultValues={selectedApplication} />
      )}
    </div>
  )
}
