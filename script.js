var tasks = [{
        "title": "home",
        "color": "blue",
    },
    {
        "title": "city",
        "color": "green",
    }
];

let cardContainer;

let createTaskCard = (task) => {

    let card = document.createElement('div');
    card.className = 'card shadow cursor-pointer';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let title = document.createElement('h5');
    title.innerText = task.title;
    title.className = 'card-title';

    let color = document.createElement('div');
    color.innerText = task.color;
    color.className = 'card-color';


    cardBody.appendChild(title);
    cardBody.appendChild(color);
    card.appendChild(cardBody);
    cardContainer.appendChild(card);

}

let initListOfTasks = () => {
    if (cardContainer) {
        document.getElementById('card-container').replaceWith(cardContainer);
        return;
    }

    cardContainer = document.getElementById('card-container');
    tasks.forEach((task) => {
        createTaskCard(task);
    });
};

initListOfTasks();