function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-lg text-gray-700">Loading...</p>
      </div>
    </div>
  );
}

export default Loading;