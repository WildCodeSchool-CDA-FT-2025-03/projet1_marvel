import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useQuery } from '@apollo/client';
import { getQueryForType } from '../utils/queries';
import { getItemData } from '../utils/item-data';
import ItemHeader from '../components/item/ItemHeader';
import ItemDetail from '../components/item/ItemDetail';

export default function Item() {
  const { type, id } = useParams();

  const { loading, error, data } = useQuery(getQueryForType(type as string), {
    variables: { id: Number(id) },
  });

  const itemInfo = getItemData(type, data);
  const item = itemInfo?.data;

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="text-2xl font-bold mb-4">Item non trouvé</div>
        <Link to="/catalogue" className="text-indigo-600 hover:underline">
          Retourner au catalogue
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <nav className="mb-6">
          <Link
            to="/catalogue"
            className="inline-flex items-center text-indigo-600 hover:underline"
          >
            <ArrowLeft size={16} className="mr-1" /> Retour au catalogue
          </Link>
        </nav>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <ItemHeader itemInfo={itemInfo} item={item} />
          <ItemDetail itemInfo={itemInfo} item={item} />
        </div>
      </div>
    </main>
  );
}
