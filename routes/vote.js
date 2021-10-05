const express = require("express")
const router = express.Router()
const { users } = require('../temporalStore')
const masterNode = '::ffff:192.168.1.142'

let totalVotes = 0
let approves = 0
let rejects = 0
let alreadyVoted = []
let bannedAddress = []

router.get("/banner/list", (req,res) => {
    res.send({list: bannedAddress})
})

router.get("/people/list", (req,res) => {
    newlist = alreadyVoted.reduce((acc, address) => {
        const someOne = users.find(element => element[address] !== undefined)
        if (someOne) {
            acc.push(someOne[address])
        }
        return acc
    }, [])
    res.send({list: newlist})
})

router.get("/banned/me", (req, res) => {
    const remoteAddress = req.connection.remoteAddress
    if (bannedAddress.includes(remoteAddress)) {
        res.send({status: 'ok'})
        return
    }
    bannedAddress.push(remoteAddress)
    res.send({status: 'ok'})
})

router.get("/banned", (req, res) => {
    const remoteAddress = req.connection.remoteAddress
    if (bannedAddress.includes(remoteAddress)) {
        res.send({status: 'ok'})
        return
    }
    res.send({status: 'ko'})
})

router.get("/master", (req, res) => {
    const remoteAddress = req.connection.remoteAddress
    if (remoteAddress === masterNode) {
        res.send({status: 'ok'})
        return
    }
    res.send({status: 'ko'})
})

router.get("/reset", (req, res) => {
    alreadyVoted = []
    totalVotes = 0
    approves = 0
    rejects = 0
    res.send({status: 'ok'})
})

router.get("/approve", (req, res) => {
    const remoteAddress = req.connection.remoteAddress
    if (!alreadyVoted.includes(remoteAddress)) {
        console.log('received one vote')
        alreadyVoted.push(remoteAddress)
        totalVotes = totalVotes + 1
        approves = approves + 1
        res.send(JSON.stringify({status: 'ok'}))
        return
    }
    res.send({status: 'ko'})
    console.log('mmh someone is trying to cheat')
})

router.get("/reject", (req, res) => {
    const remoteAddress = req.connection.remoteAddress
    if (!alreadyVoted.includes(remoteAddress)) {
        console.log('received one vote')
        alreadyVoted.push(remoteAddress)
        totalVotes = totalVotes + 1
        rejects = rejects + 1
        res.send(JSON.stringify({status: 'ok'}))
        return
    }
    res.send({status: 'ko'})
    console.log('mmh someone is trying to cheat')
})

router.get("/result", (req, res) => {
    const result = {
        totalVotes,
        approves,
        rejects
    }
    res.send(JSON.stringify(result))
})

// Export the router.
module.exports = router