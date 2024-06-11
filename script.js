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

// Function to navigate to a random site
function goToRandomSite() {
    const randomIndex = Math.floor(Math.random() * sites.length);
    window.location.href = sites[randomIndex];
}

// Mouse and touch cursor glitter trail effect
function createGlitter(e) {
    const glitterContainer = document.getElementById('glitter-container');
    const glitter = document.createElement('div');
    glitter.classList.add('glitter');
    glitter.style.left = `${e.pageX}px`;
    glitter.style.top = `${e.pageY}px`;
    glitterContainer.appendChild(glitter);
    setTimeout(() => glitter.remove(), 1000);
}

document.addEventListener('mousemove', createGlitter);
document.addEventListener('touchmove', (e) => createGlitter(e.touches[0]));

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

document.addEventListener('DOMContentLoaded', () => {
    typeEffect();
    const audio = document.getElementById('background-music');
    audio.play().catch(error => {
        console.log('Autoplay was prevented:', error);
    });
});

// Toggle sound functionality
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

// Draggable Post-it Note functionality
function makeDraggable(element) {
    element.addEventListener('mousedown', (e) => startDrag(e, element));
    element.addEventListener('touchstart', (e) => startDrag(e.touches[0], element));
}

function startDrag(e, element) {
    let shiftX = e.clientX - element.getBoundingClientRect().left;
    let shiftY = e.clientY - element.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    function onTouchMove(event) {
        moveAt(event.touches[0].pageX, event.touches[0].pageY);
    }

    function stopDrag() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('touchmove', onTouchMove);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
}

document.querySelectorAll('.post-it').forEach(postIt => makeDraggable(postIt));

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
const postItColorInput = document.getElementById('post-it-bg-color');
const postItTextColorInput = document.getElementById('post-it-text-color');

postItColorInput.addEventListener('input', function() {
    document.querySelectorAll('.post-it').forEach(postIt => {
        postIt.style.backgroundColor = postItColorInput.value;
    });
});

postItTextColorInput.addEventListener('input', function() {
    document.querySelectorAll('.post-it').forEach(postIt => {
        postIt.style.color = postItTextColorInput.value;
        const tasks = postIt.querySelectorAll('.task span');
        tasks.forEach(task => {
            task.style.color = postItTextColorInput.value;
        });
        const newTaskInput = postIt.querySelector('.new-task');
        if (newTaskInput) {
            newTaskInput.style.color = postItTextColorInput.value;
        }
    });
});

// Add and delete post-it notes functionality
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('add-post-it').addEventListener('click', function() {
        const postItContainer = document.getElementById('post-it-container');
        const newPostIt = document.createElement('div');
        newPostIt.classList.add('post-it');
        newPostIt.innerHTML = `
            <input type="text" class="new-task" placeholder="New task...">
            <div class="tasks"></div>
            <button class="delete-post-it">Delete</button>
        `;
        makeDraggable(newPostIt);
        newPostIt.querySelector('.delete-post-it').add
EventListener('click', function() {
    newPostIt.remove();
});
postItContainer.appendChild(newPostIt);
});
});

// Make the initial post-it draggable
document.querySelectorAll('.post-it').forEach(postIt => makeDraggable(postIt));

// Customization functionality
const bgColorPicker = document.getElementById('bg-color-picker');
const bgImageUpload = document.getElementById('bg-image-upload');
const titleColorPicker = document.getElementById('title-color-picker');
const footerColorPicker = document.getElementById('footer-color-picker');
const cursorUpload = document.getElementById('cursor-upload');
const cursorSelect = document.getElementById('cursor-select');

bgColorPicker.addEventListener('input', function() {
document.body.style.backgroundColor = bgColorPicker.value;
document.body.style.backgroundImage = '';
});

bgImageUpload.addEventListener('change', function() {
const file = bgImageUpload.files[0];
if (file) {
const reader = new FileReader();
reader.onload = function(e) {
    document.body.style.backgroundImage = `url(${e.target.result})`;
    document.body.style.backgroundSize = 'cover'; // Adjust the image to cover the background
    document.body.style.backgroundPosition = 'center'; // Center the background image
};
reader.readAsDataURL(file);
}
});

titleColorPicker.addEventListener('input', function() {
document.getElementById('title').style.color = titleColorPicker.value;
});

footerColorPicker.addEventListener('input', function() {
document.querySelector('footer').style.color = footerColorPicker.value;
});

cursorUpload.addEventListener('change', function() {
const file = cursorUpload.files[0];
if (file && file.type === 'image/x-icon') {
const reader = new FileReader();
reader.onload = function(e) {
    document.body.style.cursor = `url(${e.target.result}), auto`;
};
reader.readAsDataURL(file);
} else {
alert('Please upload a valid .cur file.');
}
});

cursorSelect.addEventListener('change', function() {
document.body.style.cursor = cursorSelect.value;
});

// Burger menu toggle functionality
function toggleMenu() {
const menu = document.getElementById('customization-menu');
menu.style.display = menu.style.display === 'none' || menu.style.display === '' ? 'flex' : 'none';
}
