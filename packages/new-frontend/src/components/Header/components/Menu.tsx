import {Popover, Transition} from '@headlessui/react';
import React, {Fragment, memo, useEffect, useRef} from 'react';
import type {NavbarTypes} from '../../../data/consts/navbar.js';
import {navbar} from '../../../data/consts/navbar.js';
import {Link} from 'wouter';

type MenuProps = {
  title: string
  items?: NavbarTypes[number]['content']
}

type MenuItemsProps = {
  title: MenuProps['title']
  items: NavbarTypes[number]['content']
}

type MenuItemsWrapperProps = {
  children: React.ReactNode
}

const MenuItemsWrapper = memo<MenuItemsWrapperProps>(({children}) => {
  return (
    <div className="w-fit">
      <div
        className="mt-2 rounded-3xl bg-gradient-to-b from-indigo-500 via-indigo-500/ ring-1 ring-inset ring-white/5 focus:outline-none p-[0.060rem]">
        <div
          className="w-fit max-w-3xl bg-gray-900 rounded-3xl flex-auto overflow-hidden text-sm leading-6 shadow-lg">
          {children}
        </div>
      </div>
    </div>
  );
});

const MenuItems = memo<MenuItemsProps>(({title, items}) => {
  switch (title) {
    case navbar[1].title: {
      return (
        <MenuItemsWrapper>
          {
            items.map((item, index) => (
              <div className="p-4" key={index}>
                <h1 className="text-gray-400/50 uppercase ml-4">{item.deviceOption}</h1>
                {item.options.map((option, index) => (
                  <div
                    className="group relative flex gap-x-6 rounded-lg px-4 py-2 duration-300"
                    key={index}>
                    <div
                      className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 group-hover:bg-indigo-500 duration-300 text-white ring-1 ring-gray-800">
                      <img src={option.logo} alt="" className="w-[16px] h-[16px]"/>
                    </div>
                    <div className="flex items-center">
                      <Link to={option.link} className="font-normal text-white">
                        {option.name}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ))
          }
        </MenuItemsWrapper>
      );
    }
    case navbar[2].title: {
      return (
        <MenuItemsWrapper>
          {
            items.map((item, index) => (
              <div key={index}>
                <h1 className="text-gray-400/50 uppercase p-4 ml-4 pb-0">{item.deviceOption}</h1>
                <div className="p-4 grid laptop:grid-cols-3 desktop:grid-cols-4 gap-2" key={index}>
                  {
                    item.options.map((option, index) => (
                      <div className="group relative flex items-center gap-x-6 rounded-lg p-4"
                           key={index}>
                        <div
                          className="mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-gray-900 group-hover:bg-indigo-500 duration-300 text-white ring-1 ring-gray-800 ">
                          <img src={option.logo} alt="" className="w-[16px] h-[16px]"/>
                        </div>

                        <div><Link to={option.link}
                                   className="font-semibold text-white capitalize ">
                          {option.name}
                        </Link></div>
                      </div>
                    ))
                  }
                </div>
              </div>
            ))
          }
        </MenuItemsWrapper>
      );
    }
    case navbar[3].title: {
      return (
        <MenuItemsWrapper>
          {
            items.map((item, index) => (
              <div key={index}>
                <h1 className="text-gray-400/50 uppercase p-4 ml-4 pb-0">{item.deviceOption}</h1>
                <div className="p-4 grid grid-cols-2 gap-2" key={index}>
                  {item.options.map((option, index) => (
                    <div
                      className="group relative flex gap-x-6 rounded-lg px-4 py-2 duration-300"
                      key={index}>
                      <div className="flex items-center">
                        <Link to={option.link} className="font-normal text-white capitalize">
                          {option.name}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          }
        </MenuItemsWrapper>
      );
    }
    default: {
      return null;
    }
  }
});

export const Menu = memo<MenuProps>(({title, items}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timeoutIdRef = useRef<number>();
  const timeoutDuration = 200;

  const closePopover = () => {
    return buttonRef.current?.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true
      })
    );
  };

  const onMouseEnter = (open: boolean) => {
    clearTimeout(timeoutIdRef.current);
    if (open) return;
    return buttonRef.current?.click();
  };

  const onMouseLeave = (open: boolean) => {
    if (!open) return;
    timeoutIdRef.current = setTimeout(() => closePopover(), timeoutDuration) as unknown as number;
  };

  useEffect(() => {
    return () => {
      // clearTimeout(timeoutIdRef.current)
    };
  }, []);

  if (!items?.length) {
    return (
      <div className="flex flex-row items-center cursor-pointer">
        <p className="text-[14px] font-normal leading-6 text-white px-3 py-2">
          {title}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center relative ">
      <div className="opacity-0 pointer-events-none z-0 px-3 py-2 h-full flex flex-row items-center gap-2">
        <p className="text-[14px] font-normal leading-6 text-white ">
          {title}
        </p>
        <svg xmlns="http://www.w3.org/2000/svg"
             className="inline h-4 transition-transform duration-200 transform icon icon-tabler icon-tabler-chevron-down hover:rotate-180 rotate-0"
             viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
             fill="none"
             color="white">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M6 9l6 6l6 -6"></path>
        </svg>
      </div>
      <div className="fixed flex items-center z-10">
        <Popover className="flex items-center relative">
          {({open}) => (
            <div className="relative"
                 onMouseLeave={onMouseLeave.bind(null, open)}
            >
              <Popover.Button
                ref={buttonRef}
                className="group px-3 py-2 h-full bg-transparent flex flex-row items-center gap-2 outline-none"
                onMouseEnter={onMouseEnter.bind(null, open)}
                onMouseLeave={onMouseLeave.bind(null, open)}
              >
                <p className="text-[14px] font-normal leading-6 text-white">
                  {title}
                </p>
                <svg xmlns="http://www.w3.org/2000/svg"
                     className={`inline h-4 transition-transform duration-200 transform icon icon-tabler icon-tabler-chevron-down hover:rotate-180 ${open ? 'rotate-180' : 'rotate-0'}`}
                     viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                     fill="none"
                     color="white">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M6 9l6 6l6 -6"></path>
                </svg>
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel
                  className="absolute z-10 w-screen max-w-sm px-4 mt-0 transform sm:px-0 lg:max-w-3xl ">
                  <div
                    className="overflow-hidden "
                    onMouseEnter={onMouseEnter.bind(null, open)}
                    onMouseLeave={onMouseLeave.bind(null, open)}
                  >
                    <MenuItems title={title} items={items}/>
                  </div>
                </Popover.Panel>
              </Transition>
            </div>
          )}
        </Popover>
      </div>
    </div>

  );
});
