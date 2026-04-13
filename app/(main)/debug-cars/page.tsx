import { client } from '@/lib/sanity/client';
import { getAllCarsDebugInfo, validateCarSlugs, autoFixInvalidSlugs } from '@/lib/carManagement';

export default async function DebugCarsPage() {
  let cars = [];
  let validation = null;
  let error = null;

  try {
    cars = await client.fetch(`*[_type == "car"] {
      _id,
      title,
      "slug": slug.current,
      status,
      _createdAt,
      "hasImages": defined(images) && count(images) > 0,
      "imageCount": count(images),
      "images": images[]{..., asset->}
    }`);
    validation = await validateCarSlugs();
  } catch (e) {
    error = e instanceof Error ? e.message : 'Unknown error';
  }

  return (
    <div className="pt-32 pb-16 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">🔧 Car Management Debug Panel</h1>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h2 className="text-red-800 font-semibold mb-2">Error:</h2>
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {validation && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-green-800 font-semibold text-lg mb-2">✅ Valid Cars</h3>
              <p className="text-3xl font-bold text-green-600">{validation.valid.length}</p>
              <p className="text-sm text-green-700">Cars with proper slugs</p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-red-800 font-semibold text-lg mb-2">❌ Invalid Cars</h3>
              <p className="text-3xl font-bold text-red-600">{validation.invalid.length}</p>
              <p className="text-sm text-red-700">Cars missing slugs</p>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="text-amber-800 font-semibold text-lg mb-2">⚠️ Duplicates</h3>
              <p className="text-3xl font-bold text-amber-600">{validation.duplicates.length}</p>
              <p className="text-sm text-amber-700">Duplicate slugs found</p>
            </div>
          </div>
        )}

        {validation?.invalid && validation.invalid.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <h2 className="text-red-800 font-semibold text-xl mb-4">🚨 Cars with Missing Slugs</h2>
            <p className="text-red-700 mb-4">These cars will cause 404 errors when accessed:</p>
            <div className="space-y-3">
              {validation.invalid.map((car) => (
                <div key={car._id} className="bg-white rounded-lg p-4 border border-red-200">
                  <h4 className="font-semibold text-lg text-red-800">{car.title}</h4>
                  <p className="text-sm text-red-600">ID: {car._id}</p>
                  <p className="text-sm text-red-600">Status: {car.status}</p>
                  <p className="text-sm text-red-600">Created: {new Date(car._createdAt).toLocaleString()}</p>
                  <p className="text-sm text-red-600">Images: {car.imageCount} images</p>
                  <div className="mt-2 p-2 bg-red-100 rounded text-sm text-red-800">
                    <strong>Fix:</strong> Go to Sanity Studio → Cars → "{car.title}" → Click "Generate" next to the Slug field
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {validation?.duplicates && validation.duplicates.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
            <h2 className="text-amber-800 font-semibold text-xl mb-4">⚠️ Duplicate Slugs</h2>
            <p className="text-amber-700 mb-4">These cars have the same slug and will conflict:</p>
            <div className="space-y-4">
              {validation.duplicates.map((duplicate, i) => (
                <div key={i} className="bg-white rounded-lg p-4 border border-amber-200">
                  <h4 className="font-semibold text-lg text-amber-800">Slug: "{duplicate.slug}"</h4>
                  <div className="mt-2 space-y-2">
                    {duplicate.cars.map((car) => (
                      <div key={car._id} className="pl-4 border-l-2 border-amber-300">
                        <p className="font-medium">{car.title}</p>
                        <p className="text-sm text-amber-600">ID: {car._id}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📋 All Cars ({cars.length} total)</h2>
          
          {cars.length === 0 ? (
            <p className="text-gray-600">No cars found in Sanity database.</p>
          ) : (
            <div className="space-y-4">
              {cars.map((car) => (
                <div key={car._id} className={`rounded-lg p-4 border ${
                  !car.slug ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{car.title}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Slug:</span>
                          <span className={car.slug ? 'text-green-600' : 'text-red-600 font-semibold'}>
                            {car.slug || 'MISSING!'}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium">Status:</span> {car.status}
                        </div>
                        <div>
                          <span className="font-medium">Images:</span> {car.imageCount}
                          {car.images && car.images.length > 0 && (
                            <details className="mt-1">
                              <summary className="text-xs text-blue-600 cursor-pointer">View image data</summary>
                              <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-auto max-h-32">
                                {JSON.stringify(car.images[0], null, 2)}
                              </pre>
                            </details>
                          )}
                        </div>
                        <div>
                          <span className="font-medium">Created:</span> {new Date(car._createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      {car.slug && (
                        <a 
                          href={`/cars/${car.slug}`}
                          className="inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                          target="_blank"
                        >
                          View Page →
                        </a>
                      )}
                      <a 
                        href={`https://hivemotorsltd.sanity.studio/structure/car;${car._id}`}
                        className="inline-block px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
                        target="_blank"
                      >
                        Edit in Studio
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-blue-800 font-semibold mb-2">💡 How to Fix 404 Errors:</h3>
          <ol className="list-decimal list-inside space-y-1 text-blue-700 text-sm">
            <li>Go to your Sanity Studio</li>
            <li>Find the car with missing slug (marked in red above)</li>
            <li>Click on the car to edit it</li>
            <li>Find the "Slug" field and click the "Generate" button</li>
            <li>Save the document</li>
            <li>The car page should now work properly</li>
          </ol>
        </div>
      </div>
    </div>
  );
}