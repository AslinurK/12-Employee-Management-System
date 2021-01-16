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

  // View All employees
  function employeeList(){
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      start()
    })
  }

 // View By Role
function viewByRoles() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
    function(err, res) {
        if (err) throw err
        console.table(res)
        start()
    })
  }
  // View By Department
  function viewByDepartments() {
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      start()
    })
  }
  //================= Select Role Quieries Role Title for Add Employee Prompt ===========//
var roleArr = [];
function selectRole() {
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }

  })
  return roleArr;
}
//================= Select Role Quieries The Managers for Add Employee Prompt ===========//
var managersArr = [];
function selectManager() {
  connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managersArr.push(res[i].first_name);
    }

  })
  return managersArr;
}
// New Employee 
function addEmployee() { 
    inquirer.prompt([
        {
          name: "firstname",
          type: "input",
          message: "Enter their first name "
        },
        {
          name: "lastname",
          type: "input",
          message: "Enter their last name "
        },
        {
          name: "role",
          type: "list",
          message: "What is their role? ",
          choices: selectRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "Whats their managers name?",
            choices: selectManager()
        }
    ]).then(function (val) {
      var roleId = selectRole().indexOf(val.role) + 1
      var managerId = selectManager().indexOf(val.choice) + 1
      connection.query("INSERT INTO employee SET ?", 
      {
          first_name: JSON.stringify(val.firstname),
          last_name: JSON.stringify(val.lastname),
          manager_id: managerId,
          role_id: roleId
          
      }, function(err){
          if (err) throw err
          console.table(val)
          start()
      })

  })
}
  // Update Employee 
  function updateEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Which employee would you like to update?",
          name: "eeUpdate"
        },
  
        {
          type: "input",
          message: "What do you want to update to?",
          name: "updateRole"
        }
      ])
      .then(function(answer) {
        // let query = `INSERT INTO department (name) VALUES ("${answer.deptName}")`
        //let query = `'UPDATE employee SET role_id=${answer.updateRole} WHERE first_name= ${answer.eeUpdate}`;
        //console.log(query);
  
        connection.query('UPDATE employee SET role_id=? WHERE first_name= ?',[answer.updateRole, answer.eeUpdate],function(err, res) {
          if (err) throw err;
          console.table(res);
          start();
        });
      });
  }
// Add Employee Role
function addRole() { 
  connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role",   function(err, res) {
    inquirer.prompt([
        {
          name: "Title",
          type: "input",
          message: "What is the roles Title?"
        },
        {
          name: "Salary",
          type: "input",
          message: "What is the Salary?"

        } 
    ]).then(function(res) {
        connection.query(
            "INSERT INTO role SET ?",
            {
              title: res.Title,
              salary: res.Salary,
            },
            function(err) {
                if (err) throw err
                console.table(res);
                start();
            }
        )

    });
  });
  }
// Add Department 
function addDepartment() { 

    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What Department would you like to add?"
        }
    ]).then(function(res) {
        connection.query(
            "INSERT INTO department SET ? ",
            {
              name: res.name
            
            },
            function(err) {
                if (err) throw err
                console.table(res);
                start();
            }
        )
    })
  }