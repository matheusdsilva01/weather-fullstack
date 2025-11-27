import { UpdateUserForm } from '@/components/update-user-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/update-user/$id')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <UpdateUserForm />
      </div>
    </div>
  )
}
