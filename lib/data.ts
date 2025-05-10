// Mock data for the job application tracker
export const mockData = [
  {
    id: 1,
    company: "Google",
    position: "Frontend Developer",
    dateApplied: "2024-04-15",
    status: "Interview",
    cvSubmitted: true,
    coverLetterSubmitted: true,
    portfolioSubmitted: true,
    jobLink: "https://careers.google.com/jobs/123",
    location: "Mountain View, CA",
    notes: "Had first round interview on April 20. Waiting for feedback.",
    lastUpdated: "2024-04-20",
  },
  {
    id: 2,
    company: "Microsoft",
    position: "Software Engineer",
    dateApplied: "2024-04-10",
    status: "Applied",
    cvSubmitted: true,
    coverLetterSubmitted: false,
    portfolioSubmitted: true,
    jobLink: "https://careers.microsoft.com/jobs/456",
    location: "Redmond, WA",
    notes: "Applied through referral from John.",
    lastUpdated: "2024-04-10",
  },
  {
    id: 3,
    company: "Amazon",
    position: "Full Stack Developer",
    dateApplied: "2024-04-05",
    status: "Rejected",
    cvSubmitted: true,
    coverLetterSubmitted: true,
    portfolioSubmitted: false,
    jobLink: "https://amazon.jobs/789",
    location: "Seattle, WA",
    notes: "Received rejection email on April 12.",
    lastUpdated: "2024-04-12",
  },
  {
    id: 4,
    company: "Apple",
    position: "UI Engineer",
    dateApplied: "2024-04-18",
    status: "Applied",
    cvSubmitted: true,
    coverLetterSubmitted: true,
    portfolioSubmitted: true,
    jobLink: "https://jobs.apple.com/101112",
    location: "Cupertino, CA",
    notes: "Applied for the position through company website.",
    lastUpdated: "2024-04-18",
  },
  {
    id: 5,
    company: "Meta",
    position: "React Developer",
    dateApplied: "2024-04-01",
    status: "Offer",
    cvSubmitted: true,
    coverLetterSubmitted: false,
    portfolioSubmitted: true,
    jobLink: "https://careers.meta.com/131415",
    location: "Menlo Park, CA",
    notes: "Received offer on April 25. Need to respond by May 2.",
    lastUpdated: "2024-04-25",
  },
  {
    id: 6,
    company: "Netflix",
    position: "Senior Frontend Engineer",
    dateApplied: "2024-04-08",
    status: "Interview",
    cvSubmitted: true,
    coverLetterSubmitted: true,
    portfolioSubmitted: true,
    jobLink: "https://jobs.netflix.com/161718",
    location: "Los Gatos, CA",
    notes: "Second round interview scheduled for April 30.",
    lastUpdated: "2024-04-22",
  },
  {
    id: 7,
    company: "Airbnb",
    position: "UI/UX Developer",
    dateApplied: "2024-04-12",
    status: "On Hold",
    cvSubmitted: true,
    coverLetterSubmitted: true,
    portfolioSubmitted: true,
    jobLink: "https://careers.airbnb.com/192021",
    location: "San Francisco, CA",
    notes: "Position temporarily on hold due to restructuring.",
    lastUpdated: "2024-04-20",
  },
  {
    id: 8,
    company: "Spotify",
    position: "Frontend Engineer",
    dateApplied: "2024-04-14",
    status: "Applied",
    cvSubmitted: true,
    coverLetterSubmitted: false,
    portfolioSubmitted: true,
    jobLink: "https://www.spotifyjobs.com/222324",
    location: "New York, NY",
    notes: "Applied through LinkedIn Easy Apply.",
    lastUpdated: "2024-04-14",
  },
  {
    id: 9,
    company: "Twitter",
    position: "Software Developer",
    dateApplied: "2024-04-03",
    status: "Rejected",
    cvSubmitted: true,
    coverLetterSubmitted: true,
    portfolioSubmitted: false,
    jobLink: "https://careers.twitter.com/252627",
    location: "San Francisco, CA",
    notes: "Rejected after first round interview.",
    lastUpdated: "2024-04-15",
  },
  {
    id: 10,
    company: "Adobe",
    position: "Frontend Developer",
    dateApplied: "2024-04-17",
    status: "Applied",
    cvSubmitted: true,
    coverLetterSubmitted: true,
    portfolioSubmitted: true,
    jobLink: "https://www.adobe.com/careers/282930",
    location: "San Jose, CA",
    notes: "Applied with referral from Sarah.",
    lastUpdated: "2024-04-17",
  },
  {
    id: 11,
    company: "Salesforce",
    position: "UI Developer",
    dateApplied: "2024-04-09",
    status: "Interview",
    cvSubmitted: true,
    coverLetterSubmitted: false,
    portfolioSubmitted: true,
    jobLink: "https://salesforce.wd1.myworkdayjobs.com/313233",
    location: "San Francisco, CA",
    notes: "First round interview completed on April 18. Technical assessment next.",
    lastUpdated: "2024-04-18",
  },
  {
    id: 12,
    company: "Uber",
    position: "Frontend Engineer",
    dateApplied: "2024-04-11",
    status: "Applied",
    cvSubmitted: true,
    coverLetterSubmitted: true,
    portfolioSubmitted: false,
    jobLink: "https://www.uber.com/us/en/careers/343536",
    location: "San Francisco, CA",
    notes: "Applied through company website.",
    lastUpdated: "2024-04-11",
  },
]

// Cache for application statistics
let statsCache = null
let lastStatsUpdate = null
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Function to calculate application statistics with caching
export function getApplicationStats(applications) {
  const now = Date.now()
  
  // Return cached stats if they exist and are not expired
  if (statsCache && lastStatsUpdate && (now - lastStatsUpdate < CACHE_DURATION)) {
    return statsCache
  }

  const stats = {
    total: applications.length,
    applied: 0,
    interviews: 0,
    offers: 0,
    rejections: 0,
    onHold: 0,
  }

  applications.forEach((app) => {
    switch (app.status) {
      case "Applied":
        stats.applied++
        break
      case "Interview":
        stats.interviews++
        break
      case "Offer":
        stats.offers++
        break
      case "Rejected":
        stats.rejections++
        break
      case "On Hold":
        stats.onHold++
        break
    }
  })

  // Update cache
  statsCache = stats
  lastStatsUpdate = now

  return stats
}

// Memoized filter functions
const filterCache = new Map()

export function getFilteredApplications(applications, filters) {
  const cacheKey = JSON.stringify(filters)
  
  if (filterCache.has(cacheKey)) {
    return filterCache.get(cacheKey)
  }

  const filtered = applications.filter(app => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true
      return app[key] === value
    })
  })

  filterCache.set(cacheKey, filtered)
  return filtered
}

// Clear cache when data changes
export function clearCache() {
  statsCache = null
  lastStatsUpdate = null
  filterCache.clear()
}
