/**
 * Represents the response object returned by the Xeno-Canto API.
 */
export interface XCResponse {
  /**
   * The total number of recordings found for this query.
   */
  numRecordings: number;
  /**
   * The total number of species found for this query.
   */
  numSpecies: number;
  /**
   * The page number of the results page that is being displayed.
   */
  page: number;
  /**
   * The total number of pages available for this query.
   */
  numPages: number;
  /**
   * An array of recording objects.
   */
  recordings: XCRecording[];
  /**
   * Error type, if any.
   */
  error?: string;
  /**
   * Error message, if any.
   */
  message?: string;
}

/**
 * Represents a recording entity from the Xeno-Canto API response's "recordings" array.
 */
export interface XCRecording {
  /**
   * The catalogue number of the recording on xeno-canto.
   */
  id: string;
  /**
   * The generic name of the species.
   */
  gen: string;
  /**
   * The specific name (epithet) of the species.
   */
  sp: string;
  /**
   * The subspecies name (subspecific epithet).
   */
  ssp: string;
  /**
   * The group to which the species belongs (birds, grasshoppers, bats).
   */
  group: string;
  /**
   * The English name of the species.
   */
  en: string;
  /**
   * The name of the recordist.
   */
  rec: string;
  /**
   * The country where the recording was made.
   */
  cnt: string;
  /**
   * The name of the locality.
   */
  loc: string;
  /**
   * The latitude of the recording in decimal coordinates.
   */
  lat: string;
  /**
   * The longitude of the recording in decimal coordinates.
   */
  lng: string;
  /**
   * Elevation (in meter).
   */
  alt: string;
  /**
   * The sound type of the recording (combining both predefined terms such as 'call' or 'song' and additional free text options).
   */
  type: string;
  /**
   * The sex of the animal.
   */
  sex: string;
  /**
   * The life stage of the animal (adult, juvenile, etc.).
   */
  stage: string;
  /**
   * The recording method (field recording, in the hand, etc.).
   */
  method: string;
  /**
   * The URL specifying the details of this recording.
   */
  url: string;
  /**
   * The URL to the audio file.
   */
  file: string;
  /**
   * The original file name of the audio file.
   */
  fileName: string;
  /**
   * An object with the URLs to the four versions of sonograms.
   */
  sono: {
    small: string;
    med: string;
    large: string;
    full: string;
  };
  /**
   * An object with the URLs to the three versions of oscillograms.
   */
  osci: {
    small: string;
    med: string;
    large: string;
  };
  /**
   * The URL describing the license of this recording.
   */
  lic: string;
  /**
   * The current quality rating for the recording.
   */
  q: string;
  /**
   * The length of the recording in minutes.
   */
  length: string;
  /**
   * The time of day that the recording was made.
   */
  time: string;
  /**
   * The date that the recording was made.
   */
  date: string;
  /**
   * The date that the recording was uploaded to xeno-canto.
   */
  uploaded: string;
  /**
   * An array with the identified background species in the recording.
   */
  also: string[];
  /**
   * Additional remarks by the recordist.
   */
  rmk: string;
  /**
   * Indicates whether the recorded animal was seen.
   */
  birdSeen: string;
  /**
   * Was the recorded animal seen.
   */
  animalSeen: string;
  /**
   * Was playback used to lure the animal.
   */
  playbackUsed: string;
  /**
   * Temperature during recording (applicable to specific groups only).
   */
  temp: string;
  /**
   * Registration number of specimen (when collected).
   */
  regnr: string;
  /**
   * Automatic (non-supervised) recording.
   */
  auto: string;
  /**
   * Recording device used.
   */
  dvc: string;
  /**
   * Microphone used.
   */
  mic: string;
  /**
   * Sample rate.
   */
  smp: number;
}
