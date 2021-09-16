
//Transcation Model
const TransactionModel = require("../models/transaction")



// Create Transaction
const getAllTransactions =async(req, res, next)=> {
    try{
        const transaction = await TransactionModel.find().sort({createdAt:-1})
        res.send({
            status:true,
            data:{transaction}
        })

    }catch(err){
        res.send({
            status:false,
            message:err.message
        })
    }
}


// Create Transaction
const createTransaction =async(req, res, next)=> {
    try{
        const transaction = await TransactionModel.create(req.body)
        res.send({
            status:true,
            data:{transaction}
        })

    }catch(err){
        res.send({
            status:false,
            message:err.message
        })
    }
};

const getReports=async(req, res, next)=> {
    try{
        const data = await TransactionModel.aggregate([{
            $group:{
                _id:{
                    category:"$category",
                    type:"$type",
                },
                total:{
                    $sum: "$amount",
                }
            }
        },{
            $group:{
                _id:"$_id.category",
                total:{
                    $addToSet:{"value":"$total","type":"$_id.type", 
                }
                },

            }
        },{
            $project:{
                category:"$_id.category",
                total:"$total"
                
            }
        }]);;

        let finalOutput=[];

        for(let item of data){
            console.log(item)
            let totalDebit=item.total.find(item=>item.type==="outward")
            let totalCredit=item.total.find(item=>item.type==="inward");

            console.log(totalDebit,totalCredit)

            if(totalCredit===undefined){
                totalCredit={
                    value:0
                }
            }
            if(totalDebit===undefined){
                totalDebit={
                    value:0
                }
            }
           
            let body={
                "category":item._id,
                "totalCredit":totalCredit.value,
                "totalDebit":totalDebit.value,
                "totlProfit": (totalCredit.value-totalDebit.value)
            }
            finalOutput.push(body)
        }

      



        res.send({
            status:true,
            data:finalOutput
        })

    }catch(err){
        console.log(err)
        res.send({
            status:false,
            message:err.message
        })
    }
}


module.exports={
    createTransaction,
    getAllTransactions,
    getReports
}