PS C:\Darslar\49-dars> mysql -u root -p
Enter password: ********
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 26
Server version: 8.4.0 MySQL Community Server - GPL

Copyright (c) 2000, 2024, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> CREATE DATABASE automobile;
Query OK, 1 row affected (0.01 sec)

mysql> use automobile;
Database changed
mysql> SHOW TABLES;
Empty set (0.00 sec)

mysql> CREATE TABLE price (
    -> ID int NOT NULL AUTO_INCREMENT, 
    ->  name VARCHAR(32) NOT NULL,
    -> mileage MEDIUMINT UNSIGNED NOT NULL,
    -> price INT UNSIGNED,
    ->  PRIMARY KEY (ID)                   
    -> );           
Query OK, 0 rows affected (0.05 sec)

mysql> INSERT INTO price VALUES("0","BMW",152000,16000);
ERROR 1136 (21S01): Column count doesn't match value count at row 1

mysql> SELECT * FROM price;     
+----+------+---------+-------+
| ID | name | mileage | price |
+----+------+---------+-------+
|  1 | BMW  |  152000 | 16000 |
+----+------+---------+-------+

ALTER TABLE about;
MODIFY COLUMN about BIGINT;