// MANUS: Implementación solicitada - Anker auf #main vereinheitlicht
export default function SkipLink() {
  return (
    <a
      href="#main"
      className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:shadow-lg"
      tabIndex={0}
    >
      Zum Inhalt springen
    </a>
  );
}
