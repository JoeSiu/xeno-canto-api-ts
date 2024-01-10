import { XCQueryOption } from "../types/query";
import { XCRecording, XCResponse } from "../types/response";

/**
 * Constructs a query URL by appending the provided query string to the base URL and optionally including additional query options.
 *
 * @param {string} baseUrl - The base URL to which the query string will be appended.
 * @param {string} query - The query string to be appended to the base URL.
 * @param {XCQueryOption} [options] - Optional additional query options.
 * @param {number} [page] - Optional page number.
 * @return {string} The constructed query URL.
 */
export function constructQueryUrl(
  baseUrl: string,
  query: string,
  options?: XCQueryOption,
  page?: number,
): string {
  let url = baseUrl;

  if (query.trim()) {
    url += query.trim();

    if (options) {
      url += " ";
    }
  }

  if (options) {
    url += convertXCQueryOptionToString(options);
  }

  if (page) {
    url += `&page=${page}`;
  }

  url = url.replace(/\s+/g, "+"); // Replace spaces with +

  return url;
}

/**
 * Converts an XCQueryOption object to a required URL string parameter format. For example: "grp:"birds" cnt:"United States" method:"field recording""
 *
 * @param {XCQueryOption} option - The XCQueryOption object to convert.
 * @return {string} The formatted string representation of the XCQueryOption object.
 */
export function convertXCQueryOptionToString(option: XCQueryOption): string {
  if (!option) {
    return "";
  }

  return Object.entries(option)
    .map(([key, value]) => `${key}:"${value ?? ""}"`)
    .join(" ");
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
