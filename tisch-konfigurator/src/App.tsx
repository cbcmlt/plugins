// Wurzelkomponente: Seitenlayout mit Kopfzeile und Konfigurator.

import { Konfigurator } from './components/Konfigurator';

export function App() {
  return (
    <div className="mx-auto flex min-h-full max-w-5xl flex-col gap-8 px-4 py-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Tisch-Konfigurator</h1>
        <p className="text-sm text-muted-foreground">
          Maße, Material, Gestell und Kante wählen — der Preis wird live berechnet.
        </p>
      </header>

      <main>
        <Konfigurator />
      </main>

      <footer className="mt-auto pt-4 text-xs text-muted-foreground">
        Alle Preise netto, zzgl. USt. Unverbindliche Kalkulation. Datenklassifizierung: C0.
      </footer>
    </div>
  );
}
