import { Ring } from '@uiball/loaders';

export const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 space-y-4">
      <div className="relative">
        <Ring size={40} lineWeight={5} speed={2} color="#110283" />
      </div>
      <p className="text-primary text-lg animate-pulse">Загрузка...</p>
    </div>
  );
};
