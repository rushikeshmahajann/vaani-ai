"use client";

import React, { useState, useEffect } from "react";
import Document from "@/icons/Document";
import Adjustment from "@/icons/Adjustment";
import Menu from "@/icons/Menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import ExportModal from "./ExportModal";
import Link from "next/link";

const ProjectCard = ({ title, sourceLanguage, targetLanguage }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  // Animate progress bar to 100% in 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1.25; // ~1.25% every 100ms for 8s
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleDownload = () => {
    setExportModalOpen(true);
  };

  const handleRemove = () => {
    console.log("Remove triggered");
  };

  return (
    <>
      <div className="w-full flex justify-between items-center border-gray-100 rounded-lg px-2 py-4 hover:bg-gray-50">
        <div className="flex justify-center items-end gap-4 stroke-gray-500">
          <div className="stroke-gray-900 border-1 rounded-md p-2 bg-white">
            <Document />
          </div>
          <div className="flex flex-col items-start">
            <h4 className="font-montreal text-neutral-800 tracking-tight text-md leading-4">
              {title}
            </h4>
            <p className="font-montreal text-neutral-400 text-sm">
              {sourceLanguage} - {targetLanguage}
            </p>
          </div>
        </div>

        {/* Right Controls: Progress + Icons */}
        <div className="flex items-center justify-end gap-3 min-w-[200px]">
          {progress !== 100 ? (
            <div className="flex items-center gap-2 w-full">
              <Progress value={progress} className="h-2 w-28" />
              <span className="text-xs text-gray-600 font-montreal w-6">
                {Math.round(progress)}%
              </span>
            </div>
          ) : null}

          {/* HoverCard for Adjustment icon */}
          <HoverCard>
            <HoverCardTrigger asChild>
              <Link href={"/vaani/editing"}>
                <div className="stroke-gray-400 hover:stroke-gray-800 cursor-pointer">
                  <Adjustment />
                </div>
              </Link>
            </HoverCardTrigger>
            <HoverCardContent className="w-64 font-montreal text-sm text-gray-700">
              <p>
                <strong>Edit Dub</strong>: Trim video, edit subtitles, adjust
                audio and more.
              </p>
            </HoverCardContent>
          </HoverCard>

          {/* HoverCard for Menu Dropdown */}
          <HoverCard>
            <HoverCardTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="stroke-gray-500"
                  >
                    <Menu />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="font-montreal tracking-tight">
                  <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                    View
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDownload}>
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleRemove}>
                    Remove
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </HoverCardTrigger>
            <HoverCardContent className="w-64 font-montreal text-sm text-gray-700">
              <p>
                <strong>More Actions</strong>: View project details, download
                dubbed video, or remove the project.
              </p>
            </HoverCardContent>
          </HoverCard>
        </div>
        {exportModalOpen && (
          <ExportModal onClose={() => setExportModalOpen(false)} />
        )}
      </div>

      {/* View Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md font-montreal">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold tracking-tight">
              Preview
            </DialogTitle>
          </DialogHeader>
          {/* Video Preview */}
          <div className="w-full rounded-md overflow-hidden mb-4 aspect-video bg-black">
            <video
              src="/dubbed.mp4" // or a dynamic URL
              controls
              className="w-full h-full object-contain"
            />
          </div>
          <div className="p-4 rounded-md border bg-gray-50 text-sm text-gray-700 space-y-2">
            <p>
              <strong>Title:</strong> {title}
            </p>
            <p>
              <strong>Source Language:</strong> {sourceLanguage}
            </p>
            <p>
              <strong>Target Language:</strong> {targetLanguage}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectCard;
