import { FormCreateLayout } from "../components/layout";
import { FormBuilder } from "../components";
import { useState } from "react";
import type { Question, FormData } from "../types";

// Replace this with your actual data fetching logic
const mockFormData: FormData = {
  title: "Sample Form 2",
  description: "This is sample form number 2.",
  questions: [
    {
      id: 9,
      question_text: "Text question",
      question_type: "text",
      is_required: 1,
      options: null,
    },
    {
      id: 10,
      question_text: "Paragraph question",
      question_type: "paragraph",
      is_required: 1,
      options: null,
    },
    {
      id: 11,
      question_text: "Dropdown question",
      question_type: "dropdown",
      is_required: 1,
      options: '["Option 1", "Option 2", "Option 3"]',
    },
    {
      id: 12,
      question_text: "Datetime question",
      question_type: "datetime",
      is_required: 1,
      options: null,
    },
    {
      id: 13,
      question_text: "Multiple_choice question",
      question_type: "multiple_choice",
      is_required: 1,
      options: '["Choice A", "Choice B", "Choice C"]',
    },
    {
      id: 14,
      question_text: "Checkboxes question",
      question_type: "checkboxes",
      is_required: 1,
      options: '["Check 1", "Check 2", "Check 3"]',
    },
    {
      id: 15,
      question_text: "Rating question",
      question_type: "rating",
      is_required: 1,
      options: null,
    },
    {
      id: 16,
      question_text: "File question",
      question_type: "file",
      is_required: 1,
      options: null,
    },
  ],
};

const CreateForm = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [formTitle, setFormTitle] = useState<string>("Untitled Form");
  const [formDescription, setFormDescription] = useState<string>("");

  const handleQuestionsChange = (newQuestions: Question[]) => {
    setQuestions(newQuestions);
  };

  const handleQuestionSelect = (question: Question | null) => {
    setSelectedQuestion(question);
  };

  return (
    <FormCreateLayout
      questions={questions}
      onQuestionsChange={handleQuestionsChange}
      selectedQuestion={selectedQuestion}
      onQuestionSelect={handleQuestionSelect}
      formTitle={formTitle}
      formDescription={formDescription}
      onFormTitleChange={setFormTitle}
      onFormDescriptionChange={setFormDescription}
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Form Builder Component */}
          <FormBuilder
            questions={questions}
            onQuestionsChange={handleQuestionsChange}
            selectedQuestion={selectedQuestion}
            onQuestionSelect={handleQuestionSelect}
            formTitle={formTitle}
            formDescription={formDescription}
          />
        </div>
      </div>
    </FormCreateLayout>
  );
};

export default CreateForm;
