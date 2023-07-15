import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

const PDFViewer = () => {
  const domain = process.env.REACT_APP_API_URL;
  const url = `${domain}/example.pdf`;
  const [pdfBytes, setPdfBytes] = useState(null);
  const [pdfView, setPdfView] = useState(null);


  const loadPDF = async () => {
    const response = await fetch(url);

    const clonedResponse = response.clone();
    const blob = await response.blob();
    setPdfView(URL.createObjectURL(blob));

    const arrayBuffer = await clonedResponse.arrayBuffer();
    setPdfBytes(arrayBuffer);
  };

  const savePDF = async () => {
    if (!pdfBytes) {
      console.error('No PDF data available');
      return;
    }

    try {
      const existingPDF = await PDFDocument.load(pdfBytes);
      // Modify the existing PDF document as needed using pdf-lib

      // Save the modified PDF as a new ArrayBuffer
      const modifiedPDFBytes = await existingPDF.save();

      console.log(modifiedPDFBytes)
      // Send the modified PDF data to the server for saving
      await fetch(url, {
        method: 'PUT',
        headers: { 'Content-type':'application/pdf'},
        body: modifiedPDFBytes,
      });

      console.log('PDF saved successfully');
    } catch (error) {
      console.error('Error saving PDF:', error);
    }
  };

  return (
    <div>
      <button onClick={loadPDF}>Load PDF</button>
      <button onClick={savePDF}>Save PDF</button>
      <div>
        {pdfBytes && (
          <embed
            src={pdfView}
            type="application/pdf"
            width="100%"
            height="500px"
          />
        )}
      </div>
    </div>
  );
};

export default PDFViewer;