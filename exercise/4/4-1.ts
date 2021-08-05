// interface Obj {
//     foo?: number | string | boolean
// 	hoge?: boolean
// }

interface hoge {
	foo?: number
}

function getFoo<T extends object>(obj: T): "foo" extends keyof T ? T["foo"] : unknown {
	return (obj as ).foo;
}

// T {foo: 123}

// T extends {foo: T} ? T : unknown
// Tが{foo: T}の部分型
// T {foo: 123}
type Z = T extends { foo: T } ? T : unknown;
type Y = { foo: 123 } extends { foo: { foo: 123 } } ? { foo: 123 } : unknown;

type A = "foo" extends keyof T ? number : unknown;
type B = "foo" extends keyof {foo: 123} ? number : unknown;
type C = "foo" extends "foo" ? number : unknown;


type ABC = "a" extends string ? undefined : number
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
// unkはunknown型
const unk = getFoo({
	hoge: true,
});

// エラー例
getFoo(123);
getFoo(null);

export {};
