export interface XCResponse {
  /**
   * the total number of recordings found for this query
   */
  numRecordings: number;
  /**
   * the total number of species found for this query
   */
  numSpecies: number;
  /**
   * the page number of the results page that is being displayed
   */
  page: number;
  /**
   * the total number of pages available for this query
   */
  numPages: number;
  /**
   * an array of recording objects
   */
  recordings: XCRecording[];
  /**
   * error type
   */
  error?: string;
  /**
   * error message
   */
  message?: string;
}

export interface XCRecording {
  /**
   * the catalogue number of the recording on xeno-canto
   */
  id: string;
  /**
   * the generic name of the species
   */
  gen: string;
  /**
   * the specific name (epithet) of the species
   */
  sp: string;
  /**
   * the subspecies name (subspecific epithet)
   */
  ssp: string;
  /**
   * the group to which the species belongs (birds, grasshoppers, bats)
   */
  group: string;
  /**
   * the English name of the species
   */
  en: string;
  /**
   * the name of the recordist
   */
  rec: string;
  /**
   * the country where the recording was made
   */
  cnt: string;
  /**
   * the name of the locality
   */
  loc: string;
  /**
   * the latitude of the recording in decimal coordinates
   */
  lat: string;
  /**
   * the longitude of the recording in decimal coordinates
   */
  lng: string;
  /**
   * TODO: unknown usage
   */
  alt: string;
  /**
   * the sound type of the recording (combining both predefined terms such as 'call' or 'song' and additional free text options)
   */
  type: string;
  /**
   * the sex of the animal
   */
  sex: string;
  /**
   * the life stage of the animal (adult, juvenile, etc.)
   */
  stage: string;
  /**
   * the recording method (field recording, in the hand, etc.)
   */
  method: string;
  /**
   * the URL specifying the details of this recording
   */
  url: string;
  /**
   * the URL to the audio file
   */
  file: string;
  /**
   * the original file name of the audio file
   */
  fileName: string;
  /**
   * an object with the URLs to the four versions of sonograms
   */
  sono: {
    small: string;
    med: string;
    large: string;
    full: string;
  };
  /**
   * an object with the URLs to the three versions of oscillograms
   */
  osci: {
    small: string;
    med: string;
    large: string;
  };
  /**
   * the URL describing the license of this recording
   */
  lic: string;
  /**
   * the current quality rating for the recording
   */
  q: string;
  /**
   * the length of the recording in minutes
   */
  length: string;
  /**
   * the time of day that the recording was made
   */
  time: string;
  /**
   * the date that the recording was made
   */
  date: string;
  /**
   * the date that the recording was uploaded to xeno-canto
   */
  uploaded: string;
  /**
   * an array with the identified background species in the recording
   */
  also: string[];
  /**
   * additional remarks by the recordist
   */
  rmk: string;
  /**
   * indicates whether the recorded animal was seen
   */
  birdSeen: string;
  /**
   * was the recorded animal seen
   */
  animalSeen: string;
  /**
   * was playback used to lure the animal
   */
  playbackUsed: string;
  /**
   * temperature during recording (applicable to specific groups only)
   */
  temp: string;
  /**
   * registration number of specimen (when collected)
   */
  regnr: string;
  /**
   * automatic (non-supervised) recording
   */
  auto: string;
  /**
   * recording device used
   */
  dvc: string;
  /**
   * microphone used
   */
  mic: string;
  /**
   * sample rate
   */
  smp: number;
}
