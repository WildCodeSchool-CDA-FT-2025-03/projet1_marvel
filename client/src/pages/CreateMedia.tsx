import CreateMovieForm from '../components/layout/forms/movieForm/MovieForm';

export default function CreateMediaPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Créer un nouveau média</h1>
      <CreateMovieForm />
    </div>
  );
}
