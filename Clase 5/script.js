const cards = [
    { id: 1, title: 'Task 1', deadline: '2023-08-31' },
    // More cards
];

const modal = document.getElementById('cardModal');
const cardTitleInput = document.getElementById('cardTitle');
const editButton = document.getElementById('editButton');
const deleteButton = document.getElementById('deleteButton');

function openModal(cardId) {
    const card = cards.find(card => card.id === cardId);
    cardTitleInput.value = card.title;

    editButton.addEventListener('click', () => {
        card.title = cardTitleInput.value;
        closeModal();
        // Update UI
    });

    deleteButton.addEventListener('click', () => {
        const cardIndex = cards.findIndex(card => card.id === cardId);
        cards.splice(cardIndex, 1);
        closeModal();
        // Update UI
    });

    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
    editButton.removeEventListener('click', null);
    deleteButton.removeEventListener('click', null);
}

// Populate initial cards on the board
function populateBoard() {
    const board = document.querySelector('.board');
    
    cards.forEach(card => {
        const column = document.querySelector('.column');
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.textContent = card.title;
        cardElement.addEventListener('click', () => openModal(card.id));
        column.appendChild(cardElement);
    });
}

populateBoard();
