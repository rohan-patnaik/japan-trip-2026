/* Meal planning checked 10 Oct 2026. Costs are planning estimates for TWO.
   A paired option gives each traveller an order at the same stop. */
(() => {
  'use strict';
  const sources = {
    ts: 'https://ts-restaurant.jp/tantan/',
    coco: 'https://www.ichibanya.co.jp/english/',
    cocoStores: 'https://www.ichibanya.co.jp/cocoichicurry/search.html',
    mensho: 'https://mensho.com/ja/location/jikasei-mensho-shibuya/',
    sora: 'https://soranoiro-vege.com/store-menu/soranoiro-nippon/',
    jangara: 'https://kyushujangara.co.jp/en/menulist/',
    gyumon: 'https://gyumon-group.com/shop/ramen-asakusa/',
    gyumonOsaka: 'https://gyumon-group.com/shop/ramen-osaka-dotonbori/',
    monja: 'https://kamiya-kaminarimon-monja.com/en_us/2026/04/09/vegan/',
    marugoto: 'https://dining.marugotovegan.com/dinner-menu/',
    sorae: 'https://www.tokyuhotels.co.jp/en/kichijoji-e/restaurant/sorae/plan/104252/index.html',
    crayon: 'https://www.crayonhouse.co.jp/shop/pages/resttest.aspx',
    hitokokyu: 'https://vegewel.com/ja/style/hitokokyu',
    paprika: 'https://paprikacafe.owst.jp/foods',
    fire: 'https://www.thefireosaka.com/',
    rize: 'https://www.miracore.jp/en/story/ryukishin-namba',
    uno: 'https://www.soymilkramen.com/en/',
    choice: 'https://hs-choice.com/meal',
    choiceHours: 'https://hs-choice.com/store',
    vegout: 'https://tamisa-yoga.com/cafe/veg-out/index.html',
    shigetsu: 'https://www.tenryuji.com/en/shigetsu/index.html',
    itadakizen: 'https://www.itadakizen-uk.com/kyoto',
    ms: 'https://www.ermineskitchen.com/home/english/',
    musubi: 'https://musubi-cafe.jp/arashiyama',
    usj: 'https://www.usj.co.jp/web/en/us/service-guide/barrier-free/dietary-restriction/plant-based-menu',
    broomsticks: 'https://www.usj.co.jp/web/en/us/restaurants/three-broomsticks',
    kinopio: 'https://www.usj.co.jp/web/en/us/restaurants/kinopios-cafe',
    seven: 'https://www.sej.co.jp/products/',
    family: 'https://www.family.co.jp/goods.html',
    lawson: 'https://www.lawson.co.jp/recommend/',
    vietjet: 'https://www.vietjetair.com/en',
    hanoi: 'https://www.noibaiairport.vn/',
    kix: 'https://www.kansai-airport.or.jp/en/shop-and-dine/dine'
  };
  const option = (venue, area, husband, wife, cost, status, note, source, extra = []) =>
    ({venue, area, husband, wife, cost, status, note, sources: [source, ...extra].filter(Boolean)});
  const vegan = 'Vegan menu';
  const check = 'Check before ordering';
  const label = 'Check package label';
  const allVegan = 'Both eating vegan';
  const stores = [
    ['7-Eleven', sources.seven], ['FamilyMart', sources.family], ['Lawson', sources.lawson]
  ];
  const breakfasts = (area, timing, rotation = 0) => {
    const orders = [
      ['Salmon or tuna-mayo onigiri + boiled egg + tea', 'Two plain salt onigiri + edamame + milk or soy drink'],
      ['Egg sandwich + plain yogurt + coffee', 'Plain yogurt + plain oats + nuts + banana'],
      ['Pork-ham or chicken sandwich + milk', 'Egg-free plain bread + cheese + fruit, or oat crackers if no suitable bread']
    ];
    return stores.map(([store, source], i) => {
      const [husband, wife] = orders[(i + rotation) % orders.length];
      return option(store + ' takeaway breakfast', area, husband, wife, [900, 1800], label,
        timing + ' Buy the night before when leaving early; select a nearby open branch. For her: no egg, fish/meat extract or gelatin; plain salt rice only after reading ingredients. Bread, yogurt and fillings vary. For him: check sandwich meat and sauces for beef.', source);
    });
  };
  const coco = (area, timing, husband = 'Chicken-katsu curry on pork or vegetarian sauce', wife = 'CoCoICHI vegetarian curry + vegetables; start at spice 2–3') => {
    const branch = /Akihabara/.test(area) ? ['JR Akihabara Showa-dori Exit', '4 Kanda Hirakawacho, Tokyo', '1560']
      : /Kyoto/.test(area) ? ['Minami-ku Hachijo-guchi', '1 Higashikujo Kamitonodacho, south of Kyoto Station', '1450']
      : /Tennoji|Abeno/.test(area) ? ['JR Tennoji North Exit', '8-26 Hidenincho, Tennoji, Osaka', '1628']
      : /Namba|Nipponbashi|Dotonbori/.test(area) ? ['Namba-Naka 1-chome', '1-18-10 Nambanaka, Osaka', '1849']
      : ['Shibuya area — select a confirmed outlet', area, null];
    return option('CoCo Ichibanya · ' + branch[0], branch[1], husband, wife, [2200, 3500], check,
      timing + (branch[2] ? ' Branch location is listed by CoCo; its vegetarian-curry availability is not confirmed.' : ' Use the locator to choose a Shibuya outlet and confirm its hours and vegetarian menu.') + ' Check the specifically named vegetarian curry before going. Regular “vegetable curry” can use pork sauce. No beef sauce for him; no egg toppings for her. If unavailable, use a listed vegan restaurant.', sources.coco,
      [branch[2] ? 'https://tenpo.ichibanya.co.jp/map/' + branch[2] + '/' : sources.cocoStores]);
  };
  const ts = (area, husband = 'Vegan sesame tantanmen + a vegan side', wife = 'Vegan tantanmen; ask for chilli') =>
    option('T’s Tantan', area, husband, wife, [2600, 4000], allVegan,
      'Entire menu excludes meat, fish, egg and dairy. Choose the current sesame ramen and sides from the board; confirm branch hours. This is a shared vegan meal, with no meat option.', sources.ts);
  const paprika = (husband = 'Soy-karaage dinner set', wife = 'Vegan burger or vegan gyoza + rice') =>
    option('Paprika Shokudo Vegan', 'Shinmachi / Yotsubashi, Osaka', husband, wife, [3500, 5500], allVegan,
      'Near Shinsaibashi, not the Tennoji hotel: allow a metro trip and walk. Dinner 17:30–21:30, food last order 21:00. Soy “chicken” and mock seafood are plant-based. Recheck the holiday calendar.', sources.paprika);
  const fire = (note = '', husband = 'Soy-milk ramen + vegan gyoza', wife = 'Sesame ramen; ask for extra chilli') =>
    option('The Fire Osaka', 'Amemura / Nishi-Shinsaibashi, Osaka', husband, wife, [3000, 4500], allVegan,
      note + ' Fully vegan ramen bar. Confirm that date’s kitchen hours and events before going; allow the trip from Tennoji. Tomato, sesame and soy-milk broths give you different flavours.', sources.fire);
  const rize = () => option('Ryukishin RIZE Namba', 'Near Nankai Namba / Namba CITY, Osaka',
    'Chicken-based ramen if staff confirms no beef; otherwise the vegan ramen',
    'Explicitly named vegan ramen, with MIRA-dashi', [2600, 4000], check,
    'The broth supplier confirms a vegan ramen at this mixed-menu branch. Verify it is still available and check hours. Ask about his broth and toppings; ordering a vegetable-topped regular ramen does not make it vegetarian.', sources.rize);
  const uno = (area, note = '') => option('UNO soy-milk ramen', area,
    'Soy-milk ramen + rice or a plant-based side', 'Vegan soy-milk ramen; ask for chilli oil', [3000, 4500], allVegan,
    note + ' The official menu is vegan and gluten-free. Check current opening hours and the queue. No chicken or pork option here.', sources.uno);
  const soranoiro = () => option('Soranoiro NIPPON', 'Tokyo Ramen Street, Tokyo Station B1 — outside JR gates',
    'Shoyu ramen (officially chicken broth); check the topping', 'Vegan tantanmen + vegan gyoza if hungry', [2800, 4200], vegan,
    'Open 09:00–23:00, last order 22:30. Order the named vegan bowl for her: standard mushroom vege-soba has animal additions unless modified. His shoyu broth is chicken, but still confirm no beef in additions.', sources.sora);
  const gyumonOsaka = () => option('GYUMON Dotonbori', '1-10-5 Dotonbori, Namba, Osaka',
    'Vegan ramen; choose a different spice level from hers', 'Explicit vegan ramen', [5000, 6500], allVegan,
    'Mixed menu dominated by beef: both use the vegan section. Chicken-topped regular ramen may still have beef broth. Confirm vegan availability and current hours before joining the queue.', sources.gyumonOsaka);
  const travel = (place, timing) => [
    option('Packed dry meal — eat during transit', place,
      'Egg-free vegetable paratha / thepla + roasted chickpeas',
      'Egg-free vegetable paratha / thepla + roasted chickpeas', null, 'Pack ahead',
      timing + ' Pack a fresh portion for this meal, not leftovers kept through the whole trip. Use shelf-stable food, no liquid curry. Check airline/security and destination food-entry rules; finish or declare food as required.', sources.vietjet),
    option('Airside café / shop + your packed staples', place,
      'Chicken or egg sandwich after checking meat and sauces; crackers as backup',
      'Sealed egg-free crackers + nuts + a plain milk/soy drink; buy additional suitable food after checking', null, check,
      timing + ' No specific airside vegetarian hot meal is confirmed. Check the shop and ingredient list on the day; ask about fish sauce, stock, egg and gelatin. No need to leave the transit area.', sources.hanoi),
    option('Vietjet meal for him + a separate packed meal for her', place,
      'Pre-order a listed chicken/pork rice meal only after confirming no beef ingredients',
      'Your own sealed egg-free oat crackers, roasted chana and nuts; request hot water for plain oats if permitted', null, check,
      timing + ' Meals cost extra unless your booking includes them. A suitable vegetarian airline meal has not been verified. Confirm the flight’s actual menu before paying; both can use packed food if his order cannot be confirmed.', sources.vietjet)
  ];
  const days = [
    {date:20, label:'Fri 20 · Arrival', route:'Delhi → Hanoi transit → Narita → Asakusa',
      breakfast:{time:'05:35–08:20 · Hanoi transit', note:'You are in transit, not in Tokyo. Keep breakfast quick for the onward flight.', options:travel('Hanoi international airside', 'During the 2 h 45 m connection.')},
      lunch:{time:'On the Hanoi → Narita flight', note:'Use a second packed portion or a confirmed pre-ordered meal; landing is 15:25.', options:[
        option('Packed flight lunch', 'VJ934 cabin', 'Vegetable wrap with egg-free bread + roasted chana', 'Vegetable wrap with egg-free bread + roasted chana', null, 'Pack ahead', 'Eat during the flight. Use a fresh, shelf-stable vegetarian portion; check carriage rules. Do not bring leftover fresh produce or animal foods into Japan without checking import requirements.', sources.vietjet),
        option('Hanoi airside takeaway — buy before boarding', 'Hanoi international departures', 'Chicken rice or a chicken sandwich, if no beef broth/sauce', 'Sealed egg-free oat crackers + nuts + suitable drink', null, check, 'Buy before the 08:20 departure. No verified egg-free vegetarian hot meal: inspect labels and ask staff; carry enough food for her independently.', sources.hanoi),
        option('Vietjet pre-ordered hot meal', 'VJ934 cabin', 'Listed chicken/pork rice meal, after ingredient confirmation', 'Packed plain oats + nuts, with hot water if crew permits', null, check, 'Confirm the exact flight menu in Manage Booking. Do not rely on an unconfirmed “vegetarian” option. Food is generally an extra purchase.', sources.vietjet)
      ]},
      dinner:{time:'19:00–20:00 · Asakusa', note:'Three nearby evening choices after hotel check-in. Keep the first night relaxed.', options:[
        option('GYUMON Asakusa', '6-12-5 Asakusa, Tokyo', 'White vegan ramen, or shrimp tempura rice bowl after checking no beef sauce', 'Spicy vegan ramen or vegan tempura rice bowl', [5000,6500], vegan, 'Official hours 12:00–22:00. Regular chicken ramen can have beef broth, so avoid it. Ask for the explicitly labelled vegan broth and egg-free vegan tempura for her.', sources.gyumon),
        option('Kaminoya Kaminarimon — monja / okonomiyaki', '1-34-4 Asakusa, Aqua Building 2F', 'Vegan okonomiyaki, or a pork version only after checking no beef', 'Vegan monja, vegan okonomiyaki or vegan yakisoba', [3500,5500], vegan, 'Friday food last order 21:00; allow about 30 minutes for cooking and a minimum drink order. Select the dedicated vegan menu and vegan broth for her. This is the current Kaminarimon branch.', sources.monja),
        option('Marugoto Vegan Dining Asakusa', '1-3-13 Hanakawado — near Asakusa Station', 'Plant-based curry / seasonal dinner main from the current menu', 'Seasonal vegan dinner plate or curry', [4000,6500], allVegan, 'Dinner service returns 13 Oct 2026. Reserve a dinner slot and check the November calendar and menu before going. A good shared vegan choice; no meat dishes.', sources.marugoto)
      ]}},
    {date:21, label:'Sat 21 · Ghibli', route:'Asakusa / Iriya → Mitaka → Kichijoji → Shibuya',
      breakfast:{time:'07:30–08:15 · before leaving', note:'Leave by 08:45. Marugoto’s Saturday breakfast starts at 09:00, too late for your museum slot.', options:breakfasts('Near the Senzoku / Iriya hotel', 'Eat at the hotel before the Mitaka journey.', 0)},
      lunch:{time:'12:30–13:30 · Mitaka / Kichijoji', note:'Kichijoji is on your onward route. Limit queues so you still reach Shibuya Sky at 15:40.', options:[
        option('SORAE · Kichijoji Excel Hotel Tokyu', '2F, 2-4-14 Kichijoji Honcho', 'Vegan soy-meat bolognese + minestrone', 'Oriental-vegan vegetable Thai curry + minestrone', [6000,6000], vegan, 'Both vegan dishes are officially listed at ¥3,000 each, including tax and service. Lunch 11:30–14:30, last order 14:00. Reserve if possible; ~10-minute walk from Kichijoji Station.', sources.sorae),
        option('Crayonhouse · organic buffet', '2-15-6 Kichijoji Honcho', 'Vegan buffet dishes; add the day’s meat/fish dish only if it fits his restrictions', 'Rice, vegetables and vegan dishes from the buffet', [4000,6000], vegan, 'Official page says buffet dishes are vegan except one meat/fish dish. Ask staff to identify it and confirm Saturday lunch hours/price; use separate serving utensils. About 7 minutes from Kichijoji Station.', sources.crayon),
        option('Hitokokyu · macrobiotic lunch', 'Near Mitaka Station, Tokyo', 'Vegan millet-fritter set', 'Vegan vegetable-gyoza set, if offered that day', [2800,4500], 'Confirm current operation', 'A local vegan listing documents these sets, but current official hours/menu could not be verified. Call/check the current listing before relying on this small venue; choose SORAE if confirmation fails.', sources.hitokokyu)
      ]},
      dinner:{time:'18:00–19:30 · Shibuya / Harajuku', note:'Eat after the PARCO shops; the Harajuku option adds a short train ride or walk.', options:[
        option('Jikasei MENSHO', 'Shibuya PARCO B1, 15-1 Udagawacho', 'Vegan miso ramen + pork-chashu topping if staff confirms availability and no beef', 'Vegan tantanmen or spicy vegan miso ramen', [3000,4500], vegan, '11:30–23:00, last order 22:00. His signature chicken-paitan bowl includes A5 wagyu: skip it. Use a vegan base for his pork addition; her bowl stays entirely vegan.', sources.mensho),
        option('Kyushu Jangara Harajuku', 'Near JR Harajuku Station, Tokyo', 'Karabon spicy pork ramen', 'Vegan shoyu or vegan black-garlic ramen', [2800,4200], vegan, 'Official menu distinguishes pork/chicken broth from vegan bowls. Harajuku branch is a detour from Shibuya; confirm its current vegan menu. The Akihabara branch is temporarily closed, so do not substitute it.', sources.jangara, ['https://kyushujangara.co.jp/en/shoplist/']),
        coco('Shibuya — choose a branch with vegetarian curry', 'Fit this around PARCO or Shibuya Station; confirm the branch first.')
      ]}},
    {date:22, label:'Sun 22 · Shin-chan', route:'Asakusa → Akihabara → Kasukabe → Tokyo Station',
      breakfast:{time:'08:00–09:00 · before Akihabara', note:'If doing the 07:30 temple walk, take breakfast along or eat after it.', options:breakfasts('Asakusa / Iriya', 'Finish before the 09:40 departure.', 1)},
      lunch:{time:'12:15–13:15 · before Kasukabe', note:'Eat before leaving: LaLa Garden has no confirmed meal matching her restrictions. Jangara Akihabara is temporarily closed.', options:[
        ts('ecute Akihabara — outside JR Electric Town gate'),
        coco('Akihabara — check the nearest participating branch', 'Leave time for the 13:30 Kasukabe journey.', 'Pork-katsu curry on pork or vegetarian sauce'),
        ts('JR Ueno Station 3F, inside gates near Iriya gate', 'Vegan ramen + rice / current side', 'Vegan sesame ramen, a different flavour from his')
      ]},
      dinner:{time:'18:30–19:45 · Tokyo Station area', note:'Shop first or eat early. Ginza is an optional detour; the first two options stay at Tokyo Station.', options:[
        soranoiro(),
        ts('Gransta Tokyo B1 — outside JR gates'),
        option('Kyushu Jangara Ginza', 'Ginza — about 20 minutes on foot from Tokyo Station', 'Bonshan pork ramen or spicy Karabon', 'Vegan black-garlic or vegan shoyu ramen', [2800,4200], vegan, 'Allow time for the Ginza detour and return. Official shop list currently shows 11:00–22:30, last order 22:15. Confirm the vegan bowl is available at this branch.', sources.jangara, ['https://kyushujangara.co.jp/en/shoplist/'])
      ]}},
    {date:23, label:'Mon 23 · To Osaka', route:'Tokyo Station → Shin-Osaka → Namba / Den Den Town → Tennoji',
      breakfast:{time:'07:00–08:00 · hotel / train takeaway', note:'Public holiday. Buy ahead; do not queue for a restaurant just before the 09:30 Nozomi.', options:breakfasts('Senzoku / Iriya; eat before check-out or take onto the train', 'Do not rely on station restaurants opening in time.', 2)},
      lunch:{time:'13:00 · Namba, before Den Den Town', note:'Use Namba for lunch rather than relying on unverified vegetarian udon in Shinsekai. It adds a short metro trip / walk.', options:[rize(), gyumonOsaka(), coco('Namba / Nipponbashi — participating branch', 'Eat before browsing Den Den Town. Holiday queues may be longer.')]},
      dinner:{time:'18:30–20:00 · Osaka', note:'After checking into RTI Tennoji, travel back to the Shinsaibashi / Namba area for these options.', options:[paprika(), fire(), coco('Namba or Tennoji — participating branch', 'Choose a confirmed vegetarian-curry branch convenient to the hotel.', 'Pork-katsu curry on pork or vegetarian sauce')] }},
    {date:24, label:'Tue 24 · Kyoto', route:'Tennoji → Fushimi Inari → Higashiyama / Gion → Kyoto Station',
      breakfast:{time:'06:00–06:45 · before the Kyoto train', note:'Buy tonight’s supplies on 23 Nov. Eat before leaving at 07:00.', options:breakfasts('Near RTI Tennoji / Shin-Imamiya', 'Takeaway, bought the previous night.', 0)},
      lunch:{time:'12:30–13:30 · Kyoto', note:'UNO fits Gion best. The other two need a detour and a small change to the walking route. Itadakizen is closed Tuesdays.', options:[
        uno('Gion, 40 Kameicho, Yamato-oji'),
        option('CHOICE · vegan café', '89-1 Ohashicho, Sanjo Keihan, Kyoto', 'Vegan cheese burger or bean-and-grain patty plate', 'Mushroom stroganoff + sprouted brown rice', [3200,5000], allVegan, 'Lunch 11:00–15:00; closed Wednesday, open Tuesday on the published schedule. ~20-minute walk north from central Gion. All food is vegan, including “egg” sandwiches and cheese.', sources.choice, [sources.choiceHours]),
        option('Veg Out', '44 Inaricho, Shichijo / Kamo River, Kyoto', 'Seasonal vegan lunch plate', 'Vegan curry or the day’s plant-based lunch', [3200,5000], allVegan, 'Backtrack south from Higashiyama to Shichijo (~20–30 minutes depending on your stop). Confirm the current lunch menu, Tuesday opening and last order; do not use this as a late-dinner plan.', sources.vegout)
      ]},
      dinner:{time:'19:00 · after teamLab, or later in Osaka', note:'Choose Kyoto dinner before returning. The Osaka alternative moves hotel arrival later than 20:30.', options:[
        uno('Kyoto Station 10F · Kyoto Ramen Koji', 'Near the station after teamLab; check last order and queue.'),
        coco('Kyoto Station area — participating branch', 'Confirm hours and vegetarian curry; eat before the return train.', 'Chicken-katsu curry on vegetarian or pork sauce'),
        fire('Return to Osaka and stop at Shinsaibashi before the hotel. Confirm the kitchen will still be serving.', 'Tomato ramen + vegan gyoza', 'Sesame ramen + a vegan side')
      ]}},
    {date:25, label:'Wed 25 · Anniversary', route:'Tennoji → Arashiyama → Kitano → Itadakizen → Osaka',
      breakfast:{time:'06:15–07:00 · light breakfast', note:'Keep breakfast light for the anniversary lunch; leave at 07:15.', options:breakfasts('Near RTI Tennoji / Shin-Imamiya', 'Buy before this early start.', 1)},
      lunch:{time:'11:00 · Arashiyama', note:'Shigetsu is the planned anniversary meal, subject to reservation. The other two are alternatives if you change the plan.', options:[
        option('Shigetsu · Tenryu-ji', 'Inside Tenryu-ji, Arashiyama', 'Tsuki shojin set', 'Tsuki shojin set — seasonal temple vegetables and tofu', [13000,13000], allVegan, 'Planned 11:00, not marked booked. Reserve at least 3 days ahead for Tsuki (¥6,500 each); garden admission ¥500 each is separate and already in your sightseeing plan. Yuki ¥3,800 / Hana ¥9,000 are other course choices. Lunch 11:00–14:00; closed Thursday.', sources.shigetsu),
        option('M’s Bento', 'Across from JR Saga-Arashiyama Station, Nagai Sangyo Building 3F', 'Premium vegan nori-roll set', 'Premium vegan nori-roll set with tofu fritter and vegetable sides', [5160,5160], allVegan, 'Official set ¥2,580 each; kombu/shiitake-based miso soup. Small venue: confirm Wednesday service and reserve. Allow ~10–15 minutes between the temple / bamboo grove and the station.', sources.ms),
        option('musubi cafe Arashiyama', '1-8 Arashiyama Nishiichikawacho, near Hankyu Arashiyama', 'Chickpea-and-tomato curry set', 'Vegetable tomato spaghetti set, after confirming all sides and stock are animal-free', [3400,4000], check, 'Lunch starts 11:30, so change the 11:00 lunch slot. Across the river from Tenryu-ji. Published sets ¥1,700 each; explicitly confirm no egg, fish dashi or animal stock in soup, sauce and sides.', sources.musubi)
      ]},
      dinner:{time:'18:00 · anniversary dinner', note:'Keep Itadakizen as the main plan. Alternatives require changing the route; CHOICE is closed Wednesdays.', options:[
        option('Itadakizen Kyoto', '199-1 Nibancho, Kamigyo, Kyoto', 'Reserved vegan seasonal dinner / course', 'Reserved vegan seasonal dinner / course', [10000,16000], allVegan, 'Planned 18:00, subject to reservation and a current course quote. Wednesday dinner only 18:00–22:30; last food order 21:30, last entry 21:00, two-hour tables. Tell them it is your anniversary. This price is an estimate, not a confirmed course price.', sources.itadakizen),
        uno('Kyoto Station 10F · Kyoto Ramen Koji', 'Simpler alternative: travel from Kitano to Kyoto Station early. This replaces the Itadakizen dinner.'),
        coco('Kyoto Station area — participating branch', 'Budget alternative after travelling from Kitano; confirm the named vegetarian curry is available.', 'Pork-katsu curry on pork or vegetarian sauce')
      ]}},
    {date:26, label:'Thu 26 · USJ', route:'Tennoji → Universal Studios Japan → Tennoji',
      breakfast:{time:'Before leaving for the opening queue', note:'Buy on 25 Nov and eat before entering the park. Do not spend your opening-hour ride time looking for breakfast.', options:breakfasts('Near RTI Tennoji / Shin-Imamiya', 'Eat before the gates; park food rules apply.', 2)},
      lunch:{time:'11:00–13:00 · inside USJ', note:'Three in-park options. Choose by the area you are in and confirm the green plant-based menu on the day.', options:[
        option('Kinopio’s Café / Toad Café', 'Super Nintendo World, USJ', 'Super Star anniversary mushroom-lasagna & fried-chicken plate; confirm no beef in sauce', 'Plant-based Fire Flower tomato spaghetti', [6000,6500], vegan, 'Her official dish ¥2,500; his current anniversary plate ¥3,500. Need area entry plus restaurant availability; register the restaurant queue when available. Do not order the Mario burger (beef).', sources.usj, [sources.kinopio]),
        option('Three Broomsticks', 'Wizarding World of Harry Potter, USJ', 'Pork-ribs meal', 'Plant-based vegetable Irish stew', [5300,6000], vegan, 'Currently ¥2,600 + ¥2,700. His roast-chicken combination includes shepherd’s pie, which may contain beef: choose ribs or fish-and-chips instead and check sauces.', sources.usj, [sources.broomsticks]),
        option('SAIDO', 'New York area, USJ', 'Plant-based tempura gozen', 'Plant-based tempura gozen', [6400,7000], allVegan, 'Published plant-based set ¥3,200 each. Use the specific plant-based set with egg-free batter and suitable stock. Restaurant priority seating / a virtual queue may apply; check with crew.', sources.usj)
      ]},
      dinner:{time:'17:00–18:30 · eat before leaving USJ', note:'Pick a different stop from lunch. Restaurant hours can be shorter than park hours. These options avoid a late trip to Paprika.', options:[
        option('Three Broomsticks', 'Wizarding World of Harry Potter, USJ', 'Fish-and-chips', 'Plant-based vegetable Irish stew', [5300,6000], vegan, 'Currently ¥2,600 + ¥2,700. Check his sauces for beef ingredients. Her stew must be the plant-based version; cakes and ordinary desserts can contain egg.', sources.usj, [sources.broomsticks]),
        option('Beverly Hills Boulangerie', 'Hollywood area, USJ', 'Plant-based mixed-vegetable sandwich set', 'Plant-based mixed-vegetable sandwich set + berry dessert if wanted', [3600,4400], allVegan, 'Published set ¥1,800 each, with cup salad and soft drink. Lighter dinner near the entrance; confirm serving hours before your last rides.', sources.usj),
        option('Kinopio’s Café / Toad Café', 'Super Nintendo World, USJ', 'Bacon-and-mushroom pizza bowl, after confirming no beef', 'Plant-based portobello-mushroom pizza', [3800,5000], vegan, 'Currently ¥1,900 each. Only practical if you still have access to this area and a café place. Otherwise choose the Hollywood or Harry Potter option. Her pizza must be the explicitly plant-based one.', sources.usj, [sources.kinopio])
      ]}},
    {date:27, label:'Fri 27 · Osaka', route:'Tennoji → Shinsaibashi / Dotonbori → Umeda → Harukas',
      breakfast:{time:'08:00–09:00 · before the shops', note:'Eat near the hotel before travelling to the 10:00 Pokémon Center opening.', options:breakfasts('Near RTI Tennoji / Shin-Imamiya', 'Also buy tomorrow’s early-airport breakfast tonight.', 0)},
      lunch:{time:'12:00–13:00 · Shinsaibashi / Namba', note:'Three choices along or near the shopping route. Paprika needs a short walk west to Shinmachi.', options:[
        option('Paprika Shokudo Vegan', 'Shinmachi / Yotsubashi, Osaka', 'Vegan burger', 'Soy-karaage lunch / current plant-based lunch plate', [3000,4500], allVegan, 'About 10–20 minutes on foot from Shinsaibashi depending on your starting point. Confirm Friday lunch hours and lunch menu rather than using the dinner menu prices.', sources.paprika),
        rize(),
        coco('Dotonbori / Namba — participating branch', 'Choose a confirmed branch before the 14:00 trip to Umeda.', 'Pork-katsu curry on pork or vegetarian sauce')
      ]},
      dinner:{time:'18:30–20:00 · after Harukas', note:'Choose the hotel-area curry if confirmed, or make a final Namba / Shinsaibashi food stop. Pack after dinner.', options:[
        coco('Tennoji / Abeno, or a confirmed Namba branch', 'Check vegetarian-curry availability; do not assume every outlet serves it.'),
        fire('Metro to Shinsaibashi / Namba, then walk to Amemura.', 'Sesame ramen + vegan gyoza', 'Tomato ramen + vegan gyoza'),
        paprika('Vegan burger + vegan gyoza to share', 'Soy-karaage set; chilli seasoning if available')
      ]}},
    {date:28, label:'Sat 28 · Home', route:'Tennoji → Kansai Airport → Hanoi transit → Delhi',
      breakfast:{time:'05:00–05:40 · before check-out', note:'Buy on 27 Nov. Check-out is 05:50, so breakfast restaurants are not a dependable plan.', options:[
        option('7-Eleven — breakfast bought Friday night', 'Eat at RTI Tennoji before leaving', 'Salmon onigiri + boiled egg', 'Plain salt onigiri + edamame + milk', [900,1600], label, 'Read current ingredients, especially her rice seasoning. Keep chilled items refrigerated and eat before travel. Use dry crackers if refrigeration is unavailable.', sources.seven),
        option('FamilyMart — breakfast bought Friday night', 'Eat at the hotel before 05:50', 'Egg sandwich + milk / coffee', 'Plain yogurt + oats + nuts', [900,1700], label, 'For her: plain yogurt without gelatin, plain oats, no egg-containing bakery items. Keep yogurt and sandwich refrigerated overnight.', sources.family),
        option('Lawson dry-food breakfast / KIX top-up', 'Eat before leaving; optional KIX drink after check-in', 'Chicken / pork-ham sandwich if refrigerated, or oat crackers + nuts', 'Egg-free oat crackers + nuts + shelf-stable milk or soy drink', [1000,1800], label, 'Buy ahead. Do not delay export checks or check-in to search for food. KIX shop hours vary; no suitable early hot vegetarian breakfast is confirmed.', sources.lawson, [sources.kix])
      ]},
      lunch:{time:'KIX → Hanoi flight / Hanoi transit', note:'Carry a separate lunch portion. Hanoi is international airside; no city-restaurant detour.', options:travel('VJ939 / Hanoi international airside', 'During the flight or the long Hanoi connection.')},
      dinner:{time:'Hanoi transit / flight to Delhi', note:'Plan dinner before arrival in Delhi at 22:50. Use a new sealed portion; do not keep breakfast dairy all day.', options:[
        option('Hanoi airside food counter + packed vegetarian meal', 'Hanoi international departures', 'Chicken rice / chicken pho if no beef stock', 'Sealed egg-free crackers, roasted chana and nuts + suitable drink', null, check, 'Ask about his broth and sauce. Vegetable pho often has fish/meat stock, so it is not her fallback. Airside venue and vegan availability are unconfirmed; keep a full packed portion for her.', sources.hanoi),
        option('Vietjet pre-ordered dinner + your own meal', 'VJ971 cabin', 'Confirmed chicken/pork rice meal, without beef ingredients', 'Plain oats with hot water if permitted + roasted chickpeas + nuts', null, check, 'Check the actual flight menu and pre-order cutoff in the booking. Her airline meal is not confirmed, so pack separately.', sources.vietjet),
        option('Sealed dry dinner — both', 'Hanoi airside / VJ971 cabin', 'Egg-free crackers or flatbread + peanut butter / roasted chana + nuts', 'Egg-free crackers or flatbread + peanut butter / roasted chana + nuts', null, 'Pack ahead', 'Use individually sealed shelf-stable portions and a suitable drink. Check security and food-entry rules, and finish or declare remaining food as required. Buy a fresh meal in Delhi only if you are still hungry after arrival.', sources.vietjet)
      ]}}
  ];

  // Native controls keep the chooser usable with keyboard, touch and screen readers.
  const root = document.getElementById('meal-chooser');
  if (!root) return;
  const el = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const link = (text, href) => {
    const node = el('a', '', text);
    node.href = href;
    node.target = '_blank';
    node.rel = 'noopener noreferrer';
    return node;
  };
  const dates = el('div', 'meal-dates');
  dates.setAttribute('role', 'group');
  dates.setAttribute('aria-label', 'Choose trip date');
  const controls = el('div', 'meal-periods');
  controls.setAttribute('role', 'group');
  controls.setAttribute('aria-label', 'Choose meal');
  const panel = el('div', 'meal-panel');
  panel.id = 'meal-panel';
  panel.setAttribute('aria-live', 'polite');
  root.append(dates, controls, panel);
  let selectedDay = 20;
  let selectedMeal = 'breakfast';
  const dayButtons = new Map();
  const mealButtons = new Map();
  days.forEach(day => {
    const button = el('button', '', day.label);
    button.type = 'button';
    button.setAttribute('aria-controls', panel.id);
    button.addEventListener('click', () => { selectedDay = day.date; render(); });
    dates.append(button);
    dayButtons.set(day.date, button);
  });
  ['breakfast', 'lunch', 'dinner'].forEach(meal => {
    const button = el('button', '', meal[0].toUpperCase() + meal.slice(1));
    button.type = 'button';
    button.setAttribute('aria-controls', panel.id);
    button.addEventListener('click', () => { selectedMeal = meal; render(); });
    controls.append(button);
    mealButtons.set(meal, button);
  });
  const price = cost => cost
    ? 'For 2: ≈¥' + cost.map(v => v.toLocaleString('en-US')).filter((v,i,a) => i === 0 || v !== a[0]).join('–') +
      ' / ≈₹' + cost.map(v => Math.round(v * 0.6099).toLocaleString('en-IN')).filter((v,i,a) => i === 0 || v !== a[0]).join('–')
    : 'Cost varies · confirm airport / airline prices';
  function render() {
    const day = days.find(item => item.date === selectedDay);
    const meal = day[selectedMeal];
    dayButtons.forEach((button, key) => button.setAttribute('aria-pressed', String(key === selectedDay)));
    mealButtons.forEach((button, key) => button.setAttribute('aria-pressed', String(key === selectedMeal)));
    panel.replaceChildren();
    panel.dataset.date = String(selectedDay);
    panel.dataset.meal = selectedMeal;
    const head = el('div', 'meal-heading');
    head.append(el('p', 'meal-route', day.label + ' · ' + selectedMeal[0].toUpperCase() + selectedMeal.slice(1)), el('h3', '', meal.time), el('p', 'meal-note', day.route + '. ' + meal.note));
    panel.append(head);
    const grid = el('div', 'meal-grid');
    meal.options.forEach((choice, i) => {
      const card = el('article', 'meal-option');
      card.append(el('span', 'meal-number', 'OPTION ' + (i + 1)), el('h4', '', choice.venue), el('p', 'meal-area', choice.area));
      const orders = el('div', 'meal-orders');
      [['Husband', choice.husband], ['Wife', choice.wife]].forEach(([person, dish]) => {
        const order = el('div', 'meal-order');
        order.append(el('b', '', person), el('p', '', dish));
        orders.append(order);
      });
      card.append(orders, el('p', 'meal-price', price(choice.cost)), el('span', 'meal-status', choice.status), el('p', 'meal-check', choice.note));
      const links = el('div', 'meal-links');
      const flight = /airside|cabin|flight|VJ\d|transit/i.test(choice.area);
      if (!flight) links.append(link('Find on Maps ↗', 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(choice.venue + ' ' + choice.area)));
      choice.sources.forEach((source, j) => links.append(link(j ? 'More details ↗' : choice.venue.startsWith('Hitokokyu') ? 'Local listing ↗' : 'Menu / details ↗', source)));
      card.append(links);
      grid.append(card);
    });
    panel.append(grid);
  }
  const followHash = () => {
    const match = location.hash.match(/^#meals-(2[0-8])(?:-(breakfast|lunch|dinner))?$/);
    if (!match) return false;
    selectedDay = Number(match[1]);
    selectedMeal = match[2] || 'lunch';
    render();
    document.getElementById('food').scrollIntoView({block:'start'});
    return true;
  };
  window.addEventListener('hashchange', followHash);
  if (!followHash()) render();
  // A full text list remains available for browsing and printing.
  const full = document.getElementById('meal-all-days');
  days.forEach(day => {
    const details = el('details', 'meal-full-day');
    details.append(el('summary', '', day.label + ' — all meals'));
    ['breakfast','lunch','dinner'].forEach(period => {
      details.append(el('h4', '', day[period].time));
      const list = el('ol');
      day[period].options.forEach(choice => {
        const item = el('li');
        item.append(el('b', '', choice.venue + ': '), el('span', '', 'Husband — ' + choice.husband + '. Wife — ' + choice.wife + '. ' + price(choice.cost) + '. ' + choice.note + ' '));
        choice.sources.forEach(source => item.append(link('Details ↗', source), ' '));
        list.append(item);
      });
      details.append(list);
    });
    full.append(details);
  });
  let printState = [];
  window.addEventListener('beforeprint', () => {
    const printable = [full.closest('details'), ...full.querySelectorAll('details')];
    printState = printable.map(node => [node, node.open]);
    printable.forEach(node => { node.open = true; });
  });
  window.addEventListener('afterprint', () => {
    printState.forEach(([node, open]) => { node.open = open; });
    printState = [];
  });
})();
