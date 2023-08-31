/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkUserLogin: () => (/* binding */ checkUserLogin),
/* harmony export */   currentDate: () => (/* binding */ currentDate),
/* harmony export */   date: () => (/* binding */ date),
/* harmony export */   destinations: () => (/* binding */ destinations),
/* harmony export */   displayCalendar: () => (/* reexport safe */ _domUpdates__WEBPACK_IMPORTED_MODULE_8__.displayCalendar),
/* harmony export */   displayDestinationsList: () => (/* reexport safe */ _domUpdates__WEBPACK_IMPORTED_MODULE_8__.displayDestinationsList),
/* harmony export */   displayWelcomeMessage: () => (/* reexport safe */ _domUpdates__WEBPACK_IMPORTED_MODULE_8__.displayWelcomeMessage),
/* harmony export */   getCostOfDestination: () => (/* binding */ getCostOfDestination),
/* harmony export */   getDestinationInfo: () => (/* binding */ getDestinationInfo),
/* harmony export */   getPastTrips: () => (/* binding */ getPastTrips),
/* harmony export */   getTravelerInfo: () => (/* binding */ getTravelerInfo),
/* harmony export */   getUpcomingTrips: () => (/* binding */ getUpcomingTrips),
/* harmony export */   newUser: () => (/* binding */ newUser),
/* harmony export */   showPastTrips: () => (/* reexport safe */ _domUpdates__WEBPACK_IMPORTED_MODULE_8__.showPastTrips),
/* harmony export */   showTotalSpent: () => (/* reexport safe */ _domUpdates__WEBPACK_IMPORTED_MODULE_8__.showTotalSpent),
/* harmony export */   showUpcomingTrips: () => (/* reexport safe */ _domUpdates__WEBPACK_IMPORTED_MODULE_8__.showUpcomingTrips),
/* harmony export */   showUpdatedUpcomingTrips: () => (/* binding */ showUpdatedUpcomingTrips),
/* harmony export */   travelers: () => (/* binding */ travelers),
/* harmony export */   trips: () => (/* binding */ trips)
/* harmony export */ });
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _images_turing_logo_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _images_parvin_going_home_jpg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _images_taking_picture_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var _images_in_a_hurry_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11);
/* harmony import */ var _images_plane_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(12);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(13);
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(14);
/* ~~~~~~~~~~ IMPORTS ~~~~~~~~~~*/










/* ~~~~~~~~~~ GLOBAL VARIABLES ~~~~~~~~~~*/
let date = new Date();
let currentDate = date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2);
let travelers, trips, destinations, newUser;

/* ~~~~~~~~~~ FETCH REQUEST ~~~~~~~~~~*/
window.addEventListener('load', function () {
  Promise.all([(0,_apiCalls__WEBPACK_IMPORTED_MODULE_7__.fetchTravelers)(), (0,_apiCalls__WEBPACK_IMPORTED_MODULE_7__.fetchTrips)(), (0,_apiCalls__WEBPACK_IMPORTED_MODULE_7__.fetchDestinations)()])
    .then(([travelersData, tripsData, destinationsData]) => {
      travelers = travelersData.travelers;
      trips = tripsData.trips;
      destinations = destinationsData.destinations;
    })
    .catch(error => {
      console.error('There was a problem with the fetch', error);
    });
});

/* ~~~~~~~~~~ Day.js. ~~~~~~~~~~*/
const now = dayjs__WEBPACK_IMPORTED_MODULE_6___default()();
const formattedDate = now.format('dddd, MMMM D YYYY, h:mm A');
document.getElementById('dateElement').innerText = formattedDate;

function updateDateTime() {
  const now = dayjs__WEBPACK_IMPORTED_MODULE_6___default()();
  const formattedDate = now.format('dddd, MMMM D YYYY, h:mm A');
  document.getElementById('dateElement').innerText = formattedDate;
}

setInterval(updateDateTime, 60000);
updateDateTime();

document.getElementById('logo').addEventListener('mouseover', sparkle);

function sparkle(event) {
  var sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.top = `${event.clientY - 30}px`;
  sparkle.style.left = `${event.clientX - 30}px`;
  document.body.appendChild(sparkle);

  setTimeout(() => {
    sparkle.style.opacity = '9';
  }, 500);
  setTimeout(() => {
    document.body.removeChild(sparkle);
  }, 1000);
}

/* ~~~~~~~~~~ FUNCTIONS ~~~~~~~~~~*/
const getTravelerInfo = (userID) => {
  return travelers.find(traveler => traveler.id === userID);
};

const getPastTrips = (userID) => {
  return trips.filter(trip => trip.userID === userID && trip.status === 'approved');
};

const getUpcomingTrips = (userID) => {
  return trips.filter(trip => trip.userID === userID && trip.status === 'pending');
};

const getDestinationInfo = (destinationID) => {
  const destination = destinations.find(destination => destination.id === destinationID);
  return destination;
};

const getCostOfDestination = (destinationID, numTravelers, duration) => {
  const destination = getDestinationInfo(destinationID);
  const lodgingCost = destination.estimatedLodgingCostPerDay * duration;
  const flightCost = destination.estimatedFlightCostPerPerson * numTravelers;
  const agentFee = (lodgingCost + flightCost) * 0.1;
  return lodgingCost + flightCost + agentFee;
}

/* ~~~~~~~~~~ LOGIN FORM ~~~~~~~~~~*/
_domUpdates__WEBPACK_IMPORTED_MODULE_8__.loginForm.addEventListener('submit', checkUserLogin);

