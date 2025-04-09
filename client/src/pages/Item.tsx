import DetailComponent from '../components/layout/detail';

export default function ItemPage() {
  // Ici vous pouvez récupérer les données de l'item depuis votre API
  const itemData = {
    itemTitle: "Titre de l'item",
    // Autres données de l'item...
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <DetailComponent {...itemData} />
      </div>
    </div>
  );
}
