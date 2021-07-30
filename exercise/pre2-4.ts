function sonomamaReturn<T>(arg: T): T {
    return arg;
};

// 使用例
const num: number = sonomamaReturn(1)
const str: string = sonomamaReturn('a')
const obj: {foo: string, bar: 123} = sonomamaReturn({foo: '', bar: 123})

// エラー例
const a: number = sonomamaReturn('a')
const b: string = sonomamaReturn(1)
const c: {foo: string} = sonomamaReturn({foo: 123})
const d: number = sonomamaReturn({num: 123})
const e: string = sonomamaReturn({})

// ---

function getId<T>(obj: {id: T}): T {
    return obj.id
}

// 使用例
const numberId: number = getId({id: 13})
const stringId: string = getId({id: `abcdef`})
const arrayId: [string, string] = getId({id: [`username`, `password`]})

// エラー例
const a1: number = getId({id: `a`})
const b1: string = getId({id: 123})
