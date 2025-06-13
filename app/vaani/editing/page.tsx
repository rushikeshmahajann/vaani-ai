"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import dynamic from "next/dynamic";
import TimelinePlugin from "wavesurfer.js/dist/plugins/timeline.esm.js";
import Minimap from "wavesurfer.js/dist/plugins/minimap.esm.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Scissors from "@/icons/Scissors";
import { Button } from "@/components/ui/button";
import { ShineBorder } from "@/components/magicui/shine-border";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import ExportModal from "@/components/ExportModal";
import confetti from "canvas-confetti";

const WaveSurferPlayer = dynamic(() => import("@wavesurfer/react"), {
  ssr: false,
});
interface Subtitle {
  start: number;
  end: number;
  text: string;
}
const dummySubtitles = [
  { start: 0, end: 2, text: "Hanuman ji is linked to physical powers?" },
  {
    start: 2,
    end: 5,
    text: "Physical Power in the sense he can become small like this much ",
  },
  { start: 5, end: 8, text: "He can become heavy like a mountain" },
  {
    start: 8,
    end: 11,
    text: "He can become light as air, as feather",
  },
  {
    start: 11,
    end: 13,
    text: "And Hanuman being the diety for maruts pavans",
  },
  {
    start: 13,
    end: 15,
    text: "All these powers come form maruts",
  },
  {
    start: 15,
    end: 19,
    text: "the maruti in hanuman has come out of the word marut you know",
  },
  {
    start: 19,
    end: 23,
    text: "Maruts are born to the vayu's movement in the sun",
  },
  {
    start: 23,
    end: 28,
    text: "These are high velocity particles that come from other galaxies, alright? ",
  },
  {
    start: 28,
    end: 32,
    text: "He was born to kesari and anjana devi",
  },
  {
    start: 32,
    end: 36,
    text: "Kesari means sun and Anjana Devi means the dark primordial nature",
  },
  {
    start: 36,
    end: 39,
    text: "When nothing was born Hanuman is that force",
  },
  {
    start: 39,
    end: 43,
    text: "And this quality actually of the Maruts is present in all dieties",
  },
  {
    start: 43,
    end: 46,
    text: "This is what needs to be understood hmm",
  },
  {
    start: 46,
    end: 51,
    text: "you have given us the sanatani version of what are we but stardust, Yes",
  },
];

