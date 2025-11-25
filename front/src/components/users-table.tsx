import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import type { User } from "@/types/user"
import { Route } from "../routes/_auth/users"
import { Pagination } from "./pagination"

type UsersTableProps = {
  users: User[]
  pageCount: number
  totalCount: number
}
export function UsersTable({ users, pageCount, totalCount }: UsersTableProps) {
    const { page, pageSize } = Route.useSearch()
    return (
      <div>
        <Table>
          <TableHeader>
            <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
        <Pagination pageIndex={page} pageSize={pageSize} pageCount={pageCount} totalCount={totalCount} />
      </div>
    )
}