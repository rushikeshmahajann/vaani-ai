"use client";
import React, { use, useEffect, useState } from "react";
import { WobbleCard } from "@/components/ui/wobble-card";
import Image from "next/image";
import { MdArrowOutward } from "react-icons/md";
import { Button } from "@/components/ui/button";
import Language from "@/icons/Language";
import Plus from "@/icons/Plus";
import Cross from "@/icons/Cross";
import { DubModal } from "@/components/DubModal";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useDubStore } from "@/store/dubStore";
import ProjectCard from "@/components/ProjectCard";

const page = () => {
  const [isTutorialOpen, setIsTutorialOpen] = useState(true);
  const [isDubModalOpen, setIsDubModalOpen] = useState(false);
  const { projects} = useDubStore();

  const handleTutorialClosing = () => {
    setIsTutorialOpen(false);
  };
  const handleTutorialToggle = () => {
    setIsTutorialOpen(!isTutorialOpen);
  };

  const openDubModal = () => setIsDubModalOpen(true);
  const closeDubModal = () => {
    gsap.to(".dub-modal", {
      autoAlpha: 0,
      y: "100%",
      ease: "power2.out",
      duration: 0.8,
      onComplete: () => setIsDubModalOpen(false),
    });
  };

  useGSAP(() => {
    gsap.from(".dub-modal", {
      autoAlpha: 0,
      y: "100%",
      ease: "power4.out",
      duration: 0.8,
    });
  }, [isDubModalOpen]);
  return (
    <section className="flex justify-center w-full h-full  ">
      <div className="custom-scrollbar w-full max-w-6xl md:mx-14 relative overflow-y-auto">
        <div className="border-1 w-max mb-2 p-1 border-gray-300 rounded-md">
          <Language />
        </div>
        <div className="flex w-full justify-between items-center">
          <div>
            <h3 className="font-montreal tracking-tighter text-2xl font-semibold flex gap-2 items-end">
              Dubbing
            </h3>
            <p className="text-neutral-500 font-montreal tracking-tight">
              Seamlessly localize video content into 29 languages using Sarvam’s
              AI-powered dubbing.
            </p>
          </div>
          <Button
            onClick={openDubModal}
            className="font-montreal"
            variant={"outline"}
          >
            Create Dub
          </Button>
        </div>

        <div className="w-full h-[1px] bg-neutral-300 my-4"></div>

        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-montreal font-semibold text-neutral-800 tracking-tighter text-xl">
              Tutorials
            </h2>
            <p className="font-montreal tracking-tight text-neutral-500">
              Watch our short video guides to help you get up to speed with
              dubbing your content
            </p>
          </div>
          {isTutorialOpen ? (
            <button
              onClick={handleTutorialToggle}
              className="stroke-neutral-400 hover:stroke-neutral-900 transition-colors ease-in-out"
            >
              <Cross />
            </button>
          ) : (
            <Button
              className="font-montreal"
              onClick={handleTutorialToggle}
              variant={"outline"}
            >
              Browse
            </Button>
          )}
        </div>

        {isTutorialOpen && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <WobbleCard containerClassName="bg-orange-900 cursor-pointer col-span-2">
              <div className="max-w-xs z-1">
                <h2 className="text-left text-balance text-base md:text-xl lg:text-2xl font-semibold tracking-[-0.015em] text-white font-montreal underline ">
                  Learn About the Dubbing Editor
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="size-5 inline"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </h2>
                <p className="mt-4 text-left  text-base/6 text-neutral-200 font-montreal ">
                  A professional dubbing and editing app that makes video
                  dubbing easy with AI.
                </p>
              </div>
              <Image
                src="/1.png"
                width={300}
                height={300}
                alt="linear demo image"
                className="absolute -right-4 lg:-right-[10%] grayscale filter -bottom-10 object-contain rounded-2xl -z-10"
              />
            </WobbleCard>

            <WobbleCard containerClassName="bg-green-900 cursor-pointer">
              <div className="max-w-xs z-1">
                <h2 className="text-left text-balance text-base md:text-xl lg:text-2xl font-semibold tracking-[-0.015em] text-white font-montreal underline ">
                  How AI Voice Cloning Works
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="size-5 inline"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </h2>
                <p className="mt-4 text-left  text-base/6 text-neutral-200 font-montreal ">
                  Discover how Sarvam AI replicates natural-sounding voices for
                  accurate dubbing.
                </p>
              </div>
            </WobbleCard>

            <WobbleCard containerClassName="bg-yellow-900 cursor-pointer">
              <div className="max-w-xs z-1">
                <h2 className="text-left text-balance text-base md:text-xl lg:text-2xl font-semibold tracking-[-0.015em] text-white font-montreal underline ">
                  Edit and Customize Translations
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="size-5 inline"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </h2>
                <p className="mt-4 text-left  text-base/6 text-neutral-200 font-montreal">
                  Manually tweak AI-generated translations for better context
                  and tone.
                </p>
              </div>
            </WobbleCard>

            <WobbleCard containerClassName="bg-rose-900 cursor-pointer col-span-2">
              <div className="max-w-xs z-1">
                <h2 className="text-left text-balance text-base md:text-xl lg:text-2xl font-semibold tracking-[-0.015em] text-white font-montreal underline ">
                  Translate Videos in 29 Languages
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="size-5 inline"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </h2>
                <p className="mt-4 text-left  text-base/6 text-neutral-200 font-montreal ">
                  See how you can localize your content with just a few clicks
                  using smart translation.
                </p>
              </div>
              <Image
                src="/4.png"
                width={300}
                height={300}
                alt="linear demo image"
                className="absolute -right-4 lg:-right-[10%] grayscale filter -bottom-10 object-contain rounded-2xl -z-10"
              />
            </WobbleCard>
          </div>
        )}

        <div className="mt-8 w-max absolute bottom-20 right-0 group flex justify-center items-center gap-3">
          <span className="font-montreal font-medium tracking-tighter text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Create a dub
          </span>

          <button
            onClick={openDubModal}
            className="stroke-neutral-700 hover:stroke-gray-900 bg-gray-100 rounded-full p-2"
          >
            <Plus />
          </button>
        </div>
        <div className="w-full h-[1px] bg-neutral-300 my-4"></div>
        {/* Project Cards */}
        <div className="w-full flex flex-col gap-2">
          {
            projects.map((item)=> (
              <ProjectCard title={item.projectTitle} key={item.id} targetLanguage={item.targetLanguage} sourceLanguage={item.sourceLanguage} />
            ))
          }
        </div>
      </div>

      {isDubModalOpen && (
        <DubModal
          isOpen={isDubModalOpen}
          onClose={closeDubModal}
          tutorial={handleTutorialClosing}
        />
      )}
    </section>
  );
};

export default page;
