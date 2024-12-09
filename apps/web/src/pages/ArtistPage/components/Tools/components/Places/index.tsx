import React, {memo, useEffect, useState} from "react";
import SearchIcon from "../../../../../../assets/SearchIcon.js";
import SecondaryCloseIcon from "../../../../../../assets/SecondaryCloseIcon.js";
import {useLazyFetch} from "../../../../../../hooks/useFetch.js";
import {ArtistProfileType} from "../../../../types.js";
import {BACKEND_URL} from "../../../../../../constants/index.js";
import {Link} from "wouter";
import shuffle from "lodash.shuffle";
import ChevronRight from "../../../../../../assets/ChevronRight.js";
import {useArtistProfile} from "../../../../hooks/useArtistProfile.js";
import {useArtist} from "../../../../hooks/useArtist.js";
import MapIcon from "../../../../../../assets/MapIcon.js";
import GlobeIcon from "../../../../../../assets/GlobeIcon.js";
import PublicProfile from "../PublicProfiles/PublicProfile.js";
import RecommendedPlaylists from "../Recommended/index.js";
import RecommendedAccounts from "../RecommendedAccounts/index.js";
import {useGetPlaces} from "../../../../hooks/useGetPlaces.js";
import AllSearchResults from "./AllSearchResults.js";
import DetailedResult from "./DetailedResult.js";
import ShareIconTools from "../../../../../../assets/ShareIconTools.js";
import {ReloadIcon} from "../../../../../../assets/ReloadIcon.js";
import {ShowOnMobileToTablet} from "../../../../../../components/showFromMobileToTablet/index.js";


