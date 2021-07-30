var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function giveId(obj) {
    var id = "本当はランダムがいいけどここではただの文字列";
    return __assign(__assign({}, obj), { id: id });
}
// 使用例
var obj1 = giveId({ foo: 123 });
// {id: "本当はランダムがいいけどここではただの文字列", foo: 123}
var obj2 = giveId({
    num: 0,
    hoge: true
});
// {id: "本当はランダムがいいけどここではただの文字列", num: 0, hoge: true}
// エラー例
var obj3 = giveId({
    foo: "bar"
});
// {id: "本当はランダムがいいけどここではただの文字列", piyo: 
// interface Myobj {
//     foo: string
// }
// giveId<T>({ foo: <string>"bar"})
