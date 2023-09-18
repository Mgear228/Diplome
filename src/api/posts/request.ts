import axios from "axios";
import { Post } from "./types";

export async function getPostById({
    onSuccess,
} : {
    onSuccess(data: Post): void;
}) {
    const response = await axios.get<Post>(`https://studapi.teachmeskills.by/blog/posts/`);
    if (!response.data || response.status !== 200) return;
    onSuccess(response.data);
}