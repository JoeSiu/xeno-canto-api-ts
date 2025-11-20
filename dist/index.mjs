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

// src/types/query.ts
var XCQueryKey = /* @__PURE__ */ ((XCQueryKey2) => {
  XCQueryKey2["key"] = "key";
  XCQueryKey2["per_page"] = "per_page";
  XCQueryKey2["page"] = "page";
  XCQueryKey2["grp"] = "grp";
  XCQueryKey2["gen"] = "gen";
  XCQueryKey2["sp"] = "sp";
  XCQueryKey2["ssp"] = "ssp";
  XCQueryKey2["fam"] = "fam";
  XCQueryKey2["en"] = "en";
  XCQueryKey2["rec"] = "rec";
  XCQueryKey2["cnt"] = "cnt";
  XCQueryKey2["loc"] = "loc";
  XCQueryKey2["rmk"] = "rmk";
  XCQueryKey2["seen"] = "seen";
  XCQueryKey2["playback"] = "playback";
  XCQueryKey2["lan"] = "lan";
  XCQueryKey2["lon"] = "lon";
  XCQueryKey2["box"] = "box";
  XCQueryKey2["also"] = "also";
  XCQueryKey2["type"] = "type";
  XCQueryKey2["othertype"] = "othertype";
  XCQueryKey2["sex"] = "sex";
  XCQueryKey2["state"] = "state";
  XCQueryKey2["method"] = "method";
  XCQueryKey2["nr"] = "nr";
  XCQueryKey2["lic"] = "lic";
  XCQueryKey2["q"] = "q";
  XCQueryKey2["len"] = "len";
  XCQueryKey2["area"] = "area";
  XCQueryKey2["since"] = "since";
  XCQueryKey2["year"] = "year";
  XCQueryKey2["month"] = "month";
  XCQueryKey2["colyear"] = "colyear";
  XCQueryKey2["colmonth"] = "colmonth";
  XCQueryKey2["temp"] = "temp";
  XCQueryKey2["regnr"] = "regnr";
  XCQueryKey2["auto"] = "auto";
  XCQueryKey2["dvc"] = "dvc";
  XCQueryKey2["mic"] = "mic";
  XCQueryKey2["smp"] = "smp";
  return XCQueryKey2;
})(XCQueryKey || {});

// src/types/response.ts
var XCResponseKey = /* @__PURE__ */ ((XCResponseKey2) => {
  XCResponseKey2["numRecordings"] = "numRecordings";
  XCResponseKey2["numSpecies"] = "numSpecies";
  XCResponseKey2["page"] = "page";
  XCResponseKey2["numPages"] = "numPages";
  XCResponseKey2["recordings"] = "recordings";
  XCResponseKey2["error"] = "error";
  XCResponseKey2["message"] = "message";
  return XCResponseKey2;
})(XCResponseKey || {});
var XCRecordingKey = /* @__PURE__ */ ((XCRecordingKey2) => {
  XCRecordingKey2["id"] = "id";
  XCRecordingKey2["gen"] = "gen";
  XCRecordingKey2["sp"] = "sp";
  XCRecordingKey2["ssp"] = "ssp";
  XCRecordingKey2["group"] = "grp";
  XCRecordingKey2["en"] = "en";
  XCRecordingKey2["rec"] = "rec";
  XCRecordingKey2["cnt"] = "cnt";
  XCRecordingKey2["loc"] = "loc";
  XCRecordingKey2["lat"] = "lat";
  XCRecordingKey2["lon"] = "lon";
  XCRecordingKey2["alt"] = "alt";
  XCRecordingKey2["type"] = "type";
  XCRecordingKey2["sex"] = "sex";
  XCRecordingKey2["stage"] = "stage";
  XCRecordingKey2["method"] = "method";
  XCRecordingKey2["url"] = "url";
  XCRecordingKey2["file"] = "file";
  XCRecordingKey2["fileName"] = "fileName";
  XCRecordingKey2["sono"] = "sono";
  XCRecordingKey2["osci"] = "osci";
  XCRecordingKey2["lic"] = "lic";
  XCRecordingKey2["q"] = "q";
  XCRecordingKey2["length"] = "length";
  XCRecordingKey2["time"] = "time";
  XCRecordingKey2["date"] = "date";
  XCRecordingKey2["uploaded"] = "uploaded";
  XCRecordingKey2["also"] = "also";
  XCRecordingKey2["rmk"] = "rmk";
  XCRecordingKey2["birdSeen"] = "birdSeen";
  XCRecordingKey2["animalSeen"] = "animalSeen";
  XCRecordingKey2["playbackUsed"] = "playbackUsed";
  XCRecordingKey2["temp"] = "temp";
  XCRecordingKey2["regnr"] = "regnr";
  XCRecordingKey2["auto"] = "auto";
  XCRecordingKey2["dvc"] = "dvc";
  XCRecordingKey2["mic"] = "mic";
  XCRecordingKey2["smp"] = "smp";
  XCRecordingKey2["small"] = "small";
  XCRecordingKey2["med"] = "med";
  XCRecordingKey2["large"] = "large";
  XCRecordingKey2["full"] = "full";
  return XCRecordingKey2;
})(XCRecordingKey || {});

