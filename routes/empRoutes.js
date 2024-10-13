// In your routes file, e.g., empRoutes.js
const express = require('express');
const router = express.Router();
const Employee = require('../models/employee'); // Adjust path if necessary

// Delete Employee by ID
router.delete('/employees/:id', async (req, res) => {
  try {
    const employeeId = req.params.id.trim(); // Trim any whitespace from the ID
    
    const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
