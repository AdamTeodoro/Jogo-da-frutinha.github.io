
/**
 * Módulo para calculos e geração de números pseudoaleatórios
 */
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
    
    /**
     * Define uma posição no eixo X e também desenha o player na posição ordenada
     */
    function setPosX(value) {
        if (value && typeof value == "number") {
            posX = value;
            stylePlayer.left = value;
        }
    }
        
    /**
     * Define uma posição no eixo Y e também desenha o player na posição ordenada
     */
    function setPosY(value) {
        if (value && typeof value == "number") {
            posY = value;
            stylePlayer.top = value;
        }

    }
        
    /**
     * Incrementa 10 pontos quando acionado e também atualiza o template
     */
    function incrementScore() {
        score += 10;
        idScore.innerHTML = "<h4>" + score + "</h4>";
        
    }
    
    /**
     * Zera a pontuação do jogador quando a função é acionada e também atualiza no template;
     */
    function resetScore() {
        score = 0;
        idScore.innerHTML = "<h4>" + score + "</h4>";
    }
    
    /**
     * Inicia a posição x e y do player
     */
    setPosX(posX);
    setPosY(posY);

    return {
        //Inicio Encapsulando as variáveis de entrada
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
        //Fim Encapsulando as variáveis de entrada
        
        incrementScore,

        //função para inserir a posição x e também atualizar no template
        setPosX,

        //função para inserir a posição y e também atualizar no template
        setPosY,
        
        /**
         * Incrementa 10px na posição X
         */
        moveLeft: () => {
            if (posX < 20) {
                return setPosX(600);
            }
            setPosX(posX -= 10);
        },
        
        /**
         * Decrementa 10px na posição X
         */
        moveRight: () => {
            if (posX > 590) {
                return setPosX(10);
            }
            setPosX(posX += 10);
        },
        
        /**
         * Incrementa 10px na posição Y
         */
        moveUp: () => {
            if (posY < 20) {
                return setPosY(600);
            }
            setPosY(posY -= 10);
        },
        
        /**
         * Decrementa 10px na posição Y
         */
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
 * Recebe os jogadores e mapeia os controles executa uma função de um player quando
 * uma tecla é pressionada.
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

/**
 * Módulo de criação da frutinha no jogo, exibe em uma posição aleatória
 * no mapa.
 *
 * @param {*} timeP - Tempo de exibição da frutinha, quando o tempo é esgotado a 
 * frutinha recebe uma nova posição
 */
function FruitModule(timeP) {
    let time = timeP;

    let styleFruit = document.getElementById('fruit').style;
    let posX = GameMathModule().generateRandomPosition();
    let posY = GameMathModule().generateRandomPosition();
    let timeOut = undefined; // timer da frutinha
    
    /**
     * Inicia a frutinha com uma posição aleatória no mapa e 
     * inicia a contagem do timeP
     */
    function startFruit() {
        setPosX(GameMathModule().generateRandomPosition());
        setPosY(GameMathModule().generateRandomPosition());

        timeOut = setTimeout(() => {
            clearTimeout(timeOut);
            startFruit();
        }, time);
    }
    
    /**
     * Desenha e a frutinha em uma posição passada como parâmetro;
     */
    function setPosX(value) {
        if (value && typeof value == "number") {
            posX = value;
            styleFruit.left = value;
        }
    }
    
    /**
     * Desenha e a frutinha em uma posição enviada;
     */
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

/**
 * Verifica se a posição do player no mapa é igual a posição da frutinha e incrementa o score ou
 * reseta a pontuação se o score de um dos jogadores for 100 pontos e exibe a mensagem avisando
 * quem venceu!
 */
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

console.log("Game start");

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

/**
 * Acionando o Módulo de controles ao soltar uma tecla
 */
document.addEventListener('keyup', (event) => {
    
    try {
        control[event.key]();
    } catch {
    }
    
    verifyPoints(player1, fruit);
    verifyPoints(player2, fruit);

});
