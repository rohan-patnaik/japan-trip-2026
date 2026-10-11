/* Meal routes updated 12 Oct 2026 for Kyoto 23–25 / Osaka 25–28, booked teamLab, proposed Sagano and AONIYOSHI. Costs are planning estimates for TWO.
   A paired option gives each traveller an order at the same stop. */
(() => {
  'use strict';
  const sources = {
    table36: 'https://swissotelnankaiosaka.com/restaurants-and-bars/table36/',
    table36Menu: 'https://swissotelnankaiosaka.com/wp-content/uploads/sites/168/2026/08/Table36_Dinner_Menu_A3_2609.pdf',
    table36Book: 'https://www.tablecheck.com/en/shops/swissotelnankaiosaka-table36/reserve',
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
      ['Pork-ham or chicken sandwich + milk', 'Plain bread + cheese + fruit, or oat crackers if no suitable bread']
    ];
    return stores.map(([store, source], i) => {
      const [husband, wife] = orders[(i + rotation) % orders.length];
      return option(store + ' takeaway breakfast', area, husband, wife, [900, 1800], label,
        timing + ' Buy the night before when leaving early; select a nearby open branch. For her: no visible meat/fish/egg pieces or noticeable non-veg smell; incorporated egg in batter/baked food and stocks are acceptable under those conditions. Plain salt rice is a straightforward choice. Bread, yogurt and fillings vary. For him: check sandwich meat and sauces for beef.', source);
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
      'Near Shinsaibashi; if staying in Tennoji: allow a metro trip and walk. Dinner 17:30–21:30, food last order 21:00. Soy “chicken” and mock seafood are plant-based. Recheck the holiday calendar.', sources.paprika);
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
    {date:21, label:'Sat 21 · Ginza / Kappabashi / Shibuya', route:'Iriya → Ginza shoe order → Kappabashi gifts → Shibuya Sky → PARCO → conditional Ginza collection',
      breakfast:{time:'07:30–08:15 · before leaving', note:'Eat before leaving at 08:45 for the Ginza queue; carry a labelled snack in case the order takes longer.', options:breakfasts('Near the Senzoku / Iriya hotel', 'Eat before the Ginza / Kappabashi journey.', 0)},
      lunch:{time:'12:00–12:30 · Ginza; or Asakusa before Kappabashi', note:'Jangara Ginza best fits the main route. Kaminoya adds an Asakusa detour and needs an earlier shoe-order finish. A packed meal is the fallback for a long queue. Leave Kappabashi by 14:15 for Shibuya Sky.', options:[
        option('Kyushu Jangara Ginza', 'Ginza — lunch before the train to Tawaramachi', 'Bonshan pork ramen or spicy Karabon, after confirming no beef ingredients', 'Vegan black-garlic or vegan shoyu ramen', [2800,4200], vegan, 'Official shop list currently shows 11:00–22:30. Confirm the vegan bowl is available at this branch; regular ramen is not vegetarian. Aim to finish lunch by 12:30; queues could make takeaway more practical.', sources.jangara, ['https://kyushujangara.co.jp/en/shoplist/']),
        option('Kaminoya Kaminarimon — monja / okonomiyaki', '1-34-4 Asakusa, Aqua Building 2F — detour before Kappabashi', 'Vegan okonomiyaki, or a pork version only after checking no beef', 'Vegan monja, vegan okonomiyaki or vegan yakisoba', [3500,5500], vegan, 'Use only if the shoe order finishes early: travel to Asakusa, allow about 30 minutes for cooking, then walk toward Kappabashi. Recheck Saturday lunch hours. Select the dedicated vegan menu and broth for her; keep the 14:15 departure toward Shibuya.', sources.monja),
        option('Label-checked takeaway / packed lunch', 'Buy near the hotel or Ginza; eat only where permitted', 'Salmon or tuna-mayo onigiri + edamame + suitable drink', 'Two plain salt onigiri + edamame + nuts + milk or soy drink', [1200,2200], label, 'Fast fallback if the shoe queue runs late. Buy from a nearby 7-Eleven, FamilyMart or Lawson and inspect every label: no visible animal pieces or noticeable non-veg smell for her; incorporated egg and stocks can fit her preference. No beef ingredients for him. Carry plain oat crackers and nuts if no suitable rice balls are available.', sources.seven, [sources.family, sources.lawson])
      ]},
      dinner:{time:'18:15–19:00 · Shibuya; or Ginza after shoe collection', note:'Confirm the shoe-collection deadline before leaving Ginza in the morning. Shorten PARCO and move dinner after collection if required; a Harajuku detour no longer fits this route.', options:[
        option('Jikasei MENSHO', 'Shibuya PARCO B1, 15-1 Udagawacho', 'Vegan miso ramen + pork-chashu topping if staff confirms availability and no beef', 'Vegan tantanmen or spicy vegan miso ramen', [3000,4500], vegan, '11:30–23:00, last order 22:00. His signature chicken-paitan bowl includes A5 wagyu: skip it. Use a vegan base for his pork addition; her bowl stays entirely vegan. Finish in time for any Ginza collection deadline.', sources.mensho),
        option('Kyushu Jangara Ginza', 'Ginza — dinner after collecting the shoes', 'Bonshan pork ramen or spicy Karabon, after confirming no beef ingredients', 'Vegan black-garlic or vegan shoyu ramen', [2800,4200], vegan, 'Official shop list currently shows 11:00–22:30, last order 22:15. Collect the shoes first, then dine. Confirm the vegan bowl is available at this branch; choose a different dish if you ate here at lunch.', sources.jangara, ['https://kyushujangara.co.jp/en/shoplist/']),
        coco('Shibuya — choose a branch with vegetarian curry', 'Fit this around PARCO or Shibuya Station; confirm the branch first and leave enough time for Ginza collection.')
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
    {date:23, label:'Mon 23 · To Kyoto', route:'Tokyo Station → Kyoto → hotel / station shops → optional Gion',
      breakfast:{time:'07:00–08:00 · hotel / train takeaway', note:'Public holiday. Buy ahead; do not queue just before the ≈09:30 Nozomi to Kyoto.', options:breakfasts('Senzoku / Iriya; eat before check-out or take onto the train', 'Buy ahead for the transfer morning.', 2)},
      lunch:{time:'12:00–13:00 · Kyoto Station / Shichijo', note:'Leave bags at your Kyoto hotel before lunch; stay near the station for an indoor arrival afternoon.', options:[
        uno('Kyoto Station 10F · Kyoto Ramen Koji', 'Both vegan; allow for public-holiday queues.'),
        option('Veg Out', 'Shichijo / Kamo River, Kyoto', 'Seasonal vegan lunch plate', 'Vegan curry or plant-based lunch', [3200,5000], allVegan, 'Confirm Monday / public-holiday opening before walking from Kyoto Station; all food is vegan.', sources.vegout),
        coco('Kyoto Station area — participating branch', 'Confirm the named vegetarian curry before going.', 'Chicken-katsu curry on pork or vegetarian sauce')
      ]},
      dinner:{time:'18:30–20:00 · Kyoto', note:'Itadakizen is normally closed on the fourth Monday (23 Nov). Choose Gion if taking the evening walk, or the station for an easy hotel return.', options:[
        uno('Gion / Higashiyama branch', 'Check evening hours after the optional dusk walk.'),
        uno('Kyoto Station 10F · Kyoto Ramen Koji', 'Easy station-area dinner, both eating vegan.'),
        coco('Kyoto Station area — participating branch', 'Confirm current hours and vegetarian curry.', 'Pork-katsu curry on pork or vegetarian sauce')
      ]}},
    {date:24, label:'Tue 24 · Kyoto', route:'Kyoto hotel → Fushimi Inari → Higashiyama → lunch → booked teamLab 14:30–15:00 entry → Kyoto hotel',
      breakfast:{time:'07:00–07:30 · Kyoto breakfast', note:'Buy supplies on 23 Nov. Leave enough time to reach Fushimi Inari by 08:00; no Osaka commute.', options:breakfasts('Near your Kyoto Station hotel', 'Takeaway, bought the previous night.', 0)},
      lunch:{time:'12:00–13:00 · Kyoto, before teamLab', note:'UNO fits Gion best. CHOICE and Veg Out need a shorter temple / slopes visit and adjusted travel. Leave lunch by 13:00 for the booked 14:30–15:00 entry; do not join a long restaurant queue. Itadakizen is closed Tuesdays.', options:[
        uno('Gion, 40 Kameicho, Yamato-oji'),
        option('CHOICE · vegan café', '89-1 Ohashicho, Sanjo Keihan, Kyoto', 'Vegan cheese burger or bean-and-grain patty plate', 'Mushroom stroganoff + sprouted brown rice', [3200,5000], allVegan, 'Lunch 11:00–15:00; closed Wednesday, open Tuesday on the published schedule. ~20-minute walk north from central Gion: shorten the slopes visit, eat by 12:00, then allow 30–45 minutes by taxi to teamLab. All food is vegan, including “egg” sandwiches and cheese.', sources.choice, [sources.choiceHours]),
        option('Veg Out', '44 Inaricho, Shichijo / Kamo River, Kyoto', 'Seasonal vegan lunch plate', 'Vegan curry or the day’s plant-based lunch', [3200,5000], allVegan, 'From Higashiyama go south to Shichijo (~20–30 minutes depending on your stop), shortening the slopes route. Confirm Tuesday lunch hours; leave by 13:00. This is nearer the museum, but the remaining walk is exposed: taxi if wanted.', sources.vegout)
      ]},
      dinner:{time:'18:00–19:00 · Gion or Kyoto Station', note:'Eat in Kyoto after the optional dusk Gion walk, or skip that loop and eat by the station. Return to your Kyoto hotel around 19:30–20:00; no Osaka return commute.', options:[
        uno('Gion, 40 Kameicho, Yamato-oji', 'Fits the evening Gion loop. Confirm Tuesday dinner service and last order; avoid repeating your lunch dish.'),
        uno('Kyoto Station 10F · Kyoto Ramen Koji', 'Useful if skipping the Gion loop or returning from it; check last order and queue.'),
        coco('Kyoto Station area — participating branch', 'Confirm hours and vegetarian curry; eat before the short hotel return.', 'Chicken-katsu curry on vegetarian or pork sauce')
      ]}},
    {date:25, label:'Wed 25 · Anniversary', route:'Kyoto hotel checkout / bag storage → early bamboo walk → Sagano 09:02 → JR return → Shigetsu → collect bags → AONIYOSHI 16:50 → Osaka',
      breakfast:{time:'06:45–07:15 · light Kyoto breakfast', note:'Keep breakfast light for Shigetsu; checkout, store bags and aim for Arashiyama by 08:00. Short bamboo walk, then Torokko Saga by 08:40 for the 09:02 train. If skipping Sagano, the original later breakfast is fine.', options:breakfasts('Near your Kyoto Station hotel', 'Buy before this early start.', 1)},
      lunch:{time:'11:00 · Arashiyama', note:'Shigetsu is the planned anniversary meal, subject to reservation. The other two are alternatives if you change the plan.', options:[
        option('Shigetsu · Tenryu-ji', 'Inside Tenryu-ji, Arashiyama', 'Tsuki shojin set', 'Tsuki shojin set — seasonal temple vegetables and tofu', [13000,13000], allVegan, 'Planned 11:00, not marked booked. Reserve at least 3 days ahead for Tsuki (¥6,500 each); garden admission ¥500 each is separate and already in your sightseeing plan. Yuki ¥3,800 / Hana ¥9,000 are other course choices. Lunch 11:00–14:00; closed Thursday.', sources.shigetsu),
        option('M’s Bento', 'Across from JR Saga-Arashiyama Station, Nagai Sangyo Building 3F', 'Premium vegan nori-roll set', 'Premium vegan nori-roll set with tofu fritter and vegetable sides', [5160,5160], allVegan, 'Official set ¥2,580 each; kombu/shiitake-based miso soup. Small venue: confirm Wednesday service and reserve. Allow ~10–15 minutes between the temple / bamboo grove and the station.', sources.ms),
        option('musubi cafe Arashiyama', '1-8 Arashiyama Nishiichikawacho, near Hankyu Arashiyama', 'Chickpea-and-tomato curry set', 'Vegetable tomato spaghetti set, without visible non-veg pieces or noticeable smell', [3400,4000], check, 'Lunch starts 11:30, so change the 11:00 lunch slot. Across the river from Tenryu-ji. Published sets ¥1,700 each; ask for no visible animal pieces or noticeable non-veg smell; incorporated egg and stocks are acceptable under her updated preference.', sources.musubi)
      ]},
      dinner:{time:'20:00–21:30 · Table36 anniversary dinner together', note:'After AONIYOSHI 16:50–18:16, check in and freshen up; aim to reach Swissôtel Nankai by 19:50. Three order combinations at the same upscale restaurant. Request a romantic window table, candle / LED candle and dessert message; arrangements and any extra charge need confirmation. Not booked.', options:[
        option('Table36 · recommended chicken pairing', 'Swissôtel Nankai Osaka 36F, directly above Nankai Namba', 'Roast boneless half chicken', 'Pumpkin rigatoni; vegan version available if preferred', [13000,16000], check, 'Chicken ¥4,800 + rigatoni ¥3,500 + shared vegan tomatoes ¥1,200 and yuzu granita ¥1,200 = ¥10,700 food, tax/service included. Allow the displayed range with drinks; decoration extra if charged. Confirm no beef in his sauce and no visible non-veg or noticeable smell in her dish.', sources.table36, [sources.table36Menu, sources.table36Book]),
        option('Table36 · fish pairing', 'Same restaurant / same table', 'Barramundi steamed in herb butter', 'Pumpkin rigatoni; vegan version available if preferred', [13000,16000], check, 'Fish ¥4,500: same shared starter/dessert gives ¥10,400 food, tax/service included. Displayed range allows drinks. Her plate remains vegetable-based; confirm suitable preparation and candle request.', sources.table36, [sources.table36Menu, sources.table36Book]),
        option('Table36 · pork pairing', 'Same restaurant / same table', 'Koji-marinated pork chop', 'Pumpkin rigatoni; vegan version available if preferred', [13000,16000], check, 'Pork ¥4,200: same shared starter/dessert gives ¥10,100 food, tax/service included. Displayed range allows drinks. Confirm no beef stock in his sauce; request anniversary plating and quote any charge.', sources.table36, [sources.table36Menu, sources.table36Book])
      ]}},
    {date:26, label:'Thu 26 · USJ', route:'Osaka hotel → Universal Studios Japan → Osaka hotel',
      breakfast:{time:'Before leaving for the opening queue', note:'Buy on 25 Nov and eat before entering the park. Do not spend your opening-hour ride time looking for breakfast.', options:breakfasts('Near your final Osaka hotel (Namba or Tennoji)', 'Eat before the gates; park food rules apply.', 2)},
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
    {date:27, label:'Fri 27 · Osaka', route:'Osaka hotel → Dotonbori → Bic Camera / open Den Den stores → lunch → Pokémon Center 13:00 → Den Den Town OR Umeda → optional Harukas',
      breakfast:{time:'08:00–09:00 · before the morning walk', note:'Eat near the hotel before the 09:30 Dotonbori photo stop. Pokémon Center is now planned for 13:00.', options:breakfasts('Near your final Osaka hotel (Namba or Tennoji)', 'Also buy tomorrow’s early-airport breakfast tonight.', 0)},
      lunch:{time:'11:30–12:30 · Shinsaibashi / Namba', note:'Eat before the 13:00 indoor Pokémon Center visit. Paprika needs a walk west to Shinmachi; reserve the return-walk buffer.', options:[
        option('Paprika Shokudo Vegan', 'Shinmachi / Yotsubashi, Osaka', 'Vegan burger', 'Soy-karaage lunch / current plant-based lunch plate', [3000,4500], allVegan, 'About 10–20 minutes on foot from Shinsaibashi depending on your starting point. Confirm Friday lunch hours and lunch menu rather than using the dinner menu prices.', sources.paprika),
        rize(),
        coco('Dotonbori / Namba — participating branch', 'Choose a confirmed lunch branch and return to Daimaru by 13:00.', 'Pork-katsu curry on pork or vegetarian sauce')
      ]},
      dinner:{time:'18:30–20:00 · after Harukas', note:'Choose the hotel-area curry if confirmed, or make a final Namba / Shinsaibashi food stop. Pack after dinner.', options:[
        coco('Tennoji / Abeno, or a confirmed Namba branch', 'Check vegetarian-curry availability; do not assume every outlet serves it.'),
        fire('Metro to Shinsaibashi / Namba, then walk to Amemura.', 'Sesame ramen + vegan gyoza', 'Tomato ramen + vegan gyoza'),
        paprika('Vegan burger + vegan gyoza to share', 'Soy-karaage set; chilli seasoning if available')
      ]}},
    {date:28, label:'Sat 28 · Home', route:'Osaka hotel → Nankai Namba or Shin-Imamiya → Kansai Airport → Hanoi → Delhi',
      breakfast:{time:'05:00–05:40 · before check-out', note:'Buy on 27 Nov. Check-out is 05:50, so breakfast restaurants are not a dependable plan.', options:[
        option('7-Eleven — breakfast bought Friday night', 'Eat at your Osaka hotel before leaving', 'Salmon onigiri + boiled egg', 'Plain salt onigiri + edamame + milk', [900,1600], label, 'Read current ingredients, especially her rice seasoning. Keep chilled items refrigerated and eat before travel. Use dry crackers if refrigeration is unavailable.', sources.seven),
        option('FamilyMart — breakfast bought Friday night', 'Eat at the hotel before 05:50', 'Egg sandwich + milk / coffee', 'Plain yogurt + oats + nuts', [900,1700], label, 'For her: plain yogurt without gelatin, plain oats; incorporated egg in bakery items is acceptable if there are no animal pieces or noticeable non-veg smell. Keep yogurt and sandwich refrigerated overnight.', sources.family),
        option('Lawson dry-food breakfast / KIX top-up', 'Eat before leaving; optional KIX drink after check-in', 'Chicken / pork-ham sandwich if refrigerated, or oat crackers + nuts', 'Egg-free oat crackers + nuts + shelf-stable milk or soy drink', [1000,1800], label, 'Buy ahead. Do not delay export checks or check-in to search for food. KIX shop hours vary; no suitable early hot vegetarian breakfast is confirmed.', sources.lawson, [sources.kix])
      ]},
      lunch:{time:'KIX → Hanoi flight / Hanoi transit', note:'Carry a separate lunch portion. Hanoi is international airside; no city-restaurant detour.', options:travel('VJ939 / Hanoi international airside', 'During the flight or the long Hanoi connection.')},
      dinner:{time:'Hanoi transit / flight to Delhi', note:'Plan dinner before arrival in Delhi at 22:50. Use a new sealed portion; do not keep breakfast dairy all day.', options:[
        option('Hanoi airside food counter + packed vegetarian meal', 'Hanoi international departures', 'Chicken rice / chicken pho if no beef stock', 'Sealed egg-free crackers, roasted chana and nuts + suitable drink', null, check, 'Ask about his broth and sauce. Vegetable pho may use fish/meat stock; she accepts stock only when no animal pieces or noticeable non-veg smell remain, which cannot be confirmed in advance. Airside venue and vegan availability are unconfirmed; keep a full packed portion for her.', sources.hanoi),
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
