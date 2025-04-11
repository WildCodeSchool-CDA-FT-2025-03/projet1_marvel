type FieldLabelProps = {
  htmlFor: string;
  label: string;
  required?: boolean;
  className?: string;
};

export default function FieldLabel({
  htmlFor,
  label,
  required = false,
  className = 'text-sm font-medium text-gray-700 mb-1',
}: FieldLabelProps) {
  return (
    <label htmlFor={htmlFor} className={className}>
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}
