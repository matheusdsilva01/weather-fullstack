import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { updateUser } from "@/services/update-user"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { toast } from "sonner"
import { Spinner } from "./ui/spinner"

export function UpdateUserForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [name, setName] = useState("")
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationKey: ['update-user'],
    mutationFn: updateUser,
    onSuccess: () => {
      navigate({ to: '/' })
      toast.success('Account updated successfully!')
    },
    onError: (error) => {
      console.error("Update user error:", error);
      toast.error(error.message || 'Update user failed')
    }
  })

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    mutate({ name })
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Update Your Account</CardTitle>
        <CardDescription>
          Enter your information below to update your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                type="text"
                placeholder="Your name"
                required
              />
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={isPending}>
                  {isPending  && <Spinner />}
                  Update Account
                </Button>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
