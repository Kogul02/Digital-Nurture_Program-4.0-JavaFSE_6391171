package com.example.factorymethod;

public class ExcelDocumentFactory extends DocumentFactory {
	
	public document createDocument() {
        return new excelDocument();
    }

}
