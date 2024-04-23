/**
 * Represents the keys for the query options.
 */
export enum XCQueryKey {
  query = "query",
  page = "page",
  grp = "grp",
  gen = "gen",
  rec = "rec",
  cnt = "cnt",
  loc = "loc",
  rmk = "rmk",
  seen = "seen",
  playback = "playback",
  lan = "lan",
  lon = "lon",
  box = "box",
  also = "also",
  type = "type",
  othertype = "othertype",
  sex = "sex",
  state = "state",
  method = "method",
  nr = "nr",
  lic = "lic",
  q = "q",
  len = "len",
  area = "area",
  since = "since",
  year = "year",
  month = "month",
  colyear = "colyear",
  colmonth = "colmonth",
  temp = "temp",
  regnr = "regnr",
  auto = "auto",
  dvc = "dvc",
  mic = "mic",
  smp = "smp",
}

/**
 * Represents the search options for querying.
 */
export interface XCQueryOption {
  /**
   * Query
   * 
   * The query to search for.
   */
  [XCQueryKey.query]: string;
  /**
   * Page
   * 
   * The page parameter is optional and is only needed if the results from a given search don't fit in a single page. If specified, page must be an integer between 1 and XCResponse.numPages.
   */
  [XCQueryKey.page]?: number;
  /**
   * Group
   *
   * Use the grp tag to narrow down your search to a specific group. This tag is particularly useful in combination with one of the other tags. Valid group values are birds, grasshoppers and bats. You can also use their respective ids (1 to 3), so grp:2 will restrict your search to grasshoppers. Soundscapes are a special case, as these recordings may include multiple groups. Use grp:soundscape or grp:0 to search these.
   */
  [XCQueryKey.grp]?: "soundscape" | "birds" | "grasshoppers" | "bats" | 0 | 1 | 2 | 3 | (string & {});
  /**
   * Genus/Subspecies
   *
   * Genus is part of a species' scientific name, so it is searched by default when performing a basic search (as mentioned above). But you can use the gen tag to limit your search query only to the genus field. So gen:zonotrichia will find all recordings of sparrows in the genus Zonotrichia. Similarly, ssp can be used to search for subspecies. These fields use a 'starts with' rather than 'contains' query and accept a 'matches' operator.
   */
  [XCQueryKey.gen]?: string;
  /**
   * Recordist
   *
   * To search for all recordings from a particular recordist, use the rec tag. For example, rec:John will return all recordings from recordists whose names contain the string "John". This field accepts a 'matches' operator.
   */
  [XCQueryKey.rec]?: string;
  /**
   * Country
   *
   * To return all recordings that were recorded in the a particular country, use the cnt tag. The following query will return all recordings from the country of "Brazil": cnt:brazil. This field uses a 'starts with' query and accepts a 'matches' operator.
   */
  [XCQueryKey.cnt]?: string;
  /**
   * Location
   *
   * To return all recordings from a specific location, use the loc tag. For example loc:tambopata. This field accepts a 'matches' operator.
   */
  [XCQueryKey.loc]?: string;
  /**
   * Recordist remarks
   *
   * Many recordists leave remarks about the recording and this field can be searched using the rmk tag, e.g. rmk:flock. The remarks field contains free text, so it is unlikely to produce complete results. Note that information about whether the recorded animal was seen or if playback was used, formerly stored in remarks, now can be searched using dedicated fields! This field accepts a 'matches' operator.
   */
  [XCQueryKey.rmk]?: string;
  /**
   * Animal seen/Playback used
   *
   * Two tags (seen and playback respectively) that previously were stored as part of Recordist remarks, but now can be used independently. Both only accept yes and no as input. For example, use seen:yes playback:no to search for recordings where the animal was seen, but not lured by playback.
   */
  [XCQueryKey.seen]?: "yes" | "no" | (string & {});
  /**
   * Animal seen/Playback used
   *
   * Two tags (seen and playback respectively) that previously were stored as part of Recordist remarks, but now can be used independently. Both only accept yes and no as input. For example, use seen:yes playback:no to search for recordings where the animal was seen, but not lured by playback.
   */
  [XCQueryKey.playback]?: "yes" | "no" | (string & {});
  /**
   * Geographic coordinates
   *
   * There are two sets of tags that can be used to search via geographic coordinates. The first set of tags is lat and lon. These tags can be used to search within one degree in either direction of the given coordinate, for instance: lat:-12.234 lon:-69.98. This field also accepts '<' and '>' operators; e.g. use lat:">66.5" to search for all recordings made above the Arctic Circle.
   *
   * The second tag allows you to search for recordings that occur within a given rectangle, and is called box. It is more versatile than lat and lon, but is more awkward to type in manually, so we have made a {@link https://xeno-canto.org/explore/region | map-based search tool} to make things simpler. The general format of the box tag is as follows: box:LAT_MIN,LON_MIN,LAT_MAX,LON_MAX. Note that there must not be any spaces between the coordinates.
   */
  [XCQueryKey.lan]?: number | string;
  /**
   * Geographic coordinates
   *
   * There are two sets of tags that can be used to search via geographic coordinates. The first set of tags is lat and lon. These tags can be used to search within one degree in either direction of the given coordinate, for instance: lat:-12.234 lon:-69.98. This field also accepts '<' and '>' operators; e.g. use lat:">66.5" to search for all recordings made above the Arctic Circle.
   *
   * The second tag allows you to search for recordings that occur within a given rectangle, and is called box. It is more versatile than lat and lon, but is more awkward to type in manually, so we have made a {@link https://xeno-canto.org/explore/region | map-based search tool} to make things simpler. The general format of the box tag is as follows: box:LAT_MIN,LON_MIN,LAT_MAX,LON_MAX. Note that there must not be any spaces between the coordinates.
   */
  [XCQueryKey.lon]?: number | string;
  /**
   * Geographic coordinates
   *
   * There are two sets of tags that can be used to search via geographic coordinates. The first set of tags is lat and lon. These tags can be used to search within one degree in either direction of the given coordinate, for instance: lat:-12.234 lon:-69.98. This field also accepts '<' and '>' operators; e.g. use lat:">66.5" to search for all recordings made above the Arctic Circle.
   *
   * The second tag allows you to search for recordings that occur within a given rectangle, and is called box. It is more versatile than lat and lon, but is more awkward to type in manually, so we have made a {@link https://xeno-canto.org/explore/region | map-based search tool} to make things simpler. The general format of the box tag is as follows: box:LAT_MIN,LON_MIN,LAT_MAX,LON_MAX. Note that there must not be any spaces between the coordinates.
   */
  [XCQueryKey.box]?: string;
  /**
   * Background species
   *
   * To search for recordings that have a given species in the background, use the also tag. Use this field to search for both species (common names in English and scientific names) and families (scientific names). For example, also:formicariidae will return all recordings that have a member of the Antthrush family identified as a background voice.
   */
  [XCQueryKey.also]?: string;
  /**
   * Sound type
   *
   * To search for recordings of a particular sound type, use the type tag. For instance, type:song will return all recordings identified as songs. Note that options may pertain to a specific group only, e.g. 'searching song' is a search term used for grasshoppers, but not for birds. Valid values for this tag are: aberrant, alarm call, begging call, call, calling song, courtship song, dawn song, distress call, disturbance song, drumming, duet, echolocation, female song, flight call, flight song, imitation, nocturnal flight call, rivalry song, searching song, social call, song, subsong. This tag always uses a 'matches' operator.
   *
   * Up until 2022, the 'type' tag used to search a free text field. We have retained the option to search for non-standardized sound types by using the othertype tag. This tag also accepts a 'matches' operator, e.g. othertype:"=wing flapping".
   */
  [XCQueryKey.type]?:
  | "aberrant"
  | "alarm call"
  | "begging call"
  | "call"
  | "calling song"
  | "courtship song"
  | "dawn song"
  | "distress call"
  | "disturbance song"
  | "drumming"
  | "duet"
  | "echolocation"
  | "female song"
  | "flight call"
  | "flight song"
  | "imitation"
  | "nocturnal flight call"
  | "rivalry song"
  | "searching song"
  | "social call"
  | "song"
  | "subsong"
  | (string & {});
  /**
   * Sound type
   *
   * To search for recordings of a particular sound type, use the type tag. For instance, type:song will return all recordings identified as songs. Note that options may pertain to a specific group only, e.g. 'searching song' is a search term used for grasshoppers, but not for birds. Valid values for this tag are: aberrant, alarm call, begging call, call, calling song, courtship song, dawn song, distress call, disturbance song, drumming, duet, echolocation, female song, flight call, flight song, imitation, nocturnal flight call, rivalry song, searching song, social call, song, subsong. This tag always uses a 'matches' operator.
   *
   * Up until 2022, the 'type' tag used to search a free text field. We have retained the option to search for non-standardized sound types by using the othertype tag. This tag also accepts a 'matches' operator, e.g. othertype:"=wing flapping".
   */
  [XCQueryKey.othertype]?: string;
  /**
   * Sex
   *
   * Formerly included under 'sound types', the sex tag can now be used independently. Valid values for this tag are: female, male. This tag always uses a 'matches' operator.
   */
  [XCQueryKey.sex]?: "female" | "male" | (string & {});
  /**
   * Life stage
   *
   * Values of the stage tag were previously included under 'sound types' as well. Valid values are: adult, juvenile, nestling, nymph, subadult. This tag always uses a 'matches' operator.
   */
  [XCQueryKey.state]?: "adult" | "juvenile" | "nestling" | "nymph" | "subadult" | (string & {});
  /**
   * Recording method
   *
   * The method tag accepts the following, group-dependent values: emerging from roost, field recording, fluorescent light tag, hand-release, in enclosure, in net, in the hand, roosting, roped, studio recording. Do not forget to enclose the term between double quotes! This tag always uses a 'matches' operator.
   */
  [XCQueryKey.method]?:
  | "emerging from roost"
  | "field recording"
  | "fluorescent light tag"
  | "hand-release"
  | "in enclosure"
  | "in net"
  | "in the hand"
  | "roosting"
  | "roped"
  | "studio recording"
  | (string & {});
  /**
   * XC number
   *
   * All recordings on xeno-canto are assigned a unique catalog number (generally displayed in the form XC76967). To search for a known recording number, use the nr tag: for example nr:76967. You can also search for a range of numbers as nr:88888-88890.
   */
  [XCQueryKey.nr]?: number | string;
  /**
   * Recording license
   *
   * Recordings on xeno-canto are licensed under a small number of different Creative Commons licenses. You can search for recordings that match specific license conditions using the lic tag. License conditions are Attribution (BY), NonCommercial (NC), ShareAlike (SA), NoDerivatives (ND) and Public Domain/copyright free (CC0). Conditions should be separated by a '-' character. For instance, to find recordings that are licensed under an Attribution-NonCommercial-ShareAlike license, use lic:BY-NC-SA; for "no rights reserved" recordings, use lic:PD. See the Creative Commons website for more details about the individual licenses.
   */
  [XCQueryKey.lic]?: string;
  /**
   * Recording quality
   *
   * Recordings are rated by quality. Quality ratings range from A (highest quality) to E (lowest quality). To search for recordings that match a certain quality rating, use the q tag. This field also accepts '<' and '>' operators. For example:
   *
   * - q:A will return recordings with a quality rating of A.
   * - q:"<C" will return recordings with a quality rating of D or E.
   * - q:">C" will return recordings with a quality rating of B or A.
   *
   * Note that not all recordings are rated. Unrated recordings will not be returned for a search on quality rating.
   */
  [XCQueryKey.q]?: string;
  /**
   * Recording length
   *
   * To search for recordings that match a certain length (in seconds), use the len tag. This field also accepts '<' , '>' and '=' operators. For example:
   *
   * - len:10 will return recordings with a duration of 10 seconds (with a margin of 1%, so actually between 9.9 and 10.1 seconds
   * - len:10-15 will return recordings lasting between 10 and 15 seconds
   * - len:"<30" will return recordings half a minute or shorter in length
   * - len:">120" will return recordings longer than two minutes in length
   * - len:"=19.8" will return recordings lasting exactly 19.8 seconds, dropping the default 1% margin.
   */
  [XCQueryKey.len]?: number | string;
  /**
   * Additional search tags
   *
   * The area tag allows you to search by world area. Valid values for this tag are africa, america, asia, australia, europe.
   */
  [XCQueryKey.area]?: "africa" | "america" | "asia" | "australia" | "europe" | (string & {});
  /**
   * Additional search tags
   *
   * The since tag allows you to search for recordings that have been uploaded since a certain date. Using a simple integer value such as since:3 will find all recordings uploaded in the past 3 days. If you use a date with a format of YYYY-MM-DD, it will find all recordings uploaded since that date (e.g. since:2012-11-09). Note that this search considers the upload date, not the date that the recording was made.
   */
  [XCQueryKey.since]?: string;
  /**
   * Additional search tags
   *
   * The year and month tags allow you to search for recordings that were recorded on a certain date. The following query will find all recordings that were recorded in May of 2010: year:2010 month:5. Similarly, month:6 will find recordings that were recorded during the month of June in any year. Both tags also accept '>' (after) and '<' (before).
   */
  [XCQueryKey.year]?: number | string;
  /**
   * Additional search tags
   *
   * The year and month tags allow you to search for recordings that were recorded on a certain date. The following query will find all recordings that were recorded in May of 2010: year:2010 month:5. Similarly, month:6 will find recordings that were recorded during the month of June in any year. Both tags also accept '>' (after) and '<' (before).
   */
  [XCQueryKey.month]?: number | string;
  /**
   * Additional search tags
   *
   * The colyear and colmonth tags for collection date operate similarly, but these apply only to specific groups that are allowed to be recorded in a studio setting (currently grasshoppers only).
   */
  [XCQueryKey.colyear]?: string;
  /**
   * Additional search tags
   *
   * The colyear and colmonth tags for collection date operate similarly, but these apply only to specific groups that are allowed to be recorded in a studio setting (currently grasshoppers only).
   */
  [XCQueryKey.colmonth]?: string;
  /**
   * Additional search tags
   *
   * The temp tag for temperature currently also applies only to grasshoppers. This field also accepts '<' and '>' operators. Use temp:25 to search for sounds recorded between 25-26 °C or temp:">20" for temperatures over 20 °C.
   */
  [XCQueryKey.temp]?: number | string;
  /**
   * Additional search tags
   *
   * The regnr tag can be used to search for animals that were sound recorded before ending up in a (museum) collection. This tag also accepts a 'matches' operator.
   */
  [XCQueryKey.regnr]?: string;
  /**
   * Additional search tags
   *
   * The auto tag searches for automatic (non-supervised) recordings. This tag accepts yes and no.
   */
  [XCQueryKey.auto]?: "yes" | "no" | (string & {});
  /**
   * Additional search tags
   *
   * Use the dvc (device) and mic (microphone) tags to search for specific recording equipment.
   */
  [XCQueryKey.dvc]?: string;
  /**
   * Additional search tags
   *
   * Use the dvc (device) and mic (microphone) tags to search for specific recording equipment.
   */
  [XCQueryKey.mic]?: string;
  /**
   * Additional search tags
   *
   * The smp tag can be used to search for recordings with a specific sampling rate (in Hz). For example, smp:">48000" will return hi-res recordings. Other frequencies include 22050, 44100 and multiples of 48000.
   */
  [XCQueryKey.smp]?: number | string;
  /**
   * Any other custom tags not in the API for compatibility.
   */
  [rest: string]: number | string | undefined;
}
