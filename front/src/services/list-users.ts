import { api } from "@/lib/api";
import type { PaginationResult } from "@/types/pagination";
import type { User } from "@/types/user";

export type ListUsersParams = {
    page?: number;
    pageSize?: number;
};

export const listUsers = async (params?: ListUsersParams): Promise<PaginationResult<User[]> | null> => {
    try {
        const response = await api.get<PaginationResult<User[]>>("/user", { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching users data:", error);
        return null;
    }
};
