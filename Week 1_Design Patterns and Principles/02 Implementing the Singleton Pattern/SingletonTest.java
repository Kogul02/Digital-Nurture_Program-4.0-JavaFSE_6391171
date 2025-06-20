package com.example.singleton;

public class SingletonTest {

	public static void main(String[] args) {

		Logger logger1 = Logger.getInstance();
        Logger logger2 = Logger.getInstance();

        logger1.log("This is the first message.");
        logger2.log("This is the second message.");

        if (logger1 == logger2) 
        {
            System.out.println("Singleton confirmed: Same instance.");
        }
        else 
        {
            System.out.println("Singleton failed: Different instances.");
        }

	}

}
