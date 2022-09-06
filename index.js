 const PORT = 8000
 const express = require('express')
 const axios = require('axios')
 const cheerio = require('cheerio')
const { response } = require('express')

 //creates a new express application
 const app = express()
 
 const stores = [
    {
        name: 'bestbuy',
        address: 'https://www.bestbuy.ca/en-ca/category/ps5-console/17583383?icmp=ps5_offer_20200911_console',
        base :'https://www.bestbuy.ca/'
    },
    {
        name: 'shoppersdrugmart',
        address: 'https://shop.shoppersdrugmart.ca/search?text=ps5&sort=relevance&page=0&q=ps5',
        base: ''
    },
    {
        name: 'costco',
        address: 'https://www.costco.ca/playstation-5.html',
        base : ''
    }
 ]

 const articles =[]

 stores.forEach(store => {
    axios.get(store.address)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        

        $('a:contains("PlayStation")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')
                articles.push({
                    title,
                    url: store.base + url,
                    source: store.name 
                })
                console.log(title)
                
        })
    })
 })

 app.get ('/', (req, res) => {
    res.json('Welcome to my Ps5 News API')
 })

 app.get('/news', (req, res) => {

    res.json(articles)
 })

 app.get('/news/:storeId', async (req) => {
    console.log(req.params.storeId)
    const storeId = req.params.storeId
    const store = stores.filter(store => store.name === storeId)[0].address
    console.log(store)
    //axios.get()
 })

 app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))