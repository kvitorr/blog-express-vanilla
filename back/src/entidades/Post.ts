export interface Post {
    cod_post: string;
    titulo: string;
    conteudo: string;
    likes: number;
    created_at: Date;
    att_at: Date | null;
}