import React from "react";
import type { Question } from "../types";
import QuestionBuilderBlock from "./form-builder/QuestionBuilderBlock";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface FormBuilderProps {
  questions: Question[];
  onQuestionsChange: (questions: Question[]) => void;
  selectedQuestion: Question | null;
  onQuestionSelect: (question: Question | null) => void;
  formTitle?: string;
  formDescription?: string;
}

// Wrapper component to make QuestionBuilderBlock draggable
const DraggableQuestionBlock: React.FC<{
  question: Question;
  index: number;
  onUpdate: (question: Question) => void;
  onDelete: (id: number | string) => void;
  isSelected: boolean;
  onSelect: (question: Question | null) => void;
}> = ({ question, index, onUpdate, onDelete, isSelected, onSelect }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: question.id?.toString() ?? `${question.question_type}-${index}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      {/* Drag Handle */}
      <div
        {...(attributes as React.HTMLAttributes<HTMLDivElement>)}
        {...(listeners as React.HTMLAttributes<HTMLDivElement>)}
        className="absolute -left-8 top-1/2 transform -translate-y-1/2 z-10 cursor-grab active:cursor-grabbing p-2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7 2a2 2 0 1 1 .001 4.001A2 2 0 0 1 7 2zm0 6a2 2 0 1 1 .001 4.001A2 2 0 0 1 7 8zm0 6a2 2 0 1 1 .001 4.001A2 2 0 0 1 7 14zm6-8a2 2 0 1 1-.001-4.001A2 2 0 0 1 13 6zm0 2a2 2 0 1 1 .001 4.001A2 2 0 0 1 13 8zm0 6a2 2 0 1 1 .001 4.001A2 2 0 0 1 13 14z" />
        </svg>
      </div>
      
      <QuestionBuilderBlock
        question={question}
        onUpdate={onUpdate}
        onDelete={onDelete}
        isSelected={isSelected}
        onSelect={onSelect}
      />
    </div>
  );
};

const FormBuilder: React.FC<FormBuilderProps> = ({
  questions,
  onQuestionsChange,
  selectedQuestion,
  onQuestionSelect,
  formTitle = "Untitled Form",
  formDescription = "",
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const updateQuestion = (updatedQuestion: Question) => {
    const updatedQuestions = questions.map((q) => {
      if (q.id !== undefined && updatedQuestion.id !== undefined) {
        return q.id === updatedQuestion.id ? updatedQuestion : q;
      }
      // If either id is missing, fall back to object identity
      return q === updatedQuestion ? updatedQuestion : q;
    });
    onQuestionsChange(updatedQuestions);

    // Update selected question if it's the one being updated
    if (
      selectedQuestion &&
      selectedQuestion.id !== undefined &&
      updatedQuestion.id !== undefined &&
      selectedQuestion.id === updatedQuestion.id
    ) {
      onQuestionSelect(updatedQuestion);
    }
  };

  const deleteQuestion = (id: number | string) => {
    const updatedQuestions = questions.filter((q) => q.id !== id);
    onQuestionsChange(updatedQuestions);

    // Clear selection if the deleted question was selected
    if (selectedQuestion && selectedQuestion.id === id) {
      onQuestionSelect(null);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = questions.findIndex(
        (q) => q.id?.toString() === active.id || `${q.question_type}-${questions.indexOf(q)}` === active.id
      );
      const newIndex = questions.findIndex(
        (q) => q.id?.toString() === over.id || `${q.question_type}-${questions.indexOf(q)}` === over.id
      );

      if (oldIndex !== -1 && newIndex !== -1) {
        const newQuestions = arrayMove(questions, oldIndex, newIndex);
        onQuestionsChange(newQuestions);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Form Header */}
      <div className="bg-white rounded-lg  border-gray-200">
        <div className="flex items-start space-x-3">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              {formTitle}
            </h1>
            {formDescription && (
              <p className="text-gray-600 leading-relaxed">{formDescription}</p>
            )}
          </div>
        </div>
      </div>

      {/* Questions with Drag and Drop */}
      {questions?.length === 0 ? (
        <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
          <p className="text-gray-500">
            Click the buttons in the left sidebar to add questions
          </p>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={questions.map((q, index) => q.id?.toString() ?? `${q.question_type}-${index}`)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-6 ml-8">
              {questions?.map((question, index) => (
                <DraggableQuestionBlock
                  key={question.id ?? `${question.question_type}-${index}`}
                  question={question}
                  index={index}
                  onUpdate={updateQuestion}
                  onDelete={deleteQuestion}
                  isSelected={
                    selectedQuestion?.id !== undefined && question.id !== undefined
                      ? selectedQuestion.id === question.id
                      : selectedQuestion === question
                  }
                  onSelect={onQuestionSelect}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};

export default FormBuilder;
