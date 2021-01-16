-- DEPARTMENT SEEDS -----
INSERT INTO department (name)
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Legal");

-- EMPLOYEE ROLE SEEDS -------
INSERT INTO role (title, salary, department_id)
VALUE ("Lead Engineer", 100000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Legal Team Lead", 200000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 120000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Lead", 125000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Salesperson", 90000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Software Engineer", 350000, 2);


-- EMPLOYEE SEEDS -------
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Matt", "Dyer", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Tom", "Hanks", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Rob","Lori",null,3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jess", "Trali", 4, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Shanon", "Baydor", 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Asli", "K", 1, 6);