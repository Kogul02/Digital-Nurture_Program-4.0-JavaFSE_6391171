package com.example.factorymethod;

public class pdfDocument implements document{
	
	public void open() 
	{
        System.out.println("Opening a PDF document.");
    }

}
