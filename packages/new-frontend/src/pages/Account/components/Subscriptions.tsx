import PrimaryButton from "../../../components/PrimaryButton.js";
import SecondaryButton from "../../../components/SecondaryButton.js";

export const Subscriptions = () => {
  const subscriptions = [
    {
      photo: '',
      name: 'Dua Lipa',
      paymentType: 'stripe',
      recurring: 'monthly',
      status: 'Активен',
      period: '12 month',
      sum: '1190 ₽',
      nextPayment: '22.12.2024',
      endDate: '22.12.2025'
    },
    {
      photo: '',
      name: 'Dua Lipa',
      paymentType: 'stripe',
      recurring: 'monthly',
      status: 'Активен',
      period: '12 month',
      sum: '1190 ₽',
      nextPayment: '22.12.2024',
      endDate: '22.12.2025'
    },
    {
      photo: '',
      name: 'Dua Lipa',
      paymentType: 'stripe',
      recurring: 'monthly',
      status: 'архив',
      period: '12 month',
      sum: '1190 ₽',
      nextPayment: '22.12.2024',
      endDate: '22.12.2025'
    }
  ]
  const subscriptionTitles = [
    {
      title: 'Название',
    },
    {
      title: 'Статус',
    },
    {
      title: 'Длительность',
    },
    {
      title: 'Сумма в месяц',
    },
    {
      title: 'Следующее списание',
    },
    {
      title: 'Дата окончания',
    },

  ]
  return (
    <div className='py-6 flex flex-col gap-6'>
      <div className=' bg-[#272727]/50 rounded-t-[20px] border-b border-b-secondary_dark_gray'>
        <table className="w-full ">
          <thead className="">
          <tr>
            {
              subscriptionTitles.map((title, index) => (
                <th className="py-5 px-4 text-start  text-btnText" key={index}>
                  {title.title}
                </th>
              ))
            }
          </tr>
          </thead>
          <tbody className="divide-y divide-secondary_dark_gray bg-[#0C0C0C]">
          {
            subscriptions.map((item, indexItem) => (
              <tr className="" key={indexItem}>
                <td className="p-4 text-start flex items-center gap-2.5 min-w-[20rem] text-t2Regular">
                  <img src={item.photo} className='w-11 h-11 rounded-full bg-medium_grey'/>
                  <p>{item.name}</p>
                </td>
                <td className={`p-4 text-caption_r_desk capitalize ${item.status === 'архив' ? 'text-medium_grey' : ''}`}>{item.status}</td>
                <td className={`p-4 text-caption_r_desk ${item.status === 'архив' ? 'text-medium_grey' : ''}`}>{item.period}</td>
                <td className={`p-4 text-caption_r_desk ${item.status === 'архив' ? 'text-medium_grey' : ''}`}>{item.sum}</td>
                <td className={`p-4 text-caption_r_desk ${item.status === 'архив' ? 'text-medium_grey' : ''}`}>{item.nextPayment}</td>
                <td className={`p-4 text-caption_r_desk ${item.status === 'архив' ? 'text-medium_grey' : ''}`}>{item.endDate}</td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
      <SecondaryButton title='Добавить подписку на артиста' className='w-fit bg-primary_blue border-none text-white'/>
    </div>
  )
}
