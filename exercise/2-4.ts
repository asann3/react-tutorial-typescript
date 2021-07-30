// type Obj = {}
function giveId<T>(obj: {[P in | keyof T]: T[P]} ): T {
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
