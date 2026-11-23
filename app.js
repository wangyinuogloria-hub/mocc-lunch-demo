'use strict';
const app = document.querySelector('#app');
const dialog = document.querySelector('#dialog');
const defaults = () => [
  { name: 'Chinese cabbage', type: 'vegetable', note: 'Leafy vegetable · confirm the variety' },
  { name: 'Braised pork', type: 'pork', note: 'Pork dish · confirm the ingredient' },
  { name: 'Pork tenderloin', type: 'pork', note: 'Fried dish · confirm the ingredient' }
];
const state = { ingredients: defaults(), selected: 1, confirmed: false, response: '', quiz: null, region: null };
const sources = [
  {
    "id": "R1",
    "title": "Zhuhai’s regional food-supply network",
    "org": "Zhuhai Agriculture and Rural Affairs Bureau · 2024 notice for 2025 projects",
    "url": "https://zhsme.org.cn/notices/getNoticesByNoticesId?noticesId=9ab183bb-4ed5-40ee-922e-150350f86789",
    "supports": "Identifies Doumen and Jinwan as production districts and connections with supply bases outside Zhuhai. Regional background, not this meal’s origin."
  },
  {
    "id": "R2",
    "title": "Agricultural-products logistics in Xiangzhou",
    "org": "Zhuhai Agricultural Investment Holding Group · 2021",
    "url": "https://www.zhnk.com.cn/index.php/portal/article/index/id/13.html",
    "supports": "Describes the logistics and safety-monitoring centre at 1797 Meijie Road, Xiangzhou, with wholesale, processing, storage and cold-chain functions. An example of local infrastructure, not a confirmed BNBU supplier."
  },
  {
    "id": "R3",
    "title": "A documented pig farm in Doumen",
    "org": "Zhuhai Agricultural Investment Holding Group · 2021",
    "url": "https://www.zhnk.com.cn/index.php/portal/article/index/id/4.html",
    "supports": "Documents the Doumen pig farm at Sanli village, Qianwu, including automated feeding and monitoring. A dated local production example; not a confirmed BNBU source or a statement of current operating capacity."
  },
  {
    "id": "R4",
    "title": "Documented pork-processing enterprises in Zhuhai",
    "org": "Guangdong Department of Agriculture and Rural Affairs · first-batch list",
    "url": "https://dara.gd.gov.cn/attachment/0/569/569263/4642835.pdf",
    "supports": "Lists 珠海市润和合食品有限公司 and 珠海市西部食品有限公司肉类联合加工厂 as meeting the pig-slaughter quality-management specification. Examples of a processing link, not identified canteen suppliers."
  },
  {
    "id": "K1",
    "title": "School-canteen purchasing and receiving records",
    "org": "Ministry of Education & SAMR · 2025 · hosted by BNU",
    "url": "https://zwb.bnu.edu.cn/gzzd/sbjfg/9356437e7af74f378e30d106ae0f79ab.htm",
    "supports": "Explains delivery records, supplier information, receiving checks and pork certification. Used to identify what records to ask for; not evidence of BNBU’s actual operations."
  },
  {
    "id": "E1",
    "title": "Energy in agrifood systems",
    "org": "FAO",
    "url": "https://www.fao.org/energy/en/",
    "supports": "Explains energy use across farming, processing, transport, storage and preparation. No meal-specific footprint is calculated."
  },
  {
    "id": "E2",
    "title": "Sustainable Food Cold Chains",
    "org": "UNEP & FAO · 2022",
    "url": "https://wedocs.unep.org/items/c53a122d-d424-48a3-8cd6-9fddc3cf0dc2",
    "supports": "Explains refrigeration energy, environmental impacts and reducing food loss. It does not establish whether this lunch used chilled or frozen delivery."
  }
];
const stages = [
  { id: 'production', title: 'Production', art: '♧', caption: 'Where ingredients begin' },
  { id: 'processing', title: 'Processing', art: '▥', caption: 'Preparing and packing' },
  { id: 'transport', title: 'Transportation', art: '▰', caption: 'Moving food between places' },
  { id: 'distribution', title: 'Distribution', art: '▤', caption: 'Storing and supplying' },
  { id: 'cooking', title: 'Cooking', art: '≈', caption: 'Preparing your meal' }
];
const regionalStages = {
  "production": {
    "title": "Before it reaches Zhuhai.",
    "intro": "The place you eat is the destination. It does not identify the farm.",
    "pork": {
      "label": "A regional pork-supply example",
      "route": [
        "Pig farm · origin unconfirmed",
        "Slaughter & cutting supplier",
        "Supply to Zhuhai"
      ],
      "summary": "Both pork dishes start with livestock and feed. A distributor’s Zhuhai address would not show where the pigs were raised.",
      "panels": [
        [
          "Where could the pork begin?",
          "A 2021 Zhuhai Agricultural Investment report documents a pig farm in Sanli village, Qianwu, Doumen. It gives us a real local example of livestock production, including automated feeding. For this demo, consider either a local or outside-city farm feeding into Zhuhai’s pork market. Neither route is verified for the BNBU lunch. <span class=\"evidence-ref\">Documented local example · R3 / Scenario</span>"
        ],
        [
          "Before the pork: feed, housing and manure",
          "A pig’s feed has its own journey: crops are grown, processed into feed and delivered to the farm. Feed milling, ventilation and water pumping can use energy; manure management can also contribute emissions. The lunch photo reveals none of these farm practices. <span class=\"evidence-ref\">Food-system explanation · E1</span>"
        ],
        [
          "What would make this specific to BNBU?",
          "Start with the meat batch on the canteen’s delivery note. Ask whether its supplier can connect that batch to a slaughterhouse and farm or production region. A supplier registered in Zhuhai is not proof of a Zhuhai-raised pig."
        ]
      ],
      "unknown": [
        "Pig-farm region",
        "Feed supply",
        "Slaughterhouse / batch link"
      ]
    },
    "vegetable": {
      "label": "A cabbage-growing example",
      "route": [
        "Doumen / Jinwan · example",
        "Harvest & sorting",
        "Supply to Zhuhai"
      ],
      "summary": "For the cabbage, begin with a possible local growing area. Season and procurement can change which farm supplies a canteen.",
      "panels": [
        [
          "A local option, with other origins still possible",
          "Zhuhai’s 2025 “vegetable basket” programme identifies Doumen and Jinwan as production districts and also connects to outside-city supply bases. We use a Doumen/Jinwan vegetable farm as the local scenario; this does not verify where the photographed cabbage grew. <span class=\"evidence-ref\">Regional context · R1 / Scenario</span>"
        ],
        [
          "What happens before harvest?",
          "For this leafy-vegetable example, consider irrigation pumps, fertiliser production, farm machinery and harvesting. After harvest, outer leaves may be removed and produce sorted. The field’s water source, growing method and yield affect resource use; being locally grown alone cannot establish a lower overall footprint. <span class=\"evidence-ref\">Food-system explanation · E1</span>"
        ],
        [
          "What could the canteen or supplier confirm?",
          "Ask for the vegetable’s name, growing region and delivery batch. Compare local and outside-city supplies only after confirming origin, season, transport and losses. The photo supports a cabbage suggestion, not a named farm or a seasonal production claim."
        ]
      ],
      "unknown": [
        "Actual growing region",
        "Vegetable variety",
        "Season / farm practices"
      ]
    }
  },
  "processing": {
    "title": "From raw ingredient to kitchen supply.",
    "intro": "Follow the preparation behind the ingredient, before the canteen cooks it.",
    "pork": {
      "label": "Two dishes, possibly different supply paths",
      "route": [
        "Slaughter & inspection",
        "Cutting / packing",
        "Chilled or frozen supply?"
      ],
      "summary": "Braised pork and fried tenderloin need different cuts and preparation. They need not come from the same supplier or processing site.",
      "panels": [
        [
          "How the two pork dishes can differ",
          "A Guangdong departmental list names two Zhuhai processing businesses: 珠海市润和合食品有限公司 and 珠海市西部食品有限公司肉类联合加工厂. They illustrate a real local slaughter/processing link, not identified BNBU suppliers. Beyond that link, braised pork could arrive as a raw cut; tenderloin could arrive as raw strips or a prepared product. Those product forms shift where cutting, coating and possible freezing happen. <span class=\"evidence-ref\">Local examples · R4 / Dish-based scenario</span>"
        ],
        [
          "What energy is hidden in preparation?",
          "Slaughterhouse and cutting equipment, cleaning, packaging and chilled storage can use energy. Frozen prepared tenderloin would add freezing and potentially longer cold storage. These are alternative paths to investigate, not reasons to assume one dish has a measured higher footprint. <span class=\"evidence-ref\">Food-system explanation · E1 / E2</span>"
        ],
        [
          "How could we check this batch?",
          "Ask whether each dish uses fresh/chilled meat, frozen raw meat or a prepared product. School-canteen procurement guidance calls for batch-linked pork quarantine and meat-quality certificates. Delivery documents and product labels would help identify the processor and product form. <span class=\"evidence-ref\">Records to request · K1</span>"
        ]
      ],
      "unknown": [
        "Raw or prepared product",
        "Processor / batch",
        "Chilled or frozen history"
      ]
    },
    "vegetable": {
      "label": "A leafy-vegetable preparation example",
      "route": [
        "Sorting & trimming",
        "Packing for delivery",
        "Kitchen washing & cutting"
      ],
      "summary": "The cabbage may be delivered whole or already trimmed. That changes where work, water use and discarded leaves occur.",
      "panels": [
        [
          "Whole cabbage or ready-cut produce?",
          "For the preset local-farm path, cabbage is sorted and packed before delivery to a Zhuhai supplier. It may then be trimmed upstream or arrive whole for kitchen preparation. We have not established which route the BNBU canteen used."
        ],
        [
          "Follow the leaves, water and packaging",
          "Compare reusable produce crates with other packaging, and ask where damaged outer leaves are discarded. Washing and cutting may use water and equipment; pre-cut produce may also require managed cold storage. Moving trimming upstream does not make its waste disappear. <span class=\"evidence-ref\">Food-system explanation · E1 / E2</span>"
        ],
        [
          "Make the example about this canteen",
          "Ask the supplier how the cabbage was packed and whether the canteen received whole or pre-cut vegetables. A delivery specification and kitchen preparation record could distinguish the two paths. Do not infer plastic packaging or a processing factory from the cooked meal."
        ]
      ],
      "unknown": [
        "Whole or pre-cut supply",
        "Packing material",
        "Where trimming happens"
      ]
    }
  },
  "transport": {
    "title": "The delivery you see is only one leg.",
    "intro": "A Zhuhai supplier → Tangjiawan → BNBU canteen. What came before that?",
    "pork": {
      "label": "Illustrative route · not shipment tracking",
      "route": [
        "Farm & processor · unknown",
        "Zhuhai supplier · example",
        "BNBU canteen · destination"
      ],
      "summary": "For this preset, a Zhuhai distributor delivers pork to the Tangjiawan campus. Earlier farm-to-processor and intercity legs remain unknown.",
      "panels": [
        [
          "A Zhuhai delivery is not the whole journey",
          "Our local scenario is distributor → Tangjiawan → BNBU canteen. Before that, pigs may travel to a slaughterhouse and meat may travel to a processor or depot. The distribution centre at Meijie Road in Xiangzhou is a documented local logistics example; we are not claiming this lunch passed through it. <span class=\"evidence-ref\">Regional infrastructure · R2 / Scenario</span>"
        ],
        [
          "Would this pork need a refrigerated vehicle?",
          "For chilled or frozen pork, temperature-controlled delivery would be a relevant process to investigate. Refrigeration uses energy and can reduce spoilage. The cooked dish cannot reveal its delivery condition, vehicle or temperature history. This demo therefore shows a conditional cold chain, not a confirmed shipment. <span class=\"evidence-ref\">General explanation · E2; records · K1</span>"
        ],
        [
          "What would a meaningful comparison need?",
          "Ask for the dispatch address, vehicle and cooling type, delivery stops, load size and route distance. A shared delivery may divide transport energy among several orders. Without those inputs and upstream journeys, we cannot assign kilometres, CO₂ or an “eco score” to this plate."
        ]
      ],
      "unknown": [
        "Dispatch address & route",
        "Vehicle / load size",
        "Delivery temperature record"
      ]
    },
    "vegetable": {
      "label": "Local and outside-city routes · examples",
      "route": [
        "Doumen / Jinwan · example",
        "Zhuhai produce supplier",
        "BNBU canteen · destination"
      ],
      "summary": "Compare a local-farm route with an outside-city supply route. Both can end with the same last delivery to BNBU.",
      "panels": [
        [
          "Two ways cabbage could reach the same kitchen",
          "Local scenario: Doumen/Jinwan farm → Zhuhai produce supplier → BNBU. Outside-city scenario: growing region elsewhere → regional wholesale/distribution → BNBU. These are contrasting examples; neither is a traced route for the photographed cabbage. Zhuhai’s supply programme includes city and outside-city connections. <span class=\"evidence-ref\">Regional context · R1 / Scenario</span>"
        ],
        [
          "Crates, cooling and time on the road",
          "Cabbage may move in produce crates, with handling and temperature control depending on the product and delivery arrangement. Do not assume every vegetable truck is refrigerated. Cooling can reduce losses but also uses energy; dispatch-to-kitchen time and handling matter alongside distance. <span class=\"evidence-ref\">General explanation · E2</span>"
        ],
        [
          "Why “nearby” is not a complete answer",
          "A short delivery with a small load or multiple stops differs from a full shared vehicle. Compare origin, route, load, cooling and discarded produce before drawing environmental conclusions. Ask for the growing region as well as the Zhuhai supplier’s address."
        ]
      ],
      "unknown": [
        "Growing region vs supplier address",
        "Delivery route / shared load",
        "Cooling & produce loss"
      ]
    }
  },
  "distribution": {
    "title": "What happens before the kitchen cooks?",
    "intro": "A local depot and a campus storeroom are different links in the chain.",
    "pork": {
      "label": "A receiving-and-storage scenario",
      "route": [
        "Supplier depot · example",
        "Canteen receiving",
        "Storage before preparation"
      ],
      "summary": "In this scenario, pork is received, checked and stored before preparation. BNBU’s actual delivery and storage arrangements need records.",
      "panels": [
        [
          "A real local example of distribution",
          "The agricultural-products logistics centre at 1797 Meijie Road, Xiangzhou, is described by Zhuhai Agricultural Investment as combining wholesale, processing, storage and cold-chain services. It helps explain what a distribution node can do. It is not identified as this canteen’s supplier. <span class=\"evidence-ref\">Regional infrastructure · R2</span>"
        ],
        [
          "At BNBU: what would we look for?",
          "Use the delivery note to identify supplier, product and batch. School-canteen guidance describes document, condition and relevant temperature checks, followed by recorded storage. For pork, batch-linked certification is part of the documentary trail. These are records to request, not a claim that we observed BNBU’s checks. <span class=\"evidence-ref\">Records framework · K1</span>"
        ],
        [
          "The energy of waiting",
          "A cut held in a cold room, a frozen prepared item and meat used soon after receipt have different storage paths. Ask about storage duration, equipment and order size. Ordering more than the kitchen uses can add both storage demand and waste; the actual balance needs kitchen data. <span class=\"evidence-ref\">General explanation · E1 / E2</span>"
        ]
      ],
      "unknown": [
        "Supplier & delivery batch",
        "Storage duration / condition",
        "Unused or discarded stock"
      ]
    },
    "vegetable": {
      "label": "A produce-receiving scenario",
      "route": [
        "Produce supplier",
        "Canteen quality check",
        "Storage & kitchen issue"
      ],
      "summary": "For cabbage, usable freshness and the amount discarded matter as well as the electricity used while it waits.",
      "panels": [
        [
          "From a Zhuhai supplier to campus stock",
          "Our scenario takes sorted cabbage from a local produce supplier to the canteen. A wholesale depot may consolidate several farms’ produce before delivery. A depot location can tell us where an order was assembled; it cannot alone identify where every cabbage grew."
        ],
        [
          "What should the receiving record reveal?",
          "Look for the product, supplier, quantity, batch or delivery date and product condition. Then ask whether the cabbage goes directly to preparation or is held for later use, and under what storage arrangement. Delivery and stock records can test this scenario against the BNBU kitchen. <span class=\"evidence-ref\">Records framework · K1</span>"
        ],
        [
          "Freshness, storage and avoidable losses",
          "Compare the quantity received with the usable amount after damaged leaves and spoilage are removed. If cooling is used, it has an energy cost; if it prevents losses, it may also preserve resources already invested in growing and delivering the cabbage. We need both sides of that comparison. <span class=\"evidence-ref\">General explanation · E1 / E2</span>"
        ]
      ],
      "unknown": [
        "Quantity received vs used",
        "Time before preparation",
        "Storage method / spoilage"
      ]
    }
  },
  "cooking": {
    "title": "One canteen, several cooking paths.",
    "intro": "The dish name suggests a process. The kitchen determines how it actually happens.",
    "pork": {
      "label": "Braised pork · illustrative kitchen path",
      "route": [
        "Cut & prepare",
        "Brown / simmer · example",
        "Portion & serve"
      ],
      "summary": "For braised pork, follow a batch from preparation through simmering and serving. The recipe, cooking time and equipment are unconfirmed.",
      "panels": [
        [
          "What could happen to this braised pork?",
          "A typical braising example involves cutting pork, initial heating or browning, then simmering with sauce. In a canteen, one batch may serve many meals. This is a dish-based illustration, not an observation of BNBU’s recipe or kitchen."
        ],
        [
          "Where does energy enter this batch?",
          "Heat for cooking, maintaining a simmer, extraction equipment and any hot holding can all require energy. Ask whether the kitchen uses gas or electricity, how long the pot runs and how many portions the batch serves. A long cooking time alone is not a per-portion footprint. <span class=\"evidence-ref\">General explanation · E1</span>"
        ],
        [
          "From production to what is actually eaten",
          "The useful comparison is energy and ingredients per portion eaten, including any leftovers. Ask about portion size, batch yield and food left over after service. A visitor can connect the chain to everyday action by choosing a portion they expect to finish."
        ]
      ],
      "unknown": [
        "Recipe / equipment",
        "Batch time & portions",
        "Hot holding / leftovers"
      ]
    },
    "fried": {
      "label": "Pork tenderloin · illustrative kitchen path",
      "route": [
        "Cut / coat or prepared strips",
        "Heat oil & fry · example",
        "Portion & serve"
      ],
      "summary": "For fried tenderloin, investigate oil heating and the product received: raw meat and prepared frozen strips have different upstream steps.",
      "panels": [
        [
          "What could happen to these tenderloin strips?",
          "In this example, the kitchen fries coated pork strips and may add sauce. The strips could be prepared on site or arrive as a prepared product; the photo cannot distinguish them. If prepared off site, cutting, coating and possibly freezing belong to earlier stages."
        ],
        [
          "Oil heating, batches and waiting time",
          "Energy heats the oil and maintains cooking conditions. The fryer or wok, batch size, operating time and any hot holding affect energy per portion. Cooking oil production and disposal also sit outside what the photo shows. We do not rank this dish against braised pork without those inputs. <span class=\"evidence-ref\">General explanation · E1</span>"
        ],
        [
          "Questions for the BNBU kitchen",
          "Ask whether the strips arrive raw or prepared, what equipment is used, how many portions are cooked together and what remains after lunch service. These details turn “fried food uses energy” into a canteen-specific investigation."
        ]
      ],
      "unknown": [
        "Raw or prepared strips",
        "Frying equipment / batch",
        "Holding time / leftovers"
      ]
    },
    "vegetable": {
      "label": "Cabbage · illustrative kitchen path",
      "route": [
        "Trim, wash & cut",
        "Wok cook · example",
        "Portion & serve"
      ],
      "summary": "For the cabbage, separate preparation losses from cooking and serving. The exact BNBU recipe still needs confirmation.",
      "panels": [
        [
          "A kitchen path for this cabbage",
          "For the preset, the canteen trims and washes cabbage, cuts it and cooks a batch in a wok. It could instead use a different recipe or upstream preparation; the cooked appearance does not prove the method. This is an illustration for discussion."
        ],
        [
          "More than the heat under the wok",
          "Washing uses water; cutting and ventilation may use equipment; the wok uses gas or electricity. If cooked vegetables are held for service, that adds another possible energy step. Record the batch quantity and portions before discussing energy per serving. <span class=\"evidence-ref\">General explanation · E1</span>"
        ],
        [
          "What makes the BNBU case worth asking about?",
          "Ask how much raw cabbage becomes edible portions, where trimmed leaves go, how much is cooked at once and how much returns uneaten. The question becomes how kitchen planning and portion choice can reduce wasted food and the resources behind it."
        ]
      ],
      "unknown": [
        "Actual recipe / heat source",
        "Trim losses & batch size",
        "Serving waste"
      ]
    }
  }
};
function regionalContent(id) {
  const item = selectedIngredient();
  const base = regionalStages[id];
  let variant = item.type === 'vegetable' ? 'vegetable' : 'pork';
  if (id === 'cooking' && item.type === 'pork' && /tenderloin|fried|里脊|炸/i.test(item.name)) variant = 'fried';
  if (!['pork', 'vegetable'].includes(item.type)) return {
    title: 'A different ingredient needs a different trail.',
    intro: 'The region is still Zhuhai. This ingredient is outside the prepared pork-and-cabbage case.',
    label: 'Manual ingredient · no matched regional card',
    route: ['Origin unconfirmed', 'Supplier unconfirmed', 'BNBU canteen'],
    summary: 'Changing an ingredient must not keep an explanation about the wrong food.',
    panels: [['What can we say?', 'You selected '+escapeHTML(item.name)+'. This demo has detailed Zhuhai cards for pork and leafy vegetables. It has no verified local supply pathway for this ingredient.'], ['What would be needed?', 'A curator would need an ingredient-specific source and supplier or kitchen records before preparing a detailed card. The region selector cannot fill that gap.']],
    unknown: ['Ingredient-specific sources', 'Supplier / origin', 'Kitchen preparation']
  };
  return {...base, ...base[variant]};
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}
function actionButton(action, label, cls = 'primary', extra = '') {
  return `<button class="${cls}" data-action="${action}" ${extra}>${label}</button>`;
}
function selectedIngredient() { return state.ingredients[state.selected] || state.ingredients[0]; }
function photo(classes = '', pins = false) {
  return `<div class="photo ${classes}" role="img" aria-label="Canteen meal with cabbage and two pork dishes">${pins ? state.ingredients.map((item, i) => `<button class="ingredient-pin pin-${i}" data-action="edit" data-index="${i}" aria-label="Edit ${escapeHTML(item.name)}">${escapeHTML(item.name)}</button>`).join('') : ''}</div>`;
}
function head(eyebrow, title, subtitle, hint = '') {
  return `<div class="page-head"><div><p class="eyebrow">${eyebrow}</p><h2>${title}</h2><p>${subtitle}</p></div>${hint ? `<span class="step-hint">${hint}</span>` : ''}</div>`;
}
function startScreen() {
  return `<section class="hero fade-in"><div class="hero-copy"><p class="eyebrow">From a familiar meal to a bigger picture</p><h1>Your lunch,<br><span class="accent-word">uncovered.</span></h1><p class="intro">Start with a BNBU canteen lunch in Zhuhai. Follow an ingredient and discover the energy behind its journey.</p><div class="buttons">${actionButton('sample', 'Explore this lunch')}${actionButton('choose-photo', 'Choose a photo', 'secondary')}</div><p class="fine">Choose the prepared lunch photo, then set your region. No upload or live AI is needed.</p></div><div class="hero-media">${photo()}<div class="photo-caption"><span>BNBU canteen lunch · Zhuhai</span><span class="caption-tag">Your everyday, connected.</span></div></div></section>`;
}
function choosePhoto() {
  openDialog('Choose a photo', `<p class="picker-intro">Start with a meal you know. Select the prepared photo to continue.</p><button class="meal-choice" data-action="sample" aria-label="Select the BNBU braised-pork lunch">${photo()}<span class="meal-choice-label"><strong>My BNBU canteen lunch</strong><small>Braised pork · pork tenderloin · cabbage</small><span class="choose-arrow" aria-hidden="true">→</span></span></button><div class="upload-placeholder"><div><strong>Analyse a new photo</strong><small>Bring another meal into the experience.</small></div><button class="secondary" disabled title="Visual preview only; this demo uses the prepared meal">Upload a photo</button></div><p class="fine">New-photo analysis is a preview-only feature. The prepared meal is fully clickable.</p>`);
}
function chooseRegion() {
  openDialog('Where are you eating?', `<p class="picker-intro">Add the place, then look beyond the plate.</p><div class="region-meal">${photo('meal-thumb')}<div><strong>My BNBU canteen lunch</strong><small>Your selected photo</small></div></div><form id="region-form"><label class="editor-label" for="region-choice">Select a region</label><select class="editor-input" id="region-choice" required><option value="">Choose your region…</option><option value="Zhuhai">Zhuhai · 珠海</option><option disabled>Other regions · not included in this demo</option></select><div class="region-preview"><span class="section-label">Prepared regional experience</span><strong>Zhuhai → Tangjiawan → BNBU canteen</strong><p>Explore pork and vegetable supply, delivery, storage and cooking in a local canteen scenario.</p></div><p class="fine">The region selects prepared explanations. It does not identify a farm or track an actual shipment.</p><div class="modal-actions"><button class="primary" id="region-continue" type="submit" disabled>Continue with Zhuhai</button></div></form>`);
  const select = document.querySelector('#region-choice');
  select.addEventListener('change', () => { document.querySelector('#region-continue').disabled = select.value !== 'Zhuhai'; });
  document.querySelector('#region-form').addEventListener('submit', event => {
    event.preventDefault();
    if (select.value !== 'Zhuhai') return;
    Object.assign(state, {region:'Zhuhai', ingredients:defaults(), selected:1, confirmed:false, response:'', quiz:null});
    dialog.close(); navigate('ingredients');
  });
}
function regionContext() {
  return `<div class="region-context"><span class="context-location">Zhuhai <span>珠海</span></span><span>BNBU canteen · Tangjiawan</span><span class="context-scope">Regional scenario · actual suppliers unverified</span></div>`;
}

