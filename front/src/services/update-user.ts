import { api } from "@/lib/api";
import type { UpdateUserPayload } from "@/types/user";

type UpdateUserParams = {
    id: string;
} & UpdateUserPayload;

export async function updateUser(payload: UpdateUserParams) {
    const { id, ...data } = payload;

    const response = await api.put<boolean>(`/user/${id}`, data);
    return response.data;
}