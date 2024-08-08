import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

// In-memory DB :_))

let appData = [];
let dataId = 1;

// Adding a new item

app.post('/addItem', (req, res) => {
    const {name, price} = req.body;
    const newItem = {id: dataId++, name, price};
    appData.push(newItem);
    res.status(200).send(newItem)
})

// Getting all items 

app.get('/listItem', (req, res) => {
    res.status(200).send(appData)
})

// Getting items based on their ids

app.get('/listItem/:id', (req, res) => {
    const item = appData.find(i => i.id === parseInt(req.params.id));
    if (!item) {
        res.status(404).send("Not found")
    }
    res.status(200).send(item);
})

// Updating items based on their ids 

app.put('/item/:id', (req, res) => {
    const item = appData.find(i => i.id === parseInt(req.params.id));
    if (!item) {
        res.status(404).send("Not found")
    }
    const {name, price} = req.body;
    item.name = name;
    item.price = price;
    res.status(200).send(item);
})

// Deleting items based on their ids

app.delete('/item/:id', (req, res) => {
    const item = appData.findIndex(i => i.id === parseInt(req.params.id));
    if (item === -1) {
        res.status(404).send("Does not exist");
    }
    appData.splice(item, 1)
    res.status(200).send(appData)
})

app.listen(port, () => {
    console.log(`The server is up at port: ${port}... `)
})