function checkUserLogin(event) {
  event.preventDefault();
  const id = +_domUpdates__WEBPACK_IMPORTED_MODULE_8__.usernameInput.value.match((/\d+$/));
  const string = _domUpdates__WEBPACK_IMPORTED_MODULE_8__.usernameInput.value.slice(0, 8);

  if (
    string === "traveler" &&
    Number(id) > 0 &&
    Number(id) <= 50 &&
    _domUpdates__WEBPACK_IMPORTED_MODULE_8__.passwordInput.value === "travel"
  ) {
    newUser = getTravelerInfo(Number(id));

    _domUpdates__WEBPACK_IMPORTED_MODULE_8__.loginSection.classList.add("hidden");
    _domUpdates__WEBPACK_IMPORTED_MODULE_8__.homePage.classList.remove('hidden');
    updateDOM();
  } else {
    document.getElementById('loginError').classList.remove('hidden');
  }
}

function updateDOM() {
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_8__.displayCalendar)();
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_8__.showPastTrips)(newUser.id);
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_8__.showUpcomingTrips)(newUser.id);
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_8__.showTotalSpent)(newUser.id);
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_8__.displayWelcomeMessage)(newUser);
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_8__.displayDestinationsList)();
}

_domUpdates__WEBPACK_IMPORTED_MODULE_8__.form.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = {
    "id": parseInt(trips.length + 1),
    "userID": newUser.id,
    "destinationID": parseInt(_domUpdates__WEBPACK_IMPORTED_MODULE_8__.destinationDropdown.value),
    "travelers": parseInt(_domUpdates__WEBPACK_IMPORTED_MODULE_8__.numTravelersInput.value),
    "date": _domUpdates__WEBPACK_IMPORTED_MODULE_8__.calendar.firstChild.value.split('-').join('/'),
    "duration": parseInt(_domUpdates__WEBPACK_IMPORTED_MODULE_8__.durationInput.value),
    "status": "pending",
    "suggestedActivities": []
  };

  fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(data => data.json())
    .then(json => console.log(json))
    .catch(err => console.log(`Error at: ${err}`));

    Promise.all([(0,_apiCalls__WEBPACK_IMPORTED_MODULE_7__.fetchTravelers)(), (0,_apiCalls__WEBPACK_IMPORTED_MODULE_7__.fetchTrips)(), (0,_apiCalls__WEBPACK_IMPORTED_MODULE_7__.fetchDestinations)()])
    .then(([travelersData, tripsData, destinationsData]) => {
      travelers = travelersData.travelers;
      trips = tripsData.trips;
      destinations = destinationsData.destinations;
    })
    .catch(error => {
      console.error('There was a problem with the fetch', error);
    });

  showUpdatedUpcomingTrips(data);
  event.target.reset();
  _domUpdates__WEBPACK_IMPORTED_MODULE_8__.estimatedCost.innerText = "Please provide the number of travelers and duration to estimate the cost.";
});

function showUpdatedUpcomingTrips(data) {
  const destinationInfo = getDestinationInfo(data.destinationID);
  _domUpdates__WEBPACK_IMPORTED_MODULE_8__.upcomingTripsList.innerHTML += `
  <li style="font-size: 1.5em">${data.date}: ${destinationInfo.destination} <span style='color: red;'>*pending*</span></li>
  <img src=${destinationInfo.image} alt=${destinationInfo.alt} width="350" height="250"/>
  `;
}

_domUpdates__WEBPACK_IMPORTED_MODULE_8__.form.addEventListener('input', () => {
  if (_domUpdates__WEBPACK_IMPORTED_MODULE_8__.numTravelersInput.value && _domUpdates__WEBPACK_IMPORTED_MODULE_8__.durationInput.value) {
    const totalCost = getCostOfDestination(
      parseInt(_domUpdates__WEBPACK_IMPORTED_MODULE_8__.destinationDropdown.value),
      parseInt(_domUpdates__WEBPACK_IMPORTED_MODULE_8__.numTravelersInput.value),
      parseInt(_domUpdates__WEBPACK_IMPORTED_MODULE_8__.durationInput.value));
    let dollarUSLocale = Intl.NumberFormat('en-US');
    let totalPrice = dollarUSLocale.format(totalCost);
    _domUpdates__WEBPACK_IMPORTED_MODULE_8__.estimatedCost.innerText = `The estimated cost of this trip is ${totalPrice}!`;
  } else {
    _domUpdates__WEBPACK_IMPORTED_MODULE_8__.estimatedCost.innerText = "Please provide the number of travelers and duration to estimate the cost.";
  }
});

/* ~~~~~~~~~~ EXSPORTS ~~~~~~~~~~*/


/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _images_plane_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
// Imports




