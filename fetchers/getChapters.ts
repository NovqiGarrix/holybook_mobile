import axios from "axios";
import { IPasal } from "../types";

interface IGetChaptersReturn {
    error: string | null;
    chapters: Array<IPasal>;
}
export default async function getChapters(kitab: string, lanCode: string = "in-tb"): Promise<IGetChaptersReturn> {

    const API_URL = `https://bible-${lanCode}.herokuapp.com`;
    const { data } = await axios.get(`${API_URL}/books/${kitab}/chapters`);
    if (data.error) throw new Error(data.error);

    return {
        error: null,
        chapters: data.data
    }

}