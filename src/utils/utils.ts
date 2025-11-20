import { XCQueryKey, XCQueryOption, XCRecording, XCRecordingKey, XCResponse, XCResponseKey } from "../types";

/**
 * Constructs a query URL by appending the provided query string to the base URL and optionally including additional query options.
 *
 * @param {string} baseUrl - The base URL to which the query string will be appended.
 * @param {XCQueryOption} [options] - The XCQueryOption object to convert.
 * @return {URL | string} The constructed query URL.
 */
export function constructQueryUrl(
  baseUrl: string,
  options: XCQueryOption
): URL | string {
  let url: URL | string;

  // Try create a URL object from the base URL
  try {
    url = new URL(baseUrl);
  } catch (error) {
    // If the base URL can't be parsed as a valid URL object (e.g., API route), fallback to a string URL
    url = baseUrl;
  }

  // Append options to search parameters
  const parms = convertXCQueryOptionToURLSearchParams(options);
  const parmsString = parms.toString();

  // Set URL object's search parameters
  if (typeof url === "object" && url instanceof URL) {
    url.search = parmsString;
  } else {
    // Create a string URL with the search parameters
    url += (url.includes("?") ? "&" : "?") + parmsString;
  }

  return url;
}

/**
 * Remove whitespace from query, and remove special characters (e.g., quotes)
 *
 * @param {string} query - The query string to sanitize
 * @return {string} The sanitized query string, or string `""` if query is empty after processing
 */
export function sanitizeQuery(query: string): string {
  // Remove whitespace from query, and remove special characters (e.g., quotes)
  const pattern = new RegExp(/[`'"]/, "g");
  const result = query.trim().replace(pattern, "");
  return result;
}

/**
 * Converts an XCQueryOption object to a required URL string parameter format. 
 * For example: query="grp:"birds" cnt:"United States""&key=...
 *
 * @param {XCQueryOption} options - The XCQueryOption object to convert.
 * @param {AdditionalConvertOption} [additionalOptions] - Additional convert options.
 * @return {URLSearchParams} The URLSearchParams object representing the XCQueryOption object.
 */
export function convertXCQueryOptionToURLSearchParams(
  options: XCQueryOption
): URLSearchParams {
  const params = new URLSearchParams();
  const queryParts: string[] = [];

  Object.entries(options).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    // Handle special parameters
    if (key === XCQueryKey.key || key === XCQueryKey.page || key === XCQueryKey.per_page) {
      params.append(key, String(value));
      return;
    }

    // Handle all other parameters
    // Surround the value in double quotes
    queryParts.push(`${key}:"${value}"`);
  });

  // If there are any query parts, join them with spaces and append as 'query' parameter
  if (queryParts.length > 0) {
    params.append('query', queryParts.join(' '));
  }

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
    numRecordings: Number(json[XCResponseKey.numRecordings]),
    numSpecies: Number(json[XCResponseKey.numSpecies]),
    page: Number(json[XCResponseKey.page]),
    numPages: Number(json[XCResponseKey.numPages]),
    recordings:
      json[XCResponseKey.recordings]?.map((recording: any): XCRecording => {
        return {
          id: recording[XCRecordingKey.id],
          gen: recording[XCRecordingKey.gen],
          sp: recording[XCRecordingKey.sp],
          ssp: recording[XCRecordingKey.ssp],
          grp: recording[XCRecordingKey.group],
          en: recording[XCRecordingKey.en],
          rec: recording[XCRecordingKey.rec],
          cnt: recording[XCRecordingKey.cnt],
          loc: recording[XCRecordingKey.loc],
          lat: recording[XCRecordingKey.lat],
          lon: recording[XCRecordingKey.lon],
          alt: recording[XCRecordingKey.alt],
          type: recording[XCRecordingKey.type],
          sex: recording[XCRecordingKey.sex],
          stage: recording[XCRecordingKey.stage],
          method: recording[XCRecordingKey.method],
          url: recording[XCRecordingKey.url],
          file: recording[XCRecordingKey.file],
          fileName: recording[XCRecordingKey.fileName],
          sono: {
            small: recording[XCRecordingKey.sono][XCRecordingKey.small],
            med: recording[XCRecordingKey.sono][XCRecordingKey.med],
            large: recording[XCRecordingKey.sono][XCRecordingKey.large],
            full: recording[XCRecordingKey.sono][XCRecordingKey.full],
          },
          osci: {
            small: recording[XCRecordingKey.osci][XCRecordingKey.small],
            med: recording[XCRecordingKey.osci][XCRecordingKey.med],
            large: recording[XCRecordingKey.osci][XCRecordingKey.large],
          },
          lic: recording[XCRecordingKey.lic],
          q: recording[XCRecordingKey.q],
          length: recording[XCRecordingKey.length],
          time: recording[XCRecordingKey.time],
          date: recording[XCRecordingKey.date],
          uploaded: recording[XCRecordingKey.uploaded],
          also: recording[XCRecordingKey.also],
          rmk: recording[XCRecordingKey.rmk],
          birdSeen: recording[XCRecordingKey.birdSeen],
          animalSeen: recording[XCRecordingKey.animalSeen],
          playbackUsed: recording[XCRecordingKey.playbackUsed],
          temp: recording[XCRecordingKey.temp],
          regnr: recording[XCRecordingKey.regnr],
          auto: recording[XCRecordingKey.auto],
          dvc: recording[XCRecordingKey.dvc],
          mic: recording[XCRecordingKey.mic],
          smp: Number(recording[XCRecordingKey.smp]),
        };
      }) || [],
    error: json[XCResponseKey.error],
    message: json[XCResponseKey.message],
  };
}
