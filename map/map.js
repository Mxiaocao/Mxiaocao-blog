(function () {
  var config = window.MXIAOCAO_MAP_CONFIG || {};
  var places = [
    {
      id: "west-lake",
      name: "西湖",
      date: "2026-01-01",
      coord: [120.1489, 30.2462],
      description: "元旦下午沿湖走了一段，适合放西湖边的照片。",
      photos: ["/img/1.jpg", "/img/3.png"],
      tags: ["杭州", "西湖", "元旦"]
    },
    {
      id: "lingyin",
      name: "灵隐寺",
      date: "2025-09-21",
      coord: [120.101406,30.240826],
      description: "路线西侧的停留点，可以记录寺院、山路和树影。",
      photos: ["/img/lingyin-01.jpg", "/img/lingyin-02.jpg", "/img/lingyin-03.jpg", "/img/lingyin-04.jpg", "/img/lingyin-05.jpg", "/img/lingyin-06.jpg", "/img/lingyin-07.jpg", "/img/lingyin-08.jpg"],
      tags: ["杭州", "灵隐", "元旦"]
    },
    {
      id: "xiaohe",
      name: "小河直街",
      date: "2026-01-01",
      coord: [120.1403, 30.3201],
      description: "适合放街区、河道、夜景或者随手拍。",
      photos: ["/img/6.png", "/img/7.png"],
      tags: ["杭州", "街区", "元旦"]
    },
    {
      id: "qiantang",
      name: "钱塘江城市阳台",
      date: "2026-01-02",
      coord: [120.216803,30.241827],
      description: "江景和城市天际线照片可以放在这里。",
      photos: ["/img/qiantang-01.jpg", "/img/qiantang-02.jpg"],
      tags: ["杭州", "江景"]
    },
    {
      id: "east-station",
      name: "杭州东站",
      date: "2026-01-01",
      coord: [120.2122, 30.2916],
      description: "路线起点示例，后续可以换成真实出发点。",
      photos: ["/img/10.png"],
      tags: ["杭州", "交通", "元旦"]
    }
  ];

  var routes = [
    {
      id: "new-year-hangzhou",
      title: "元旦杭州路线",
      date: "2026-01-01",
      placeIds: ["east-station", "west-lake", "lingyin", "xiaohe"]
    },
    {
      id: "river-walk",
      title: "钱塘江散步路线",
      date: "2026-01-02",
      placeIds: ["west-lake", "qiantang"]
    }
  ];

  var els = {
    empty: document.getElementById("mapEmptyState"),
    placeCount: document.getElementById("mapPlaceCount"),
    placeList: document.getElementById("placeList"),
    routeList: document.getElementById("routeList"),
    placeSection: document.getElementById("placeSection"),
    routeSection: document.getElementById("routeSection"),
    tagFilter: document.getElementById("mapTagFilter"),
    yearFilter: document.getElementById("mapYearFilter"),
    playBtn: document.getElementById("routePlayBtn"),
    resetBtn: document.getElementById("routeResetBtn")
  };

  var map = null;
  var infoWindow = null;
  var markers = {};
  var routeLine = null;
  var activeRouteId = routes[0].id;
  var routeTimer = null;

  function byId(id) {
    return places.find(function (place) { return place.id === id; });
  }

  function uniq(list) {
    return Array.from(new Set(list));
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;" })[char];
    });
  }

  function getFilteredPlaces() {
    var tag = els.tagFilter.value;
    var year = els.yearFilter.value;
    return places.filter(function (place) {
      var tagOk = tag === "all" || place.tags.indexOf(tag) !== -1;
      var yearOk = year === "all" || place.date.slice(0, 4) === year;
      return tagOk && yearOk;
    });
  }

  function renderFilters() {
    var tags = uniq(places.reduce(function (all, place) { return all.concat(place.tags); }, [])).sort();
    var years = uniq(places.map(function (place) { return place.date.slice(0, 4); })).sort().reverse();
    els.tagFilter.innerHTML = '<option value="all">全部标签</option>' + tags.map(function (tag) {
      return '<option value="' + escapeHtml(tag) + '">' + escapeHtml(tag) + '</option>';
    }).join("");
    els.yearFilter.innerHTML = '<option value="all">全部年份</option>' + years.map(function (year) {
      return '<option value="' + escapeHtml(year) + '">' + escapeHtml(year) + '</option>';
    }).join("");
  }

  function placeCard(place) {
    return '<article class="place-item" data-place-id="' + escapeHtml(place.id) + '">' +
      '<h3>' + escapeHtml(place.name) + '</h3>' +
      '<div class="place-meta"><span>' + escapeHtml(place.date) + '</span><span>' + place.photos.length + ' 张照片</span></div>' +
      '<div class="place-tags">' + place.tags.map(function (tag) { return '<span>' + escapeHtml(tag) + '</span>'; }).join("") + '</div>' +
      '</article>';
  }

  function routeCard(route) {
    var stops = route.placeIds.map(byId).filter(Boolean);
    return '<article class="route-item' + (route.id === activeRouteId ? ' active' : '') + '" data-route-id="' + escapeHtml(route.id) + '">' +
      '<h3>' + escapeHtml(route.title) + '</h3>' +
      '<div class="route-meta"><span>' + escapeHtml(route.date) + '</span><span>' + stops.length + ' 个地点</span></div>' +
      '</article>';
  }

  function renderLists() {
    var filtered = getFilteredPlaces();
    els.placeCount.textContent = filtered.length;
    els.placeList.innerHTML = filtered.map(placeCard).join("");
    els.routeList.innerHTML = routes.map(routeCard).join("");
    syncMarkers(filtered);
  }

  function showPlace(place) {
    if (map) {
      map.setZoomAndCenter(Math.max(map.getZoom(), 14), place.coord);
      if (infoWindow) infoWindow.open(map, place.coord);
      if (infoWindow) infoWindow.setContent(infoContent(place));
    }
  }

  function infoContent(place) {
    return '<div class="amap-photo-window">' +
      '<h3>' + escapeHtml(place.name) + '</h3>' +
      '<p>' + escapeHtml(place.date) + ' · ' + escapeHtml(place.description) + '</p>' +
      '<div class="amap-photo-grid">' + place.photos.map(function (src) {
        return '<div class="amap-photo-link"><img src="' + escapeHtml(src) + '" alt="' + escapeHtml(place.name) + '" data-lightbox-src="' + escapeHtml(src) + '"></div>';
      }).join("") + '</div>' +
      '</div>';
  }

  document.addEventListener('click', function (e) {
    var img = e.target.closest('.amap-photo-link img');
    if (!img) return;
    var src = img.getAttribute('data-lightbox-src');
    if (!src) return;
    var overlay = document.getElementById('map-lightbox');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'map-lightbox';
      overlay.className = 'map-lightbox';
      overlay.innerHTML = '<div class="map-lightbox-bg"></div><img class="map-lightbox-img" src=""><button class="map-lightbox-close">&times;</button>';
      document.body.appendChild(overlay);
      overlay.querySelector('.map-lightbox-bg').addEventListener('click', function () { overlay.classList.remove('map-lightbox--visible'); });
      overlay.querySelector('.map-lightbox-close').addEventListener('click', function () { overlay.classList.remove('map-lightbox--visible'); });
    }
    overlay.querySelector('.map-lightbox-img').src = src;
    overlay.classList.add('map-lightbox--visible');
    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape') {
        overlay.classList.remove('map-lightbox--visible');
        document.removeEventListener('keydown', escHandler);
      }
    });
  });

  function syncMarkers(visiblePlaces) {
    if (!map || !window.AMap) return;
    var visibleIds = visiblePlaces.map(function (place) { return place.id; });
    places.forEach(function (place) {
      if (!markers[place.id]) {
        var marker = new AMap.Marker({
          position: place.coord,
          title: place.name,
          anchor: "bottom-center"
        });
        marker.on("click", function () {
          infoWindow.setContent(infoContent(place));
          infoWindow.open(map, place.coord);
        });
        markers[place.id] = marker;
      }
      if (visibleIds.indexOf(place.id) !== -1) {
        map.add(markers[place.id]);
      } else {
        map.remove(markers[place.id]);
      }
    });
  }

  function resetRoute() {
    if (routeTimer) window.clearInterval(routeTimer);
    routeTimer = null;
    els.playBtn.innerHTML = '<i class="fas fa-play"></i> 播放路线';
    if (map && routeLine) {
      var center = config.center || [120.1551, 30.2741];
      routeLine.setOptions({ strokeOpacity: 0 });
      routeLine.setPath([center, center]);
    }
  }

  // Fetch walking path between adjacent stops
  function fetchSegmentPath(fromCoord, toCoord) {
    return new Promise(function (resolve) {
      var walking = new AMap.Walking({ map: map, hideMarkers: true });
      walking.search(fromCoord, toCoord, function (status, result) {
        if (status === 'complete' && result.routes && result.routes.length > 0) {
          var path = [];
          result.routes[0].steps.forEach(function (step) {
            step.path.forEach(function (p) { path.push(p); });
          });
          resolve(path);
        } else {
          // Fallback: straight line if walking fails
          resolve([
            [fromCoord[0], fromCoord[1]],
            [toCoord[0], toCoord[1]]
          ]);
        }
      });
    });
  }

  // Build full route path from walking directions
  function buildRoutePath(stops) {
    return new Promise(function (resolve) {
      var fullPath = [];
      var pending = stops.length - 1;
      if (pending <= 0) { resolve(fullPath); return; }

      for (var i = 0; i < stops.length - 1; i++) {
        fetchSegmentPath(stops[i].coord, stops[i + 1].coord).then(function (segPath) {
          fullPath.push(segPath);
          pending--;
          if (pending === 0) {
            // Flatten and deduplicate adjacent points
            var flat = [];
            fullPath.forEach(function (seg) {
              seg.forEach(function (p) {
                if (flat.length === 0 ||
                    flat[flat.length - 1][0] !== p[0] ||
                    flat[flat.length - 1][1] !== p[1]) {
                  flat.push(p);
                }
              });
            });
            resolve(flat);
          }
        });
      }
    });
  }

  function playRoute() {
    if (!map || !window.AMap) return;
    resetRoute();
    var route = routes.find(function (item) { return item.id === activeRouteId; });
    if (!route) return;
    var stops = route.placeIds.map(byId).filter(Boolean);
    if (stops.length < 2) return;

    els.playBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> 规划路线...';
    buildRoutePath(stops).then(function (animatedPath) {
      if (animatedPath.length < 2) {
        els.playBtn.innerHTML = '<i class="fas fa-play"></i> 播放路线';
        return;
      }
      var current = 1;
      routeLine.setOptions({ strokeOpacity: 0.92 });
      routeLine.setPath([animatedPath[0]]);
      map.setZoomAndCenter(Math.max(map.getZoom(), 12), stops[0].coord);
      els.playBtn.innerHTML = '<i class="fas fa-pause"></i> 播放中';

      routeTimer = window.setInterval(function () {
        current += 1;
        routeLine.setPath(animatedPath.slice(0, current));
        if (current % 16 === 0) map.panTo(animatedPath[current - 1]);
        if (current >= animatedPath.length) {
          window.clearInterval(routeTimer);
          routeTimer = null;
          els.playBtn.innerHTML = '<i class="fas fa-play"></i> 重新播放';
          var last = stops[stops.length - 1];
          infoWindow.setContent(infoContent(last));
          infoWindow.open(map, last.coord);
        }
      }, 55);
    });
  }

  function bindEvents() {
    document.querySelectorAll("[data-map-mode]").forEach(function (button) {
      button.addEventListener("click", function () {
        document.querySelectorAll("[data-map-mode]").forEach(function (btn) { btn.classList.remove("active"); });
        button.classList.add("active");
        var showRoutes = button.dataset.mapMode === "routes";
        els.placeSection.classList.toggle("hidden", showRoutes);
        els.routeSection.classList.toggle("hidden", !showRoutes);
      });
    });

    els.placeList.addEventListener("click", function (event) {
      var item = event.target.closest("[data-place-id]");
      if (!item) return;
      var place = byId(item.dataset.placeId);
      if (place) showPlace(place);
    });

    els.routeList.addEventListener("click", function (event) {
      var item = event.target.closest("[data-route-id]");
      if (!item) return;
      activeRouteId = item.dataset.routeId;
      resetRoute();
      renderLists();
    });

    els.tagFilter.addEventListener("change", renderLists);
    els.yearFilter.addEventListener("change", renderLists);
    els.playBtn.addEventListener("click", playRoute);
    els.resetBtn.addEventListener("click", resetRoute);
  }

  function loadAmap() {
    return new Promise(function (resolve, reject) {
      if (!config.amapKey) {
        reject(new Error("missing amap key"));
        return;
      }
      if (config.securityJsCode) {
        window._AMapSecurityConfig = { securityJsCode: config.securityJsCode };
      }
      var script = document.createElement("script");
      script.src = "https://webapi.amap.com/maps?v=2.0&key=" + encodeURIComponent(config.amapKey);
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function initMap() {
    map = new AMap.Map("amapContainer", {
      zoom: config.zoom || 12,
      center: config.center || [120.1551, 30.2741],
      viewMode: "2D",
      resizeEnable: true
    });
    AMap.plugin(["AMap.Scale", "AMap.ToolBar"], function () {
      map.addControl(new AMap.Scale());
      map.addControl(new AMap.ToolBar({ position: "RB" }));
    });
    infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -28) });
    routeLine = new AMap.Polyline({
      path: [config.center || [120.1551, 30.2741], config.center || [120.1551, 30.2741]],
      strokeColor: "#e94560",
      strokeWeight: 6,
      strokeOpacity: 0,
      lineJoin: "round",
      lineCap: "round",
      showDir: true
    });
    map.add(routeLine);
    els.empty.classList.add("hidden");
    renderLists();
  }

  renderFilters();
  bindEvents();
  renderLists();
  loadAmap().then(initMap).catch(function () {
    els.empty.classList.remove("hidden");
  });
})();
