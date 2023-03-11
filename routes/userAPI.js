const express = require('express')
const { model } = require('mongoose')
const router = express.Router()
const {getSingleAPI,getAllAPIs,createAPI,updateAPI,deleteAPI} = require('../controller/userAPI')

router.route('/').get(getAllAPIs).post(createAPI)
router.route('/:id').get(getSingleAPI).patch(updateAPI).delete(deleteAPI)

module.exports = router

