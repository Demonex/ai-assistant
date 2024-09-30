import {memo} from "react";
import Telegram from "../../WelcomePage/components/Telegram.js";
import Tariffes from "../../WelcomePage/components/Tariffes.js";

const Requisite = memo(() => {
    return (
        <>
            <div className='flex flex-col gap-10 px-auto max-w-[1110px] '>
                <div className='flex flex-col gap-6'>
                    <h1 className='text-h2Mobile md:text-h2Medium lg:text-h2Desctop '>Реквизиты</h1>
                </div>
                <div>
                    <h2 className='text-t1Semi_mob lg:text-t1Semi_deck'>
                        Общество с ограниченной ответственностью «БЫСТРЫЕ РЕШЕНИЯ»
                    </h2>
                    <p className='text-t2Regular mt-4 text-light_grey'>
                        ИНН: 7736677193
                        <br/>
                        КПП: 503201001
                        <br/>
                        ОГРН: 1147746714323
                        <br/>
                        Расчетный счет: 40702810910000067278
                        <br/>
                        Банк: АО "ТБанк"
                        <br/>
                        БИК: 044525974
                        <br/>
                        Корр. счет: 30101810145250000974
                        <br/>
                        Юридический адрес: 143072, Московская область, г.о. Одинцовский, п. ВНИИССОК,<br/> ул.
                        Рябиновая, д. 5,
                        помещ. 2
                        <br/>
                        Телефон: +7(962)999-82-64
                        <br/>
                        Генеральный директор: Пасько Светлана Викторовна
                    </p>
                </div>

            </div>
            <Telegram/>
            <Tariffes/>

        </>

    )
})
export default Requisite