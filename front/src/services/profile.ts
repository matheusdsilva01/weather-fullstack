import { api } from "@/lib/api";
import type { AuthUser } from "@/types/user";

export async function getAuthUser() {
    const response = await api.get<AuthUser>("/auth/profile");
    return response.data;
}