export default function Search({
  searchTermHandler,
  searchTerm
}: {
  searchTermHandler: (term: string) => void;
  searchTerm: string;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchTermHandler(e.target.value);
  };

  return (
    <form>
      <label htmlFor="search" />
      <input
        type="search"
        autoFocus
        value={searchTerm}
        id="search"
        name="search"
        onChange={handleChange}
        placeholder="Buscar criptomoneda..."
        className="w-full rounded-xl bg-gray-900 border border-gray-700 
               px-4 py-2 text-gray-200 placeholder-gray-500 
               focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
               transition duration-200"
      />
    </form>
  );
}
