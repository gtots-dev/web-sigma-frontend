import { ExtractErrorMessage } from '../http/fetch/dependencies/extract-error-message'

export class ExtractErrorMessageFactory {
  static create(): ExtractErrorMessage {
    return new ExtractErrorMessage()
  }
}
