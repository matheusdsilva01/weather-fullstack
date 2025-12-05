import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Route } from '@/routes/_auth/update-user.$id'
import { updateUser } from '@/services/update-user'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'
import { Spinner } from './ui/spinner'

export function UpdateUserForm({
  ...props
}: React.ComponentProps<typeof Card>) {
  const params = Route.useParams()

  const [name, setName] = useState('')
  const navigate = useNavigate()

  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationKey: ['update-user'],
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['auth-user']
      })
      navigate({ to: '/' })
      toast.success('Conta atualizada com sucesso!')
    },
    onError: (error) => {
      console.error('Update user error:', error)
      toast.error(error.message || 'Erro ao atualizar a conta')
    }
  })

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    mutate({ id: params.id, name })
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Atualize sua conta</CardTitle>
        <CardDescription>
          Insira suas informações abaixo para atualizar sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor='name'>Nome</FieldLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id='name'
                type='text'
                placeholder='Seu nome'
                required
              />
            </Field>
            <FieldGroup>
              <Field>
                <Button type='submit' disabled={isPending}>
                  {isPending && <Spinner />}
                  Atualizar Conta
                </Button>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
