import {memo} from "react";

const recommendedData = {
  "result": "success",
    "message": "Data retrieved.",
    "playlists": [
    {
      "id": 30081925,
      "primaryText": "Crossfit Games 2024 I WOD I Pumping Iron Workout",
      "secondaryText": "playthefunkymusic",
      "valueText": "58.9K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84258f6e8565a2283e9cb223b0",
      "popupType": "spotify_playlist",
      "popupIdUnique": "4J6iGE2WDbwCKnSiEX8ItG",
      "popupStyle": "playlist"
    },
    {
      "id": 60068574,
      "primaryText": "ACOUSTIC ROCK - UNPLUGGED 2024",
      "secondaryText": "Freak4Music",
      "valueText": "45.2K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84859bc00f706b673dbff7b3bf",
      "popupType": "spotify_playlist",
      "popupIdUnique": "6BZtUvgDkQhH6SIM3vWz7D",
      "popupStyle": "playlist"
    },
    {
      "id": 70180258,
      "primaryText": "NATTY GYM 🔱 TEST BOOST 🦍 ",
      "secondaryText": "GYMBROS ☠️ funa",
      "valueText": "161K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84c55fc516f776baa3642b8bab",
      "popupType": "spotify_playlist",
      "popupIdUnique": "26J2RmTi4vRQ5FXTZLVs66",
      "popupStyle": "playlist"
    },
    {
      "id": 6026589,
      "primaryText": "Rolling Stone Magazine - 500 Greatest Songs of All Time (2021)",
      "secondaryText": "Henrik B. Hansen",
      "valueText": "20.5K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84c9913b7c784b3f6ed70b666c",
      "popupType": "spotify_playlist",
      "popupIdUnique": "7EAqBCOVkDZcbccjxZmgjp",
      "popupStyle": "playlist"
    },
    {
      "id": 70290932,
      "primaryText": "hALLOWEEN is on a tHuRsDaY",
      "secondaryText": "lauren leb",
      "valueText": "13.3K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8439f28d1bffefba6bb67045dd",
      "popupType": "spotify_playlist",
      "popupIdUnique": "6Ygc2pmTimPn6hc1lUMDhJ",
      "popupStyle": "playlist"
    },
    {
      "id": 4024409,
      "primaryText": "Best of the 2000s",
      "secondaryText": "Keanu Backhus",
      "valueText": "12.9K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84a1916927892b75514f20589d",
      "popupType": "spotify_playlist",
      "popupIdUnique": "1G5216HeWXrSXm3uybVcg6",
      "popupStyle": "playlist"
    },
    {
      "id": 60273932,
      "primaryText": "Playboi Carti All Red",
      "secondaryText": "Trending Playlists",
      "valueText": "10.4K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84cb67f8441c363d857a94ab83",
      "popupType": "spotify_playlist",
      "popupIdUnique": "08AURogtGBQlaSOzVgHNAP",
      "popupStyle": "playlist"
    },
    {
      "id": 30302892,
      "primaryText": "PC",
      "secondaryText": "Slimb",
      "valueText": "14.9K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8465b835a01113f56c4e9ee5aa",
      "popupType": "spotify_playlist",
      "popupIdUnique": "4l3qnFwQoib2LPhD5ar7C2",
      "popupStyle": "playlist"
    },
    {
      "id": 70375291,
      "primaryText": "No name",
      "secondaryText": "WAVR.AI",
      "valueText": "25.9K Followers",
      "imageUrl": "https://mosaic.scdn.co/120/ab67616d00001e02235f995865eedfb0d9da18c7ab67616d00001e02307782dc8a0b27d0b2f9fa66ab67616d00001e026c1f1d0bcb122102c7d29c50ab67616d00001e028e7b4bf3e1c5f0b20d52e6f9",
      "popupType": "spotify_playlist",
      "popupIdUnique": "5s9oySkkyZsCfWPKbOmK1g",
      "popupStyle": "playlist"
    },
    {
      "id": 30351431,
      "primaryText": "New Scene Sunday ",
      "secondaryText": "Jesea Lee",
      "valueText": "20K Followers",
      "imageUrl": "https://image-cdn-fa.spotifycdn.com/image/ab67706c0000da84e735fa910b0705704536427d",
      "popupType": "spotify_playlist",
      "popupIdUnique": "6Wv3wOz2WnduRGfopyP4Ap",
      "popupStyle": "playlist"
    },
    {
      "id": 70346519,
      "primaryText": "ROCK MUSIC",
      "secondaryText": "Eternitynetwork",
      "valueText": "16.2K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72c5a3443216df097076bd4bebc",
      "popupType": "spotify_playlist",
      "popupIdUnique": "41pYAHQ2eQqjcLy2xyODDR",
      "popupStyle": "playlist"
    },
    {
      "id": 70363823,
      "primaryText": "making disgusting gainz",
      "secondaryText": "Lindsay Goeler",
      "valueText": "30.7K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da846dd941d52102d8effe7b079f",
      "popupType": "spotify_playlist",
      "popupIdUnique": "74UshLnIHOuceLjJggxi8T",
      "popupStyle": "playlist"
    },
    {
      "id": 203335,
      "primaryText": "Classic Rock Greatest Hits",
      "secondaryText": "Scott Pruden",
      "valueText": "311K Followers",
      "imageUrl": "https://mosaic.scdn.co/120/ab67616d00001e0205d4eec40a828850aa8cd2f7ab67616d00001e02a1d9c9969f2a7ed27e449a3cab67616d00001e02dc30583ba717007b00cceb25ab67616d00001e02fc4f17340773c6c3579fea0d",
      "popupType": "spotify_playlist",
      "popupIdUnique": "6TeyryiZ2UEf3CbLXyztFA",
      "popupStyle": "playlist"
    },
    {
      "id": 60310215,
      "primaryText": "Heavy METAL PESADO para entrenar⚡️treinar GYM",
      "secondaryText": "🔱 THEOCIDE STUDIOS 🔱",
      "valueText": "34.7K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da844357472111ff85dacc03effc",
      "popupType": "spotify_playlist",
      "popupIdUnique": "22BOAu9B27uA23c9IH7byE",
      "popupStyle": "playlist"
    },
    {
      "id": 5035987,
      "primaryText": "WAHALA ROOM Hot 100 | Afrobeats 2020 | Dancehall | Afroswing | Bangers 🔥 BaitList",
      "secondaryText": "Samuel Ogunkoya",
      "valueText": "18K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84a45895a1d9b38b2897f3f664",
      "popupType": "spotify_playlist",
      "popupIdUnique": "6bwG6NiDFGxJlFPSvxKZcX",
      "popupStyle": "playlist"
    },
    {
      "id": 203504,
      "primaryText": "Sub Pop Suggests",
      "secondaryText": "Sub Pop",
      "valueText": "10.6K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84f755ce669e6da97b2b379cc5",
      "popupType": "spotify_playlist",
      "popupIdUnique": "5JBt8ExhMgs6tpYwPXYGwM",
      "popupStyle": "playlist"
    },
    {
      "id": 70460223,
      "primaryText": "Rock Nostalgia 🎸🤘| Rock Nacional e Internacional | 90' , 2000' , 2010'",
      "secondaryText": "Fritz Playlists",
      "valueText": "21.7K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84dd185796eb245ff719d8052d",
      "popupType": "spotify_playlist",
      "popupIdUnique": "6eE83z5LuP3kW7gMUWZ5ua",
      "popupStyle": "playlist"
    },
    {
      "id": 70463259,
      "primaryText": "Let's Rock",
      "secondaryText": "Miskov",
      "valueText": "11.4K Followers",
      "imageUrl": "https://image-cdn-fa.spotifycdn.com/image/ab67706c0000da847c109b865338ce7910c07e86",
      "popupType": "spotify_playlist",
      "popupIdUnique": "2UHkzQeOxnBJOObvPbzdhf",
      "popupStyle": "playlist"
    },
    {
      "id": 30513,
      "primaryText": "Paraguay Top 40 - Só Fé, UWAIE, SE ME OLVIDA, Love Me Again, Piel",
      "secondaryText": "PLAYLISTED",
      "valueText": "10.9K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72c36d769ae2bb101bcbcaf1645",
      "popupType": "spotify_playlist",
      "popupIdUnique": "2jgCKGKaFs8IFJqVJW7Bc4",
      "popupStyle": "playlist"
    },
    {
      "id": 70501978,
      "primaryText": "Lost Symphonies: a Symphonic Metal Saga",
      "secondaryText": "HugoBass83",
      "valueText": "10.5K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8462a574a2750c41333f9f0741",
      "popupType": "spotify_playlist",
      "popupIdUnique": "0kqHpuYnjbfFgT96INXd7R",
      "popupStyle": "playlist"
    },
    {
      "id": 10559875,
      "primaryText": "Rock EREC",
      "secondaryText": "El Rock Es Cultura",
      "valueText": "18.7K Followers",
      "imageUrl": "https://mosaic.scdn.co/120/ab67616d00001e0228b2637e7ca2182a1dbcf8e7ab67616d00001e024a5e7d0c4b87c01cf5dc6519ab67616d00001e02c8a11e48c91a982d086afc69ab67616d00001e02dd507a2a323ee185356b0ef5",
      "popupType": "spotify_playlist",
      "popupIdUnique": "6X2Lmq9OjIkYhOCBAoALpa",
      "popupStyle": "playlist"
    },
    {
      "id": 80660683,
      "primaryText": "Metal Mix",
      "secondaryText": "MRNA",
      "valueText": "42.1K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da842339da188e1051ff1b2c6f0b",
      "popupType": "spotify_playlist",
      "popupIdUnique": "1s45F2SMbFsiWANWZz9oWX",
      "popupStyle": "playlist"
    },
    {
      "id": 506555,
      "primaryText": "No name",
      "secondaryText": "Stephen Holland",
      "valueText": "65.9K Followers",
      "imageUrl": "https://mosaic.scdn.co/120/ab67616d00001e028be268d3513e3be254727ab8ab67616d00001e02a82120c595afebd8513a7534ab67616d00001e02cbd1eabeaac100f9507df5caab67616d00001e02f403428ab2a0617b355d4ac7",
      "popupType": "spotify_playlist",
      "popupIdUnique": "3YouF0u7waJnolytf9JCXf",
      "popupStyle": "playlist"
    },
    {
      "id": 70767817,
      "primaryText": "TRAP BR ACADEMIA 🏋🏻🔥",
      "secondaryText": "@taxles",
      "valueText": "13.8K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8442af4b05362421d7e9ef7431",
      "popupType": "spotify_playlist",
      "popupIdUnique": "7zpAcfBpAT6e0bMpmU3eBA",
      "popupStyle": "playlist"
    }
  ],
    "recommendations": [
    {
      "id": 30081925,
      "primaryText": "Crossfit Games 2024 I WOD I Pumping Iron Workout",
      "secondaryText": "playthefunkymusic",
      "valueText": "58.9K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84258f6e8565a2283e9cb223b0",
      "popupType": "spotify_playlist",
      "popupIdUnique": "4J6iGE2WDbwCKnSiEX8ItG",
      "popupStyle": "playlist"
    },
    {
      "id": 60068574,
      "primaryText": "ACOUSTIC ROCK - UNPLUGGED 2024",
      "secondaryText": "Freak4Music",
      "valueText": "45.2K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84859bc00f706b673dbff7b3bf",
      "popupType": "spotify_playlist",
      "popupIdUnique": "6BZtUvgDkQhH6SIM3vWz7D",
      "popupStyle": "playlist"
    },
    {
      "id": 70180258,
      "primaryText": "NATTY GYM 🔱 TEST BOOST 🦍 ",
      "secondaryText": "GYMBROS ☠️ funa",
      "valueText": "161K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84c55fc516f776baa3642b8bab",
      "popupType": "spotify_playlist",
      "popupIdUnique": "26J2RmTi4vRQ5FXTZLVs66",
      "popupStyle": "playlist"
    },
    {
      "id": 6026589,
      "primaryText": "Rolling Stone Magazine - 500 Greatest Songs of All Time (2021)",
      "secondaryText": "Henrik B. Hansen",
      "valueText": "20.5K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84c9913b7c784b3f6ed70b666c",
      "popupType": "spotify_playlist",
      "popupIdUnique": "7EAqBCOVkDZcbccjxZmgjp",
      "popupStyle": "playlist"
    },
    {
      "id": 70290932,
      "primaryText": "hALLOWEEN is on a tHuRsDaY",
      "secondaryText": "lauren leb",
      "valueText": "13.3K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8439f28d1bffefba6bb67045dd",
      "popupType": "spotify_playlist",
      "popupIdUnique": "6Ygc2pmTimPn6hc1lUMDhJ",
      "popupStyle": "playlist"
    },
    {
      "id": 4024409,
      "primaryText": "Best of the 2000s",
      "secondaryText": "Keanu Backhus",
      "valueText": "12.9K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84a1916927892b75514f20589d",
      "popupType": "spotify_playlist",
      "popupIdUnique": "1G5216HeWXrSXm3uybVcg6",
      "popupStyle": "playlist"
    },
    {
      "id": 60273932,
      "primaryText": "Playboi Carti All Red",
      "secondaryText": "Trending Playlists",
      "valueText": "10.4K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84cb67f8441c363d857a94ab83",
      "popupType": "spotify_playlist",
      "popupIdUnique": "08AURogtGBQlaSOzVgHNAP",
      "popupStyle": "playlist"
    },
    {
      "id": 30302892,
      "primaryText": "PC",
      "secondaryText": "Slimb",
      "valueText": "14.9K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8465b835a01113f56c4e9ee5aa",
      "popupType": "spotify_playlist",
      "popupIdUnique": "4l3qnFwQoib2LPhD5ar7C2",
      "popupStyle": "playlist"
    },
    {
      "id": 70375291,
      "primaryText": "No name",
      "secondaryText": "WAVR.AI",
      "valueText": "25.9K Followers",
      "imageUrl": "https://mosaic.scdn.co/120/ab67616d00001e02235f995865eedfb0d9da18c7ab67616d00001e02307782dc8a0b27d0b2f9fa66ab67616d00001e026c1f1d0bcb122102c7d29c50ab67616d00001e028e7b4bf3e1c5f0b20d52e6f9",
      "popupType": "spotify_playlist",
      "popupIdUnique": "5s9oySkkyZsCfWPKbOmK1g",
      "popupStyle": "playlist"
    },
    {
      "id": 30351431,
      "primaryText": "New Scene Sunday ",
      "secondaryText": "Jesea Lee",
      "valueText": "20K Followers",
      "imageUrl": "https://image-cdn-fa.spotifycdn.com/image/ab67706c0000da84e735fa910b0705704536427d",
      "popupType": "spotify_playlist",
      "popupIdUnique": "6Wv3wOz2WnduRGfopyP4Ap",
      "popupStyle": "playlist"
    },
    {
      "id": 70346519,
      "primaryText": "ROCK MUSIC",
      "secondaryText": "Eternitynetwork",
      "valueText": "16.2K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72c5a3443216df097076bd4bebc",
      "popupType": "spotify_playlist",
      "popupIdUnique": "41pYAHQ2eQqjcLy2xyODDR",
      "popupStyle": "playlist"
    },
    {
      "id": 70363823,
      "primaryText": "making disgusting gainz",
      "secondaryText": "Lindsay Goeler",
      "valueText": "30.7K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da846dd941d52102d8effe7b079f",
      "popupType": "spotify_playlist",
      "popupIdUnique": "74UshLnIHOuceLjJggxi8T",
      "popupStyle": "playlist"
    },
    {
      "id": 203335,
      "primaryText": "Classic Rock Greatest Hits",
      "secondaryText": "Scott Pruden",
      "valueText": "311K Followers",
      "imageUrl": "https://mosaic.scdn.co/120/ab67616d00001e0205d4eec40a828850aa8cd2f7ab67616d00001e02a1d9c9969f2a7ed27e449a3cab67616d00001e02dc30583ba717007b00cceb25ab67616d00001e02fc4f17340773c6c3579fea0d",
      "popupType": "spotify_playlist",
      "popupIdUnique": "6TeyryiZ2UEf3CbLXyztFA",
      "popupStyle": "playlist"
    },
    {
      "id": 60310215,
      "primaryText": "Heavy METAL PESADO para entrenar⚡️treinar GYM",
      "secondaryText": "🔱 THEOCIDE STUDIOS 🔱",
      "valueText": "34.7K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da844357472111ff85dacc03effc",
      "popupType": "spotify_playlist",
      "popupIdUnique": "22BOAu9B27uA23c9IH7byE",
      "popupStyle": "playlist"
    },
    {
      "id": 5035987,
      "primaryText": "WAHALA ROOM Hot 100 | Afrobeats 2020 | Dancehall | Afroswing | Bangers 🔥 BaitList",
      "secondaryText": "Samuel Ogunkoya",
      "valueText": "18K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84a45895a1d9b38b2897f3f664",
      "popupType": "spotify_playlist",
      "popupIdUnique": "6bwG6NiDFGxJlFPSvxKZcX",
      "popupStyle": "playlist"
    },
    {
      "id": 203504,
      "primaryText": "Sub Pop Suggests",
      "secondaryText": "Sub Pop",
      "valueText": "10.6K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84f755ce669e6da97b2b379cc5",
      "popupType": "spotify_playlist",
      "popupIdUnique": "5JBt8ExhMgs6tpYwPXYGwM",
      "popupStyle": "playlist"
    },
    {
      "id": 70460223,
      "primaryText": "Rock Nostalgia 🎸🤘| Rock Nacional e Internacional | 90' , 2000' , 2010'",
      "secondaryText": "Fritz Playlists",
      "valueText": "21.7K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84dd185796eb245ff719d8052d",
      "popupType": "spotify_playlist",
      "popupIdUnique": "6eE83z5LuP3kW7gMUWZ5ua",
      "popupStyle": "playlist"
    },
    {
      "id": 70463259,
      "primaryText": "Let's Rock",
      "secondaryText": "Miskov",
      "valueText": "11.4K Followers",
      "imageUrl": "https://image-cdn-fa.spotifycdn.com/image/ab67706c0000da847c109b865338ce7910c07e86",
      "popupType": "spotify_playlist",
      "popupIdUnique": "2UHkzQeOxnBJOObvPbzdhf",
      "popupStyle": "playlist"
    },
    {
      "id": 30513,
      "primaryText": "Paraguay Top 40 - Só Fé, UWAIE, SE ME OLVIDA, Love Me Again, Piel",
      "secondaryText": "PLAYLISTED",
      "valueText": "10.9K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72c36d769ae2bb101bcbcaf1645",
      "popupType": "spotify_playlist",
      "popupIdUnique": "2jgCKGKaFs8IFJqVJW7Bc4",
      "popupStyle": "playlist"
    },
    {
      "id": 70501978,
      "primaryText": "Lost Symphonies: a Symphonic Metal Saga",
      "secondaryText": "HugoBass83",
      "valueText": "10.5K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8462a574a2750c41333f9f0741",
      "popupType": "spotify_playlist",
      "popupIdUnique": "0kqHpuYnjbfFgT96INXd7R",
      "popupStyle": "playlist"
    },
    {
      "id": 10559875,
      "primaryText": "Rock EREC",
      "secondaryText": "El Rock Es Cultura",
      "valueText": "18.7K Followers",
      "imageUrl": "https://mosaic.scdn.co/120/ab67616d00001e0228b2637e7ca2182a1dbcf8e7ab67616d00001e024a5e7d0c4b87c01cf5dc6519ab67616d00001e02c8a11e48c91a982d086afc69ab67616d00001e02dd507a2a323ee185356b0ef5",
      "popupType": "spotify_playlist",
      "popupIdUnique": "6X2Lmq9OjIkYhOCBAoALpa",
      "popupStyle": "playlist"
    },
    {
      "id": 80660683,
      "primaryText": "Metal Mix",
      "secondaryText": "MRNA",
      "valueText": "42.1K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da842339da188e1051ff1b2c6f0b",
      "popupType": "spotify_playlist",
      "popupIdUnique": "1s45F2SMbFsiWANWZz9oWX",
      "popupStyle": "playlist"
    },
    {
      "id": 506555,
      "primaryText": "No name",
      "secondaryText": "Stephen Holland",
      "valueText": "65.9K Followers",
      "imageUrl": "https://mosaic.scdn.co/120/ab67616d00001e028be268d3513e3be254727ab8ab67616d00001e02a82120c595afebd8513a7534ab67616d00001e02cbd1eabeaac100f9507df5caab67616d00001e02f403428ab2a0617b355d4ac7",
      "popupType": "spotify_playlist",
      "popupIdUnique": "3YouF0u7waJnolytf9JCXf",
      "popupStyle": "playlist"
    },
    {
      "id": 70767817,
      "primaryText": "TRAP BR ACADEMIA 🏋🏻🔥",
      "secondaryText": "@taxles",
      "valueText": "13.8K Followers",
      "imageUrl": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8442af4b05362421d7e9ef7431",
      "popupType": "spotify_playlist",
      "popupIdUnique": "7zpAcfBpAT6e0bMpmU3eBA",
      "popupStyle": "playlist"
    }
  ],
    "filters": {
    "source": "spotify",
      "neverBeenIn": false,
      "followers": "10000",
      "contactInfoType": "any",
      "songPopularityType": "na",
      "songReleaseDateType": "na",
      "editorial": false
  }
}

const RecommendedPlaylists = memo(() => {
  return (
    <></>
  )
})
export default RecommendedPlaylists
