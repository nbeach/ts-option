export interface Option<A> extends Array<A> {
    map<B>(callback: (value: A, index: number, array: A[]) => B, thisArg?: any): Option<B>
    flatMap<B>(callback: (value: A) => Option<B>): Option<B>
    flatten<T>(): Option<T>
    filter(callback: (value: A, index: number, array: A[]) => any, thisArg?: any): Option<A>
    orElse<B>(alternative: Option<B>): Option<A | B>
    getOrElse<B>(defaultValue: B): A | B
    get(): A
    orNull(): A | null
    nonEmpty(): boolean
    isEmpty(): boolean
}

class OptionInstance<A> extends Array<A> implements Option<A> {
    constructor(value: A | undefined | null) {
        super()
        if (value !== undefined && value !== null) {
            this[0] = value
        }
        Object.freeze(this)
    }

    public map = <B>(callback: (value: A, index: number, array: A[]) => B, thisArg?: any): Option<B> => {
        return new OptionInstance(super.map(callback, thisArg)[0])
    }

    public flatMap = <B>(callback: (value: A) => Option<B>): Option<B> => {
        return this.map(callback).flatten()
    }

    public flatten = <T>(): Option<T> => {
        return this.nonEmpty() ? this.get() as any : None
    }

    public filter = (callback: (value: A, index: number, array: A[]) => any, thisArg?: any): Option<A> => {
        return new OptionInstance(super.filter(callback, thisArg)[0])
    }

    public orElse = <B>(alternative: Option<B>): Option<A | B> => {
        return this.nonEmpty() ? this : alternative
    }

    public getOrElse = <B>(defaultValue: B): A | B => {
        return this.nonEmpty() ? this.get() : defaultValue
    }

    public get = (): A => {
        if (this.isEmpty()) { throw new Error("Value not present") }
        return this[0]
    }

    public orNull = (): A | null => {
        return this.getOrElse(null)
    }

    public nonEmpty = (): boolean => {
        return !this.isEmpty()
    }

    public isEmpty = (): boolean => {
        return this.length === 0
    }

}

export const Some = <T>(val: T) => new OptionInstance(val)
export const None = new OptionInstance(null) as Option<any>
