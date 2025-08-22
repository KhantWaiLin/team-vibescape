import React, { useState } from "react";
import type { Question } from "../../../types";
import fileUploadIcon from "../../../assets/icons/cloud_upload.svg";
import { apiService } from "../../../services/api";
import axios from "axios";
import { config } from "../../../utils/config";
import { getAuthCookie } from "../../../utils/cookieUtils";

// Create a custom axios instance for file uploads without default Content-Type
const fileUploadAxios = axios.create({
  baseURL: config.baseUrl,
  timeout: 10000,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    // Note: No Content-Type here - let browser set it for FormData
  },
});

interface FileInputProps {
  question: Question;
  value?: File;
  onChange?: (value: File) => void;
}

const FileInput: React.FC<FileInputProps> = ({ question, onChange }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files?.[0];
    console.log('=== FILE UPLOAD DEBUG ===');
    console.log('Event target:', e.target);
    console.log('Files array:', e.target.files);
    console.log('File object:', file);
    console.log('File type:', typeof file);
    console.log('File instanceof File:', file instanceof File);
    console.log('File properties:', {
      name: file?.name,
      size: file?.size,
      type: file?.type,
      lastModified: file?.lastModified
    });
    
    if (file) {
      setSelectedFile(file);
      setUploading(true);

      try {
        // Create FormData for file upload
        const formData = new FormData();
        console.log('FormData created:', formData);
        
        // Try to append the file
        formData.append("file", file);
        console.log('File appended to FormData');
        
        // Check what's actually in FormData
        console.log('FormData entries:');
        for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value, typeof value);
        }
        
        formData.append("is_public", "1");
        console.log('is_public appended to FormData');

        // Upload file to API
        console.log('=== SENDING REQUEST ===');
        console.log('FormData before sending:', formData);
        console.log('FormData entries before sending:');
        for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value, typeof value);
        }
        
        const response: any = await apiService.post(
          "/api/files/upload",
          formData,
          {
            headers: {
              // Force multipart/form-data for FormData
              "Content-Type": "multipart/form-data",
              Authorization: apiService.getAuthHeaders().Authorization,
            },
          }
        );

        if (response.code === 200 && response.data) {
          setUploadedFileUrl(response.data.url || response.data.file_url);
          // Call onChange with the uploaded file info
          onChange?.(file?.name);
        }
      } catch (error) {
        console.error("File upload failed:", error);
        // You might want to show an error message to the user
      } finally {
        setUploading(false);
      }
    } else {
      console.log('No file selected or file is null/undefined');
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setUploadedFileUrl(null);
    onChange?.("" as any);
  };

  return (
    <div className="w-full">
      {/* File upload drop zone */}
      <div className="relative">
        <input
          type="file"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          title={question.placeholder || "Choose file"}
          disabled={uploading}
          accept="*/*"
          onFocus={() => console.log('File input focused')}
          onBlur={() => console.log('File input blurred')}
          onClick={() => console.log('File input clicked')}
        />
        <div
          className="border-2 border-dashed border-light-border bg-light-bg rounded-lg p-8 text-center transition-colors"
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--color-black-400)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--color-light-border)";
          }}
        >
          <div className="flex flex-col items-center gap-3">
            <img
              src={fileUploadIcon}
              alt="Upload"
              className="w-8 h-8"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(60%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0.8)",
              }}
            />
            <div className="text-center">
              <p className="font-medium text-[var(--color-light-text-secondary)]">
                Click to choose a file or drag here
              </p>
              <p className="text-sm mt-1 text-[var(--color-light-text-muted)]">
                Size limit: 10 MB
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Selected file display */}
      {selectedFile && (
        <div className="mt-4 p-4 bg-[var(--color-green-50)] border border-[var(--color-green-200)] rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[var(--color-green-600)] rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-[var(--color-green-800)] truncate">
                  {selectedFile.name}
                </p>
                <p className="text-sm text-[var(--color-green-600)]">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
                {uploadedFileUrl && (
                  <p className="text-xs text-[var(--color-green-600)] mt-1">
                    ✅ Uploaded successfully
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {uploading && (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[var(--color-green-600)]"></div>
              )}
              <button
                onClick={removeFile}
                className="p-2 text-[var(--color-green-600)] hover:bg-[var(--color-green-100)] rounded-lg transition-colors"
                title="Remove file"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileInput;
