import rihanna from "/assets/imgs/Rihanna_2021.webp";
import instagram from "/assets/svg/instagramLogo.svg";
import youtube from "/assets/svg/youtubeLogo.svg";
import applemusic from "/assets/svg/appleLogo.svg";
import spotify from "/assets/svg/spotifyLogo.svg";
import tiktok from "/assets/svg/tiktokLogo.svg";
import timaty from "/assets/imgs/timaty.webp";
import egorcrid from "/assets/imgs/egorcrid.webp";


export type artistsDataType = {
  title: string,
  photo: string,
  description: string,
  socialMedia: {
    name: string,
    logo: string,
    link:string
  }[],
  id: string,
  country: string
}[]
export const artistsData = [
  {
    title: 'Rihanna',
    photo: rihanna,
    description: 'artist',
    socialMedia: [
      {
        name: 'instagram',
        logo: instagram,
        link:''
      },
      {
        name: 'youtube',
        logo: youtube,
        link:''
      },
      {
        name: 'applemusic',
        logo: applemusic,
        link:''
      },
      {
        name: 'spotify',
        logo: spotify,
        link:''
      },
      {
        name: 'tiktok',
        logo: tiktok,
        link:''
      },
    ],
    id: '123',
    country: 'USA'
  },
  {
    title: 'Timaty',
    photo: timaty,
    description: 'artist',
    socialMedia: [
      {
        name: 'instagram',
        logo: instagram,
        link:''
      },
      {
        name: 'youtube',
        logo: youtube,
        link:''
      },
      {
        name: 'applemusic',
        logo: applemusic,
        link:''
      },
      {
        name: 'spotify',
        logo: spotify,
        link:''
      },
      {
        name: 'tiktok',
        logo: tiktok,
        link:''
      },
    ],
    id: '456',
    country: 'Russia'
  },
  {
    title: 'Egor Crid',
    photo: egorcrid,
    description: 'artist',
    socialMedia: [
      {
        name: 'instagram',
        logo: instagram,
        link:''
      },
      {
        name: 'youtube',
        logo: youtube,
        link:''
      },
      {
        name: 'applemusic',
        logo: applemusic,
        link:''
      },
      {
        name: 'spotify',
        logo: spotify,
        link:''
      },
      {
        name: 'tiktok',
        logo: tiktok,
        link:''
      },
    ],
    id: '789',
    country: 'Russia'
  },
]
