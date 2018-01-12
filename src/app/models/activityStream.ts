/**
 * Created by bbrauzzi on 12/01/2018.
 */

export class ActivityStream {
  private _type: string;
  private _data: any[];
  private _series_type: string;
  private _original_size: number;
  private _resolution: Resolution;

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get data(): any[] {
    return this._data;
  }

  set data(value: Array) {
    this._data = value;
  }

  get series_type(): string {
    return this._series_type;
  }

  set series_type(value: string) {
    this._series_type = value;
  }

  get original_size(): number {
    return this._original_size;
  }

  set original_size(value: number) {
    this._original_size = value;
  }

  get resolution(): Resolution {
    return this._resolution;
  }

  set resolution(value: Resolution) {
    this._resolution = value;
  }
}


enum Resolution {
  low = "low",
  medium = "medium",
  high = "high",
}
