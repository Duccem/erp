const Page = async ({ searchParams }: { searchParams: Promise<{ checkout_id: string }> }) => {
  const { checkout_id } = await searchParams;
  return <div>{checkout_id}</div>;
};

export default Page;
