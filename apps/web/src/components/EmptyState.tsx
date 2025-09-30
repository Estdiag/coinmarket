type EmptyStateProps = {
  message?: string;
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  message = 'No se encontraron resultados',
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <span className="material-symbols-outlined">search_off</span>

      <h2 className="text-lg font-semibold">{message}</h2>

      <p className="text-sm mt-2">
        Intenta busca con otro término.
      </p>
    </div>
  );
};
