import { LucideIcon } from 'lucide-react';
import React from 'react';

type FeatureItemProps = {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
};

export function FeatureItem({ icon: Icon, label, value }: FeatureItemProps) {
  return (
    <div className="flex items-start">
      <Icon size={18} className="mr-2 mt-0.5 text-gray-500" />
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p>{value}</p>
      </div>
    </div>
  );
}
