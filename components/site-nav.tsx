"use client"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useClerk } from "@clerk/nextjs"

export function SiteNav() {
  const { openSignIn } = useClerk()
  return (
    <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="./" className="flex items-center gap-2 text-lg font-semibold">
          <span className="inline-flex size-7 items-center justify-center rounded-md border"><Sparkles className="size-4" /></span>
          <span>Area</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <a className="hover:underline" href="#benefits">Benefits</a>
          <a className="hover:underline" href="#specs">Specifications</a>
          <a className="hover:underline" href="#howto">How-to</a>
          <a className="hover:underline" href="#contact">Contact Us</a>
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
            <UserButton></UserButton>
          </SignedIn>
        </div>
      </div>
    </header>
  )
}