const shellEl = document.getElementById('shell');
    const bunnyEl = document.getElementById('bunny');
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');

    // Точка крепления нити в правом верхнем углу окна (в 140px от правого края)
    let anchor = { x: window.innerWidth - 340, y: 0 };

    // Координаты брелоков
    const p1 = { x: anchor.x, y: 300, oldX: anchor.x, oldY: 120, length: 220 };
    const p2 = { x: anchor.x, y: 250, oldX: anchor.x, oldY: 275, length: 95 };

    // Физика пружины
    const gravity = 0.4;
    const damping = 0.95;
    const stiffness = 0.08;

    let draggedPoint = null;
    let mouseX = 0;
    let mouseY = 0;

    // Обновляем точку привязки при изменении размера окна
    window.addEventListener('resize', () => {
      anchor.x = window.innerWidth - 140;
    });

    function updatePhysics() {
      [p1, p2].forEach(p => {
        if (draggedPoint !== p) {
          let vx = (p.x - p.oldX) * damping;
          let vy = (p.y - p.oldY) * damping + gravity;
          p.oldX = p.x;
          p.oldY = p.y;
          p.x += vx;
          p.y += vy;
        } else {
          p.oldX = p.x;
          p.oldY = p.y;
          p.x = mouseX;
          p.y = mouseY;
        }
      });

      applySpring(anchor, p1, p1.length, true);
      applySpring(p1, p2, p2.length, false);

      render();
      requestAnimationFrame(updatePhysics);
    }

    function applySpring(pA, pB, restLength, isAnchorFixed) {
      let dx = pB.x - pA.x;
      let dy = pB.y - pA.y;
      let dist = Math.hypot(dx, dy) || 0.001;

      let delta = dist - restLength;
      let force = delta * stiffness;

      let fx = (dx / dist) * force;
      let fy = (dy / dist) * force;

      if (!isAnchorFixed && draggedPoint !== pA) {
        pA.x += fx;
        pA.y += fy;
      }
      if (draggedPoint !== pB) {
        pB.x -= fx;
        pB.y -= fy;
      }
    }

    function render() {
      shellEl.style.left = `${p1.x}px`;
      shellEl.style.top = `${p1.y}px`;

      bunnyEl.style.left = `${p2.x}px`;
      bunnyEl.style.top = `${p2.y}px`;

      line1.setAttribute('x1', anchor.x);
      line1.setAttribute('y1', anchor.y);
      line1.setAttribute('x2', p1.x);
      line1.setAttribute('y2', p1.y);

      line2.setAttribute('x1', p1.x);
      line2.setAttribute('y1', p1.y);
      line2.setAttribute('x2', p2.x);
      line2.setAttribute('y2', p2.y);
    }

    function handleStart(e, point) {
      draggedPoint = point;
      updateMousePos(e);
    }

    function updateMousePos(e) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      mouseX = clientX;
      mouseY = clientY;
    }

    shellEl.addEventListener('mousedown', (e) => handleStart(e, p1));
    bunnyEl.addEventListener('mousedown', (e) => handleStart(e, p2));
    shellEl.addEventListener('touchstart', (e) => handleStart(e, p1));
    bunnyEl.addEventListener('touchstart', (e) => handleStart(e, p2));

    window.addEventListener('mousemove', (e) => { if (draggedPoint) updateMousePos(e); });
    window.addEventListener('touchmove', (e) => { if (draggedPoint) updateMousePos(e); });
    window.addEventListener('mouseup', () => draggedPoint = null);
    window.addEventListener('touchend', () => draggedPoint = null);

    updatePhysics();
    
function openPopup() {
  document.querySelector('.popup').style.display = 'block';
}

function closePopup() {
  document.querySelector('.popup').style.display = 'none';
}

