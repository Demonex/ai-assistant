import AppleLogo from "/assets/svg/appleLogo.svg";
import AndroidLogo from "/assets/svg/androidLogo.svg";
import WindowsLogo from "/assets/svg/windowsLogo.svg";
import tracklist from "/assets/svg/1001tracklist.svg";
import amazone from "/assets/svg/amazonLogo.svg";
import bandsintown from "/assets/svg/bandsintownLogo.svg";
import beatport from "/assets/svg/beatportLogo.svg";
import deezer from "/assets/svg/deezerLogo.svg";
import facebook from "/assets/svg/facebookLogo.svg";
import instagram from "/assets/svg/instagramLogo.svg";
import itunes from "/assets/svg/itunesLogo.svg";
import shasam from "/assets/svg/shasamLogo.svg";
import songkick from "/assets/svg/songkickLogo.svg";
import LinuxLogo from "/assets/svg/linuxLogo.svg";
import songshare from "/assets/svg/songshareLogo.svg";
import soundcloud from "/assets/svg/soundcloudLogo.svg";
import spotify from "/assets/svg/spotifyLogo.svg";
import tidal from "/assets/svg/tidalLogo.svg";
import tiktok from "/assets/svg/tiktokLogo.svg";
import traxsourse from "/assets/svg/tracklistLogo.svg";
import twitter from "/assets/svg/twitterLogo.svg";
import youtube from "/assets/svg/youtubeLogo.svg";

export type NavbarTypes = {
    title: string;
    dropdown: boolean;
    content: {
        deviceOption: string;
        options: {
            name: string;
            logo: string;
            link: string
        }[]
    }[]
}[]
export const navbar: NavbarTypes = [
    {
        title: 'Prising',
        dropdown: false,
        content: []
    },
    {
        title: 'Download',
        dropdown: true,
        content: [
            {
                deviceOption: 'mobile apps',
                options: [
                    {
                        name: 'Android',
                        logo: AndroidLogo,
                        link: '/'
                    },
                    {
                        name: 'iOs',
                        logo: AppleLogo,
                        link: '/'
                    }
                ]
            },
            {
                deviceOption: 'desktop apps',
                options: [
                    {
                        name: 'MacOS',
                        logo: AppleLogo,
                        link: '/'
                    },
                    {
                        name: 'Windows',
                        logo: WindowsLogo,
                        link: '/'
                    },
                    {
                        name: 'Linux',
                        logo: LinuxLogo,
                        link: '/'
                    }
                ]
            }
        ]
    },
    {
        title: 'Platforms',
        dropdown: true,
        content: [
            {
                deviceOption: 'platforms',
                options: [
                    {
                        name: 'spotify',
                        logo: spotify,
                        link: '/'
                    },
                    {
                        name: 'amazon',
                        logo: amazone,
                        link: '/'
                    },
                    {
                        name: 'instagram',
                        logo: instagram,
                        link: '/'
                    },
                    {
                        name: 'YouTube',
                        logo: youtube,
                        link: '/'
                    },
                    {
                        name: '1001Tracklists',
                        logo: tracklist,
                        link: '/'
                    },
                    {
                        name: 'TraxSource',
                        logo: traxsourse,
                        link: '/'
                    },
                    {
                        name: 'Tidal',
                        logo: tidal,
                        link: '/'
                    },
                    {
                        name: 'facebook',
                        logo: facebook,
                        link: '/'
                    },
                    {
                        name: 'bandsintown',
                        logo: bandsintown,
                        link: '/'
                    },
                    {
                        name: 'songshare',
                        logo: songshare,
                        link: '/'
                    },
                    {
                        name: 'applemusic',
                        logo: AppleLogo,
                        link: '/'
                    },
                    {
                        name: 'deezer',
                        logo: deezer,
                        link: '/'
                    },
                    {
                        name: 'tik tok',
                        logo: tiktok,
                        link: '/'
                    },
                    {
                        name: 'Shazam',
                        logo: shasam,
                        link: '/'
                    },
                    {
                        name: 'beatport',
                        logo: beatport,
                        link: '/'
                    },
                    {
                        name: 'iTunes',
                        logo: itunes,
                        link: '/'
                    },
                    {
                        name: 'SoundCloud',
                        logo: soundcloud,
                        link: '/'
                    },
                    {
                        name: 'X',
                        logo: twitter,
                        link: '/'
                    },
                    {
                        name: 'Songkick',
                        logo: songkick,
                        link: '/'
                    }
                ]
            },

        ]
    },
    {
        title: 'Use Cases',
        dropdown: true,
        content: [
            {
                deviceOption: 'Use Cases',
                options: [
                    {
                        name: 'artists',
                        logo: '',
                        link: '/'
                    },
                    {
                        name: 'distributors',
                        logo: '',
                        link: '/'
                    },
                    {
                        name: 'managers',
                        logo: '',
                        link: '/'
                    },
                    {
                        name: 'A&Rs',
                        logo: '',
                        link: '/'
                    },
                    {
                        name: 'Booking Agents',
                        logo: '',
                        link: '/'
                    },
                    {
                        name: 'Record Labels',
                        logo: '',
                        link: '/'
                    },
                    {
                        name: 'Promoters',
                        logo: '',
                        link: '/'
                    },
                    {
                        name: 'Press Agents',
                        logo: '',
                        link: '/'
                    },
                    {
                        name: 'Developers',
                        logo: '',
                        link: '/'
                    },
                ]
            },
        ]
    }
]
export const footer: NavbarTypes = [
    navbar[2],
    navbar[3],
    {
        title: 'Resources',
        dropdown: false,
        content: [
            {
                deviceOption: 'Resources',
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
