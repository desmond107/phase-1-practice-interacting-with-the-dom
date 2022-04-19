let counter, incrementBtn,decrementBtn, likeBtn, likesList, pauseBtn,commentsList,commentSubmit, commentText;
     
    let intervalId;

document.addEventListener('DOMContentLoaded', () => init());

function init() {
    counter = document.getElementById('counter');
    incrementBtn = document.getElementById('plus');
    decrementBtn = document.getElementById('minus');
    likeBtn = document.getElementById('heart');
    likesList = document.querySelector('.likes');
    pauseBtn = document.getElementById('pause');
    commentsList = document.getElementById('list');
    commentSubmit = document.getElementById('submit');
    commentText = document.getElementById('comment-input');


    startCounter();

    incrementBtn.addEventListener('click', () => {
        incrementCounter();
    });

    decrementBtn.addEventListener('click', () => {
        decrementCounter();
    })

    likeBtn.addEventListener('click', () => {
        likeNumber(counter.textContent);
    });

    pauseBtn.addEventListener('click', () => {
        if (intervalId == -1) {
            startCounter();
        } else {
            pauseCounter();
        }
    });

    commentSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        addComment(commentText.value);
    });
}

function incrementCounter() {
    counter.textContent = parseInt(counter.textContent) + 1;
}

function decrementCounter() {
    counter.textContent = parseInt(counter.textContent) - 1;
}

function startCounter() {
    intervalId = setInterval(() => {
        incrementCounter();
    }, 1000);

    pauseBtn.textContent = 'pause';
    incrementBtn.disabled = false;
    decrementBtn.disabled = false;
    likeBtn.disabled = false;
}

function pauseCounter() {
    clearInterval(intervalId);
    intervalId = -1;

    pauseBtn.textContent = 'resume';
    incrementBtn.disabled = true;
    decrementBtn.disabled = true;
    likeBtn.disabled = true;
}

const likeDictionary = new Map();
function LikeEntry(value, numberLikes) {
    this.value = value
    this.numberLikes = numberLikes;
}

function likeNumber(number) {
    let entry = likeDictionary.get(number);
    if (entry) {
        entry.numberLikes += 1;
    } else {
        entry = new LikeEntry(number, 1);
        likeDictionary.set(number, entry);
    }
    updateLikeDisplay();
}

function addLikeEntry(likeEntry) {
    let likeEntryListItem = document.createElement('li');
    likeEntryListItem.appendChild(document.createTextNode(
        `${likeEntry.value} has been liked ${likeEntry.numberLikes} time(s)!`
    ));
    likesList.appendChild(likeEntryListItem);
}

function updateLikeDisplay() {
   
    while (likesList.lastElementChild) {
        likesList.removeChild(likesList.lastElementChild);
    }

    
    for (const [key, value] of likeDictionary.entries()) {
        addLikeEntry(value);
    }
}

const comments = [];

function addComment(comment) {
    comments.push(comment);

    const commentItem = document.createElement('p');
    commentItem.textContent = comment;
    commentsList.appendChild(commentItem);
}