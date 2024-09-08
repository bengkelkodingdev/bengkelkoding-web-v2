// PDFView.tsx

import React from "react";

interface PdfViewerProps {
  fileUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl }) => {
  return (
    <div className="h-96">
      <embed
        src={fileUrl}
        type="application/pdf"
        className="w-full h-full p-2 rounded-xl"
      />
    </div>
  );
};

export default PdfViewer;
