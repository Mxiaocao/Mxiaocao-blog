(function () {
  const config = {
    playlistId: "17739906691",
    server: "netease",
    api: "https://meting.mysqil.com/api"
  };

  const state = {
    tracks: [],
    index: 0,
    random: false,
    repeat: false,
    seeking: false,
    dragging: false,
    resizing: false
  };

  const positionStorageKey = "mx-music-player-position";
  const sizeStorageKey = "mx-music-player-size";
  const ids = {};
  let root;
  let audio;

  function endpoint(type, id) {
    return `${config.api}?server=${config.server}&type=${type}&id=${encodeURIComponent(id)}`;
  }

  function query(name) {
    return root.querySelector(`[data-mx="${name}"]`);
  }

  function fmt(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const rest = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${rest}`;
  }

  function artistOf(track) {
    if (Array.isArray(track.artist)) return track.artist.join(" / ");
    return track.artist || track.author || "Unknown Artist";
  }

  function titleOf(track) {
    return track.name || track.title || "Untitled";
  }

  function clampSize(width, panelHeight) {
    const margin = 10;
    const minWidth = Math.min(420, window.innerWidth - margin * 2);
    const maxWidth = Math.max(minWidth, window.innerWidth - margin * 2);
    const minPanelHeight = 260;
    const maxPanelHeight = Math.max(minPanelHeight, window.innerHeight - 118);
    return {
      width: Math.min(Math.max(width, minWidth), maxWidth),
      panelHeight: Math.min(Math.max(panelHeight, minPanelHeight), maxPanelHeight)
    };
  }

  function setSize(width, panelHeight, save) {
    const next = clampSize(width, panelHeight);
    root.style.width = `${next.width}px`;
    root.style.setProperty("--mx-panel-max-height", `${next.panelHeight}px`);
    if (save) {
      localStorage.setItem(sizeStorageKey, JSON.stringify(next));
    }

    const rect = root.getBoundingClientRect();
    if (root.style.transform === "none") {
      setPosition(rect.left, rect.top, false);
    }
  }

  function restoreSize() {
    try {
      const saved = JSON.parse(localStorage.getItem(sizeStorageKey) || "null");
      if (saved && Number.isFinite(saved.width) && Number.isFinite(saved.panelHeight)) {
        requestAnimationFrame(() => setSize(saved.width, saved.panelHeight, false));
      }
    } catch (error) {
      localStorage.removeItem(sizeStorageKey);
    }
  }

  function clampPosition(left, top) {
    const margin = 10;
    const rect = root.getBoundingClientRect();
    const maxLeft = Math.max(margin, window.innerWidth - rect.width - margin);
    const maxTop = Math.max(margin, window.innerHeight - rect.height - margin);
    return {
      left: Math.min(Math.max(left, margin), maxLeft),
      top: Math.min(Math.max(top, margin), maxTop)
    };
  }

  function setPosition(left, top, save) {
    const next = clampPosition(left, top);
    root.style.left = `${next.left}px`;
    root.style.top = `${next.top}px`;
    root.style.right = "auto";
    root.style.bottom = "auto";
    root.style.transform = "none";
    if (save) {
      localStorage.setItem(positionStorageKey, JSON.stringify(next));
    }
  }

  function restorePosition() {
    try {
      const saved = JSON.parse(localStorage.getItem(positionStorageKey) || "null");
      if (saved && Number.isFinite(saved.left) && Number.isFinite(saved.top)) {
        requestAnimationFrame(() => setPosition(saved.left, saved.top, false));
      }
    } catch (error) {
      localStorage.removeItem(positionStorageKey);
    }
  }

  function bindDrag() {
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;

    ids.drag.addEventListener("pointerdown", event => {
      const rect = root.getBoundingClientRect();
      state.dragging = true;
      startX = event.clientX;
      startY = event.clientY;
      startLeft = rect.left;
      startTop = rect.top;
      ids.drag.setPointerCapture(event.pointerId);
      root.classList.add("mx-dragging");
      event.preventDefault();
    });

    ids.drag.addEventListener("pointermove", event => {
      if (!state.dragging) return;
      setPosition(startLeft + event.clientX - startX, startTop + event.clientY - startY, false);
    });

    ids.drag.addEventListener("pointerup", event => {
      if (!state.dragging) return;
      state.dragging = false;
      ids.drag.releasePointerCapture(event.pointerId);
      root.classList.remove("mx-dragging");
      const rect = root.getBoundingClientRect();
      setPosition(rect.left, rect.top, true);
    });

    ids.drag.addEventListener("pointercancel", () => {
      state.dragging = false;
      root.classList.remove("mx-dragging");
    });

    window.addEventListener("resize", () => {
      const saved = JSON.parse(localStorage.getItem(positionStorageKey) || "null");
      const savedSize = JSON.parse(localStorage.getItem(sizeStorageKey) || "null");
      if (savedSize && Number.isFinite(savedSize.width) && Number.isFinite(savedSize.panelHeight)) {
        setSize(savedSize.width, savedSize.panelHeight, true);
      }
      if (saved && Number.isFinite(saved.left) && Number.isFinite(saved.top)) {
        setPosition(saved.left, saved.top, true);
      }
    });
  }

  function bindResize() {
    let startX = 0;
    let startY = 0;
    let startWidth = 0;
    let startPanelHeight = 0;

    ids.resize.addEventListener("pointerdown", event => {
      const rect = root.getBoundingClientRect();
      const panelRect = ids.panel.getBoundingClientRect();
      state.resizing = true;
      startX = event.clientX;
      startY = event.clientY;
      startWidth = rect.width;
      startPanelHeight = panelRect.height || Number.parseFloat(getComputedStyle(root).getPropertyValue("--mx-panel-max-height")) || 540;
      ids.resize.setPointerCapture(event.pointerId);
      root.classList.add("mx-resizing");
      event.preventDefault();
    });

    ids.resize.addEventListener("pointermove", event => {
      if (!state.resizing) return;
      setSize(startWidth + event.clientX - startX, startPanelHeight + startY - event.clientY, false);
    });

    ids.resize.addEventListener("pointerup", event => {
      if (!state.resizing) return;
      state.resizing = false;
      ids.resize.releasePointerCapture(event.pointerId);
      root.classList.remove("mx-resizing");
      const rect = root.getBoundingClientRect();
      const panelHeight = Number.parseFloat(getComputedStyle(root).getPropertyValue("--mx-panel-max-height")) || 540;
      setSize(rect.width, panelHeight, true);
    });

    ids.resize.addEventListener("pointercancel", () => {
      state.resizing = false;
      root.classList.remove("mx-resizing");
    });
  }

  function setPlayIcon(isPlaying) {
    const icon = isPlaying ? "❚❚" : "▶";
    ids.play.textContent = icon;
    ids.playLarge.textContent = icon;
    ids.play.title = isPlaying ? "暂停" : "播放";
    ids.playLarge.title = ids.play.title;
  }

  function renderList() {
    ids.list.innerHTML = "";
    state.tracks.forEach((track, index) => {
      const item = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      button.className = index === state.index ? "is-active" : "";
      button.innerHTML = `<span class="mx-index">${String(index + 1).padStart(2, "0")}</span><b>${titleOf(track)}</b><span>${artistOf(track)}</span>`;
      button.addEventListener("click", () => playTrack(index, true));
      item.appendChild(button);
      ids.list.appendChild(item);
    });
  }

  function setMeta(track) {
    const title = titleOf(track);
    const artist = artistOf(track);
    ids.title.textContent = title;
    ids.titleLarge.textContent = title;
    ids.artist.textContent = artist;
    ids.artistLarge.textContent = artist;
    ids.cover.src = track.pic || "";
    ids.coverLarge.src = track.pic || "";
    renderList();
  }

  async function resolveUrl(track) {
    if (track.playUrl) return track.playUrl;
    const source = track.url || (track.id ? endpoint("url", track.id) : "");
    if (!source) return "";

    if (!source.includes("type=url")) {
      track.playUrl = source;
      return track.playUrl;
    }

    const response = await fetch(source);
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("audio/")) {
      track.playUrl = response.url;
      return track.playUrl;
    }

    const data = await response.json();
    track.playUrl = Array.isArray(data) ? data[0]?.url : data?.url;
    return track.playUrl;
  }

  async function playTrack(nextIndex, autoplay) {
    if (!state.tracks.length) return;
    state.index = (nextIndex + state.tracks.length) % state.tracks.length;
    const track = state.tracks[state.index];
    setMeta(track);
    ids.title.textContent = `${titleOf(track)} - 加载音频...`;
    ids.artist.textContent = "加载音频中...";

    try {
      const url = await resolveUrl(track);
      if (!url) throw new Error("No audio url returned");
      audio.src = url;
      setMeta(track);
      if (autoplay) await audio.play();
    } catch (error) {
      console.error("[mx-player]", error);
      ids.artist.textContent = "这首暂时无法播放，已跳到下一首";
      window.setTimeout(() => playTrack(state.index + 1, autoplay), 700);
    }
  }

  function togglePlay() {
    if (!audio.src) {
      playTrack(state.index, true);
      return;
    }
    if (audio.paused) audio.play();
    else audio.pause();
  }

  function nextTrack() {
    const nextIndex = state.random ? Math.floor(Math.random() * state.tracks.length) : state.index + 1;
    playTrack(nextIndex, true);
  }

  function previousTrack() {
    playTrack(state.index - 1, true);
  }

  async function loadPlaylist() {
    try {
      const response = await fetch(endpoint("playlist", config.playlistId));
      state.tracks = await response.json();
      if (!Array.isArray(state.tracks) || !state.tracks.length) throw new Error("Empty playlist");
      await playTrack(0, false);
    } catch (error) {
      console.error("[mx-player]", error);
      ids.title.textContent = "歌单加载失败";
      ids.artist.textContent = "检查网络或 Meting 接口";
      ids.titleLarge.textContent = "歌单加载失败";
      ids.artistLarge.textContent = "检查网络或 Meting 接口";
    }
  }

  function bindEvents() {
    ids.play.addEventListener("click", togglePlay);
    ids.playLarge.addEventListener("click", togglePlay);
    ids.prev.addEventListener("click", previousTrack);
    ids.next.addEventListener("click", nextTrack);
    ids.shuffle.addEventListener("click", () => {
      state.random = !state.random;
      ids.shuffle.classList.toggle("is-active", state.random);
    });
    ids.repeat.addEventListener("click", () => {
      state.repeat = !state.repeat;
      ids.repeat.classList.toggle("is-active", state.repeat);
    });
    ids.toggle.addEventListener("click", () => {
      root.classList.toggle("mx-expanded");
      const expanded = root.classList.contains("mx-expanded");
      ids.panel.setAttribute("aria-hidden", String(!expanded));
      ids.toggle.textContent = expanded ? "⌄" : "⌃";
    });
    ids.hide.addEventListener("click", () => root.classList.add("mx-hidden"));
    ids.show.addEventListener("click", () => root.classList.remove("mx-hidden"));
    ids.volume.addEventListener("input", () => {
      audio.volume = Number(ids.volume.value);
    });
    ids.seek.addEventListener("input", () => {
      state.seeking = true;
    });
    ids.seek.addEventListener("change", () => {
      if (Number.isFinite(audio.duration)) {
        audio.currentTime = Number(ids.seek.value) / 100 * audio.duration;
      }
      state.seeking = false;
    });
    audio.addEventListener("play", () => setPlayIcon(true));
    audio.addEventListener("pause", () => setPlayIcon(false));
    audio.addEventListener("loadedmetadata", () => {
      ids.duration.textContent = fmt(audio.duration);
    });
    audio.addEventListener("timeupdate", () => {
      ids.current.textContent = fmt(audio.currentTime);
      if (!state.seeking && Number.isFinite(audio.duration)) {
        ids.seek.value = String(audio.currentTime / audio.duration * 100);
      }
    });
    audio.addEventListener("ended", () => {
      if (state.repeat) playTrack(state.index, true);
      else nextTrack();
    });
    bindDrag();
    bindResize();
  }

  function createPlayer() {
    if (document.getElementById("mx-music-player")) return;
    root = document.createElement("section");
    root.id = "mx-music-player";
    root.setAttribute("aria-label", "音乐播放器");
    root.innerHTML = `
      <button class="mx-show" data-mx="show" type="button" title="显示音乐播放器">♪</button>
      <div class="mx-panel" data-mx="panel" aria-hidden="true">
        <div class="mx-now">
          <img class="mx-cover-lg" data-mx="coverLarge" alt="专辑封面">
          <div>
            <p>Now Playing</p>
            <h2 data-mx="titleLarge">加载中...</h2>
            <span data-mx="artistLarge">正在获取歌单</span>
          </div>
        </div>
        <div class="mx-controls">
          <button class="mx-icon" data-mx="prev" type="button" title="上一首">⏮</button>
          <button class="mx-main" data-mx="playLarge" type="button" title="播放">▶</button>
          <button class="mx-icon" data-mx="next" type="button" title="下一首">⏭</button>
          <button class="mx-icon" data-mx="shuffle" type="button" title="随机播放">⤨</button>
          <button class="mx-icon" data-mx="repeat" type="button" title="循环播放">↻</button>
          <label class="mx-volume" title="音量">
            <span>🔊</span>
            <input data-mx="volume" type="range" min="0" max="1" step="0.01" value="0.75">
          </label>
        </div>
        <ol class="mx-list" data-mx="list"></ol>
      </div>
      <div class="mx-mini">
        <button class="mx-drag" data-mx="drag" type="button" title="拖动播放器" aria-label="拖动播放器">⋮⋮</button>
        <button class="mx-icon" data-mx="play" type="button" title="播放">▶</button>
        <div class="mx-track">
          <img class="mx-cover-sm" data-mx="cover" alt="">
          <div class="mx-meta">
            <strong data-mx="title">加载中...</strong>
            <span data-mx="artist">正在获取歌单</span>
          </div>
        </div>
        <div class="mx-progress">
          <span class="mx-time" data-mx="current">0:00</span>
          <input data-mx="seek" type="range" min="0" max="100" value="0">
          <span class="mx-time" data-mx="duration">0:00</span>
        </div>
        <button class="mx-icon" data-mx="toggle" type="button" title="展开音乐播放器">⌃</button>
        <button class="mx-icon" data-mx="hide" type="button" title="隐藏音乐播放器">×</button>
        <button class="mx-resize" data-mx="resize" type="button" title="调整播放器大小" aria-label="调整播放器大小"></button>
      </div>
      <audio data-mx="audio" preload="metadata"></audio>
    `;
    document.body.appendChild(root);

    [
      "show", "panel", "coverLarge", "titleLarge", "artistLarge", "prev", "playLarge",
      "next", "shuffle", "repeat", "volume", "list", "play", "cover", "title",
      "artist", "current", "seek", "duration", "toggle", "hide", "drag", "resize"
    ].forEach(name => {
      ids[name] = query(name);
    });
    audio = query("audio");
    audio.volume = Number(ids.volume.value);
    restoreSize();
    restorePosition();
    bindEvents();
    loadPlaylist();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createPlayer, { once: true });
  } else {
    createPlayer();
  }
})();
