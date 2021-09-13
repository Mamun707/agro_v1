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

        console.log(data)

        data.map(item=>{

            let totalDebit=(item.total?item.total.find(item=>item.type==="inward"):0)
            let totalCredit=(item.total?item.total.find(item=>item.type==="inward"):0)

           

            let body={
                "category":item._id,
                "totalCredit":totalCredit.value,
                "totalDebit":totalDebit.value,
                "totlProfit": (totalCredit.value-totalDebit.value)
            }
            finalOutput.push(body)
        })



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