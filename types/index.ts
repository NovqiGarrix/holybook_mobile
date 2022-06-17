

export interface IBook {
    id: string;
    kitab: string;
}

export interface IPasal {
    id: string;
    kitabId: string;
    pasal: number;
}

export interface IAyat {
    id: string;
    ayat: number;
    description: string;
    query: string;
    pasalId: string;
}