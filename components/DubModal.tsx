import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,

} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Globe } from "lucide-react";
import { languages } from "@/utils/languages";
import { RainbowButton } from "./magicui/rainbow-button";
import VideoUpload from "./VideoUpload";
import { useDubStore } from "@/store/dubStore";
import { v4 as uuidv4 } from "uuid";

export const DubModal = ({
  isOpen,
  onClose,
  tutorial,
}: {
  isOpen: boolean;
  onClose: () => void;
  tutorial: () => void;
}) => {
  // State for controlled Select components
  const [projectTitle, setProjectTitle] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [numSpeakers, setNumSpeakers] = useState("");
  const [voiceCloning, setVoiceCloning] = useState(false);
  const [source, setSource] = useState("upload");
  const { addProject } = useDubStore();
  const { projects } = useDubStore();

  const handleCreateDub = () => {
    const newProject = {
      id: uuidv4(),
      projectTitle: projectTitle,
      sourceLanguage: sourceLanguage,
      targetLanguage: targetLanguage,
      status: "processing" as const,
    };
    addProject(newProject);
    onClose();
    tutorial();
  };

  useEffect(() => {
    console.log("Store updated:", projects);
  }, [projects]);

  if (!isOpen) return null;

  return (
    <div className="dub-modal fixed inset-0 z-10 bg-white flex flex-col p-6 md:p-10">
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="text-2xl font-bold text-neutral-600 hover:text-black transition-all stroke-neutral-600 hover:stroke-neutral-900"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 w-full max-w-xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="border border-gray-300 rounded-md p-1">
            <Globe size={20} />
          </div>
          <h3 className="font-montreal tracking-tighter text-2xl font-semibold">
            Dub your videos
          </h3>
        </div>

        <form className="custom-scrollbar space-y-6 font-montreal overflow-y-auto h-[35rem] my-4 px-2">
          <div>
            <Label>Project name</Label>
            <Input
              className="bg-white border-input mt-1"
              placeholder="Untitled project"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Source Language*</Label>
              <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
                <SelectTrigger className="w-full mt-1 font-montreal">
                  <SelectValue placeholder="Select source language" />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto font-montreal tracking-tight">
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Target Languages*</Label>
              <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                <SelectTrigger className="bg-white w-full mt-1 font-montreal">
                  <SelectValue placeholder="Select languages" />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto">
                  {languages.map((lang) => (
                    <SelectItem
                      className="font-montreal tracking-tight"
                      key={lang.code}
                      value={lang.code}
                    >
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Audio or video source*</Label>
            <div className="grid grid-cols-2 md:grid-cols-5 mt-1 rounded-md p-2 justify-start items-center w-max">
              <div
                onClick={() => setSource("upload")}
                className={`flex justify-center font-montreal  items-center ${
                  source === "upload" ? "bg-gray-100 text-gray-800" : null
                } rounded-md text-sm py-1 w-max px-3 text-gray-400 cursor-pointer transition-colors ease-in-out`}
              >
                Upload
              </div>
              <div
                onClick={() => setSource("youtube")}
                className={`flex justify-center font-montreal  items-center ${
                  source === "youtube" ? "bg-gray-100 text-gray-800" : null
                }  rounded-md text-sm py-1 w-max px-3 text-gray-400  cursor-pointer transition-colors ease-in-out`}
              >
                Youtube
              </div>
              <div
                onClick={() => setSource("tiktok")}
                className={`flex justify-center font-montreal  items-center ${
                  source === "tiktok" ? "bg-gray-100 text-gray-800" : null
                }  rounded-md text-sm py-1 w-max px-3 text-gray-400  cursor-pointer transition-colors ease-in-out`}
              >
                Tiktok
              </div>
              <div
                onClick={() => setSource("otherurl")}
                className={`flex justify-center font-montreal  items-center ${
                  source === "otherurl" ? "bg-gray-100 text-gray-800" : null
                }  rounded-md text-sm py-1 w-max px-3  cursor-pointer text-gray-400 transition-colors ease-in-out`}
              >
                Other Url
              </div>
              <div
                onClick={() => setSource("manual")}
                className={`flex justify-center font-montreal  items-center ${
                  source === "manual" ? "bg-gray-100 text-gray-800" : null
                }  rounded-md text-sm py-1 w-max px-3 text-gray-400 cursor-pointer transition-colors ease-in-out`}
              >
                Manual
              </div>
            </div>

            <VideoUpload />
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Your video will be dubbed in standard resolution and will include
              a watermark. Only Creator+ plans can change this.{" "}
              <span className="underline cursor-pointer">
                Upgrade your plan
              </span>
            </p>
          </div>

          <div className="flex w-full justify-between items-center">
            <Label>Number of speakers</Label>
            <Select value={numSpeakers} onValueChange={setNumSpeakers}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Detect" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="detect">Detect</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2 mb-6">
            <Checkbox
              id="voice-cloning"
              checked={voiceCloning}
              onCheckedChange={setVoiceCloning}
            />
            <label
              htmlFor="voice-cloning"
              className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Disable voice cloning
            </label>
          </div>
        </form>
        <div className="flex flex-col items-center justify-between w-full ">
          <RainbowButton
            onClick={handleCreateDub}
            disabled={projectTitle === ""}
            className="w-full"
            type="submit"
          >
            Create dub
          </RainbowButton>
          <p className="text-xs text-gray-500 mt-3">
            Credits remaining before this dub:{" "}
            <span className="font-semibold">8,275</span>
          </p>
        </div>
      </div>
    </div>
  );
};
