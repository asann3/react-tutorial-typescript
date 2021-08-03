interface EventPayloads {
	start: {
		user: string;
	};
	stop: {
		user: string;
		after: number;
	};
	end: {};
}

type Foo<T extends object> = T;
type S = {start: {a: 1};stop:{b: 2}}
type x = keyof {start: {a: 1};stop:{b: 2}}
type a = Foo<S[x]>

type A = keyof EventDischarger<{
	start: {
		user: string;
	};
	stop: {
		user: string;
		after: number;
	};
	end: {};
}>;
class EventDischarger<E> {
	emit<U extends keyof E>(eventName: U , payload: 
            E[U]
            // {[key in keyof E[U]]: E[U][key]}
        ) {
		// 省略
	}
}

// U → "start"
// {[key in keyof E[U]]: E[U][key]}
// {[key in keyof EventPayloads[U]]: EventPayloads[U][key]}
// {[key in keyof EventPayloads["start"]]: EventPayloads["start"][key]}
// {[key in keyof {user: string}]: EventPayloads["start"][key]}
// {[key in "user"]: EventPayloads["start"][key]}
// {[key in "user"]: {user: string}[key]}
// {"user": {user: string}[key]}
// {"user": {user: string}["user"]}
// {"user": string}

// n: payload の型 → {user: string}

// U → "stop"
// {[key in keyof E[U]]: E[U][keyof E[U]]}
// {[key in keyof EventPayloads[U]]: EventPayloads[U][keyof E[U]]}
// {[key in keyof EventPayloads["stop"]]: EventPayloads["stop"][keyof EventPayloads["stop"]]}
// {[key in keyof {user: string;} | {user: string;after: number}]: EventPayloads["stop"][keyof EventPayloads["stop"]]}
// {[key in "user" | "after"]: EventPayloads["stop"][keyof {user: string;} | {user: string;after: number}]}
// {[key in "user" | "after"]: EventPayloads["stop"]["user | "after"]}:
// {[key in "user" | "after"]: {user: string;} | {user: string;after: number}["user" | "after"]}
// {[key in "user" | "after"]: string | number}

// {user:  string | number , after:  string | number}

// n: payload の型 → {user: string , after: number}

type X = "start"
type Y = keyof EventPayloads
// "start" | "stop" | "end"

type U= "start" | "stop" | "end"
type keys = keyof U;
type Bar <T extends object> = T
type Baz = Foo<keys>

// 使用例
const ed = new EventDischarger<EventPayloads>();
ed.emit("start", {
	user: "user1",
});
ed.emit("stop", {
	user: "user1",
	after: 3,
});
ed.emit("end", {});

// エラー例
ed.emit("start", {
	user: "user2",
	after: 0,
});
ed.emit("stop", {
	user: "user2",
});
ed.emit("foobar", {
	foo: 123,
});

// 追加
ed.emit("stop", {
	user: 0,
	after: "",
});