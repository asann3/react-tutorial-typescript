// interface Obj {
//     foo?: number | string | boolean
// 	hoge?: boolean
// }
// TypeScriptにおける派生型→構造的部分型
// TypeScriptの型アサーションは、純粋にコンパイラよりもその型をより良く理解していることだけでなく、後で推測するべきではないことをコンパイラに伝えている
// アップキャスト 基底クラス型の変数に派生クラスのインスタンスを代入する際に行われる型変換
// ダウンキャスト 派生クラス型の変数に基底クラスのインスタンスを代入する際に行われる型変換
// https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAcwKZQGJzgHgCqKoAeUqYAJgM6JwBGAVqtAHwAUd9AXIngJSIBvAFABIAPRjBoZAENuARgBMAZgC+oiAkpREUALYAHAPINEAXhqmZ1AETBsNwiTJVEAa1QBPOMB6IA-DwA2nYOALqI3OBuYHAA7mAaWnAANqgAdClwyKw2+sYMNgA0uoYm9LyiEoiaYNqIAE7oIA1g5ealBfTp9nBVkk1QLUiDw+UA3IjVYCB6tKgNiAA+iNoNMGDIy4i02GkySCvg5KjAG6jkQupCaJjYrAK9CiqqvEA

// function getFoo<T extends object>(obj: T) {
// 	// {fuga: 123}
// 	const tmpObj = obj as "foo" extends keyof T ? T["foo"] : unknown
// 	// console.log("tmpObj", tmpObj)
// 	// const returnObj = tmpObj.foo
// 	// return returnObj; // number | string | boolean | undefined
// }
// getFoo({foo: 123})

// 模範解答 by satackey
function getFoo<T extends object>(obj: T) {
	return (obj as { foo: "foo" extends keyof T ? T["foo"] : unknown }).foo;
}

type a = undefined;
type b<T extends object> = "foo" extends keyof T ? T["foo"] : unknown;

// T {foo: 123}

// T extends {foo: T} ? T : unknown
// Tが{foo: T}の部分型
// T {foo: 123}
type Z = T extends { foo: T } ? T : unknown;
type Y = { foo: 123 } extends { foo: { foo: 123 } } ? { foo: 123 } : unknown;

type A = "foo" extends keyof T ? number : unknown;
type B = "foo" extends keyof { foo: 123 } ? number : unknown;
type C = "foo" extends "foo" ? number : unknown;

type ABC = "a" extends string ? undefined : number;
// T {hoge: true}

// 使用例
// numはnumber型
const num = getFoo({
	foo: 123,
});
// strはstring型
const str = getFoo({
	foo: "hoge",
	bar: 0,
});
// objは {hoge: string} 型
const obj = getFoo({
	foo: { hoge: `str` },
	bar: 0,
});
// unkはunknown型
const unk = getFoo({
	hoge: true,
});

// エラー例
getFoo(123);
getFoo(null);

export {};