var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_plane_png__WEBPACK_IMPORTED_MODULE_3__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  background: radial-gradient(circle, rgb(5, 98, 45) 0%, rgb(1, 24, 8) 100%);\n  color: white;\n  font-family: 'Raleway', sans-serif;\n}\n\nh2 {\n  font-weight: normal;\n  transition: transform 0.3s ease;\n}\n\nh2:hover {\n  transform: scale(1.2);\n}\n\nheader {\n  text-align: center;\n}\n\n.space-right {\n  margin-right: 5px;\n}\n\n/* skip to the main content of the page */\n.skip-link {\n  position: absolute;\n  top: -40px;\n  left: 0;\n  background: #000;\n  color: white;\n  padding: 8px;\n  z-index: 100;\n  transition: top 0.3s ease;\n  text-decoration: none;\n}\n\n.skip-link:focus {\n  top: 0;\n}\n\n/* header content */\n.header-content {\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  padding-left: 10px;\n}\n\n.header-content h1 {\n  font-style: italic;\n  margin-left: 29px;\n  font-size: 38px;\n  margin-bottom: 4px;\n}\n\n/* title */\n.title {\n  font-family: 'Great Vibes', cursive;\n  letter-spacing: 1px;\n  transition: transform 0.3s ease;\n}\n\n.title:hover {\n  transform: scale(2.5) translateX(5px) translateY(4px);\n}\n\n/* magnify on hover */\n.magnify-on-hover {\n  transition: transform 0.3s ease;\n}\n\n.magnify-on-hover:hover {\n  transform: scale(1.2);\n}\n\n/* logo */\n#logo {\n  width: 100px;\n  height: 100px;\n  margin: 30px;\n  margin-top: 50px;\n  cursor: pointer;\n  border: 3px solid rgb(11, 166, 52);\n  border-radius: 50%;\n  padding: 10px;\n  display: inline-block;\n  transition: transform 0.3s ease;\n  object-fit: contain;\n}\n\n#logo:hover {\n  transform: scale(1.2);\n  background-color: #C0C0C0;\n}\n\n.sparkle {\n  position: absolute;\n  width: 50px;\n  height: 50px;\n  background: radial-gradient(circle, #c0c0c0 0%, rgba(0, 0, 255, 0.6) 70%, rgba(12, 234, 34, 0) 100%);\n  border-radius: 50%;\n  pointer-events: none;\n  mix-blend-mode: screen;\n  opacity: 0;\n  transition: opacity 0.5s ease-out;\n}\n\n.right-align {\n  display: flex;\n  justify-content: flex-end;\n}\n\n/* login form */\n#login-heading {\n  margin-bottom: 20px;\n  position: relative;\n}\n\n#login-heading:hover {\n  visibility: hidden;\n}\n\n#login-heading::after {\n  content: \"Greetings, please feel free to proceed.\";\n  color: white;\n  font-size: 50px;\n  font-family: 'Great Vibes', cursive;\n  opacity: 0;\n  transition: opacity 0.3s ease;\n  position: absolute;\n  bottom: 20px;\n  left: 10px;\n  visibility: hidden;\n  opacity: 1;\n}\n\n#login-heading:hover::after {\n  opacity: 1;\n  visibility: visible;\n}\n\n#login-form input {\n  display: block;\n  width: 20%;\n  padding: 5px;\n  margin-bottom: 20px;\n}\n\n#login-form label {\n  margin-bottom: 10px;\n  display: block;\n  margin-right: 10px;\n}\n\n#login-form button {\n  padding: 20px 30px;\n  font-size: 19px;\n  cursor: pointer;\n  border: 3px solid rgb(11, 166, 52);\n  border-radius: 60%;\n  display: inline-block;\n  transition: transform 0.3s ease;\n  transform: scale(1);\n  background-color: white;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: 50%;\n}\n\n#login-form button:hover {\n  transform: scale(1.2);\n  background-color: white;\n}\n\n#loginError {\n  width: 40%;\n  margin-left: -10%;\n  margin-top: 20px;\n  margin-bottom: 20px;\n  padding: 10px;\n  color: red;\n  font-weight: bold;\n  border: 1px solid red;\n  border-radius: 5px;\n  background-color: rgba(255, 0, 0, 0.1);\n  text-align: center;\n}\n\n#login-section,\n#traveler-dashboard {\n  margin: auto;\n  width: 75%;\n  font-family: 'Raleway', sans-serif;\n  font-size: 24px;\n  padding: 200px;\n}\n\n/* trip section */\n#trip-section,\n#total-spent {\n  margin: 2em;\n  padding: 2em;\n  border: 1px solid rgb(8, 9, 0);\n  border-radius: 10px;\n  transition: background-color 0.3s ease;\n}\n\n#trip-section:hover,\n#total-spent:hover {\n  background-color: rgba(255, 255, 255, 0.2);\n}\n\n/* home page */\n.logo {\n  height: 120px;\n  width: 200px;\n  margin-right: 50px;\n}\n\n.home-page {\n  height: 100%;\n}\n\n/* Widgets */\n.widget::-webkit-scrollbar {\n  width: 10px;\n  height: 10px;\n}\n\n.widget::-webkit-scrollbar-thumb {\n  background-color: #10ea3c;\n  border-radius: 5px;\n}\n\n.widget::-webkit-scrollbar-track {\n  background-color: #eef5ef;\n}\n\n.widget-container {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 20px;\n  margin-top: 100px;\n}\n\n.widget {\n  font-family: 'Arial', sans-serif;\n  font-size: 16px;\n  font-weight: normal;\n  color: #f6eeee;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  max-width: 450px;\n  max-height: 600px;\n  margin: 20px auto;\n  padding: 20px;\n  border-radius: 5px;\n  overflow: auto;\n  box-shadow: 0 10px 20px rgba(255, 255, 255, 0.3), 0 6px 6px rgba(255, 255, 255, 0.4);\n}\n\n#dateElement {\n  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);\n  font-family: 'Roboto', sans-serif;\n  font-size: 1em;\n  color: #f4eeee;\n  text-align: center;\n  padding: 10px;\n  margin: 0;\n  background-color: radial-gradient(circle, rgb(5, 98, 45) 0%, rgb(1, 24, 8) 100%);\n  border-bottom: 1px solid #39FF14;\n  position: absolute;\n  top: 80px;\n  left: 80%;\n  transform: translateX(-50%);\n  top: 69%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 2;\n}\n\n.header-welcome {\n  font-family: 'Roboto', sans-serif;\n  letter-spacing: 1px;\n  transition: transform 0.3s ease;\n  background-color: rgb(255, 255, 255) 0%, rgb(242, 242, 242) 100%;\n  letter-spacing: 2px;\n  font-size: 2em;\n  width: 20%;\n  padding: 1%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  position: absolute;\n  top: 75px;\n  left: 73.5%;\n  right: 500px;\n  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);\n}\n\n#omarKhayyam {\n  font-style: italic;\n  font-family: 'Georgia', serif;\n  font-size: 19px;\n  line-height: 1.6;\n  color: #f7f3f3;\n  margin: 20px 0;\n  text-align: center;\n  border-top: 1px solid #10ea3c;\n  border-bottom: 1px solid #10ea3c;\n  padding: 20px 0;\n  position: absolute;\n  top: 10%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n\n.main-section {\n  display: flex;\n  justify-content: space-evenly;\n  height: 85%;\n  align-items: center;\n}\n\n.hidden {\n  display: none;\n}\n\n* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\n#form {\n  max-width: 400px;\n  margin: 20px auto;\n  padding: 20px;\n  background-color: #130101;\n  border-radius: 5px;\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);\n  grid-column: 2;\n}\n\n#form h1 {\n  text-align: center;\n  margin-bottom: 20px;\n}\n\n#form label {\n  display: block;\n  margin-bottom: 5px;\n}\n\n#destinationDropdown,\n#calendar,\n#durationInput,\n#numTravelersInput {\n  width: 100%;\n  padding: 10px;\n  margin-bottom: 20px;\n  border: 1px solid #ccc;\n  border-radius: 3px;\n}\n\n#estimatedCost,\n#xyam {\n  text-align: center;\n  margin-bottom: 20px;\n}\n\n#submitTrip {\n  display: block;\n  width: 100%;\n  padding: 10px;\n  background-color: #10ea3c;\n  color: #fff;\n  border: none;\n  border-radius: 3px;\n  cursor: pointer;\n  margin-bottom: 20px;\n  font-family: 'Arial', sans-serif;\n  font-size: 16px;\n  font-weight: normal;\n  color: #040000;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  position: relative;\n  z-index: 1;\n}\n\n#submitTrip:hover {\n  background-color: #0abdef;\n}\n\n#pastTrips.widget,\n#upcomingTrips.widget {\n  color: rgb(250, 247, 247);\n  text-align: center;\n  margin: auto;\n  font-family: 'Arial', sans-serif;\n  font-size: 16px;\n  font-weight: bold;\n  line-height: 1.5;\n}\n\n.trips-list {\n  list-style-type: none;\n  padding-left: 0;\n}\n\nimg {\n  margin: 10px;\n}\n\n#green {\n  width: 800px;\n  height: 800px;\n  margin: 80px;\n  position: absolute;\n  top: 100px;\n  right: 180px;\n  margin-top: auto;\n  cursor: pointer;\n  border: 3px solid rgb(11, 166, 52);\n  border-radius: 50%;\n  padding: 10px;\n  transition: transform 0.3s ease;\n}\n\n#green:hover {\n  transform: scale(1.2);\n  background-color: #39FF14;\n}\n\n#in-a-hurry {\n  width: 300px;\n  height: 300px;\n  cursor: pointer;\n  border: 3px solid rgb(11, 166, 52);\n  border-radius: 50%;\n  padding: 10px;\n  transition: transform 0.3s ease;\n  object-fit: cover;\n  margin: 10px;\n  position: absolute;\n  top: 50%;\n  right: 31%;\n  transform: translate(50%, 50%);\n  z-index: 3;\n}\n\n#airplane {\n  width: 300px;\n  height: 300px;\n  cursor: pointer;\n  border: 3px solid rgb(11, 166, 52);\n  border-radius: 50%;\n  padding: 10px;\n  transition: transform 0.3s ease;\n  object-fit: cover;\n  margin: 10px;\n  position: absolute;\n  top: 50%;\n  left: 31%;\n  transform: translate(-50%, -50%);\n  z-index: 3;\n}\n\n#in-a-hurry:hover {\n  transform: scale(1.2);\n  background-color: #0abdef;\n}\n\n#airplane:hover {\n  transform: scale(1.2);\n  background-color: #dc0c17;\n}\n\n/* responsive */\n@media screen and (max-width: 768px) {\n\n  .right-align {\n    justify-content: center;\n    flex-wrap: wrap;\n  }\n\n  #airplane,\n  #in-a-hurry,\n  #dateElement {\n    margin: 10px auto;\n  }\n\n  .widget,\n  #form {\n    max-width: 90%;\n  }\n}\n\n@media screen and (max-width: 480px) {\n\n  #form label {\n    font-size: 14px;\n  }\n\n  #destinationDropdown,\n  #calendar,\n  #durationInput,\n  #numTravelersInput {\n    font-size: 14px;\n  }\n\n  #submitTrip {\n    text-align: center;\n    font-size: 16px;\n  }\n}\n\n@media only screen and (max-width: 1024px) {\n\n  #green,\n  #airplane,\n  #in-a-hurry,\n  #dateElement {\n    width: 600px;\n    height: 600px;\n  }\n}\n\n@media only screen and (max-width: 768px) {\n\n  #green,\n  #airplane,\n  #in-a-hurry,\n  #dateElement {\n    width: 400px;\n    height: 400px;\n  }\n\n  #login-section,\n  #traveler-dashboard {\n    width: 90%;\n  }\n}\n\n@media only screen and (max-width: 480px) {\n\n  #green,\n  #airplane,\n  #in-a-hurry,\n  #dateElement {\n    width: 200px;\n    height: 200px;\n  }\n\n  #login-section,\n  #traveler-dashboard {\n    width: 100%;\n  }\n\n  .header-content {\n    flex-direction: column;\n    align-items: center;\n  }\n\n  .header-content h1 {\n    margin-left: 0;\n    margin-top: 10px;\n    font-size: 18px;\n  }\n\n  #logo {\n    margin: 10px auto;\n    width: 30px;\n    height: 30px;\n  }\n}", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"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","sourcesContent":["body {\n  background: radial-gradient(circle, rgb(5, 98, 45) 0%, rgb(1, 24, 8) 100%);\n  color: white;\n  font-family: 'Raleway', sans-serif;\n}\n\nh2 {\n  font-weight: normal;\n  transition: transform 0.3s ease;\n}\n\nh2:hover {\n  transform: scale(1.2);\n}\n\nheader {\n  text-align: center;\n}\n\n.space-right {\n  margin-right: 5px;\n}\n\n/* skip to the main content of the page */\n.skip-link {\n  position: absolute;\n  top: -40px;\n  left: 0;\n  background: #000;\n  color: white;\n  padding: 8px;\n  z-index: 100;\n  transition: top 0.3s ease;\n  text-decoration: none;\n}\n\n.skip-link:focus {\n  top: 0;\n}\n\n/* header content */\n.header-content {\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  padding-left: 10px;\n}\n\n.header-content h1 {\n  font-style: italic;\n  margin-left: 29px;\n  font-size: 38px;\n  margin-bottom: 4px;\n}\n\n/* title */\n.title {\n  font-family: 'Great Vibes', cursive;\n  letter-spacing: 1px;\n  transition: transform 0.3s ease;\n}\n\n.title:hover {\n  transform: scale(2.5) translateX(5px) translateY(4px);\n}\n\n/* magnify on hover */\n.magnify-on-hover {\n  transition: transform 0.3s ease;\n}\n\n.magnify-on-hover:hover {\n  transform: scale(1.2);\n}\n\n/* logo */\n#logo {\n  width: 100px;\n  height: 100px;\n  margin: 30px;\n  margin-top: 50px;\n  cursor: pointer;\n  border: 3px solid rgb(11, 166, 52);\n  border-radius: 50%;\n  padding: 10px;\n  display: inline-block;\n  transition: transform 0.3s ease;\n  object-fit: contain;\n}\n\n#logo:hover {\n  transform: scale(1.2);\n  background-color: #C0C0C0;\n}\n\n.sparkle {\n  position: absolute;\n  width: 50px;\n  height: 50px;\n  background: radial-gradient(circle, #c0c0c0 0%, rgba(0, 0, 255, 0.6) 70%, rgba(12, 234, 34, 0) 100%);\n  border-radius: 50%;\n  pointer-events: none;\n  mix-blend-mode: screen;\n  opacity: 0;\n  transition: opacity 0.5s ease-out;\n}\n\n.right-align {\n  display: flex;\n  justify-content: flex-end;\n}\n\n/* login form */\n#login-heading {\n  margin-bottom: 20px;\n  position: relative;\n}\n\n#login-heading:hover {\n  visibility: hidden;\n}\n\n#login-heading::after {\n  content: \"Greetings, please feel free to proceed.\";\n  color: white;\n  font-size: 50px;\n  font-family: 'Great Vibes', cursive;\n  opacity: 0;\n  transition: opacity 0.3s ease;\n  position: absolute;\n  bottom: 20px;\n  left: 10px;\n  visibility: hidden;\n  opacity: 1;\n}\n\n#login-heading:hover::after {\n  opacity: 1;\n  visibility: visible;\n}\n\n#login-form input {\n  display: block;\n  width: 20%;\n  padding: 5px;\n  margin-bottom: 20px;\n}\n\n#login-form label {\n  margin-bottom: 10px;\n  display: block;\n  margin-right: 10px;\n}\n\n#login-form button {\n  padding: 20px 30px;\n  font-size: 19px;\n  cursor: pointer;\n  border: 3px solid rgb(11, 166, 52);\n  border-radius: 60%;\n  display: inline-block;\n  transition: transform 0.3s ease;\n  transform: scale(1);\n  background-color: white;\n  background-image: url('../images/plane.png');\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: 50%;\n}\n\n#login-form button:hover {\n  transform: scale(1.2);\n  background-color: white;\n}\n\n#loginError {\n  width: 40%;\n  margin-left: -10%;\n  margin-top: 20px;\n  margin-bottom: 20px;\n  padding: 10px;\n  color: red;\n  font-weight: bold;\n  border: 1px solid red;\n  border-radius: 5px;\n  background-color: rgba(255, 0, 0, 0.1);\n  text-align: center;\n}\n\n#login-section,\n#traveler-dashboard {\n  margin: auto;\n  width: 75%;\n  font-family: 'Raleway', sans-serif;\n  font-size: 24px;\n  padding: 200px;\n}\n\n/* trip section */\n#trip-section,\n#total-spent {\n  margin: 2em;\n  padding: 2em;\n  border: 1px solid rgb(8, 9, 0);\n  border-radius: 10px;\n  transition: background-color 0.3s ease;\n}\n\n#trip-section:hover,\n#total-spent:hover {\n  background-color: rgba(255, 255, 255, 0.2);\n}\n\n/* home page */\n.logo {\n  height: 120px;\n  width: 200px;\n  margin-right: 50px;\n}\n\n.home-page {\n  height: 100%;\n}\n\n/* Widgets */\n.widget::-webkit-scrollbar {\n  width: 10px;\n  height: 10px;\n}\n\n.widget::-webkit-scrollbar-thumb {\n  background-color: #10ea3c;\n  border-radius: 5px;\n}\n\n.widget::-webkit-scrollbar-track {\n  background-color: #eef5ef;\n}\n\n.widget-container {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 20px;\n  margin-top: 100px;\n}\n\n.widget {\n  font-family: 'Arial', sans-serif;\n  font-size: 16px;\n  font-weight: normal;\n  color: #f6eeee;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  max-width: 450px;\n  max-height: 600px;\n  margin: 20px auto;\n  padding: 20px;\n  border-radius: 5px;\n  overflow: auto;\n  box-shadow: 0 10px 20px rgba(255, 255, 255, 0.3), 0 6px 6px rgba(255, 255, 255, 0.4);\n}\n\n#dateElement {\n  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);\n  font-family: 'Roboto', sans-serif;\n  font-size: 1em;\n  color: #f4eeee;\n  text-align: center;\n  padding: 10px;\n  margin: 0;\n  background-color: radial-gradient(circle, rgb(5, 98, 45) 0%, rgb(1, 24, 8) 100%);\n  border-bottom: 1px solid #39FF14;\n  position: absolute;\n  top: 80px;\n  left: 80%;\n  transform: translateX(-50%);\n  top: 69%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 2;\n}\n\n.header-welcome {\n  font-family: 'Roboto', sans-serif;\n  letter-spacing: 1px;\n  transition: transform 0.3s ease;\n  background-color: rgb(255, 255, 255) 0%, rgb(242, 242, 242) 100%;\n  letter-spacing: 2px;\n  font-size: 2em;\n  width: 20%;\n  padding: 1%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  position: absolute;\n  top: 75px;\n  left: 73.5%;\n  right: 500px;\n  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);\n}\n\n#omarKhayyam {\n  font-style: italic;\n  font-family: 'Georgia', serif;\n  font-size: 19px;\n  line-height: 1.6;\n  color: #f7f3f3;\n  margin: 20px 0;\n  text-align: center;\n  border-top: 1px solid #10ea3c;\n  border-bottom: 1px solid #10ea3c;\n  padding: 20px 0;\n  position: absolute;\n  top: 10%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n\n.main-section {\n  display: flex;\n  justify-content: space-evenly;\n  height: 85%;\n  align-items: center;\n}\n\n.hidden {\n  display: none;\n}\n\n* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\n#form {\n  max-width: 400px;\n  margin: 20px auto;\n  padding: 20px;\n  background-color: #130101;\n  border-radius: 5px;\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);\n  grid-column: 2;\n}\n\n#form h1 {\n  text-align: center;\n  margin-bottom: 20px;\n}\n\n#form label {\n  display: block;\n  margin-bottom: 5px;\n}\n\n#destinationDropdown,\n#calendar,\n#durationInput,\n#numTravelersInput {\n  width: 100%;\n  padding: 10px;\n  margin-bottom: 20px;\n  border: 1px solid #ccc;\n  border-radius: 3px;\n}\n\n#estimatedCost,\n#xyam {\n  text-align: center;\n  margin-bottom: 20px;\n}\n\n#submitTrip {\n  display: block;\n  width: 100%;\n  padding: 10px;\n  background-color: #10ea3c;\n  color: #fff;\n  border: none;\n  border-radius: 3px;\n  cursor: pointer;\n  margin-bottom: 20px;\n  font-family: 'Arial', sans-serif;\n  font-size: 16px;\n  font-weight: normal;\n  color: #040000;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  position: relative;\n  z-index: 1;\n}\n\n#submitTrip:hover {\n  background-color: #0abdef;\n}\n\n#pastTrips.widget,\n#upcomingTrips.widget {\n  color: rgb(250, 247, 247);\n  text-align: center;\n  margin: auto;\n  font-family: 'Arial', sans-serif;\n  font-size: 16px;\n  font-weight: bold;\n  line-height: 1.5;\n}\n\n.trips-list {\n  list-style-type: none;\n  padding-left: 0;\n}\n\nimg {\n  margin: 10px;\n}\n\n#green {\n  width: 800px;\n  height: 800px;\n  margin: 80px;\n  position: absolute;\n  top: 100px;\n  right: 180px;\n  margin-top: auto;\n  cursor: pointer;\n  border: 3px solid rgb(11, 166, 52);\n  border-radius: 50%;\n  padding: 10px;\n  transition: transform 0.3s ease;\n}\n\n#green:hover {\n  transform: scale(1.2);\n  background-color: #39FF14;\n}\n\n#in-a-hurry {\n  width: 300px;\n  height: 300px;\n  cursor: pointer;\n  border: 3px solid rgb(11, 166, 52);\n  border-radius: 50%;\n  padding: 10px;\n  transition: transform 0.3s ease;\n  object-fit: cover;\n  margin: 10px;\n  position: absolute;\n  top: 50%;\n  right: 31%;\n  transform: translate(50%, 50%);\n  z-index: 3;\n}\n\n#airplane {\n  width: 300px;\n  height: 300px;\n  cursor: pointer;\n  border: 3px solid rgb(11, 166, 52);\n  border-radius: 50%;\n  padding: 10px;\n  transition: transform 0.3s ease;\n  object-fit: cover;\n  margin: 10px;\n  position: absolute;\n  top: 50%;\n  left: 31%;\n  transform: translate(-50%, -50%);\n  z-index: 3;\n}\n\n#in-a-hurry:hover {\n  transform: scale(1.2);\n  background-color: #0abdef;\n}\n\n#airplane:hover {\n  transform: scale(1.2);\n  background-color: #dc0c17;\n}\n\n/* responsive */\n@media screen and (max-width: 768px) {\n\n  .right-align {\n    justify-content: center;\n    flex-wrap: wrap;\n  }\n\n  #airplane,\n  #in-a-hurry,\n  #dateElement {\n    margin: 10px auto;\n  }\n\n  .widget,\n  #form {\n    max-width: 90%;\n  }\n}\n\n@media screen and (max-width: 480px) {\n\n  #form label {\n    font-size: 14px;\n  }\n\n  #destinationDropdown,\n  #calendar,\n  #durationInput,\n  #numTravelersInput {\n    font-size: 14px;\n  }\n\n  #submitTrip {\n    text-align: center;\n    font-size: 16px;\n  }\n}\n\n@media only screen and (max-width: 1024px) {\n\n  #green,\n  #airplane,\n  #in-a-hurry,\n  #dateElement {\n    width: 600px;\n    height: 600px;\n  }\n}\n\n@media only screen and (max-width: 768px) {\n\n  #green,\n  #airplane,\n  #in-a-hurry,\n  #dateElement {\n    width: 400px;\n    height: 400px;\n  }\n\n  #login-section,\n  #traveler-dashboard {\n    width: 90%;\n  }\n}\n\n@media only screen and (max-width: 480px) {\n\n  #green,\n  #airplane,\n  #in-a-hurry,\n  #dateElement {\n    width: 200px;\n    height: 200px;\n  }\n\n  #login-section,\n  #traveler-dashboard {\n    width: 100%;\n  }\n\n  .header-content {\n    flex-direction: column;\n    align-items: center;\n  }\n\n  .header-content h1 {\n    margin-left: 0;\n    margin-top: 10px;\n    font-size: 18px;\n  }\n\n  #logo {\n    margin: 10px auto;\n    width: 30px;\n    height: 30px;\n  }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/plane.png");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/turing-logo.png");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/parvin-going-home.jpg");

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/taking-picture.png");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/in-a-hurry.png");

