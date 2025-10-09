// MANUS: Implementación solicitada
// Skip to Content Link für Tastaturnutzer (Barrierefreiheit)

export default function SkipToContentLink() {
  return (
    <a
      href="#main"
      className="
        sr-only focus:not-sr-only
        fixed top-3 left-3 z-50
        rounded-md px-3 py-2
        bg-black/80 text-white
        focus:outline-none focus:ring focus:ring-offset-2
      "
      tabIndex={0}
    >
      Zum Inhalt springen
    </a>
  );
}

