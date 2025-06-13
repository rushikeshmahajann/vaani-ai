import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const Upload = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    />
  </svg>
);

const VideoUpload = () => {
  // State to hold the single uploaded file (or null if none)
  const [uploadedFile, setUploadedFile] = useState<File & { preview: string } | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false, // Allow only one file to be dropped
    accept: {
      "video/mp4": [".mp4"], // Accept only MP4 files
    },
    onDrop: (acceptedFiles) => {
      // If a file is accepted, set it as the new uploaded file
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setUploadedFile(
          Object.assign(file, {
            preview: URL.createObjectURL(file), // Create a preview URL for the video
          })
        );
      }
    },
    // Optional: Add a callback for files that are rejected (e.g., wrong type)
    onDropRejected: (fileRejections) => {
      fileRejections.forEach((fileRejection) => {
        console.log(`File rejected: ${fileRejection.file.name}`);
        fileRejection.errors.forEach((error) => {
          console.log(`Error: ${error.code} - ${error.message}`);
          // You might want to display a user-friendly message here
        });
      });
    },
  });

  // Clean up preview URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (uploadedFile && uploadedFile.preview) {
        URL.revokeObjectURL(uploadedFile.preview);
      }
    };
  }, [uploadedFile]);

  // Function to remove the currently uploaded file
  const removeFile = () => {
    setUploadedFile(null); // Set the uploaded file back to null
  };

  return (
    <>
      <section
        {...getRootProps({ className: "dropzone" })}
        className="container mt-4 border border-dashed border-gray-300 rounded-md p-4 text-center text-sm text-gray-500 cursor-pointer"
      >
        <div>
          <input {...getInputProps()} />
          <div className="flex justify-center mx-auto"></div>
          <p className="stroke-gray-400 font-montreal cursor-pointer tracking-tight flex items-center justify-center gap-2">
            <Upload />
            Drag and drop an MP4 file here, or click to select
          </p>
        </div>
      </section>

      {/* Display the uploaded file if it exists */}
      <aside className="mt-4">
        {uploadedFile && (
          <div className="flex items-center justify-between py-1 bg-gray-50 p-2 rounded-md shadow-sm">
            <span className="text-gray-700 text-sm truncate">
              {uploadedFile.name} -{" "}
              {(uploadedFile.size / (1024 * 1024)).toFixed(2)} mb
            </span>
            <button
              type="button"
              onClick={removeFile} // Call removeFile without arguments
              className="ml-4 text-xs text-gray-500 hover:text-gray-700 focus:outline-none flex-shrink-0"
              aria-label={`Remove ${uploadedFile.name}`}
            >
              &#x2715; {/* Unicode 'X' for close button */}
            </button>
          </div>
        )}
        {uploadedFile && uploadedFile.type.startsWith("video/") && (
          <div className="mt-4 text-center">
            <video
              src={uploadedFile.preview}
              controls
              className="max-w-full h-auto rounded-md shadow-lg"
              style={{ maxHeight: "300px" }} // Limit video preview height
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </aside>
    </>
  );
};

export default VideoUpload;
