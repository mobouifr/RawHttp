const fs = require('fs');

async function loadData()
{
    try 
    {
        const data = await fs.promises.readFile("./data.json", "utf-8");
        return (JSON.parse(data));
    }
    catch (error)
    {
        if (error.code === "ENOENT")
        {
            return ([]);
        }
        else
            throw error;
    }
}

async function saveData(data)
{
    const jsonData = JSON.stringify(data, null, 4);
   
    await fs.promises.writeFile("./data.json", jsonData, "utf-8");
}

module.exports = {loadData, saveData};