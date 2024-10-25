export const ProfessionalPlan = () => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center p-8'>
      <h2 className='text-gray-200 font-medium text-lg xl:text-xl capitalize text-center'>You don't have a Professional subscription.
        Subscribe to start managing up to 15 profiles!</h2>
      <p className='text-gray-400 font-light text-xs xl:text-sm py-4'>Manage all your profiles in an easy dashboard!</p>
      <button
        className=" flex items-center justify-center h-10 px-4 py-2 text-sm font-semibold text-white transition-all rounded-lg hover:to-indigo-600 bg-gradient-to-b from-indigo-300 via-indigo-400 to-indigo-500 capitalize">Subscribe
      </button>
    </div>
  )
}
