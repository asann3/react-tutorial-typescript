declare function myUseState<T>(params:T) : [() => void, (arg0: T | ((arg1: T) => void)) => void];

// 使用例
// number型のステートを宣言 (numStateはnumber型)
const [numState, setNumState] = myUseState(0);
// setNumStateは新しい値で呼び出せる
setNumState(3);
// setNumStateは古いステートを新しいステートに変換する関数を渡すこともできる
setNumState(state => state + 10);

// 型引数を明示することも可能
const [anotherState, setAnotherState] = myUseState<number | null>(null);
setAnotherState(100);

// エラー例
setNumState('foobar');