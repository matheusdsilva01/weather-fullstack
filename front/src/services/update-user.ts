import { api } from "@/lib/api";
import type { UpdateUserPayload } from "@/types/user";

export async function updateUser(payload: UpdateUserPayload) {
    const response = await api.put<boolean>("/user", payload);
    return response.data;
}