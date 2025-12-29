export interface ErrorWithDetailObjectInterface {
  detail:
    | {
        msg?: string
        message?: string
      }
    | string
}
