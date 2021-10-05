const express = require("express")
const router = express.Router()

const { users } = require('../temporalStore')

router.post("/register", (req, res) => {
    const remoteAddress = req.connection.remoteAddress
    const {uname} = req.body
    users.push({
        [remoteAddress]: uname
    })
    res.send({status: 'ok'})
})

router.get("/register/me", (req, res) => {
    const remoteAddress = req.connection.remoteAddress

    const someOne = users.find(element => element[remoteAddress] !== undefined)

    if (someOne) {
        res.send({status: 'ok'})
        return
    }
    res.send({status: 'ko'})
})


// Export the router.
module.exports = router