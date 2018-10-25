import {None, Some} from "./option"
import {expect} from "chai"

describe("Option", () => {

    describe("get()", () => {

        it("allows retrieval of values", () => {
            expect(Some("sasquatchIt").get).to.equal("sasquatchIt")
        })

        it("when the option is empty throws an exception", () => {
            expect(() => None.get).to.throw()
        })

    })

    describe("getOrElse()", () => {

        it("allows retrieval of values", () => {
            expect(Some("sasquatchIt").getOrElse("foo")).to.equal("sasquatchIt")
        })


        it("when the option is empty returns the default", () => {
            expect(None.getOrElse("sasquatchIt")).to.equal("sasquatchIt")
        })

    })

    describe("orElse()", () => {

        it("uses the present option gen it exists", () => {
            expect(Some("sasquatchIt").orElse(Some("yeti")).get).to.equal("sasquatchIt")
        })

        it("when the option is empty returns the default", () => {
            expect(None.orElse(Some("yeti")).get).to.equal("yeti")
        })

    })

    describe("orNull", () => {

        it("returns the value when present", () => {
            expect(Some("sasquatchIt").orNull).to.equal("sasquatchIt")
        })

        it("returns null when the value is not present", () => {
            expect(None.orNull).to.be.null
        })

    })

    describe("toArray", () => {

        it("returns an array with the value when present", () => {
            expect(Some("sasquatchIt").toArray).to.deep.equal(["sasquatchIt"])
        })

        it("returns null when the value is not present", () => {
            expect(None.toArray).to.deep.equal([])
        })

    })

    describe("isEmpty", () => {

        it("returns false when the value when present", () => {
            expect(Some("sasquatchIt").isEmpty).to.be.false
        })

        it("returns true when the value was initialized with undefined", () => {
            expect(Some(undefined).isEmpty).to.be.true
        })

        it("returns true when the value was initialized with null", () => {
            expect(Some(null).isEmpty).to.be.true
        })

        it("returns true when the value is not present", () => {
            expect(None.isEmpty).to.be.true
        })

    })

    describe("nonEmpty", () => {

        it("returns true when the value when present", () => {
            expect(Some("sasquatchIt").nonEmpty).to.be.true
        })

        it("returns false when the value is not present", () => {
            expect(None.nonEmpty).to.be.false
        })

    })

    describe("map()", () => {

        it("transforms the value", () => {
            const subject = Some({species: "sasquatchIt" }).map(obj => obj.species)
            expect(subject.get).to.equal("sasquatchIt")
        })

        it("returns an empty option when the value is not present", () => {
            const subject = None.map(obj => obj.species)
            expect(subject.orNull).to.be.null
        })


    })

    describe("forEach()", () => {

        it("runs the operation with the value when present", () => {
            let actual = null
            Some("sasquatchIt").forEach(value => actual = value)
            expect(actual).to.equal("sasquatchIt")
        })

        it("does nothing when the option is empty", () => {
            let actual = null
            None.forEach(value => actual = value)
            expect(actual).to.to.be.null
        })

    })

    describe("filter()", () => {

        it("when the predicate returns true returns the option", () => {
            const subject = Some("sasquatchIt").filter(species => species === "sasquatchIt")
            expect(subject.orNull).to.equal("sasquatchIt")
        })

        it("when the predicate returns false returns an empty option", () => {
            const subject = Some("sasquatchIt").filter(species => species !== "sasquatchIt")
            expect(subject.orNull).to.be.null
        })

    })

    describe("flatMap()", () => {

        it("transforms and flattens the value", () => {
            const subject = Some({species: Some("sasquatchIt") }).flatMap(obj => obj.species)
            expect(subject.get).to.equal("sasquatchIt")
        })

        it("returns an empty option when the value is not present", () => {
            const subject = None.flatMap(obj => obj.species)
            expect(subject.orNull).to.be.null
        })

    })

    describe("flatten", () => {

        it("flattens the nested optional", () => {
            expect(Some(Some("sasquatchIt")).flatten<string>().get).to.equal("sasquatchIt")
        })

        it("returns an empty option when the value is not present", () => {
            expect(None.flatten<string>().orNull).to.be.null
        })

    })

})
