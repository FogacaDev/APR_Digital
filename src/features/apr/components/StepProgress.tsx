import { Progress } from "@/lib/ui/progress";

export interface StepProgressProps {
  current: number;
  total: number;
  label?: string | undefined;
}

export function StepProgress({ current, total, label }: StepProgressProps) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">
          Etapa {current} de {total}
        </span>
        {label && <span className="text-muted-foreground">{label}</span>}
      </div>
      <Progress value={pct} />
    </div>
  );
}
