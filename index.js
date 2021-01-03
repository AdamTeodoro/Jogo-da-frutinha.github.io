function GameMathModule() {

    return {
        generateRandomPosition: () => ((Math.floor(Math.random() * 60) * 10) + 10),
    }
}

/**
 * 
 * Função para criação do player
 * 
 * @param {*} name - nome do jogador
 * @param {*} color - cor do jogador
 * @param {*} points - pontuação do jogador
 * @param {*} posX - posição do eixo x
 * @param {*} posY - posição do eixo y
 * @param {*} id - id do player no html e no código
 * @param {*} stylePlayer - estilo no id do html
 */
function Player(
    name,
    color,
    posX,
    posY,
    id,
) {
    let score = 0;

    let stylePlayer = document.getElementById('player-' + id).style;
    let idScore = document.getElementById("score-p" + id);
    idScore.innerHTML = `<h4>${score}</h4>`;

    function setPosX(value) {
        if (value && typeof value == "number") {
            posX = value;
            stylePlayer.left = value;
        }
    }

    function setPosY(value) {
        if (value && typeof value == "number") {
            posY = value;
            stylePlayer.top = value;
        }

    }

    function incrementScore() {
        score += 10;
        idScore.innerHTML = "<h4>" + score + "</h4>";
        
    }

    function resetScore() {
        score = 0;
        idScore.innerHTML = "<h4>" + score + "</h4>";
    }

    setPosX(posX);
    setPosY(posY);

    return {
        
        getName: () => {
            return name;
        },

        getId: () => {
            return id;
        },

        getColor: () => {
            return color;
        },

        getScore: () => {
            return score;
        },

        getPosX() {
            return posX;
        },

        getPosY()  {
            return posY;
        },

        incrementScore,

        //função para inserir a posição x e também atualizar no template
        setPosX,

        //função para inserir a posição y e também atualizar no template
        setPosY,

        moveLeft: () => {
            if (posX < 20) {
                return setPosX(600);
            }
            setPosX(posX -= 10);
        },

        moveRight: () => {
            if (posX > 590) {
                return setPosX(10);
            }
            setPosX(posX += 10);
        },

        moveUp: () => {
            if (posY < 20) {
                return setPosY(600);
            }
            setPosY(posY -= 10);
        },

        moveDown: () => {
            if (posY > 590) {
                return setPosY(10);
            }
            setPosY(posY += 10);
        },

        resetScore

    }
}
/**
 * Recebe os jogadores e mapeia os controles
 * 
 * @param {*} player1 - Classe do tipo jogador
 * @param {*} player2 - Classe do tipo jogador
 */
function ControllModule(player1, player2) {
    try {
        return {
            "ArrowRight": () => {
                player1.moveRight();
            },

            "ArrowLeft": () => {
                player1.moveLeft();
            },

            "ArrowUp": () => {
                player1.moveUp();
            },

            "ArrowDown": () => {
                player1.moveDown();
            },

            "w": () => {
                player2.moveUp();
            },

            "a": () => {
                player2.moveLeft();
            },

            "s": () => {
                player2.moveDown();
            },

            "d": () => {
                player2.moveRight();
            }
        }
    } catch(error) {
        return;
    }
}

function FruitModule(timeP) {
    let time = timeP;

    let styleFruit = document.getElementById('fruit').style;
    let posX = GameMathModule().generateRandomPosition();
    let posY = GameMathModule().generateRandomPosition();
    let timeOut = undefined;

    function startFruit() {
        setPosX(GameMathModule().generateRandomPosition());
        setPosY(GameMathModule().generateRandomPosition());

        timeOut = setTimeout(() => {
            clearTimeout(timeOut);
            startFruit();
        }, time);
    }

    function setPosX(value) {
        if (value && typeof value == "number") {
            posX = value;
            styleFruit.left = value;
        }
    }

    function setPosY(value) {
        if (value && typeof value == "number") {
            posY = value;
            styleFruit.top = value;
        }
    }

    setPosX(posX);
    setPosY(posY);

    return {
        getTime: () => time,
        getPosX: () => posX,
        getPosY: () => posY,
        setPosX,
        setPosY,
        startFruit,
        timeOut,
        
    }
}

function verifyPoints(player, fruit) {

    if (player.getPosX() === fruit.getPosX() && player.getPosY() === fruit.getPosY()) {
        
        player.incrementScore();
        clearTimeout(fruit.timeOut);
        fruit.startFruit();

        if (player.getScore() === 100) {
            alert("Vencedor: " + player.getName());

            player2.resetScore();
            player1.resetScore();
        }
        
    }

}

console.log("start");

let player1 = new Player(
    "Player 1",
    "black",
    GameMathModule().generateRandomPosition(),
    GameMathModule().generateRandomPosition(),
    1
); 

let player2 = new Player(
    "Player 2",
    "white",
    GameMathModule().generateRandomPosition(),
    GameMathModule().generateRandomPosition(),
    2
);

let fruit = new FruitModule(5000);

let control = ControllModule(player1, player2);

document.addEventListener('keydown', (event) => {
    
    try {
        control[event.key]();
    } catch {
    }
    verifyPoints(player1, fruit);
    verifyPoints(player2, fruit);

});
