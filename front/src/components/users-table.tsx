import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import type { User } from "@/types/user"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { MoreHorizontal } from "lucide-react"
import { Route } from "../routes/_auth/users"
import { Pagination } from "./pagination"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteUser } from "@/services/delete-user"
import { useState, type FormEvent } from "react"
import { Spinner } from "./ui/spinner"
import { toast } from "sonner"

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
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow >
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="text-right">
                    <Actions userId={user._id} />
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
        <Pagination pageIndex={page} pageSize={pageSize} pageCount={pageCount} totalCount={totalCount} />
      </div>
    )
}

function Actions({ userId }: { userId: string }) {
  const [openDialog, setOpenDialog] = useState(false)

  function handleCloseDialog() {
    setOpenDialog(false)
  }
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationKey: ['delete-user'],
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
        exact: false,
      })
      handleCloseDialog()
      toast.success('User deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete user')
    }
  })

  function handleDeleteUser(event: FormEvent) {
    event.preventDefault()
    mutate(userId)
  }

  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <AlertDialogTrigger asChild className="w-full">
                <DropdownMenuItem onSelect={e => e.preventDefault()} variant="destructive" className="w-full justify-start">
                  Delete
                </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the user
                  and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <form onSubmit={handleDeleteUser}>
                  <Button type="submit" variant="destructive" disabled={isPending}>
                    {isPending && <Spinner />}
                    Continue
                  </Button>
                </form>
              </AlertDialogFooter>
            </AlertDialogContent>
        </DropdownMenuContent>
      </DropdownMenu>
    </AlertDialog>
  )
}