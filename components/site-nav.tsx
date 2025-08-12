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
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <span className="inline-flex size-7 items-center justify-center rounded-md border"><Sparkles className="size-4" /></span>
          <span>GlobeTrotter</span>
        </Link>
        <SignedOut>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link href="#benefits" className="hover:underline">Benefits</Link>
            <Link href="#specifications" className="hover:underline">Specifications</Link>
            <Link href="#how-to" className="hover:underline">How-to</Link>
            <Link href="#contact" className="hover:underline">Contact Us</Link>

          </nav>
        </SignedOut>
        <SignedIn>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {/* Use Link for internal navigation links */}
          <Link className="hover:text-primary transition-colors" href="/llm">AI Travel Planner</Link>
          <Link className="hover:text-primary transition-colors" href="/mapcalendar">Map & Calendar</Link>
        </nav>
        </SignedIn>
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
            <UserButton></UserButton>
          </SignedIn>
        </div>
      </div>
    </header>
  )
}