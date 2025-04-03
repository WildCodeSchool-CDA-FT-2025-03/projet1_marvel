export default function FooterAbout() {
  return (
    <section aria-labelledby="footer-brand">
      <h2 id="footer-brand" className="sr-only">
        À propos de Home Center
      </h2>
      <div className="flex items-center space-x-2 mb-4">
        <div
          className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center"
          role="img"
          aria-hidden="true"
        >
          <span className="text-white font-bold text-sm">HC</span>
        </div>
        <span className="text-lg font-bold">Home Center</span>
      </div>
      <p className="text-gray-300 text-sm">
        Votre bibliothèque numérique personnelle pour organiser et découvrir vos médias préférés
      </p>
    </section>
  );
}
