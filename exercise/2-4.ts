function giveId<T>(obj: T): T & {id: string} {
	const id = "本当はランダムがいいけどここではただの文字列";
	return {
		...obj,
		id,
	};
}

declare function giveId2<T>(obj: T): {
	[P in keyof T | 'id']: P extends 'id'
							? string
						 	: P extends keyof T ? T[P] : never
   };
  
declare function giveId3<T>(obj: T): {
	[P in keyof T]: T[P]
	id: string
};

// T: {foo: number}

// 1 ({[P in keyof T]: T[P]}): T & {id: string}
// 2 ({[P in keyof {foo: number}] : {foo: number}[P]}): {foo: number} & {id: string}
// 3 ({[P in "foo"] : {foo: number}[P]}): {foo: number, id: string}
// 4 ({"foo": number}): {foo: number, id: string}

// n

// T: {foo: string, bar: number}

// 1 ({[P in keyof T]: T[P]}): T & {id: string}
// 2 ({[P in keyof {foo: string; bar: number}]: {foo: string; bar: number}[P]}): {foo: string; bar: number} & {id: string}
// 3 ({[P in "foo" | "bar"] : {foo: string; bar:number}[P]}): {foo: string; bar:number, id: string}
// 4 ({"foo": string; "bar": number}): {foo: string, bar:number, id: string}


// 戻り値
// id: string;
// foo: number;

// type a1 = function({[P in keyof T]: T[P]}): T | {id: number}
// type a2 = function({[P in keyof {foo: number}] : {foo: number}[P]}): {foo: number}
// type a3 = function({[P in "foo"] : {foo: number}[P]}): {foo: number}
// type a4 = function({"foo": {foo: number}["foo"]}): {foo: number}
// type a5 = function({"foo": number}): {foo: number}

// 使用例
const obj1: {
	id: string;
	foo: number;
} = giveId2<{foo:number}>({ foo: 123 });
// {id: "本当はランダムがいいけどここではただの文字列", foo: 123}

const obj2: {
	id: string;
	num: number;
	hoge: boolean;
} = giveId2({
	num: 0,
	hoge: true,
});
// {id: "本当はランダムがいいけどここではただの文字列", num: 0, hoge: true}

const obj3: {
	id: string;
	foo: string;
	bar: number;
} = giveId2({
	foo: 'x',
	bar: 1,
})

// エラー例
const obj4: {
	id: string;
	piyo: string;
} = giveId2({
	foo: "bar",
});
const obj5: {
	id: string;
	name: number;
} = giveId2({ name: "myname" });
const obj6: {
	id: string;
	hoge: string;
} = giveId2({
	fuga: 'x'
})

type GettersReturnType<T> = {
	[P in keyof T]: () => T[P]
}

type Keyof = keyof {a: number, b: string}
// Keyof → "a" | "b"
type Getters1ReturnType = GettersReturnType<{a: number, b: string}>
// Getters1ReturnType → {a: () => number, b: () => string}

function getters<T>(obj: T): GettersReturnType<T> {
    const result: any = {};
    for (const key in obj) {
        result[key] = () => obj[key] as any
    }
    return result
}


// type X = /* ここに書けるやつ */


type Type = {a: number, b: string}
type x1 = { a: number; b: string };
type x2 = { a: number, b: string };
type x3 = "a" | "b"
type x4<Type> = { [P in keyof Type]: () => Type[P]};
type x5<Type> = {
	[P in keyof { a: number; b: string }]: () => { a: number; b: string }[P];
};
type y1 = { [P in keyof T]: () => T[P] }
type y2 = { [P in keyof {a: number; b:string}]: () => {a: number; b: string}[P] }
type y4 = { [P in "a" | "b"]: () => {a: number; b: string}[P] }
type y5 = { a: () => {a: number; b: string}["a"], b: () => {a: number; b: string}["b"]}
type yn = { a: () => number, b: () => string }

const getters1: {a: () => number, b: () => string} = getters<{a: number, b: string}>({a: 1, b: `x`})
// getters関数の型引数Tに{a: number, b: string}を与える(代入時の省略可能)
// getters関数は型GettersReturnType<T>を返す
// GettersReturnTypeはオブジェクト型の型引数Tを取るオブジェクト型 （オブジェクトの型とは？）
// オブジェクトの中身はTの全てのプロパティをkeyとし、Tのプロパティの型を返す関数をvalueとするオブジェクト
// [P in keyof T]は、
// 1 { [P in keyof T]: () => T[P] }
// 2 { [P in keyof {a: number; b:string}]: () => {a: number; b: string}[P] }
// 4 { [P in "a" | "b"]: () => {a: number; b: string}[P] }
// 5 { a: () => {a: number; b: string}["a"], b: () => {a: number; b: string}["b"]}
// n { a: () => number, b: () => string }

const getters2: {x: () => Array<number>, y: () => Array<string>} = getters({x: [1], y: [`x`]})
const getters3: {0: () => string, 1: () => string} = getters({0: `zero`, 1: `one`})
const getters4: {a: () => {2: string},1 : () => {}} = getters({a: {2: `x`}, 1: {2: 'a'}})
//　エラー例
const a: {a: () => string, b: () => number} = getters({a: 1, b: `x`})
const b: {x: () => Array<string>, b: () => Array<number>} = getters({x: [1], y: [`x`]})
const c: {a: () => number, b: () => number} = getters({a: `a`, b: "b"})


type User2 = {
	name: string,
	 age: number
}

type UserKey = keyof User2;
// "name" | "age"

type T = number | string
// keyof A → ? 
// tostring | valueof 
type B = keyof T;

// T → number | string
// keyof T → Tのプロパティ名全ての型 → 36 more ...
// P → ?
// typeof P → ?
type User3 = {
	name: string,
	age: number
}

// typeof
// JS・TS共通
const A:string  = "asdf";
if (typeof A  === "string") {
	console.log("Yes")
}
// TS
type foo = typeof A;
// 使用例
const bar:foo = 'a'
// エラー例
const baz:foo = 1

// typeof T → 
// 
