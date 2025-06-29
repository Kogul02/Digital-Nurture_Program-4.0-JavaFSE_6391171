-- Customers table
CREATE TABLE Customers (
  CustomerID NUMBER PRIMARY KEY,
  Name VARCHAR2(100),
  DOB DATE,
  Balance NUMBER,
  LastModified DATE
);


-- Accounts table
CREATE TABLE Accounts (
  AccountID NUMBER PRIMARY KEY,
  CustomerID NUMBER,
  AccountType VARCHAR2(20),
  Balance NUMBER,
  LastModified DATE,
  FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

-- Transactions table
CREATE TABLE Transactions (
  TransactionID NUMBER PRIMARY KEY,
  AccountID NUMBER,
  TransactionDate DATE,
  Amount NUMBER,
  TransactionType VARCHAR2(10),
  FOREIGN KEY (AccountID) REFERENCES Accounts(AccountID)
);

-- Employees table
CREATE TABLE Employees (
  EmployeeID NUMBER PRIMARY KEY,
  Name VARCHAR2(100),
  Position VARCHAR2(50),
  Salary NUMBER,
  Department VARCHAR2(50),
  HireDate DATE
);


-- Insert sample Customers
INSERT INTO Customers VALUES (101, 'Ravi Kumar', TO_DATE('1990-04-12','YYYY-MM-DD'), 70000, SYSDATE);
INSERT INTO Customers VALUES (102, 'Anita Sharma', TO_DATE('1985-11-23','YYYY-MM-DD'), 30000, SYSDATE);
INSERT INTO Customers VALUES (103, 'Karthik Reddy', TO_DATE('1992-06-05','YYYY-MM-DD'), 70000, SYSDATE);

-- Insert sample Accounts
INSERT INTO Accounts VALUES (1001, 101, 'Savings', 50000, SYSDATE);
INSERT INTO Accounts VALUES (1002, 102, 'Savings', 30000, SYSDATE);
INSERT INTO Accounts VALUES (1003, 103, 'Current', 70000, SYSDATE);
INSERT INTO Accounts VALUES (1004, 101, 'Savings', 20000, SYSDATE);

-- Insert sample Employees
INSERT INTO Employees VALUES (201, 'Suresh Iyer', 'Manager', 60000, 'Finance', TO_DATE('2015-02-15','YYYY-MM-DD'));
INSERT INTO Employees VALUES (202, 'Meena Rani', 'Analyst', 40000, 'Finance', TO_DATE('2018-06-10','YYYY-MM-DD'));
INSERT INTO Employees VALUES (203, 'Vikram Das', 'Clerk', 25000, 'HR', TO_DATE('2019-03-20','YYYY-MM-DD'));

-- Create a sequence for Transactions
CREATE SEQUENCE Transactions_seq START WITH 1;

-- Insert sample Transactions
INSERT INTO Transactions VALUES (Transactions_seq.NEXTVAL, 1001, SYSDATE, 1000, 'Credit');
INSERT INTO Transactions VALUES (Transactions_seq.NEXTVAL, 1002, SYSDATE, 500, 'Debit');
INSERT INTO Transactions VALUES (Transactions_seq.NEXTVAL, 1003, SYSDATE, 2000, 'Credit');


select *from Customers;
select *from Accounts;
select *from Transactions;
select *from Employee;

/*Scenario 1: The bank needs to process monthly interest for all savings accounts.
Question: Write a stored procedure ProcessMonthlyInterest that calculates and updates the balance of all savings accounts by applying an interest rate of 1% to the current balance.*/

CREATE OR REPLACE PROCEDURE ProcessMonthlyInterest IS
BEGIN
  UPDATE Accounts
  SET Balance = Balance + (Balance * 0.01),
      LastModified = SYSDATE
  WHERE AccountType = 'Savings';
  
  COMMIT;
END;


/*Scenario 2: The bank wants to implement a bonus scheme for employees based on their performance.
Question: Write a stored procedure UpdateEmployeeBonus that updates the salary of employees in a given department by adding a bonus percentage passed as a parameter.*/
BEGIN
  ProcessMonthlyInterest;
END;


SELECT AccountID, CustomerID, AccountType, Balance, LastModified
FROM Accounts
WHERE AccountType = 'Savings';

/*Scenario 3: Customers should be able to transfer funds between their accounts.
Question: Write a stored procedure TransferFunds that transfers a specified amount from one account to another, checking that the source account has sufficient balance before making the transfer.*/

CREATE OR REPLACE PROCEDURE UpdateEmployeeBonus (
  p_Department IN VARCHAR2,
  p_BonusPercent IN NUMBER
) IS
BEGIN
  UPDATE Employees
  SET Salary = Salary + (Salary * (p_BonusPercent / 100))
  WHERE Department = p_Department;

  COMMIT;
END;

BEGIN
UpdateEmployeeBonus('Finance', 10);
END;


SELECT EmployeeID, Name, Department, Salary
FROM Employees
WHERE Department = 'Finance';

--scenario 3

CREATE OR REPLACE PROCEDURE TransferFunds (
  p_FromAccountID IN NUMBER,
  p_ToAccountID IN NUMBER,
  p_Amount IN NUMBER
) IS
  v_Balance NUMBER;
BEGIN
  -- Check if source account has enough balance
  SELECT Balance INTO v_Balance
  FROM Accounts
  WHERE AccountID = p_FromAccountID
  FOR UPDATE;

  IF v_Balance < p_Amount THEN
    RAISE_APPLICATION_ERROR(-20001, 'Insufficient balance');
  END IF;

  -- Deduct from source account
  UPDATE Accounts
  SET Balance = Balance - p_Amount,
      LastModified = SYSDATE
  WHERE AccountID = p_FromAccountID;

  -- Credit to destination account
  UPDATE Accounts
  SET Balance = Balance + p_Amount,
      LastModified = SYSDATE
  WHERE AccountID = p_ToAccountID;

  -- Insert transactions
  INSERT INTO Transactions VALUES (
    Transactions_seq.NEXTVAL, p_FromAccountID, SYSDATE, p_Amount, 'Debit'
  );

  INSERT INTO Transactions VALUES (
    Transactions_seq.NEXTVAL, p_ToAccountID, SYSDATE, p_Amount, 'Credit'
  );

  COMMIT;
END;

BEGIN
 TransferFunds(1001, 1002, 5000);
END;

SELECT * FROM Accounts WHERE AccountID IN (1001, 1002);

SELECT * FROM Transactions WHERE AccountID IN (1001, 1002) ORDER BY TransactionDate DESC;
