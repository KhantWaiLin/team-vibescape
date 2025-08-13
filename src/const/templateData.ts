export interface TemplateQuestion {
  id: number;
  form_id: number;
  question_text: string;
  question_type: string;
  is_required: number;
  order: number;
  options: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface TemplateForm {
  id: number;
  title: string;
  description: string;
  fieldsCount: number;
  usersCount: number;
  category: string;
  questions: TemplateQuestion[];
}

export const templateForms: TemplateForm[] = [
  {
    id: 1,
    title: "Workshop Registration Form",
    description: "A comprehensive form for workshop registration with multiple session options, dietary preferences, and emergency contact information.",
    fieldsCount: 5,
    usersCount: 15,
    category: "Marketing",
    questions: [
      {
        id: 9,
        form_id: 2,
        question_text: "Text question",
        question_type: "text",
        is_required: 1,
        order: 1,
        options: null,
        deleted_at: null,
        created_at: "2025-07-04T22:20:20.000000Z",
        updated_at: "2025-07-04T22:20:20.000000Z"
      },
      {
        id: 10,
        form_id: 2,
        question_text: "Paragraph question",
        question_type: "paragraph",
        is_required: 1,
        order: 2,
        options: null,
        deleted_at: null,
        created_at: "2025-07-04T22:20:20.000000Z",
        updated_at: "2025-07-04T22:20:20.000000Z"
      },
      {
        id: 11,
        form_id: 2,
        question_text: "Dropdown question",
        question_type: "dropdown",
        is_required: 1,
        order: 3,
        options: "[\"Option 1\", \"Option 2\", \"Option 3\"]",
        deleted_at: null,
        created_at: "2025-07-04T22:20:20.000000Z",
        updated_at: "2025-07-04T22:20:20.000000Z"
      },
      {
        id: 12,
        form_id: 2,
        question_text: "Datetime question",
        question_type: "datetime",
        is_required: 1,
        order: 4,
        options: null,
        deleted_at: null,
        created_at: "2025-07-04T22:20:20.000000Z",
        updated_at: "2025-07-04T22:20:20.000000Z"
      },
      {
        id: 13,
        form_id: 2,
        question_text: "Multiple_choice question",
        question_type: "multiple_choice",
        is_required: 1,
        order: 5,
        options: "[\"Choice A\", \"Choice B\", \"Choice C\"]",
        deleted_at: null,
        created_at: "2025-07-04T22:20:20.000000Z",
        updated_at: "2025-07-04T22:20:20.000000Z"
      }
    ]
  },
  {
    id: 2,
    title: "Webinar Sign-Up Form",
    description: "Streamlined webinar registration form with email verification, timezone selection, and reminder preferences.",
    fieldsCount: 8,
    usersCount: 23,
    category: "Marketing",
    questions: [
      {
        id: 9,
        form_id: 2,
        question_text: "Text question",
        question_type: "text",
        is_required: 1,
        order: 1,
        options: null,
        deleted_at: null,
        created_at: "2025-07-04T22:20:20.000000Z",
        updated_at: "2025-07-04T22:20:20.000000Z"
      },
      {
        id: 10,
        form_id: 2,
        question_text: "Paragraph question",
        question_type: "paragraph",
        is_required: 1,
        order: 2,
        options: null,
        deleted_at: null,
        created_at: "2025-07-04T22:20:20.000000Z",
        updated_at: "2025-07-04T22:20:20.000000Z"
      },
      {
        id: 11,
        form_id: 2,
        question_text: "Dropdown question",
        question_type: "dropdown",
        is_required: 1,
        order: 3,
        options: "[\"Option 1\", \"Option 2\", \"Option 3\"]",
        deleted_at: null,
        created_at: "2025-07-04T22:20:20.000000Z",
        updated_at: "2025-07-04T22:20:20.000000Z"
      },
      {
        id: 12,
        form_id: 2,
        question_text: "Datetime question",
        question_type: "datetime",
        is_required: 1,
        order: 4,
        options: null,
        deleted_at: null,
        created_at: "2025-07-04T22:20:20.000000Z",
        updated_at: "2025-07-04T22:20:20.000000Z"
      },
      {
        id: 13,
        form_id: 2,
        question_text: "Multiple_choice question",
        question_type: "multiple_choice",
        is_required: 1,
        order: 5,
        options: "[\"Choice A\", \"Choice B\", \"Choice C\"]",
        deleted_at: null,
        created_at: "2025-07-04T22:20:20.000000Z",
        updated_at: "2025-07-04T22:20:20.000000Z"
      },
      {
        id: 14,
        form_id: 2,
        question_text: "Checkboxes question",
        question_type: "checkboxes",
        is_required: 1,
        order: 6,
        options: "[\"Check 1\", \"Check 2\", \"Check 3\"]",
        deleted_at: null,
        created_at: "2025-07-04T22:20:20.000000Z",
        updated_at: "2025-07-04T22:20:20.000000Z"
      },
      {
        id: 15,
        form_id: 2,
        question_text: "Rating question",
        question_type: "rating",
        is_required: 1,
        order: 7,
        options: null,
        deleted_at: null,
        created_at: "2025-07-04T22:20:20.000000Z",
        updated_at: "2025-07-04T22:20:20.000000Z"
      },
      {
        id: 16,
        form_id: 2,
        question_text: "File question",
        question_type: "file",
        is_required: 1,
        order: 8,
        options: null,
        deleted_at: null,
        created_at: "2025-07-04T22:20:20.000000Z",
        updated_at: "2025-07-04T22:20:20.000000Z"
      }
    ]
  },
  {
    id: 3,
    title: "Workshop Registration Form",
    description: "Professional workshop registration template with skill level assessment, group preferences, and payment options.",
    fieldsCount: 6,
    usersCount: 12,
    category: "Training",
    questions: [
      {
        id: 9,
        form_id: 2,
        question_text: "Text question",
        question_type: "text",
        is_required: 1,
        order: 1,
        options: null,
        deleted_at: null,
        created_at: "2025-07-04T22:20:20.000000Z",
        updated_at: "2025-07-04T22:20:20.000000Z"
      },
      {
        id: 10,
        form_id: 2,
        question_text: "Paragraph question",
        question_type: "paragraph",
        is_required: 1,
        order: 2,
        options: null,
        deleted_at: null,
        created_at: "2025-07-04T22:20:20.000000Z",
        updated_at: "2025-07-04T22:20:20.000000Z"
      },
      {
        id: 11,
        form_id: 2,
        question_text: "Dropdown question",
        question_type: "dropdown",
        is_required: 1,
        order: 3,
        options: "[\"Option 1\", \"Option 2\", \"Option 3\"]",
        deleted_at: null,
        created_at: "2025-07-04T22:20:20.000000Z",
        updated_at: "2025-07-04T22:20:20.000000Z"
      },
      {
        id: 12,
        form_id: 2,
        question_text: "Datetime question",
        question_type: "datetime",
        is_required: 1,
        order: 4,
        options: null,
        deleted_at: null,
        created_at: "2025-07-04T22:20:20.000000Z",
        updated_at: "2025-07-04T22:20:20.000000Z"
      },
      {
        id: 13,
        form_id: 2,
        question_text: "Multiple_choice question",
        question_type: "multiple_choice",
        is_required: 1,
        order: 5,
        options: "[\"Choice A\", \"Choice B\", \"Choice C\"]",
        deleted_at: null,
        created_at: "2025-07-04T22:20:20.000000Z",
        updated_at: "2025-07-04T22:20:20.000000Z"
      },
      {
        id: 14,
        form_id: 2,
        question_text: "Checkboxes question",
        question_type: "checkboxes",
        is_required: 1,
        order: 6,
        options: "[\"Check 1\", \"Check 2\", \"Check 3\"]",
        deleted_at: null,
        created_at: "2025-07-04T22:20:20.000000Z",
        updated_at: "2025-07-04T22:20:20.000000Z"
      }
    ]
  },
  {
    id: 4,
    title: "Booking Request Form",
    description: "Service booking form with date/time selection, service type options, and special requirements field.",
    fieldsCount: 4,
    usersCount: 8,
    category: "Services",
    questions: [
      {
        id: 9,
        form_id: 2,
        question_text: "Text question",
        question_type: "text",
        is_required: 1,
        order: 1,
        options: null,
        deleted_at: null,
        created_at: "2025-07-04T22:20:20.000000Z",
        updated_at: "2025-07-04T22:20:20.000000Z"
      },
      {
        id: 10,
        form_id: 2,
        question_text: "Paragraph question",
        question_type: "paragraph",
        is_required: 1,
        order: 2,
        options: null,
        deleted_at: null,
        created_at: "2025-07-04T22:20:20.000000Z",
        updated_at: "2025-07-04T22:20:20.000000Z"
      },
      {
        id: 11,
        form_id: 2,
        question_text: "Dropdown question",
        question_type: "dropdown",
        is_required: 1,
        order: 3,
        options: "[\"Option 1\", \"Option 2\", \"Option 3\"]",
        deleted_at: null,
        created_at: "2025-07-04T22:20:20.000000Z",
        updated_at: "2025-07-04T22:20:20.000000Z"
      },
      {
        id: 12,
        form_id: 2,
        question_text: "Datetime question",
        question_type: "datetime",
        is_required: 1,
        order: 4,
        options: null,
        deleted_at: null,
        created_at: "2025-07-04T22:20:20.000000Z",
        updated_at: "2025-07-04T22:20:20.000000Z"
      }
    ]
  }
];
