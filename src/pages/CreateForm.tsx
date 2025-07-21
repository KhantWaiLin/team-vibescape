import { FormCreateLayout } from "../components/layout";

// Replace this with your actual data fetching logic
const mockFormData = {
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
  return (
    <FormCreateLayout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Form Builder</h2>
          <p className="text-gray-600 mb-8">This is where the form builder content will go. The layout now has two sidebars and a header!</p>
          
          {/* Placeholder for form builder content */}
          <div className="space-y-4">
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <p className="text-gray-500">Drag and drop questions here or click the buttons in the left sidebar</p>
            </div>
          </div>
        </div>
      </div>
    </FormCreateLayout>
  );
};

export default CreateForm;