// src/utils/utils.ts
function constructQueryUrl(baseUrl, options) {
  let url;
  try {
    url = new URL(baseUrl);
  } catch (error) {
    url = baseUrl;
  }
  const parms = convertXCQueryOptionToURLSearchParams(options);
  const parmsString = parms.toString();
  if (typeof url === "object" && url instanceof URL) {
    url.search = parmsString;
  } else {
    url += (url.includes("?") ? "&" : "?") + parmsString;
  }
  return url;
}
function sanitizeQuery(query) {
  const pattern = new RegExp(/[`'"]/, "g");
  const result = query.trim().replace(pattern, "");
  return result;
}
function convertXCQueryOptionToURLSearchParams(options) {
  const params = new URLSearchParams();
  const queryParts = [];
  Object.entries(options).forEach(([key, value]) => {
    if (value === void 0 || value === null) {
      return;
    }
    if (key === "key" /* key */ || key === "page" /* page */ || key === "per_page" /* per_page */) {
      params.append(key, String(value));
      return;
    }
    queryParts.push(`${key}:"${value}"`);
  });
  if (queryParts.length > 0) {
    params.append("query", queryParts.join(" "));
  }
  return params;
}
function convertJsonToXCResponse(json) {
  var _a;
  return {
    numRecordings: Number(json["numRecordings" /* numRecordings */]),
    numSpecies: Number(json["numSpecies" /* numSpecies */]),
    page: Number(json["page" /* page */]),
    numPages: Number(json["numPages" /* numPages */]),
    recordings: ((_a = json["recordings" /* recordings */]) == null ? void 0 : _a.map((recording) => {
      return {
        id: recording["id" /* id */],
        gen: recording["gen" /* gen */],
        sp: recording["sp" /* sp */],
        ssp: recording["ssp" /* ssp */],
        grp: recording["grp" /* group */],
        en: recording["en" /* en */],
        rec: recording["rec" /* rec */],
        cnt: recording["cnt" /* cnt */],
        loc: recording["loc" /* loc */],
        lat: recording["lat" /* lat */],
        lon: recording["lon" /* lon */],
        alt: recording["alt" /* alt */],
        type: recording["type" /* type */],
        sex: recording["sex" /* sex */],
        stage: recording["stage" /* stage */],
        method: recording["method" /* method */],
        url: recording["url" /* url */],
        file: recording["file" /* file */],
        fileName: recording["fileName" /* fileName */],
        sono: {
          small: recording["sono" /* sono */]["small" /* small */],
          med: recording["sono" /* sono */]["med" /* med */],
          large: recording["sono" /* sono */]["large" /* large */],
          full: recording["sono" /* sono */]["full" /* full */]
        },
        osci: {
          small: recording["osci" /* osci */]["small" /* small */],
          med: recording["osci" /* osci */]["med" /* med */],
          large: recording["osci" /* osci */]["large" /* large */]
        },
        lic: recording["lic" /* lic */],
        q: recording["q" /* q */],
        length: recording["length" /* length */],
        time: recording["time" /* time */],
        date: recording["date" /* date */],
        uploaded: recording["uploaded" /* uploaded */],
        also: recording["also" /* also */],
        rmk: recording["rmk" /* rmk */],
        birdSeen: recording["birdSeen" /* birdSeen */],
        animalSeen: recording["animalSeen" /* animalSeen */],
        playbackUsed: recording["playbackUsed" /* playbackUsed */],
        temp: recording["temp" /* temp */],
        regnr: recording["regnr" /* regnr */],
        auto: recording["auto" /* auto */],
        dvc: recording["dvc" /* dvc */],
        mic: recording["mic" /* mic */],
        smp: Number(recording["smp" /* smp */])
      };
    })) || [],
    error: json["error" /* error */],
    message: json["message" /* message */]
  };
}

// src/index.ts
var BASE_URL = "https://xeno-canto.org/api/3/recordings";
function search(options, additionalOptions) {
  return __async(this, null, function* () {
    var _a;
    try {
      const url = constructQueryUrl(
        (_a = additionalOptions == null ? void 0 : additionalOptions.baseUrl) != null ? _a : BASE_URL,
        options
      );
      const rawResponse = yield fetch(url);
      const json = yield rawResponse.json();
      const xcResponse = convertJsonToXCResponse(json);
      if (xcResponse.error && !(additionalOptions == null ? void 0 : additionalOptions.muteApiError)) {
        throw new Error(
          `Xeno-Canto API returned error '${xcResponse.error}': ${xcResponse.message}`
        );
      }
      return Promise.resolve({ url: new URL(url), rawResponse, xcResponse });
    } catch (error) {
      return Promise.reject(
        new Error(`Failed to perform search: ${error.message}`)
      );
    }
  });
}
export {
  BASE_URL,
  XCQueryKey,
  XCRecordingKey,
  XCResponseKey,
  constructQueryUrl,
  convertJsonToXCResponse,
  convertXCQueryOptionToURLSearchParams,
  sanitizeQuery,
  search
};
//# sourceMappingURL=index.mjs.map