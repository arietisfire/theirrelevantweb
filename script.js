const sites = [
    "http://staggeringbeauty.com/",
    "http://pointerpointer.com/",
    "http://eelslap.com/",
    "http://burymewithmymoney.com/",
    "http://heeeeeeeey.com/",
    "http://fallingfalling.com/",
    "https://themostuselesswebsite.com/",
    "http://koalastothemax.com/",
    "http://isitchristmas.com/",
    "https://baconipsum.com/",
    "http://alwaysjudgeabookbyitscover.com/",
    "http://ffffidget.com/",
    "http://trypap.com/",
    "http://smashthewalls.com/",
    "http://weirdorconfusing.com/",
    "http://thezen.zone/",
    "http://creativetechguy.com/fishfeeder",
    "http://runpee.com/",
    "http://screamintothevoid.com/",
    "http://pixelthoughts.co/",
    "http://purrli.com/",
    "http://honestslogans.com/",
    "http://window-swap.com/",
    "http://shipyourenemiesglitter.com/",
    "http://corndogoncorndog.com/",
    "http://donothingfor2minutes.com/",
    "http://omfgdogs.com/",
    "http://endless.horse/",
    "http://drawastickman.com/",
    "http://pleaselike.com/",
    "http://fallingguy.com/",
    "http://corgiorgy.com/",
    "http://dogs.are.the.most.moe/",
    "http://movenowthinklater.com/",
    "http://themostseconds.com/",
    "http://jodi.org/",
    "http://awkwardfamilyphotos.com/",
    "http://puginarug.com/",
    "http://beesbeesbees.com/",
    "http://heyyeyaaeyaaaeyaeyaa.com/",
    "http://r33b.net/",
    "http://zombo.com/",
    "http://make-everything-ok.com/",
    "http://nooooooooooooooo.com/",
    "http://mapcrunch.com/",
    "http://thenicestplaceontheinter.net/",
    "http://procatinator.com/",
    "http://tane.us/",
    "http://rainymood.com/",
    "http://salmonofcapistrano.com/"
];

function goToRandomSite() {
    const randomIndex = Math.floor(Math.random() * sites.length);
    window.location.href = sites[randomIndex];
}

// Mouse cursor glitter trail effect
document.addEventListener('mousemove', function(e) {
    const glitterContainer = document.getElementById('glitter-container');
    const glitter = document.createElement('div');
    glitter.classList.add('glitter');
    glitter.style.left = `${e.pageX}px`;
    glitter.style.top = `${e.pageY}px`;
    glitterContainer.appendChild(glitter);
    setTimeout(() => glitter.remove(), 1000);
});

// Fake search bar typing effect
const fakeSearch = document.getElementById('fake-search');
const words = [
    "random stuff", "irrelevant search", "funny things", 
    "weird websites", "useless stuff", "strange places"
];
let i = 0;
let j = 0;
let currentWord = '';
let isDeleting = false;

function typeEffect() {
    if (i < words.length) {
        if (!isDeleting && j <= words[i].length) {
            currentWord = words[i].substring(0, j);
            j++;
        }

        if (isDeleting && j <= words[i].length) {
            currentWord = words[i].substring(0, j);
            j--;
        }

        if (j == words[i].length) {
            isDeleting = true;
        }

        if (isDeleting && j === 0) {
            currentWord = '';
            isDeleting = false;
            i++;
            if (i === words.length) {
                i = 0;
            }
        }

        fakeSearch.setAttribute('placeholder', currentWord);
        setTimeout(typeEffect, isDeleting ? 100 : 200);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    typeEffect();
    const audio = document.getElementById('background-music');
    audio.play().catch(error => {
        console.log('Autoplay was prevented:', error);
    });
});

function toggleSound() {
    const audio = document.getElementById('background-music');
    const soundIcon = document.getElementById('sound-icon');
    if (audio.paused) {
        audio.play();
        soundIcon.src = "sound_on_icon.png";
    } else {
        audio.pause();
        soundIcon.src = "sound_off_icon.png";
    }
}

// Draggable Post-it Note
const postIt = document.getElementById('post-it');
postIt.addEventListener('mousedown', function(e) {
    let shiftX = e.clientX - postIt.getBoundingClientRect().left;
    let shiftY = e.clientY - postIt.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
        postIt.style.left = pageX - shiftX + 'px';
        postIt.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    postIt.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        postIt.onmouseup = null;
    };
});

postIt.ondragstart = function() {
    return false;
};

// To-do list functionality
const newTaskInput = document.getElementById('new-task');
const tasksContainer = document.getElementById('tasks');

newTaskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const taskText = newTaskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            newTaskInput.value = '';
        }
    }
});

function addTask(text) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const taskLabel = document.createElement('span');
    taskLabel.textContent = text;

    const deleteButton = document.createElement('span');
    deleteButton.textContent = '×';
    deleteButton.classList.add('delete-task');
    deleteButton.onclick = function() {
        tasksContainer.removeChild(taskDiv);
    };

    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskLabel);
    taskDiv.appendChild(deleteButton);
    tasksContainer.appendChild(taskDiv);
}

// Google Search functionality
fakeSearch.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const query = fakeSearch.value.trim();
        if (query !== '') {
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }
    }
});

// Post-it color change functionality
const postItColorInput = document.getElementById('post-it-color');
const postItTextColorInput = document.getElementById('post-it-text-color');

postItColorInput.addEventListener('input', function() {
    postIt.style.backgroundColor = postItColorInput.value;
});

postItTextColorInput.addEventListener('input', function() {
    postIt.style.color = postItTextColorInput.value;
    const tasks = postIt.querySelectorAll('.task span');
    tasks.forEach(task => {
        task.style.color = postItTextColorInput.value;
    });
    const newTaskInput = document.getElementById('new-task');
    newTaskInput.style.color = postItTextColorInput.value;
});



