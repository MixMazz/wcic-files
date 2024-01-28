import createHttpError from "http-errors";

export function assertIsValidEncodedValue(critterType: "bug" | "fish" | "sealife", encodedString: string) {
    if (critterType !== "bug" && critterType !== "fish" && critterType !== "sealife") {
        throw createHttpError(401, "Critter type is invalid, must be 'fish', 'bug', or 'sealife', but received " + critterType);
    }

    const requiredLength = critterType === "sealife" ? 40 : 80;
    if (encodedString.length != requiredLength) {
        throw createHttpError(401, `Encoded string not valid length. ${critterType} needs a length of ${requiredLength}, but received ${encodedString.length}`);
    }
}