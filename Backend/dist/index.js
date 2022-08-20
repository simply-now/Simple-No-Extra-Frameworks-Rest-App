/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 144:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const http = __importStar(__nccwpck_require__(685));
const url = __importStar(__nccwpck_require__(310));
const { getReqData } = __nccwpck_require__(314);
const PORT = process.env.PORT || 7000;
const server = http.createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // Fetch Get sending data via search Params
    if (req.url && req.method === "GET" && typeof url.parse(req.url, true).query.int1 === "string" && typeof url.parse(req.url, true).query.int2 === "string") {
        try {
            const urlValues = url.parse(req.url, true);
            const qInt1 = (_a = urlValues.query.int1) !== null && _a !== void 0 ? _a : "";
            const qInt2 = (_b = urlValues.query.int2) !== null && _b !== void 0 ? _b : "";
            let int1 = 0;
            let int2 = 0;
            let sum = 0;
            if (typeof qInt1 === 'string') {
                int1 = parseInt(qInt1);
            }
            if (typeof qInt2 === 'string') {
                int2 = parseInt(qInt2);
            }
            sum = int1 + int2;
            // set the status code, and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the data
            res.end(JSON.stringify(sum));
        }
        catch (error) {
            // set the status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send the error
            res.end(JSON.stringify({ message: error }));
        }
    }
    // Fetch Get sending data via post body
    else if (req.url === "/api/sums/" && req.method === "POST" || req.url === "/api/sums" && req.method === "POST") {
        try {
            let sum_data = yield getReqData(req);
            let jsonSumData = JSON.parse(sum_data);
            let int1 = 0;
            let int2 = 0;
            let sum = 0;
            if (sum_data && typeof jsonSumData.firstNumber === "number" && typeof jsonSumData.secondNumber === "number") {
                if (typeof jsonSumData.firstNumber === 'number') {
                    int1 = jsonSumData.firstNumber;
                }
                if (typeof jsonSumData.secondNumber === 'number') {
                    int2 = jsonSumData.secondNumber;
                }
                sum = int1 + int2;
                // set the status code, and content-type
                res.writeHead(200, { "Content-Type": "application/json" });
                // send the data
                res.end(JSON.stringify(sum));
            }
            else {
                res.writeHead(404, { "Content-Type": "application/json" });
                // send the error for Missing FormData
                res.end(JSON.stringify({ message: "Missing FormData" }));
            }
        }
        catch (error) {
            // set the status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send the error
            res.end(JSON.stringify({ message: error }));
        }
    }
    // No route present
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
}));
server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});


/***/ }),

/***/ 314:
/***/ ((module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function getReqData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            // listen to data sent by client
            req.on("data", (chunk) => {
                // append the string version to the body
                body += chunk.toString();
            });
            // listen till the end
            req.on("end", () => {
                // send back the data
                resolve(body);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
module.exports = { getReqData };


/***/ }),

/***/ 685:
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ 310:
/***/ ((module) => {

module.exports = require("url");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(144);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;