import {
  Downloads,
  Extensions,
  Features,
  Footer,
  Hero,
  Navbar,
} from "@/components/home";
import { getAppData } from "@/lib/data";

export default async function HomePage() {
  // Fetch data during SSR
  const appData = await getAppData();

  return (
    <main className="min-h-screen stable-vh overflow-x-clip bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 relative">
      {/* Global background effects - only visible in dark mode */}
      <div className="fixed inset-0 -z-10 dark:block hidden">
        {/* Main background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />

        {/* Dynamic light effect */}
        <div className="absolute inset-0 bg-gradient-radial from-primary-900/20 via-transparent to-transparent opacity-50" />

        {/* Decorative gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-primary-900/20 rounded-full blur-3xl opacity-20 animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-primary-900/20 rounded-full blur-3xl opacity-20 animate-pulse-slow" />
      </div>

      <Navbar version={appData.version} stars={appData.stars} />
      <Hero version={appData.version} releaseAssets={appData.releaseAssets} />
      <Features />
      <Extensions />
      <Downloads
        version={appData.version}
        releaseAssets={appData.releaseAssets}
      />
      <Footer />
    </main>
  );
}
