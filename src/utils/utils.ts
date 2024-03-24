import { XCQueryOption } from "../types/query";
import { XCRecording, XCResponse } from "../types/response";

/**
 * Constructs a query URL by appending the provided query string to the base URL and optionally including additional query options.
 *
 * @param {string} baseUrl - The base URL to which the query string will be appended.
 * @param {string} query - The query string to be appended to the base URL.
 * @param {XCQueryOption} [options] - Optional additional query options.
 * @param {number} [page] - Optional page number.
 * @return {URL | string} The constructed query URL.
 */
export function constructQueryUrl(
  baseUrl: string,
  query: string,
  options?: XCQueryOption,
  page?: number,
): URL | string {
  let url: URL | string;

  try {
    url = new URL(baseUrl);
  } catch (error) {
    // If the base URL is not a valid URL, fallback to a string URL
    url = baseUrl;
  }

  let parms = new URLSearchParams();

  // Append query to search parameters
  const processedQuery = query.trim();
  if (processedQuery) {
    parms.append("query", processedQuery);
  } else {
    parms.append("query", `""`); // As an empty query is not allowed
  }

  // Append options to search parameters
  if (options) {
    const optionParms = convertXCQueryOptionToSearchParams(options);
    for (let [key, val] of optionParms.entries()) {
      parms.append(key, `"${val}"`);
    }
  }

  // Append page to search parameters
  if (page) {
    parms.append("page", String(page));
  }

  // Set search parameters
  if (typeof url === "object" && url instanceof URL) {
    url.search = parms.toString();
  } else {
    const queryString = parms.toString();
    url += (url.includes("?") ? "&" : "?") + queryString;
  }

  return url;
}

/**
 * Converts an XCQueryOption object to a required URL string parameter format. For example: "grp:"birds" cnt:"United States" method:"field recording""
 *
 * @param {XCQueryOption} option - The XCQueryOption object to convert.
 * @return {URLSearchParams} The URLSearchParams object representing the XCQueryOption object.
 */
export function convertXCQueryOptionToSearchParams(
  option: XCQueryOption,
): URLSearchParams {
  const params = new URLSearchParams();

  if (!option) {
    return params;
  }

  Object.entries(option).forEach(([key, value]) => {
    params.append(key, String(value ?? ""));
  });

  return params;
}

/**
 * Takes a JSON object and converts it into an XCResponse object.
 *
 * @param {any} json - The JSON object to be converted.
 * @return {XCResponse} The converted XCResponse object.
 */
export function convertJsonToXCResponse(json: any): XCResponse {
  return {
    numRecordings: Number(json["numRecordings"]),
    numSpecies: Number(json["numSpecies"]),
    page: Number(json["page"]),
    numPages: Number(json["numPages"]),
    recordings:
      json["recordings"]?.map((recording: any): XCRecording => {
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
            full: recording["sono"]["full"],
          },
          osci: {
            small: recording["osci"]["small"],
            med: recording["osci"]["med"],
            large: recording["osci"]["large"],
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
          smp: Number(recording["smp"]),
        };
      }) || [],
    error: json["error"],
    message: json["message"],
  };
}
