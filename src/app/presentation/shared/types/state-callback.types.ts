export interface StateCallback<T,E> {
  onLoading: () => void;
  onResult : (entity : T) => void;
  onError : (error : E) => void;
  onComplete : () => void;
}
