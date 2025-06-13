"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Copy } from "lucide-react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  YoutubeIcon,
  InstapaperIcon,
} from "react-share";
import { RiTwitterXFill } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { Confetti } from "./magicui/confetti";

const shareUrl = "https://example.com/your-dubbed-video"; // Replace with actual URL

const ExportModal = ({ onClose }: { onClose: () => void }) => {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(true);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <>
      <Confetti />
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto py-14 px-8 rounded-lg">
          <DialogHeader className="text-center mb-4">
            <DialogTitle className="text-3xl font-bold font-montreal tracking-tighter">
              Your Dubbed Video is Ready!
            </DialogTitle>
            <DialogDescription className="font-montreal tracking-tight">
              Preview and share it anywhere 🎬
            </DialogDescription>
          </DialogHeader>

          {/* Video Preview */}
          <div className="w-full aspect-videoed-lg overflow-hidden border shadow-md mb-6 rounded-md">
            <video
              src="/dubbed.mp4"
              controls
              className="w-full h-full object-contain rounded-md"
            />
          </div>

          {/* Copyable Link */}
          <div className="flex flex-col sm:flex-row gap-4 items-center px-4 py-1ed-md">
            <Input value={shareUrl} readOnly className="w-full" />
            <Button variant={"outline"} onClick={handleCopy} className="shrink-0">
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" /> Copied
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" /> Copy Link
                </>
              )}
            </Button>
          </div>

          <h5 className="text-center">Share</h5>
          {/* Share Buttons */}
          <div className="flex flex-wrap justify-center gap-4 items-center">
            <FacebookShareButton url={shareUrl}>
              <FaFacebookF size={48} />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl}>
              <RiTwitterXFill size={48} />
            </TwitterShareButton>
            <WhatsappShareButton url={shareUrl}>
              <FaWhatsapp size={48} />
            </WhatsappShareButton>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={48} />
            </a>
            <a
              href="https://www.youtube.com/upload"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube size={48} />
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExportModal;
