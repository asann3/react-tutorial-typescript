// 第一引数が配列、第二引数は条件
// 第二引数は条件と配列の要素を比較し、真偽値を返す
function myFilter<T>(arr: Array<T>, predicate: (elm) => boolean) {
	const result = [];
	for (const elm of arr) {
		if (predicate(elm)) {
			result.push(elm);
		}
	}
	return result;
}

// 使用例
const res = myFilter([1, 2, 3, 4, 5], (num) => num % 2 === 0);
const res2 = myFilter(["foo", "hoge", "bar"], (str) => str.length >= 4);

// エラー例
myFilter([1, 2, 3, 4, 5], (str) => str.length >= 4);
