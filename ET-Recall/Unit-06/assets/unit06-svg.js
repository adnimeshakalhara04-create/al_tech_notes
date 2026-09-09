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

  // Exact/strong aliases only. Existing real card.image always has priority.
  const ALIASES = Object.freeze([
    ["radiator cooling system", "radiator-cooling-system"],
    ["radiator and cooling system", "radiator-cooling-system"],
    ["සිසිලන පද්ධතිය", "radiator-cooling-system"],
    ["රේඩියේටරය", "radiator-cooling-system"],

    ["four stroke cycle", "four-stroke-cycle"],
    ["four stroke", "four-stroke-cycle"],
    ["4 stroke", "four-stroke-cycle"],
    ["සිව් පහර", "four-stroke-cycle"],
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

    ["oil sump", "oil-sump"],
    ["ඔයිල් සම්ප්", "oil-sump"],

    ["connecting rod", "piston-rod"],
    ["piston rod", "piston-rod"],
    ["කනෙක්ටින් රොඩ්", "piston-rod"],
    ["සම්බන්ධක දණ්ඩ", "piston-rod"],

    ["piston", "piston"],
    ["පිස්ටනය", "piston"],
    ["පිස්ටන්", "piston"],

    ["crank shaft", "crankshaft"],
    ["crankshaft", "crankshaft"],
    ["ක්‍රෑන්ක් ෂාෆ්ට්", "crankshaft"],
    ["ක්‍රෑන්ක්ශාෆ්ට්", "crankshaft"],

    ["inlet valve", "inlet-valve"],
    ["intake valve", "inlet-valve"],
    ["ඉන්ලට් වෑල්ව්", "inlet-valve"],
    ["ආදාන කපාට", "inlet-valve"],

    ["exhaust valve", "exhaust-valve"],
    ["එක්සෝස්ට් වෑල්ව්", "exhaust-valve"],
    ["පිටාර කපාට", "exhaust-valve"],

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
    ["tyre", "tyre-construction"],
    ["tire", "tyre-construction"],
    ["ටයර් නිර්මාණය", "tyre-construction"],
    ["ටයරය", "tyre-construction"]
  ]);

  function normalise(value) {
    return String(value || "")
      .normalize("NFKC")
      .trim()
      .toLowerCase()
      .replace(/[_/\\-]+/g, " ")
      // Keep Unicode letters/numbers (including Sinhala); strip punctuation only.
      .replace(/[^\p{L}\p{M}\p{N} ]+/gu, " ")
      .replace(/\s+/g, " ");
  }

  function key(value) {
    const text = normalise(value);
    if (!text) return null;

    const direct = text.replace(/ /g, "-");
    if (MAP[direct]) return direct;

    for (const [alias, mapped] of ALIASES) {
      if (text.includes(normalise(alias))) return mapped;
    }
    return null;
  }

  function resolve(value) {
    const k = key(value);
    return k ? BASE + MAP[k] : "";
  }

  function imageFor(card) {
    if (!card) return "";
    if (card.image) return card.image;
    const searchable = [
      card.topic,
      card.q,
      card.question,
      card.title,
      card.a,
      card.answer,
      card.memory
    ].filter(Boolean).join(" ");
    return resolve(searchable);
  }

  function applyToCards(cards) {
    if (!Array.isArray(cards)) return { scanned: 0, added: 0 };
    let added = 0;
    for (const card of cards) {
      if (!card || card.image) continue;
      const src = imageFor(card);
      if (!src) continue;
      card.image = src;
      card.imageAlt = card.imageAlt || card.topic || "Unit 06 visual";
      card.svgFallback = true;
      added += 1;
    }
    return { scanned: cards.length, added };
  }

  const API = Object.freeze({
    basePath: BASE,
    map: MAP,
    aliases: ALIASES.slice(),
    normalise,
    key,
    resolve,
    imageFor,
    applyToCards
  });

  window.ET_UNIT06_SVG = API;

  // questions.js is loaded immediately before this file in the safe integration.
  // Mutate only blank image fields; existing real images are never replaced.
  if (Array.isArray(window.ET6)) {
    window.ET6_SVG_RESULT = Object.freeze(applyToCards(window.ET6));
  }
})();
