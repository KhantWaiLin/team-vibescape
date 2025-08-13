import React from "react";
import type { Question } from "../../../types";
import fileUploadIcon from "../../../assets/icons/cloud_upload.svg";

interface FileInputProps {
  question: Question;
  value?: File;
  onChange?: (value: File) => void;
}

const FileInput: React.FC<FileInputProps> = ({ question, value, onChange }) => {
  return (
    <div className="w-full">
      {/* File upload drop zone */}
      <div className="relative">
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onChange?.(file);
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          title={question.placeholder || "Choose file"}
        />
        <div className="border-2 border-dashed border-light-border bg-light-bg rounded-lg p-8 text-center transition-colors" 
             onMouseEnter={(e) => {
               e.currentTarget.style.borderColor = 'var(--color-black-400)';
             }}
             onMouseLeave={(e) => {
               e.currentTarget.style.borderColor = 'var(--color-light-border)';
             }}>
          <div className="flex flex-col items-center gap-3">
            <img 
              src={fileUploadIcon} 
              alt="Upload" 
              className="w-8 h-8"
              style={{ filter: 'brightness(0) saturate(100%) invert(60%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0.8)' }}
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
    </div>
  );
};

export default FileInput; 