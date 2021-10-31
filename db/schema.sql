USE company;

DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employee;


CREATE TABLE department(
    ID INTEGER AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (ID)
); 

CREATE TABLE roles(
    ID INTEGER AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL (10, 2),
    department_id INTEGER, 
    PRIMARY KEY (ID),
    FOREIGN KEY (department_id) references department(ID)
);

CREATE TABLE employee(
    ID INTEGER AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER ,
    manager_id INTEGER NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (role_id) references roles(ID), 
    FOREIGN KEY (manager_id) references employee(ID)
);