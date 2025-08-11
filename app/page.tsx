"use client"

import Image from "next/image"
import { Smartphone, Globe, Languages, TrendingUp, Sparkles, Check, ArrowRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="font-sans">
      <main>
        <HeroSection />
        <TrustedBy />
        <BenefitsSection />
        <BigPictureSection />
        <SpecsSection />
        <TestimonialSection />
        <HowToSection />
        <ContactCTA />
      </main>
      <SiteFooter />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-10 sm:px-6 sm:pb-16 sm:pt-14">
        <h1 className="text-center font-serif text-[clamp(40px,7vw,96px)] leading-[0.9] tracking-tight">Browse everything.</h1>
        <div className="relative mt-10 sm:mt-14">
          {/* green rounded backdrop */}
          <div className="absolute left-1/2 top-1/2 -z-10 h-[180px] w-[min(100%,900px)] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-[#8E9C78] sm:h-[220px]" />
          {/* tablet-like visual */}
          <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-[18px] border-[6px] border-black/70 shadow-2xl">
            <div className="relative aspect-[16/9] w-full">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.5),rgba(255,255,255,0)),url('/globe.svg')] bg-contain bg-center bg-no-repeat" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="pointer-events-none rounded-xl bg-black/5 p-2.5 text-lg font-medium text-foreground/80 backdrop-blur-sm">
                  78% Efficiency Improvements
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustedBy() {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <p className="text-center text-sm text-muted-foreground">Trusted by:</p>
        <div className="mt-4 grid grid-cols-2 items-center justify-items-center gap-6 sm:grid-cols-3 md:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="text-muted-foreground text-sm">Logoipsum</div>
          ))}
        </div>
      </div>
    </section>
  )
}

