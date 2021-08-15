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


type Spread<Ev, EvOrig, E> = Ev extends keyof E
  ? EvOrig[] extends Ev[]
    ? E[Ev]
    : never
  : never;

// "stop", {
//   user: "user1",
//   after: 3
// }

// 型変数
// E = EventPayloads
// Ev = "start" | "stop"
// EvOrig[] = Ev

// keyof E
// "start" | "stop" | "end"

// extendsの左が型変数ただひとつという形であるときしか、union distributionは発生しない
// EvOrig[]など配列型ではunion distributionは発生しない

// 条件型
// Ev extends keyof E ? (EvOrig[] extends Ev[] ? E[Ev] : never) : never;
// "start" | "stop" extends "start" | "stop" | "end" ? (EvOrig[] extends Ev[] ? E[Ev] : never) : never; ← Wrong(展開としては合っているけど、これ自体はunion distributionではない)

// https://qiita.com/uhyo/items/da21e2b3c10c8a03952f#%E5%88%86%E9%85%8D%E3%81%95%E3%82%8C%E3%82%8B%E3%81%AE%E3%81%AF%E5%9E%8B%E5%A4%89%E6%95%B0%E3%81%AE%E3%81%BF

// ("start" extends "start" | "stop" | "end" ? EvOrig[] extends "start"[] ? E["start"] : never : never)
// |
// ("stop" extends "start" | "stop" | "end" ? EvOrig[] extends "stop"[] ? E["stop"] : never : never) ← Correct(union distribution)

// (EvOrig[] extends "start"[] ? E["start"] : never)
// |
// (EvOrig[] extends "stop"[] ? E["stop"] : never)

// (("start" | "stop")[] extends "start"[] ? E["start"] : never)
// |
// (("start" | "stop")[] extends "stop"[] ? E["stop"] : never)

// never | never

// never

class EventDischarger<E> {
  emit<Ev extends keyof E>(eventName: Ev, payload: Spread<Ev, Ev, E>) {
    // 省略
  }
}

// Ev extends E[Ev] ? never : Ev

// 使用例
const ed = new EventDischarger<EventPayloads>();
ed.emit("start", {
  user: "user1"
});
ed.emit("stop", {
  user: "user1",
  after: 3
});
ed.emit("end", {});

// エラー例
ed.emit<"start" | "stop">("stop", {
  user: "user1"
});

export{}
