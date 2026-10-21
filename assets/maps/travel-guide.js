/* Station access and indicative rail corridors; see sources below. */
const TRAVEL_GUIDE = {
  "checked": "2026-10-21",
  "note": "Planning routes, not live timetable routing. Walking / riding ranges are estimates; station layout, crowds and hotel entrances affect time. Candidate-area walks remain unknown.",
  "stations": {
    "iriya": "Iriya Station",
    "ueno": "Ueno Station",
    "akihabara": "Akihabara Station",
    "ginza": "Ginza Station",
    "tawaramachi": "Tawaramachi Station",
    "asakusa": "Asakusa Station (Tokyo Metro / Toei)",
    "shibuya": "Shibuya Station",
    "tokyo": "Tokyo Station",
    "shinjuku": "Shinjuku Station",
    "sanchome": "Shinjuku-sanchome Station",
    "seibu": "Seibu-Shinjuku Station",
    "nippori": "Nippori Station",
    "kuramae": "Kuramae Station",
    "kitasenju": "Kita-Senju Station",
    "kasukabe": "Kasukabe Station",
    "narita": "Narita Airport Terminal 2·3 Station",
    "kyoto": "Kyoto Station (JR / subway)",
    "seta": "Seta Station (JR)",
    "ishiyama": "Ishiyama Station (JR)",
    "zeze": "Zeze Station (JR)",
    "otsu": "Otsu Station (JR)",
    "yamashina": "Yamashina Station (JR / Tozai subway)",
    "hamaotsu": "Biwako-Hamaotsu Station (Keihan)",
    "kamisakae": "Kamisakaemachi Station (Keihan)",
    "sanjo": "Sanjo Keihan Station (Tozai subway)",
    "keihansanjo": "Sanjo Station (Keihan)",
    "gionshijo": "Gion-Shijo Station (Keihan)",
    "shijo": "Shijo Station (Karasuma subway)",
    "karasuma": "Karasuma Station (Hankyu)",
    "karasumaoike": "Karasuma Oike Station (subway)",
    "nijo": "Nijo Station (JR / Tozai subway)",
    "saga": "Saga-Arashiyama Station (JR)",
    "umahori": "Umahori Station (JR)",
    "hankyu_arashiyama": "Arashiyama Station (Hankyu)",
    "katsura": "Katsura Station (Hankyu)",
    "inari": "Inari Station (JR)",
    "fushimi": "Fushimi-Inari Station (Keihan)",
    "tofukuji": "Tofukuji Station (JR / Keihan)",
    "shichijo": "Shichijo Station (Keihan)",
    "kiyomizugojo": "Kiyomizu-Gojo Station (Keihan)",
    "osaka": "Osaka Station (JR)",
    "shin_osaka": "Shin-Osaka Station (JR / Shinkansen)",
    "umeda": "Umeda Station (Osaka Metro)",
    "namba": "Namba Station (Osaka Metro)",
    "osaka_namba": "Osaka-Namba Station (Kintetsu / Hanshin)",
    "nankai_namba": "Namba Station (Nankai)",
    "dobutsuen": "Dobutsuen-mae Station (Osaka Metro)",
    "shinimamiya": "Shin-Imamiya Station (JR / Nankai)",
    "tennoji": "Tennoji Station (JR / Osaka Metro)",
    "nishikujo": "Nishikujo Station (JR / Hanshin)",
    "universal": "Universal City Station (JR)",
    "kyobashi": "Kyobashi Station (JR / Keihan)",
    "yodoyabashi": "Yodoyabashi Station (Osaka Metro / Keihan)",
    "kix": "Kansai-airport Station (JR / Nankai)"
  },
  "edges": [
    {
      "a": "iriya",
      "b": "ueno",
      "line": "Tokyo Metro Hibiya Line (subway)",
      "minutes": [
        2,
        3
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "ueno",
      "b": "akihabara",
      "line": "Tokyo Metro Hibiya Line (subway)",
      "minutes": [
        3,
        5
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "akihabara",
      "b": "ginza",
      "line": "Tokyo Metro Hibiya Line (subway)",
      "minutes": [
        13,
        17
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "iriya",
      "b": "kitasenju",
      "line": "Tokyo Metro Hibiya Line (subway)",
      "minutes": [
        11,
        15
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "asakusa",
      "b": "tawaramachi",
      "line": "Tokyo Metro Ginza Line (subway)",
      "minutes": [
        2,
        3
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "tawaramachi",
      "b": "ueno",
      "line": "Tokyo Metro Ginza Line (subway)",
      "minutes": [
        3,
        5
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "ueno",
      "b": "ginza",
      "line": "Tokyo Metro Ginza Line (subway)",
      "minutes": [
        19,
        23
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "ginza",
      "b": "shibuya",
      "line": "Tokyo Metro Ginza Line (subway)",
      "minutes": [
        15,
        20
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "ueno",
      "b": "akihabara",
      "line": "JR Yamanote Line (city train)",
      "minutes": [
        3,
        5
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "akihabara",
      "b": "tokyo",
      "line": "JR Yamanote Line (city train)",
      "minutes": [
        4,
        6
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "ueno",
      "b": "nippori",
      "line": "JR Yamanote Line (city train)",
      "minutes": [
        3,
        5
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "shinjuku",
      "b": "shibuya",
      "line": "JR Yamanote Line (city train)",
      "minutes": [
        6,
        9
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "tokyo",
      "b": "shinjuku",
      "line": "JR Chuo Line Rapid (city train)",
      "minutes": [
        13,
        17
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "tokyo",
      "b": "ginza",
      "line": "Tokyo Metro Marunouchi Line (subway)",
      "minutes": [
        2,
        4
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "ginza",
      "b": "sanchome",
      "line": "Tokyo Metro Marunouchi Line (subway)",
      "minutes": [
        16,
        21
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "sanchome",
      "b": "shinjuku",
      "line": "Tokyo Metro Marunouchi Line (subway)",
      "minutes": [
        2,
        3
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "shibuya",
      "b": "sanchome",
      "line": "Tokyo Metro Fukutoshin Line (subway)",
      "minutes": [
        7,
        12
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "shinjuku",
      "b": "seibu",
      "line": "Walk between separate stations",
      "minutes": [
        8,
        12
      ],
      "note": "",
      "ticket": "walk"
    },
    {
      "a": "asakusa",
      "b": "kuramae",
      "line": "Toei Asakusa Line (subway)",
      "minutes": [
        2,
        3
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "kitasenju",
      "b": "kasukabe",
      "line": "Tobu Skytree Line ordinary express / semi-express",
      "minutes": [
        30,
        40
      ],
      "note": "Choose a service stopping at Kasukabe; some departures need a change. Limited-express trains require an extra ticket.",
      "ticket": "ic"
    },
    {
      "a": "narita",
      "b": "asakusa",
      "line": "Keisei Access Express → Toei Asakusa Line through service",
      "minutes": [
        55,
        75
      ],
      "note": "Between Narita and Asakusa, choose a direct through service for your direction; not every departure serves both. Check your flight terminal.",
      "ticket": "ic"
    },
    {
      "a": "narita",
      "b": "nippori",
      "line": "Keisei Skyliner (reserved airport train)",
      "minutes": [
        36,
        45
      ],
      "note": "Buy the Skyliner reserved-seat ticket plus fare.",
      "ticket": "reserved"
    },
    {
      "a": "seta",
      "b": "kyoto",
      "line": "JR Biwako Line (regional train)",
      "minutes": [
        17,
        20
      ],
      "note": "Use a train that stops at both stations; Special Rapid skips Seta and Zeze.",
      "ticket": "ic"
    },
    {
      "a": "seta",
      "b": "yamashina",
      "line": "JR Biwako Line (regional train)",
      "minutes": [
        12,
        16
      ],
      "note": "Use a train that stops at both stations; Special Rapid skips Seta and Zeze.",
      "ticket": "ic"
    },
    {
      "a": "ishiyama",
      "b": "kyoto",
      "line": "JR Biwako Line (regional train)",
      "minutes": [
        14,
        18
      ],
      "note": "Use a train that stops at both stations; Special Rapid skips Seta and Zeze.",
      "ticket": "ic"
    },
    {
      "a": "ishiyama",
      "b": "yamashina",
      "line": "JR Biwako Line (regional train)",
      "minutes": [
        9,
        13
      ],
      "note": "Use a train that stops at both stations; Special Rapid skips Seta and Zeze.",
      "ticket": "ic"
    },
    {
      "a": "otsu",
      "b": "kyoto",
      "line": "JR Biwako Line (regional train)",
      "minutes": [
        9,
        12
      ],
      "note": "Use a train that stops at both stations; Special Rapid skips Seta and Zeze.",
      "ticket": "ic"
    },
    {
      "a": "otsu",
      "b": "yamashina",
      "line": "JR Biwako Line (regional train)",
      "minutes": [
        4,
        6
      ],
      "note": "Use a train that stops at both stations; Special Rapid skips Seta and Zeze.",
      "ticket": "ic"
    },
    {
      "a": "seta",
      "b": "ishiyama",
      "line": "JR Biwako Line (regional train)",
      "minutes": [
        3,
        4
      ],
      "note": "Use a train that stops at both stations; Special Rapid skips Seta and Zeze.",
      "ticket": "ic"
    },
    {
      "a": "ishiyama",
      "b": "zeze",
      "line": "JR Biwako Line (regional train)",
      "minutes": [
        2,
        4
      ],
      "note": "Use a train that stops at both stations; Special Rapid skips Seta and Zeze.",
      "ticket": "ic"
    },
    {
      "a": "zeze",
      "b": "otsu",
      "line": "JR Biwako Line (regional train)",
      "minutes": [
        2,
        3
      ],
      "note": "Use a train that stops at both stations; Special Rapid skips Seta and Zeze.",
      "ticket": "ic"
    },
    {
      "a": "yamashina",
      "b": "kyoto",
      "line": "JR Biwako Line (regional train)",
      "minutes": [
        5,
        7
      ],
      "note": "Use a train that stops at both stations; Special Rapid skips Seta and Zeze.",
      "ticket": "ic"
    },
    {
      "a": "hamaotsu",
      "b": "kamisakae",
      "line": "Keihan Keishin Line",
      "minutes": [
        2,
        3
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "kamisakae",
      "b": "yamashina",
      "line": "Keihan Keishin Line",
      "minutes": [
        13,
        17
      ],
      "note": "Keihan-Yamashina and JR/subway Yamashina are separate entrances.",
      "ticket": "ic"
    },
    {
      "a": "yamashina",
      "b": "sanjo",
      "line": "Kyoto Subway Tozai Line",
      "minutes": [
        9,
        12
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "sanjo",
      "b": "karasumaoike",
      "line": "Kyoto Subway Tozai Line",
      "minutes": [
        4,
        6
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "karasumaoike",
      "b": "nijo",
      "line": "Kyoto Subway Tozai Line",
      "minutes": [
        5,
        7
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "kyoto",
      "b": "shijo",
      "line": "Kyoto Subway Karasuma Line",
      "minutes": [
        4,
        5
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "shijo",
      "b": "karasumaoike",
      "line": "Kyoto Subway Karasuma Line",
      "minutes": [
        2,
        3
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "shijo",
      "b": "karasuma",
      "line": "Walk between connected stations",
      "minutes": [
        3,
        6
      ],
      "note": "",
      "ticket": "walk"
    },
    {
      "a": "karasuma",
      "b": "katsura",
      "line": "Hankyu Kyoto Line",
      "minutes": [
        7,
        12
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "katsura",
      "b": "hankyu_arashiyama",
      "line": "Hankyu Arashiyama Line",
      "minutes": [
        7,
        9
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "kyoto",
      "b": "nijo",
      "line": "JR Sagano Line (San-in Main Line)",
      "minutes": [
        6,
        9
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "nijo",
      "b": "saga",
      "line": "JR Sagano Line (San-in Main Line)",
      "minutes": [
        10,
        15
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "saga",
      "b": "umahori",
      "line": "JR Sagano Line (San-in Main Line)",
      "minutes": [
        8,
        12
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "kyoto",
      "b": "tofukuji",
      "line": "JR Nara Line LOCAL",
      "minutes": [
        2,
        3
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "tofukuji",
      "b": "inari",
      "line": "JR Nara Line LOCAL",
      "minutes": [
        2,
        3
      ],
      "note": "Take a LOCAL train; rapid services skip Inari.",
      "ticket": "ic"
    },
    {
      "a": "inari",
      "b": "fushimi",
      "line": "Walk between separate JR / Keihan stations",
      "minutes": [
        5,
        8
      ],
      "note": "",
      "ticket": "walk"
    },
    {
      "a": "sanjo",
      "b": "keihansanjo",
      "line": "Walk between connected subway / Keihan stations",
      "minutes": [
        3,
        6
      ],
      "note": "",
      "ticket": "walk"
    },
    {
      "a": "keihansanjo",
      "b": "gionshijo",
      "line": "Keihan Main Line LOCAL / stopping train",
      "minutes": [
        2,
        3
      ],
      "note": "Check the stop list; limited express skips smaller stations.",
      "ticket": "ic"
    },
    {
      "a": "gionshijo",
      "b": "kiyomizugojo",
      "line": "Keihan Main Line LOCAL / stopping train",
      "minutes": [
        2,
        3
      ],
      "note": "Check the stop list; limited express skips smaller stations.",
      "ticket": "ic"
    },
    {
      "a": "kiyomizugojo",
      "b": "shichijo",
      "line": "Keihan Main Line LOCAL / stopping train",
      "minutes": [
        2,
        3
      ],
      "note": "Check the stop list; limited express skips smaller stations.",
      "ticket": "ic"
    },
    {
      "a": "shichijo",
      "b": "tofukuji",
      "line": "Keihan Main Line LOCAL / stopping train",
      "minutes": [
        2,
        4
      ],
      "note": "Check the stop list; limited express skips smaller stations.",
      "ticket": "ic"
    },
    {
      "a": "tofukuji",
      "b": "fushimi",
      "line": "Keihan Main Line LOCAL / stopping train",
      "minutes": [
        3,
        5
      ],
      "note": "Check the stop list; limited express skips smaller stations.",
      "ticket": "ic"
    },
    {
      "a": "kyobashi",
      "b": "keihansanjo",
      "line": "Keihan Main Line Limited Express (standard car)",
      "minutes": [
        45,
        55
      ],
      "note": "Standard cars need no seat reservation; Premium Car costs extra.",
      "ticket": "ic"
    },
    {
      "a": "kyobashi",
      "b": "yodoyabashi",
      "line": "Keihan Main Line",
      "minutes": [
        7,
        10
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "kyoto",
      "b": "osaka",
      "line": "JR Kyoto Line Special Rapid",
      "minutes": [
        28,
        35
      ],
      "note": "Osaka Station is the JR station beside Umeda; it is not Shin-Osaka.",
      "ticket": "ic"
    },
    {
      "a": "kyoto",
      "b": "shin_osaka",
      "line": "Tokaido Shinkansen Nozomi",
      "minutes": [
        13,
        16
      ],
      "note": "Separate Shinkansen ticket required.",
      "ticket": "shinkansen"
    },
    {
      "a": "tokyo",
      "b": "kyoto",
      "line": "Tokaido Shinkansen Nozomi",
      "minutes": [
        130,
        140
      ],
      "note": "Book your reserved seats and any required oversized-baggage area separately.",
      "ticket": "shinkansen"
    },
    {
      "a": "shin_osaka",
      "b": "osaka",
      "line": "JR Kyoto Line local / rapid",
      "minutes": [
        4,
        6
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "osaka",
      "b": "nishikujo",
      "line": "JR Osaka Loop Line (city train)",
      "minutes": [
        5,
        7
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "nishikujo",
      "b": "shinimamiya",
      "line": "JR Osaka Loop Line (city train)",
      "minutes": [
        9,
        13
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "shinimamiya",
      "b": "tennoji",
      "line": "JR Osaka Loop Line (city train)",
      "minutes": [
        2,
        4
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "osaka",
      "b": "kyobashi",
      "line": "JR Osaka Loop Line (city train)",
      "minutes": [
        6,
        9
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "nishikujo",
      "b": "universal",
      "line": "JR Yumesaki Line (also called JR Sakurajima Line)",
      "minutes": [
        5,
        7
      ],
      "note": "For USJ, board towards Sakurajima and get off at Universal City. Returning to Nishikujo, take the opposite direction.",
      "ticket": "ic"
    },
    {
      "a": "osaka_namba",
      "b": "nishikujo",
      "line": "Hanshin Namba Line",
      "minutes": [
        8,
        11
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "osaka",
      "b": "umeda",
      "line": "Walk between JR Osaka and Metro Umeda",
      "minutes": [
        5,
        10
      ],
      "note": "",
      "ticket": "walk"
    },
    {
      "a": "namba",
      "b": "osaka_namba",
      "line": "Walk between Metro and Kintetsu/Hanshin stations",
      "minutes": [
        5,
        10
      ],
      "note": "",
      "ticket": "walk"
    },
    {
      "a": "namba",
      "b": "nankai_namba",
      "line": "Walk between Metro and Nankai stations",
      "minutes": [
        5,
        10
      ],
      "note": "",
      "ticket": "walk"
    },
    {
      "a": "shinimamiya",
      "b": "dobutsuen",
      "line": "Walk between JR/Nankai and Metro stations",
      "minutes": [
        5,
        8
      ],
      "note": "",
      "ticket": "walk"
    },
    {
      "a": "umeda",
      "b": "yodoyabashi",
      "line": "Osaka Metro Midosuji Line (subway)",
      "minutes": [
        2,
        3
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "yodoyabashi",
      "b": "namba",
      "line": "Osaka Metro Midosuji Line (subway)",
      "minutes": [
        6,
        9
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "namba",
      "b": "dobutsuen",
      "line": "Osaka Metro Midosuji Line (subway)",
      "minutes": [
        4,
        6
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "dobutsuen",
      "b": "tennoji",
      "line": "Osaka Metro Midosuji Line (subway)",
      "minutes": [
        2,
        3
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "nankai_namba",
      "b": "shinimamiya",
      "line": "Nankai Main Line",
      "minutes": [
        2,
        4
      ],
      "note": "",
      "ticket": "ic"
    },
    {
      "a": "shinimamiya",
      "b": "kix",
      "line": "Nankai Airport Express",
      "minutes": [
        40,
        50
      ],
      "note": "Use the Airport Express towards Kansai Airport or Namba as appropriate; Rapi:t is a separate reserved-seat service.",
      "ticket": "ic"
    },
    {
      "a": "hamaotsu",
      "b": "sanjo",
      "line": "Keihan Keishin Line → Kyoto Subway Tozai Line through train",
      "minutes": [
        23,
        30
      ],
      "note": "On a through train serving Sanjo Keihan, stay aboard at Yamashina; check its destination.",
      "ticket": "ic"
    },
    {
      "a": "kamisakae",
      "b": "sanjo",
      "line": "Keihan Keishin Line → Kyoto Subway Tozai Line through train",
      "minutes": [
        21,
        28
      ],
      "note": "Use a through train serving Sanjo Keihan; no change at Yamashina on that service.",
      "ticket": "ic"
    }
  ],
  "access": {
    "tokyo-0": {
      "station": "asakusa",
      "walk": [
        5,
        10
      ],
      "note": "Walk via Kaminarimon Gate / Nakamise to the temple."
    },
    "tokyo-1": {
      "station": "tawaramachi",
      "walk": [
        5,
        10
      ],
      "note": "Southern end is about 5 min; the pinned street midpoint is farther."
    },
    "tokyo-2": {
      "station": "ginza",
      "walk": [
        5,
        10
      ],
      "note": "Confirm the exact Onitsuka embroidery branch before travel."
    },
    "tokyo-3": {
      "station": "shibuya",
      "walk": [
        5,
        10
      ],
      "note": "Follow Shibuya Scramble Square signs; allow extra lift / entry time for SKY."
    },
    "tokyo-4": {
      "station": "shibuya",
      "walk": [
        2,
        5
      ],
      "note": "Use Hachiko-side signs."
    },
    "tokyo-5": {
      "station": "shibuya",
      "walk": [
        8,
        12
      ],
      "note": ""
    },
    "tokyo-6": {
      "station": "akihabara",
      "walk": [
        2,
        5
      ],
      "note": "Electric Town exit."
    },
    "tokyo-7": {
      "station": "akihabara",
      "walk": [
        2,
        5
      ],
      "note": "Showa-dori / central-exit side."
    },
    "tokyo-8": {
      "station": "tokyo",
      "walk": [
        5,
        10
      ],
      "note": "Yaesu side / First Avenue; allow time inside the large station."
    },
    "tokyo-9": {
      "station": "iriya",
      "walk": [
        0,
        0
      ],
      "note": ""
    },
    "tokyo-10": {
      "station": "iriya",
      "walk": [
        8,
        12
      ],
      "note": "Approximate held apartment area; verify the actual entrance."
    },
    "tokyo-11": {
      "station": "shinjuku",
      "walk": [
        0,
        0
      ],
      "note": ""
    },
    "kasukabe-0": {
      "station": "kasukabe",
      "walk": [
        0,
        0
      ],
      "note": ""
    },
    "kasukabe-1": {
      "station": "kasukabe",
      "walk": [
        5,
        10
      ],
      "note": "West exit; allow another 5 min inside LaLa Garden to reach 3F."
    },
    "shinjuku-1": {
      "station": "shinjuku",
      "walk": [
        12,
        18
      ],
      "note": "West side, towards the Tokyo Metropolitan Government Building."
    },
    "shinjuku-2": {
      "station": "shinjuku",
      "walk": [
        3,
        6
      ],
      "note": "West / northwest side."
    },
    "shinjuku-3": {
      "station": "shinjuku",
      "walk": [
        8,
        12
      ],
      "note": "East side towards Kabukicho."
    },
    "shinjuku-4": {
      "station": "sanchome",
      "walk": [
        5,
        10
      ],
      "note": ""
    },
    "shinjuku-5": {
      "station": "sanchome",
      "walk": [
        5,
        10
      ],
      "note": "To Shinjuku Gate, not the centre of the park."
    },
    "shinjuku-6": {
      "station": "sanchome",
      "walk": [
        0,
        0
      ],
      "note": ""
    },
    "shinjuku-7": {
      "station": "seibu",
      "walk": [
        0,
        0
      ],
      "note": ""
    },
    "tokyo2": {
      "station": "ueno",
      "walk": null,
      "note": "Candidate neighbourhood only: hotel-to-station walk cannot be fixed until a hotel is chosen."
    },
    "kuramae": {
      "station": "kuramae",
      "walk": [
        3,
        10
      ],
      "note": "Cafe / shop location changes the final walk."
    },
    "yanaka": {
      "station": "nippori",
      "walk": [
        5,
        10
      ],
      "note": "West exit towards Yanaka Ginza."
    },
    "narita": {
      "station": "narita",
      "walk": [
        10,
        20
      ],
      "note": "From/to Terminal 2 arrivals; check the flight terminal and add time for airport procedures."
    },
    "kyoto-0": {
      "station": "kyoto",
      "walk": [
        0,
        0
      ],
      "note": ""
    },
    "kyoto-1": {
      "station": "kyoto",
      "walk": [
        15,
        20
      ],
      "note": "Planning allowance from JR platforms via Hachijo East exit; venue quotes about 7 min from that exit."
    },
    "kyoto-2": {
      "station": "inari",
      "walk": [
        1,
        3
      ],
      "note": "Shrine entrance is beside JR Inari; the torii trails add walking."
    },
    "kyoto-3": {
      "station": "kiyomizugojo",
      "walk": [
        25,
        35
      ],
      "note": "Uphill walk to the temple entrance; official access is about 25 min."
    },
    "kyoto-4": {
      "station": "kiyomizugojo",
      "walk": [
        20,
        30
      ],
      "note": "Hills / steps; allow more with crowds."
    },
    "kyoto-5": {
      "station": "gionshijo",
      "walk": [
        8,
        12
      ],
      "note": "East along Shijo-dori towards Yasaka Shrine.",
      "alternatives": [
        {
          "station": "sanjo",
          "walk": [
            15,
            20
          ],
          "note": "Walk through Gion towards Yasaka Shrine."
        }
      ]
    },
    "kyoto-6": {
      "station": "saga",
      "walk": [
        10,
        15
      ],
      "note": "",
      "alternatives": [
        {
          "station": "hankyu_arashiyama",
          "walk": [
            20,
            25
          ],
          "note": "Cross Togetsukyo Bridge towards the temple / bamboo-grove area."
        }
      ]
    },
    "kyoto-7": {
      "station": "saga",
      "walk": [
        12,
        18
      ],
      "note": "Tenryu-ji quotes 13 min; allow extra garden walking for Shigetsu.",
      "alternatives": [
        {
          "station": "hankyu_arashiyama",
          "walk": [
            12,
            18
          ],
          "note": "Cross Togetsukyo Bridge towards the temple / bamboo-grove area."
        }
      ]
    },
    "kyoto-8": {
      "station": "saga",
      "walk": [
        2,
        5
      ],
      "note": "Torokko Saga is beside JR Saga-Arashiyama; they have different tickets."
    },
    "kyoto-9": {
      "station": "hankyu_arashiyama",
      "walk": [
        8,
        12
      ],
      "note": ""
    },
    "kyoto-10": {
      "station": "sanjo",
      "walk": [
        0,
        0
      ],
      "note": ""
    },
    "kyoto-11": {
      "station": "shijo",
      "walk": [
        0,
        0
      ],
      "note": ""
    },
    "kyoto-12": {
      "station": "nijo",
      "walk": [
        0,
        0
      ],
      "note": ""
    },
    "kyoto-otsu-1": {
      "station": "yamashina",
      "walk": [
        0,
        0
      ],
      "note": ""
    },
    "kyoto-otsu-2": {
      "station": "otsu",
      "walk": [
        0,
        0
      ],
      "note": ""
    },
    "kyoto-otsu-3": {
      "station": "zeze",
      "walk": [
        0,
        0
      ],
      "note": ""
    },
    "kyoto-otsu-4": {
      "station": "ishiyama",
      "walk": [
        0,
        0
      ],
      "note": ""
    },
    "kyoto-otsu-5": {
      "station": "seta",
      "walk": [
        0,
        0
      ],
      "note": ""
    },
    "kyoto-otsu-6": {
      "station": "hamaotsu",
      "walk": [
        0,
        0
      ],
      "note": ""
    },
    "kyoto-otsu-7": {
      "station": "kamisakae",
      "walk": [
        0,
        0
      ],
      "note": ""
    },
    "kyoto-otsu-10": {
      "station": "umahori",
      "walk": [
        10,
        15
      ],
      "note": "Torokko Kameoka is separate from JR Umahori. For the scenic ride, book Torokko Saga → Torokko Kameoka separately."
    },
    "kyoto-otsu-11": {
      "station": "umahori",
      "walk": [
        0,
        0
      ],
      "note": ""
    },
    "smile-seta": {
      "station": "seta",
      "walk": [
        1,
        2
      ],
      "note": ""
    },
    "apa-seta": {
      "station": "seta",
      "walk": [
        1,
        2
      ],
      "note": ""
    },
    "lelac": {
      "station": "ishiyama",
      "walk": [
        2,
        3
      ],
      "note": ""
    },
    "otsu-area": {
      "station": "otsu",
      "walk": null,
      "note": "Candidate area only; walking time depends on the selected hotel."
    },
    "shijo-area": {
      "station": "shijo",
      "walk": null,
      "note": "Candidate area only; walking time depends on the selected hotel."
    },
    "sanjo-area": {
      "station": "sanjo",
      "walk": null,
      "note": "Candidate area only; walking time depends on the selected hotel."
    },
    "gion-area": {
      "station": "gionshijo",
      "walk": null,
      "note": "Candidate area only; walking time depends on the selected hotel."
    },
    "kenninji": {
      "station": "gionshijo",
      "walk": [
        5,
        10
      ],
      "note": ""
    },
    "shirakawa": {
      "station": "gionshijo",
      "walk": [
        5,
        8
      ],
      "note": ""
    },
    "biwa": {
      "station": "hamaotsu",
      "walk": [
        5,
        10
      ],
      "note": ""
    },
    "sanjo-ms": {
      "station": "sanjo",
      "walk": null,
      "note": "Approximate hotel area: confirm the booked property address before timing the walk."
    },
    "osaka-0": {
      "station": "universal",
      "walk": [
        5,
        10
      ],
      "note": "Walk to USJ entrance gates; the map pin is inside the park. Queue time is extra."
    },
    "osaka-1": {
      "station": "universal",
      "walk": [
        0,
        0
      ],
      "note": ""
    },
    "osaka-2": {
      "station": "osaka_namba",
      "walk": [
        0,
        0
      ],
      "note": ""
    },
    "osaka-3": {
      "station": "nankai_namba",
      "walk": [
        3,
        8
      ],
      "note": "Swissotel is above Nankai Namba; add lift time to Table36."
    },
    "osaka-4": {
      "station": "namba",
      "walk": [
        5,
        10
      ],
      "note": "Towards the canal / Glico sign."
    },
    "osaka-5": {
      "station": "namba",
      "walk": [
        10,
        15
      ],
      "note": "Den Den Town shopping district; individual stores vary."
    },
    "osaka-6": {
      "station": "namba",
      "walk": [
        5,
        10
      ],
      "note": ""
    },
    "osaka-7": {
      "station": "tennoji",
      "walk": [
        0,
        0
      ],
      "note": ""
    },
    "osaka-8": {
      "station": "shinimamiya",
      "walk": [
        0,
        0
      ],
      "note": ""
    },
    "osaka-9": {
      "station": "dobutsuen",
      "walk": [
        0,
        0
      ],
      "note": ""
    },
    "osaka-10": {
      "station": "dobutsuen",
      "walk": [
        8,
        15
      ],
      "note": "Approximate held Sanno area; verify the actual RTI entrance.",
      "alternatives": [
        {
          "station": "shinimamiya",
          "walk": [
            10,
            18
          ],
          "note": "Approximate held Sanno area; verify the actual RTI entrance."
        }
      ]
    },
    "osaka-11": {
      "station": "osaka",
      "walk": [
        0,
        0
      ],
      "note": ""
    },
    "osaka-12": {
      "station": "nishikujo",
      "walk": [
        0,
        0
      ],
      "note": ""
    },
    "namba-area": {
      "station": "namba",
      "walk": null,
      "note": "Candidate neighbourhood only: walking time depends on the selected hotel."
    },
    "hozenji": {
      "station": "namba",
      "walk": [
        5,
        10
      ],
      "note": ""
    },
    "namba-yasaka": {
      "station": "namba",
      "walk": [
        8,
        12
      ],
      "note": ""
    },
    "shinsekai": {
      "station": "dobutsuen",
      "walk": [
        5,
        10
      ],
      "note": ""
    },
    "kix": {
      "station": "kix",
      "walk": [
        5,
        10
      ],
      "note": "Station to Terminal 1; Terminal 2 needs a shuttle and more time. Check the flight terminal."
    }
  },
  "sources": [
    {
      "label": "JR-West railway map",
      "url": "https://www.westjr.co.jp/global/en/timetable/pdf/ubn_en.pdf"
    },
    {
      "label": "Tokyo Metro lines",
      "url": "https://www.tokyometro.jp/lang_en/index.html"
    },
    {
      "label": "Osaka Metro routes",
      "url": "https://subway.osakametro.co.jp/en/station_guide/"
    },
    {
      "label": "Keihan railway map",
      "url": "https://www.keihan.co.jp/travel/en/useful-files/"
    },
    {
      "label": "teamLab access",
      "url": "https://www.teamlab.art/e/kyoto/"
    },
    {
      "label": "Fushimi Inari access",
      "url": "https://inari.jp/en/access/"
    },
    {
      "label": "Kiyomizu-dera access",
      "url": "https://www.kiyomizudera.or.jp/en/location/"
    },
    {
      "label": "Tenryu-ji access",
      "url": "https://www.tenryuji.com/en/visit/index.html"
    },
    {
      "label": "Kappabashi access",
      "url": "https://www.gotokyo.org/en/spot/59/index.html"
    },
    {
      "label": "USJ access",
      "url": "https://www.usj.co.jp/web/en/us/access/index.html"
    }
  ]
};