const data = {
  "result": "success",
  "message": "Data retrieved.",
  "cities": [
    {
      "id": 1704,
      "imageUrl": "https://songstats.com/files/flags/gb.png",
      "name": "London, GB",
      "artists": [
        {
          "name": "Marilyn Manson",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb9420fc7bac8669f61a9f45c3"
        },
        {
          "name": "OOMPH!",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebc60b5748dbea18cf4311e910"
        },
        {
          "name": "Lindemann",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb77470ac1f20df10ee2fa9a07"
        },
        {
          "name": "Eisbrecher",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebada11014169e26224ec80f0c"
        },
        {
          "name": "Static-X",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb7f4a72d9541571d430c157c7"
        },
        {
          "name": "Iron Maiden",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebf9978ad4808f6f2723124d19"
        },
        {
          "name": "Slipknot",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebd0cdb283a7384a0edb665182"
        }
      ],
      "artistsStr": "Marilyn Manson, OOMPH! + 5"
    },
    {
      "id": 1034,
      "imageUrl": "https://songstats.com/files/flags/ch.png",
      "name": "Zürich, CH",
      "artists": [
        {
          "name": "Marilyn Manson",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb9420fc7bac8669f61a9f45c3"
        },
        {
          "name": "OOMPH!",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebc60b5748dbea18cf4311e910"
        },
        {
          "name": "Lindemann",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb77470ac1f20df10ee2fa9a07"
        },
        {
          "name": "Eisbrecher",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebada11014169e26224ec80f0c"
        },
        {
          "name": "Static-X",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb7f4a72d9541571d430c157c7"
        },
        {
          "name": "Iron Maiden",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebf9978ad4808f6f2723124d19"
        },
        {
          "name": "Slipknot",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebd0cdb283a7384a0edb665182"
        }
      ],
      "artistsStr": "Marilyn Manson, OOMPH! + 5"
    },
    {
      "id": 1216,
      "imageUrl": "https://songstats.com/files/flags/at.png",
      "name": "Vienna, AT",
      "artists": [
        {
          "name": "Marilyn Manson",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb9420fc7bac8669f61a9f45c3"
        },
        {
          "name": "OOMPH!",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebc60b5748dbea18cf4311e910"
        },
        {
          "name": "Lindemann",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb77470ac1f20df10ee2fa9a07"
        },
        {
          "name": "Eisbrecher",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebada11014169e26224ec80f0c"
        },
        {
          "name": "Static-X",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb7f4a72d9541571d430c157c7"
        },
        {
          "name": "Iron Maiden",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebf9978ad4808f6f2723124d19"
        },
        {
          "name": "Slipknot",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebd0cdb283a7384a0edb665182"
        }
      ],
      "artistsStr": "Marilyn Manson, OOMPH! + 5"
    },
    {
      "id": 1742,
      "imageUrl": "https://songstats.com/files/flags/de.png",
      "name": "Cologne, DE",
      "artists": [
        {
          "name": "Marilyn Manson",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb9420fc7bac8669f61a9f45c3"
        },
        {
          "name": "OOMPH!",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebc60b5748dbea18cf4311e910"
        },
        {
          "name": "Lindemann",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb77470ac1f20df10ee2fa9a07"
        },
        {
          "name": "Eisbrecher",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebada11014169e26224ec80f0c"
        },
        {
          "name": "Static-X",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb7f4a72d9541571d430c157c7"
        },
        {
          "name": "Iron Maiden",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebf9978ad4808f6f2723124d19"
        },
        {
          "name": "Slipknot",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebd0cdb283a7384a0edb665182"
        }
      ],
      "artistsStr": "Marilyn Manson, OOMPH! + 5"
    },
    {
      "id": 287,
      "imageUrl": "https://songstats.com/files/flags/fr.png",
      "name": "Paris, FR",
      "artists": [
        {
          "name": "Marilyn Manson",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb9420fc7bac8669f61a9f45c3"
        },
        {
          "name": "OOMPH!",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebc60b5748dbea18cf4311e910"
        },
        {
          "name": "Lindemann",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb77470ac1f20df10ee2fa9a07"
        },
        {
          "name": "Eisbrecher",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebada11014169e26224ec80f0c"
        },
        {
          "name": "Static-X",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb7f4a72d9541571d430c157c7"
        },
        {
          "name": "Iron Maiden",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebf9978ad4808f6f2723124d19"
        },
        {
          "name": "Slipknot",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebd0cdb283a7384a0edb665182"
        }
      ],
      "artistsStr": "Marilyn Manson, OOMPH! + 5"
    },
    {
      "id": 384,
      "imageUrl": "https://songstats.com/files/flags/de.png",
      "name": "Munich, DE",
      "artists": [
        {
          "name": "Marilyn Manson",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb9420fc7bac8669f61a9f45c3"
        },
        {
          "name": "OOMPH!",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebc60b5748dbea18cf4311e910"
        },
        {
          "name": "Lindemann",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb77470ac1f20df10ee2fa9a07"
        },
        {
          "name": "Eisbrecher",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebada11014169e26224ec80f0c"
        },
        {
          "name": "Static-X",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb7f4a72d9541571d430c157c7"
        },
        {
          "name": "Iron Maiden",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebf9978ad4808f6f2723124d19"
        },
        {
          "name": "Slipknot",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebd0cdb283a7384a0edb665182"
        }
      ],
      "artistsStr": "Marilyn Manson, OOMPH! + 5"
    },
    {
      "id": 106068,
      "imageUrl": "https://songstats.com/files/flags/de.png",
      "name": "Wacken, DE",
      "artists": [
        {
          "name": "Marilyn Manson",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb9420fc7bac8669f61a9f45c3"
        },
        {
          "name": "OOMPH!",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebc60b5748dbea18cf4311e910"
        },
        {
          "name": "Lindemann",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb77470ac1f20df10ee2fa9a07"
        },
        {
          "name": "Eisbrecher",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebada11014169e26224ec80f0c"
        },
        {
          "name": "Static-X",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb7f4a72d9541571d430c157c7"
        },
        {
          "name": "Iron Maiden",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebf9978ad4808f6f2723124d19"
        },
        {
          "name": "Slipknot",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebd0cdb283a7384a0edb665182"
        }
      ],
      "artistsStr": "Marilyn Manson, OOMPH! + 5"
    },
    {
      "id": 371,
      "imageUrl": "https://songstats.com/files/flags/de.png",
      "name": "Hamburg, DE",
      "artists": [
        {
          "name": "Marilyn Manson",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb9420fc7bac8669f61a9f45c3"
        },
        {
          "name": "OOMPH!",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebc60b5748dbea18cf4311e910"
        },
        {
          "name": "Eisbrecher",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebada11014169e26224ec80f0c"
        },
        {
          "name": "Static-X",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb7f4a72d9541571d430c157c7"
        },
        {
          "name": "Iron Maiden",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebf9978ad4808f6f2723124d19"
        },
        {
          "name": "Slipknot",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebd0cdb283a7384a0edb665182"
        }
      ],
      "artistsStr": "Marilyn Manson, OOMPH! + 4"
    },
    {
      "id": 380,
      "imageUrl": "https://songstats.com/files/flags/de.png",
      "name": "Leipzig, DE",
      "artists": [
        {
          "name": "Marilyn Manson",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb9420fc7bac8669f61a9f45c3"
        },
        {
          "name": "OOMPH!",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebc60b5748dbea18cf4311e910"
        },
        {
          "name": "Lindemann",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb77470ac1f20df10ee2fa9a07"
        },
        {
          "name": "Eisbrecher",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebada11014169e26224ec80f0c"
        },
        {
          "name": "Iron Maiden",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebf9978ad4808f6f2723124d19"
        },
        {
          "name": "Slipknot",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebd0cdb283a7384a0edb665182"
        }
      ],
      "artistsStr": "Marilyn Manson, OOMPH! + 4"
    },
    {
      "id": 601210,
      "imageUrl": "https://songstats.com/files/flags/at.png",
      "name": "2425 Nickelsdorf, AT",
      "artists": [
        {
          "name": "Marilyn Manson",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb9420fc7bac8669f61a9f45c3"
        },
        {
          "name": "OOMPH!",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebc60b5748dbea18cf4311e910"
        },
        {
          "name": "Eisbrecher",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebada11014169e26224ec80f0c"
        },
        {
          "name": "Static-X",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb7f4a72d9541571d430c157c7"
        },
        {
          "name": "Iron Maiden",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebf9978ad4808f6f2723124d19"
        },
        {
          "name": "Slipknot",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebd0cdb283a7384a0edb665182"
        }
      ],
      "artistsStr": "Marilyn Manson, OOMPH! + 4"
    },
    {
      "id": 221,
      "imageUrl": "https://songstats.com/files/flags/ru.png",
      "name": "Moscow, RU",
      "artists": [
        {
          "name": "Marilyn Manson",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb9420fc7bac8669f61a9f45c3"
        },
        {
          "name": "OOMPH!",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebc60b5748dbea18cf4311e910"
        },
        {
          "name": "Lindemann",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb77470ac1f20df10ee2fa9a07"
        },
        {
          "name": "Eisbrecher",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebada11014169e26224ec80f0c"
        },
        {
          "name": "Static-X",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb7f4a72d9541571d430c157c7"
        },
        {
          "name": "Iron Maiden",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebf9978ad4808f6f2723124d19"
        }
      ],
      "artistsStr": "Marilyn Manson, OOMPH! + 4"
    },
    {
      "id": 554,
      "imageUrl": "https://songstats.com/files/flags/mx.png",
      "name": "Mexico City, MX",
      "artists": [
        {
          "name": "Marilyn Manson",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb9420fc7bac8669f61a9f45c3"
        },
        {
          "name": "OOMPH!",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebc60b5748dbea18cf4311e910"
        },
        {
          "name": "Static-X",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb7f4a72d9541571d430c157c7"
        },
        {
          "name": "Iron Maiden",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebf9978ad4808f6f2723124d19"
        },
        {
          "name": "Slipknot",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebd0cdb283a7384a0edb665182"
        }
      ],
      "artistsStr": "Marilyn Manson, OOMPH! + 3"
    },
    {
      "id": 80625,
      "imageUrl": "https://songstats.com/files/flags/us.png",
      "name": "Sacramento, CA, US",
      "artists": [
        {
          "name": "Marilyn Manson",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb9420fc7bac8669f61a9f45c3"
        },
        {
          "name": "Lindemann",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb77470ac1f20df10ee2fa9a07"
        },
        {
          "name": "Static-X",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb7f4a72d9541571d430c157c7"
        },
        {
          "name": "Iron Maiden",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebf9978ad4808f6f2723124d19"
        },
        {
          "name": "Slipknot",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebd0cdb283a7384a0edb665182"
        }
      ],
      "artistsStr": "Marilyn Manson, Lindemann + 3"
    },
    {
      "id": 1427,
      "imageUrl": "https://songstats.com/files/flags/fi.png",
      "name": "Helsinki, FI",
      "artists": [
        {
          "name": "Marilyn Manson",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb9420fc7bac8669f61a9f45c3"
        },
        {
          "name": "Lindemann",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb77470ac1f20df10ee2fa9a07"
        },
        {
          "name": "Static-X",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb7f4a72d9541571d430c157c7"
        },
        {
          "name": "Iron Maiden",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebf9978ad4808f6f2723124d19"
        },
        {
          "name": "Slipknot",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebd0cdb283a7384a0edb665182"
        }
      ],
      "artistsStr": "Marilyn Manson, Lindemann + 3"
    },
    {
      "id": 80593,
      "imageUrl": "https://songstats.com/files/flags/de.png",
      "name": "Berlin, DE",
      "artists": [
        {
          "name": "Marilyn Manson",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb9420fc7bac8669f61a9f45c3"
        },
        {
          "name": "OOMPH!",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebc60b5748dbea18cf4311e910"
        },
        {
          "name": "Eisbrecher",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebada11014169e26224ec80f0c"
        },
        {
          "name": "Iron Maiden",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebf9978ad4808f6f2723124d19"
        },
        {
          "name": "Slipknot",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebd0cdb283a7384a0edb665182"
        }
      ],
      "artistsStr": "Marilyn Manson, OOMPH! + 3"
    },
    {
      "id": 1737,
      "imageUrl": "https://songstats.com/files/flags/de.png",
      "name": "Nuremberg, DE",
      "artists": [
        {
          "name": "Marilyn Manson",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb9420fc7bac8669f61a9f45c3"
        },
        {
          "name": "OOMPH!",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebc60b5748dbea18cf4311e910"
        },
        {
          "name": "Eisbrecher",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebada11014169e26224ec80f0c"
        },
        {
          "name": "Iron Maiden",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebf9978ad4808f6f2723124d19"
        },
        {
          "name": "Slipknot",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebd0cdb283a7384a0edb665182"
        }
      ],
      "artistsStr": "Marilyn Manson, OOMPH! + 3"
    },
    {
      "id": 1732,
      "imageUrl": "https://songstats.com/files/flags/es.png",
      "name": "Barcelona, ES",
      "artists": [
        {
          "name": "Marilyn Manson",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb9420fc7bac8669f61a9f45c3"
        },
        {
          "name": "OOMPH!",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebc60b5748dbea18cf4311e910"
        },
        {
          "name": "Eisbrecher",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebada11014169e26224ec80f0c"
        },
        {
          "name": "Iron Maiden",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebf9978ad4808f6f2723124d19"
        },
        {
          "name": "Slipknot",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebd0cdb283a7384a0edb665182"
        }
      ],
      "artistsStr": "Marilyn Manson, OOMPH! + 3"
    },
    {
      "id": 272688,
      "imageUrl": "https://songstats.com/files/flags/be.png",
      "name": "Dessel, BE",
      "artists": [
        {
          "name": "Marilyn Manson",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb9420fc7bac8669f61a9f45c3"
        },
        {
          "name": "OOMPH!",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebc60b5748dbea18cf4311e910"
        },
        {
          "name": "Eisbrecher",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebada11014169e26224ec80f0c"
        },
        {
          "name": "Iron Maiden",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebf9978ad4808f6f2723124d19"
        },
        {
          "name": "Slipknot",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebd0cdb283a7384a0edb665182"
        }
      ],
      "artistsStr": "Marilyn Manson, OOMPH! + 3"
    },
    {
      "id": 1252,
      "imageUrl": "https://songstats.com/files/flags/se.png",
      "name": "Stockholm, SE",
      "artists": [
        {
          "name": "Marilyn Manson",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb9420fc7bac8669f61a9f45c3"
        },
        {
          "name": "Lindemann",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb77470ac1f20df10ee2fa9a07"
        },
        {
          "name": "Static-X",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb7f4a72d9541571d430c157c7"
        },
        {
          "name": "Iron Maiden",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebf9978ad4808f6f2723124d19"
        },
        {
          "name": "Slipknot",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebd0cdb283a7384a0edb665182"
        }
      ],
      "artistsStr": "Marilyn Manson, Lindemann + 3"
    },
    {
      "id": 2804,
      "imageUrl": "https://songstats.com/files/flags/de.png",
      "name": "Hanover, DE",
      "artists": [
        {
          "name": "OOMPH!",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebc60b5748dbea18cf4311e910"
        },
        {
          "name": "Lindemann",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb77470ac1f20df10ee2fa9a07"
        },
        {
          "name": "Eisbrecher",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebada11014169e26224ec80f0c"
        },
        {
          "name": "Iron Maiden",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebf9978ad4808f6f2723124d19"
        },
        {
          "name": "Slipknot",
          "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebd0cdb283a7384a0edb665182"
        }
      ],
      "artistsStr": "OOMPH!, Lindemann + 3"
    }
  ]
}


