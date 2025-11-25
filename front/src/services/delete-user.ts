import { api } from "@/lib/api";

export async function deleteUser(id: string) {
    const response = await api.delete(`/user/${id}`);
    return response.data;
}