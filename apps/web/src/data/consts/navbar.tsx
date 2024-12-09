import AppleLogo from "/assets/svg/apple_logo.svg";
import tracklist from "/assets/svg/1001track_logo.svg";
import amazone from "/assets/svg/amazon_logo.svg";
import beatport from "/assets/svg/beetport_logo.svg";
import deezer from "/assets/svg/deezer_logo.svg";
import instagram from "/assets/svg/instagram_logo.png";
import itunes from "/assets/svg/itunce_logo.svg";
import shasam from "/assets/svg/shazam_logo.svg";
import soundcloud from "/assets/svg/souncloud_logo.svg";
import spotify from "/assets/svg/spotify_logo.svg";
import tidal from "/assets/svg/tidal_logo.svg";
import tiktok from "/assets/svg/tiktok_logo.svg";
import traxsourse from "/assets/svg/traxsourse_logo.svg";
import youtube from "/assets/svg/youtube_logo.svg";
import CasesNew from "../../assets/CasesNew.js";
import React from "react";
import PlatformsNew from "../../assets/PlatformsNew.js";
import TariffesNew from "../../assets/TariffesNew.js";
import MediaNew from "../../assets/MediaNew.js";

export type NavbarTypes = {
    icon: React.ReactElement | string;
    title: string;
    dropdown: boolean;
    link?: string;
    content: {
        options: {
            name: string;
            logo: string;
            link: string
            slug?: string;
            color?:string
        }[]
    }[]
}[]
export const navbar: NavbarTypes = [
    {
        icon: <PlatformsNew width="100%" height="100%" className="group-hover:fill-medium_grey"/>,
        title: 'Платформы',
        dropdown: true,
        content: [
            {
                options: [
                    {
                        name: 'Spotify',
                        logo: spotify,
                        link: '/platform/spotify',
                        slug:'spotify',
                        color: '#1ED760'

                    },
                    {
                        name: 'Apple Music',
                        logo: AppleLogo,
                        link: '/platform/applemusic',
                        slug:'apple_music',
                        color: ''

                    },
                    {
                        name: 'Shazam',
                        logo: shasam,
                        link: '/platform/shazam',
                        slug:'shazam',
                        color: '#2255FF'

                    },
                    {
                        name: 'Soundcloud',
                        logo: soundcloud,
                        link: '/platform/soundcloud',
                        slug:'soundcloud',
                        color: '#FF5500'

                    },
                    {
                        name: 'Youtube',
                        logo: youtube,
                        link: '/platform/youtube',
                        slug:'youtube',
                        color: '#FF0000'

                    },
                    {
                        name: 'Deezer',
                        logo: deezer,
                        link: '/platform/deezer',
                        slug:'deezer',
                        color: '#A238FF'

                    },
                    {
                        name: 'Beatport',
                        logo: beatport,
                        link: '/platform/beatport',
                        slug:'beatport',
                        color: '#01FF95'

                    },
                    {
                        name: 'Amazon Music',
                        logo: amazone,
                        link: '/platform/amazon',
                        slug:'amazon',
                        color: '#FF9900'
                    },
                    {
                        name: '1001Tracklists',
                        logo: tracklist,
                        link: '/platform/1001tracklists',
                        slug:'tracklist',
                        color: '#ffffff'
                    },
                    {
                        name: 'Traxsource',
                        logo: traxsourse,
                        link: '/platform/traxsource',
                        slug:'traxsourse',
                        color: '#ffffff'
                    },
                    {
                        name: 'iTunes',
                        logo: itunes,
                        link: '/platform/itunes',
                        slug:'itunes',
                        color: '#ffffff'
                    },
                    {
                        name: 'Tidal',
                        logo: tidal,
                        link: '/platform/tidal',
                        slug:'tidal',
                        color: '#ffffff'
                    },
                    {
                        name: 'Instagram *',
                        logo: instagram,
                        link: '/platform/instagram',
                        slug:'instagram',
                        color: '#E62A58'
                    },
                    {
                        name: 'TikTok',
                        logo: tiktok,
                        link: '/platform/tiktok',
                        slug:'tiktok',
                        color: '#67C4CE'
                    },

                ]
            },
        ]
    },
    {
        icon: <CasesNew width="100%" height="100%" className="group-hover:fill-medium_grey"/>,
        title: 'Для кого',
        dropdown: true,
        content: [
            {
                options: [
                    {
                        name: 'Лейблы',
                        logo: '',
                        link: '/customer/labels'
                    },
                    {
                        name: 'Менеджеры',
                        logo: '',
                        link: '/customer/managers'
                    },
                    {
                        name: 'Дистрибьюторы',
                        logo: '',
                        link: '/customer/distributors'
                    },
                    {
                        name: 'Промоутеры',
                        logo: '',
                        link: '/'
                    },
                    {
                        name: 'Пресс-агенты',
                        logo: '',
                        link: '/'
                    },
                    {
                        name: 'Фанаты',
                        logo: '',
                        link: '/customer/fans'
                    }
                ]
            },
        ]
    },
    {
        icon: <TariffesNew width="100%" height="100%" className="group-hover:fill-medium_grey"/>,
        title: 'Тарифы',
        dropdown: false,
        link: '/#tariffes',
        content: []
    },
    {
        icon: <MediaNew width="100%" height="100%" className="group-hover:fill-medium_grey"/>,
        title: 'Медиа',
        dropdown: true,
        link: '/media',
        content: []
    }
]
export const footer: NavbarTypes = [
    navbar[2],
    navbar[3],
    {
        icon:'',
        title: 'Resources',
        dropdown: false,
        content: [
            {
                options: [
                    {
                        name: 'The Songstats Lab',
                        logo: '',
                        link: '/'
                    },
                    {
                        name: 'The Songstats API',
                        logo: '',
                        link: '/'
                    },
                    {
                        name: 'Pricing',
                        logo: '',
                        link: '/'
                    },
                    {
                        name: 'Uptime Status',
                        logo: '',
                        link: '/'
                    },
                    {
                        name: 'Contact Us',
                        logo: '',
                        link: '/'
                    },
                ]
            },
        ]
    }
]
