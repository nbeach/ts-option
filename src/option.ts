export interface Option<A> extends Readonly<Array<A>> {
    map<B>(callback: (value: A, index: number, array: A[]) => B, thisArg?: any): Option<B>
    filter(callback: (value: A, index: number, array: A[]) => any, thisArg?: any): Option<A>
    flatMap<B>(callback: (value: A) => Option<B>): Option<B>
    flatten<T>(): Option<T>
    orElse<B>(alternative: Option<B>): Option<A | B>
    getOrElse<B>(defaultValue: B): A | B
    readonly get: A
    readonly orNull: A | null
    readonly isEmpty: boolean
    readonly nonEmpty: boolean
}

class OptionInstance<A> extends Array<A> implements Option<A>  {
    constructor(value: A | undefined | null) {
        super()
        Object.setPrototypeOf(this, Object.create(OptionInstance.prototype))
        if (value !== undefined && value !== null) {
            this[0] = value
        }
    }

    public map<B>(callback: (value: A, index: number, array: A[]) => B, thisArg: any = this): Option<B> {
        return this.isEmpty ? None : new OptionInstance([this[0]].map(callback, thisArg)[0])
    }

    //TODO: make flatmap and flatten consistent with ES7 spec
    public flatMap<B>(callback: (value: A) => Option<B>): Option<B> {
        return this.map(callback).flatten()
    }

    public flatten<T>(): Option<T> {
        return this.nonEmpty ? this.get as any : None
    }

    public filter(callback: (value: A, index: number, array: A[]) => any, thisArg: any = this): Option<A> {
        return this.isEmpty ? None : new OptionInstance([this[0]].filter(callback, thisArg)[0])
    }

    public orElse<B>(alternative: Option<B>): Option<A | B> {
        return this.nonEmpty ? this : alternative
    }

    public getOrElse<B>(defaultValue: B): A | B {
        return this.nonEmpty ? this.get : defaultValue
    }

    get get(): A {
        if (this.isEmpty) { throw new Error("Value not present") }
        return this[0]
    }

    get orNull(): A | null {
        return this.getOrElse(null)
    }

    get nonEmpty(): boolean {
        return !this.isEmpty
    }

    get isEmpty(): boolean {
        return this.length === 0
    }

}


export const Some = <T>(val: T) => Object.freeze(new OptionInstance(val)) as Option<T>
export const None = Object.freeze(new OptionInstance(null) ) as Option<any>
