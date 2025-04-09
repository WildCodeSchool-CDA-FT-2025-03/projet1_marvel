import React from 'react';

interface CommentFormProps {
  comment: string;
  onCommentChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
  placeholder?: string;
  rows?: number;
}
const CommentForm: React.FC<CommentFormProps> = ({
  comment,
  onCommentChange,
  label = 'Avis :',
  placeholder = 'Écrivez votre avis ici...',
  rows = 4,
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id="comment"
        name="comment"
        value={comment}
        onChange={onCommentChange}
        placeholder={placeholder}
        rows={rows}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm"
      />
    </div>
  );
};

export default CommentForm;
