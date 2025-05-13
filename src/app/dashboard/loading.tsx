export default function DashboardLoading() {
  return (
    <div className="flex min-h-screen items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-2">
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 rounded-xl p-6">
              <div className="h-6 w-40 bg-indigo-200 rounded animate-pulse mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 w-full bg-indigo-200 rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-indigo-200 rounded animate-pulse"></div>
                <div className="h-4 w-2/3 bg-indigo-200 rounded animate-pulse"></div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-6">
              <div className="h-6 w-40 bg-purple-200 rounded animate-pulse mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 w-full bg-purple-200 rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-purple-200 rounded animate-pulse"></div>
                <div className="h-4 w-2/3 bg-purple-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 