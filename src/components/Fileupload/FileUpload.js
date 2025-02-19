import { Button } from "@mui/material";
import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./FileUpload.css";

export default function FileUpload({
  image,
  label,
  id,
  handleFiles,
  disabled,
}) {
  const fileInputRef = React.useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleButtonClick = () => {
    if (disabled) return;
    fileInputRef.current.click(); // Programmatically trigger file input click
  };

  const handleDragOver = (event) => {
    if (disabled) return;
    event.preventDefault();
    setIsDragging(true); // Change appearance when dragging
  };

  const handleDragLeave = () => {
    if (disabled) return;
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    if (disabled) return;
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      fileInputRef.current.files = event.dataTransfer.files;
      console.log(event.dataTransfer.files);
      handleFiles(event.dataTransfer.files[0], id);
    }
  };

  const handleFileChange = (event) => {
    console.log(event.target.files["0"], "files");
    handleFiles(event.target.files[0], id);
    event.target.value = null;
  };

  return (
    <div
      className="fp-container"
      style={{
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "none" : "pointer",
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleButtonClick} // Allow click anywhere to trigger input
    >
      <input
        accept={
          id === "aadhaar_front" || id === "aadhaar_back" || id === "pan"
            ? "image/png, image/jpeg"
            : "*/*"
        }
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }} // Hide default file input
        onChange={handleFileChange} // Handle file selection
      />
      <Button
        size="small"
        color="primary"
        sx={{
          textTransform: "none",
          bgcolor: "transparent",
          "&:hover": { color: "#000" },
        }}
      >
        {<CloudUploadIcon />}
      </Button>
    </div>
  );
}
