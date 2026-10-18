import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@/lib/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/lib/ui/card";
import { useAprForm } from "@/features/apr/hooks/useAprForm";
import { AprDocument } from "@/features/apr/pdf/AprDocument";
import { Download, FileText } from "lucide-react";

export function PDFPreviewPage() {
  const { draft } = useAprForm();

  if (!draft) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          Carregando...
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Preview do PDF
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Rota temporaria de debug (sera removida no Bloco 5.6)
            </p>
          </div>
          <PDFDownloadLink
            document={<AprDocument draft={draft} />}
            fileName={`apr-debug-${draft.id.slice(0, 8)}.pdf`}
          >
            {({ loading }) => (
              <Button variant="outline" size="sm" disabled={loading}>
                <Download className="h-4 w-4" />
                {loading ? "Gerando..." : "Baixar"}
              </Button>
            )}
          </PDFDownloadLink>
        </CardHeader>
        <CardContent className="p-0">
          <div style={{ width: "100%", height: "80vh" }}>
            <PDFViewer width="100%" height="100%" showToolbar>
              <AprDocument draft={draft} />
            </PDFViewer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