/***/ }),
/* 12 */
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",c="month",f="quarter",h="year",d="date",l="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,c),s=n-i<0,u=e.clone().add(r+(s?-1:1),c);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:c,y:h,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:f}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",D={};D[g]=M;var p=function(t){return t instanceof b},S=function t(e,n,r){var i;if(!e)return g;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else{var a=e.name;D[a]=e,i=a}return!r&&i&&(g=i),i||!r&&g},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new b(n)},O=v;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var b=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===l)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,f=O.p(t),l=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},$=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,v="set"+(this.$u?"UTC":"");switch(f){case h:return r?l(1,0):l(31,11);case c:return r?l(1,M):l(0,M+1);case o:var g=this.$locale().weekStart||0,D=(y<g?y+7:y)-g;return l(r?m-D:m+(6-D),M);case a:case d:return $(v+"Hours",0);case u:return $(v+"Minutes",1);case s:return $(v+"Seconds",2);case i:return $(v+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),f="set"+(this.$u?"UTC":""),l=(n={},n[a]=f+"Date",n[d]=f+"Date",n[c]=f+"Month",n[h]=f+"FullYear",n[u]=f+"Hours",n[s]=f+"Minutes",n[i]=f+"Seconds",n[r]=f+"Milliseconds",n)[o],$=o===a?this.$D+(e-this.$W):e;if(o===c||o===h){var y=this.clone().set(d,1);y.$d[l]($),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else l&&this.$d[l]($);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,f){var d,l=this;r=Number(r);var $=O.p(f),y=function(t){var e=w(l);return O.w(e.date(e.date()+Math.round(t*r)),l)};if($===c)return this.set(c,this.$M+r);if($===h)return this.set(h,this.$y+r);if($===a)return y(1);if($===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[$]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,c=n.months,f=n.meridiem,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},d=function(t){return O.s(s%12||12,t,"0")},$=f||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r};return r.replace(y,(function(t,r){return r||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return O.s(e.$y,4,"0");case"M":return a+1;case"MM":return O.s(a+1,2,"0");case"MMM":return h(n.monthsShort,a,c,3);case"MMMM":return h(c,a);case"D":return e.$D;case"DD":return O.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return h(n.weekdaysMin,e.$W,o,2);case"ddd":return h(n.weekdaysShort,e.$W,o,3);case"dddd":return o[e.$W];case"H":return String(s);case"HH":return O.s(s,2,"0");case"h":return d(1);case"hh":return d(2);case"a":return $(s,u,!0);case"A":return $(s,u,!1);case"m":return String(u);case"mm":return O.s(u,2,"0");case"s":return String(e.$s);case"ss":return O.s(e.$s,2,"0");case"SSS":return O.s(e.$ms,3,"0");case"Z":return i}return null}(t)||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,l){var $,y=this,M=O.p(d),m=w(r),v=(m.utcOffset()-this.utcOffset())*e,g=this-m,D=function(){return O.m(y,m)};switch(M){case h:$=D()/12;break;case c:$=D();break;case f:$=D()/3;break;case o:$=(g-v)/6048e5;break;case a:$=(g-v)/864e5;break;case u:$=g/n;break;case s:$=g/e;break;case i:$=g/t;break;default:$=g}return l?$:O.a($)},m.daysInMonth=function(){return this.endOf(c).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),_=b.prototype;return w.prototype=_,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",c],["$y",h],["$D",d]].forEach((function(t){_[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,b,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=D[g],w.Ls=D,w.p={},w}));

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchDestinations: () => (/* binding */ fetchDestinations),
/* harmony export */   fetchTravelers: () => (/* binding */ fetchTravelers),
/* harmony export */   fetchTrips: () => (/* binding */ fetchTrips)
/* harmony export */ });
function fetchData(endpoint) {
  return fetch(`http://localhost:3001/api/v1/${endpoint}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint}`);
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error(error);
      throw new Error(`An error occurred while fetching ${endpoint}.`);
    });
}

