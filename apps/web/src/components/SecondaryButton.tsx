import type React from 'react';
import {forwardRef, useCallback} from 'react';
import {useLocation} from 'wouter';

type PrimaryButtonProps = {
  title: string;
  className?: string;
  style?: React.CSSProperties;
  to?: string;
  onClick?: () => void,
  type?: 'button' | 'submit'
  children?: any
}
const SecondaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(({
                                                                             title,
                                                                             className,
                                                                             style,
                                                                             to,
                                                                             onClick,
                                                                             type,
                                                                             children
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
      className={`${className} hover:scale-105 transition-all duration-300 px-6 py-3 rounded-xl border border-solid border-medium_grey text-caption_m_desk text-light_grey`}
      ref={ref}
      style={style}
      onClick={onClick || onNavigate}
      type={type}
    >
      <span className='truncate'> {title}</span>
      {children}
    </button>
  );
});
export default SecondaryButton;
