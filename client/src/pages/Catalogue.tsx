import CatalogueItem from '../components/catalogue/CatalogueItem';
import useCatalogueData from '../hooks/useCatalogueData';

export default function Catalogue() {
  const { catalogueItems, isLoading } = useCatalogueData();

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Catalogue</h1>
        </div>

        <div className="text-sm text-gray-500 mb-6">
          {catalogueItems.length}{' '}
          {catalogueItems.length > 1 ? 'éléments trouvés' : 'élément trouvé'}
        </div>

        {isLoading ? (
          <div className="bg-white p-8 rounded-lg text-center">
            <p className="text-gray-500">Chargement des données en cours...</p>
          </div>
        ) : catalogueItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {catalogueItems.map(item => (
              <CatalogueItem key={`${item.id}-${item.type}`} item={item} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg text-center">
            <p className="text-gray-500">Aucun élément disponible dans le catalogue.</p>
          </div>
        )}
      </div>
    </main>
  );
}
