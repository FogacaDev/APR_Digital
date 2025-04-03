
// Função para gerar o PDF
function gerarPDF() {
    // Configuração para capturar a página inteira
    const element = document.body;
    const options = {
        scale: 1,
        useCORS: true,
        logging: true,
        scrollX: 0,
        scrollY: 0,
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight
    };

    // Primeiro mostrar um alerta para informar que o processo começou
    alert("Iniciando a geração do PDF. Pode levar alguns segundos...");

    // Captura a página com html2canvas
    html2canvas(element, options).then(function (canvas) {
        // Captura a imagem da tela
        const imgData = canvas.toDataURL('image/png');

        // Cria o documento PDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');

        // Calcula a largura do PDF e a largura da imagem capturada
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        // Ajusta a imagem para a largura da página A4
        const ratio = pdfWidth / imgWidth;
        const imgX = 0; // Alinha a imagem à esquerda

        // Calcula a nova altura da imagem para manter a proporção
        const imgAdjustedHeight = imgHeight * ratio;

        // Adiciona a imagem ao PDF ajustada à largura da página
        pdf.addImage(imgData, 'PNG', imgX, 5, imgWidth * ratio, imgHeight * ratio);


        // Verifica se a imagem é maior do que uma página A4 e cria novas páginas
        let heightLeft = imgAdjustedHeight - pdfHeight;
        let position = -pdfHeight; // Posição para a próxima página

        // Adiciona mais páginas se necessário
        while (heightLeft > 0) {
            position = position - pdfHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', imgX, position, pdfWidth, imgAdjustedHeight);
            heightLeft -= pdfHeight;
        }

        // Salva o PDF
        pdf.save("APR_Digital.pdf");
    }).catch(function (error) {
        console.error("Erro na geração do PDF:", error);
        alert("Ocorreu um erro ao gerar o PDF: " + error);
    });
}

