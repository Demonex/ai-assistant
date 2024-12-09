import type React from 'react';
import {forwardRef, useCallback} from 'react';
import {useLocation} from 'wouter';

type PrimaryButtonProps = {
    title: string;
    icon?: any;
    className?: string;
    isIcon: boolean
    style?: React.CSSProperties;
    titleClassName?: string;
    iconClassName?: string;
    titleStyle?: React.CSSProperties;
    to?: string;
    onClick?: () => void
}
const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(({
                                                                             icon,
                                                                             title,
                                                                             className,
                                                                             isIcon,
                                                                             style,
                                                                             titleStyle,
                                                                             titleClassName,
                                                                             iconClassName,
                                                                             to,
                                                                             onClick
                                                                         }, ref) => {
    const [, navigate] = useLocation();

    const onNavigate = useCallback(() => {
        if (!to) {
            return;
        }
        navigate(to);
    }, [to]);

    return (
        <button
            className={`${className} hover:scale-105 transition-all duration-300 `}
            ref={ref}
            style={style}
            onClick={onClick || onNavigate}
        >
            {
                isIcon
                    ? <img src={icon} alt="" className={iconClassName}/>
                    : null
            }
            <p className={`${titleClassName} `} style={titleStyle}>{title}</p>
        </button>
    );
});
export default PrimaryButton;
