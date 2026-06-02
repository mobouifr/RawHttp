const form = document.getElementById('item-form');

const input = document.getElementById('item-input');

const list = document.getElementById('item-list');


// Render one item into the DOM
function renderItem(item)
{
    const li = document.createElement('li');

    li.textContent = item.name + ' ';

    const deleteButton = document.createElement('button');

    deleteButton.textContent = 'Delete';

    deleteButton.addEventListener('click', async () =>
    {
        // Send DELETE request to backend
        await fetch(`/items/${item.id}`, {
            method: 'DELETE'
        });

        // Remove item from DOM
        li.remove();
    });

    li.appendChild(deleteButton);

    list.appendChild(li);
}


// Load items when page opens
async function loadItems()
{
    // Send GET request
    const response = await fetch('/items');

    // Convert JSON response into JS array
    const items = await response.json();

    items.forEach((item) =>
    {
        renderItem(item);
    });
}


// Form submit
form.addEventListener('submit', async (event) =>
{
    // Prevent page reload
    event.preventDefault();

    const itemName = input.value;

    // Send POST request
    const response = await fetch('/items', {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            name: itemName
        })
    });

    // Parse backend response
    const newItem = await response.json();

    // Update DOM immediately
    renderItem(newItem);

    input.value = '';
});


// Start application
loadItems();