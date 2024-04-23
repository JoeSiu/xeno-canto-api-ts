import { XCQueryKey, XCQueryOption, XCRecording, XCRecordingKey, XCResponse, XCResponseKey } from "../types";

/**
 * Represents additional options for general convert function.
 */
export interface AdditionalConvertOption {
  /**
   * Whether to skip the query string sanitization.
   */
  skipSanitizeQuery?: boolean;
  /**
 * Don't throw an error if no query is provided.
 */
  skipEmptyQueryCheck?: boolean;
}

/**
 * Constructs a query URL by appending the provided query string to the base URL and optionally including additional query options.
 *
 * @param {string} baseUrl - The base URL to which the query string will be appended.
 * @param {XCQueryOption} [options] - The XCQueryOption object to convert.
 * @param {AdditionalConvertOption} [additionalOptions] - Additional convert options.
 * @return {URL | string} The constructed query URL.
 */
export function constructQueryUrl(
  baseUrl: string,
  options: XCQueryOption,
  additionalOptions?: AdditionalConvertOption,
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
  const parms = convertXCQueryOptionToURLSearchParams(options, additionalOptions);
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
 * Converts an XCQueryOption object to a required URL string parameter format. For example: "grp:"birds" cnt:"United States" method:"field recording""
 *
 * @param {XCQueryOption} options - The XCQueryOption object to convert.
 * @param {AdditionalConvertOption} [additionalOptions] - Additional convert options.
 * @return {URLSearchParams} The URLSearchParams object representing the XCQueryOption object.
 */
export function convertXCQueryOptionToURLSearchParams(
  options: XCQueryOption,
  additionalOptions?: AdditionalConvertOption,
): URLSearchParams {
  const params = new URLSearchParams();

  // Sanitize the query string
  if (!additionalOptions?.skipSanitizeQuery) options.query = sanitizeQuery(options.query);

  // Check if query is empty (As the API doesn't accept empty query by default)
  if (!additionalOptions?.skipEmptyQueryCheck && !options.query) {
    throw new Error(
      "The API doesn't allow empty query without other parameters. " +
      "Please ensure that the 'query' parameter in 'options' is not empty, " +
      "or set 'muteEmptyQueryError' in `additionalOptions` to `true` to mute this error.",
    );
  }

  // Append rest of options to search parameters
  Object.entries(options).forEach(([key, value]) => {
    let newValue = value;

    // Additional processing for specific keys
    switch (key) {
      case XCQueryKey.query:
      case XCQueryKey.page:
        // Do nothing (no need to surround the value in double quotes)
        break;

      default:
        // Surround the value in double quotes
        newValue = `"${value}"`;
        break;
    }

    params.append(key, String(newValue));
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
          group: recording[XCRecordingKey.group],
          en: recording[XCRecordingKey.en],
          rec: recording[XCRecordingKey.rec],
          cnt: recording[XCRecordingKey.cnt],
          loc: recording[XCRecordingKey.loc],
          lat: recording[XCRecordingKey.lat],
          lng: recording[XCRecordingKey.lng],
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
