import {memo, useCallback, useEffect} from 'react';
import {Link} from 'wouter';
import {navigate} from 'wouter/use-browser-location';
import {ShowOnMobileOnly} from '../../components/Sizes/ShowOnMobileOnly/ShowOnMobileOnly.js';
import {useForm} from 'react-hook-form';
import {useLazyFetch} from '../../hooks/useFetch.js';
import {ErrorPage} from '../404/Error.js';
import get from 'lodash.get';
import capitalize from 'lodash.capitalize';
import {BACKEND_URL} from '../../constants/index.js';
import {useAccount} from '../../components/Header/hooks/useAccount.js';
import Header from "../../components/HeaderMain/index.js";

export const SignInPage = memo(() => {
  const {
    setProfile,
    profile
  } = useAccount();

  const {
    register, handleSubmit, formState: {
      errors
    },
    setError,
    clearErrors,
    setValue
  } = useForm();

  const [{data, loading, error}, fetchSignIn] = useLazyFetch({
    url: `${BACKEND_URL}/auth/email/sign-in`,
    method: 'post',
    cache: false
  });

  const onSubmit = useCallback(data => {
    fetchSignIn({data}).catch(console.error);
  }, []);

  useEffect(() => {
    if (get(error, 'response.status') !== 401) {
      return;
    }
    error?.response.data.messages.forEach((item, index) => {

      setError(`email`, {
        message: 'Mail or password does not exist or entered incorrectly'
      }, {
        shouldFocus: index === 0
      });
    });

  }, [error]);

  useEffect(() => {
    if (!data) {
      return;
    }
    setProfile(data);
    navigate('/account');
  }, [data]);

  return profile ? (
    <ErrorPage/>
  ) : (
    <>
      <Header/>
      <ShowOnMobileOnly>
        <div className="h-[75px]"/>
      </ShowOnMobileOnly>
      <section className="relative flex  justify-center tablet:items-center tablet:h-screen ">
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md md:mt-36 lg:mt-24">
            <a className="flex justify-center flex-row items-center cursor-pointer gap-x-0.5" href="/">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" x="0px" y="0px" className="w-[30px] h-[30px]">
                <g>
                  <path fill="#fff"
                        d="M15.80762,3.106a.49281.49281,0,0,0-.42871-.09082l-8,2A.4998.4998,0,0,0,7,5.5v8.01257A2.4757,2.4757,0,0,0,5.5,13,2.5,2.5,0,1,0,8,15.5V8.89014l7-1.75v4.37243A2.4757,2.4757,0,0,0,13.5,11,2.5,2.5,0,1,0,16,13.5V3.5A.50094.50094,0,0,0,15.80762,3.106Z"></path>
                </g>
              </svg>
            </a>
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Sign in to your account
            </h2>
          </div>
          <div className=" sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="px-6 mt-10 py-12 shadow sm:rounded-lg sm:px-12 md:bg-gray-800/50">
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      type="email"
                      autoComplete="email"
                      className={`block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white shadow-sm ${errors.email ? ' ring-1 ring-inset ring-[#ff1749] focus:ring-inset focus:ring-[#ff1749]' : 'ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500'} sm:text-sm sm:leading-6`}
                      {...register('email', {required: 'Email field is required'})}
                      onChange={({target: {value}}) => {
                        setValue('email', value);
                        clearErrors('email');
                      }}
                    />
                    {errors.email &&
                      <p className="text-[#ff1749] text-sm mt-2">{capitalize(String(errors.email.message))}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      autoComplete="current-password"
                      className={`block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white shadow-sm r${error ? ' ring-1 ring-inset ring-[#ff1749] focus:ring-inset focus:ring-[#ff1749]' : 'ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500'} sm:text-sm sm:leading-6`}
                      {...register('password', {required: 'Password field is required'})}
                      onChange={({target: {value}}) => {
                        setValue('password', value);
                        clearErrors('password');
                      }}
                    />
                    {errors.password &&
                      <p className="text-[#ff1749] text-sm mt-2">{capitalize(String(errors.password.message))}</p>}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      defaultChecked={true}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-white">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm leading-6">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </form>

              <div>
                <div className="relative mt-10">
                  <div className="absolute inset-0 flex items-center justify-between" aria-hidden="true">
                    <div className="w-1/3 border-t border-gray-700"/>
                    <div className="w-1/3 border-t border-gray-700"/>
                  </div>
                  <div className="relative flex justify-center text-sm font-medium leading-6">
                    <span className="rounded-md px-6 text-white">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <button
                    className="flex items-center justify-center gap-3 w-full h-10 px-4 py-2 text-sm font-semibold text-white transition-all border rounded-lg bg-white/5 hover:bg-white/10 border-gray-700"
                    type="button"
                  >
                    <span className=" w-6 h-6 fill-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 25 25"
                      >
                        <path
                          fill="#4285F4"
                          d="M24.412 12.677c0-.985-.081-1.705-.258-2.452H12.658v4.453h6.748c-.136 1.106-.871 2.774-2.503 3.893l-.023.15 3.634 2.76.252.024c2.314-2.094 3.646-5.174 3.646-8.827Z"
                        />
                        <path
                          fill="#34A853"
                          d="M12.657 24.412c3.306 0 6.081-1.066 8.108-2.907l-3.863-2.934c-1.034.707-2.422 1.2-4.245 1.2a7.358 7.358 0 0 1-6.965-4.985l-.144.012-3.78 2.866-.05.135c2.014 3.92 6.15 6.613 10.939 6.613Z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.692 14.785a7.254 7.254 0 0 1-.408-2.374c0-.826.149-1.626.394-2.373L5.67 9.88 1.844 6.966l-.125.059a11.816 11.816 0 0 0-1.307 5.387c0 1.933.477 3.76 1.307 5.386l3.973-3.012Z"
                        />
                        <path
                          fill="#EB4335"
                          d="M12.657 5.052c2.3 0 3.85.973 4.735 1.787l3.456-3.307c-2.123-1.934-4.885-3.12-8.191-3.12-4.788 0-8.925 2.693-10.94 6.613l3.96 3.013c.993-2.892 3.742-4.986 6.98-4.986Z"
                        />
                      </svg>
                    </span>
                    <span className="max-w-[125px] text-start">Google</span>
                  </button>

                  <button
                    className="flex items-center justify-center gap-3 w-full h-10 px-4 py-2 text-sm font-semibold text-white transition-all border rounded-lg bg-white/5 hover:bg-white/10 border-gray-700"
                    type="button"
                  >
                    <span className=" w-6 h-6 fill-white">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path
                            d="M11.927 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.091-4.61 1.091Zm3.378-3.066c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg>
                    </span>
                    <span className="max-w-[125px] text-start">Apple</span>
                  </button>
                </div>
              </div>
            </div>
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <Link to="/sign-up" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Start a 14 day free trial
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>

  );
});
