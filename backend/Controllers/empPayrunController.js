const EmpPayrun = require('../models/empPayrunModel')
const EmployeeSal = require('../models/employeeSalaryModel')
const EmpLeave = require('../models/empLeaves')
const EmpmonthlySal = require('../models/empMonthlySal')
const Leaves = require('../models/leavesModel')
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
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Adding 1 to match JavaScript's zero-based month indexing
    // const currentDay = currentDate.getDate()

    const { id } = req.params; // Assuming the restaurant ID is passed in the URL parameters

    try {
        //fetch all payrun data
        const allpayrun = await EmpPayrun.find({});   //this should be include restuarent id
        const leaverun = await Leaves.find({})  ////this should be include restuarent id

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
        //assign leave penalty
        let mleaves = leaverun[0].monthlyLeaves;
        let pFee = leaverun[0].panaltyFee;
        console.log('leave penalty:', mleaves)
        console.log('leave penalty fee:', pFee)

        //fetch all employee salaries
        const employeeSalaries = await EmployeeSal.find({resId: id})

        //iterate through all employeee salaries
        let oneSalary, empId, resId, basicEmpSalary,leavecount;
        for(const sal of employeeSalaries){
            oneSalary = sal.basicEmpSalary
            empId = sal.empId
            resId = sal.resId
            basicEmpSalary = sal.basicEmpSalary
            leavecount = 0;

            // Count the number of entries for the current month
            const leaves = await EmpLeave.find({
                empId: empId,
                createdAt: {
                    $gte: new Date(currentYear, currentMonth - 1, 1), // Start of the current month
                    $lt: new Date(currentYear, currentMonth, 1) // Start of the next month
                }
            });
            
            for(const count of leaves){
                let leave = count.leaveDays
                leavecount = leavecount + leave
            }
            
            
            console.log('count leaves of:',empId,':', leavecount)
            
            try {
                const taxRate = tax/100*oneSalary
                const ETFrate = ETF/100*oneSalary
                if(leavecount > mleaves){
                    const penaltyFee = (leavecount-penalty)*pFee
                    console.log('penalty for:',empId)
                }
                const Fsalary = bonus+oneSalary-taxRate-ETFrate-penaltyFee;

                const empmonthlySal = await EmpmonthlySal.create({empId,resId,basicEmpSalary,bonus,taxRate,ETFrate,Fsalary})
 
            } catch (error) {
                console.error('Error processing payruns:', error);
            }
        }
        res.status(201).json(leaves)
        
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