function fetchTravelers() {
  return fetchData('travelers');
}

function fetchTrips() {
  return fetchData('trips');
}

function fetchDestinations() {
  return fetchData('destinations');
}




/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calendar: () => (/* binding */ calendar),
/* harmony export */   destinationDropdown: () => (/* binding */ destinationDropdown),
/* harmony export */   displayCalendar: () => (/* binding */ displayCalendar),
/* harmony export */   displayDestinationsList: () => (/* binding */ displayDestinationsList),
/* harmony export */   displayWelcomeMessage: () => (/* binding */ displayWelcomeMessage),
/* harmony export */   durationInput: () => (/* binding */ durationInput),
/* harmony export */   estimatedCost: () => (/* binding */ estimatedCost),
/* harmony export */   form: () => (/* binding */ form),
/* harmony export */   headerWelcome: () => (/* binding */ headerWelcome),
/* harmony export */   homePage: () => (/* binding */ homePage),
/* harmony export */   loginForm: () => (/* binding */ loginForm),
/* harmony export */   loginSection: () => (/* binding */ loginSection),
/* harmony export */   numTravelersInput: () => (/* binding */ numTravelersInput),
/* harmony export */   passwordInput: () => (/* binding */ passwordInput),
/* harmony export */   pastTripsList: () => (/* binding */ pastTripsList),
/* harmony export */   showPastTrips: () => (/* binding */ showPastTrips),
/* harmony export */   showTotalSpent: () => (/* binding */ showTotalSpent),
/* harmony export */   showUpcomingTrips: () => (/* binding */ showUpcomingTrips),
/* harmony export */   totalSpent: () => (/* binding */ totalSpent),
/* harmony export */   upcomingTripsList: () => (/* binding */ upcomingTripsList),
/* harmony export */   usernameInput: () => (/* binding */ usernameInput)
/* harmony export */ });
/* harmony import */ var _scripts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* ~~~~~~~~~~ IMPORTS ~~~~~~~~~~*/


