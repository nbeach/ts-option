export interface Option<A> extends Array<A> {
    map<B>(callback: (value: A, index: number, array: A[]) => B, thisArg?: any): Option<B>
    filter(callback: (value: A, index: number, array: A[]) => any, thisArg?: any): Option<A>
    flatMap<U>(callback: (value: A, index: number, array: A[]) => U | Option<U>, thisArg?: any): Option<U>
    orElse<B>(alternative: Option<B>): Option<A | B>
    getOrElse<B>(defaultValue: B): A | B
    readonly get: A
    readonly orNull: A | null
    readonly isEmpty: boolean
    readonly nonEmpty: boolean



    flat<U>(this: NestedOptions<U>, depth?: number): Option<U>
}

type NestedOptions<U> = Option<Option<Option<Option<Option<U>>>>> | Option<Option<Option<Option<U>>>> | Option<Option<Option<U>>> | Option<Option<U>> | Option<U>

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

    public flatMap<U, This = Option<U>>(callback: (this: This, value: A, index: number, array: A[]) => U | Option<U>, thisArg?: This): Option<U> {
        return this.isEmpty ? None : this.map(callback).flat()
    }

    public flat<U>(depth: number = 1): Option<any> {
        return this.isEmpty ? None : Array
            .from(Array(depth).keys())
            .reduce(option => (option as any).get, this)
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
