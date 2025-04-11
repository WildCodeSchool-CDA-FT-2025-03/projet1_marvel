import React from 'react';

type FormLabelProps = {
  htmlFor: string;
  label: string;
  required?: boolean;
  className?: string;
  children?: React.ReactNode;
  spacing?: 'left' | 'right' | 'both';
};

export default function FormLabel({
  htmlFor,
  label,
  required = false,
  className = 'text-sm font-medium text-gray-700',
  children,
  spacing = 'right',
}: FormLabelProps) {
  const spacingClasses = {
    left: 'ml-2',
    right: 'mr-2',
    both: 'mx-2',
  };

  return (
    <label htmlFor={htmlFor} className={`${className} flex items-center`} aria-required={required}>
      {children && <span className={spacingClasses[spacing]}>{children}</span>}
      {label}
      {required && (
        <>
          <span className="text-red-500 ml-1" aria-hidden="true">
            *
          </span>
          <span className="sr-only">(obligatoire)</span>
        </>
      )}
    </label>
  );
}