function BenefitsSection() {
  const items = [
    { icon: Sparkles, title: "Amplify Insights", body: "Unlock data-driven decisions with comprehensive analytics, revealing key opportunities for strategic regional growth." },
    { icon: Globe, title: "Control Your Global Presence", body: "Manage and track satellite offices, ensuring consistent performance and streamlined operations everywhere." },
    { icon: Languages, title: "Remove Language Barriers", body: "Adapt to diverse markets with built-in localization for clear communication and enhanced user experience." },
    { icon: TrendingUp, title: "Visualize Growth", body: "Generate precise, visually compelling reports that illustrate your growth trajectories across all regions." },
  ]

  return (
    <section id="benefits" className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <Badge variant="secondary" className="mb-3">Benefits</Badge>
          <h2 className="text-pretty text-3xl font-semibold sm:text-4xl">We&apos;ve cracked the code.</h2>
          <p className="text-muted-foreground mt-3">Area provides real insights, without the data overload.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <Card key={item.title} className="h-full">
              <CardContent className="flex h-full flex-col gap-3 p-6">
                <div className="inline-flex size-10 items-center justify-center rounded-lg border bg-muted/60">
                  <item.icon className="size-5" />
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function BigPictureSection() {
  const bullets = [
    "Spot Trends in Seconds: No more digging through numbers.",
    "Get Everyone on the Same Page: Share easy-to-understand reports with your team.",
    "Make Presentations Pop: Interactive maps and dashboards keep your audience engaged.",
    "Your Global Snapshot: Get a quick, clear overview of your entire operation.",
  ]

  return (
    <section className="border-b">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2">
        <div className="relative order-last md:order-first">
          <div className="aspect-video w-full overflow-hidden rounded-xl border shadow-sm">
            <div className="grid h-full w-full place-items-center bg-gradient-to-tr from-muted to-transparent">
              <Image src="/globe.svg" alt="Landscape" width={120} height={120} className="opacity-70" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Badge variant="secondary" className="w-fit">See the Big Picture</Badge>
          <h3 className="text-pretty text-2xl font-semibold sm:text-3xl">Area turns your data into clear, vibrant visuals that show you exactly what&apos;s happening in each region.</h3>
          <ul className="mt-2 space-y-3">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex size-6 items-center justify-center rounded-full border text-xs font-semibold">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm text-muted-foreground">{b}</span>
              </li>
            ))}
          </ul>
          <div className="pt-2">
            <Button className="gap-2">Discover More <ArrowRight className="size-4" /></Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function SpecsSection() {
  const area = [
    "Ultra-fast browsing",
    "Advanced AI insights",
    "Seamless integration",
    "Advanced AI insights",
    "Ultra-fast browsing",
    "Full UTF-8 support",
  ]
  const websurge = [
    "Fast browsing",
    "Basic AI recommendations",
    "Restricts customization",
    "Basic AI insights",
    "Fast browsing",
    "Potential display errors",
  ]
  const hyperview = [
    "Moderate speeds",
    "No AI assistance",
    "Steep learning curve",
    "No AI assistance",
    "Moderate speeds",
    "Partial UTF-8 support",
  ]

  const Column = ({ title, lines }: { title: string; lines: string[] }) => (
    <Card>
      <CardContent className="p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="inline-flex size-9 items-center justify-center rounded-lg border bg-muted/60">
            <Smartphone className="size-5" />
          </div>
          <h4 className="text-lg font-semibold">{title}</h4>
        </div>
        <ul className="space-y-3 text-sm">
          {lines.map((l) => (
            <li key={l} className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 text-primary" />
              <span className="text-foreground/90">{l}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )

  return (
    <section id="specs" className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <Badge variant="secondary" className="mb-3">Specs</Badge>
          <h2 className="text-pretty text-3xl font-semibold sm:text-4xl">Why Choose Area?</h2>
          <p className="text-muted-foreground mt-3">You need a solution that keeps up. That’s why we developed Area. A developer-friendly approach to streamline your business.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Column title="Area" lines={area} />
          <Column title="WebSurge" lines={websurge} />
          <Column title="HyperView" lines={hyperview} />
        </div>
      </div>
    </section>
  )
}

function TestimonialSection() {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl border">
          <div className="absolute inset-0 -z-10 grid place-items-center">
            <div className="size-48 rounded-full bg-muted blur-3xl" />
          </div>
          <div className="grid gap-8 p-8 sm:p-12 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div className="space-y-5">
              <p className="text-pretty text-xl font-medium sm:text-2xl">“I was skeptical, but Area has completely transformed the way I manage my business. The data visualizations are so clear and intuitive, and the platform is so easy to use. I can&apos;t imagine running my company without it.”</p>
              <div>
                <p className="font-semibold">John Smith</p>
                <p className="text-muted-foreground text-sm">Head of Data</p>
              </div>
            </div>
            <div className="grid place-items-center">
              <div className="aspect-square w-60 rounded-full border bg-gradient-to-br from-muted to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function HowToSection() {
  const steps = [
    { n: "01", title: "Get Started", body: "With our intuitive setup, you’re up and running in minutes." },
    { n: "02", title: "Customize and Configure", body: "Adapt Area to your specific requirements and preferences." },
    { n: "03", title: "Grow Your Business", body: "Make informed decisions to exceed your goals." },
  ]
  return (
    <section id="howto" className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-pretty text-3xl font-semibold sm:text-4xl">Map Your Success</h2>
          <div className="mt-4">
            <Button className="gap-2">Discover More <ArrowRight className="size-4" /></Button>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <Card key={s.n}>
              <CardContent className="p-6">
                <div className="mb-4 inline-flex items-center gap-3">
                  <span className="inline-flex size-8 items-center justify-center rounded-full border text-sm font-semibold">{s.n}</span>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm">{s.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactCTA() {
  return (
    <section id="contact" className="border-b">
      <div className="mx-auto max-w-5xl px-4 py-14 text-center sm:px-6">
        <h2 className="text-pretty text-2xl font-semibold sm:text-3xl">Connect with us</h2>
        <p className="text-muted-foreground mx-auto mt-3 max-w-prose">Schedule a quick call to learn how Area can turn your regional data into a powerful advantage.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button className="gap-2">Learn More <ArrowRight className="size-4" /></Button>
          <Button variant="outline" className="gap-2"><Phone className="size-4" /> Phone</Button>
        </div>
      </div>
    </section>
  )
}

function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-7 items-center justify-center rounded-md border"><Sparkles className="size-4" /></span>
          <span className="font-semibold">Area</span>
        </div>
        <nav className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
          <a href="#benefits" className="hover:underline">Benefits</a>
          <a href="#specs" className="hover:underline">Specifications</a>
          <a href="#howto" className="hover:underline">How-to</a>
          <a href="#contact" className="hover:underline">Contact Us</a>
        </nav>
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-center text-sm text-muted-foreground sm:flex-row sm:px-6">
          <p>© Area. 2025 • All Rights Reserved</p>
          <div className="flex items-center gap-6">
            <a className="hover:underline" href="#">Benefits</a>
            <a className="hover:underline" href="#">Specifications</a>
            <a className="hover:underline" href="#">How-to</a>
            <a className="hover:underline" href="#">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
