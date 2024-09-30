import React, {ChangeEvent, FC, forwardRef, ReactNode, useRef} from 'react';
import modifyIcon from '/assets/svg/modify_icon.svg';

interface SharedFileInputProps {
  currentImage: string | null;
  onImageChange?: (image: string | null) => void;
  onUploadImage?: () => void;
  onRemoveImage?: () => void;
  labelText?: string;
  labelClass?: string;

  className?: string;
  iconClass?: string;

  isInverted?: boolean;

  withOverlay?: boolean;
  withAdaptive?: boolean;

  myActions?: ReactNode;
  accept?: string;
  uploadButton?: 'submit' | 'default';

  iconIsPlus?: boolean;
  ref?: React.ForwardedRef<HTMLInputElement>;
}


// !FIX сделать обертку div. т.к в label нельзя вставлять buttin. и при нажатии на actions (когда картинка залита и поверх нее кнопки) то это тоже эвент клика на label и залитие картинки
export const SharedFileInput: FC<SharedFileInputProps> = forwardRef(({
                                                                       currentImage,
                                                                       onImageChange,
                                                                       onUploadImage,
                                                                       onRemoveImage,
                                                                       labelText = 'Загрузите изображение',
                                                                       isInverted = false,
                                                                       withOverlay = false,
                                                                       withAdaptive = false,
                                                                       iconIsPlus = false,
                                                                       className = '',
                                                                       labelClass = '',
                                                                       iconClass = '',
                                                                       accept = 'image/*',
                                                                       myActions,
                                                                       uploadButton = 'default',
                                                                       ...props
                                                                     }, forwardedRef: React.ForwardedRef<HTMLInputElement>) => {
  const {onChange} = props as any;

  const refInput = useRef<HTMLInputElement>(null);
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if(onImageChange) {
      const file = event.target.files?.[0];
      if(file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          onImageChange(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleUploadImage = () => {
    refInput.current?.click();
  };

  const handleRemoveImage = () => {
    if(onRemoveImage) {
      onRemoveImage();
    }
  };

  // @ts-ignore
  return (
    <>
      <label key={currentImage} className="">
        {/* Input for selecting a new image */}
        <input
          className="hidden"
          type="file"
          accept={accept}
          {...props}
          onChange={(e) => {
            handleImageChange(e);
            if(typeof onChange === 'function') {
              onChange(e);
            }
          }}
          ref={(_ref) => {
            if(typeof forwardedRef === 'function') {
              forwardedRef(_ref);
            }
            refInput.current = _ref;
          }}
        />
        <div
          className="w-[4.5rem] min-h-[4.5rem] flex justify-center items-center border border-slate-200/40 rounded-[8px] relative cursor-pointer">
          {
            <>
              {!currentImage ? (
                <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                     className="w-6 h-6">
                  <path
                    d="M10.35 17.713c-2.4 0-4.513-.422-4.34-1.478.46-2.765 1.9-4.377 4.34-4.377 2.438 0 3.877 1.631 4.338 4.377.173 1.056-1.939 1.479-4.339 1.479ZM10.35 11.378A2.189 2.189 0 1 0 10.348 7a2.189 2.189 0 0 0 0 4.378Z"
                    className="group-hover:fill-purple-300 fill-slate-500"></path>
                  <path
                    d="M15.264 11.32a1.632 1.632 0 1 0 0-3.264 1.632 1.632 0 0 0 0 3.264ZM18.51 15.18c-.327-2.055-1.402-3.284-3.246-3.284-.71 0-1.286.173-1.766.518.058.058.115.116.192.173.787.826 1.325 2.016 1.574 3.533 0 .058.02.115.02.154 1.785.019 3.36-.288 3.225-1.095Z"
                    className="group-hover:fill-purple-400 fill-slate-600"></path>
                </svg>
              ) : (
                <img src={currentImage || modifyIcon} alt=""
                     className="w-[4.5rem] min-h-[4.5rem] border border-slate-200/40 rounded-[8px]"/>
              )}
            </>
          }
        </div>
      </label>
    </>
  );
});
