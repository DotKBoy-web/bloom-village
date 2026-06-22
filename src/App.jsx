import React, { useEffect, useMemo, useState } from 'react';

const SEEDS = [
  { id: 'sunflower', emoji: '🌻', buy: 4, sell: 3, name: { en: 'Sunflower', ar: 'دوار الشمس' } },
  { id: 'tulip', emoji: '🌷', buy: 5, sell: 4, name: { en: 'Tulip', ar: 'توليب' } },
  { id: 'rose', emoji: '🌹', buy: 6, sell: 5, name: { en: 'Rose', ar: 'وردة' } },
  { id: 'daisy', emoji: '🌼', buy: 3, sell: 2, name: { en: 'Daisy', ar: 'أقحوان' } },
  { id: 'lotus', emoji: '🪷', buy: 9, sell: 7, name: { en: 'Dream Lotus', ar: 'لوتس الأحلام' } }
];

const FURNITURE = [
  { id: 'heart-rug', emoji: '💗', price: 8, className: 'heart-rug', name: { en: 'Heart Rug', ar: 'سجادة قلب' } },
  { id: 'pet-bed', emoji: '🛏️', price: 10, className: 'pet-bed', name: { en: 'Pet Bed', ar: 'سرير الحيوانات' } },
  { id: 'potted-window', emoji: '🪴', price: 12, className: 'potted-window', name: { en: 'Window Plant', ar: 'نبتة النافذة' } },
  { id: 'cloud-lamp', emoji: '☁️', price: 14, className: 'cloud-lamp', name: { en: 'Cloud Lamp', ar: 'مصباح السحابة' } },
  { id: 'storybook-shelf', emoji: '📚', price: 16, className: 'storybook-shelf', name: { en: 'Storybook Shelf', ar: 'رف القصص' } },
  { id: 'flower-sofa', emoji: '🛋️', price: 20, className: 'flower-sofa', name: { en: 'Flower Sofa', ar: 'أريكة الزهور' } }
];

const VILLAGE = [
  { id: 'florist', emoji: '🐱', title: { en: 'Purr & Petal Florist', ar: 'متجر خرخرة وبتلات' }, owner: { en: 'Baby cat Poppy', ar: 'القطة الصغيرة بوبي' } },
  { id: 'market', emoji: '🐶', title: { en: 'Puppy Paws Market', ar: 'سوق كفوف الجرو' }, owner: { en: 'Baby dog Bobo', ar: 'الجرو الصغير بوبو' } },
  { id: 'homeShop', emoji: '🎀', title: { en: 'Cozy Tail Home Shop', ar: 'متجر الذيل الدافئ' }, owner: { en: 'Baby cat Mimi', ar: 'القطة الصغيرة ميمي' } },
  { id: 'home', emoji: '🏡', title: { en: 'Bloom House', ar: 'بيت بلوم' }, owner: { en: 'Your cozy garden home', ar: 'منزل الحديقة الدافئ' } }
];

