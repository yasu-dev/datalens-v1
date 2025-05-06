// イオン店舗のモックデータ（都道府県、市区町村、店舗の階層構造）
export interface StoreItem {
  id: string;
  name: string;
}

export interface CityItem extends StoreItem {
  stores: StoreItem[];
}

export interface PrefectureItem extends StoreItem {
  cities: CityItem[];
}

// 都道府県、市区町村、店舗のモックデータ
export const prefectureData: PrefectureItem[] = [
  {
    id: 'hokkaido',
    name: '北海道',
    cities: [
      {
        id: 'sapporo',
        name: '札幌市',
        stores: [
          { id: 'sapporo-hassamu', name: 'イオン札幌発寒店' },
          { id: 'sapporo-hinode', name: 'イオン札幌桑園店' },
          { id: 'sapporo-shinoro', name: 'イオン札幌篠路店' }
        ]
      },
      {
        id: 'asahikawa',
        name: '旭川市',
        stores: [
          { id: 'asahikawa-nishi', name: 'イオン旭川西店' },
          { id: 'asahikawa-miyamae', name: 'イオン旭川宮前店' }
        ]
      }
    ]
  },
  {
    id: 'tokyo',
    name: '東京都',
    cities: [
      {
        id: 'koto',
        name: '江東区',
        stores: [
          { id: 'koto-shinonome', name: 'イオン東雲店' },
          { id: 'koto-toyosu', name: 'イオンスタイル豊洲' }
        ]
      },
      {
        id: 'katsushika',
        name: '葛飾区',
        stores: [
          { id: 'kameari', name: 'イオン亀有店' }
        ]
      },
      {
        id: 'edogawa',
        name: '江戸川区',
        stores: [
          { id: 'edogawa-kasai', name: 'イオン葛西店' }
        ]
      }
    ]
  },
  {
    id: 'kanagawa',
    name: '神奈川県',
    cities: [
      {
        id: 'yokohama',
        name: '横浜市',
        stores: [
          { id: 'yokohama-honmoku', name: 'イオン本牧店' },
          { id: 'yokohama-higashi', name: 'イオン東神奈川店' }
        ]
      },
      {
        id: 'kawasaki',
        name: '川崎市',
        stores: [
          { id: 'kawasaki-daishi', name: 'イオン川崎大師店' },
          { id: 'kawasaki-shinmaruko', name: 'イオン新百合ヶ丘店' }
        ]
      }
    ]
  },
  {
    id: 'chiba',
    name: '千葉県',
    cities: [
      {
        id: 'chiba',
        name: '千葉市',
        stores: [
          { id: 'chiba-makuhari', name: 'イオン幕張店' },
          { id: 'chiba-shinyatsumiya', name: 'イオン新八千代店' }
        ]
      },
      {
        id: 'ichikawa',
        name: '市川市',
        stores: [
          { id: 'ichikawa-minami', name: 'イオン市川妙典店' }
        ]
      }
    ]
  },
  {
    id: 'osaka',
    name: '大阪府',
    cities: [
      {
        id: 'osaka',
        name: '大阪市',
        stores: [
          { id: 'osaka-dainichi', name: 'イオン大日店' },
          { id: 'osaka-dome', name: 'イオンスタイル茨木' }
        ]
      },
      {
        id: 'sakai',
        name: '堺市',
        stores: [
          { id: 'sakai-kita', name: 'イオン堺北花田店' },
          { id: 'sakai-minami', name: 'イオン堺南花田店' }
        ]
      }
    ]
  },
  {
    id: 'aichi',
    name: '愛知県',
    cities: [
      {
        id: 'nagoya',
        name: '名古屋市',
        stores: [
          { id: 'nagoya-dome', name: 'イオンナゴヤドーム前店' },
          { id: 'nagoya-hoshigaoka', name: 'イオン星ヶ丘店' }
        ]
      },
      {
        id: 'toyohashi',
        name: '豊橋市',
        stores: [
          { id: 'toyohashi', name: 'イオン豊橋南店' }
        ]
      }
    ]
  },
  {
    id: 'fukuoka',
    name: '福岡県',
    cities: [
      {
        id: 'fukuoka',
        name: '福岡市',
        stores: [
          { id: 'fukuoka-kashii', name: 'イオン香椎浜店' },
          { id: 'fukuoka-noke', name: 'イオン野芥店' }
        ]
      },
      {
        id: 'kitakyushu',
        name: '北九州市',
        stores: [
          { id: 'kitakyushu-yawata', name: 'イオン八幡東店' }
        ]
      }
    ]
  }
];

// フラットなストア一覧（ID検索用）
export const allStores = prefectureData.flatMap(pref => 
  pref.cities.flatMap(city => 
    city.stores.map(store => ({
      id: store.id,
      name: store.name,
      city: city.name,
      prefecture: pref.name
    }))
  )
); 