function ingredientsScreen() {
  return `<section class="fade-in">${head('Your meal', 'What’s on your plate?', 'Confirm the ingredients before following their journey.', 'You choose what to explore')}<div class="recognition"><div class="photo-panel">${photo('', true)}<p class="fine">Prepared example · the labels below are simulated recognition suggestions.</p></div><div><p class="section-label">${state.confirmed ? 'Your confirmed ingredients' : 'Ingredients to confirm'}</p><ul class="ingredient-list">${state.ingredients.map((item, i) => `<li class="ingredient-item"><span class="swatch ${item.type}" aria-hidden="true"></span><div class="ingredient-name">${escapeHTML(item.name)}<small>${escapeHTML(state.confirmed ? 'Confirmed by you' : item.note)}</small></div>${actionButton('edit', 'Edit', 'edit-button', `data-index="${i}"`)}</li>`).join('')}</ul><p class="notice">Mixed dishes can be difficult to identify. You can correct a name and choose its ingredient group.</p>${actionButton('confirm', 'Confirm ingredients')}<div class="buttons">${actionButton('choose-photo', 'Change photo', 'text-button')}${actionButton('sample', 'Use the prepared meal', 'text-button')}</div></div></div></section>`;
}
function journeyScreen() {
  const chosen = selectedIngredient();
  return `<section class="fade-in">${actionButton('go-ingredients', 'Back to your ingredients', 'back')}${head('Its journey', 'A plate with a past.', 'Choose an ingredient, then open a stage to look closer.')}<div class="journey-context">${photo('meal-thumb')}<div class="ingredient-tabs" aria-label="Choose an ingredient">${state.ingredients.map((item, i) => actionButton('select-ingredient', escapeHTML(item.name), `ingredient-tab ${i === state.selected ? 'selected' : ''}`, `data-index="${i}" aria-pressed="${i === state.selected}"`)).join('')}</div></div><div class="journey-stage"><div class="journey-track">${stages.map(stage => `<button class="stage-card ${stage.id === 'transport' ? 'featured' : ''}" data-action="stage" data-stage="${stage.id}"><div class="stage-art" aria-hidden="true">${stage.art}</div><h3>${stage.title}</h3><p>${stage.id === 'production' ? productionCaption(chosen.type) : stage.caption}</p></button>`).join('')}</div><div class="journey-bottom"><span>A Zhuhai scenario for <strong>${escapeHTML(chosen.name)}</strong>. Transport can connect several stages.</span>${actionButton('sources', 'View sources', 'info-link')}</div></div><p class="fine">A prepared Zhuhai scenario, not a traced shipment. Open each stage for local context, ingredient details and questions for the canteen.</p></section>`;
}
function productionCaption(type) { return ({ vegetable: 'Growing and harvesting', pork: 'Raising pigs and producing feed', tofu: 'Growing soybeans', other: 'Producing the ingredient' })[type] || 'Producing the ingredient'; }
function accordion(title, text, id, open = false) {
  return `<div class="process-choice"><button class="process-toggle" data-action="accordion" aria-expanded="${open}" aria-controls="${id}">${title}<span class="toggle-symbol" aria-hidden="true">${open ? '−' : '+'}</span></button><div class="process-detail ${open ? '' : 'hidden'}" id="${id}">${text}</div></div>`;
}
function missingInfo(tags) {
  return `<div class="question-box"><button class="question-toggle" data-action="unknown" aria-expanded="false" aria-controls="missing-body">What do we still need to know?<span aria-hidden="true">+</span></button><div class="question-body hidden" id="missing-body"><div class="unknown-tags">${tags.map(x => `<span>${x}</span>`).join('')}</div>Ask the BNBU canteen or its supplier for these records. The region and photo alone cannot verify this batch’s origin, route or footprint.</div></div>`;
}
function routeCard(content) {
  return `<div class="local-route"><p class="eyebrow">${content.label}</p><ol>${content.route.map((step,i)=>`<li><span class="route-number">0${i+1}</span><span>${step}</span></li>`).join('')}</ol></div>`;
}
function stageScreen(id) {
  const content = regionalContent(id);
  const stage = stages.find(x => x.id === id);
  return `<section class="fade-in">${actionButton('go-journey', 'Back to the journey', 'back')}${head(stage.title+' · '+escapeHTML(selectedIngredient().name), content.title, content.intro)}<div class="process regional-process ${id==='transport'?'transport-layout':''}"><div>${id==='transport'?'<div class="transport-image" role="img" aria-label="Illustration of a delivery truck, not an identified BNBU delivery"></div>':''}${routeCard(content)}<div class="process-summary"><h3>In this lunch’s context</h3><p>${content.summary}</p></div></div><div><div class="process-card">${content.panels.map(([title,text],i)=>accordion(title,text,'stage-panel-'+i,i===0)).join('')}</div>${missingInfo(content.unknown)}</div></div>${processActions()}</section>`;
}
function transportScreen() { return stageScreen('transport'); }

