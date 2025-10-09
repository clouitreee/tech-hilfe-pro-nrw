// MANUS: Implementación solicitada - Debug page para smoke test de CSS
export default function VisibilityDebugPage() {
  return (
    <main className="p-6 min-h-screen bg-white">
      <h1 className="text-3xl font-bold text-black mb-6">Visibility Smoke Test</h1>
      
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <div className="h-24 bg-neutral-200 rounded flex items-center justify-center">
          <span className="text-black font-semibold">Box 1</span>
        </div>
        <div className="h-24 bg-neutral-300 rounded flex items-center justify-center">
          <span className="text-black font-semibold">Box 2</span>
        </div>
        <div className="h-24 bg-neutral-400 rounded flex items-center justify-center">
          <span className="text-white font-semibold">Box 3</span>
        </div>
      </div>
      
      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold text-black mb-4">Test Results</h2>
        <p className="text-black mb-4">
          <strong>✅ Si ves las 3 cajas y este texto:</strong> Tu CSS y z-index funcionan correctamente.
        </p>
        <p className="text-black mb-4">
          <strong>❌ Si NO ves las cajas o este texto:</strong> Hay un problema con:
        </p>
        <ul className="text-black list-disc pl-6 mb-4">
          <li>CSS global con display:none o opacity:0</li>
          <li>Z-index / Stacking context problem</li>
          <li>Overlay bloqueando el contenido</li>
        </ul>
        
        <h2 className="text-2xl font-bold text-black mb-4 mt-8">Additional Tests</h2>
        
        <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-4 mb-4">
          <h3 className="text-xl font-semibold text-blue-900 mb-2">Test 1: Basic Visibility</h3>
          <p className="text-blue-800">Este div tiene clases de Tailwind normales. Si lo ves, Tailwind funciona.</p>
        </div>
        
        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 mb-4" data-animate>
          <h3 className="text-xl font-semibold text-green-900 mb-2">Test 2: data-animate Attribute</h3>
          <p className="text-green-800">Este div tiene data-animate. Si lo ves, tu CSS no-JS no lo oculta.</p>
        </div>
        
        <div className="bg-yellow-50 border-2 border-yellow-500 rounded-lg p-4 mb-4 motion-safe">
          <h3 className="text-xl font-semibold text-yellow-900 mb-2">Test 3: motion-safe Class</h3>
          <p className="text-yellow-800">Este div tiene .motion-safe. Si lo ves, tu CSS no-JS no lo oculta.</p>
        </div>
        
        <div className="bg-purple-50 border-2 border-purple-500 rounded-lg p-4 mb-4 motion-start">
          <h3 className="text-xl font-semibold text-purple-900 mb-2">Test 4: motion-start Class</h3>
          <p className="text-purple-800">Este div tiene .motion-start. Si lo ves, tu CSS no-JS no lo oculta.</p>
        </div>
        
        <h2 className="text-2xl font-bold text-black mb-4 mt-8">Console Commands</h2>
        <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm mb-4">
          <p className="mb-2">{'// Check opacity of all main elements'}</p>
          <p className="mb-4">{'[...document.querySelectorAll(\'main,section,header,footer\')].map(n => getComputedStyle(n).opacity)'}</p>
          
          <p className="mb-2">{'// Check if .js class is present'}</p>
          <p className="mb-4">{'document.documentElement.classList.contains(\'js\')'}</p>
          
          <p className="mb-2">{'// Check computed styles of main'}</p>
          <p>{'getComputedStyle(document.querySelector(\'main\'))'}</p>
        </div>
        
        <h2 className="text-2xl font-bold text-black mb-4 mt-8">URL Parameters</h2>
        <ul className="text-black list-disc pl-6">
          <li><strong>?noanim</strong> - Desactiva todas las animaciones vía CSS</li>
          <li><strong>NEXT_PUBLIC_DISABLE_ANIMATIONS=true</strong> - Desactiva Motion components (env var)</li>
        </ul>
      </div>
    </main>
  );
}

