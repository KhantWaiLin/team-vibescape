import React from "react";
import type { Question } from "../../../types";

interface DateTimeInputBuilderProps {
  question: Question;
}

const DateTimeInputBuilder: React.FC<DateTimeInputBuilderProps> = ({ question }) => {
  return (
    <input
      type="datetime-local"
      className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 bg-transparent text-gray-900 px-0 py-2"
      title={question.placeholder || "Select date and time"}
      disabled
    />
  );
};

export default DateTimeInputBuilder; 