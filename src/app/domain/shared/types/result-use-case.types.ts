export type ResultUseCase<T,E> =
  | {isSuccess: true, value: T}
  | {isSuccess: false, error: E}
