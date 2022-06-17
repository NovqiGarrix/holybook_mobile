
import { IAyat, IBook, IPasal } from "../types";
import getBooks from "./getBooks";
import getChapters from "./getChapters";
import getVerses from "./getVerses";

interface IGetInitializeData {
    books: Array<IBook>;
    chapters: Array<IPasal>;
    verses: Array<IAyat>;
}
async function getInitializeData(lanCode: string = "in-tb"): Promise<IGetInitializeData> {

    const { books } = await getBooks(lanCode);
    const { chapters } = await getChapters(books[0].kitab, lanCode);
    const { ayat: verses } = await getVerses(books[0].kitab, chapters[0].pasal, lanCode);

    return {
        books, chapters, verses
    }

}

export default getInitializeData