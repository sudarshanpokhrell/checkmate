

export interface Player {
    id: string;
    roomId: string | null;
    role: role;
    username?:string;
}

export type role = "white" | "black";