const T = {
  en: {
    title: 'Cute Garden Town', note: 'Fairy note', next: 'Next level', garden: '🌷 Garden', village: '🗺️ Village', home: '🏡 Home',
    seedBasket: 'Seed basket', seedHint: 'Plant costs 1 star. Harvest gives 4 stars, 2 coins, and 1 flower.', wish: '✨ Make a wish', rename: '🌼🪧 Rename sign', basket: 'Flower basket',
    plant: 'Plant', water: 'Water', harvest: 'Harvest', buy: 'Buy', sell: 'Sell', place: 'Place', putAway: 'Put away', fresh: '🌈 Fresh village',
    villageTitle: 'Bloom Village Map', villageHint: 'Tap a shop to open it. Baby cats and dogs own the shops.', florist: 'Buy flowers from baby cat Poppy.', market: 'Sell flowers to baby dog Bobo.', homeShop: 'Buy furniture and decorate the house.',
    homeTitle: 'Bloom House', homeHint: 'Tap furniture inside the room to put it away. Use the shop to place it again.', signTitle: 'Flower sign', signPrompt: 'What should the garden be called?', save: 'Save', cancel: 'Cancel',
    storage: 'Owned, in storage', inHouse: 'In house now', level: 'Level', loading: 'Opening Bloom Village...', ar: 'AR',
    messages: { welcome: 'Welcome back to Bloom Village!', planted: 'Seed planted! 🌱', grew: 'Water sparkle! It grew bigger 💧', bloomed: 'Bloom! Your flower is ready 🌸', harvested: 'Harvested a flower, stars, and coins ⭐🪙', needStar: 'You need one star to plant ✨', wish: 'Wish granted! Three stars fell into your basket ✨', sold: 'Flower sold at Puppy Paws Market 🐶🪙', bought: 'Baby kitten wrapped a flower for you 🐱🌸', furniture: 'New furniture is in the house 🐶🛋️', cozy: 'The room feels extra cozy ✨', stored: 'Furniture moved to storage 📦', reset: 'A fresh Bloom Village appeared! 🌈' }
  },
  ar: {
    title: 'مدينة الحديقة اللطيفة', note: 'ملاحظة الجنية', next: 'المستوى التالي', garden: '🌷 الحديقة', village: '🗺️ القرية', home: '🏡 المنزل',
    seedBasket: 'سلة البذور', seedHint: 'الزراعة تكلف نجمة واحدة. الحصاد يعطي 4 نجوم و2 عملة وزهرة واحدة.', wish: '✨ تمنّي أمنية', rename: '🌼🪧 تغيير اللوحة', basket: 'سلة الزهور',
    plant: 'ازرع', water: 'اسقِ', harvest: 'احصد', buy: 'شراء', sell: 'بيع', place: 'وضع', putAway: 'إزالة', fresh: '🌈 قرية جديدة',
    villageTitle: 'خريطة قرية بلوم', villageHint: 'اضغطي على المتجر لفتحه. القطط والجراء الصغيرة تملك المتاجر.', florist: 'اشتري الزهور من القطة الصغيرة بوبي.', market: 'بيعي الزهور للجرو الصغير بوبو.', homeShop: 'اشتري الأثاث وزيّني المنزل.',
    homeTitle: 'بيت بلوم', homeHint: 'اضغطي على الأثاث داخل الغرفة لتخزينه. استخدمي المتجر لإعادته.', signTitle: 'لوحة الزهور', signPrompt: 'ما اسم الحديقة؟', save: 'حفظ', cancel: 'إلغاء',
    storage: 'مملوك، في التخزين', inHouse: 'موجود في المنزل', level: 'المستوى', loading: 'يتم فتح قرية بلوم...', ar: 'EN',
    messages: { welcome: 'مرحباً بعودتك إلى قرية بلوم!', planted: 'تمت زراعة البذرة! 🌱', grew: 'سقاية لامعة! لقد كبرت 💧', bloomed: 'تفتحت! الزهرة جاهزة 🌸', harvested: 'تم حصاد زهرة ونجوم وعملات ⭐🪙', needStar: 'تحتاجين إلى نجمة للزراعة ✨', wish: 'تمت الأمنية! سقطت ثلاث نجوم في السلة ✨', sold: 'تم بيع الزهرة في سوق كفوف الجرو 🐶🪙', bought: 'القطة الصغيرة جهزت زهرة لك 🐱🌸', furniture: 'الأثاث الجديد أصبح في المنزل 🐶🛋️', cozy: 'أصبحت الغرفة أكثر دفئاً ✨', stored: 'تم نقل الأثاث إلى التخزين 📦', reset: 'ظهرت قرية بلوم جديدة! 🌈' }
  }
};

function makeInitialState() {
  return {
    playerName: 'Garden Star', stars: 12, coins: 15, level: 1, totalHarvest: 0, butterflies: 0,
    plots: Array.from({ length: 20 }, (_, slot) => ({ slot, seed: '', stage: 0, sparkle: 0 })),
    flowers: Object.fromEntries(SEEDS.map((seed) => [seed.id, 0])),
    furniture: Object.fromEntries(FURNITURE.map((item, index) => [item.id, { owned: index < 2, placed: index < 2 }]))
  };
}

