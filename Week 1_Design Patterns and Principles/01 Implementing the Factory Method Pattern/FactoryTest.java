package com.example.factorymethod;

public class FactoryTest {

	public static void main(String[] args) {

		DocumentFactory wordFactory = new WordDocumentFactory();
        document wordDoc = wordFactory.createDocument();
        wordDoc.open();

        DocumentFactory pdfFactory = new PdfDocumentFactory();
        document pdfDoc = pdfFactory.createDocument();
        pdfDoc.open();

        DocumentFactory excelFactory = new ExcelDocumentFactory();
        document excelDoc = excelFactory.createDocument();
        excelDoc.open();

	}

}
