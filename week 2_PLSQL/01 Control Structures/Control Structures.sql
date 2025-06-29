-- CREATING SCHEMAS

CREATE TABLE Customers (
CustomerID NUMBER PRIMARY KEY,
Name VARCHAR2(100),
DOB DATE,
Balance NUMBER,
LastModified DATE
);

CREATE TABLE Loans (
LoanID NUMBER PRIMARY KEY,
CustomerID NUMBER,
LoanAmount NUMBER,
InterestRate NUMBER,
StartDate DATE,
EndDate DATE,
FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);
 
-- INSERTING SAMPLE VALUES TO THE Customers TABLE

INSERT INTO Customers (CustomerID, Name, DOB, Balance, LastModified) VALUES 
(101, 'Ravi Kumar', TO_DATE('1950-04-15', 'YYYY-MM-DD'), 12000, SYSDATE);

INSERT INTO Customers (CustomerID, Name, DOB, Balance, LastModified) VALUES 
(102, 'Priya Sharma', TO_DATE('1985-09-30', 'YYYY-MM-DD'), 8000, SYSDATE);

INSERT INTO Customers (CustomerID, Name, DOB, Balance, LastModified) VALUES 
(103, 'Arun Mehta', TO_DATE('1962-01-10', 'YYYY-MM-DD'), 15000, SYSDATE);

INSERT INTO Customers (CustomerID, Name, DOB, Balance, LastModified) VALUES 
(104, 'Sneha Reddy', TO_DATE('1995-07-22', 'YYYY-MM-DD'), 5000, SYSDATE);


--INSERTING SAMPLE VALUES TO THE Loans TABLE

INSERT INTO Loans (LoanID, CustomerID, LoanAmount, InterestRate, StartDate, EndDate) VALUES 
(201, 101, 50000, 8.5, TO_DATE('2022-06-01', 'YYYY-MM-DD'), TO_DATE('2025-07-15', 'YYYY-MM-DD'));

INSERT INTO Loans (LoanID, CustomerID, LoanAmount, InterestRate, StartDate, EndDate) VALUES 
(202, 102, 30000, 9.0, TO_DATE('2023-01-01', 'YYYY-MM-DD'), TO_DATE('2025-07-01', 'YYYY-MM-DD'));

INSERT INTO Loans (LoanID, CustomerID, LoanAmount, InterestRate, StartDate, EndDate) VALUES 
(203, 103, 45000, 7.5, TO_DATE('2021-03-01', 'YYYY-MM-DD'), TO_DATE('2025-07-05', 'YYYY-MM-DD'));

INSERT INTO Loans (LoanID, CustomerID, LoanAmount, InterestRate, StartDate, EndDate) VALUES 
(204, 104, 20000, 10.0, TO_DATE('2024-08-01', 'YYYY-MM-DD'), TO_DATE('2026-08-01', 'YYYY-MM-DD'));

-- VIEWING THE TABLE 

select *from Customers;
select *from Loans;

/*Scenario 1: The bank wants to apply a discount to loan interest rates for customers above 60 years old.
Question: Write a PL/SQL block that loops through all customers, checks their age, and if they are above 60, apply a 1% discount to their current loan interest rates.*/

DECLARE
  v_age NUMBER;
BEGIN
  FOR rec IN (SELECT l.LoanID, l.InterestRate, c.DOB
              FROM Loans l
              JOIN Customers c ON l.CustomerID = c.CustomerID) LOOP
    v_age := FLOOR(MONTHS_BETWEEN(SYSDATE, rec.DOB) / 12);
    
    IF v_age > 60 THEN
      UPDATE Loans
      SET InterestRate = InterestRate - 1
      WHERE LoanID = rec.LoanID;
    END IF;
  END LOOP;
  
  COMMIT;
END;

select *from Loans;

/*Scenario 2: A customer can be promoted to VIP status based on their balance.
Question: Write a PL/SQL block that iterates through all customers and sets a flag IsVIP to TRUE for those with a balance over $10,000.*/


ALTER TABLE Customers ADD IsVIP VARCHAR2(5);

BEGIN
  FOR rec IN (SELECT CustomerID, Balance FROM Customers) LOOP
    IF rec.Balance > 10000 THEN
      UPDATE Customers
      SET IsVIP = 'TRUE'
      WHERE CustomerID = rec.CustomerID;
    ELSE
      UPDATE Customers
      SET IsVIP = 'FALSE'
      WHERE CustomerID = rec.CustomerID;
    END IF;
  END LOOP;

  COMMIT;
END;


/*Scenario 3: The bank wants to send reminders to customers whose loans are due within the next 30 days.
Question: Write a PL/SQL block that fetches all loans due in the next 30 days and prints a reminder message for each customer.*/

DECLARE
  v_due_date DATE := SYSDATE + 30;
BEGIN
  FOR rec IN (
    SELECT c.Name, c.CustomerID, l.LoanID, l.EndDate
    FROM Loans l
    JOIN Customers c ON l.CustomerID = c.CustomerID
    WHERE l.EndDate BETWEEN SYSDATE AND v_due_date
  ) LOOP
    DBMS_OUTPUT.PUT_LINE('Reminder: Loan ID ' || rec.LoanID || 
                         ' for customer ' || rec.Name || 
                         ' (Customer ID: ' || rec.CustomerID || 
                         ') is due on ' || TO_CHAR(rec.EndDate, 'DD-MON-YYYY'));
  END LOOP;
END;