function readSave() {
  try {
    return { ...makeInitialState(), ...JSON.parse(localStorage.getItem('bloomVillageSave') || '{}') };
  } catch {
    return makeInitialState();
  }
}

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('bloomVillageLang') || 'en');
  const [game, setGame] = useState(readSave);
  const [view, setView] = useState('garden');
  const [seed, setSeed] = useState('sunflower');
  const [spot, setSpot] = useState('florist');
  const [message, setMessage] = useState(T[lang].messages.welcome);
  const [renameOpen, setRenameOpen] = useState(false);
  const [nameDraft, setNameDraft] = useState(game.playerName);
  const t = T[lang];

  useEffect(() => localStorage.setItem('bloomVillageSave', JSON.stringify(game)), [game]);
  useEffect(() => localStorage.setItem('bloomVillageLang', lang), [lang]);

  const selectedSeed = useMemo(() => SEEDS.find((item) => item.id === seed) || SEEDS[0], [seed]);
  const selectedSpot = VILLAGE.find((item) => item.id === spot) || VILLAGE[0];
  const harvestProgress = game.totalHarvest % 5;

  function update(mutator, msg) {
    setGame((current) => {
      const copy = JSON.parse(JSON.stringify(current));
      mutator(copy);
      return copy;
    });
    setMessage(msg);
  }

  function plant(slot) {
    update((copy) => {
      const plot = copy.plots[slot];
      if (plot.stage !== 0 || copy.stars < 1) return;
      copy.stars -= 1;
      plot.seed = seed;
      plot.stage = 1;
      plot.sparkle = Math.floor(Math.random() * 4);
    }, game.stars < 1 ? t.messages.needStar : t.messages.planted);
  }

  function water(slot) {
    update((copy) => {
      const plot = copy.plots[slot];
      if (plot.stage === 0) return;
      if (plot.stage < 3) {
        plot.stage += 1;
        plot.sparkle = Math.floor(Math.random() * 4);
      }
    }, game.plots[slot].stage === 2 ? t.messages.bloomed : t.messages.grew);
  }

  function harvest(slot) {
    const plot = game.plots[slot];
    if (!plot || plot.stage < 3) return setMessage(t.messages.bloomed);
    update((copy) => {
      const p = copy.plots[slot];
      copy.stars += 4;
      copy.coins += 2;
      copy.totalHarvest += 1;
      copy.level = 1 + Math.floor(copy.totalHarvest / 5);
      if (Math.random() < 0.25) copy.butterflies += 1;
      copy.flowers[p.seed] = (copy.flowers[p.seed] || 0) + 1;
      copy.plots[slot] = { slot, seed: '', stage: 0, sparkle: 0 };
    }, t.messages.harvested);
  }

  function sellFlower(flower) {
    const item = SEEDS.find((seedItem) => seedItem.id === flower);
    if (!item || (game.flowers[flower] || 0) < 1) return;
    update((copy) => { copy.flowers[flower] -= 1; copy.coins += item.sell; }, t.messages.sold);
  }

  function buyFlower(flower) {
    const item = SEEDS.find((seedItem) => seedItem.id === flower);
    if (!item || game.coins < item.buy) return;
    update((copy) => { copy.coins -= item.buy; copy.flowers[flower] = (copy.flowers[flower] || 0) + 1; }, t.messages.bought);
  }

  function buyFurniture(itemId) {
    const item = FURNITURE.find((f) => f.id === itemId);
    if (!item || game.furniture[itemId]?.owned || game.coins < item.price) return;
    update((copy) => { copy.coins -= item.price; copy.furniture[itemId] = { owned: true, placed: true }; }, t.messages.furniture);
  }

  function toggleFurniture(itemId) {
    if (!game.furniture[itemId]?.owned) return;
    update((copy) => { copy.furniture[itemId].placed = !copy.furniture[itemId].placed; }, game.furniture[itemId].placed ? t.messages.stored : t.messages.cozy);
  }

  function saveName(event) {
    event.preventDefault();
    update((copy) => { copy.playerName = nameDraft.trim().slice(0, 16) || 'Garden Star'; }, '🌼');
    setRenameOpen(false);
  }

  function switchLanguage() {
    const next = lang === 'en' ? 'ar' : 'en';
    setLang(next);
    setMessage(T[next].messages.welcome);
  }

  return (
    <main className={`screen lang-${lang}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="cloud one">☁️</div><div className="cloud two">☁️</div><div className="sun">☀️</div>
      <section className="shell">
        <header className="topBar">
          <div><p className="eyebrow">Bloom Village</p><h1>{game.playerName}&apos;s {t.title}</h1></div>
          <div className="stats"><span>⭐ {game.stars}</span><span>🪙 {game.coins}</span><span>🏅 {game.level}</span><span>🦋 {game.butterflies}</span><button onClick={switchLanguage}>{t.ar}</button></div>
        </header>
        <section className="note"><div><p className="eyebrow">{t.note}</p><h2>{message}</h2></div><div className="level"><strong>{t.next}</strong><div><span style={{ width: `${harvestProgress * 20}%` }} /></div><small>{harvestProgress}/5</small></div></section>
        <nav className="tabs"><button className={view === 'garden' ? 'active' : ''} onClick={() => setView('garden')}>{t.garden}</button><button className={view === 'village' ? 'active' : ''} onClick={() => setView('village')}>{t.village}</button><button className={view === 'home' ? 'active' : ''} onClick={() => setView('home')}>{t.home}</button></nav>

        {view === 'garden' && <section className="content"><aside className="panel"><h2>{t.seedBasket}</h2><p>{t.seedHint}</p><div className="seedList">{SEEDS.map((item) => <button key={item.id} className={seed === item.id ? 'selected' : ''} onClick={() => setSeed(item.id)}><span>{item.emoji}</span>{item.name[lang]}</button>)}</div><button className="wide wish" onClick={() => update((copy) => { copy.stars += 3; }, t.messages.wish)}>{t.wish}</button><button className="wide" onClick={() => setRenameOpen(true)}>{t.rename}</button><div className="mini"><h3>{t.basket}</h3>{SEEDS.map((item) => <p key={item.id}>{item.emoji} {item.name[lang]} <b>x{game.flowers[item.id] || 0}</b></p>)}</div></aside><section className="gardenBoard">{game.plots.map((plot) => <article key={plot.slot} className={`plot s${plot.stage}`}><button className="plotFace" onClick={() => plot.stage === 0 ? plant(plot.slot) : water(plot.slot)}><span>{plot.stage === 0 ? '🟫' : plot.stage === 1 ? '🌱' : plot.stage === 2 ? '🌿' : SEEDS.find((item) => item.id === plot.seed)?.emoji}</span></button>{plot.stage < 3 ? <button onClick={() => plot.stage === 0 ? plant(plot.slot) : water(plot.slot)}>{plot.stage === 0 ? `${t.plant} ${selectedSeed.emoji}` : `${t.water} 💧`}</button> : <button onClick={() => harvest(plot.slot)}>{t.harvest} 🧺</button>}</article>)}</section></section>}

        {view === 'village' && <section className="content villageContent"><section className="villageMap panel"><h2>{t.villageTitle}</h2><p>{t.villageHint}</p><div className="mapGrid">{VILLAGE.map((item) => <button key={item.id} className={spot === item.id ? 'active' : ''} onClick={() => item.id === 'home' ? setView('home') : setSpot(item.id)}><span>{item.emoji}</span><strong>{item.title[lang]}</strong><small>{item.owner[lang]}</small></button>)}</div></section><aside className="panel"><h2>{selectedSpot.title[lang]}</h2><p>{selectedSpot.owner[lang]}</p>{spot === 'florist' && <Shop title={t.florist} items={SEEDS} lang={lang} actionText={t.buy} action={buyFlower} price="buy" />}{spot === 'market' && <Shop title={t.market} items={SEEDS} lang={lang} actionText={t.sell} action={sellFlower} price="sell" counts={game.flowers} />}{spot === 'homeShop' && <FurnitureShop t={t} lang={lang} game={game} buyFurniture={buyFurniture} toggleFurniture={toggleFurniture} />}</aside></section>}

        {view === 'home' && <section className="content homeContent"><section className="housePanel panel"><h2>{t.homeTitle}</h2><p>{t.homeHint}</p><div className="house"><div className="roof" /><div className="room"><span className="window">🪟</span><span className="door">🚪</span><span className="cat">🐱</span><span className="dog">🐶</span>{FURNITURE.filter((item) => game.furniture[item.id]?.placed).map((item) => <button key={item.id} className={`furniture ${item.className}`} onClick={() => toggleFurniture(item.id)}>{item.emoji}</button>)}</div></div></section><aside className="panel"><FurnitureShop t={t} lang={lang} game={game} buyFurniture={buyFurniture} toggleFurniture={toggleFurniture} /></aside></section>}

        <footer><span>{t.seedHint}</span><button onClick={() => { setGame(makeInitialState()); setMessage(t.messages.reset); }}>{t.fresh}</button></footer>
      </section>
      {renameOpen && <div className="modal"><form onSubmit={saveName}><h2>{t.signTitle}</h2><p>{t.signPrompt}</p><input autoFocus maxLength={16} value={nameDraft} onChange={(e) => setNameDraft(e.target.value)} /><div><button type="button" onClick={() => setRenameOpen(false)}>{t.cancel}</button><button>{t.save}</button></div></form></div>}
    </main>
  );
}

function Shop({ title, items, lang, actionText, action, price, counts = {} }) {
  return <div className="shop"><p>{title}</p>{items.map((item) => <div key={item.id} className="row"><span>{item.emoji} {item.name[lang]} {counts[item.id] !== undefined && <small>x{counts[item.id] || 0}</small>}</span><button onClick={() => action(item.id)}>{actionText} {price === 'sell' ? '+' : ''}{item[price]} 🪙</button></div>)}</div>;
}

function FurnitureShop({ t, lang, game, buyFurniture, toggleFurniture }) {
  return <div className="shop"><h3>🎀 {t.homeShop}</h3>{FURNITURE.map((item) => { const status = game.furniture[item.id] || { owned: false, placed: false }; return <div key={item.id} className="row"><span>{item.emoji} {item.name[lang]} <small>{status.owned ? (status.placed ? t.inHouse : t.storage) : `${item.price} 🪙`}</small></span>{status.owned ? <button onClick={() => toggleFurniture(item.id)}>{status.placed ? t.putAway : t.place}</button> : <button onClick={() => buyFurniture(item.id)}>{t.buy}</button>}</div>; })}</div>;
}

export default App;
