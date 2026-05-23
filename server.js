const express = require('express');
const storage = require('./storage');

const PORT = 4000;

const app = express();

app.use(express.json());

app.use((req, res, next) =>
{
    res.setHeader(
        'Access-Control-Allow-Origin',
        '*'
    );

    next();
});

app.get('/items', async (req, res) =>
{
    try
    {
        const items = await storage.loadData();

        res.json(items);
    }
    catch (error)
    {
        console.error(error);

        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

app.post('/items', async (req, res) =>
{
    try
    {
        const items = await storage.loadData();

        const newItem = {
            id: Date.now(),
            name: req.body.name
        };

        items.push(newItem);

        await storage.saveData(items);

        res.json(newItem);
    }
    catch (error)
    {
        console.error(error);

        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

app.delete('/items/:id', async (req, res) =>
{
    try
    {
        const items = await storage.loadData();

        const itemId = Number(req.params.id);

        const filteredItems = items.filter((item) =>
        {
            return item.id !== itemId;
        });

        await storage.saveData(filteredItems);

        res.json({
            success: true
        });
    }
    catch (error)
    {
        console.error(error);

        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

app.use((req, res) =>
{
    res.status(404).json({
        error: 'Route Not Found'
    });
});

app.listen(PORT, () =>
{
    console.log('Server listening on port:', PORT);
});