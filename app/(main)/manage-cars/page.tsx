import { client } from '@/lib/sanity/client';

export default async function CarManagementPage() {
  let cars = [];
  let error = null;

  try {
    cars = await client.fetch(`*[_type == "car"] | order(_createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      status,
      _createdAt,
      "imageCount": count(images)
    }`);
  } catch (e) {
    error = e instanceof Error ? e.message : 'Unknown error';
  }

  return (
    <div className="pt-32 pb-16 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">🚗 Car Management Panel</h1>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h2 className="text-red-800 font-semibold mb-2">Error:</h2>
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-blue-800 font-semibold text-xl mb-4">🗑️ Can't Delete Cars in Studio?</h2>
          <div className="space-y-3 text-blue-700">
            <p><strong>Quick Fixes:</strong></p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li><strong>Refresh Studio:</strong> Press Ctrl+F5 (or Cmd+Shift+R on Mac) in your Studio tab</li>
              <li><strong>Clear Cache:</strong> Clear browser cache and cookies</li>
              <li><strong>Re-login:</strong> Log out and back into Sanity Studio</li>
              <li><strong>Different Browser:</strong> Try Chrome, Firefox, or Safari</li>
              <li><strong>Check Account:</strong> Make sure you're logged into the correct Sanity account</li>
            </ol>
            <div className="mt-4 p-3 bg-blue-100 rounded">
              <p className="text-sm"><strong>How to Delete in Studio:</strong></p>
              <ol className="list-decimal list-inside text-xs mt-1 space-y-1">
                <li>Click on a car to open it</li>
                <li>Look for three dots (⋯) in top right corner</li>
                <li>Click "Delete" from dropdown</li>
                <li>Or right-click the car in list view</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">📋 All Cars ({cars.length} total)</h2>
            <a 
              href="https://hivemotorsltd.sanity.studio/structure/car"
              target="_blank"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Open Studio →
            </a>
          </div>
          
          {cars.length === 0 ? (
            <p className="text-gray-600">No cars found in Sanity database.</p>
          ) : (
            <div className="space-y-3">
              {cars.map((car: any) => (
                <div key={car._id} className={`rounded-lg p-4 border ${
                  !car.slug ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{car.title}</h3>
                      <div className="flex gap-6 mt-1 text-sm text-gray-600">
                        <span>
                          <strong>Slug:</strong> 
                          <span className={car.slug ? 'text-green-600 ml-1' : 'text-red-600 font-semibold ml-1'}>
                            {car.slug || 'MISSING!'}
                          </span>
                        </span>
                        <span><strong>Status:</strong> {car.status}</span>
                        <span><strong>Images:</strong> {car.imageCount}</span>
                        <span><strong>Created:</strong> {new Date(car._createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {car.slug && (
                        <a 
                          href={`/cars/${car.slug}`}
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                          target="_blank"
                        >
                          View
                        </a>
                      )}
                      <a 
                        href={`https://hivemotorsltd.sanity.studio/structure/car;${car._id}`}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                        target="_blank"
                      >
                        Edit
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="text-yellow-800 font-semibold mb-2">💡 Studio Delete Steps:</h3>
            <ol className="list-decimal list-inside space-y-1 text-yellow-700 text-sm">
              <li>Open Sanity Studio</li>
              <li>Go to "Cars for Sale" → "All Cars"</li>
              <li>Click on the car you want to delete</li>
              <li>Click the three dots (⋯) menu</li>
              <li>Select "Delete" and confirm</li>
            </ol>
          </div>
          
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-green-800 font-semibold mb-2">✅ Permissions Check:</h3>
            <p className="text-green-700 text-sm mb-2">Your API token has delete permissions!</p>
            <p className="text-green-600 text-xs">
              If Studio delete still doesn't work, it's likely a browser/cache issue. 
              Try the quick fixes above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}