// Код для перетаскивания окна за шапку
document.addEventListener('DOMContentLoaded', function () {
  const popup = document.querySelector('.popup');
  const popupHeader = document.querySelector('.popup-header');

  if (popup && popupHeader) {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    popupHeader.addEventListener('mousedown', function (e) {
      // Игнорируем нажатие, если кликнули по кнопке закрытия
      if (e.target.classList.contains('close')) return;

      isDragging = true;

      // Получаем текущее положение окна
      const rect = popup.getBoundingClientRect();

      // Сбрасываем transform: translate(-50%, -50%), чтобы координаты считывались точно
      popup.style.transform = 'none';
      popup.style.left = rect.left + 'px';
      popup.style.top = rect.top + 'px';

      // Вычисляем смещение курсора относительно угла окна
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
      if (!isDragging) return;

      // Рассчитываем новые координаты
      let newLeft = e.clientX - offsetX;
      let newTop = e.clientY - offsetY;

      // Обновляем позицию окна
      popup.style.left = newLeft + 'px';
      popup.style.top = newTop + 'px';
    }

    function onMouseUp() {
      isDragging = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  }
});

let board = [];
let rows = 8;
let columns = 12;

let minesCount = 18;
let minesLocation = [];

let tilesClicked = 0;
let flagEnabled = false;
let gameOver = false;

// Переменные для таймера
let timerInterval = null;
let seconds = 0;
let gameStarted = false;

// Пути к картинкам персонажа
const IMG_NORMAL = "img/PATIK-0001.png"; // обычное состояние
const IMG_LOSE = "img/PATIK-0002.png";     // при проигрыше
const IMG_MINE = "img/mine.png";     // иконка мины (вместо эмодзи)
const IMG_FLAG = "img/flag.png";     // иконка флага

window.onload = function() {
    startGame();
}

function setMines() {
    minesLocation = [];
    let minesLeft = minesCount;
    while (minesLeft > 0) { 
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + "-" + c.toString();

        if (!minesLocation.includes(id)) {
            minesLocation.push(id);
            minesLeft -= 1;
        }
    }
}

function startGame() {
    // Останавливаем и сбрасываем таймер
    stopTimer();
    seconds = 0;
    gameStarted = false;
    updateTimerDisplay();

    // Возвращаем обычное лицо персонажу
    let faceImg = document.getElementById("face-img");
    if (faceImg) faceImg.src = IMG_NORMAL;

    // Очищаем поле
    let boardElement = document.getElementById("board");
    if (boardElement) boardElement.innerHTML = "";
    
    board = [];
    tilesClicked = 0;
    gameOver = false;

    // Счётчик мин
    let minesCountElem = document.getElementById("mines-count");
    if (minesCountElem) {
        minesCountElem.innerText = minesCount < 10 ? "00" + minesCount : "0" + minesCount;
    }

    setMines();

    // Генерация сетки
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("cell");
            
            tile.addEventListener("click", clickTile);
            tile.addEventListener("contextmenu", setFlagRightClick);

            boardElement.append(tile);
            row.push(tile);
        }
        board.push(row);
    }
}

function resetGame() {
    startGame();
}

/* Логика таймера */
function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(function() {
            seconds++;
            if (seconds > 999) seconds = 999;
            updateTimerDisplay();
        }, 1000);
    }
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function updateTimerDisplay() {
    let timerElem = document.getElementById("timer");
    if (timerElem) {
        if (seconds < 10) {
            timerElem.innerText = "00" + seconds;
        } else if (seconds < 100) {
            timerElem.innerText = "0" + seconds;
        } else {
            timerElem.innerText = seconds.toString();
        }
    }
}

/* Правый клик (флаг) */
function setFlagRightClick(e) {
    e.preventDefault();
    if (gameOver || this.classList.contains("tile-clicked")) return;

    // Запуск таймера при первом действии
    if (!gameStarted) {
        gameStarted = true;
        startTimer();
    }

    if (this.innerHTML === "") {
        let img = document.createElement("img");
        img.src = IMG_FLAG;
        img.style.width = "100%";
        img.style.height = "100%";
        this.appendChild(img);
    } else {
        this.innerHTML = "";
    }
}

/* Левый клик (открытие клетки) */
function clickTile() {
    if (gameOver || this.classList.contains("tile-clicked")) {
        return;
    }

    let tile = this;

    // Нельзя открыть клетку с флагом
    if (tile.innerHTML !== "") return;

    // Запуск таймера при первом клике
    if (!gameStarted) {
        gameStarted = true;
        startTimer();
    }

    // Проигрыш
    if (minesLocation.includes(tile.id)) {
        gameOver = true;
        stopTimer();
        
        // Меняем лицо на проигравшее
        let faceImg = document.getElementById("face-img");
        if (faceImg) faceImg.src = IMG_LOSE;

        revealMines();
        return;
    }

    let coords = tile.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    checkMine(r, c);
}

function revealMines() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = board[r][c];
            if (minesLocation.includes(tile.id)) {
                tile.innerHTML = "";
                let img = document.createElement("img");
                img.src = IMG_MINE;
                img.style.width = "100%";
                img.style.height = "100%";
                tile.appendChild(img);
                tile.style.backgroundColor = "#ff7373";                
            }
        }
    }
}

function checkMine(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) return;
    if (board[r][c].classList.contains("tile-clicked")) return;

    board[r][c].classList.add("tile-clicked");
    tilesClicked += 1;

    let minesFound = 0;

    minesFound += checkTile(r-1, c-1);
    minesFound += checkTile(r-1, c);
    minesFound += checkTile(r-1, c+1);
    minesFound += checkTile(r, c-1);
    minesFound += checkTile(r, c+1);
    minesFound += checkTile(r+1, c-1);
    minesFound += checkTile(r+1, c);
    minesFound += checkTile(r+1, c+1);

    if (minesFound > 0) {
        board[r][c].innerText = minesFound;
        board[r][c].classList.add("x" + minesFound.toString());
    } else {
        board[r][c].innerText = "";
        
        checkMine(r-1, c-1);
        checkMine(r-1, c);
        checkMine(r-1, c+1);
        checkMine(r, c-1);
        checkMine(r, c+1);
        checkMine(r+1, c-1);
        checkMine(r+1, c);
        checkMine(r+1, c+1);
    }

    // Победа
    if (tilesClicked === rows * columns - minesCount) {
        stopTimer();
        let minesCountElem = document.getElementById("mines-count");
        if (minesCountElem) minesCountElem.innerText = "WIN";
        gameOver = true;
    }
}

function checkTile(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) return 0;
    if (minesLocation.includes(r.toString() + "-" + c.toString())) return 1;
    return 0;
}