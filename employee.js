module.exports = {

    // View all employees
    employeeList: function(){
        connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
        function(err, res) {
          if (err) throw err
          console.table(res)
          start()
        })
      } ,

    // View employees by role
    viewByRoles: function() {
        connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
        function(err, res) {
            if (err) throw err
            console.table(res)
            start()
        })
    },

    // View employees by department
   viewByDepartments: function() {
        connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
        function(err, res) {
            if (err) throw err
            console.table(res)
            startPrompt()
        })
    }
}