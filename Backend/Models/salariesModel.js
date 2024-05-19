const mongoose = require('mongoose');

// Dashboard schema
const salarySchema = new mongoose.Schema({
    id: { type: Number, required: true },
    work_year: { type: Number, required: true },
    experience_level: { type: String, required: true },
    employment_type: { type: String, required: true },
    job_title: { type: String, required: true },
    salary: { type: Number, required: true },
    salary_currency: { type: String, required: true },
    salary_in_usd: { type: Number, required: true },
    employee_residence: { type: String, required: true },
    remote_ratio: { type: Number, required: true },
    company_location: { type: String, required: true },
    company_size: { type: String, required: true }
});

const salarydata = mongoose.model('salarydata', salarySchema);

module.exports = salarydata;