const Places = memo(() => {
  const {
    value,
    setValue,
    searchData,
    setValueAllResults,
    valueAllResults,
    searchDataAllResults,
    setSearchDataAllResults,
    setRenderResultContent,
    renderResultContent
  } = useGetPlaces();
  const [tabIndex, setTabIndex] = useState(undefined);

  const {id} = useArtist();

  const [{data: itemData, loading: itemDataLoading, error: itemDataError}, itemDataFetch] = useLazyFetch({
    url: `${BACKEND_URL}/proxy/api/v1/marketing/venue_recommendations`,
    cache: import.meta.env.VITE_CACHE === 'true'
  });
  const [{data: cityVenueData, loading: cityVenueLoading, error: cityVenueError}, cityVenueFetchData] = useLazyFetch({
    url: `${BACKEND_URL}/proxy/api/v1/marketing/related_artist_venue_cities`,
    cache: import.meta.env.VITE_CACHE === 'true'
  });
  const generalSearchData = shuffle([...(searchData?.results[0]?.data || []), ...(searchData?.results[1]?.data || [])]);

  const handleClickAllResults = () => {
    setValueAllResults({
      value: value,
      length: generalSearchData.length
    });
    setSearchDataAllResults(searchData);
    setRenderResultContent('all');
    setValue('');
  }

  /*useEffect(() => {
    if (!id) {
      return
    }
    cityVenueFetchData({
      params: {
        idUnique: id
      }
    }).catch(console.error);
  }, [id]);*/
  return (
    <div>
      <ShowOnMobileToTablet>
        <div className='flex flex-col md:flex-row gap-4 md:justify-between md:items-center w-full pt-6'>
          <h1 className='text-t1Semi_ipad'>Места</h1>
          <div className='flex gap-3'>
            <div className='py-3 px-6 border border-medium_grey rounded-xl w-fit'>
              <ShareIconTools className='fill-light_grey'/>
            </div>
            <div className='py-3 px-6 border border-medium_grey rounded-xl w-fit'>
              <ReloadIcon className='fill-light_grey'/>
            </div>
          </div>
        </div>
      </ShowOnMobileToTablet>
      <section>
        <div className='py-4'>
          <p className='text-caption_r_desk text-medium_grey'>В этом разделе ты можешь узнать, в каких городах выступают
            похожие исполнители.</p>
        </div>
        <div className='w-full pt pb-6 flex gap-6 mt-4 lg:mt-[unset]'>
          <div className='w-full flex flex-col gap-4'>
            <h1 className='text-btnText'>Поиск по городу или артисту</h1>
            <div>
              <div
                className={`px-3.5 py-1.5 bg-popup_gray  flex gap-2 items-center max-w-[35.25rem] ${searchData && value ? 'rounded-t-xl border-b border-secondary_dark_gray' : 'rounded-xl'}`}>
                <div className='w-full flex gap-4 items-center py-1'>
                  <SearchIcon color='#7B7B7B' width={28}/>
                  <input
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    placeholder='Введи город или артиста'
                    className='w-full placeholder:text-medium_grey placeholder:text-t2Regular'
                  />
                  {value !== '' && (
                    <button onClick={() => setValue('')}>
                      <SecondaryCloseIcon className='stroke-medium_grey min-w-7 mr-5'/>
                    </button>

                  )}
                </div>
                {value !== '' && (
                  <div className='px-8 border-l border-secondary_dark_gray h-full flex items-center'>
                    <p
                      className='text-caption_r_desk text-light_grey '>Отмена</p>
                  </div>
                )}
              </div>

              {
                (searchData && value) && (
                  <div
                    className={`w-full bg-popup_gray py-4 overflow-auto max-h-[30rem] max-w-[35.25rem] ${generalSearchData?.length === 0 && value ? 'rounded-b-xl' : ''}`}>
                    {
                      (generalSearchData.length === 0 && value) && (
                        <p className='text-t2Regular text-medium_grey px-5'>По твоему запросу ничего не найдено.</p>
                      )
                    }
                    <div className='flex gap-2 px-5 mb-4'>
                      {
                        searchData?.results.map((item, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              setTabIndex(prev => {
                                if (prev === undefined) {
                                  return index
                                }
                                return prev === index ? undefined : index
                              })
                            }}
                            className={`py-2 px-6 rounded-[30px] border border-secondary_dark_gray cursor-pointer ${tabIndex === index ? 'bg-yellow text-black' : 'text-medium_grey '}`}>
                            <p className='text-caption_m_desk capitalize'>{item.type}</p>
                          </div>
                        ))
                      }
                    </div>
                    {
                      tabIndex === undefined
                        ? generalSearchData.map((item, index) => (
                          <div className={`py-3 px-5 border-b border-secondary_dark_gray `}
                               key={index}
                          >
                            <Link
                              to=''
                              // to={`/artist/${item.id}/${item.title}${navigation ? `/${navigation}` : '/analytics'}`}
                              onClick={() => {
                                setRenderResultContent('detailed');
                                setValue('');
                               /* itemDataFetch({
                                  params: {
                                    itemId: item.id,
                                    itemName: encodeURI(item.name),
                                    imageUrl: encodeURI(item.imageUrl),
                                    type: item.type,
                                    idUnique: id
                                  }
                                }).catch(console.error);*/
                              }}
                            >
                              <div className="flex items-center gap-4">
                                <img src={item.imageUrl} alt=''
                                     className={`w-11 h-11  ${item.type === 'city' ? 'rounded-lg ' : 'rounded-full'}`}/>
                                <div className="">
                                  <h3 className="text-t2Regular truncate">{item.name}</h3>
                                  <p className="text-caption_s_desk text-medium_grey capitalize">{item.type}</p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))
                        :
                        Object.entries(searchData.results[tabIndex] ?? {}).map(([, data], index) => {
                          return (
                            <div key={index} className='mt-4'>
                              {
                                Array.isArray(data) && data.filter(_ => _).map((item, indexItem) => (
                                  <div className={`py-3 px-5 border-b border-secondary_dark_gray `}
                                       key={indexItem}
                                  >
                                    <Link
                                      to=''
                                      // to={`/artist/${item.id}/${item.title}${navigation ? `/${navigation}` : '/analytics'}`}
                                      onClick={() => {
                                        setRenderResultContent('detailed');
                                        setValue('');
                                       /* itemDataFetch({
                                          params: {
                                            itemId: item.id,
                                            itemName: encodeURI(item.name),
                                            imageUrl: encodeURI(item.imageUrl),
                                            type: item.type,
                                            idUnique: id
                                          }
                                        }).catch(console.error);*/
                                      }}
                                    >
                                      <div className="flex items-center gap-4">
                                        <img src={item.imageUrl} alt=''
                                             className={`w-11 h-11  ${item.type === 'city' ? 'rounded-lg ' : 'rounded-full'}`}/>
                                        <div className="">
                                          <h3 className="text-t2Regular truncate">{item.name}</h3>
                                          <p className="text-caption_s_desk text-medium_grey capitalize">{item.type}</p>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                ))
                              }
                            </div>

                          );
                        })
                    }
                  </div>
                )
              }
              {
                (Boolean(generalSearchData.length) && value) && (
                  <div
                    onClick={handleClickAllResults}
                    className='py-5 px-5 bg-popup_gray cursor-pointer rounded-b-xl border-t border-secondary_dark_gray flex gap-2 items-center max-w-[35.25rem]'>
                    <p className='text-btnText'>Смотреть все результаты</p>
                    <ChevronRight className='stroke-white w-5'/>
                  </div>
                )
              }
            </div>
          </div>
          {
            Object.keys(valueAllResults).length === 0 && (
              <div className='w-full flex flex-col gap-4'>
                <h1 className='text-btnText'>Популярные города</h1>
                <div>
                  <div className='flex flex-wrap max-w-[37rem] gap-y-4 gap-x-6'>
                    {
                      data.cities.filter((_, index) => index < 10).map((city, index) => (
                        <div className='py-3 px-4 bg-[#27272780] rounded-xl flex justify-between w-fit gap-12'
                             key={index}>
                          <div className='flex gap-2 items-center'>
                            <GlobeIcon className='fill-yellow w-11'/>
                            <p className='text-t2Regular'>{city.name.split(',').shift()}</p>
                          </div>
                          <div className=''>
                            <p className='text-caption_r_desk text-medium_grey text-right'>{city.artists.length}+</p>
                            <p className='text-caption_r_desk text-medium_grey'>событий</p>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </section>
      <section>
        {(() => {
          switch (renderResultContent) {
            case 'all':
              return <AllSearchResults/>
            case 'detailed':
              return <DetailedResult/>
          }
        })()}
      </section>
    </div>
  )
})
export default Places
