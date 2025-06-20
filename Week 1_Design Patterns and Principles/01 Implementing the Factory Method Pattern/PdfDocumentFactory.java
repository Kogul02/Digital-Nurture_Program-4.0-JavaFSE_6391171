package com.example.factorymethod;

public class PdfDocumentFactory extends DocumentFactory {
	
	public document createDocument() {
        return new pdfDocument();
    }

}
