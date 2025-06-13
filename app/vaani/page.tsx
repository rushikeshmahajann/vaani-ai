import Link from "next/link";
export default function VaaniPage() {
  return (
    <div className="h-[100vh] bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl tracking-tighter mb-8">
          <span className="font-editorial font-medium italic">
            Welcome to Vaani
          </span>
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-montreal font-normal mb-4">
            Voice AI Platform
          </h2>
          <p className="font-montreal text-gray-600 mb-6">
            Explore our voice AI features and start creating amazing audio
            content.
          </p>

          <Link href="/vaani/dubbing">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-montreal font-medium mb-2">
                  Voice Dubbing
                </h3>
                <p className="font-editorialold text-sm text-gray-600">
                  Create professional voice dubs for your content
                </p>
              </div>
              {/* Add more feature cards here */}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
