export default function LoadingProduct() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10 animate-pulse">
      <div className="h-64 bg-gray-200 rounded-xl" />

      <div className="space-y-4">
        <div className="h-6 w-2/3 bg-gray-200 rounded" />
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
        <div className="h-8 w-1/3 bg-gray-200 rounded" />
        <div className="h-10 w-40 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