function processActions() {
  return `<div class="process-actions"><div class="process-links">${actionButton('sources', 'Sources & evidence', 'info-link')}${actionButton('curation', 'How was this explanation selected?', 'info-link')}</div>${actionButton('go-reflect', 'Back to your meal')}</div>`;
}
function genericStageScreen(id) { return stageScreen(id); }
function reflectionScreen() {
  return `<section class="reflection fade-in"><div><div class="photo-panel">${photo()}<div class="photo-caption"><span>The same lunch. A little more visible.</span></div></div></div><div class="reflection-content"><p class="eyebrow">Your next meal</p><h2>What will you<br><span class="accent-word">take away?</span></h2><p class="question-title">Which of these is an example of energy use on a food journey?</p><div aria-label="Learning check">${['Cooling food during transport', 'The colour of the plate'].map((answer, i) => `<button class="answer-option ${state.quiz === i ? 'chosen' : ''}" data-action="quiz" data-index="${i}" aria-pressed="${state.quiz === i}">${answer}</button>`).join('')}</div><div class="feedback" role="status">${state.quiz === null ? '' : state.quiz === 0 ? 'Yes. Refrigeration uses energy to keep some foods at suitable temperatures during transport.' : 'Look again at the journey. Think about the equipment that keeps food cool while it moves.'}</div><div class="reflection-action"><p>At your next BNBU canteen meal, what would you ask or do?</p><label for="response">One action, or a question you would ask the canteen</label><textarea id="response" maxlength="280" placeholder="Where was this batch supplied from? Or: I will choose a portion I can finish…">${escapeHTML(state.response)}</textarea>${actionButton('save-response', 'Keep my reflection')}<div id="saved-response" class="hidden saved-response" role="status"></div><p class="local-note">Kept only in this tab until you restart or close it.</p></div><div class="buttons" style="margin-top:20px">${actionButton('go-journey', 'Explore another stage', 'text-button')}${actionButton('reset', 'Start again', 'text-button')}</div></div></section>`;
}
function announce(text) { document.querySelector('#announcement').textContent = text; }
function navigate(route) {
  if (location.hash === '#'+route) render();
  else location.hash = route;
}
function render() {
  let route = location.hash.slice(1) || 'start';
  const known = ['start', 'ingredients', 'journey', 'reflect', ...stages.map(x => 'process/'+x.id)];
  if (!known.includes(route)) { navigate('start'); return; }
  if ((route === 'journey' || route.startsWith('process/')) && !state.confirmed) {
    navigate('ingredients'); announce('Please confirm the ingredients first.'); return;
  }
  if (route !== 'start' && !state.region) { navigate('start'); announce('Choose your meal and region to begin.'); return; }
  let html;
  if (route === 'start') html = startScreen();
  else if (route === 'ingredients') html = ingredientsScreen();
  else if (route === 'journey') html = journeyScreen();
  else if (route === 'reflect') html = reflectionScreen();
  else if (route === 'process/transport') html = transportScreen();
  else html = genericStageScreen(route.split('/')[1]);
  app.innerHTML = (route === 'start' ? '' : regionContext()) + html;
  document.querySelectorAll('nav a').forEach(el => {
    const active = route.startsWith('process/') ? el.dataset.nav === 'journey' : el.dataset.nav === route;
    el.classList.toggle('active', active);
    if (active) el.setAttribute('aria-current', 'step'); else el.removeAttribute('aria-current');
  });
  const title = route.startsWith('process/') ? stages.find(x => x.id === route.split('/')[1]).title : ({ start: 'The Journey of Your Lunch', ingredients: 'Your ingredients', journey: 'Your food journey', reflect: 'Your next meal' })[route];
  document.title = title+' · Lunch Journey';
  app.focus({ preventScroll: true });
  window.scrollTo(0, 0);
}
function openDialog(title, html) {
  document.querySelector('#dialog-title').textContent = title;
  document.querySelector('#dialog-content').innerHTML = html;
  dialog.showModal();
}
function editIngredient(index) {
  const item = state.ingredients[index];
  openDialog('Confirm this ingredient', `<form id="ingredient-form"><label class="editor-label" for="ingredient-name">Ingredient or dish name</label><input class="editor-input" id="ingredient-name" name="ingredient" value="${escapeHTML(item.name)}" maxlength="55" required><label class="editor-label" for="ingredient-group">Ingredient group for the explanation</label><select class="editor-input" id="ingredient-group">${[['vegetable','Vegetable'],['pork','Pork'],['tofu','Tofu / soybean'],['other','Other / unsure']].map(([v,n]) => `<option value="${v}" ${item.type===v?'selected':''}>${n}</option>`).join('')}</select><p class="fine">The group chooses a prepared supply-chain explanation in this prototype.</p><div class="modal-actions"><button class="primary" type="submit">Save ingredient</button></div></form>`);
  document.querySelector('#ingredient-form').addEventListener('submit', event => {
    event.preventDefault();
    const name = document.querySelector('#ingredient-name').value.trim();
    if (!name) { document.querySelector('#ingredient-name').focus(); return; }
    state.ingredients[index] = { name, type: document.querySelector('#ingredient-group').value, note: 'Edited by you' };
    state.confirmed = false;
    dialog.close();
    render();
    announce('Ingredient updated. Confirm your ingredients to continue.');
  });
}
function showSources() {
  openDialog('Sources & evidence', `<div class="modal-body"><div class="evidence-key"><strong>Three kinds of information</strong><p><b>Known setting:</b> the student identifies this as their BNBU canteen lunch in Zhuhai.</p><p><b>Regional evidence:</b> published supply-network and infrastructure examples.</p><p><b>Illustrative scenario:</b> a possible route or kitchen process; not a verified account of this meal.</p></div>${sources.map(s => `<a class="source-item" href="${s.url}" target="_blank" rel="noopener noreferrer"><strong><span class="source-id">${s.id}</span> ${s.title}</strong><small>${s.org}</small><small>${s.supports}</small></a>`).join('')}<p class="fine">Regional references are dated publications, not a live supplier directory. The BNBU farm, supplier, route and kitchen have not been audited for this prototype. All explanation cards work offline; opening a source website needs internet.</p></div>`);
}
function showCuration() {
  openDialog('How this explanation was selected', `<div class="modal-body"><p><strong>Hybrid curatorship</strong> connects institutional knowledge, AI support and visitor choice.</p><h3>Museum staff</h3><p>In the proposed installation, educators select reliable sources, write the knowledge cards and review their scope and accuracy.</p><h3>AI support</h3><p>The proposed AI suggests ingredients and connects the visitor’s confirmed choice to relevant cards. This demo uses preset labels and matches the confirmed ingredient, Zhuhai region and selected stage to a prepared explanation. It performs no live recognition or supplier tracing.</p><h3>You</h3><p>You select the prepared photo and region, correct the ingredient and decide which stage to open. Changing a food group changes the prepared card; an unsupported group gets an explicit information gap.</p><h3>When information is missing</h3><p>The screen separates published regional context from illustrative routes and unknown batch details. A region must never be treated as proof of origin. A museum curator would review source scope and date before publishing new cards.</p><p class="fine">Student proposal for the MoCC permanent exhibition. The prototype content has been prepared by the student project, with the sources linked here.</p></div>`);
}
function reset() {
  Object.assign(state, { ingredients: defaults(), selected: 1, confirmed: false, response: '', quiz: null, region: null });
  if (dialog.open) dialog.close();
  navigate('start');
}
function saveResponse() {
  const field = document.querySelector('#response');
  const value = field.value.trim();
  if (!value) { field.focus(); announce('Write one action or question first.'); return; }
  state.response = value;
  const result = document.querySelector('#saved-response');
  result.textContent = value;
  result.classList.remove('hidden');
  announce('Reflection kept in this tab.');
}
const actions = {
  sample: chooseRegion,
  'choose-photo': choosePhoto,
  edit: el => editIngredient(Number(el.dataset.index)),
  confirm: () => { state.confirmed=true; navigate('journey'); },
  'select-ingredient': el => { state.selected=Number(el.dataset.index); render(); },
  stage: el => navigate('process/'+el.dataset.stage),
  accordion: el => { const open=el.getAttribute('aria-expanded')==='true'; if(!open){app.querySelectorAll('.process-toggle').forEach(other=>{other.setAttribute('aria-expanded','false');document.getElementById(other.getAttribute('aria-controls')).classList.add('hidden');other.querySelector('.toggle-symbol').textContent='+';});} el.setAttribute('aria-expanded',String(!open));document.getElementById(el.getAttribute('aria-controls')).classList.toggle('hidden',open);el.querySelector('.toggle-symbol').textContent=open?'+':'−'; },
  unknown: el => { const open=el.getAttribute('aria-expanded')==='true';el.setAttribute('aria-expanded',String(!open));document.querySelector('#missing-body').classList.toggle('hidden',open);el.querySelector('span').textContent=open?'+':'−'; },
  sources: showSources,
  curation: showCuration,
  'go-ingredients': () => navigate('ingredients'),
  'go-journey': () => navigate('journey'),
  'go-reflect': () => navigate('reflect'),
  quiz: el => { const response=document.querySelector('#response');if(response)state.response=response.value;state.quiz=Number(el.dataset.index);render(); },
  'save-response': saveResponse,
  reset
};
document.addEventListener('click', event => {
  const el=event.target.closest('[data-action]');
  if (el && actions[el.dataset.action]) actions[el.dataset.action](el);
});
document.querySelector('#reset').addEventListener('click',reset);
document.querySelector('#close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{ if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();} });
document.querySelector('#fullscreen').addEventListener('click',async()=>{
  try {
    if(document.fullscreenElement) await document.exitFullscreen();
    else if(document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
    else announce('Use your browser full-screen command.');
  } catch { announce('Use your browser full-screen command.'); }
});
window.addEventListener('hashchange',()=>{ if(dialog.open)dialog.close(); render(); });
document.addEventListener('input',event=>{if(event.target.id==='response')state.response=event.target.value;});
render();
