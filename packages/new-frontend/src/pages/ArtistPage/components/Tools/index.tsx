import React, {memo, useState} from "react";
import ArtistMobileHeader from "../ArtistMobileHeader.js";
import PrimaryButton from "../../../../components/PrimaryButton.js";
import reload from "/assets/svg/reload_icon.svg";
import {useSizes} from "../../../../hooks/useSizes.js";
import {useArtistSongshare} from "../../hooks/useArtistSongshare.js";
import {Tab} from "@headlessui/react";


const tabs = [
  {
    title: 'Публичный профиль'
  },
  {
    title: 'Рекомендованные плейлисты'
  },
  {
    title: 'Рекомендованные аккаунты'
  },
  {
    title: 'Места'
  },
]
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
      "color": "#AF31FF",
      "secondaryColor": "#591485"
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

const PublicProfile = memo(() => {
  return (
    <div className='p-8 bg-popup_gray/50 rounded-[20px]'>
      <div className='w-full flex justify-between items-center'>
        <h1 className='text-btnText'>Статистика кликов по платформам</h1>
        <div className='flex gap-2'>
         <p className='text-caption_m_desk p-2'>{data['chartData']['trackChartData'].subtitleText}</p>
         <p className='text-caption_m_desk p-2'>{data['chartData']['entityChartData'].subtitleText}</p>
        </div>
      </div>

    </div>
  )
})
const ToolsContent = memo(() => {
  const {isMobile, isTablet} = useSizes();
  const {data} = useArtistSongshare();
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <>
      <main className="h-full relative z-20 pt-4 xl:max-w-none w-full px-4 md:px-8 lg:pl-6 lg:pr-2">
        <header id="header" className="mb-8 md:flex justify-between items-center">
          {
            isMobile || isTablet
              ? <ArtistMobileHeader/>
              : <>
                <div className="flex-auto max-w-4xl">
                  <h1 className="text-t1Semi_deck">Инструменты</h1>
                </div>
                <PrimaryButton
                  titleClassName='text-caption_m_desk text-light_grey'
                  className='px-6 py-4 border border-solid border-medium_grey rounded-xl'
                  title='Обновить'
                  isIcon={true}
                  icon={reload}/>
              </>
          }
        </header>
        <section className='w-full flex flex-col'>
          <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex} vertical>
            <Tab.List
              className="flex gap-10 border-b border-secondary_dark_gray/50 overflow-x-auto overflow-y-hidden mt-1">
              {
                tabs.map((tab, index) => (
                  <div
                    className={` flex text-t2Regular px-4 py-2 border-solid border-b whitespace-nowrap ${selectedIndex === index ? 'text-medium_grey border-medium_grey' : 'border-transparent '}`}
                    key={index}>
                    <Tab
                    >{tab.title}
                    </Tab>
                  </div>

                ))
              }
            </Tab.List>
            <div className='py-6 '>
              <p className=' text-caption_r_desk text-medium_grey'>В этом разделе ты можешь посмотреть статистику по
                своему <span className='text-white'>профилю</span></p>
            </div>
            <Tab.Panels>
              <Tab.Panel className="w-full">
                <PublicProfile/>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>

        </section>
      </main>
    </>
  )
})
export default ToolsContent