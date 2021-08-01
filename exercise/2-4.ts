// type Obj = {}
function giveId<T>(obj: {[P in keyof T]: T[P]} ): T {
// function giveId<T>(obj: {foo:number}): T {
	const id = "本当はランダムがいいけどここではただの文字列";
	return {
		...obj,
		id,
	};
}

// 使用例
const obj1: {
	id: string;
	foo: number;
} = giveId({ foo: 123 });
// {id: "本当はランダムがいいけどここではただの文字列", foo: 123}

const obj2: {
	id: string;
	num: number;
	hoge: boolean;
} = giveId({
	num: 0,
	hoge: true,
});
// {id: "本当はランダムがいいけどここではただの文字列", num: 0, hoge: true}

// エラー例
const obj3: {
	id: string;
	piyo: string;
} = giveId({
	foo: "bar",
});
const obj4: {
	id: string;
	name: number;
} = giveId({ name: "myname" });

interface Foo<T> {
	[key: string]: T;
}
function getters<T>(obj: Foo<T>): {[P in keyof T] : () =>  T } {
    const result: any = {};
    for (const key in obj) {
        result[key] = () => obj[key] as any
    }
    return result
}

// 使用例
const getters1: {a: () => number, b: () => string} = getters<number | string>({a: 1, b: `x`})
const getters2: {x: () => Array<number>, y: () => Array<string>} = getters({x: [1], y: [`x`]})
const getters3: {0: () => string, 1: () => string} = getters({0: `zero`, 1: `one`})
//　エラー例
const a: {a: () => string, b: () => number} = getters({a: 1, b: `x`})
const b: {x: () => Array<string>, b: () => Array<number>} = getters({x: [1], y: [`x`]})

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
