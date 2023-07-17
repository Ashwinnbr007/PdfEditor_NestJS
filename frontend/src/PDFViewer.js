import React, { useState } from 'react';

const PDFViewer = () => {
  const domain = process.env.REACT_APP_API_URL;
  const url = `${domain}/example.pdf`;
  let blob = null
  const [pdfBlob, setPdfBlob] = useState(null);
  const [pdfView, setPdfView] = useState(null);


  const loadPDF = async () => {
    const response = await fetch(url);
    blob = await response.blob();
    setPdfBlob(blob);
    setPdfView(URL.createObjectURL(blob));
  };

  const savePDF = async () => {
    if (!pdfBlob) {
      console.error('No PDF data available');
      return;
    }
    const _blob = pdfBlob;
    const arrayBuffer = await _blob.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    //Saving the pdf as uint8Array
    try {
        const response = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify({ pdfData: Array.from(uint8Array) }), // Send the Uint8Array as an array
          headers: {
            'Content-Type': 'application/json',
          },
        });
      if (response.ok) {
        console.log('PDF saved successfully');
      } else {
        console.error('Failed to save PDF');
      }
    } catch (error) {
      console.error('Error saving PDF:', error);
    }
  };

  return (
    <div>
      <button onClick={loadPDF}>Load PDF</button>
      <button onClick={savePDF}>Save PDF</button>
      <div>
        {pdfView && (
          <embed
            id='pdf'
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