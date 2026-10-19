<?php
$pageTitle = 'PATARTIST — portfolio';
$portfolio = [
    ['title'=>'Персонажи', 'category'=>'character', 'image'=>'img/portfolio/work1.jpg', 'description'=>'Здесь можно разместить дизайн персонажа.'],
    ['title'=>'Иллюстрации', 'category'=>'illustration', 'image'=>'img/portfolio/work2.jpg', 'description'=>'Место для авторских иллюстраций.'],
    ['title'=>'Веб-дизайн', 'category'=>'web', 'image'=>'img/portfolio/work3.jpg', 'description'=>'Макеты сайтов и учебные веб-проекты.'],
    ['title'=>'Презентации', 'category'=>'design', 'image'=>'img/portfolio/work4.jpg', 'description'=>'Баннеры и презентационные материалы.'],
    ['title'=>'Скетчи', 'category'=>'sketch', 'image'=>'img/portfolio/work5.jpg', 'description'=>'Эскизы и процесс создания.'],
    ['title'=>'Другие работы', 'category'=>'other', 'image'=>'img/portfolio/work6.jpg', 'description'=>'Дополнительные проекты.']
];
?>
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= htmlspecialchars($pageTitle) ?></title>
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="portfolio.css">
</head>
<body>
  <main class="main-content">
    <div class="search-container">
      <input type="text" placeholder="search" class="search-input" id="portfolioSearch">
      <svg class="search-icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/></svg>
    </div>

    <div class="modal-window">
      <div class="modal-header"><span class="close-icon">ⓧ</span></div>
      <div class="modal-body">
        <p class="welcome-text">Welcome to my website!</p>
        <p class="intro-text">PATARTIST / graphic design / illustration / web</p>

        <section class="portfolio-section" id="portfolio">
          <div class="section-heading">
            <span>MY WORKS</span><small>portfolio.php</small>
          </div>
          <div class="portfolio-grid" id="portfolioGrid">
            <?php foreach ($portfolio as $work): ?>
              <article class="portfolio-card" data-title="<?= htmlspecialchars(mb_strtolower($work['title'])) ?>" data-category="<?= htmlspecialchars($work['category']) ?>">
                <div class="image-cell">
                  <img src="<?= htmlspecialchars($work['image']) ?>" alt="<?= htmlspecialchars($work['title']) ?>"
                       onerror="this.style.display='none'; this.parentElement.classList.add('empty-image');">
                  <span class="image-placeholder">IMAGE<br>HERE</span>
                </div>
                <div class="portfolio-info">
                  <h3><?= htmlspecialchars($work['title']) ?></h3>
                  <p><?= htmlspecialchars($work['description']) ?></p>
                </div>
              </article>
            <?php endforeach; ?>
          </div>
        </section>

        <section class="about-section">
          <div class="section-heading"><span>ABOUT ME</span><small>about.php</small></div>
          <p>Графический дизайнер и иллюстратор. Здесь можно рассказать о себе, своих навыках и проектах.</p>
          <div class="skills"><span>ILLUSTRATOR</span><span>INDESIGN</span><span>FIGMA</span><span>HTML</span><span>CSS</span><span>JAVASCRIPT</span><span>PHP</span></div>
        </section>

        <section class="contact-section">
          <div class="section-heading"><span>CONTACT</span><small>contact.php</small></div>
          <form action="contact.php" method="post" class="contact-form">
            <input type="text" name="name" placeholder="Your name" required>
            <input type="email" name="email" placeholder="Your email" required>
            <textarea name="message" placeholder="Message" rows="4" required></textarea>
            <button type="submit">SEND MESSAGE</button>
          </form>
        </section>

        <br>
        <button class="icon-open" onclick="openPopup()">
          <img class="icon" src="img/mine2.png" id="mine-img" alt="Minesweeper">
        </button>

        <div class="popup" id="popup">
          <div class="popup-header">
            <button class="close" onclick="closePopup()">ⓧ</button>
            <span class="popup-title">minesweeper.exe</span>
          </div>
          <div class="popup-content">
            <div class="minesweeper-box">
              <div class="game-status">
                <div class="counter" id="mines-count">018</div>
                <button class="face-btn" id="reset-btn" onclick="resetGame()"><img src="img/PATIK-0001.png" alt="Status" id="face-img"></button>
                <div class="counter" id="timer">000</div>
              </div>
              <div class="game-board" id="board"></div>
              <form class="score-form" id="scoreForm">
                <input type="text" id="playerName" placeholder="Your name" maxlength="30" required>
                <button type="submit">SAVE SCORE</button>
              </form>
              <div id="scoreMessage"></div>
              <a class="records-link" href="records.php" target="_blank">VIEW RECORDS</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <div class="wave-container">
    <svg class="waves-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none">
      <defs><path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" /></defs>
      <g class="parallax"><use href="#gentle-wave" x="48" y="0" fill="rgba(203,220,243,.7)"/><use href="#gentle-wave" x="48" y="3" fill="rgba(203,220,243,.5)"/><use href="#gentle-wave" x="48" y="5" fill="rgba(203,220,243,.3)"/><use href="#gentle-wave" x="48" y="7" fill="#cbdcf3"/></g>
    </svg>
  </div>

  <footer class="footer">© 2026 PATARTIST. Все права защищены.</footer>
  <svg class="string-svg"><line id="line1" class="string-line"/><line id="line2" class="string-line"/></svg>
  <div id="shell" class="keychain-item"><img src="img/sea-0001.png" id="shell-img" alt="Shell"></div>
  <div id="bunny" class="keychain-item"><img src="img/jellyfish-0001.png" id="bunny-img" alt="Bunny"></div>

<script src="sscript.js"></script>
<script>
// Поиск по портфолио
const searchInput = document.getElementById('portfolioSearch');
searchInput?.addEventListener('input', function () {
  const query = this.value.toLowerCase().trim();
  document.querySelectorAll('.portfolio-card').forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(query) ? '' : 'none';
  });
});

// Сохранение результата Сапёра через PHP
const scoreForm = document.getElementById('scoreForm');
scoreForm?.addEventListener('submit', async function(e) {
  e.preventDefault();
  const message = document.getElementById('scoreMessage');
  const player = document.getElementById('playerName').value.trim();
  if (!player || !window.gameOver) {
    message.textContent = 'Сначала выиграй игру!';
    return;
  }
  const response = await fetch('save_score.php', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({player: player, time: window.seconds || 0})
  });
  const data = await response.json();
  message.textContent = data.message;
});
</script>
</body>
</html>
