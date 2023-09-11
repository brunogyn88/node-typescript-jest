export type FieldsErrors = {
  [field: string]: string[];
};

export interface IValidatorFields<PropsValidated> {
  erroors: FieldsErrors | null;
  validatedData: PropsValidated | null;
  validate(data: any): boolean;
}
