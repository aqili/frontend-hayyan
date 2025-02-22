export class OtpSetting {
  inputStyles?: { [key: string]: any };
  wrapperStyles?: { [key: string]: any };
  allowKeyCodes?: string[];
  length: number;
  numbersOnly?: boolean;
  inputClass?: string;
  wrapperClass?: string;
  timer?: number;
  btnClass?: string;
  timerType?: TimerType; //  0: secs, 1: mins
}

export enum TimerType{
  secs,mins
}
