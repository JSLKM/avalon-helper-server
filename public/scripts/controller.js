const baseUrl = 'http://192.168.1.205:3000'


let rejectsTime = 0
let firstAnswer = false

function isRegistered() {
    axios.get(`${baseUrl}/starter/register/me`).then(response => {
        const data = response.data
        if (data.status === 'ok') {
            document.getElementById("register").style.visibility = 'hidden'
            document.getElementById("vote").style.visibility = "visible"
            return
        } 
        document.getElementById("register").style.visibility = "visible"
    })
    .catch(error => console.error(error))
}

function isBanned() {
    axios.get(`${baseUrl}/vote/banned`).then(response => {
        const data = response.data
        if (data.status === 'ok') {
            document.getElementById("banner").style.visibility = 'visible'
            firstAnswer = true
            return
        } 
    })
    .catch(error => console.error(error))
}

function isMaster() {
    axios.get(`${baseUrl}/vote/master`).then(response => {
        const data = response.data
        if (data.status === 'ok') {
            document.getElementById("master").style.visibility = 'visible'
            document.getElementById("answer").style.visibility = 'visible'
            document.getElementById("people").style.visibility = 'visible'
            document.getElementById("vote").style.visibility = "hidden"
            document.getElementById("answer").innerHTML = 'You are the master'
            return
        } 

        document.getElementById("players").style.visibility = 'visible'
    })
    .catch(error => console.error(error))
}

function rejectMessages() {
    messages = [
        "I don't want perfect, I want Honest!", 
        "Do not cheat",
        "Cheating is easy... Try something more challenging...",
        "Do not cheat",
        "You need to stop playing",
        "Do not cheat",
        "It is useless",
    ]

    if (firstAnswer) {
        rejectsTime = 25
    }
    rejectsTime = rejectsTime + 1
    if (rejectsTime > 20) {
        const number = Math.floor(Math.random() * messages.length)
        document.getElementById("answer").innerHTML = "You are banned"
        axios.get(`${baseUrl}/vote/banned/me`)
        return
    }
    if (rejectsTime > 2) {
        const number = Math.floor(Math.random() * messages.length)
        document.getElementById("answer").innerHTML = messages[number]
        return
    }

    document.getElementById("answer").innerHTML = 'Do not cheat'
}

function approve() {
    axios.get(`${baseUrl}/vote/approve`).then(response => {
        const data = response.data
        document.getElementById("answer").style.visibility = 'visible'
        if (data.status === 'ok') {
            document.getElementById("answer").innerHTML = 'VOTED successfully'
            return
        }
        rejectMessages()
    })
    .catch(error => console.error(error))
}

function reject() {
    axios.get(`${baseUrl}/vote/reject`).then(response => {
        const data = response.data
        document.getElementById("answer").style.visibility = 'visible'
        if (data.status === 'ok') {
            document.getElementById("answer").innerHTML = 'VOTED successfully'
            return
        } 
        rejectMessages()
    })
    .catch(error => console.error(error))
}

const bannerList = () => {
    axios.get(`${baseUrl}/vote/banner/list`).then(response => {
        const {list} = response.data
        if (list.length > 0) {
            document.getElementById("bannerMsg").style.visibility = 'visible'
            document.getElementById("bannerMsg").innerHTML = `${list.length} people are banned`
        } 
    })
    .catch(error => console.error(error))
}

const peopleList = () => {
    axios.get(`${baseUrl}/vote/people/list`).then(response => {
        const {list} = response.data
        console.log(list)
        if (list.length > 0) {
            document.getElementById("people").innerHTML = `${list}`
            return
        }
        document.getElementById("people").innerHTML = ``
    })
    .catch(error => console.error(error))
}

function reset() {
    axios.get(`${baseUrl}/vote/reset`).then(response => {
        const data = response.data
        document.getElementById("answer").style.visibility = 'visible'
        if (data.status === 'ok') {
            document.getElementById("answer").innerHTML = 'Reset successfully'
            return
        } 
        document.getElementById("answer").innerHTML = 'Reset Failed'
    })
    .catch(error => console.error(error))
    bannerList()
    peopleList()
}

function result() {
    axios.get(`${baseUrl}/vote/result`).then(response => {
        const {totalVotes, approves, rejects} = response.data
        document.getElementById("answer").style.visibility = 'visible'

        if (approves + rejects !== totalVotes) {
            document.getElementById("answer").innerHTML = 'Strange results'
        }

        document.getElementById("answer").innerHTML = `APPROVES: ${approves} VS REJECTS: ${rejects}`
    })
    .catch(error => console.error(error))
    bannerList()
    peopleList()
}
