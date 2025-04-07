import { Navbar } from '@/app/components/Navbar'
import { Hero } from '@/app/components/Hero'
import { Features } from '@/app/components/Features'
import { Extensions } from '@/app/components/Extensions'
import { Downloads } from '@/app/components/Downloads'
import { Footer } from '@/app/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Extensions />
      <Downloads />
      <Footer />
    </main>
  )
}
