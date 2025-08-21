# Form Submission Format

This document explains the new form submission format implemented in the FormViewer component.

## Overview

The FormViewer component now automatically transforms form data into a standardized submission format that matches your API requirements.

**Note**: An email field is automatically included at the top of every form and is required for submission.

## Submission Format

The form data is transformed into the following structure:

```json
{
  "url_token": "form_identifier",
  "email": "user_email",
  "submissions": [
    {
      "question_id": 9943,
      "answer": {
        "selected_options": ["Red", "Green"]
      }
    },
    {
      "question_id": 9944,
      "answer": "text answer"
    }
  ]
}
```

## Email Field

Every form automatically includes a required email field at the top. This field:
- Is always visible and required
- Validates email format
- Shows error messages for invalid or missing emails
- Is included in the submission payload

## Answer Format by Question Type

### Multiple Choice Questions (checkboxes, multiple_choice, dropdown)
```json
{
  "question_id": 9943,
  "answer": {
    "selected_options": ["Red", "Green"]
  }
}
```

### Single Selection Questions (radio, dropdown)
```json
{
  "question_id": 9944,
  "answer": {
    "selected_options": ["Blue"]
  }
}
```

### Text-based Questions (text, paragraph, number, datetime)
```json
{
  "question_id": 9945,
  "answer": "user input text"
}
```

### Rating Questions
```json
{
  "question_id": 9946,
  "answer": 5
}
```

### File Upload Questions
```json
{
  "question_id": 9947,
  "answer": {
    "file": "file_data"
  }
}
```

## Usage

### In FormViewer Component

```tsx
<FormViewer
  formTitle="My Form"
  questions={questions}
  onSubmit={handleSubmit}
  urlToken="form_identifier"
/>
```

### Handle Submission

```tsx
const handleSubmit = async (submissionData: FormSubmissionPayload) => {
  try {
    await apiService.post('/api/submit', submissionData);
    console.log('Form submitted successfully');
  } catch (error) {
    console.error('Submission failed:', error);
  }
};
```

## Automatic Transformation

The component automatically:
1. **Validates the required email field** before submission
2. Maps question IDs to the correct format
3. Handles different question types appropriately
4. Skips unanswered questions
5. Provides fallback keys for questions without IDs
6. Formats the data according to your API specification

## TypeScript Support

The submission format is fully typed with the following interfaces:

```tsx
interface FormSubmissionPayload {
  url_token: string;
  email: string;
  submissions: FormSubmissionItem[];
}

interface FormSubmissionItem {
  question_id: number;
  answer: string | number | FormSubmissionAnswer;
}

interface FormSubmissionAnswer {
  selected_options?: string[];
  file?: any;
}
```

## Notes

- Questions without IDs are skipped in the submission
- Empty/unanswered questions are filtered out
- The component handles both preview and submission modes
- All question types are supported with appropriate answer formatting
