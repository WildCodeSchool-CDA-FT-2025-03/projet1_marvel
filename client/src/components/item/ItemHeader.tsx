import { ItemDataResult } from '../../types/item.type';

type ItemHeaderProps = {
  itemInfo: ItemDataResult;
  item: {
    release_date: string;
    category: string;
    duration: number;
    genre: string;
    format: string;
    subtitle: string;
  };
};

export default function ItemHeader({ itemInfo, item }: ItemHeaderProps) {
  return (
    <header className={`${itemInfo.bgColor} px-6 py-8`}>
      <div className="flex flex-col md:flex-row">
        <section className="flex justify-center md:justify-start mb-6 md:mb-0">
          <div className="relative h-64 w-64 flex items-center justify-center bg-white rounded-lg shadow-lg">
            <span className="text-9xl">{itemInfo.emoji}</span>
          </div>
        </section>

        <section className="md:ml-8 flex-1">
          <div className="flex items-center mb-2">
            <div className="flex items-center text-sm font-medium">
              {itemInfo.icon}
              <span>{itemInfo.label}</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-2">{itemInfo.title}</h1>

          {item.subtitle && <p className="text-lg text-gray-600 mb-3">{item.subtitle}</p>}

          <p className="text-lg mb-4">{itemInfo.creator}</p>

          <p className="text-sm text-gray-600 mb-6">
            {item.format && (
              <span className="mr-3">
                {Array.isArray(item.format) ? item.format.join(', ') : item.format}
              </span>
            )}
            {item.release_date && <span>{new Date(item.release_date).getFullYear()}</span>}
          </p>
        </section>
      </div>
    </header>
  );
}
