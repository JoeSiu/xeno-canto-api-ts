/**
 * Represents the name definitions for the response options.
 */
export enum XCResponseNameDefinition {
  numRecordings = "numRecordings",
  numSpecies = "numSpecies",
  page = "page",
  numPages = "numPages",
  recordings = "recordings",
  error = "error",
  message = "message",
}

/**
 * Represents the name definitions for the recording options.
 */
export enum XCRecordingNameDefinition {
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
  [XCResponseNameDefinition.numRecordings]: number;
  /**
   * The total number of species found for this query.
   */
  [XCResponseNameDefinition.numSpecies]: number;
  /**
   * The page number of the results page that is being displayed.
   */
  [XCResponseNameDefinition.page]: number;
  /**
   * The total number of pages available for this query.
   */
  [XCResponseNameDefinition.numPages]: number;
  /**
   * An array of recording objects.
   */
  [XCResponseNameDefinition.recordings]: XCRecording[];
  /**
   * Error type, if any.
   */
  [XCResponseNameDefinition.error]?: string;
  /**
   * Error message, if any.
   */
  [XCResponseNameDefinition.message]?: string;
}

/**
 * Represents a recording entity from the Xeno-Canto API response's "recordings" array.
 */
export interface XCRecording {
  /**
   * The catalogue number of the recording on xeno-canto.
   */
  [XCRecordingNameDefinition.id]: string;
  /**
   * The generic name of the species.
   */
  [XCRecordingNameDefinition.gen]: string;
  /**
   * The specific name (epithet) of the species.
   */
  [XCRecordingNameDefinition.sp]: string;
  /**
   * The subspecies name (subspecific epithet).
   */
  [XCRecordingNameDefinition.ssp]: string;
  /**
   * The group to which the species belongs (birds, grasshoppers, bats).
   */
  [XCRecordingNameDefinition.group]: string;
  /**
   * The English name of the species.
   */
  [XCRecordingNameDefinition.en]: string;
  /**
   * The name of the recordist.
   */
  [XCRecordingNameDefinition.rec]: string;
  /**
   * The country where the recording was made.
   */
  [XCRecordingNameDefinition.cnt]: string;
  /**
   * The name of the locality.
   */
  [XCRecordingNameDefinition.loc]: string;
  /**
   * The latitude of the recording in decimal coordinates.
   */
  [XCRecordingNameDefinition.lat]: string;
  /**
   * The longitude of the recording in decimal coordinates.
   */
  [XCRecordingNameDefinition.lng]: string;
  /**
   * Elevation (in meter).
   */
  [XCRecordingNameDefinition.alt]: string;
  /**
   * The sound type of the recording (combining both predefined terms such as 'call' or 'song' and additional free text options).
   */
  [XCRecordingNameDefinition.type]: string;
  /**
   * The sex of the animal.
   */
  [XCRecordingNameDefinition.sex]: string;
  /**
   * The life stage of the animal (adult, juvenile, etc.).
   */
  [XCRecordingNameDefinition.stage]: string;
  /**
   * The recording method (field recording, in the hand, etc.).
   */
  [XCRecordingNameDefinition.method]: string;
  /**
   * The URL specifying the details of this recording.
   */
  [XCRecordingNameDefinition.url]: string;
  /**
   * The URL to the audio file.
   */
  [XCRecordingNameDefinition.file]: string;
  /**
   * The original file name of the audio file.
   */
  [XCRecordingNameDefinition.fileName]: string;
  /**
   * An object with the URLs to the four versions of sonograms.
   */
  [XCRecordingNameDefinition.sono]: {
    [XCRecordingNameDefinition.small]: string;
    [XCRecordingNameDefinition.med]: string;
    [XCRecordingNameDefinition.large]: string;
    [XCRecordingNameDefinition.full]: string;
  };
  /**
   * An object with the URLs to the three versions of oscillograms.
   */
  [XCRecordingNameDefinition.osci]: {
    [XCRecordingNameDefinition.small]: string;
    [XCRecordingNameDefinition.med]: string;
    [XCRecordingNameDefinition.large]: string;
  };
  /**
   * The URL describing the license of this recording.
   */
  [XCRecordingNameDefinition.lic]: string;
  /**
   * The current quality rating for the recording.
   */
  [XCRecordingNameDefinition.q]: string;
  /**
   * The length of the recording in minutes.
   */
  [XCRecordingNameDefinition.length]: string;
  /**
   * The time of day that the recording was made.
   */
  [XCRecordingNameDefinition.time]: string;
  /**
   * The date that the recording was made.
   */
  [XCRecordingNameDefinition.date]: string;
  /**
   * The date that the recording was uploaded to xeno-canto.
   */
  [XCRecordingNameDefinition.uploaded]: string;
  /**
   * An array with the identified background species in the recording.
   */
  [XCRecordingNameDefinition.also]: string[];
  /**
   * Additional remarks by the recordist.
   */
  [XCRecordingNameDefinition.rmk]: string;
  /**
   * Indicates whether the recorded animal was seen.
   */
  [XCRecordingNameDefinition.birdSeen]: string;
  /**
   * Was the recorded animal seen.
   */
  [XCRecordingNameDefinition.animalSeen]: string;
  /**
   * Was playback used to lure the animal.
   */
  [XCRecordingNameDefinition.playbackUsed]: string;
  /**
   * Temperature during recording (applicable to specific groups only).
   */
  [XCRecordingNameDefinition.temp]: string;
  /**
   * Registration number of specimen (when collected).
   */
  [XCRecordingNameDefinition.regnr]: string;
  /**
   * Automatic (non-supervised) recording.
   */
  [XCRecordingNameDefinition.auto]: string;
  /**
   * Recording device used.
   */
  [XCRecordingNameDefinition.dvc]: string;
  /**
   * Microphone used.
   */
  [XCRecordingNameDefinition.mic]: string;
  /**
   * Sample rate.
   */
  [XCRecordingNameDefinition.smp]: number;
}
