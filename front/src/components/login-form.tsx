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
import { useAuth } from '@/context/AuthContext'
import { login } from '@/services/login'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'
import { Spinner } from './ui/spinner'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const search = useSearch({ from: '/login' })

  const { login: authLogin } = useAuth()
  const { mutate, isPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: login,
    onSuccess: (data) => {
      authLogin(data.access_token)
      navigate({ to: search.redirect ?? '/' })
      toast.success('Entrou na conta com sucesso!')
    },
    onError: (error) => {
      console.error('Login error:', error)
      toast.error(error.message || 'Erro ao entrar na conta')
    }
  })

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    mutate({ email, password })
  }

  return (
    <div className='flex flex-col gap-6'>
      <Card>
        <CardHeader>
          <CardTitle>Entrar na sua conta</CardTitle>
          <CardDescription>
            Insira seu email abaixo para entrar na sua conta
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
                <FieldLabel htmlFor='password'>Senha</FieldLabel>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id='password'
                  type='password'
                  required
                />
              </Field>
              <Field>
                <Button type='submit' disabled={isPending}>
                  {isPending && <Spinner />}
                  Entrar
                </Button>
                <FieldDescription className='text-center'>
                  Não tem uma conta? <Link to='/sign-up'>Cadastre-se</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
