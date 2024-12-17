const express = require('express');
const path = require('path');
const app = express();
const axios = require("axios");
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/",(req,res)=>{
    let query = null;
    res.render("index",{query});
})

app.post("/search", async (req, res) => {
    const query = req.body.query;

    try {
        const _query = `https://lexica.art/api/v1/search?q=${encodeURIComponent(query)}`;
        const response = await axios.get(_query);

        const images = response.data.images; 

        res.render("data", { images });
    } catch (error) {
        console.error("Error fetching data from Lexica API:", error.message);
        res.render("data", { query: null, images: null });
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


app.get("/:query",(req,res)=>{
    let err = req.params.query;
    res.render("error_page",{err});
})
