
import axios from "axios";
import { IAyat } from "../types";

interface IGetVersesReturn {
    error: string | null;
    ayat: Array<IAyat>;
}
export default async function getVerses(kitab: string, chapter: number | string, lanCode: string = "in-tb"): Promise<IGetVersesReturn> {

    const API_URL = `https://bible-${lanCode}.herokuapp.com`;

    try {
        const { data } = await axios.get(`${API_URL}/books/${kitab}/chapters/${chapter}`, { validateStatus: () => true });
        if (data.error) throw new Error(data.error);

        return {
            error: null,
            ayat: data.data?.ayat ?? []
        }
    } catch (error: any) {
        return {
            error: error.message,
            ayat: []
        }
    }

}