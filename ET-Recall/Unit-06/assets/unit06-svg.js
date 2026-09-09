(() => {
  "use strict";

  const BASE = "/assets/svg/";
  const MAP = Object.freeze({
    "engine-head": "01_engine_head.svg",
    "engine-block": "02_engine_block.svg",
    "oil-sump": "03_oil_sump.svg",
    "piston": "04_piston.svg",
    "piston-rod": "05_piston_rod.svg",
    "crankshaft": "06_crankshaft.svg",
    "inlet-valve": "07_inlet_valve.svg",
    "exhaust-valve": "08_exhaust_valve.svg",
    "four-stroke-cycle": "09_four_stroke_cycle.svg",
    "two-stroke-cycle": "10_two_stroke_cycle.svg",
    "fuel-system": "11_fuel_system.svg",
    "carburetor": "12_carburetor.svg",
    "fuel-injector": "13_fuel_injector.svg",
    "ignition-coil": "14_ignition_coil.svg",
    "spark-plug": "15_spark_plug.svg",
    "lubrication-system": "16_lubrication_system.svg",
    "oil-pump": "17_oil_pump.svg",
    "oil-filter": "18_oil_filter.svg",
    "brake-system": "19_brake_system.svg",
    "radiator-cooling-system": "20_radiator_cooling_system.svg",
    "water-pump": "21_water_pump.svg",
    "battery": "22_battery.svg",
    "alternator": "23_alternator.svg",
    "starter-motor": "24_starter_motor.svg",
    "clutch": "25_clutch.svg",
    "gearbox": "26_gearbox.svg",
    "differential": "27_differential.svg",
    "tyre-construction": "28_tyre_construction.svg"
  });

  // Strong aliases only. Existing real card.image always has priority.
  // Canonical Sinhala wording used by the Unit 06 note is intentionally included.
  const ALIASES = Object.freeze([
    ["radiator cooling system", "radiator-cooling-system"],
    ["radiator and cooling system", "radiator-cooling-system"],
    ["සිසිලන පද්ධතිය", "radiator-cooling-system"],
    ["සීතල කිරීමේ පද්ධතිය", "radiator-cooling-system"],
    ["රේඩියේටරය", "radiator-cooling-system"],

    ["four stroke cycle", "four-stroke-cycle"],
    ["four stroke", "four-stroke-cycle"],
    ["4 stroke", "four-stroke-cycle"],
    ["සිව් පහර", "four-stroke-cycle"],
    ["සිව්පහර", "four-stroke-cycle"],
    ["හතර පහර", "four-stroke-cycle"],

    ["two stroke cycle", "two-stroke-cycle"],
    ["two stroke", "two-stroke-cycle"],
    ["2 stroke", "two-stroke-cycle"],
    ["දෙ පහර", "two-stroke-cycle"],
    ["දෙපහර", "two-stroke-cycle"],

    ["engine head", "engine-head"],
    ["cylinder head", "engine-head"],
    ["එන්ජින් හිස", "engine-head"],
    ["සිලින්ඩර හිස", "engine-head"],

    ["engine block", "engine-block"],
    ["cylinder block", "engine-block"],
    ["එන්ජින් බ්ලොක්", "engine-block"],
    ["සිලින්ඩර බ්ලොක්", "engine-block"],
    ["එන්ජින් බඳ", "engine-block"],
    ["එන්ජින් බොඩිය", "engine-block"],

    ["oil sump", "oil-sump"],
    ["ඔයිල් සම්ප්", "oil-sump"],
    ["තෙල් දෙන", "oil-sump"],

    ["connecting rod", "piston-rod"],
    ["piston rod", "piston-rod"],
    ["කනෙක්ටින් රොඩ්", "piston-rod"],
    ["සම්බන්ධක දණ්ඩ", "piston-rod"],
    ["සබැඳුම් දණ්ඩ", "piston-rod"],
    ["පිස්ටන් අත", "piston-rod"],

    ["piston", "piston"],
    ["පිස්ටනය", "piston"],
    ["පිස්ටන්", "piston"],

    ["crank shaft", "crankshaft"],
    ["crankshaft", "crankshaft"],
    ["ක්‍රෑන්ක් ෂාෆ්ට්", "crankshaft"],
    ["ක්‍රෑන්ක්ශාෆ්ට්", "crankshaft"],
    ["දඟර කඳ", "crankshaft"],

    ["inlet valve", "inlet-valve"],
    ["intake valve", "inlet-valve"],
    ["ඉන්ලට් වෑල්ව්", "inlet-valve"],
    ["ආදාන කපාට", "inlet-valve"],
    ["චූෂණ වෑල්ව", "inlet-valve"],
    ["චූෂණ වෑල්ව්", "inlet-valve"],

    ["exhaust valve", "exhaust-valve"],
    ["එක්සෝස්ට් වෑල්ව්", "exhaust-valve"],
    ["පිටාර කපාට", "exhaust-valve"],
    ["පිටාර වෑල්ව", "exhaust-valve"],
    ["පිටාර වෑල්ව්", "exhaust-valve"],

    ["fuel system", "fuel-system"],
    ["ඉන්ධන පද්ධතිය", "fuel-system"],

    ["carburetor", "carburetor"],
    ["carburettor", "carburetor"],
    ["කාබියුරේටරය", "carburetor"],
    ["කාබුරේටරය", "carburetor"],

    ["fuel injector", "fuel-injector"],
    ["injector", "fuel-injector"],
    ["ඉන්ජෙක්ටරය", "fuel-injector"],

    ["ignition coil", "ignition-coil"],
    ["ඉග්නිෂන් කොයිල්", "ignition-coil"],
    ["ජ්වලන දඟරය", "ignition-coil"],

    ["spark plug", "spark-plug"],
    ["ස්පාර්ක් ප්ලග්", "spark-plug"],

    ["lubrication system", "lubrication-system"],
    ["ස්නේහන පද්ධතිය", "lubrication-system"],
    ["ලිහිසි පද්ධතිය", "lubrication-system"],

    ["oil pump", "oil-pump"],
    ["තෙල් පොම්පය", "oil-pump"],

    ["oil filter", "oil-filter"],
    ["තෙල් පෙරහන", "oil-filter"],

    ["brake system", "brake-system"],
    ["තිරිංග පද්ධතිය", "brake-system"],
    ["රෝධන පද්ධතිය", "brake-system"],

    ["water pump", "water-pump"],
    ["ජල පොම්පය", "water-pump"],

    ["battery", "battery"],
    ["බැටරිය", "battery"],

    ["alternator", "alternator"],
    ["ඕල්ටනේටරය", "alternator"],
    ["ඇල්ටනේටරය", "alternator"],

    ["starter motor", "starter-motor"],
    ["ස්ටාටර් මෝටරය", "starter-motor"],

    ["clutch", "clutch"],
    ["ක්ලච්", "clutch"],

    ["gearbox", "gearbox"],
    ["gear box", "gearbox"],
    ["ගියර් පෙට්ටිය", "gearbox"],

    ["differential", "differential"],
    ["ඩිෆරෙන්ෂල්", "differential"],

    ["tyre construction", "tyre-construction"],
    ["tire construction", "tyre-construction"],
    ["ටයර් නිර්මාණය", "tyre-construction"],
    ["ටයරය", "tyre-construction"]
  ]);

  const DENY = Object.freeze([
    "සංසන්දනය", "වෙනස", "සමාලෝචනය", "සාරාංශ", "review", "compare", "comparison"
  ]);

  function normalise(value) {
    return String(value || "")
      .normalize("NFKC")
      .trim()
      .toLowerCase()
      .replace(/[_/\\-]+/g, " ")
      .replace(/[^\p{L}\p{M}\p{N} ]+/gu, " ")
      .replace(/\s+/g, " ");
  }

  const NORMAL_ALIASES = ALIASES.map(([alias, mapped]) => [normalise(alias), mapped]);

  function matches(value) {
    const text = normalise(value);
    if (!text) return [];
    const direct = text.replace(/ /g, "-");
    if (MAP[direct]) return [direct];
    const found = new Set();
    for (const [alias, mapped] of NORMAL_ALIASES) {
      if (text === alias || text.includes(alias)) found.add(mapped);
    }
    return [...found];
  }

  function strictKey(value, exactOnly = false) {
    const text = normalise(value);
    if (!text || DENY.some(term => text.includes(normalise(term)))) return null;
    const direct = text.replace(/ /g, "-");
    if (MAP[direct]) return direct;

    const found = new Set();
    for (const [alias, mapped] of NORMAL_ALIASES) {
      if (exactOnly ? text === alias : (text === alias || text.includes(alias))) found.add(mapped);
    }
    return found.size === 1 ? [...found][0] : null;
  }

  function key(value) {
    return strictKey(value, false);
  }

  function resolve(value) {
    const k = key(value);
    return k ? BASE + MAP[k] : "";
  }

  function imageFor(card) {
    if (!card) return "";
    if (card.image) return card.image;
    if (String(card.source || "").trim() !== "Approved Note") return "";

    // Topic is safest. If a topic exists, require an exact semantic alias so a broad
    // topic such as "පහර" does not incorrectly inherit a piston/valve SVG.
    if (card.topic) {
      const topicKey = strictKey(card.topic, true);
      return topicKey ? BASE + MAP[topicKey] : "";
    }

    // Only fall back to the question/title. Never inspect answer/memory text: answers
    // often mention several engine parts and caused unrelated diagrams to be attached.
    const questionText = [card.q, card.question, card.title].filter(Boolean).join(" ");
    const qKey = strictKey(questionText, false);
    return qKey ? BASE + MAP[qKey] : "";
  }

  function applyToCards(cards) {
    if (!Array.isArray(cards)) return { scanned: 0, eligible: 0, added: 0 };
    let eligible = 0, added = 0;
    for (const card of cards) {
      if (!card || card.image || String(card.source || "").trim() !== "Approved Note") continue;
      eligible += 1;
      const src = imageFor(card);
      if (!src) continue;
      card.image = src;
      card.imageAlt = card.imageAlt || card.topic || card.question || "Unit 06 visual";
      card.svgFallback = true;
      added += 1;
    }
    return { scanned: cards.length, eligible, added };
  }

  const API = Object.freeze({
    basePath: BASE,
    map: MAP,
    aliases: ALIASES.slice(),
    normalise,
    matches,
    key,
    resolve,
    imageFor,
    applyToCards
  });

  window.ET_UNIT06_SVG = API;

  const cards = Array.isArray(window.ET_U6_QUESTIONS)
    ? window.ET_U6_QUESTIONS
    : (Array.isArray(window.ET6) ? window.ET6 : null);

  if (cards) {
    const result = Object.freeze(applyToCards(cards));
    window.ET_U6_SVG_RESULT = result;
    window.ET6_SVG_RESULT = result;
  }
})();
