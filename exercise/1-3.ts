// 引数がnum numが0以上ならTrue、0未満ならFalseを返す関数
const isPositive: IsPositiveFunc = num => num >= 0;

type IsPositiveFunc = (num: number) => boolean;

// 使用例
isPositive(5);

// エラー例
isPositive("foo");
const res: number = isPositive(123);
