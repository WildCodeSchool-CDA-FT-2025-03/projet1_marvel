import ActionButton from './ActionButton';

interface ActionButtonsGroupProps {
  primaryButtonLabel: string;
  secondaryButtonLabel: string;
  primaryButtonLink?: string;
  secondaryButtonLink?: string;
}

export default function ActionButtonsGroup({
  primaryButtonLabel,
  secondaryButtonLabel,
  primaryButtonLink,
  secondaryButtonLink,
}: ActionButtonsGroupProps) {
  return (
    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
      <ActionButton label={primaryButtonLabel} isPrimary={true} to={primaryButtonLink || ''} />
      <ActionButton label={secondaryButtonLabel} isPrimary={false} to={secondaryButtonLink} />
    </div>
  );
}
