console.log('[Pio] Script loaded');

if (window.innerWidth < 769) {
  console.log('[Pio] Mobile, skipped');
} else {
  var checkCount = 0;
  var checkInterval = setInterval(function() {
    checkCount++;
    var hasCore = typeof Live2DCubismCore !== 'undefined';
    var hasPixi = typeof PIXI !== 'undefined';
    var hasPLD = typeof PIXI.live2d !== 'undefined' && PIXI.live2d.Live2DModel;

    if (hasCore && hasPixi && hasPLD) {
      clearInterval(checkInterval);
      console.log('[Pio] All deps ready, initializing...');
      initPio(PIXI.live2d.Live2DModel, PIXI);
    } else if (checkCount > 60) {
      clearInterval(checkInterval);
      console.error('[Pio] Timeout. Core=' + hasCore + ' Pixi=' + hasPixi + ' PLD=' + hasPLD);
    }
  }, 100);
}

function initPio(Live2DModel, PIXI) {
  var container = document.createElement('div');
  container.id = 'pio-container';
  container.style.cssText = 'position:fixed;right:30px;bottom:0;width:280px;height:500px;z-index:52;pointer-events:none;';
  document.body.appendChild(container);

  var inner = document.createElement('div');
  inner.style.cssText = 'width:100%;height:100%;pointer-events:auto;';
  container.appendChild(inner);

  var app = new PIXI.Application({
    width: 280, height: 500,
    backgroundAlpha: 0,
    antialias: true,
    resolution: window.devicePixelRatio || 2,
    autoDensity: true,
  });
  inner.appendChild(app.view);
  app.view.style.cssText = 'width:100%;height:100%;cursor:grab;';
  console.log('[Pio] Pixi app created');

  Live2DModel.from('/pio/UG/ugofficial.model3.json').then(function(model) {
    console.log('[Pio] Model loaded');

    app.stage.addChild(model);

    var s = Math.min(
      app.screen.width / model.width * 0.85,
      app.screen.height / model.height * 0.85
    );
    model.scale.set(s);
    model.x = app.screen.width / 2;
    model.y = app.screen.height / 2;
    model.anchor.set(0.5, 0.5);

    // Enable all automatic interactions
    model.autoInteract = true;
    model.interactive = true;

    // ---- Mouse tracking (look at cursor) ----
    var mouseX = app.screen.width / 2, mouseY = app.screen.height / 2;
    var targetMouseX = mouseX, targetMouseY = mouseY;

    document.addEventListener('mousemove', function(e) {
      var r = app.view.getBoundingClientRect();
      targetMouseX = e.clientX - r.left;
      targetMouseY = e.clientY - r.top;
    });

    // Smooth mouse follow
    app.ticker.add(function() {
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      if (model.pointerX !== undefined) {
        model.pointerX = mouseX / app.screen.width * 2 - 1;
        model.pointerY = mouseY / app.screen.height * 2 - 1;
      }
    });

    // ---- Random idle motions ----
    var motionGroups = [];
    try {
      var mm = model.internalModel.motionManager;
      var defs = mm.definitions;
      motionGroups = Object.keys(defs).filter(function(k) {
        return defs[k] && defs[k].length > 0;
      });
    } catch(e) {
      console.log('[Pio] No motions found');
    }

    function playRandomMotion() {
      if (motionGroups.length === 0) return;
      var g = motionGroups[Math.floor(Math.random() * motionGroups.length)];
      try {
        model.motion(g, undefined, PIXI.live2d.MotionPriority.IDLE);
      } catch(e) {}
    }

    function playTapMotion() {
      if (motionGroups.length === 0) return;
      var g = motionGroups[Math.floor(Math.random() * motionGroups.length)];
      try {
        model.motion(g, undefined, PIXI.live2d.MotionPriority.NORMAL);
      } catch(e) {}
    }

    // Random idle every 8-15 seconds
    function scheduleIdle() {
      var delay = 8000 + Math.random() * 7000;
      setTimeout(function() {
        playRandomMotion();
        scheduleIdle();
      }, delay);
    }
    scheduleIdle();

    // ---- Drag ----
    var dragging = false, sx = 0, sy = 0, cx = 0, cy = 0;
    var dragStarted = false;
    var DRAG_THRESHOLD = 5;

    app.view.addEventListener('pointerdown', function(e) {
      sx = e.clientX; sy = e.clientY;
      var r = container.getBoundingClientRect();
      cx = r.left; cy = r.top;
      dragging = true;
      dragStarted = false;
    });

    window.addEventListener('pointermove', function(e) {
      if (!dragging) return;
      var dx = e.clientX - sx, dy = e.clientY - sy;
      if (!dragStarted && Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
      dragStarted = true;
      app.view.style.cursor = 'grabbing';
      container.style.right = 'auto'; container.style.bottom = 'auto';
      container.style.left = (cx + dx) + 'px';
      container.style.top = (cy + dy) + 'px';
    });

    window.addEventListener('pointerup', function(e) {
      if (!dragging) return;
      dragging = false;
      app.view.style.cursor = 'grab';

      if (!dragStarted) {
        // It's a tap, not a drag
        e.stopPropagation();
        if (expressions.length > 0) {
          var exp = expressions[Math.floor(Math.random() * expressions.length)];
          try { model.expression(exp); } catch(e) {}
        }
        playTapMotion();
      }
    });

    // ---- Expressions ----
    var expressions = [];
    try {
      var em = model.internalModel.motionManager.expressionManager;
      expressions = em.definitions.map(function(d) { return d.name; });
    } catch(e) {}

    console.log('[Pio] Widget ready! Motions=' + motionGroups.length + ' Exps=' + expressions.length);
  }).catch(function(err) {
    console.error('[Pio] Model load error:', err);
  });
}
