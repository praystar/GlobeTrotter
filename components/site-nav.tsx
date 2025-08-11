"use client"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useClerk } from "@clerk/nextjs"
import Link from "next/link"

export function SiteNav() {
  const { openSignIn } = useClerk()
  return (
    <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6">
        {/* Use Link for the logo to enable client-side routing */}
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-primary hover:text-primary/80 transition-colors">
          <span className="inline-flex size-7 items-center justify-center rounded-md border border-primary bg-primary/10">
            <Sparkles className="size-4 text-primary" />
          </span>
          <span>GlobeTrotter</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {/* Use Link for internal navigation links */}
          <Link className="hover:text-primary transition-colors" href="/llm">AI Travel Planner</Link>
          <Link className="hover:text-primary transition-colors" href="/mapcalendar">Map & Calendar</Link>
        </nav>

        <div className="flex items-center justify-end">
          <SignedOut>
            <Button
              className="h-10 rounded-full px-5"
              onClick={() => openSignIn()}
            >
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  )
}