/* ~~~~~~~~~~ QUERY SELECTORS ~~~~~~~~~~*/
const loginSection = document.querySelector('#login-section');
const homePage = document.querySelector('#homePage');
const loginForm = document.querySelector('#login-form');
const usernameInput = document.querySelector('#usernameInput');
const passwordInput = document.querySelector('#passwordInput');
const headerWelcome = document.querySelector('#headerWelcome');
const calendar = document.querySelector('#calendar');
const pastTripsList = document.querySelector('#pastTripsList');
const upcomingTripsList = document.querySelector('#upcomingTripsList')
const totalSpent = document.querySelector('#totalSpent');
const form = document.querySelector('#form');
const estimatedCost = document.querySelector('#estimatedCost');
const numTravelersInput = document.querySelector('#numTravelersInput');
const durationInput = document.querySelector('#durationInput');
const destinationDropdown = document.querySelector('#destinationDropdown');

/* ~~~~ DOM MANIPULATION FUNCTIONS ~~~~*/
function displayCalendar() {
  calendar.innerHTML = `<input id="dateInput" type="date" min="${_scripts__WEBPACK_IMPORTED_MODULE_0__.currentDate.split('/').join('-')}" name="calendar" placeholder="yyyy/mm/dd" required>`;
}

function displayWelcomeMessage(newUser) {
  headerWelcome.innerText = `Welcome, ${newUser.name}!`;
}

