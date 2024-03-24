"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  BASE_URL: () => BASE_URL,
  constructQueryUrl: () => constructQueryUrl,
  convertJsonToXCResponse: () => convertJsonToXCResponse,
  convertXCQueryOptionToSearchParams: () => convertXCQueryOptionToSearchParams,
  search: () => search
});
module.exports = __toCommonJS(src_exports);

// src/utils/utils.ts
function constructQueryUrl(baseUrl, query, options, page) {
  let url = new URL(baseUrl);
  let parms = new URLSearchParams();
  const processedQuery = query.trim();
  if (processedQuery) {
    parms.append("query", processedQuery);
  } else {
    parms.append("query", `""`);
  }
  if (options) {
    const optionParms = convertXCQueryOptionToSearchParams(options);
    for (let [key, val] of optionParms.entries()) {
      parms.append(key, `"${val}"`);
    }
  }
  if (page) {
    parms.append("page", String(page));
  }
  url.search = parms.toString();
  return url;
}
function convertXCQueryOptionToSearchParams(option) {
  const params = new URLSearchParams();
  if (!option) {
    return params;
  }
  Object.entries(option).forEach(([key, value]) => {
    params.append(key, String(value != null ? value : ""));
  });
  return params;
}
function convertJsonToXCResponse(json) {
  var _a;
  return {
    numRecordings: Number(json["numRecordings"]),
    numSpecies: Number(json["numSpecies"]),
    page: Number(json["page"]),
    numPages: Number(json["numPages"]),
    recordings: ((_a = json["recordings"]) == null ? void 0 : _a.map((recording) => {
      return {
        id: recording["id"],
        gen: recording["gen"],
        sp: recording["sp"],
        ssp: recording["ssp"],
        group: recording["group"],
        en: recording["en"],
        rec: recording["rec"],
        cnt: recording["cnt"],
        loc: recording["loc"],
        lat: recording["lat"],
        lng: recording["lng"],
        alt: recording["alt"],
        type: recording["type"],
        sex: recording["sex"],
        stage: recording["stage"],
        method: recording["method"],
        url: recording["url"],
        file: recording["file"],
        fileName: recording["file-name"],
        sono: {
          small: recording["sono"]["small"],
          med: recording["sono"]["med"],
          large: recording["sono"]["large"],
          full: recording["sono"]["full"]
        },
        osci: {
          small: recording["osci"]["small"],
          med: recording["osci"]["med"],
          large: recording["osci"]["large"]
        },
        lic: recording["lic"],
        q: recording["q"],
        length: recording["length"],
        time: recording["time"],
        date: recording["date"],
        uploaded: recording["uploaded"],
        also: recording["also"],
        rmk: recording["rmk"],
        birdSeen: recording["bird-seen"],
        animalSeen: recording["animal-seen"],
        playbackUsed: recording["playback-used"],
        temp: recording["temp"],
        regnr: recording["regnr"],
        auto: recording["auto"],
        dvc: recording["dvc"],
        mic: recording["mic"],
        smp: Number(recording["smp"])
      };
    })) || [],
    error: json["error"],
    message: json["message"]
  };
}

// src/index.ts
var BASE_URL = "https://www.xeno-canto.org/api/2/recordings";
function search(query, options, page, additionalOptions) {
  return __async(this, null, function* () {
    var _a;
    if (!query.trim() && !options) {
      return Promise.reject(
        new Error(
          "Please ensure that the 'query' parameter is not empty or that the 'options' parameter is provided"
        )
      );
    }
    const url = constructQueryUrl(
      (_a = additionalOptions == null ? void 0 : additionalOptions.baseUrl) != null ? _a : BASE_URL,
      query,
      options,
      page
    );
    try {
      const rawResponse = yield fetch(url);
      const json = yield rawResponse.json();
      const xcResponse = convertJsonToXCResponse(json);
      if (xcResponse.error) {
        Promise.reject(
          new Error(
            `Xeno-Canto API returned error '${xcResponse.error}': ${xcResponse.message}`
          )
        );
      }
      return Promise.resolve({ url, rawResponse, xcResponse });
    } catch (error) {
      console.error(error);
      return Promise.reject(
        new Error(`Failed to perform search: ${error.message}`)
      );
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BASE_URL,
  constructQueryUrl,
  convertJsonToXCResponse,
  convertXCQueryOptionToSearchParams,
  search
});
//# sourceMappingURL=index.js.map