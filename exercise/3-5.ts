// 型1 extends 型2 ? 型3 : 型4
// 型1 ⊃ 型2 → 型2 そうでなければ型4
type A = number
type B = A extends undefined ? number : string

// A extends undefined      ... Aはundefinedの部分型→Aはundefinedに含まれる
// undefined extends A      ... undefinedはAの部分型→undefinedはAに含まれる

type Func<A, R> = undefined extends A ? (arg?: A) => R : (arg: A) => R;

// 使用例
const f1: Func<number, number> = (num) => num + 10;
const v1: number = f1(10);

const f2: Func<undefined, number> = () => 0;
const v2: number = f2();
const v3: number = f2(undefined);

const f3: Func<number | undefined, number> = (num) => (num || 0) + 10;
const v4: number = f3(123);
const v5: number = f3();

// エラー例
const v6: number = f1();
