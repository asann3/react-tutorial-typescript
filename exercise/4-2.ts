function giveId<T>(obj: T): Pick<T, Exclude<keyof T, 'id'>> & {id: string} {
	const id = "本当はランダムがいいけどここではただの文字列";
	return {
		...obj,
		id,
	};
}
// (Partial<T> - id: any) & id: strings

// 使用例
/*
 * obj1の型は { foo: number; id: string } 型
 */
const obj1 = giveId({ foo: 123 });
declare function acceptObj1(obj: { foo: number; id: string }): void;
acceptObj1(obj1)

/*
 * obj2の型は { num : number; id: string } 型
 */
const obj2 = giveId({
	num: 0,
	id: 100,
});
declare function acceptObj2(obj: { num: number; id: string }): void;
acceptObj2(obj2)

const gotId: string = obj2.id
// obj2のidはstring型なので別の文字列を代入できる
obj2.id = '';


export{};
