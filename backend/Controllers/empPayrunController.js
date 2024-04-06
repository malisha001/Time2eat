const EmpPayrun = require('../models/empPayrunModel')
const EmployeeSal = require('../models/employeeSalaryModel')
const EmpLeave = require('../models/empLeaves')
const EmpmonthlySal = require('../models/empMonthlySal')
const mongoose = require('mongoose')

//get all employee payrun
const getEmpPayrun = async(req,res) => {
    const payrun = await EmpPayrun.find({})

    res.status(200).json(payrun)
    
}
//create employee payrun
const createEmpPayrun = async(req,res) => {
    const {category,rate,runPeriod} = req.body

    try {
        const payrun = await EmpPayrun.create({category,rate,runPeriod})
        res.status(201).json(payrun)

    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

//update employee payrun
const updateEmpPayrun = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid ID' });
    }

    const payrun = await EmpPayrun.findOneAndUpdate({ _id: id }, { ...req.body });

    if (!payrun) {
        return res.status(404).json({ error: 'No such payrun' }); // Changed error message
    }

    res.status(200).json(payrun);
};
//monthly salary process
const monthlySalProcess = async(req,res) => {
    // const currentDate = new Date();
    // const currentMonth = currentDate.getMonth()
    // const currentYear = currentDate.getFullYear()
    // const currentDay = currentDate.getDate()

    try {
        //fetch all payrun data
        const allpayrun = await EmpPayrun.find({});

        //assign value for tax, bonus, ETF
        let tax, bonus, ETF;
        for (const payrun of allpayrun) {
            if (payrun.category === 'tax') {
                tax = payrun.rate;

            } else if (payrun.category === 'bonus') {
                bonus = payrun.rate;

            } else if (payrun.category === 'ETFEPF') {
                ETF = payrun.rate;

            } else {
                console.log('No such category');
            }
        }

        //fetch all employee salaries
        const employeeSalaries = await EmployeeSal.find({})
        res.status(200).json(employeeSalaries)

        //iterate through all employeee salaries
        let oneSalary, empId, resId, basicEmpSalary;
        for(const sal of employeeSalaries){
            oneSalary = sal.basicEmpSalary
            empId = sal.empId
            resId = sal.resId
            basicEmpSalary = sal.basicEmpSalary
            
            try {
                const ttax = tax/100*oneSalary
                const etf = ETF/100*oneSalary
                const Fsalary = bonus+oneSalary-ttax-etf;
                console.log('salary:', Fsalary)
                // const Fsalary = oneSalary+tax
                // const empmonthlySal = await EmpmonthlySal.create({empId,resId,basicEmpSalary,taxRate,Fsalary})    
            } catch (error) {
                console.error('Error processing payruns:', error);
            }
        }
    }
    catch (error) {
        console.error('Error processing payruns:', error);
    }
}

module.exports = {
    getEmpPayrun,
    createEmpPayrun,
    updateEmpPayrun,
    monthlySalProcess
}