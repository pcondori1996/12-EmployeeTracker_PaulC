const fs = require('fs');
const express =
 require('express');
const inquirer = require('inquirer');

const mysqlP = require('mysql2/promise');
const mysql = require('mysql2');
const { connect } = require('http2');
// const { addADepart, addARole, addAEmploy, UpdateEmpRole, } = require('./addToTables');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'paulosql123',
    database: 'allData_db'
  }
);

// db.connect(() => {
//   OwnerInputs();
// })


//VIEW TABLES FUNCTIONS
function viewDepart() {
    const sql = `SELECT * FROM department`
    db.query(sql, (err, data) => {
      console.log('');
      console.table(data);
    });
    OwnerInputs();
}

function viewRole() {
  const sql = `SELECT * FROM role`
  db.query(sql, (err, data) => {
    console.log('');
  console.table(data);
  });
  OwnerInputs();
}

function viewEmploy() {
  const sql = `SELECT * FROM employees`
db.query(sql, (err, data) => {
    console.log('');
  console.table(data);
  })
  OwnerInputs(); 
}




const OwnerInputs = () => {
   inquirer.prompt([
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'options',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'DONE']
    }
]).then(response => {

    if (response.options === 'View all departments') {
      viewDepart();
        }

    if (response.options === 'View all roles') {
      viewRole();
    }

    if (response.options === 'View all employees') {
      viewEmploy();
    }

    if (response.options === 'Add a department') {
      addADepart();
    }

    if (response.options === 'Add a role') {
      addARole();
    }

    if (response.options === 'Add an employee') {
      addAEmploy();
  
    }

    // if (response.options === 'Update an employee role') {
    //   UpdateEmpRole();
    // }

    if (response.options === 'DONE') {
      console.log('Thank you! Have a great day!')
    }})
};



function addADepart() {
  inquirer.prompt([
      {
          type: 'input',
          message: 'Enter the name of new department:',
          name: 'departID',
      },
  ]).then(responses => {
      const DtParams = [responses.departID];
      console.log(DtParams);
      db.query("INSERT INTO department (name) VALUES?", DtParams, 
      (error , results) => {
        console.log(results)
        if (error) {
          console.log('Error');
        }}
      )})
  OwnerInputs();
}

function addARole() {
  inquirer.prompt([
      {
          type: 'input',
          message: 'Enter the title of the role:',
          name: 'titleName',
      },
      {
          type: 'input',
          message: 'Enter the salary:',
          name: 'salary',
      },
      {
          type: 'input',
          message: 'Enter the department for the role:',
          name: 'departForRole',
      },
  ]).then(responses => {
    const ReParams = [responses.titleName, responses.salary, responses.departForRole];
    console.log(ReParams); 
    db.query("INSERT INTO department(title, salary, department_id) VALUES?", ReParams,
      (error , results) => {
        console.log(results)
        if (error) {
          console.log('Error');
        }} 
      )})
  }
  

function addAEmploy() {
  inquirer.prompt([
      {
          type: 'input',
          message: 'First name:',
          name: 'firstName',
      },
      {
          type: 'input',
          message: 'Last name:',
          name: 'lastName',
      },
      {
          type: 'input',
          message: 'role ID:',
          name: 'roleID',
      },
      {
          type: 'input',
          message: 'If they have a manager, type their ID. If not press Enter:',
          name: 'managerOfE',
      },
  ]).then(responses => {
    //back tik inset $ 
      // const EyParams = [responses.firstName, responses.lastName, responses.roleID, responses.managerOfE];
      // console.log(EyParams);
      db.query('INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ?', [responses.firstName, responses.lastName, responses.roleID, responses.managerOfE],
      (error , results) => {
        console.log(results)
        if (error) {
          console.log('Error');
        }}
     )})  
  }



// function UpdateEmpRole() {
//     db.query(
//       'SELECT id, first_name, last_name FROM employees',
//       function(error, res) {
//         if(error) {
//           throw error;
//         }
//         let employeeInfo = res.map((SelectedInfo) => {
//               return {
//                   name: SelectedInfo.first_name,
//                   value: SelectedInfo.last_name
//               }
//         })
//         console.log(employeeInfo)

//         connect.query(
//           'SELECT id,  title FROM role',
//           function(err, role) {
//             if (err) {
//               throw err
//             }
//           let roleVals = role.map((roleData) => {
//             return {
//               name: roleData.title,
//               value: roleData.id 
//             }
//           })
          


//           }
//         )
      
//       })


  // inquirer.prompt([
  //     {
  //         type: 'input',
  //         message: 'Who do you want to make changes for? Enter ID:',
  //         name: 'idOfEmp',
  //     },
  //     {
  //         type: 'input',
  //         message: 'New ID of rol:',
  //         name: 'idOfRole',
  //     },
  // ]).then(responses => {
  //     const sql = `UPDATE employee SET role_id = ? WHERE id ?`;
  //     const params = [responses.idOfRole, responses.idOfEmp];
  //     db.query(sql, params, (err, result) => {
  //         if (err) {
  //             console.log('Error')
  //         }
  //         if (result) {
  //             console.log('Updates have been made')
  //         }
  //     })

  // })


// }




OwnerInputs();