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