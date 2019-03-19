import { Action } from '@ngrx/store';

export enum ActionType {
  RESQUESTING_DATA = '[Data] Requesting Data',
  SAVING_DATA = '[Data] Saving Data',
  SUCCESS_DATA_SAVED = '[Data] Success Data Saved'
}

// Actions types and Payloads

export class ResquestingData implements Action {
  readonly type = ActionType.RESQUESTING_DATA;
}
export class SavingData implements Action {
  readonly type = ActionType.SAVING_DATA;
  constructor(public data: string, public message: string) {
  }
}
export class SuccessDataSaved implements Action {
  readonly type = ActionType.SUCCESS_DATA_SAVED;
  message: 'Success Saved Data!';
}

export type DataActions = ResquestingData | SavingData | SuccessDataSaved;
