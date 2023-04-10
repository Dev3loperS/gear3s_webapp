import { yupResolver } from '@hookform/resolvers/yup'
import { schema, Schema } from 'src/utils/rules'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { ErrorResponse } from 'src/types/utils.type'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import Input from 'src/components/Input/Input'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'
type FormData = Omit<Schema, 'confirm_password'>
const loginSchema = schema.omit(['confirm_password'])
function Login() {
  const {setIsAuthenticated, setProfile} = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })
  const loginMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.loginAccount(body)
  })
  const onSubmit = handleSubmit(
    (data) => {
      loginMutation.mutate(data, {
        onSuccess: (data) => {
          setIsAuthenticated(true);
          setProfile(data.data.data.user);
          navigate('/')
        },
        onError: (error) => {
          if(isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
            const formError = error.response?.data.data
            if (formError) {
              Object.keys(formError).forEach((key) => {
                setError(key as keyof FormData ,{
                  message: formError[key as keyof FormData],
                  type: 'Server'
                })
              })
            }
          }
        }
      })
      console.log(data)
    }  
  )
  return (
    <div className='bg-orange'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng nhập</div>
              <Input 
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email'
              />
              <Input 
                name='password'
                register={register}
                type='password'
                className='mt-2'
                errorMessage={errors.password?.message}
                placeholder='Password'
                autoComplete='on'
              />
              <div className='mt-3'>
                <Button
                  type='submit'
                  className='flex  w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
                  isLoading={loginMutation.isLoading}
                  disabled={loginMutation.isLoading}
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-gray-400'>
                  Có tài khoản chưa ?
                  <Link className='text-red-400 ml-2' to='/register'>
                    Đăng kí đi bạn
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
