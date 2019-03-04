#ts-option
ts-option is an option monad implementation inspired by Scala. Options are immutable and extend Array, so you can use them seamlessly with, or in place of arrays.

ts-option exports the following values:
```typescript
export interface Option<A> extends Readonly<Array<A>> {
    map<B>(callback: (value: A, index: number, array: A[]) => B, thisArg?: any): Option<B>;
    filter(callback: (value: A, index: number, array: A[]) => any, thisArg?: any): Option<A>;
    flatMap<B>(callback: (value: A) => Option<B>): Option<B>;
    flatten<T>(): Option<T>;
    orElse<B>(alternative: Option<B>): Option<A | B>;
    getOrElse<B>(defaultValue: B): A | B;
    readonly get: A; //Throws "Value not present" exception when invoked when empty
    readonly orNull: A | null;
    readonly isEmpty: boolean;
    readonly nonEmpty: boolean;
}

export declare const Some: <T>(val: T) => Option<T>;
export declare const None: Option<any>;
```