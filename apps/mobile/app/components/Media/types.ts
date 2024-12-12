import type { ElementType, Ref } from 'react'
import {MediaType} from '../RichText/Upload';


export interface Props {
  src?: any | string // for static media
  alt?: string
  resource?: MediaType // for Payload media
  sizes?: string // for NextImage only
  priority?: boolean // for NextImage only
  fill?: boolean // for NextImage only
  className?: string
  imgClassName?: string
  videoClassName?: string
  htmlElement?: ElementType | null
  onClick?: () => void
  onLoad?: () => void
  ref?: Ref<null | HTMLImageElement | HTMLVideoElement>
  width?: number
  height?: number
}
export default {}