export default function Page() {
  const [subtitles, setSubtitles] = useState<Subtitle[]>(dummySubtitles);
  const [currentTime, setCurrentTime] = useState(0);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  const videoNode = useRef<HTMLVideoElement>(null);
  const player = useRef<VideoFrame | null>(null);
  const wavesurferRef = useRef<number>(null);
  const rafIdRef = useRef<number>(null);
  const [isClient, setIsClient] = useState(false);
  const [timelineEl, setTimelineEl] = useState<HTMLElement | null>(null);

  const plugins =
    isClient && timelineEl
      ? [
          TimelinePlugin.create({ container: timelineEl }),
          Minimap.create({
            height: 30,
            waveColor: "#ccc",
            progressColor: "#999",
            
          }),
          RegionsPlugin.create(),
        ]
      : [];

  const videoUrl = "/dubbed.mp4";

  useEffect(() => {
    if (!isClient) return; // wait until after hydration
    if (!videoNode.current) return;

    const video = videojs(videoNode.current, {
      controls: true,
      responsive: true,
      fluid: true,
      preload: "auto",
      aspectRatio: "16:9",
      controlBar: { fullscreenToggle: false },
      sources: [{ src: videoUrl, type: "video/mp4" }],
    });

    player.current = video;

    const handlePlay = () => startSyncLoop();
    const handlePause = () => cancelAnimationFrame(rafIdRef.current!);
    const handleEnded = () => cancelAnimationFrame(rafIdRef.current!);

    video.on("play", handlePlay);
    video.on("pause", handlePause);
    video.on("ended", handleEnded);

    return () => {
      cancelAnimationFrame(rafIdRef.current!);
      video.off("play", handlePlay);
      video.off("pause", handlePause);
      video.off("ended", handleEnded);
      video.dispose();
    };
  }, [isClient]);
  useEffect(() => {
    setIsClient(true);
    if (typeof document !== "undefined") {
      const el = document.querySelector(".wave-timeline");
      if (el) setTimelineEl(el);
    }
  }, []);

  // Animation loop to update currentTime
  const startSyncLoop = () => {
    const update = () => {
      const time = player.current?.currentTime() || 0;
      setCurrentTime(time);
      rafIdRef.current = requestAnimationFrame(update);
    };
    update();
  };

  const handleSubtitleChange = (index: number, text: string) => {
    const updated = [...subtitles];
    updated[index].text = text;
    setSubtitles(updated);
  };

  const currentSubtitleText = useMemo(() => {
    const sub = subtitles.find(
      (sub) => currentTime >= sub.start && currentTime <= sub.end
    );
    return sub?.text || "";
  }, [currentTime, subtitles]);

  const handleClick = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  return (
    <section className="custom-scrollbar overflow-y-scroll h-full p-4 px-6 mb-6">
      {/* Grid Layout for Editor + Player */}
      <div className="w-full flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold mb-2 tracking-tight font-montreal">
          Edit Subtitles
        </h2>
        <RainbowButton
          onClick={() => {
            setExportModalOpen(true);
            setTimeout(() => handleClick(), 1000);
          }}
          variant={"outline"}
        >
          Export
        </RainbowButton>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto items-center">
        {/* Subtitle Editor */}
        <div className="space-y-2">
          <div className="overflow-y-auto h-[25rem] flex flex-col gap-4">
            {subtitles.map((sub, i) => (
              <div
                key={i}
                className="flex flex-col border relative p-2 rounded shadow-sm bg-gray-50"
              >
                <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                <span className="text-xs text-gray-500">
                  {sub.start}s - {sub.end}s
                </span>
                <Input
                  type="text"
                  value={sub.text}
                  onChange={(e) => handleSubtitleChange(i, e.target.value)}
                  className="border mt-1 p-1 rounded-md text-xl font-montreal tracking-tight bg-white focus:outline-none"
                />
                <Button
                  className="mt-2 font-montreal tracking-tight"
                  variant={"outline"}
                >
                  Transcribe audio
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Video Player */}
        <div className="relative w-full">
          <div className="relative" data-vjs-player>
            <video
              ref={videoNode}
              className="video-js vjs-big-play-centered w-full rounded-md"
            />
            <div className="absolute bottom-10 w-full text-center text-white text-lg font-medium drop-shadow-md pointer-events-none tracking-tight font-montreal">
              <div className="bg-black/60 py-1 px-2 inline-block rounded">
                {currentSubtitleText}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Waveform Outside Grid */}
      <div className="mt-4 w-full">
        <div className="wave-timeline w-full mb-2" />
        <div className="border-2 w-full rounded-md overflow-hidden">
          <WaveSurferPlayer
            height={80}
            waveColor="#ddd"
            progressColor="#444"
            url={videoUrl}
            ref={wavesurferRef}
            plugins={plugins}
          />
        </div>
      </div>

      {/* Trimming Controls */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4 stroke-gray-400 flex items-center gap-2 font-montreal tracking-tight">
          <Scissors />
          Trimming Controls
        </h2>
        <Card className="bg-white max-w-md">
          <CardContent className="flex flex-col sm:flex-row sm:items-end gap-4 py-4">
            <div className="flex gap-4 items-center flex-wrap">
              <div>
                <Label htmlFor="trim-start" className="text-sm">
                  Start Time (s)
                </Label>
                <Input
                  id="trim-start"
                  type="number"
                  placeholder="e.g. 2.5"
                  className="w-28 text-sm"
                />
              </div>
              <div>
                <Label htmlFor="trim-end" className="text-sm">
                  End Time (s)
                </Label>
                <Input
                  id="trim-end"
                  type="number"
                  placeholder="e.g. 8.0"
                  className="w-28 text-sm"
                />
              </div>
              <button className="bg-black text-white text-sm px-4 py-2 rounded hover:bg-gray-800 mt-6 sm:mt-0">
                Trim
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Modal */}
      {exportModalOpen && (
        <ExportModal onClose={() => setExportModalOpen(false)} />
      )}
    </section>
  );
}
