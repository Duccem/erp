import CategoryTable from './components/table';

const Page = () => {
  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-semibold px-4">Categorías y sub categorías</h2>
      <div className="flex px-4 py-7 w-full gap-3"></div>
      <div className="mt-4">
        <CategoryTable />
      </div>
    </div>
  );
};

export default Page;
