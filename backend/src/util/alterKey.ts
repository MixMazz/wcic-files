const lock = [
    "AuU85G6kJF3ZHjsL9EzwT720QhINWycqdMSgVipO1nbelafBRrvtxPXmDoY4KC",
    "nJLlqYOvpZNd9fh0yegtG1RsBMru3U8KjbHFXTQ4C2wSm7kDWzVxI5iocPa6EA",
    "u5ifrOWqXkxmHbvLM28UDI6C7R4zcBJEKATts1PhgZ0pVe3aljQnwySo9dYNFG",
    "B6JA2jur8zsnOmdeGaiy0CochlNk1vIFx4SXTQp9bZf7Eq3KWtUwMRV5HPDLYg",
    "a3y4ikmXYLBGx81qgIJMAVtrlfbPDjUSsZCQuRNOwTHE6d7h0oze5KnF9v2Wcp"
]
const base = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function alterKey(text: string): string {
    let counter = 0;
    let newText = "";

    for (let i = 0; i < text.length; i++) {
        const letter = text[i];
        const index = base.indexOf(letter);
        if (index === -1) {
            newText += letter;
        } else {
            newText += lock[counter][index];
        }
        counter = (counter === lock.length - 1) ? 0 : counter + 1;
    }

    return newText;
}