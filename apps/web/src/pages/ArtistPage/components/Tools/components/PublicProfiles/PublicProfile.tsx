import React, {memo, useState} from "react";
import {useSizes} from "../../../../../../hooks/useSizes.js";
import {navbar} from "../../../../../../data/consts/navbar.js";
import ShareIconTools from "../../../../../../assets/ShareIconTools.js";
import {ReloadIcon} from "../../../../../../assets/ReloadIcon.js";
import TrackInfoModal from "./components/TrackInfoModal.js";
import {Bar, BarChart, Label, Rectangle, ResponsiveContainer, XAxis, YAxis} from "recharts";
import {ShowOnLaptopToDesktop} from "../../../../../../components/SowOnLaptopToDeckTop/index.js";
import InfoIcon from "../../../../../../assets/InfoIcon.js";
import {ShowOnMobileToTablet} from "../../../../../../components/showFromMobileToTablet/index.js";
import SearchIcon from "../../../../../../assets/SearchIcon.js";
import ArrowDropdown from "../../../../../../assets/ArrowDropdown.js";
import TableMobile from "../TableMobile.js";
import SecondaryButton from "../../../../../../components/SecondaryButton.js";
import {ShareIconAccount} from "../../../../../../assets/ShareIconAccount.js";



const data = {
  "result": "success",
  "message": "Data retrieved.",
  "sourceId": null,
  "accountIdUnique": "zgrqvky5",
  "summaryStats": [
    {
      "titleText": "Visits",
      "subtitleText": "Track Shares",
      "primaryValue": "29",
      "deltaText": "",
      "isPositiveDelta": true,
      "tooltip": "The number of times your Songshare Link pages have been visited."
    },
    {
      "titleText": "Clicks",
      "subtitleText": "Track Shares",
      "primaryValue": "25",
      "deltaText": "",
      "isPositiveDelta": true,
      "tooltip": "The number of times your Songshare Links have been clicked."
    },
    {
      "titleText": "Click-Through Rate",
      "subtitleText": "Track Shares",
      "primaryValue": "86%",
      "deltaText": "",
      "isPositiveDelta": true,
      "tooltip": "The percentage of visitors that click at least one link."
    },
    {
      "titleText": "Visits",
      "subtitleText": "Artist Shares",
      "primaryValue": "12",
      "deltaText": "",
      "isPositiveDelta": true,
      "tooltip": "The number of times your Songshare Link pages have been visited."
    }
  ],
  "chartData": {
    "trackChartData": {
      "titleText": "Clicks by Source",
      "subtitleText": "Track Shares",
      "categories": [
        "<img src='/assets/svg/apple_logo.svg' style='vertical-align: middle; width: 20px; height: 20px'/>",
        "<img src='/assets/svg/spotify_logo.svg' style='vertical-align: middle; width: 20px; height: 20px'/>",
        "<img src='/assets/svg/1001track_logo.svg' style='vertical-align: middle; width: 20px; height: 20px'/>",
        "<img src='/assets/svg/youtube_logo.svg' style='vertical-align: middle; width: 20px; height: 20px'/>",
        "<img src='/assets/svg/deezer_logo.svg' style='vertical-align: middle; width: 20px; height: 20px'/>",
        "<img src='/assets/svg/amazon_logo.svg' style='vertical-align: middle; width: 20px; height: 20px'/>",
        "<img src='/assets/svg/instagram_logo.png' style='vertical-align: middle; width: 20px; height: 20px'/>",
        "<img src='/assets/svg/tidal_logo.svg' style='vertical-align: middle; width: 20px; height: 20px'/>",
        "<img src='/assets/svg/souncloud_logo.svg' style='vertical-align: middle; width: 20px; height: 20px'/>"
      ],
      "maxYValue": 7,
      "source": "songshare",
      "tooltip": null,
      "data": [
        {
          "y": 6,
          "text": 6,
          "source": "apple_music"
        },
        {
          "y": 5,
          "text": 5,
          "source": "spotify"
        },
        {
          "y": 3,
          "text": 3,
          "source": "tracklist"
        },
        {
          "y": 3,
          "text": 3,
          "source": "youtube"
        },
        {
          "y": 3,
          "text": 3,
          "source": "deezer"
        },
        {
          "y": 2,
          "text": 2,
          "source": "amazon"
        },
        {
          "y": 1,
          "text": 1,
          "source": "instagram"
        },
        {
          "y": 1,
          "text": 1,
          "source": "tidal"
        },
        {
          "y": 1,
          "text": 1,
          "source": "soundcloud"
        }
      ],
      "color": "#AF31FF",
      "secondaryColor": "#591485"
    },
    "entityChartData": {
      "titleText": "Clicks by Source",
      "subtitleText": "Artist Shares",
      "categories": [],
      "maxYValue": 0,
      "source": "songshare",
      "tooltip": null,
      "data": [],
      "color": "#E4FF29",
      "secondaryColor": "#E4FF29"
    }
  },
  "tableData": [
      {
      "name": "Songshare Analytics",
      "id": "songshare_analytics",
      "data": {
        "columns": [
          {
            "id": "songshare_name",
            "name": "Name",
            "width": "40%",
            "isSortable": true
          },
          {
            "id": "songshare_visits",
            "name": "Visits",
            "isSortable": true
          },
          {
            "id": "songshare_clicks",
            "name": "Clicks",
            "isSortable": true
          },
          {
            "id": "songshare_click_rate",
            "name": "Click-Through Rate",
            "isSortable": true
          },
          {
            "id": "songshare_share",
            "name": "Share",
            "width": "5%",
            "isAppHidden": true,
            "isReportsHidden": true
          }
        ],
        "rows": [
          {
            "cells": [
              {
                "displayText": "Du Hast (Paolo Ferrara & Lorenzo Raganzini Edit)",
                "artistLinks": [
                  {
                    "text": "Rammstein",
                    "to": "/artist/zgrqvky5/rammstein",
                    "idUnique": "zgrqvky5"
                  },
                  {
                    "text": "Paolo Ferrara & Lorenzo Raganzini",
                    "to": "/artist/li0fe3xd/paolo-ferrara-lorenzo-raganzini",
                    "idUnique": "li0fe3xd"
                  }
                ],
                "avatar": "https://i.ytimg.com/vi/1OMHPOy0ifs/hqdefault.jpg",
                "order": "du hast (paolo ferrara & lorenzo raganzini edit)",
                "trackId": 13659533,
                "idUnique": "m47ujqk1",
                "hasInternalLink": true,
                "popupType": "u_track",
                "popupIdUnique": "m47ujqk1",
                "popupStyle": "songshare"
              },
              {
                "displayText": 8,
                "order": 8
              },
              {
                "displayText": 5,
                "order": 5
              },
              {
                "displayText": "63%",
                "order": 0.625
              },
              {
                "trackId": 13659533,
                "idUnique": "m47ujqk1",
                "shareLink": true,
                "songshareLink": true
              }
            ]
          },
          {
            "cells": [
              {
                "displayText": "Zick Zack",
                "artistLinks": [
                  {
                    "text": "Rammstein",
                    "to": "/artist/zgrqvky5/rammstein",
                    "idUnique": "zgrqvky5"
                  }
                ],
                "avatar": "https://i.scdn.co/image/ab67616d00001e021108fef87966d83948b6a037",
                "order": "zick zack",
                "trackId": 3898517,
                "idUnique": "tmcz2fha",
                "hasInternalLink": true,
                "popupType": "u_track",
                "popupIdUnique": "tmcz2fha",
                "popupStyle": "songshare"
              },
              {
                "displayText": 3,
                "order": 3
              },
              {
                "displayText": 4,
                "order": 4
              },
              {
                "displayText": "133%",
                "order": 1.333333333333333
              },
              {
                "trackId": 3898517,
                "idUnique": "tmcz2fha",
                "shareLink": true,
                "songshareLink": true
              }
            ]
          },
          {
            "cells": [
              {
                "displayText": "Du hast",
                "artistLinks": [
                  {
                    "text": "Rammstein",
                    "to": "/artist/zgrqvky5/rammstein",
                    "idUnique": "zgrqvky5"
                  }
                ],
                "avatar": "https://i.scdn.co/image/ab67616d00001e02030cda12ffbebd6561c1c0f0",
                "order": "du hast",
                "trackId": 61211,
                "idUnique": "h63fk7ta",
                "hasInternalLink": true,
                "popupType": "u_track",
                "popupIdUnique": "h63fk7ta",
                "popupStyle": "songshare"
              },
              {
                "displayText": 3,
                "order": 3
              },
              {
                "displayText": 5,
                "order": 5
              },
              {
                "displayText": "167%",
                "order": 1.666666666666667
              },
              {
                "trackId": 61211,
                "idUnique": "h63fk7ta",
                "shareLink": true,
                "songshareLink": true
              }
            ]
          },
          {
            "cells": [
              {
                "displayText": "Deutschland",
                "artistLinks": [
                  {
                    "text": "Rammstein",
                    "to": "/artist/zgrqvky5/rammstein",
                    "idUnique": "zgrqvky5"
                  }
                ],
                "avatar": "https://i.scdn.co/image/ab67616d00001e0202add2c77fb6999e311a3248",
                "order": "deutschland",
                "trackId": 707656,
                "idUnique": "mgaco9t2",
                "hasInternalLink": true,
                "popupType": "u_track",
                "popupIdUnique": "mgaco9t2",
                "popupStyle": "songshare"
              },
              {
                "displayText": 3,
                "order": 3
              },
              {
                "displayText": 4,
                "order": 4
              },
              {
                "displayText": "133%",
                "order": 1.333333333333333
              },
              {
                "trackId": 707656,
                "idUnique": "mgaco9t2",
                "shareLink": true,
                "songshareLink": true
              }
            ]
          },
          {
            "cells": [
              {
                "displayText": "Sonne",
                "artistLinks": [
                  {
                    "text": "Rammstein",
                    "to": "/artist/zgrqvky5/rammstein",
                    "idUnique": "zgrqvky5"
                  }
                ],
                "avatar": "https://i.scdn.co/image/ab67616d00001e028b2c42026277efc3e058855b",
                "order": "sonne",
                "trackId": 497989,
                "idUnique": "kvqtrzbx",
                "hasInternalLink": true,
                "popupType": "u_track",
                "popupIdUnique": "kvqtrzbx",
                "popupStyle": "songshare"
              },
              {
                "displayText": 2,
                "order": 2
              },
              {
                "displayText": 3,
                "order": 3
              },
              {
                "displayText": "150%",
                "order": 1.5
              },
              {
                "trackId": 497989,
                "idUnique": "kvqtrzbx",
                "shareLink": true,
                "songshareLink": true
              }
            ]
          },
          {
            "cells": [
              {
                "displayText": "Amerika",
                "artistLinks": [
                  {
                    "text": "Rammstein",
                    "to": "/artist/zgrqvky5/rammstein",
                    "idUnique": "zgrqvky5"
                  }
                ],
                "avatar": "https://i.scdn.co/image/ab67616d00001e02cbe7573e1175f842e24b34c2",
                "order": "amerika",
                "trackId": 1312329,
                "idUnique": "m79q0yjn",
                "hasInternalLink": true,
                "popupType": "u_track",
                "popupIdUnique": "m79q0yjn",
                "popupStyle": "songshare"
              },
              {
                "displayText": 2,
                "order": 2
              },
              {
                "displayText": 2,
                "order": 2
              },
              {
                "displayText": "100%",
                "order": 1.0
              },
              {
                "trackId": 1312329,
                "idUnique": "m79q0yjn",
                "shareLink": true,
                "songshareLink": true
              }
            ]
          },
          {
            "cells": [
              {
                "displayText": "Angst",
                "artistLinks": [
                  {
                    "text": "Rammstein",
                    "to": "/artist/zgrqvky5/rammstein",
                    "idUnique": "zgrqvky5"
                  }
                ],
                "avatar": "https://i.scdn.co/image/ab67616d00001e021108fef87966d83948b6a037",
                "order": "angst",
                "trackId": 4013880,
                "idUnique": "or9ds7p8",
                "hasInternalLink": true,
                "popupType": "u_track",
                "popupIdUnique": "or9ds7p8",
                "popupStyle": "songshare"
              },
              {
                "displayText": 2,
                "order": 2
              },
              {
                "displayText": 1,
                "order": 1
              },
              {
                "displayText": "50%",
                "order": 0.5
              },
              {
                "trackId": 4013880,
                "idUnique": "or9ds7p8",
                "shareLink": true,
                "songshareLink": true
              }
            ]
          },
          {
            "cells": [
              {
                "displayText": "Feuer Frei! (Lekkerfaces Edit)",
                "artistLinks": [
                  {
                    "text": "Rammstein",
                    "to": "/artist/zgrqvky5/rammstein",
                    "idUnique": "zgrqvky5"
                  },
                  {
                    "text": "Lekkerfaces",
                    "to": "/artist/fnt1vs8r/lekkerfaces",
                    "idUnique": "fnt1vs8r"
                  }
                ],
                "avatar": "https://i1.sndcdn.com/artworks-slyngskUOu3Nr0nx-yoX8GQ-t300x300.jpg",
                "order": "feuer frei! (lekkerfaces edit)",
                "trackId": 10552676,
                "idUnique": "kw2ju61g",
                "hasInternalLink": true,
                "popupType": "u_track",
                "popupIdUnique": "kw2ju61g",
                "popupStyle": "songshare"
              },
              {
                "displayText": 2,
                "order": 2
              },
              {
                "displayText": 1,
                "order": 1
              },
              {
                "displayText": "50%",
                "order": 0.5
              },
              {
                "trackId": 10552676,
                "idUnique": "kw2ju61g",
                "shareLink": true,
                "songshareLink": true
              }
            ]
          },
          {
            "cells": [
              {
                "displayText": "Feuerräder - Demo Version 1994",
                "artistLinks": [
                  {
                    "text": "Rammstein",
                    "to": "/artist/zgrqvky5/rammstein",
                    "idUnique": "zgrqvky5"
                  }
                ],
                "avatar": "https://i.scdn.co/image/ab67616d00001e0219e289286920bf38b0b05a78",
                "order": "feuerräder - demo version 1994",
                "trackId": 1568378,
                "idUnique": "h01oyfwx",
                "hasInternalLink": true,
                "popupType": "u_track",
                "popupIdUnique": "h01oyfwx",
                "popupStyle": "songshare"
              },
              {
                "displayText": 1,
                "order": 1
              },
              {
                "displayText": 0,
                "order": 0
              },
              {
                "displayText": "0%",
                "order": 0.0
              },
              {
                "trackId": 1568378,
                "idUnique": "h01oyfwx",
                "shareLink": true,
                "songshareLink": true
              }
            ]
          },
          {
            "cells": [
              {
                "displayText": "5/4",
                "artistLinks": [
                  {
                    "text": "Rammstein",
                    "to": "/artist/zgrqvky5/rammstein",
                    "idUnique": "zgrqvky5"
                  }
                ],
                "avatar": "https://i.scdn.co/image/ab67616d00001e0219e289286920bf38b0b05a78",
                "order": "5/4",
                "trackId": 1568437,
                "idUnique": "exklwp4o",
                "hasInternalLink": true,
                "popupType": "u_track",
                "popupIdUnique": "exklwp4o",
                "popupStyle": "songshare"
              },
              {
                "displayText": 1,
                "order": 1
              },
              {
                "displayText": 0,
                "order": 0
              },
              {
                "displayText": "0%",
                "order": 0.0
              },
              {
                "trackId": 1568437,
                "idUnique": "exklwp4o",
                "shareLink": true,
                "songshareLink": true
              }
            ]
          },
          {
            "cells": [
              {
                "displayText": "Amerika - Andy Panthen & Mat Diaz's Clubmix",
                "artistLinks": [
                  {
                    "text": "Rammstein",
                    "to": "/artist/zgrqvky5/rammstein",
                    "idUnique": "zgrqvky5"
                  },
                  {
                    "text": "Andy Panthen",
                    "to": "/artist/lbrp58v3/andy-panthen",
                    "idUnique": "lbrp58v3"
                  },
                  {
                    "text": "MAT DIAZ",
                    "to": "/artist/73ou9gkc/mat-diaz",
                    "idUnique": "73ou9gkc"
                  }
                ],
                "avatar": "https://i.scdn.co/image/ab67616d00001e02c1207c7f4f9fedffb38a3d3e",
                "order": "amerika - andy panthen & mat diaz's clubmix",
                "trackId": 1568501,
                "idUnique": "wh7y42dl",
                "hasInternalLink": true,
                "popupType": "u_track",
                "popupIdUnique": "wh7y42dl",
                "popupStyle": "songshare"
              },
              {
                "displayText": 1,
                "order": 1
              },
              {
                "displayText": 0,
                "order": 0
              },
              {
                "displayText": "0%",
                "order": 0.0
              },
              {
                "trackId": 1568501,
                "idUnique": "wh7y42dl",
                "shareLink": true,
                "songshareLink": true
              }
            ]
          },
          {
            "cells": [
              {
                "displayText": "Dicke Titten",
                "artistLinks": [
                  {
                    "text": "Rammstein",
                    "to": "/artist/zgrqvky5/rammstein",
                    "idUnique": "zgrqvky5"
                  }
                ],
                "avatar": "https://i.scdn.co/image/ab67616d00001e021108fef87966d83948b6a037",
                "order": "dicke titten",
                "trackId": 4198255,
                "idUnique": "dgf97kav",
                "hasInternalLink": true,
                "popupType": "u_track",
                "popupIdUnique": "dgf97kav",
                "popupStyle": "songshare"
              },
              {
                "displayText": 1,
                "order": 1
              },
              {
                "displayText": 0,
                "order": 0
              },
              {
                "displayText": "0%",
                "order": 0.0
              },
              {
                "trackId": 4198255,
                "idUnique": "dgf97kav",
                "shareLink": true,
                "songshareLink": true
              }
            ]
          }
        ],
        "source": "songshare",
        "sortedById": "songshare_visits"
      }
    }
  ]
}

