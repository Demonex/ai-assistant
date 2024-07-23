export const Subscriptions = () => {
  const subscription = [
    {
      photo: '',
      name: '',
      subscriptionDate: '10.11.1992',
      paymentType: 'stripe',
      recurring: 'monthly',
      status: 'active',
    }
  ]
  const subscriptionTitles = [
    {
      title: 'SUBSCRIPTION',
    },
    {
      title: 'START DATE',
    },
    {
      title: 'PAYMENT',
    },
    {
      title: 'RECURRING',
    },
    {
      title: 'STATUS',
    },
    {
      title: 'ACTION',
    },

  ]
  return (
    <div className=' flex flex-col gap-[1rem]'>
      <div className='pb-[4rem] lg:p-[2rem]'>
        <div className='flex flex-col gap-3'>
          <h1 className='text-gray-200 font-medium text-lg xl:text-xl capitalize text-center'>your Subscriptions</h1>
          <p className='text-gray-300 font-light text-md xl:text-[1rem] capitalize py-4 text-center'>Manage your
            subscriptions, see invoices, and update billing information.</p>
          <div className='flex w-full justify-between px-4'>
            {
              subscriptionTitles.map((title, index) => (
                <h1 key={index} className='text-gray-400 font-light text-xs xl:text-sm py-4 basis-1 whitespace-nowrap'>{title.title}</h1>
              ))
            }
          </div>

          {
            subscription.map((item, index) => (
              <div className='w-full px-4 py-2 border border-slate-600/50 rounded-[8px] bg-slate-500/5' key={index}>
                <div className='w-full flex justify-between gap-10 items-center'>
                  {
                    subscription.map((item, index) => (
                      <div key={index} className='flex w-full justify-between items-center'>
                        <div className='flex gap-2 items-center'>
                          <img src={item.photo} className='w-6 h-6'/>
                          <p
                            className='text-gray-200 font-medium text-xs xl:text-sm uppercase py-4 px-4'>{item.name}</p>
                        </div>
                        <p
                          className='capitalize text-[12px] lg:text-[16px] leading-6 font-light text-indigo-300/50 hover:text-indigo-200/80 whitespace-nowrap '
                        >{item.subscriptionDate}
                        </p>
                        <p
                          className='capitalize text-[12px] lg:text-[16px] leading-6 font-light text-indigo-300/50 hover:text-indigo-200/80 whitespace-nowrap '
                        >{item.paymentType}
                        </p>
                        <p
                          className='capitalize text-[12px] lg:text-[16px] leading-6 font-light text-indigo-300/50 hover:text-indigo-200/80 whitespace-nowrap '
                        >{item.recurring}
                        </p>
                        <p
                          className='capitalize text-[12px] lg:text-[16px] leading-6 font-light text-indigo-300/50 hover:text-indigo-200/80 whitespace-nowrap '
                        >{item.status}
                        </p>
                      </div>
                    ))
                  }
                  <div className='flex gap-3 basis-1/6 justify-end'>
                    <div className='w-5 h-5 bg-slate-500'></div>
                    <div className='w-5 h-5 bg-slate-500'></div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