function displayDestinationsList() {
  _scripts__WEBPACK_IMPORTED_MODULE_0__.destinations.forEach(destination => {
    destinationDropdown.innerHTML += `
        <option value="${destination.id}">${destination.destination}</option>
      `;
  });
}

function showPastTrips(userId) {
  let pastTrips = (0,_scripts__WEBPACK_IMPORTED_MODULE_0__.getPastTrips)(userId);

  pastTripsList.innerHTML = '';

  pastTrips.forEach(trip => {
    const destinationInfo = (0,_scripts__WEBPACK_IMPORTED_MODULE_0__.getDestinationInfo)(trip.destinationID);
    pastTripsList.innerHTML += `
    <li style="font-size: 1.5em">${trip.date}: ${destinationInfo.destination}
    <img src=${destinationInfo.image} alt=${destinationInfo.alt} width="350" height="250"/></li>
    `;
  });
}

function showUpcomingTrips(userId) {
  let upcomingTrips = (0,_scripts__WEBPACK_IMPORTED_MODULE_0__.getUpcomingTrips)(userId);

  upcomingTrips.forEach(trip => {
    const destinationInfo = (0,_scripts__WEBPACK_IMPORTED_MODULE_0__.getDestinationInfo)(trip.destinationID);

    upcomingTripsList.innerHTML += `
    <li style="font-size: 1.5em">${trip.date}: ${destinationInfo.destination} <span style='color: red;'>*pending*</span>
    <img src=${destinationInfo.image} alt=${destinationInfo.alt} width="350" height="250"/></li>
    `;
  });
}

function showTotalSpent(userId) {
  const pastTrips = (0,_scripts__WEBPACK_IMPORTED_MODULE_0__.getPastTrips)(userId);
  const totalCost = Math.round(pastTrips.reduce((acc, trip) => {
    acc += (0,_scripts__WEBPACK_IMPORTED_MODULE_0__.getCostOfDestination)(trip.destinationID, trip.travelers, trip.duration);
    return acc;
  }, 0));
  let dollarUSLocale = Intl.NumberFormat('en-US');
  let totalPrice = dollarUSLocale.format(totalCost);
  totalSpent.innerHTML = `Total amount spent on trips: <strong> $${totalPrice} </strong>`;
}

/* ~~~~~~~~~~ EXPORTS ~~~~~~~~~~*/



/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map