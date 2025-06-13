import Link from "next/link";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { AuroraBackground } from "@/components/acternity/aurora-background";

export default function Home() {
  return (
    <AuroraBackground>
      <div className="grid grid-rows-[auto_1fr_auto_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-12 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1 className="font-montreal text-6xl sm:text-8xl font-medium tracking-tighter text-center">
          Vaani AI
        </h1>

        <div className="text-center max-w-xl space-y-4 text-neutral-700 font-montreal tracking-tight">
          <p className="text-lg sm:text-xl">
            <strong>Vaani AI</strong> is a browser-based AI dubbing platform, that includes an intuitive subtitle editor and audio waveform visualization. Built using <strong>Next.js</strong>, <strong>Video.js</strong>,<strong>WaveSurfer</strong> and other styling libraries.
          </p>
          <p className="text-base sm:text-lg">
            Users can preview and edit subtitles in real-time, visualize audio, and perform basic video trimming — all within a clean and responsive UI.
          </p>
          <p className="text-sm sm:text-base text-neutral-500">
            This project was developed as a frontend engineering assignment for <strong>Sarvam AI</strong>.
          </p>
        </div>

        <Link href="/vaani/dubbing">
          <RainbowButton>Go to Vaani AI</RainbowButton>
        </Link>

        <div className="text-center mt-10 text-sm sm:text-base text-neutral-500 space-y-1">
          <p>
            Built by:{" "}
            <a href="https://rushikeshmahajan.com" className="underline hover:text-blue-600">
              Rushikesh Mahajan
            </a>
          </p>
          <p>
            Contact:{" "}
            <a href="tel:+917249144033" className="underline hover:text-blue-600">
              +91-7249144033
            </a>
          </p>
          <p>
            Portfolio:{" "}
            <a
              href="https://rushikeshmahajan.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-600"
            >
              https://rushikeshmahajan.com
            </a>
          </p>
        </div>
      </div>
    </AuroraBackground>
  );
}
