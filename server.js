var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "employee_trackerDB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

function start() {
    inquirer
      .prompt({

        type: "list" ,
        message : "Hey! What would you like to do today?",
        name:"choice",
        choices:
        [
          "View All Employees?",
          "View All Employees based on Roles?",
          "View All Employees based on Department?",
          "New Employee?",
          "Update Employee?",
          "Add New Department?",
          "Add New Role?"
        ]

      })
      .then(function(answer) {


        switch(answer.choice){
          case "View All Employees?":
            employeeList();
          break;
          case "View All Employees based on Roles?":
              viewByRoles();
            break;
          case "View All Employees based on Department?":
              viewByDepartments();
            break;
          
          case "New Employee?":
                addEmployee();
              break;

          case "Update Employee?":
                updateEmployee();
              break;
      
            case "Add New Role?":
                addRole();
              break;
      
            case "Add New Department?":
                addDepartment();
              break;
        }
 
      });
  }

  // View All Employee function

  function employeeList(){
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
    function(err, res) {
    if (err) throw err
    console.table(res)
    start()
    })
  }