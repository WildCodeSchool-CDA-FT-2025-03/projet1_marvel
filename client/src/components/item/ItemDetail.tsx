import { Calendar, List, Clock } from 'lucide-react';
import { FeatureItem } from './FeatureItem';

type ItemDetailProps = {
  item: {
    release_date: string;
    category: string;
    duration: number;
    genre: string;
  };
  itemInfo: {
    summary: string;
  };
};

export default function ItemDetail({ item, itemInfo }: ItemDetailProps) {
  return (
    <section className="px-6 py-6">
      <div className="space-y-6">
        <section>
          <h3 className="text-lg font-semibold mb-2">À propos</h3>
          <p className="text-gray-600">{itemInfo.summary}</p>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3">Caractéristiques</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {item.release_date ? (
              <FeatureItem
                icon={Calendar}
                label="Date de sortie"
                value={new Date(item.release_date).toLocaleDateString('fr-FR')}
              />
            ) : null}

            {item.category || item.genre ? (
              <FeatureItem icon={List} label="Catégorie" value={item.category || item.genre} />
            ) : null}

            {item.duration ? (
              <FeatureItem
                icon={Clock}
                label="Durée"
                value={
                  typeof item.duration === 'number' ? `${item.duration} minutes` : item.duration
                }
              />
            ) : null}
          </div>
        </section>
      </div>
    </section>
  );
}
