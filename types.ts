export interface Collection {
  name: string;
  nameOfVideo: string;
  nameOfEvent: string;
  isPrivate: boolean;
  language: string; // @TODO add some kind of filter for each to see whether it's editable
}
