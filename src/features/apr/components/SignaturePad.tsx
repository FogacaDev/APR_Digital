import { useEffect, useRef, useState } from "react";
import SignaturePadLib from "signature_pad";
import { Button } from "@/lib/ui/button";
import { Eraser, Check, PenLine } from "lucide-react";

export interface SignaturePadProps {
  value: string | null;
  onChange: (dataUrl: string | null) => void;
}

export function SignaturePad({ value, onChange }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const padRef = useRef<SignaturePadLib | null>(null);
  const [temDesenho, setTemDesenho] = useState(false);
  const [modo, setModo] = useState<"view" | "draw">(value ? "view" : "draw");

  useEffect(() => {
    if (modo !== "draw" || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    canvas.getContext("2d")?.scale(ratio, ratio);

    padRef.current = new SignaturePadLib(canvas, {
      backgroundColor: "rgba(255,255,255,0)",
      penColor: "#111827",
      minWidth: 0.8,
      maxWidth: 2.5,
    });

    if (value) {
      padRef.current.fromDataURL(value);
      setTemDesenho(true);
    }

    padRef.current.addEventListener("endStroke", () => {
      setTemDesenho(true);
    });

    const handleResize = () => {
      const r = canvas.getBoundingClientRect();
      const r2 = Math.max(window.devicePixelRatio || 1, 1);
      const data = padRef.current?.toData();
      canvas.width = r.width * r2;
      canvas.height = r.height * r2;
      canvas.getContext("2d")?.scale(r2, r2);
      if (data && data.length > 0) {
        padRef.current?.fromData(data);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      padRef.current?.off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modo]);

  const limpar = () => {
    padRef.current?.clear();
    setTemDesenho(false);
    onChange(null);
  };

  const salvar = () => {
    if (!padRef.current || padRef.current.isEmpty()) {
      onChange(null);
      return;
    }
    const dataUrl = padRef.current.toDataURL("image/png");
    onChange(dataUrl);
    setModo("view");
  };

  const refazer = () => {
    onChange(null);
    setTemDesenho(false);
    setModo("draw");
  };

  if (modo === "view" && value) {
    return (
      <div className="space-y-2">
        <div className="rounded-lg border-2 border-border bg-white p-3 flex items-center justify-center">
          <img
            src={value}
            alt="Assinatura"
            className="max-h-32 max-w-full object-contain"
          />
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="sm" onClick={refazer}>
            <PenLine className="h-4 w-4" />
            Refazer
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={limpar}>
            <Eraser className="h-4 w-4" />
            Remover
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="rounded-lg border-2 border-dashed border-primary/40 bg-white overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full touch-none"
          style={{ height: 180, display: "block" }}
        />
      </div>
      {!temDesenho && (
        <p className="text-xs text-muted-foreground text-center">
          Assine no quadro acima com o dedo, mouse ou caneta
        </p>
      )}
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          onClick={salvar}
          disabled={!temDesenho}
        >
          <Check className="h-4 w-4" />
          Salvar assinatura
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={limpar}
          disabled={!temDesenho}
        >
          <Eraser className="h-4 w-4" />
          Limpar
        </Button>
      </div>
    </div>
  );
}
