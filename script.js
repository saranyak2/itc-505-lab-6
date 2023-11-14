const story = {
    start: {
        text: "You wake up in a mysterious forest. What do you do? Scroll Down",
        choices: ["Explore", "Rest"],
        consequence: {
            Explore: "forestPath",
            Rest: "restEnd"
        },
        image: "forest.png"
    },

    forestPath: {
        text: "You come across a fork in the path. Left or right?",
        choices: ["Left", "Right"],
        consequence: {
            Left: "leftEnd",
            Right: "rightEnd"
        },
        image: "path.png"
    },

    leftEnd: {
        text: "You find a hidden cave. Do you enter or continue on the path?",
        choices: ["Enter the cave", "Continue on the path"],
        consequence: {
            "Enter the cave": "caveEnd",
            "Continue on the path": "pathEnd"
        },
        image: "cave.png"
    },

    
    caveEnd: {
        text: "As you enter the cave, you find a chest with a lock. What's your next move?",
        choices: ["Try to open the chest", "Leave the cave"],
        consequence: {
            "Try to open the chest": "treasure",
            "Leave the cave": "leaveCave"
        },
        image: "treasure-cave.png"
    },

    pathEnd: {
        text: "As you enter the path, you find a Lion. Lion eats you. Game Over",
        choices: [],
        consequence: {},
        image: "game-over.gif"
    },

    treasure: {
        text: "The chest opens to reveal a gleaming treasure! You've found the legendary artifact.",
        choices: [],
        consequence: {},
        image: "legendary-artifact.png"
    },

    leaveCave: {
        text: "You decide to leave the cave. The path ahead seems mysterious and inviting.",
        choices: ["Proceed further"],
        consequence: {
            "Proceed further": "newPath"
        },
        image: "new-path.png"
    },

    newPath: {
        text: "You encounter an ancient temple. What's your next move?",
        choices: ["Enter the temple", "Continue exploring"],
        consequence: {
            "Enter the temple": "templeEntry",
            "Continue exploring": "Continueexploring"
        },
        image: "ancient-temple.png"
    },

    Continueexploring: {
        text: "You choose to walk away from the Temple. The path leads to a cliff. You fell over. Game Over!",
        choices: [],
        consequence: {
        },
        image: "game-over.gif"
    },

    templeEntry: {
        text: "You enter the temple. Inside, there are three doors. Which door will you choose?",
        choices: ["Door on the left", "Door in the middle", "Door on the right"],
        consequence: {
            "Door on the left": "leftDoor",
            "Door in the middle": "middleDoor",
            "Door on the right": "rightDoor"
        },
        image: "threedoors.png"
    },

    leftDoor: {
        text: "You've found a room, The room is Empty. Go Back",
        choices: [],
        consequence: {},
        image: "emptyroom.jpg"
    },

    middleDoor: {
        text: "You've found The Treasure, You Win",
        choices: [],
        consequence: {},
        image: "treasureroom.png"
    },

    rightDoor: {
        text: "You've found a room, The room is Empty. Go Back",
        choices: [],
        consequence: {},
        image: "emptyroom.jpg"
    },

    rightEnd: {
        text: "You encounter a beautiful garden with a mysterious gate. What will you do?",
        choices: ["Open the gate", "Walk away"],
        consequence: {
            "Open the gate": "secretGarden",
            "Walk away": "walkAway"
        },
        image: "garden.png"
    },

    secretGarden: {
        text: "You step into the enchanting garden. You find a treasure chest. What's your next move?",
        choices: ["Open the chest", "Ignore Treasure"],
        consequence: {
            "Open the chest": "treasure",
            "Ignore Treasure": "ignoreTreasure"
        },
        image: "treasure-garden.png"
    },
    
    ignoreTreasure: {
        text: "You ignored the treasure. It has a hammer which helps you kill a Monster. You get killed by the Monster. Game Over!",
        choices: [],
        consequence: {
        },
        image: "game-over.gif"
    },

    walkAway: {
        text: "You choose to walk away from the gate. The path leads to a Lion. You get killed. Game Over!",
        choices: [],
        consequence: {
        },
        image: "game-over.gif"
    },

    restEnd: {
        text: "You decided to rest and got eaten by a grue. Game Over!",
        choices: [],
        consequence: {},
        image: "game-over.gif"
    }
};

let currentState = 'start';
let previousStates = [];
function updatePage(currentState) {
    const currentStage = story[currentState];

    
    document.getElementById('story-text').textContent = currentStage.text;
    document.getElementById('story-image').src = currentStage.image;


const choicesDiv = document.querySelector('.choices');
choicesDiv.innerHTML = '';

const previousButton = document.createElement('button');
previousButton.textContent = 'Go Back';
previousButton.addEventListener('click', () => {
    if (previousStates.length > 0) {
        currentState = previousStates.pop();
        updatePage(currentState);
    }
});
choicesDiv.appendChild(previousButton);

const choiceButtonsContainer = document.createElement('div');
choiceButtonsContainer.classList.add('choice-buttons');

currentStage.choices.forEach(choice => {
    const choiceButton = document.createElement('button');
    choiceButton.textContent = choice;
    choiceButton.addEventListener('click', () => {
        previousStates.push(currentState);
        currentState = currentStage.consequence[choice];
        updatePage(currentState);
    });
    choiceButtonsContainer.appendChild(choiceButton);
});

choicesDiv.appendChild(choiceButtonsContainer);

}

function endGame(endState) {
    const endStage = story[endState];

    document.getElementById('story-text').textContent = endStage.text;

    const choicesDiv = document.querySelector('.choices');
    choicesDiv.innerHTML = '';

    document.getElementById('story-image').src = endStage.image;
}

updatePage('start');
