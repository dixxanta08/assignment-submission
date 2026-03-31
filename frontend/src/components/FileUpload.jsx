import React, { useState } from "react";
import { uploadService } from "../services/upload-service";

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
      setUploading(true);
      setError(null);
      try {
        const data = await uploadService.upload(selectedFile);
        if (onUpload) onUpload(data.url);
      } catch (err) {
        setError("Upload failed");
      } finally {
        setUploading(false);
      }
    } else {
      setPreview(null);
    }
  };

  return (
    <div
      style={{
        border: "2px dashed #888",
        borderRadius: 8,
        padding: 16,
        marginBottom: 8,
      }}
    >
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && (
        <div style={{ margin: "10px 0" }}>
          <img
            src={preview}
            alt="Preview"
            style={{ maxWidth: 200, maxHeight: 200 }}
          />
        </div>
      )}
      {uploading && (
        <div style={{ color: "#555", marginBottom: 4 }}>Uploading...</div>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default FileUpload;
