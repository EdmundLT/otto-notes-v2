import ClientSideRoute from "./ClientSideRoute";

const Tag = ({ category, slug, locale }: any) => {
  return (
    <div className="text-[#1FB2A5] hover:bg-[#1FB2A5] px-1 hover:rounded-lg hover:text-white">
      <ClientSideRoute route={ locale === "zh" ? `/zh/category/${slug}` : `/category/${slug}`}>
        <p className="">{category}</p>
      </ClientSideRoute>
    </div>
  );
};

export default Tag;
