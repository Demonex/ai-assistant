import {Popover, Transition} from '@headlessui/react';
import React, {Fragment, memo, ReactElement, useEffect, useRef} from 'react';
import type {NavbarTypes} from '../../../data/consts/navbar.js';
import {navbar} from '../../../data/consts/navbar.js';
import {Link} from 'wouter';
import {useSizes} from '../../../hooks/useSizes.js';

type MenuProps = {
    title: string
    items?: NavbarTypes[number]['content']
    icon?: ReactElement | string
    link?: string
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
        <div className="w-fit pt-[1.5rem]">
            <div
                className=" bg-[#272727] overflow-hidden px-8 py-6 min-w-[35.25rem]">
                {children}
            </div>
        </div>
    );
});

const MenuItems = memo<MenuItemsProps>(({title, items}) => {
    const scrollToTop = () => {
        document.getElementById('app').scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    };
    switch (title) {
        case navbar[0].title: {
            return (
                <MenuItemsWrapper>
                    {
                        items.map((item, index) => (
                            <div className=" grid grid-cols-2 gap-x-5" key={index}>
                                {item.options.map((option, index) => (
                                    <div
                                        className="group relative flex py-3 items-center gap-2.5 duration-300"
                                        key={index}>
                                        <div
                                            className="">
                                            <img src={option.logo} alt="" className="w-5 h-5"/>
                                        </div>
                                        <div className="flex items-center">
                                            <Link to={option.link} className="text-t2Regular" onClick={() => {
                                                scrollToTop()
                                            }}>
                                                {option.name}
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))
                    }
                    <p className="text-captionText text-medium_grey text-xs max-w-[31.25rem] mt-2">*компания Meta
                        Platforms Inc.,
                        владеющая Facebook и
                        Instagram, внесена в реестр экстремистских организаций, ее деятельность в России по поддержанию
                        указанных соцсетей признана экстремистской деятельностью</p>
                </MenuItemsWrapper>
            );
        }
        case navbar[1].title: {
            return (
                <MenuItemsWrapper>
                    {
                        items.map((item, index) => (
                            <div className=" grid grid-cols-2 gap-x-5" key={index}>
                                {item.options.map((option, index) => (
                                    <div
                                        className="group relative flex py-3 items-center gap-2.5 duration-300"
                                        key={index}>

                                        <div className="flex items-center">
                                            <Link to={option.link} className="text-t2Regular">
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

        default: {
            return null;
        }
    }
});

export const Menu = memo<MenuProps>(({title, items, icon, link}) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const timeoutIdRef = useRef<number>();
    const timeoutDuration = 200;
    const {elementRange} = useSizes();
    const secundaryText = elementRange(16, 18);

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
            <a className="flex flex-row items-center cursor-pointer" href={link}>
                <p style={{fontSize: `${secundaryText}px`, lineHeight: '27px'}}
                   className={`font-medium capitalize  whitespace-nowrap hover:text-medium_grey`}>
                    {title}
                </p>
            </a>
        );
    }
    return (
        <>
            <Popover className="flex items-center relative">
                {({open}) => (
                    <div className="relative"
                         onMouseLeave={onMouseLeave.bind(null, open)}
                    >
                        <Popover.Button
                            ref={buttonRef}
                            className="group flex items-center justify-center gap-2.5 cursor-pointer "
                            onMouseEnter={onMouseEnter.bind(null, open)}
                            onMouseLeave={onMouseLeave.bind(null, open)}
                        >
                            <div style={{
                                height: `20px`,
                                minWidth: `20px`
                            }}
                            >
                                {icon}
                            </div>
                            <p style={{fontSize: `${secundaryText}px`, lineHeight: '27px'}}
                               className={`font-medium capitalize  whitespace-nowrap group-hover:text-medium_grey`}>
                                {title}
                            </p>
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
                                    <MenuItems title={title} items={items} />
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </div>
                )}
            </Popover>

        </>
    );
});
