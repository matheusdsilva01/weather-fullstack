import { api } from "@/lib/api";
import type { User } from "@/types/user";

export async function getAuthUser() {
    const response = await api.get<User>("/auth/profile");
    return response.data;
}