const CustomXAxisTicks = memo((props) => {
  const dataWithIcon = data.chartData.trackChartData.data.map((item, index) => {
    const findLogo = navbar[0].content[0].options.filter((icon) => icon.slug === item.source)
    return {
      ...item,
      icon: findLogo[0].logo,
    }
  })

  return (
    <g>
      {/* <image href={dataWithIcon[props.payload.index].icon} x={300} y={270} height="20px" width="20px"
             fill="#666">
      </image>*/}
    </g>
  )
})
const TableRows = memo(({item, indexItem, setOpenTrackInfoModal}: any) => {
  return (
    <tr key={indexItem} onClick={() => setOpenTrackInfoModal(true)}>
      {
        item.cells.map((cell, index) => (
          <td
            className={`py-4 text-start text-t2Regular ${index === 0 ? 'px-4 lg:pr-[3.8rem] lg:pl-11 min-w-[35rem]' : 'px-4 '}`}
            key={index}>
            {
              index === item.cells.length - 1
                ? <div className='flex justify-center items-center'><ShareIconAccount className='fill-white'/></div>
                : <div className='flex gap-6 lg:gap-11 items-center '>
                  {
                    cell.avatar && (
                      <div className='flex items-center'>
                        <img src={cell.avatar} alt='' className='w-11 h-11 rounded-lg'/>
                      </div>
                    )
                  }
                  <div>
                    <p
                      className={`text-t2Regular  ${index === 0 ? 'text-white' : 'text-light_grey'}`}>{cell.displayText}</p>
                    <div className='flex flex-wrap'>
                      {
                        cell.artistLinks && (
                          cell.artistLinks.map((artist: any, index: number) => (
                            <p className='text-caption_s_desk text-medium_grey'
                               key={index}>{index !== cell.artistLinks.length - 1 ? `${artist.text},` : artist.text}</p>
                          ))
                        )
                      }
                    </div>
                  </div>
                </div>
            }
          </td>
        ))
      }
    </tr>
  )
})

