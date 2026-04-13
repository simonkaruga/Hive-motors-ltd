import { client, urlFor } from '@/lib/sanity/client';

export default async function ImageTestPage() {
  let testData = null;
  let error = null;

  try {
    // Fetch a car with images to test
    const car = await client.fetch(`*[_type == "car" && defined(images) && count(images) > 0][0] {
      _id,
      title,
      "images": images[]{..., asset->}
    }`);

    if (car) {
      testData = {
        car,
        processedImages: car.images?.map((img: any, index: number) => {
          try {
            return {
              original: img,
              processed: urlFor(img).width(800).height(600).auto('format').quality(75).url(),
              index
            };
          } catch (e) {
            return {
              original: img,
              error: e instanceof Error ? e.message : 'Unknown error',
              index
            };
          }
        }) || []
      };
    }
  } catch (e) {
    error = e instanceof Error ? e.message : 'Unknown error';
  }

  return (
    <div className="pt-32 pb-16 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">🖼️ Image Processing Test</h1>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h2 className="text-red-800 font-semibold mb-2">Error:</h2>
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {testData ? (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h2 className="text-blue-800 font-semibold mb-2">Test Car: {testData.car.title}</h2>
              <p className="text-blue-700">ID: {testData.car._id}</p>
              <p className="text-blue-700">Images found: {testData.car.images?.length || 0}</p>
            </div>

            {testData.processedImages.map((imgData: any) => (
              <div key={imgData.index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Image {imgData.index + 1}</h3>
                
                {imgData.error ? (
                  <div className="bg-red-50 border border-red-200 rounded p-3">
                    <p className="text-red-700 font-medium">Processing Error:</p>
                    <p className="text-red-600 text-sm">{imgData.error}</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Processed URL:</p>
                      <p className="text-xs text-green-600 bg-green-50 p-2 rounded break-all">
                        {imgData.processed}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Test Image:</p>
                      <img 
                        src={imgData.processed} 
                        alt={`Test image ${imgData.index + 1}`}
                        className="w-48 h-32 object-cover rounded border"
                        onError={(e) => {
                          console.error(`Image ${imgData.index + 1} failed to load:`, imgData.processed);
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                        onLoad={() => {
                          console.log(`Image ${imgData.index + 1} loaded successfully:`, imgData.processed);
                        }}
                      />
                    </div>
                    
                    <details className="text-xs">
                      <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
                        Raw Image Data
                      </summary>
                      <pre className="mt-2 bg-gray-100 p-2 rounded text-xs overflow-auto">
                        {JSON.stringify(imgData.original, null, 2)}
                      </pre>
                    </details>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">No cars with images found in the database.</p>
          </div>
        )}
      </div>
    </div>
  );
}