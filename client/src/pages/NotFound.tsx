import ErrorIllustration from '../components/notfound/ErrorIllustration';
import ErrorContent from '../components/notfound/ErrorContent';
import RandomSuggestion from '../components/notfound/RandomSuggestion';

export default function NotFound() {
  return (
    <main
      className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-16 px-4"
      aria-labelledby="error-title"
    >
      <div className="max-w-lg w-full">
        <ErrorIllustration />
        <ErrorContent />
        <RandomSuggestion />
      </div>
    </main>
  );
}
