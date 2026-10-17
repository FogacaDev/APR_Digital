export default function App() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center gap-6 p-8 bg-background text-foreground">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold tracking-tight text-primary">
          APR Digital
        </h1>
        <p className="text-lg text-muted-foreground">
          Gerenciamento de Risco Crítico
        </p>
        <p className="text-sm text-muted-foreground">
          Bloco 1 — setup concluído ✅
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition">
          Botão primário
        </button>
        <button className="px-4 py-2 rounded-md border border-border bg-card text-card-foreground font-medium hover:bg-muted transition">
          Botão secundário
        </button>
        <button className="px-4 py-2 rounded-md bg-destructive text-destructive-foreground font-medium hover:opacity-90 transition">
          Destrutivo
        </button>
      </div>

      <p className="text-xs text-muted-foreground max-w-md text-center">
        Se você está vendo esta página com cores aplicadas (azul, cinza,
        vermelho), o Tailwind + tokens de tema estão funcionando.
      </p>
    </main>
  );
}
