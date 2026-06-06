(function () {
  var config = window.MXIAOCAO_MAP_CONFIG || {};
  var places = [
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
      id: "longxiangqiao-station",
      name: "龙翔桥地铁站出入口",
      kind: "transit",
      coord: [120.164434,30.253826],
      description: "湖滨一带的起点，出站后就能往西湖边走。",
      photos: [],
      tags: ["杭州", "交通"]
    },
    {
      id: "xiaohe",
      name: "小河直街",
      date: "2026-01-01",
      coord: [120.1403, 30.3201],
      description: "适合放街区、河道、夜景或者随手拍。",
      photos: ["/img/xiaohe-01.jpg", "/img/xiaohe-02.jpg", "/img/xiaohe-03.jpg", "/img/xiaohe-04.jpg", "/img/xiaohe-05.jpg", "/img/xiaohe-06.jpg", "/img/xiaohe-07.jpg"],
      tags: ["杭州", "街区", "元旦"]
    },
    {
      id: "dadou-road",
      name: "大兜路历史文化街区",
      date: "2026-06-06",
      coord: [120.148, 30.321],
      description: "运河边的文艺街区，咖啡馆与老墙门共存。",
      photos: ["/img/dadou-01.jpg", "/img/dadou-02.jpg", "/img/dadou-03.jpg", "/img/dadou-04.jpg", "/img/dadou-05.jpg", "/img/dadou-06.jpg", "/img/dadou-07.jpg", "/img/dadou-08.jpg"],
      tags: ["杭州", "街区", "运河"]
    },
    {
      id: "gongchenqiao",
      name: "拱宸桥西历史文化街区",
      date: "2026-06-06",
      coord: [120.138, 30.326],
      description: "拱宸桥畔，老杭州的运河记忆。",
      photos: ["/img/gongchenqiao-01.jpg", "/img/gongchenqiao-02.jpg", "/img/gongchenqiao-03.jpg", "/img/gongchenqiao-04.jpg", "/img/gongchenqiao-05.jpg", "/img/gongchenqiao-06.jpg", "/img/gongchenqiao-07.jpg", "/img/gongchenqiao-08.jpg", "/img/gongchenqiao-09.jpg", "/img/gongchenqiao-10.jpg", "/img/gongchenqiao-11.jpg", "/img/gongchenqiao-12.jpg"],
      tags: ["杭州", "街区", "运河"]
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
      id: "hupao",
      name: "虎跑公园",
      date: "2026-05-19",
      coord: [120.1299,30.208087],
      description: "虎跑泉水清冽，林深苔滑，适合记录山径、石阶与光影。",
      photos: ["/img/hupao-01.jpg", "/img/hupao-02.jpg", "/img/hupao-03.jpg", "/img/hupao-04.jpg", "/img/hupao-05.jpg", "/img/hupao-06.jpg", "/img/hupao-07.jpg", "/img/hupao-08.jpg", "/img/hupao-09.jpg", "/img/hupao-10.jpg", "/img/hupao-11.jpg", "/img/hupao-12.jpg"],
      tags: ["杭州", "虎跑", "山林"]
    },
    {
      id: "jixian-pavilion",
      name: "集贤亭",
      date: "2026-01-01",
      coord: [120.161722,30.250628],
      description: "湖心小亭，烟雨朦胧时最美。",
      photos: ["/img/jixian-01.jpg"],
      tags: ["杭州", "西湖"]
    },
    {
      id: "yongjin-park",
      name: "涌金公园",
      date: "2026-01-01",
      coord: [120.160139,30.245915],
      description: "涌金门外柳如烟，西湖东岸的安静角落。",
      photos: [],
      tags: ["杭州", "西湖", "公园"]
    },
    {
      id: "silk-museum",
      name: "中国丝绸博物馆",
      date: "2026-01-01",
      coord: [120.151292,30.22287],
      description: "馆藏丰富，建筑本身也是一件展品。",
      photos: [],
      tags: ["杭州", "博物馆"]
    },
    {
      id: "taiziwan",
      name: "太子湾",
      date: "2026-01-01",
      coord: [120.142177,30.22547],
      description: "春天的郁金香海。",
      photos: ["/img/taiziwan-01.jpg", "/img/taiziwan-02.jpg"],
      tags: ["杭州", "公园"],
      visits: [
        {
          date: "2026-04-06",
          description: "清明再访，郁金香满园盛放。",
          photos: [
            "/img/taiziwan-20260406-01.jpg",
            "/img/taiziwan-20260406-02.jpg",
            "/img/taiziwan-20260406-03.jpg",
            "/img/taiziwan-20260406-04.jpg",
            "/img/taiziwan-20260406-05.jpg",
            "/img/taiziwan-20260406-06.jpg",
            "/img/taiziwan-20260406-07.jpg",
            "/img/taiziwan-20260406-08.jpg",
            "/img/taiziwan-20260406-09.jpg",
            "/img/taiziwan-20260406-10.jpg",
            "/img/taiziwan-20260406-11.jpg"
          ]
        }
      ]
    },
    {
      id: "huagang-guanyu",
      name: "花港观鱼",
      date: "2026-01-01",
      coord: [120.139095,30.230233],
      description: "红鲤成群，西湖十景之一。",
      photos: [],
      tags: ["杭州", "西湖", "十景"]
    },
    {
      id: "sudi",
      name: "苏堤",
      date: "2026-01-01",
      coord: [120.138156,30.243911],
      description: "六桥烟柳，春晓最动人。",
      photos: [],
      tags: ["杭州", "西湖", "十景"]
    },
    {
      id: "quyuan-fenghe",
      name: "曲院风荷",
      date: "2026-01-01",
      coord: [120.133333,30.249287],
      description: "夏日荷风，西湖十景之一。",
      photos: [],
      tags: ["杭州", "西湖", "十景"]
    },
    {
      id: "best-corner",
      name: "西湖最美转角",
      date: "2026-01-01",
      coord: [120.138814,30.250405],
      description: "北山街转角望湖。",
      photos: [],
      tags: ["杭州", "西湖"]
    },
    {
      id: "pinghu-qiuyue",
      name: "平湖秋月",
      date: "2026-01-01",
      coord: [120.146142,30.252244],
      description: "月夜湖面如镜。",
      photos: [],
      tags: ["杭州", "西湖", "十景"]
    },
    {
      id: "baidi",
      name: "白堤",
      date: "2026-01-01",
      coord: [120.149189,30.255701],
      description: "一株杨柳一株桃。",
      photos: [],
      tags: ["杭州", "西湖"]
    },
    {
      id: "wulin-night",
      name: "杭州武林夜市",
      date: "2026-06-06",
      coord: [120.159572,30.261664],
      description: "人间烟火，小吃与手作交织。",
      photos: [],
      tags: ["杭州", "夜市"]
    },
    {
      id: "guo-zhuang",
      name: "郭庄",
      date: "2026-01-01",
      coord: [120.132267,30.243918],
      description: "西湖边的古典私家园林，一步一景。",
      photos: [],
      tags: ["杭州", "西湖", "园林"]
    },
    {
      id: "jingci-temple",
      name: "南屏晚钟（净慈寺）",
      date: "2026-01-01",
      coord: [120.149165,30.228643],
      description: "南屏晚钟，千年古刹。",
      photos: [],
      tags: ["杭州", "寺庙", "十景"]
    },
    {
      id: "shenzhou-base",
      name: "神州基地",
      date: "2026-01-01",
      coord: [120.133221,30.240751],
      description: "杨公堤畔，日出摄影的隐秘角落。",
      photos: [],
      tags: ["杭州", "西湖", "日出"]
    },
    {
      id: "maojiabu",
      name: "茅家埠",
      date: "2026-01-01",
      coord: [120.125404,30.238325],
      description: "湿地风光，芦苇荡与茶田交错。",
      photos: [],
      tags: ["杭州", "西湖", "湿地"]
    },
    {
      id: "liulang-wenying",
      name: "柳浪闻莺",
      date: "2026-01-01",
      coord: [120.156326,30.240389],
      description: "西湖十景之一，柳丝如浪，莺啼婉转。",
      photos: [],
      tags: ["杭州", "西湖", "十景"]
    },
    {
      id: "xiling-bridge",
      name: "西泠桥",
      date: "2026-01-01",
      coord: [120.138493,30.251888],
      description: "连接孤山与北山街的桥，沿湖路线的重要转折点。",
      photos: [],
      tags: ["杭州", "西湖", "桥"]
    },
    {
      id: "xiling-seal-society",
      name: "西泠印社",
      date: "2026-01-01",
      coord: [120.139948,30.250279],
      description: "孤山上的金石篆刻名社。",
      photos: [],
      tags: ["杭州", "西湖", "人文"]
    },
    {
      id: "guanghua-fudan",
      name: "光华复旦",
      date: "2026-01-01",
      coord: [120.142416,30.25006],
      description: "孤山一带的题刻景观。",
      photos: [],
      tags: ["杭州", "西湖", "人文"]
    },
    {
      id: "xiangji-temple",
      name: "香积寺",
      date: "2026-01-01",
      coord: [120.146556,30.298666],
      description: "运河边的寺院，适合接到拱墅段路线里。",
      photos: [],
      tags: ["杭州", "寺庙", "运河"]
    },
    {
      id: "wo-pa-laopo",
      name: "我怕老婆·家烧小排档",
      kind: "food",
      coord: [120.159994,30.265529],
      description: "藏在武林路巷子里的小排档，温州风味。",
      photos: ["/img/paolaopo-01.jpg"],
      tags: ["杭州", "美食", "排档"]
    }
  ];

  var routes = [
    {
      id: "new-year-hangzhou",
      title: "元旦杭州路线",
      date: "2026-01-01",
      placeIds: [
        "longxiangqiao-station",
        "jixian-pavilion",
        "silk-museum",
        "jingci-temple",
        "taiziwan",
        "huagang-guanyu",
        "sudi",
        "quyuan-fenghe",
        "sudi",
        "xiling-bridge",
        "best-corner",
        "xiling-seal-society",
        "guanghua-fudan",
        "pinghu-qiuyue",
        "baidi",
        "wulin-night",
        "xiangji-temple",
        "dadou-road",
        "xiaohe",
        "gongchenqiao"
      ]
    },
    {
      id: "river-walk",
      title: "钱塘江散步路线",
      date: "2026-01-02",
      placeIds: ["qiantang"]
    },
    {
      id: "mountain-hike",
      title: "虎跑公园登山路线",
      date: "2026-05-19",
      placeIds: ["hupao"]
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
  var activeRouteId = routes.length > 0 ? routes[0].id : null;
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

  function placeVisits(place) {
    var visits = [];
    if (place.date) {
      visits.push({
        date: place.date,
        description: place.description || "",
        photos: place.photos || []
      });
    }

    if (place.visits) {
      place.visits.forEach(function (visit) {
        if (!visit.date) return;
        visits.push({
          date: visit.date,
          description: visit.description || "",
          photos: visit.photos || []
        });
      });
    }

    return visits.sort(function (a, b) {
      return b.date.localeCompare(a.date);
    });
  }

  function placeKindLabel(place) {
    if (place.kind === "food") return "美食";
    if (place.kind === "shop") return "店铺";
    if (place.kind === "transit") return "交通点";
    return "收藏点";
  }

  function allYears(place) {
    return placeVisits(place).map(function (visit) { return visit.date.slice(0, 4); });
  }

  function getFilteredPlaces() {
    var tag = els.tagFilter.value;
    var year = els.yearFilter.value;
    return places.filter(function (place) {
      var tagOk = tag === "all" || place.tags.indexOf(tag) !== -1;
      var yearOk = year === "all" || allYears(place).indexOf(year) !== -1;
      return tagOk && yearOk;
    });
  }

  function renderFilters() {
    var tags = uniq(places.reduce(function (all, place) { return all.concat(place.tags); }, [])).sort();
    var years = uniq(places.reduce(function (all, place) { return all.concat(allYears(place)); }, [])).sort().reverse();
    els.tagFilter.innerHTML = '<option value="all">全部标签</option>' + tags.map(function (tag) {
      return '<option value="' + escapeHtml(tag) + '">' + escapeHtml(tag) + '</option>';
    }).join("");
    els.yearFilter.innerHTML = '<option value="all">全部年份</option>' + years.map(function (year) {
      return '<option value="' + escapeHtml(year) + '">' + escapeHtml(year) + '</option>';
    }).join("");
  }

  function totalPhotos(place) {
    var visitPhotos = placeVisits(place).reduce(function (n, visit) {
      return n + visit.photos.length;
    }, 0);

    return visitPhotos || (place.photos || []).length;
  }

  function placeCard(place) {
    var visits = placeVisits(place);
    var dateText = visits.length ? escapeHtml(visits[0].date) : placeKindLabel(place);
    var visitsText = visits.length > 1 ? ' · ' + visits.length + ' 次到访' : '';
    return '<article class="place-item" data-place-id="' + escapeHtml(place.id) + '">' +
      '<h3>' + escapeHtml(place.name) + '</h3>' +
      '<div class="place-meta"><span>' + dateText + visitsText + '</span><span>' + totalPhotos(place) + ' 张照片</span></div>' +
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
    if (map && infoWindow) {
      infoWindow.setContent(infoContent(place));
      infoWindow.open(map, place.coord);
    }
  }

  function photosGrid(photos) {
    if (!photos.length) return '';
    return '<div class="amap-photo-grid">' + photos.map(function (src) {
      return '<div class="amap-photo-link"><img src="' + escapeHtml(src) + '" alt="" data-lightbox-src="' + escapeHtml(src) + '"></div>';
    }).join("") + '</div>';
  }

  function infoContent(place) {
    var html = '<div class="amap-photo-window">' +
      '<h3>' + escapeHtml(place.name) + '</h3>';
    var visits = placeVisits(place);

    if (visits.length > 1) {
      html += '<div class="amap-visit-count">' + visits.length + ' 次到访</div>';
      visits.forEach(function (visit) {
        html += '<div class="amap-visit-section">' +
          '<div class="amap-visit-head">' + escapeHtml(visit.date) + '</div>' +
          '<p>' + escapeHtml(visit.description || '') + '</p>' +
          photosGrid(visit.photos) +
          '</div>';
      });
    } else if (visits.length === 1) {
      html += '<p>' + escapeHtml(visits[0].date) + ' · ' + escapeHtml(visits[0].description || '') + '</p>' +
        photosGrid(visits[0].photos);
    } else {
      html += '<div class="amap-visit-count">' + escapeHtml(placeKindLabel(place)) + '</div>' +
        '<p>' + escapeHtml(place.description || '') + '</p>' +
        photosGrid(place.photos || []);
    }
    html += '</div>';
    return html;
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
    if (els.playBtn) els.playBtn.innerHTML = '<i class="fas fa-play"></i> 播放路线';
    if (map && routeLine) {
      var center = config.center || [120.1551, 30.2741];
      routeLine.setOptions({ strokeOpacity: 0 });
      routeLine.setPath([center, center]);
    }
  }

  // Fetch walking path between adjacent stops
  function fetchSegmentPath(fromCoord, toCoord) {
    return new Promise(function (resolve) {
      function fallback() {
        resolve([
          [fromCoord[0], fromCoord[1]],
          [toCoord[0], toCoord[1]]
        ]);
      }

      AMap.plugin("AMap.Walking", function () {
        if (!AMap.Walking) {
          fallback();
          return;
        }

        var walking = new AMap.Walking({ map: map, hideMarkers: true });
        walking.search(fromCoord, toCoord, function (status, result) {
          if (status === 'complete' && result.routes && result.routes.length > 0) {
            var path = [];
            result.routes[0].steps.forEach(function (step) {
              step.path.forEach(function (p) { path.push(p); });
            });
            resolve(path);
          } else {
            fallback();
          }
        });
      });
    });
  }

  // Build full route path from walking directions
  function buildRoutePath(stops) {
    var segmentTasks = [];
    for (var i = 0; i < stops.length - 1; i++) {
      segmentTasks.push(fetchSegmentPath(stops[i].coord, stops[i + 1].coord));
    }

    return Promise.all(segmentTasks).then(function (segments) {
      var flat = [];
      segments.forEach(function (seg) {
        seg.forEach(function (p) {
          if (flat.length === 0 ||
              flat[flat.length - 1][0] !== p[0] ||
              flat[flat.length - 1][1] !== p[1]) {
            flat.push(p);
          }
        });
      });
      return flat;
    });
  }

  function playRoute() {
    if (!map || !window.AMap) return;
    resetRoute();
    var route = routes.find(function (item) { return item.id === activeRouteId; });
    if (!route) return;
    var stops = route.placeIds.map(byId).filter(Boolean);
    if (stops.length < 2) return;

    els.playBtn && (els.playBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> 规划路线...');
    buildRoutePath(stops).then(function (animatedPath) {
      if (animatedPath.length < 2) {
        els.playBtn && (els.playBtn.innerHTML = '<i class="fas fa-play"></i> 播放路线');
        return;
      }
      var current = 1;
      routeLine.setOptions({ strokeOpacity: 0.92 });
      routeLine.setPath([animatedPath[0]]);
      map.setZoomAndCenter(Math.max(map.getZoom(), 12), stops[0].coord);
      els.playBtn && (els.playBtn.innerHTML = '<i class="fas fa-pause"></i> 播放中');

      routeTimer = window.setInterval(function () {
        current += 1;
        routeLine.setPath(animatedPath.slice(0, current));
        if (current % 16 === 0) map.panTo(animatedPath[current - 1]);
        if (current >= animatedPath.length) {
          window.clearInterval(routeTimer);
          routeTimer = null;
          els.playBtn && (els.playBtn.innerHTML = '<i class="fas fa-play"></i> 重新播放');
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

    if (els.routeList) {
      els.routeList.addEventListener("click", function (event) {
        var item = event.target.closest("[data-route-id]");
        if (!item) return;
        activeRouteId = item.dataset.routeId;
        resetRoute();
        renderLists();
      });
    }

    els.tagFilter.addEventListener("change", renderLists);
    els.yearFilter.addEventListener("change", renderLists);
    els.playBtn && els.playBtn.addEventListener("click", playRoute);
    els.resetBtn && els.resetBtn.addEventListener("click", resetRoute);
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
    // Photo popup: disable scroll zoom when hovering, re-enable when leaving
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest('.amap-photo-link')) {
        map.setStatus({ scrollWheel: false });
      }
    });
    document.addEventListener('mouseout', function (e) {
      var leavingPhoto = e.target.closest('.amap-photo-link');
      var enteringPhoto = e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest('.amap-photo-link');
      if (leavingPhoto && !enteringPhoto) {
        map.setStatus({ scrollWheel: true });
      }
    });
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
