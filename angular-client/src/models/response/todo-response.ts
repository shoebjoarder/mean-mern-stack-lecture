import ITodo from '../todo';

export default interface TodoAllResponse {
  message: string;
  data: Array<ITodo>;
}

export interface TodoResponse {
  message: string;
  data: ITodo;
}
