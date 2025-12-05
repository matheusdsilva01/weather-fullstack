import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { signUp } from '@/services/sign-up'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'
import { Spinner } from './ui/spinner'

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationKey: ['sign-up'],
    mutationFn: signUp,
    onSuccess: () => {
      navigate({ to: '/login' })
      toast.success('Conta criada com sucesso! Por favor, faça login.')
    },
    onError: (error) => {
      console.error('Sign up error:', error)
      toast.error(error.message || 'Erro ao criar a conta')
    }
  })

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    mutate({ email, password, name })
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Crie uma conta</CardTitle>
        <CardDescription>
          Insira suas informações abaixo para criar sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor='email'>Email</FieldLabel>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id='email'
                type='email'
                placeholder='m@example.com'
                required
              />
            </Field>
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
            <Field>
              <FieldLabel htmlFor='password'>Senha</FieldLabel>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id='password'
                type='password'
                required
              />
            </Field>
            <FieldGroup>
              <Field>
                <Button type='submit' disabled={isPending}>
                  {isPending && <Spinner />}
                  Criar Conta
                </Button>
                <FieldDescription className='px-6 text-center'>
                  Já tem uma conta? <Link to='/login'>Entrar</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
