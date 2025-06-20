package com.example.factorymethod;

public class WordDocumentFactory extends DocumentFactory {
	
	public document createDocument() {
        return new wordDocument();
    }

}
