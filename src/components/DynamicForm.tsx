import React from "react";
import { useForm } from "react-hook-form";

type Question = {
  id: number;
  question_text: string;
  question_type: string;
  is_required: number;
  options: string | null;
  order?: number;
};

type FormData = {
  title: string;
  description: string;
  questions: Question[];
};

const TextInput = ({ q, register, error }: any) => (
  <input
    type="text"
    className={`mt-1 block w-full rounded-md border focus:ring-2 focus:ring-[var(--color-green-500)] focus:border-[var(--color-green-600)] bg-[var(--color-green-50)] border-[var(--color-green-300)] text-[var(--color-green-900)] placeholder-[var(--color-green-600)] ${error ? 'border-red-500' : ''}`}
    placeholder="Enter your answer"
    {...register(`question_${q.id}`, { required: !!q.is_required })}
  />
);

const ParagraphInput = ({ q, register, error }: any) => (
  <textarea
    className={`mt-1 block w-full rounded-md border focus:ring-2 focus:ring-[var(--color-green-500)] focus:border-[var(--color-green-600)] bg-[var(--color-green-50)] border-[var(--color-green-300)] text-[var(--color-green-900)] placeholder-[var(--color-green-600)] ${error ? 'border-red-500' : ''}`}
    placeholder="Enter your answer"
    rows={4}
    {...register(`question_${q.id}`, { required: !!q.is_required })}
  />
);

const DropdownInput = ({ q, register, error }: any) => (
  <select
    className={`mt-1 block w-full rounded-md border focus:ring-2 focus:ring-[var(--color-green-500)] focus:border-[var(--color-green-600)] bg-[var(--color-green-50)] border-[var(--color-green-300)] text-[var(--color-green-900)] ${error ? 'border-red-500' : ''}`}
    {...register(`question_${q.id}`, { required: !!q.is_required })}
  >
    <option value="">Select...</option>
    {q.options &&
      JSON.parse(q.options).map((opt: string, idx: number) => (
        <option key={idx} value={opt}>{opt}</option>
      ))}
  </select>
);

const DateTimeInput = ({ q, register, error }: any) => (
  <input
    type="datetime-local"
    className={`mt-1 block w-full rounded-md border focus:ring-2 focus:ring-[var(--color-green-500)] focus:border-[var(--color-green-600)] bg-[var(--color-green-50)] border-[var(--color-green-300)] text-[var(--color-green-900)] ${error ? 'border-red-500' : ''}`}
    {...register(`question_${q.id}`, { required: !!q.is_required })}
  />
);

const RadioGroup = ({ q, register, error }: any) => (
  <div className="flex flex-col gap-2 mt-1">
    {q.options &&
      JSON.parse(q.options).map((opt: string, idx: number) => (
        <label key={idx} className="inline-flex items-center text-[var(--color-green-800)] font-medium">
          <input
            type="radio"
            value={opt}
            className="form-radio text-[var(--color-green-600)] focus:ring-[var(--color-green-500)] mr-2"
            {...register(`question_${q.id}`, { required: !!q.is_required })}
          />
          {opt}
        </label>
      ))}
  </div>
);

const CheckboxGroup = ({ q, register, error }: any) => (
  <div className="flex flex-col gap-2 mt-1">
    {q.options &&
      JSON.parse(q.options).map((opt: string, idx: number) => (
        <label key={idx} className="inline-flex items-center text-[var(--color-green-800)] font-medium">
          <input
            type="checkbox"
            value={opt}
            className="form-checkbox text-[var(--color-green-600)] focus:ring-[var(--color-green-500)] mr-2"
            {...register(`question_${q.id}`, { required: !!q.is_required })}
          />
          {opt}
        </label>
      ))}
  </div>
);

const RatingInput = ({ q, register, error }: any) => (
  <input
    type="number"
    min={1}
    max={5}
    placeholder="Rate 1-5"
    className={`mt-1 block w-full rounded-md border focus:ring-2 focus:ring-[var(--color-green-500)] focus:border-[var(--color-green-600)] bg-[var(--color-green-50)] border-[var(--color-green-300)] text-[var(--color-green-900)] placeholder-[var(--color-green-600)] ${error ? 'border-red-500' : ''}`}
    {...register(`question_${q.id}`, { required: !!q.is_required, min: 1, max: 5 })}
  />
);

const FileInput = ({ q, register, error }: any) => (
  <input
    type="file"
    className={`mt-1 block w-full rounded-md border focus:ring-2 focus:ring-[var(--color-green-500)] focus:border-[var(--color-green-600)] bg-[var(--color-green-50)] border-[var(--color-green-300)] text-[var(--color-green-900)] ${error ? 'border-red-500' : ''}`}
    {...register(`question_${q.id}`, { required: !!q.is_required })}
  />
);

const QuestionBlock = ({ q, register, error }: any) => {
  let inputComponent = null;
  switch (q.question_type) {
    case "text":
      inputComponent = <TextInput q={q} register={register} error={error} />;
      break;
    case "paragraph":
      inputComponent = <ParagraphInput q={q} register={register} error={error} />;
      break;
    case "dropdown":
      inputComponent = <DropdownInput q={q} register={register} error={error} />;
      break;
    case "datetime":
      inputComponent = <DateTimeInput q={q} register={register} error={error} />;
      break;
    case "multiple_choice":
      inputComponent = <RadioGroup q={q} register={register} error={error} />;
      break;
    case "checkboxes":
      inputComponent = <CheckboxGroup q={q} register={register} error={error} />;
      break;
    case "rating":
      inputComponent = <RatingInput q={q} register={register} error={error} />;
      break;
    case "file":
      inputComponent = <FileInput q={q} register={register} error={error} />;
      break;
    default:
      inputComponent = null;
  }
  return (
    <div className="bg-[var(--color-light-card)] border border-[var(--color-green-200)] rounded-xl shadow p-6 mb-6">
      <label className="block text-[var(--color-green-900)] font-semibold mb-1">
        {q.question_text}
        {q.is_required ? <span className="text-[var(--color-green-600)] ml-1">*</span> : null}
      </label>
      {inputComponent}
      {error && (
        <span className="text-red-600 text-sm mt-1 block">
          {q.question_type === 'rating' ? 'This field is required and must be 1-5' : 'This field is required'}
        </span>
      )}
    </div>
  );
};

const DynamicForm: React.FC<{ form: FormData }> = ({ form }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  // Sort questions by 'order' property
  const sortedQuestions = [...form.questions].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    // You can handle form submission here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto bg-[var(--color-light-card)] rounded-2xl shadow-lg border border-[var(--color-green-200)] p-8 mt-10 mb-10">
      <h2 className="text-3xl font-bold text-[var(--color-green-800)] mb-2 text-center">{form.title}</h2>
      <p className="text-[var(--color-green-700)] mb-8 text-center">{form.description}</p>
      {sortedQuestions.map((q) => (
        <QuestionBlock key={q.id} q={q} register={register} error={errors[`question_${q.id}`]} />
      ))}
      <button
        type="submit"
        className="w-full bg-[var(--color-green-600)] hover:bg-[var(--color-green-700)] text-[var(--color-light-text-inverse)] font-bold py-3 rounded-lg transition-colors duration-200 mt-4 shadow-md text-lg"
      >
        Submit
      </button>
    </form>
  );
};

export default DynamicForm;