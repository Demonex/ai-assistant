import {useEffect} from 'react';
import {useLazyFetch} from '../../../hooks/useFetch.js';
import {useForm} from 'react-hook-form';
import modifyIcon from '/assets/svg/modify_icon.svg';
import {BACKEND_URL} from "../../../constants/index.js";
import {useAccount} from '../../../components/Header/hooks/useAccount.js';

export const AccountSettings = ({setIsPopupOpen}) => {
  const {profile, setProfile} = useAccount();

  const [{data: dataUpdatedProfile}, fetchUpdate] = useLazyFetch({
    url: `${BACKEND_URL}/profile`,
    method: 'put',
    cache: false
  });

  const onSubmitUpdate = (data, e) => {
    const formValues = data.profile;

    const changedFields = {
      firstName: profile?.firstName !== formValues?.firstName ? formValues.firstName : undefined,
      lastName: profile?.lastName !== formValues?.lastName ? formValues.lastName : undefined,
      email: profile?.email !== formValues?.email ? formValues.email : undefined,
    }

    void fetchUpdate({
      data: changedFields
    })
  };
  useEffect(() => {
    if (!dataUpdatedProfile) {
      return;
    }
    setProfile(dataUpdatedProfile);
  }, [dataUpdatedProfile]);

  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      profile: {
        firstName: profile?.firstName,
        lastName: profile?.lastName,
        email: profile?.email
      }
    }
  });

  return (
    <>
      {/* <p className="text-gray-200 font-medium text-lg xl:text-xl capitalize text-center py-8">Update your account name
        and
        password.</p>
      <div
        className="w-full origin-top-right rounded-xl bg-gradient-to-b from-indigo-500 via-indigo-500/ ring-1 ring-inset ring-white/5 focus:outline-none p-[0.060rem] mt-4"
      >
        <div className=" bg-gray-900 rounded-xl py-5 md:px-20 px-4" role="none">
          <form onSubmit={handleSubmit(onSubmitUpdate)} className="w-full">
            <div className="w-full min-h-[2rem] flex flex-col items-center gap-3 mt-5">
              <div

                className="w-[4.5rem] min-h-[4.5rem] flex justify-center items-center border border-slate-200/40 rounded-[8px] relative cursor-pointer">
                {
                  profile?.photos?.length > 0
                    ? <img src={profile?.photos}/>
                    :
                    <>
                      <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                           className="w-6 h-6">
                        <path
                          d="M10.35 17.713c-2.4 0-4.513-.422-4.34-1.478.46-2.765 1.9-4.377 4.34-4.377 2.438 0 3.877 1.631 4.338 4.377.173 1.056-1.939 1.479-4.339 1.479ZM10.35 11.378A2.189 2.189 0 1 0 10.348 7a2.189 2.189 0 0 0 0 4.378Z"
                          className="group-hover:fill-purple-300 fill-slate-500"></path>
                        <path
                          d="M15.264 11.32a1.632 1.632 0 1 0 0-3.264 1.632 1.632 0 0 0 0 3.264ZM18.51 15.18c-.327-2.055-1.402-3.284-3.246-3.284-.71 0-1.286.173-1.766.518.058.058.115.116.192.173.787.826 1.325 2.016 1.574 3.533 0 .058.02.115.02.154 1.785.019 3.36-.288 3.225-1.095Z"
                          className="group-hover:fill-purple-400 fill-slate-600"></path>
                      </svg>
                      <div className="absolute top-3/4 -right-[10%] bg-[#111827] p-[3px]">
                        <img src={modifyIcon} alt="" className="w-[20px] h-[20px]"/>
                      </div>
                    </>

                }
              </div>
              <p className="text-gray-200 font-medium text-md xl:text-[18px] capitalize py-4">UserName</p>
              <h1 className="text-gray-200 font-medium text-xs xl:text-sm py-4 -mt-5">{profile?.email}</h1>

            </div>

            <div className="w-full py-6 flex flex-col gap-4">
              <div className="w-full flex flex-col ">
                <label className="text-gray-200 font-medium text-xs xl:text-sm py-4  capitalize">
                  first & last name
                </label>
                <input
                  className="block w-full h-10 px-4 py-3 text-indigo-300 bg-transparent border rounded-lg appearance-none border-gray-800 placeholder-gray-600 focus:border-indigo-300 focus:bg-transparent focus:outline-none focus:ring-indigo-300 sm:text-sm"
                  autoComplete="given-name"
                  placeholder="Your name..."
                  {...register('name', {maxLength: 20})}
                />
              </div>
              <div className="w-full flex flex-col ">
                <label className="text-gray-200 font-medium text-xs xl:text-sm py-4  capitalize">
                  Change Email
                </label>
                <input
                  className="block w-full h-10 px-4 py-3 text-indigo-300 bg-transparent border rounded-lg appearance-none border-gray-800 placeholder-gray-600 focus:border-indigo-300 focus:bg-transparent focus:outline-none focus:ring-indigo-300 sm:text-sm"
                  autoComplete="given-name"
                  placeholder="New email..."
                  {...register('email', {maxLength: 20})}
                />
              </div>
              <div className="w-full flex flex-col ">
                <label className="text-gray-200 font-medium text-xs xl:text-sm capitalize py-2 ">
                  change Password
                </label>
                <input
                  className="block w-full h-10 px-4 py-3 text-indigo-300 bg-transparent border rounded-lg appearance-none border-gray-800 placeholder-gray-600 focus:border-indigo-300 focus:bg-transparent focus:outline-none focus:ring-indigo-300 sm:text-sm"
                  placeholder="New password..."
                  type="email"
                  {...register('email')}
                />
              </div>
              <div className="mt-5 w-full flex flex-col justify-between gap-4">
                <button
                  id="update"
                  className=" flex items-center justify-center h-10 px-4 py-2 text-sm font-semibold text-white transition-all rounded-lg hover:to-indigo-600 bg-gradient-to-b from-indigo-300 via-indigo-400 to-indigo-500 capitalize"
                  type="submit">submit
                </button>
                <button
                  onClick={() => setIsPopupOpen(true)}
                  id="delete"
                  className="text-gray-400 text-xs px-4 py-2 rounded-[8px] border border-red-900 capitalize"
                  type="button">delete account
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>*/}
      <div className="divide-y divide-white/5">
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2 className="text-base font-semibold leading-7 text-white">Personal Information</h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Use a permanent address where you can receive mail.
            </p>
          </div>

          <form className="md:col-span-2" onSubmit={handleSubmit(onSubmitUpdate)} autoComplete='off'>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div className="col-span-full flex items-center gap-x-8">
                <div
                  className="w-[4.5rem] min-h-[4.5rem] flex justify-center items-center border border-slate-200/40 rounded-[8px] relative cursor-pointer">
                  {
                    profile?.photos?.length > 0
                      ? <img src={profile?.photos}/>
                      :
                      <>
                        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                             className="w-6 h-6">
                          <path
                            d="M10.35 17.713c-2.4 0-4.513-.422-4.34-1.478.46-2.765 1.9-4.377 4.34-4.377 2.438 0 3.877 1.631 4.338 4.377.173 1.056-1.939 1.479-4.339 1.479ZM10.35 11.378A2.189 2.189 0 1 0 10.348 7a2.189 2.189 0 0 0 0 4.378Z"
                            className="group-hover:fill-purple-300 fill-slate-500"></path>
                          <path
                            d="M15.264 11.32a1.632 1.632 0 1 0 0-3.264 1.632 1.632 0 0 0 0 3.264ZM18.51 15.18c-.327-2.055-1.402-3.284-3.246-3.284-.71 0-1.286.173-1.766.518.058.058.115.116.192.173.787.826 1.325 2.016 1.574 3.533 0 .058.02.115.02.154 1.785.019 3.36-.288 3.225-1.095Z"
                            className="group-hover:fill-purple-400 fill-slate-600"></path>
                        </svg>
                        <div className="absolute top-3/4 -right-[10%] bg-[#0C0C0C] p-[3px]">
                          <img src={modifyIcon} alt="" className="w-[20px] h-[20px]"/>
                        </div>
                      </>

                  }
                </div>
                <div>
                  <button
                    type="button"
                    className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                  >
                    Change avatar
                  </button>
                  <p className="mt-2 text-xs leading-5 text-gray-400">JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-white">
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    {...register('profile.firstName', {maxLength: 20})}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-white">
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    {...register('profile.lastName', {maxLength: 20})}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    autoComplete='off'
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    {...register('profile.email', {maxLength: 20})}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex">
              <button
                type="submit"
                className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>

        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2 className="text-base font-semibold leading-7 text-white">Change password</h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Update your password associated with your account.
            </p>
          </div>

          <form className="md:col-span-2">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div className="col-span-full">
                <label htmlFor="current-password" className="block text-sm font-medium leading-6 text-white">
                  Current password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="new-password" className="block text-sm font-medium leading-6 text-white">
                  New password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    autoComplete="new-password"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-white">
                  Confirm password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    autoComplete="new-password"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex">
              <button
                type="submit"
                className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>

        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2 className="text-base font-semibold leading-7 text-white">Delete account</h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              No longer want to use our service? You can delete your account here. This action is not reversible.
              All information related to this account will be deleted permanently.
            </p>
          </div>

          <form className="flex items-start md:col-span-2">
            <button
              type="button"
              className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
              onClick={() => setIsPopupOpen(true)}
            >
              Yes, delete my account
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
