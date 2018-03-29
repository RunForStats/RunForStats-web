export class User {
  private _id: string;
  private _username: string;
  private _firstname: string;
  private _lastname: string;
  private _profile_medium: string;
  private _profile: string;
  private _city: string;
  private _state: string;
  private _country: string;
  private _sex: string;
  private _friend: string;
  private _follower: string;
  private _premium: string;
  private _created_at: string;
  private _updated_at: string;


  constructor(id: string, username: string, firstname: string, lastname: string, profile_medium: string, profile: string, city: string, state: string, country: string, sex: string, friend: string, follower: string, premium: string, created_at: string, updated_at: string) {
    this._id = id;
    this._username = username;
    this._firstname = firstname;
    this._lastname = lastname;
    this._profile_medium = profile_medium;
    this._profile = profile;
    this._city = city;
    this._state = state;
    this._country = country;
    this._sex = sex;
    this._friend = friend;
    this._follower = follower;
    this._premium = premium;
    this._created_at = created_at;
    this._updated_at = updated_at;
  }


  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get firstname(): string {
    return this._firstname;
  }

  set firstname(value: string) {
    this._firstname = value;
  }

  get lastname(): string {
    return this._lastname;
  }

  set lastname(value: string) {
    this._lastname = value;
  }

  get profile_medium(): string {
    return this._profile_medium;
  }

  set profile_medium(value: string) {
    this._profile_medium = value;
  }

  get profile(): string {
    return this._profile;
  }

  set profile(value: string) {
    this._profile = value;
  }

  get city(): string {
    return this._city;
  }

  set city(value: string) {
    this._city = value;
  }

  get state(): string {
    return this._state;
  }

  set state(value: string) {
    this._state = value;
  }

  get country(): string {
    return this._country;
  }

  set country(value: string) {
    this._country = value;
  }

  get sex(): string {
    return this._sex;
  }

  set sex(value: string) {
    this._sex = value;
  }

  get friend(): string {
    return this._friend;
  }

  set friend(value: string) {
    this._friend = value;
  }

  get follower(): string {
    return this._follower;
  }

  set follower(value: string) {
    this._follower = value;
  }

  get premium(): string {
    return this._premium;
  }

  set premium(value: string) {
    this._premium = value;
  }

  get created_at(): string {
    return this._created_at;
  }

  set created_at(value: string) {
    this._created_at = value;
  }

  get updated_at(): string {
    return this._updated_at;
  }

  set updated_at(value: string) {
    this._updated_at = value;
  }
}