const PublicProfile = memo(() => {
  const {isMobile} = useSizes();
  const [search, setSearch] = useState('');
  const [openTrackInfoModal, setOpenTrackInfoModal] = useState(false);
  const [dataType, setDataType] = useState("tracks");
  const [activeSort, setActiveSort] = useState(1);
  const dataWithIconTracks = data.chartData.trackChartData.data.map((item, index) => {
    const findLogo = navbar[0].content[0].options.filter((icon) => icon.slug === item.source)
    return {
      ...item,
      icon: findLogo[0].logo,
    }
  })
  const dataWithIconArtist = data.chartData.entityChartData.data.map((item, index) => {
    const findLogo = navbar[0].content[0].options.filter((icon) => icon.slug === item.source)
    return {
      ...item,
      icon: findLogo[0].logo,
    }
  })
  const tableRows = data.tableData[0].data.rows.sort((a, b) => {
    return String(b.cells[activeSort].order).localeCompare(
      String(a.cells[activeSort].order), undefined, {numeric: true}
    );
  }).filter((item) => {
    if (search !== '') {
      return String(item.cells[0].order).toLowerCase().startsWith(search.toLowerCase())
    }
    return true
  })
  return (
    <>
      <ShowOnLaptopToDesktop>
        <div className='py-6 '>
          <p className=' text-caption_r_desk text-medium_grey'>В этом разделе ты можешь посмотреть статистику по
            своему <span className='text-white'>профилю</span></p>
        </div>
      </ShowOnLaptopToDesktop>
      <div className='flex flex-col gap-4 lg:hidden py-6  w-full'>
        <div className='flex flex-col md:flex-row gap-4 md:justify-between md:items-center w-full'>
          <h1 className='text-t1Semi_ipad'>Публичный профиль</h1>
          <div className='flex gap-3'>
            <div className='py-3 px-6 border border-medium_grey rounded-xl w-fit'>
              <ShareIconTools className='fill-light_grey'/>
            </div>
            <div className='py-3 px-6 border border-medium_grey rounded-xl w-fit'>
              <ReloadIcon className='fill-light_grey'/>
            </div>
          </div>
        </div>
        <div className='py-2'>
          <p className='text-caption_r_desk text-medium_grey'>В этом разделе ты можешь посмотреть статистику по
            своему <span className='text-white'>профилю</span></p>
        </div>
      </div>
      <div className='w-full flex flex-col gap-4 lg:gap-6 mb-10'>
        <TrackInfoModal openTrackInfoModal={openTrackInfoModal} setOpenTrackInfoModal={setOpenTrackInfoModal}/>
        <div className='w-full flex xl:flex-row flex-col gap-6 '>
          <div className=' w-full py-2 md:py-4 lg:p-8 lg:bg-popup_gray/50 rounded-[20px] '>
            <div className='w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-2'>
              <h1 className='text-btnText'>Статистика кликов по платформам</h1>
              <div className='flex gap-2'>
                <button onClick={() => setDataType('tracks')}>
                  <p
                    className={`text-caption_m_desk py-2 lg:p-2 ${dataType === 'tracks' ? 'text-medium_grey' : 'text-white'}`}>{data.chartData.trackChartData.subtitleText}</p>
                </button>
                <button onClick={() => setDataType('artist')}>
                  <p
                    className={`text-caption_m_desk py-2 lg:p-2 ${dataType === 'artist' ? 'text-medium_grey' : 'text-white'}`}>{data.chartData.trackChartData.subtitleText}</p>
                </button>
              </div>
            </div>
            <div className='h-[300px] w-full  mt-6 md:mt-12'>
              {
                isMobile && (
                  <p className='text-caption_r_desk text-medium_grey'>Количество кликов</p>
                )
              }
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={dataType === 'tracks' ? dataWithIconTracks : dataWithIconArtist}
                  margin={{
                    top: 0,
                    right: 0,
                    left: isMobile ? -54 : 0,
                    // bottom: 5,
                  }}
                  barSize={isMobile ? 12 : 40}
                >
                  <defs>
                    <linearGradient id="Color0" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"
                            stopColor={dataType === 'tracks' ? data.chartData.trackChartData.color : data.chartData.entityChartData.color}
                            stopOpacity={1}/>
                      <stop offset="100%"
                            stopColor={dataType === 'tracks' ? data.chartData.trackChartData.color : data.chartData.entityChartData.color}
                            stopOpacity={0.2}/>
                    </linearGradient>
                    <linearGradient id="Color0Stroke" x1="1" y1="0.5" x2="0" y2="0.5">
                      <stop offset="0%" stopColor="#E4FF29"/>
                      <stop offset="100%" stopColor="#E4FF29"/>
                    </linearGradient>
                  </defs>
                  <XAxis
                    // dataKey={'icon'}
                    stroke='#484848'
                    tickLine={false}
                    // tick={<CustomXAxisTicks />}
                    interval={0}
                    domain={["auto", "auto"]}
                  />
                  <YAxis
                    tick={isMobile ? false : {
                      fill: "#7B7B7B",
                      fontSize: 13,
                      fontWeight: 400
                    }}
                    stroke="transparent"
                  >
                    {
                      !isMobile && (
                        <Label
                          position={{
                            x: 20,
                            y: 50
                          }}
                          fill="#7B7B7B"
                          angle={-90}
                          style={{
                            fontSize: 16,
                            lineHeight: 24,
                            fontWeight: 400,
                          }}>
                          Количество кликов
                        </Label>
                      )
                    }
                  </YAxis>
                  <Bar
                    label={{
                      position: 'top', fill: '#CCCCCD'
                    }}
                    dataKey="y"
                    fill="url(#Color0)"
                    activeBar={<Rectangle/>}
                  />
                </BarChart>
              </ResponsiveContainer>
              {/*     <div className='w-full flex justify-between items-center max-w-[1020px] ml-[100px]'>
            {
              dataWithIconTracks.map((item, index) => {
                return (
                  <img src={item.icon} className='w-5 h-5'/>
                )
              })
            }
          </div>*/}

            </div>
            <ShowOnLaptopToDesktop>
              <div className='w-full flex justify-between items-center mt-12 gap-4'>
                <p className='text-caption_s_desk text-medium_grey '>
                  *компания Meta Platforms Inc., владеющая Facebook и Instagram, внесена в реестр экстремистских
                  организаций, ее деятельность в России по поддержанию указанных соцсетей признана экстремистской
                  деятельностью
                </p>
                <InfoIcon className='fill-medium_grey min-w-5 h-5 '/>
              </div>
            </ShowOnLaptopToDesktop>
          </div>
          <ShowOnMobileToTablet>
            <div className='w-full flex justify-between items-center  gap-4'>
              <p className='text-caption_s_desk text-medium_grey '>
                *компания Meta Platforms Inc., владеющая Facebook и Instagram, внесена в реестр экстремистских
                организаций, ее деятельность в России по поддержанию указанных соцсетей признана экстремистской
                деятельностью
              </p>
              <InfoIcon className='fill-medium_grey min-w-5 h-5 '/>
            </div>
          </ShowOnMobileToTablet>
          <ul
            className='xl:flex xl:flex-col gap-4 lg:gap-6 w-full xl:max-w-[20.5rem] grid grid-cols-1 md:grid-cols-2 mt-2 md:mt-[unset]'>
            {
              data.summaryStats.map((item, index) => (
                <li
                  className='bg-popup_gray/50 w-full px-9 rounded-xl h-[5.375rem] lg:h-[7.5rem] flex items-center '
                  key={index}>
                  <div className='w-full flex justify-between items-center gap-6 '>
                    <p className='text-caption_r_desk text-medium_grey'>{item.titleText}</p>
                    <p className='text-t1Semi_deck text-light_grey'>{item.primaryValue}</p>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
        <div className='w-full lg:bg-popup_gray/50 rounded-[20px] py-6 lg:p-8 flex flex-col gap-6'>
          <div className='w-full flex flex-col md:flex-row justify-between md:items-center gap-6'>
            <h1 className='text-btnText'>Статистика по трекам</h1>
            <div
              className=' w-full md:max-w-[320px] border border-dark_grey rounded-xl flex items-center gap-2 py-3.5 px-2.5 '>
              <SearchIcon color="#7B7B7B" width={20}/>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Поиск по каталогу'
                className='placeholder:text-medium_grey'/>
            </div>
          </div>
          <div className='hidden md:block w-full rounded-t-2xl overflow-hidden mt-2 lg:mt-[unset]'>
            <div className='w-full overflow-x-auto'>
              <table className='border-b border-secondary_dark_gray w-full'>
                <thead>
                <tr className="bg-[#48484840]/25">
                  {
                    data.tableData[0].data.columns.map((title, index) => (
                      <th onClick={() => setActiveSort(index)}
                          className={`py-4  text-start  text-btnText whitespace-nowrap ${index === 0 ? 'px-4 lg:pr-[3.8rem] lg:pl-11' : 'px-4  '} ${index === data.tableData[0].data.columns.length - 1 ? '' : ''}`}
                          key={index}>
                        <div className='flex gap-2 items-center'>
                          <p>{title.name}</p>
                          {
                            index !== data.tableData[0].data.columns.length - 1 && (
                              <ArrowDropdown className={` ${activeSort === index ? 'fill-white' : ' fill-medium_grey'}`}/>
                            )
                          }
                        </div>

                      </th>
                    ))
                  }
                </tr>
                </thead>
                <tbody className="divide-y divide-secondary_dark_gray">
                {
                  tableRows.map((item, indexItem) => (
                    <TableRows key={indexItem} item={item} index={indexItem} search={search}
                               setOpenTrackInfoModal={setOpenTrackInfoModal}/>
                  ))
                }
                </tbody>
              </table>
            </div>
          </div>
          <TableMobile data={data} setOpenTrackInfoModal={setOpenTrackInfoModal}/>
          <div className='w-full flex justify-center'>
            <SecondaryButton title='Показать ещё'/>
          </div>
        </div>
      </div>
    </>
  )
})
export default PublicProfile
