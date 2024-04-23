import { XCQueryNameDefinition, XCQueryOption } from "../types/query";
import { XCRecording, XCRecordingNameDefinition, XCResponse, XCResponseNameDefinition } from "../types/response";

/**
 * Constructs a query URL by appending the provided query string to the base URL and optionally including additional query options.
 *
 * @param {string} baseUrl - The base URL to which the query string will be appended.
 * @param {XCQueryOption} [options] - Optional additional query options.
 * @return {URL | string} The constructed query URL.
 */
export function constructQueryUrl(
  baseUrl: string,
  options: XCQueryOption,
): URL | string {
  let url: URL | string;

  // Try create a URL object from the base URL
  try {
    url = new URL(baseUrl);
  } catch (error) {
    // If the base URL can't be parsed as a valid URL object (e.g., API route), fallback to a string URL
    url = baseUrl;
  }

  let parms = new URLSearchParams();

  // Append options to search parameters
  const optionParms = convertXCQueryOptionToSearchParams(options);
  for (let [key, val] of optionParms.entries()) {
    parms.append(key, `"${val}"`);
  }

  // Set URL object's search parameters
  if (typeof url === "object" && url instanceof URL) {
    url.search = parms.toString();
  } else {
    // Create a string URL with the search parameters
    const queryString = parms.toString();
    url += (url.includes("?") ? "&" : "?") + queryString;
  }

  return url;
}

/**
 * Converts an XCQueryOption object to a required URL string parameter format. For example: "grp:"birds" cnt:"United States" method:"field recording""
 *
 * @param {XCQueryOption} options - The XCQueryOption object to convert.
 * @return {URLSearchParams} The URLSearchParams object representing the XCQueryOption object.
 */
export function convertXCQueryOptionToSearchParams(
  options: XCQueryOption,
): URLSearchParams {
  const params = new URLSearchParams();

  if (!options) {
    return params;
  }

  // Append query to search parameters
  const processedQuery = options.query.trim();
  if (processedQuery) {
    params.append(XCQueryNameDefinition.query, processedQuery);
  } else {
    params.append(XCQueryNameDefinition.query, `""`); // As an empty query is not allowed
  }

  // Append page to search parameters
  if (options.page) {
    params.append(XCQueryNameDefinition.page, String(options.page));
  }

  // Append rest of options to search parameters
  Object.entries(options).forEach(([key, value]) => {
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
    numRecordings: Number(json[XCResponseNameDefinition.numRecordings]),
    numSpecies: Number(json[XCResponseNameDefinition.numSpecies]),
    page: Number(json[XCResponseNameDefinition.page]),
    numPages: Number(json[XCResponseNameDefinition.numPages]),
    recordings:
      json[XCResponseNameDefinition.recordings]?.map((recording: any): XCRecording => {
        return {
          id: recording[XCRecordingNameDefinition.id],
          gen: recording[XCRecordingNameDefinition.gen],
          sp: recording[XCRecordingNameDefinition.sp],
          ssp: recording[XCRecordingNameDefinition.ssp],
          group: recording[XCRecordingNameDefinition.group],
          en: recording[XCRecordingNameDefinition.en],
          rec: recording[XCRecordingNameDefinition.rec],
          cnt: recording[XCRecordingNameDefinition.cnt],
          loc: recording[XCRecordingNameDefinition.loc],
          lat: recording[XCRecordingNameDefinition.lat],
          lng: recording[XCRecordingNameDefinition.lng],
          alt: recording[XCRecordingNameDefinition.alt],
          type: recording[XCRecordingNameDefinition.type],
          sex: recording[XCRecordingNameDefinition.sex],
          stage: recording[XCRecordingNameDefinition.stage],
          method: recording[XCRecordingNameDefinition.method],
          url: recording[XCRecordingNameDefinition.url],
          file: recording[XCRecordingNameDefinition.file],
          fileName: recording[XCRecordingNameDefinition.fileName],
          sono: {
            small: recording[XCRecordingNameDefinition.sono][XCRecordingNameDefinition.small],
            med: recording[XCRecordingNameDefinition.sono][XCRecordingNameDefinition.med],
            large: recording[XCRecordingNameDefinition.sono][XCRecordingNameDefinition.large],
            full: recording[XCRecordingNameDefinition.sono][XCRecordingNameDefinition.full],
          },
          osci: {
            small: recording[XCRecordingNameDefinition.osci][XCRecordingNameDefinition.small],
            med: recording[XCRecordingNameDefinition.osci][XCRecordingNameDefinition.med],
            large: recording[XCRecordingNameDefinition.osci][XCRecordingNameDefinition.large],
          },
          lic: recording[XCRecordingNameDefinition.lic],
          q: recording[XCRecordingNameDefinition.q],
          length: recording[XCRecordingNameDefinition.length],
          time: recording[XCRecordingNameDefinition.time],
          date: recording[XCRecordingNameDefinition.date],
          uploaded: recording[XCRecordingNameDefinition.uploaded],
          also: recording[XCRecordingNameDefinition.also],
          rmk: recording[XCRecordingNameDefinition.rmk],
          birdSeen: recording[XCRecordingNameDefinition.birdSeen],
          animalSeen: recording[XCRecordingNameDefinition.animalSeen],
          playbackUsed: recording[XCRecordingNameDefinition.playbackUsed],
          temp: recording[XCRecordingNameDefinition.temp],
          regnr: recording[XCRecordingNameDefinition.regnr],
          auto: recording[XCRecordingNameDefinition.auto],
          dvc: recording[XCRecordingNameDefinition.dvc],
          mic: recording[XCRecordingNameDefinition.mic],
          smp: Number(recording[XCRecordingNameDefinition.smp]),
        };
      }) || [],
    error: json[XCResponseNameDefinition.error],
    message: json[XCResponseNameDefinition.message],
  };
}
