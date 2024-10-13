// Import the Employee model
const Employee = require('../models/employee');

// @desc    Get all employees
// @route   GET /employees
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Create a new employee
// @route   POST /employees
exports.createEmployee = async (req, res) => {
    const employee = new Employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        gender: req.body.gender,
        salary: req.body.salary,
    });

    try {
        const newEmployee = await employee.save();
        res.status(201).json(newEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get a single employee
// @route   GET /employees/:id
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (employee == null) {
            return res.status(404).json({ message: 'Cannot find employee' });
        }
        res.json(employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Update an employee
// @route   PUT /employees/:id
exports.updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (employee == null) {
            return res.status(404).json({ message: 'Cannot find employee' });
        }

        // Update fields
        if (req.body.firstName != null) {
            employee.firstName = req.body.firstName;
        }
        if (req.body.lastName != null) {
            employee.lastName = req.body.lastName;
        }
        if (req.body.email != null) {
            employee.email = req.body.email;
        }
        if (req.body.gender != null) {
            employee.gender = req.body.gender;
        }
        if (req.body.salary != null) {
            employee.salary = req.body.salary;
        }

        const updatedEmployee = await employee.save();
        res.json(updatedEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Delete an employee
// @route   DELETE /employees/:id
exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (employee == null) {
            return res.status(404).json({ message: 'Cannot find employee' });
        }

        await employee.remove();
        res.json({ message: 'Employee deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new employee
exports.createEmployee = async (req, res) => {
  const employeeData = req.body; // Make sure to send correct data in the request body
  const employee = new Employee(employeeData);

  try {
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.eid);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update employee
exports.updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
    if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.eid);
    if (!deletedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.status(204).send(); // No content to send back
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
