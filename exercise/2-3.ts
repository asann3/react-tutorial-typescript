declare function myAddEventListener(
    arg:string, arg2: () => void,
    arg3?: boolean | {capture?: boolean, once?: boolean, possive?: boolean}): void;

// 使用例
myAddEventListener("foobar", () => {});
myAddEventListener("event", () => {}, true);
myAddEventListener("event2", () => {}, {});
myAddEventListener("event3", () => {}, {
	capture: true,
	once: false,
});

// エラー例
// @ts-expect-error
myAddEventListener("foobar", () => {}, "string");
myAddEventListener("hoge", () => {}, {
	capture: true,
	once: false,
// @ts-expect-error
	excess: true,
});
