'use strict';
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
const app = document.querySelector('#app');
const dialog = document.querySelector('#dialog');
const defaults = () => [
  { name:'Chinese cabbage', type:'vegetable' },
  { name:'Braised pork', type:'pork' },
  { name:'Pork tenderloin', type:'pork' }
];
const state = { ingredients:defaults(), selected:1, confirmed:false, photoSelected:false, galleryChoice:false, region:null, placeName:'', response:'', quiz:null };
const locations = {
  China: {
    Guangdong:['Zhuhai','Guangzhou','Shenzhen','Zhongshan','Jiangmen','Foshan','Dongguan','Huizhou'],
    Beijing:['Beijing'], Shanghai:['Shanghai'], Fujian:['Fuzhou','Xiamen'], Guangxi:['Nanning','Guilin'], Hunan:['Changsha']
  },
  Japan:{Tokyo:['Tokyo'],Osaka:['Osaka'],Kyoto:['Kyoto']},
  'United Kingdom':{England:['London','Manchester'],Scotland:['Edinburgh','Glasgow']},
  'United States':{California:['Los Angeles','San Francisco'],'New York':['New York City']}
};
const stages = [
  {id:'production',title:'Production',icon:'sprout',caption:'On the farm'},
  {id:'processing',title:'Processing',icon:'box',caption:'Before delivery'},
  {id:'transport',title:'Transport',icon:'truck',caption:'On the move'},
  {id:'distribution',title:'Storage',icon:'warehouse',caption:'Before the kitchen'},
  {id:'cooking',title:'Cooking',icon:'flame',caption:'Into your meal'}
];
const shortStages = {
  production:{
    pork:{title:'Before it reaches {place}.',route:['Feed crops','Pig farm','Zhuhai market'],facts:[['Local production','Doumen has a documented pig-farming example.'],['Before the farm','Feed crops, milling and delivery also use resources.'],['Farm energy','Housing, water pumping and manure handling matter.']]},
    vegetable:{title:'Where could this cabbage begin?',route:['Growing area','Harvest & sorting','Zhuhai supplier'],facts:[['Local growing areas','Doumen and Jinwan are local production districts.'],['Other origins','Zhuhai also connects with outside-city supply bases.'],['Growing resources','Irrigation, fertiliser and harvesting all deserve a closer look.']]}
  },
  processing:{
    pork:{title:'Before the pork reaches {place}.',route:['Slaughter & cutting','Raw or prepared?','Chilled or frozen?'],facts:[['Local processing','Zhuhai has documented slaughter and meat-processing facilities.'],['Two product forms','Raw cuts and prepared strips follow different processing paths.'],['Hidden energy','Cutting, packing and cold storage happen before cooking.']]},
    vegetable:{title:'Whole cabbage, or ready to cook?',route:['Sort & trim','Pack for delivery','Wash & cut'],facts:[['Preparation','Cabbage may arrive whole or already trimmed.'],['Materials','Crates, packaging and washing have their own resource costs.'],['Where it happens','Trimming upstream changes where leaves and waste are handled.']]}
  },
  transport:{
    pork:{title:'Getting to {place}.',route:['Farm & processor','Zhuhai supplier','{place}'],facts:[['Delivery','Distance, vehicle and shared loads matter.'],['Cooling','Chilled pork may need refrigerated delivery.'],['Before arrival','The supplier’s address may differ from the farm.']]},
    vegetable:{title:'Getting to {place}.',route:['Growing region','Zhuhai supplier','{place}'],facts:[['Two routes','Local and outside-city farms can supply the same kitchen.'],['On the road','Crates, travel time and shared loads affect the journey.'],['Cooling & loss','Cooling uses energy, but may also prevent spoilage.']]}
  },
  distribution:{
    pork:{title:'Before cooking at {place}.',route:['Supplier depot','Receiving','Kitchen storage'],facts:[['A local example','Xiangzhou has a documented food-logistics and storage centre.'],['On arrival','Supplier, batch and delivery condition need checking.'],['While it waits','Cold-storage time and unused stock affect resource use.']]},
    vegetable:{title:'Keeping cabbage ready at {place}.',route:['Produce supplier','Receiving','Storage or preparation'],facts:[['Wholesale supply','A wholesaler may combine produce from several farms.'],['Freshness','Time and storage conditions affect usable cabbage.'],['Less wasted','Compare the amount received, prepared and discarded.']]}
  },
  cooking:{
    pork:{title:'Braising at {place}.',route:['Cut & prepare','Brown & simmer','Portion & serve'],facts:[['Cooking path','Braising typically combines initial heating with simmering.'],['Per portion','Equipment, cooking time and batch size matter together.'],['After cooking','Hot holding and uneaten portions add to the picture.']]},
    fried:{title:'Frying at {place}.',route:['Prepare strips','Heat oil & fry','Portion & serve'],facts:[['Before frying','Strips may be prepared on site or supplied ready-coated.'],['Cooking energy','Heating oil and keeping equipment running require energy.'],['Per portion','Batch size, hot holding and leftovers affect the result.']]},
    vegetable:{title:'Cooking cabbage at {place}.',route:['Trim, wash & cut','Cook a batch','Portion & serve'],facts:[['Preparation','Washing uses water; trimming creates leaves to manage.'],['Cooking energy','Heat, ventilation and possible hot holding use energy.'],['Food actually eaten','Batch planning and portion size can reduce wasted resources.']]}
  }
};
const paths = {
  leaf:'M20 4c0 9-3 15-10 15a6 6 0 0 1-6-6C4 6 11 4 20 4ZM5 20 16 9',
  plus:'M12 5v14M5 12h14', check:'m5 12 4 4L19 6', close:'m6 6 12 12M18 6 6 18',
  expand:'M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5',
  pin:'M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0ZM12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6',
  chevron:'m9 5 7 7-7 7',
  sprout:'M12 21v-9M12 15C4 15 3 10 3 6c6 0 9 3 9 9ZM12 12c0-6 4-9 9-9 0 5-3 9-9 9',
  box:'m3 7 9-4 9 4-9 4-9-4ZM3 7v10l9 4 9-4V7M12 11v10M7 5l10 4',
  truck:'M3 5h12v12H3V5ZM15 9h4l3 4v4h-7M7 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM18 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4',
  warehouse:'m3 9 9-6 9 6v12H3V9ZM7 21V11h10v10M7 15h10M7 18h10',
  flame:'M13 3c1 5-4 6-4 10 0 1 1 2 2 3-4-1-5-4-4-6-5 5-3 11 4 11s10-7 5-12c0 3-1 4-2 5 1-5 0-8-1-11',
  info:'M12 11v6M12 7h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0'
};
function icon(name) { return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name]||paths.leaf}"/></svg>`; }
function escapeHTML(value) { return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function place() { return escapeHTML(state.placeName || 'your destination'); }
function withPlace(text) { return String(text).replaceAll('{place}',()=>place()); }
function localize(text) {
  return String(text).replace(/BNBU canteen|BNBU kitchen|BNBU lunch|BNBU/gi,()=>place()).replace(/Tangjiawan/gi,'Zhuhai');
}
function button(action,label,cls='primary',attributes='') { return `<button class="${cls}" data-action="${action}" ${attributes}>${label}</button>`; }
function photo(cls='',pins=false) {
  return `<div class="photo ${cls}" role="img" aria-label="Lunch with Chinese cabbage, braised pork and pork tenderloin">${pins?state.ingredients.map((item,i)=>button('edit',escapeHTML(item.name),`ingredient-pin pin-${i}`,`data-index="${i}" aria-label="Edit ${escapeHTML(item.name)}"`)).join(''):''}</div>`;
}
function head(kicker,title,subtitle='') { return `<div class="page-head"><p class="eyebrow">${kicker}</p><h1>${title}</h1>${subtitle?`<p class="subtitle">${subtitle}</p>`:''}</div>`; }
function selectedIngredient() { return state.ingredients[state.selected] || state.ingredients[0]; }
function variant(id) {
  const item=selectedIngredient();
  if(!['pork','vegetable'].includes(item.type)) return 'unsupported';
  return id==='cooking' && item.type==='pork' && /tenderloin|fried|里脊|炸/i.test(item.name)?'fried':item.type;
}
function shortContent(id) {
  const v=variant(id);
  return v==='unsupported'?{title:'A new ingredient needs a new trail.',route:['Origin unknown','Supplier unknown','{place}'],facts:[['Your correction',escapeHTML(selectedIngredient().name)+' needs a different ingredient card.'],['Available examples','This demo covers pork and leafy vegetables.'],['Next evidence','Ingredient-specific sources and supplier records would be needed.']]}:shortStages[id][v];
}
function regionContext() {
  return `<div class="region-context"><button class="place-button" data-action="edit-place" aria-label="Edit place">${icon('pin')}<strong>${place()}</strong></button><span>${escapeHTML(state.region.city)}, ${escapeHTML(state.region.province)}, ${escapeHTML(state.region.country)}</span></div>`;
}
function startScreen() {
  return `<section class="hero fade-in"><div class="hero-emblem" aria-hidden="true">${icon('leaf')}</div><h1>Your lunch.<br><span>A bigger story.</span></h1><p>Explore the hidden journey behind your meal.</p>${button('choose-photo','Choose a photo')}<span class="hero-note">Food. Energy. Everyday life.</span></section>`;
}
function openDialog(title,html,kind='') {
  if(!dialog.open) dialog.returnFocus=document.activeElement;
  dialog.className=kind;
  document.querySelector('#dialog-title').textContent=title;
  document.querySelector('#dialog-content').innerHTML=html;
  if(!dialog.open) dialog.showModal();
}
function choosePhoto() {
  state.galleryChoice=state.photoSelected||state.galleryChoice;
  openDialog('Photos',`<div class="photo-grid" role="group" aria-label="Choose a meal photo"><button class="gallery-tile ${state.galleryChoice?'selected':''}" data-action="select-photo" aria-label="My lunch" aria-pressed="${state.galleryChoice}">${photo()}<span class="photo-check">${icon('check')}</span></button><button class="gallery-tile add-photo" disabled aria-label="Add photo, preview only" title="Preview only">${icon('plus')}</button></div><div class="sheet-actions">${button('close-dialog','Cancel','text-button')}${button('photo-next','Next','primary',state.galleryChoice?'':'disabled')}</div>`,'photo-sheet');
}
function options(values,selected='',placeholder='Select') {
  return `<option value="">${placeholder}</option>`+values.map(v=>`<option value="${escapeHTML(v)}" ${v===selected?'selected':''}>${escapeHTML(v)}</option>`).join('');
}
function chooseRegion(editing=false) {
  const previous=editing?state.region:null;
  openDialog('Where are you eating?',`<form id="region-form"><div class="location-fields"><div class="field"><label for="country-choice">Country / Region</label><select id="country-choice" required autocomplete="country-name">${options(Object.keys(locations),previous?.country,'Select country')}</select></div><div class="field"><label for="province-choice">Province / State</label><select id="province-choice" required autocomplete="address-level1" ${previous?'':'disabled'}>${options(previous?Object.keys(locations[previous.country]):[],previous?.province,'Select province')}</select></div><div class="field"><label for="city-choice">City</label><select id="city-choice" required autocomplete="address-level2" ${previous?'':'disabled'} aria-describedby="region-feedback">${options(previous?locations[previous.country][previous.province]:[],previous?.city,'Select city')}</select></div><div class="field"><label for="place-name">Place name</label><input id="place-name" maxlength="64" required value="${editing?escapeHTML(state.placeName):''}" placeholder="Name your canteen or place" autocomplete="off"></div></div><p id="region-feedback" class="form-feedback" role="status"></p><div class="sheet-actions">${button(editing?'close-dialog':'choose-photo',editing?'Cancel':'Back','text-button')}<button id="region-continue" class="primary" type="submit" ${editing?'':'disabled'}>${editing?'Save place':'Continue'}</button></div></form>`,'region-sheet');
  const form=document.querySelector('#region-form');
  const country=form.querySelector('#country-choice'), province=form.querySelector('#province-choice'),city=form.querySelector('#city-choice'), name=form.querySelector('#place-name');
  const ready=()=>{
    const complete=country.value&&province.value&&city.value&&name.value.trim();
    form.querySelector('#region-continue').disabled=!complete;
    form.querySelector('#region-feedback').textContent=city.value&&city.value!=='Zhuhai'?'Detailed local content is available for Zhuhai in this demo.':'';
    city.removeAttribute('aria-invalid');
  };
  country.addEventListener('change',()=>{province.innerHTML=options(Object.keys(locations[country.value]||{}),'','Select province');province.disabled=!country.value;city.innerHTML=options([],'','Select city');city.disabled=true;ready();});
  province.addEventListener('change',()=>{city.innerHTML=options(locations[country.value]?.[province.value]||[],'','Select city');city.disabled=!province.value;ready();});
  city.addEventListener('change',ready);name.addEventListener('input',ready);
  form.addEventListener('submit',event=>{
    event.preventDefault();
    if(!country.value||!province.value||!city.value||!name.value.trim())return;
    if(country.value!=='China'||province.value!=='Guangdong'||city.value!=='Zhuhai'){
      form.querySelector('#region-feedback').textContent='Choose China, Guangdong and Zhuhai to use the local demo.';city.setAttribute('aria-invalid','true');city.focus();return;
    }
    if(!editing){state.ingredients=defaults();state.selected=1;state.confirmed=false;}
    state.region={country:country.value,province:province.value,city:city.value};state.placeName=name.value.trim();state.photoSelected=true;
    dialog.close();if(editing)render();else navigate('ingredients');
  });
}
function ingredientsScreen() {
  return `<section class="fade-in">${head('Your meal',`Lunch at ${place()}.`,'Confirm what’s on your plate.')}<div class="recognition"><div class="photo-panel">${photo('',true)}</div><div class="ingredient-side"><p class="section-label">Ingredients</p><ul class="ingredient-list">${state.ingredients.map((item,i)=>`<li><span class="ingredient-name">${escapeHTML(item.name)}</span>${button('edit','Edit','text-button',`data-index="${i}" aria-label="Edit ${escapeHTML(item.name)} ingredient"`)}</li>`).join('')}</ul><p class="small-note">AI suggestions can be corrected.</p>${button('confirm','Confirm ingredients')}<div class="minor-action">${button('choose-photo','Change photo','text-button')}</div></div></div></section>`;
}
function ingredientTabs() {
  return `<fieldset class="ingredient-tabs"><legend class="sr-only">Choose an ingredient</legend>${state.ingredients.map((item,i)=>`<label class="ingredient-tab"><input type="radio" name="ingredient" value="${i}" ${state.selected===i?'checked':''}><span>${escapeHTML(item.name)}</span></label>`).join('')}</fieldset>`;
}
function journeyScreen() {
  return `<section class="fade-in">${head('Its journey','A plate with a past.','Choose an ingredient. Follow one stage.')}<div class="journey-context">${photo('meal-thumb')}${ingredientTabs()}</div><div class="journey-track">${stages.map(stage=>`<button class="stage-card ${stage.id==='transport'?'featured':''}" data-action="stage" data-stage="${stage.id}"><span class="stage-art">${icon(stage.icon)}</span><h2>${stage.title}</h2><p>${stage.caption}</p><span class="card-disclosure">${icon('chevron')}</span></button>`).join('')}</div><div class="screen-bottom"><span class="scope-note">Regional example · actual route unverified</span>${button('sources','Sources','text-button')}</div></section>`;
}
function stageScreen(id) {
  const content=shortContent(id),stage=stages.find(x=>x.id===id);
  return `<section class="fade-in">${button('go-journey','Back to journey','back')}${head(stage.title+' · '+escapeHTML(selectedIngredient().name),withPlace(content.title))}<div class="process"><div class="process-visual">${id==='transport'?'<div class="transport-image" role="img" aria-label="Illustrative delivery truck"></div>':photo()}<ol class="route">${content.route.map(x=>`<li>${withPlace(x)}</li>`).join('')}</ol></div><div class="process-copy"><div class="fact-list">${content.facts.map(([title,text],i)=>`<div class="fact-row"><span class="fact-icon">${icon(['leaf','box','info'][i])}</span><div><h2>${title}</h2><p>${text}</p></div></div>`).join('')}</div><div class="detail-actions">${button('details','Details','text-button',`data-stage="${id}"`)}${button('curation','Behind the explanation','text-button')}</div></div></div><div class="screen-bottom"><span class="scope-note">Regional example · actual route unverified</span><div class="buttons">${button('sources','Sources','text-button')}${button('go-reflect','Reflect on your meal')}</div></div></section>`;
}
function reflectionScreen() {
  return `<section class="reflection fade-in"><div class="reflection-image">${photo()}<p>One meal. A little more visible.</p></div><div>${head('Your next meal','What will you take away?')}<p class="question-title">Which step uses energy?</p><div class="answers">${['Refrigerating food in transit','Changing the plate colour'].map((text,i)=>button('quiz',text,`answer-option ${state.quiz===i?'chosen':''}`,`data-index="${i}" aria-pressed="${state.quiz===i}"`)).join('')}</div><p class="feedback" role="status">${state.quiz===null?'':state.quiz===0?'Yes. Refrigeration needs energy.':'Think about equipment used during delivery.'}</p><form id="reflection-form"><label for="response">What will you ask or do at ${place()}?</label><textarea id="response" maxlength="280" placeholder="One question or one action…">${escapeHTML(state.response)}</textarea><div class="reflection-footer"><button class="primary" type="submit">Keep reflection</button><span id="saved-response" class="saved-feedback" role="status"></span></div><p class="local-note">Kept in this tab only.</p></form><div class="detail-actions">${button('go-journey','Explore another stage','text-button')}${button('reset','Start again','text-button')}</div></div></section>`;
}
function showDetails(id) {
  const variantName=variant(id), old=regionalStages[id];
  if(variantName==='unsupported') {openDialog('Details','<p class="modal-intro">This ingredient needs its own sources and supplier records.</p>');return;}
  const data=old[variantName];
  openDialog(stages.find(x=>x.id===id).title+' details',`<p class="modal-intro">${place()} · Zhuhai context</p><p class="scope-note modal-scope">Illustrative processes, not verified meal tracking.</p><div class="detail-list">${data.panels.map(([title,text])=>`<details><summary>${localize(title)}${icon('chevron')}</summary><div class="detail-body">${localize(text)}</div></details>`).join('')}<details><summary>What is still unknown?${icon('chevron')}</summary><div class="detail-body"><ul>${data.unknown.map(x=>`<li>${x}</li>`).join('')}</ul><p>Ask ${place()} or its supplier for batch and kitchen records.</p></div></details></div><div class="sheet-actions">${button('sources','View sources','text-button')}${button('close-dialog','Done')}</div>`,'detail-sheet');
}
function showSources() {
  openDialog('Sources',`<p class="modal-intro">Published regional examples. Actual suppliers and routes remain unverified.</p><div class="detail-list">${sources.map(source=>`<details><summary><span><small>${source.id}</small>${source.title}</span>${icon('chevron')}</summary><div class="detail-body"><p>${source.org}</p><p>${localize(source.supports)}</p><a href="${source.url}" target="_blank" rel="noopener noreferrer">Open source</a></div></details>`).join('')}</div><p class="local-note">Source websites need internet. This demo works offline.</p>`,'detail-sheet');
}
function showCuration() {
  openDialog('Behind the explanation',`<p class="modal-intro">Human expertise. AI support. Your choices.</p><div class="curation-list"><div><h3>Museum staff</h3><p>Select and review reliable knowledge.</p></div><div><h3>AI support</h3><p>Suggest ingredients and match relevant content.</p></div><div><h3>You</h3><p>Confirm the food, name the place, choose a stage.</p></div></div><p class="small-note">This demo uses prepared recognition and city-level examples.</p>`,'detail-sheet');
}
function editIngredient(index) {
  const item=state.ingredients[index];
  openDialog('Edit ingredient',`<form id="ingredient-form"><div class="field"><label for="ingredient-name">Ingredient or dish</label><input id="ingredient-name" value="${escapeHTML(item.name)}" maxlength="55" required></div><div class="field"><label for="ingredient-group">Ingredient group</label><select id="ingredient-group">${[['vegetable','Vegetable'],['pork','Pork'],['tofu','Tofu / soybean'],['other','Other / unsure']].map(([v,t])=>`<option value="${v}" ${v===item.type?'selected':''}>${t}</option>`).join('')}</select></div><div class="sheet-actions">${button('close-dialog','Cancel','text-button')}<button class="primary" type="submit">Save ingredient</button></div></form>`,'region-sheet');
  document.querySelector('#ingredient-form').addEventListener('submit',event=>{event.preventDefault();const name=document.querySelector('#ingredient-name').value.trim();if(!name)return;state.ingredients[index]={name,type:document.querySelector('#ingredient-group').value};state.confirmed=false;dialog.close();navigate('ingredients');announce('Ingredient updated.');});
}
function announce(text) {document.querySelector('#announcement').textContent=text;}
function navigate(route) {if(location.hash==='#'+route)render();else location.hash=route;}
function render() {
  let route=location.hash.slice(1)||'start';
  const known=['start','ingredients','journey','reflect',...stages.map(x=>'process/'+x.id)];
  if(!known.includes(route)){navigate('start');return;}
  if(route!=='start'&&(!state.photoSelected||!state.region)){navigate('start');return;}
  if((route==='journey'||route.startsWith('process/'))&&!state.confirmed){navigate('ingredients');announce('Confirm your ingredients first.');return;}
  document.body.dataset.screen=route==='start'?'start':'experience';
  const screen=route==='start'?startScreen():route==='ingredients'?ingredientsScreen():route==='journey'?journeyScreen():route==='reflect'?reflectionScreen():stageScreen(route.split('/')[1]);
  app.innerHTML=(route==='start'?'':regionContext())+screen;
  document.querySelectorAll('nav a').forEach(link=>{const active=(route.startsWith('process/')?'journey':route)===link.dataset.nav;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
  document.title=(route==='start'?'Lunch Journey':(route.startsWith('process/')?stages.find(x=>x.id===route.split('/')[1]).title:({ingredients:'Your meal',journey:'Its journey',reflect:'Reflection'})[route]))+' · MoCC';
  if(route==='reflect')document.querySelector('#reflection-form').addEventListener('submit',event=>{event.preventDefault();const field=document.querySelector('#response');if(!field.value.trim()){field.focus();return;}state.response=field.value.trim();document.querySelector('#saved-response').textContent='Kept in this tab';announce('Reflection kept in this tab.');});
  app.focus({preventScroll:true});window.scrollTo(0,0);
}
function reset(){Object.assign(state,{ingredients:defaults(),selected:1,confirmed:false,photoSelected:false,galleryChoice:false,region:null,placeName:'',response:'',quiz:null});if(dialog.open)dialog.close();navigate('start');}
const actions={
  'choose-photo':choosePhoto,
  'select-photo':el=>{state.galleryChoice=true;el.classList.add('selected');el.setAttribute('aria-pressed','true');document.querySelector('[data-action="photo-next"]').disabled=false;},
  'photo-next':()=>{if(state.galleryChoice)chooseRegion();},
  'close-dialog':()=>dialog.close(),
  'edit-place':()=>chooseRegion(true),
  edit:el=>editIngredient(Number(el.dataset.index)),
  confirm:()=>{state.confirmed=true;navigate('journey');},
  stage:el=>navigate('process/'+el.dataset.stage),
  details:el=>showDetails(el.dataset.stage),
  'go-journey':()=>navigate('journey'), 'go-reflect':()=>navigate('reflect'),
  quiz:el=>{const response=document.querySelector('#response');if(response)state.response=response.value;state.quiz=Number(el.dataset.index);render();},
  sources:showSources,curation:showCuration,reset
};
document.addEventListener('click',event=>{if(event.target.closest('.skip-link')){event.preventDefault();app.focus();return;}const el=event.target.closest('[data-action]');if(el&&!el.disabled&&actions[el.dataset.action])actions[el.dataset.action](el);});
document.addEventListener('change',event=>{if(event.target.matches('input[name="ingredient"]')){state.selected=Number(event.target.value);render();document.querySelector('input[name="ingredient"][value="'+state.selected+'"]').focus({preventScroll:true});}});
document.addEventListener('input',event=>{if(event.target.id==='response')state.response=event.target.value;});
document.querySelector('#reset').addEventListener('click',reset);
document.querySelector('#close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{const target=dialog.returnFocus;if(target?.isConnected)target.focus({preventScroll:true});});
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
document.querySelector('#fullscreen').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else announce('Use the browser full-screen command.');}catch{announce('Use the browser full-screen command.');}});
window.addEventListener('hashchange',()=>{if(dialog.open)dialog.close();render();});
render();
