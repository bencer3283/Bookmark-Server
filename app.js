const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const fs = require('fs')

app.use(bodyParser.json())

app.post('/', (req, res) => {
    console.log(req.body)
    let oldPage = JSON.parse(fs.readFileSync('current-page.json', {encoding: 'utf-8'}))
    console.log(oldPage)
    let page = 0
    if (req.body.page > oldPage.page) {
        page = req.body.page
    }
    else {
        page = oldPage.page
    }
    let newPage = {
        book: req.body.book,
        page: page
    }
    fs.writeFile('current-page.json', JSON.stringify(newPage), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    res.json(newPage)
})

app.listen(port, () => {
    console.log(`Bookmark app listening on port ${port}`)
})