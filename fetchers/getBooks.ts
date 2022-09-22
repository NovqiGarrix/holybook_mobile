import axios from "axios";
import { IBook } from "../types";

interface IGetBooksReturn {
    error: string | null;
    books: Array<IBook>;
}
export default async function getBooks(lanCode: string = "in-tb"): Promise<IGetBooksReturn> {

    const API_URL = `https://bible-${lanCode}.herokuapp.com`;

    try {
        const { data } = await axios.get(`${API_URL}/books`, { validateStatus: () => true });
        if (data.error) throw new Error(data.error);

        return {
            error: null,
            books: data.data.map((book: IBook) => ({ id: book.id, kitab: book.kitab }))
        }
    } catch (error: any) {
        return {
            error: error.message,
            books: []
        }
    }

}