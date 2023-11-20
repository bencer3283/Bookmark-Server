const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const fs = require('fs')

app.use(bodyParser.json())

app.post('/', (req, res) => {
    console.log(req.body)
    let page = req.body.page + 1
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