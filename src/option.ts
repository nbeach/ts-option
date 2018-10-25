export class Option<A> {
    private readonly value: A | null

    constructor(value: A | undefined | null) {
        this.value = value !== undefined ? value : null
    }

    public map = <B>(predicate: (value: A) => B): Option<B> => {
        return this.nonEmpty ? Some(predicate(this.value!)) : None
    }

    public flatMap<B>(predicate: (value: A) => Option<B>): Option<B> {
        return this.map(predicate).flatten()
    }

    public flatten<B>(): Option<B> {
        return this.nonEmpty ? this.get as any : None
    }

    public filter = (predicate: (value: A) => boolean): Option<A> => {
        return this.nonEmpty && predicate(this.value!) ? this : None
    }

    public orElse = <B>(alternative: Option<B>): Option<A | B> => {
        return this.nonEmpty ? this : alternative
    }

    public forEach = (consumer: (value: A) => void): void => {
        if (this.nonEmpty) { consumer(this.value!) }
    }

    public getOrElse = <B>(defaultValue: B): A | B => {
        return this.nonEmpty ? this.value! : defaultValue
    }

    get get(): A {
        if (this.isEmpty) { throw new Error("Value not present") }
        return this.value!
    }

    get orNull(): A | null {
        return this.getOrElse(null)
    }

    get	nonEmpty(): boolean {
        return !this.isEmpty
    }

    get	isEmpty(): boolean {
        return this.value === null
    }

    get	toArray(): Array<A> {
        return this.nonEmpty ? [this.value!] : []
    }

}

export const Some = <T>(val: T) => new Option(val)
export const None = new Option(null) as Option<any>
