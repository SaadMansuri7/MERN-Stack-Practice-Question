### The SQL JOIN
A `JOIN` clause is used to combine rows from two or more tables, based on a related column between them.

Notice that the `CustomerID` column in the "Orders" table refers to the "CustomerID" in the "Customers" table. The relationship between the two tables above is the `CustomerID` column.

### Different Types of SQL JOINs
Here are the different types of the JOINs in SQL:
(INNER) JOIN: Returns records that have matching values in both tables
LEFT (OUTER) JOIN: Returns all records from the left table, and the matched records from the right table
RIGHT (OUTER) JOIN: Returns all records from the right table, and the matched records from the left table
FULL (OUTER) JOIN: Returns all records when there is a match in either left or right table

### Syntax
```sql
SELECT table1.colName, table2.colName, ... 
FROM table1 INNER JOIN table2
ON table1.matchingCol = table2.matchingCol;
```  

### Example: 
Then, we can create the following SQL statement (that contains an `INNER JOIN`), that selects records that have matching values in both tables:

```sql
SELECT Customers.CustomerID, Customers.CustomerName, Customers.City, Customers.PostalCode, orders.OrderID, orders.OrderDate
FROM Customers INNER JOIN Orders
ON Customers.CustomerID=orders.CustomerID;
```

### Output: 
![alt text](InnerJoin.png)



### Joining 3 Tables: Custormers, Orders and Shippers:
```sql
SELECT TOP 5 Customers.CustomerID, Customers.CustomerName, Customers.City, Customers.PostalCode, orders.OrderID, orders.OrderDate, orders.ShipperID, Shippers.ShipperName, Shippers.Phone
FROM Customers INNER JOIN Orders
ON Customers.CustomerID=orders.CustomerID
INNER JOIN Shippers ON orders.ShipperID=Shippers.ShipperID;
```

### Output: 
![alt text](./OutputImages/InnerJoin3.png)

--------

SELECT Customers.CustomerID, Customers.CustomerName, Customers.City, Orders.OrderID, Orders.OrderDate
FROM Customers LEFT JOIN Orders
ON Customers.CustomerID=Orders.CustomerID;
