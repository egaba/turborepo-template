import { Button } from '@repo/ui/button'
import { CtaSection } from '@repo/ui/cta-section'
import { FeatureCard } from '@repo/ui/feature-card'
import { Hero } from '@repo/ui/hero'
import { Section } from '@repo/ui/section'

function LightningIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  )
}

function CodeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  )
}

function PaletteIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
    </svg>
  )
}

function RocketIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
    </svg>
  )
}

const FEATURES = [
  {
    icon: <LightningIcon />,
    heading: 'Turborepo',
    description: 'Optimized build system with remote caching, parallel execution, and smart task scheduling.',
  },
  {
    icon: <CodeIcon />,
    heading: 'TypeScript',
    description: 'End-to-end type safety across your entire monorepo with strict TypeScript configuration.',
  },
  {
    icon: <PaletteIcon />,
    heading: 'DaisyUI',
    description: 'Beautiful, accessible components with semantic color system and automatic dark mode support.',
  },
  {
    icon: <RocketIcon />,
    heading: 'Next.js 15',
    description: 'React Server Components, App Router, and optimized performance out of the box.',
  },
  {
    icon: <ShieldIcon />,
    heading: 'Testing',
    description: 'Comprehensive testing setup with Jest, React Testing Library, MSW, and Playwright.',
  },
  {
    icon: <GlobeIcon />,
    heading: 'Deploy Anywhere',
    description: 'Production-ready configuration for Vercel, Docker, and any Node.js hosting platform.',
  },
] as const

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Hero
        eyebrow="Open Source"
        heading="Build faster. Ship with confidence."
        description="A production-ready monorepo template with Next.js, Turborepo, and DaisyUI. Start building modern web applications in minutes."
        primaryCta={<Button variant="primary" size="lg">Get Started</Button>}
        secondaryCta={<Button variant="ghost" size="lg">View on GitHub</Button>}
      />

      {/* Features */}
      <Section
        heading="Everything you need"
        description="Built on modern tools and best practices, so you can focus on building great products."
        className="bg-base-200"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <FeatureCard
              key={feature.heading}
              icon={feature.icon}
              heading={feature.heading}
              description={feature.description}
            />
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <CtaSection
          heading="Ready to get started?"
          description="Start building your next project with a production-ready foundation. No configuration needed."
          primaryCta={
            <button className="btn btn-lg border-0 bg-white text-black hover:bg-white/90">
              Get Started
            </button>
          }
          secondaryCta={
            <button className="btn btn-ghost btn-lg border-white/20 text-white/80 hover:bg-white/10 hover:text-white">
              Read the Docs
            </button>
          }
        />
      </Section>
    </>
  )
}
