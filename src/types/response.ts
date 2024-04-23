/**
 * Represents the keys for the response options.
 */
export enum XCResponseKey {
  numRecordings = "numRecordings",
  numSpecies = "numSpecies",
  page = "page",
  numPages = "numPages",
  recordings = "recordings",
  error = "error",
  message = "message",
}

/**
 * Represents the keys for the recording options.
 */
export enum XCRecordingKey {
  id = "id",
  gen = "gen",
  sp = "sp",
  ssp = "ssp",
  group = "group",
  en = "en",
  rec = "rec",
  cnt = "cnt",
  loc = "loc",
  lat = "lat",
  lng = "lng",
  alt = "alt",
  type = "type",
  sex = "sex",
  stage = "stage",
  method = "method",
  url = "url",
  file = "file",
  fileName = "fileName",
  sono = "sono",
  osci = "osci",
  lic = "lic",
  q = "q",
  length = "length",
  time = "time",
  date = "date",
  uploaded = "uploaded",
  also = "also",
  rmk = "rmk",
  birdSeen = "birdSeen",
  animalSeen = "animalSeen",
  playbackUsed = "playbackUsed",
  temp = "temp",
  regnr = "regnr",
  auto = "auto",
  dvc = "dvc",
  mic = "mic",
  smp = "smp",
  small = "small",
  med = "med",
  large = "large",
  full = "full",
}


/**
 * Represents the response object returned by the Xeno-Canto API.
 */
export interface XCResponse {
  /**
   * The total number of recordings found for this query.
   */
  [XCResponseKey.numRecordings]: number;
  /**
   * The total number of species found for this query.
   */
  [XCResponseKey.numSpecies]: number;
  /**
   * The page number of the results page that is being displayed.
   */
  [XCResponseKey.page]: number;
  /**
   * The total number of pages available for this query.
   */
  [XCResponseKey.numPages]: number;
  /**
   * An array of recording objects.
   */
  [XCResponseKey.recordings]: XCRecording[];
  /**
   * Error type, if any.
   */
  [XCResponseKey.error]?: string;
  /**
   * Error message, if any.
   */
  [XCResponseKey.message]?: string;
}

/**
 * Represents a recording entity from the Xeno-Canto API response's "recordings" array.
 */
export interface XCRecording {
  /**
   * The catalogue number of the recording on xeno-canto.
   */
  [XCRecordingKey.id]: string;
  /**
   * The generic name of the species.
   */
  [XCRecordingKey.gen]: string;
  /**
   * The specific name (epithet) of the species.
   */
  [XCRecordingKey.sp]: string;
  /**
   * The subspecies name (subspecific epithet).
   */
  [XCRecordingKey.ssp]: string;
  /**
   * The group to which the species belongs (birds, grasshoppers, bats).
   */
  [XCRecordingKey.group]: string;
  /**
   * The English name of the species.
   */
  [XCRecordingKey.en]: string;
  /**
   * The name of the recordist.
   */
  [XCRecordingKey.rec]: string;
  /**
   * The country where the recording was made.
   */
  [XCRecordingKey.cnt]: string;
  /**
   * The name of the locality.
   */
  [XCRecordingKey.loc]: string;
  /**
   * The latitude of the recording in decimal coordinates.
   */
  [XCRecordingKey.lat]: string;
  /**
   * The longitude of the recording in decimal coordinates.
   */
  [XCRecordingKey.lng]: string;
  /**
   * Elevation (in meter).
   */
  [XCRecordingKey.alt]: string;
  /**
   * The sound type of the recording (combining both predefined terms such as 'call' or 'song' and additional free text options).
   */
  [XCRecordingKey.type]: string;
  /**
   * The sex of the animal.
   */
  [XCRecordingKey.sex]: string;
  /**
   * The life stage of the animal (adult, juvenile, etc.).
   */
  [XCRecordingKey.stage]: string;
  /**
   * The recording method (field recording, in the hand, etc.).
   */
  [XCRecordingKey.method]: string;
  /**
   * The URL specifying the details of this recording.
   */
  [XCRecordingKey.url]: string;
  /**
   * The URL to the audio file.
   */
  [XCRecordingKey.file]: string;
  /**
   * The original file name of the audio file.
   */
  [XCRecordingKey.fileName]: string;
  /**
   * An object with the URLs to the four versions of sonograms.
   */
  [XCRecordingKey.sono]: {
    [XCRecordingKey.small]: string;
    [XCRecordingKey.med]: string;
    [XCRecordingKey.large]: string;
    [XCRecordingKey.full]: string;
  };
  /**
   * An object with the URLs to the three versions of oscillograms.
   */
  [XCRecordingKey.osci]: {
    [XCRecordingKey.small]: string;
    [XCRecordingKey.med]: string;
    [XCRecordingKey.large]: string;
  };
  /**
   * The URL describing the license of this recording.
   */
  [XCRecordingKey.lic]: string;
  /**
   * The current quality rating for the recording.
   */
  [XCRecordingKey.q]: string;
  /**
   * The length of the recording in minutes.
   */
  [XCRecordingKey.length]: string;
  /**
   * The time of day that the recording was made.
   */
  [XCRecordingKey.time]: string;
  /**
   * The date that the recording was made.
   */
  [XCRecordingKey.date]: string;
  /**
   * The date that the recording was uploaded to xeno-canto.
   */
  [XCRecordingKey.uploaded]: string;
  /**
   * An array with the identified background species in the recording.
   */
  [XCRecordingKey.also]: string[];
  /**
   * Additional remarks by the recordist.
   */
  [XCRecordingKey.rmk]: string;
  /**
   * Indicates whether the recorded animal was seen.
   */
  [XCRecordingKey.birdSeen]: string;
  /**
   * Was the recorded animal seen.
   */
  [XCRecordingKey.animalSeen]: string;
  /**
   * Was playback used to lure the animal.
   */
  [XCRecordingKey.playbackUsed]: string;
  /**
   * Temperature during recording (applicable to specific groups only).
   */
  [XCRecordingKey.temp]: string;
  /**
   * Registration number of specimen (when collected).
   */
  [XCRecordingKey.regnr]: string;
  /**
   * Automatic (non-supervised) recording.
   */
  [XCRecordingKey.auto]: string;
  /**
   * Recording device used.
   */
  [XCRecordingKey.dvc]: string;
  /**
   * Microphone used.
   */
  [XCRecordingKey.mic]: string;
  /**
   * Sample rate.
   */
  [XCRecordingKey.smp]: number;
}
