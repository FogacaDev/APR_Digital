import { useState } from "react";
import { PrivacyNotice } from "@/features/apr/legal/PrivacyNotice";

export function Footer() {
  const ano = new Date().getFullYear();
  const [mostrarAviso, setMostrarAviso] = useState(false);

  return (
    <>
      <footer className="py-3 text-center text-xs text-muted-foreground">
        &copy; {ano} Renan Fogaça &middot; APR Digital v1.0 &middot;{" "}
        <button
          type="button"
          onClick={() => setMostrarAviso(true)}
          className="underline-offset-2 hover:underline hover:text-foreground transition"
        >
          Privacidade
        </button>
      </footer>
      <PrivacyNotice open={mostrarAviso} onOpenChange={setMostrarAviso} />
    </>
  );
}
