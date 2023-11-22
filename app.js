const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const fs = require('fs')

app.use(bodyParser.json())

app.get('/', (req, res) => {
    let oldPage = JSON.parse(fs.readFileSync('current-page.json', {encoding: 'utf-8'}))
    res.json(oldPage)
})

app.post('/', (req, res) => {
    console.log('req ' + JSON.stringify(req.body))
    // read current page from file
    let oldPage = JSON.parse(fs.readFileSync('current-page.json', {encoding: 'utf-8'}))
    console.log('storage ' + JSON.stringify(oldPage))
    
    let page = 0
    let recievedPage = 0
    // type cast
    if (typeof req.body.page == "string") {
        recievedPage = Number(req.body.page)
    } 
    else {
        recievedPage = req.body.page
    }
    // if the recieved page number is greater than existing one, update it.
    if (recievedPage > oldPage.page) {
        page = recievedPage
    }
    else {
        page = oldPage.page
    }
    // new data
    let newPage = {
        book: req.body.book,
        page: page
    }
    //store new data
    fs.writeFile('current-page.json', JSON.stringify(newPage), function (err) {
        if (err) throw err;
        console.log('Saved!' + JSON.stringify(newPage));
    })
    // send the updated page
    res.json(newPage)
})

app.get('/reset', (req, res) => {
    let resetTo = parseInt(req.query.pageNum)
    console.log('reset to: ' + resetTo)
    let oldPage = JSON.parse(fs.readFileSync('current-page.json', {encoding: 'utf-8'}))
    let newPage = {
        book: oldPage.book,
        page: resetTo
    }
    fs.writeFile('current-page.json', JSON.stringify(newPage), function (err) {
        if (err) throw err;
        console.log('Saved!');
    })
    res.json(newPage)
})

app.listen(port, () => {
    console.log(`Bookmark app listening on port ${port}`)
})