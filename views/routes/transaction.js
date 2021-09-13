var express = require('express');
var router = express.Router();
const {createTransaction,getAllTransactions,getReports}=require("../controllers/transactionController")

/* GET home page. */
router.get('/',getAllTransactions);
router.post('/',createTransaction);
router.get('/report',getReports);

module.exports = router;
