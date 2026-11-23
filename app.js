'use strict';
const app = document.querySelector('#app');
const dialog = document.querySelector('#dialog');
const defaults = () => [
  { name: 'Chinese cabbage', type: 'vegetable', note: 'Leafy vegetable · confirm the variety' },
  { name: 'Braised pork', type: 'pork', note: 'Pork dish · confirm the ingredient' },
  { name: 'Pork tenderloin', type: 'pork', note: 'Fried dish · confirm the ingredient' }
];
const state = { ingredients: defaults(), selected: 1, confirmed: false, response: '', quiz: null };
const sources = [
  { title: 'Energy in agrifood systems', org: 'FAO', url: 'https://www.fao.org/energy/en/', supports: 'Energy use across production, processing, transport, storage and preparation.' },
  { title: 'Sustainable Food Cold Chains', org: 'UNEP & FAO · 2022', url: 'https://wedocs.unep.org/items/c53a122d-d424-48a3-8cd6-9fddc3cf0dc2', supports: 'Refrigeration, its environmental impacts and its role in reducing food loss.' },
  { title: 'Transport in the food supply chain', org: 'FAO · Food loss and waste guide', url: 'https://www.fao.org/platform-food-loss-waste/flw-data/user-guide/en', supports: 'Transport connects farms, storage, processing and markets.' }
];
const stages = [
  { id: 'production', title: 'Production', art: '♧', caption: 'Where ingredients begin' },
  { id: 'processing', title: 'Processing', art: '▥', caption: 'Preparing and packing' },
  { id: 'transport', title: 'Transportation', art: '▰', caption: 'Moving food between places' },
  { id: 'distribution', title: 'Distribution', art: '▤', caption: 'Storing and supplying' },
  { id: 'cooking', title: 'Cooking', art: '≈', caption: 'Preparing your meal' }
];
const stageContent = {
  production: {
    title: 'Before the food leaves the farm.',
    intro: 'Growing crops and raising livestock both use resources. The processes depend on the ingredient.',
    vegetable: ['Growing and harvesting', 'Vegetables need land and water. Machinery and irrigation can use fuel or electricity.'],
    pork: ['Raising pigs and producing feed', 'Feed production, farm equipment and animal housing can require energy and other resources.'],
    tofu: ['Growing soybeans', 'Soybean cultivation and harvesting use land, water and, depending on the farm, machinery and irrigation.'],
    other: ['Producing the ingredient', 'Crops, livestock and other foods have different production processes. Ingredient-specific records would help explain this meal.'],
    extra: ['Energy inputs', 'Equipment, irrigation or farm buildings may use energy. The source and amount vary by farm.'],
    unknown: ['Farm location', 'Production practices', 'Energy sources']
  },
  processing: {
    title: 'Getting ingredients ready.',
    intro: 'Food may be cleaned, cut, processed and packed before it reaches the canteen.',
    vegetable: ['Washing, sorting and packing', 'Vegetables may be washed, sorted, trimmed and packed. Refrigeration may be used for storage.'],
    pork: ['Preparing and packing meat', 'Meat preparation, packing and temperature-controlled storage can use electricity and other resources.'],
    tofu: ['Making tofu', 'Soybeans are soaked, ground and heated before the curds are pressed. Heating and equipment can use energy.'],
    other: ['Preparing and packing', 'Processing depends on the ingredient. The dish name alone does not reveal the processing method.'],
    extra: ['Machines and temperature control', 'Equipment, heating and cooling can all use energy during processing.'],
    unknown: ['Processing method', 'Packaging', 'Storage requirements']
  },
  distribution: {
    title: 'Between delivery and the kitchen.',
    intro: 'Food can pass through warehouses, suppliers and canteen storage before cooking.',
    vegetable: ['Handling fresh produce', 'Storage conditions and delivery schedules help determine how long vegetables stay usable.'],
    pork: ['Keeping meat at suitable temperatures', 'Suppliers and kitchens may use refrigeration. The actual conditions require delivery and storage records.'],
    tofu: ['Supplying the kitchen', 'Storage needs depend on the tofu product and packaging. Check the supplier’s handling information.'],
    other: ['Storage and supply', 'Different ingredients need different handling. Supplier records can clarify the route.'],
    extra: ['Storage energy', 'Refrigerators, cold rooms and buildings can require energy while food waits to be prepared.'],
    unknown: ['Storage duration', 'Storage conditions', 'Supplier route']
  },
  cooking: {
    title: 'The last stop before your plate.',
    intro: 'A canteen turns ingredients into a meal through preparation, heating and serving.',
    vegetable: ['Preparing vegetables', 'Washing and cooking use water and energy. The method depends on the kitchen.'],
    pork: ['Cooking a pork dish', 'Braising and frying are different cooking methods. Fuel or electricity can provide the heat.'],
    tofu: ['Preparing tofu', 'Tofu may be steamed, fried or cooked with other ingredients. Each method uses kitchen equipment.'],
    other: ['Preparing the dish', 'The recipe and equipment determine which processes are involved.'],
    extra: ['Heating and kitchen equipment', 'Energy use depends on the cooking method, equipment, cooking time and batch size.'],
    unknown: ['Cooking method', 'Equipment', 'Fuel or electricity']
  }
};
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
  return `<section class="hero fade-in"><div class="hero-copy"><p class="eyebrow">From a familiar meal to a bigger picture</p><h1>Your lunch,<br><span class="accent-word">uncovered.</span></h1><p class="intro">A meal is more than what’s on the plate. Follow an ingredient and discover the energy behind its journey.</p><div class="buttons">${actionButton('sample', 'Explore this lunch')}${actionButton('upload-preview', 'Choose a photo', 'secondary', 'disabled title="Photo upload is shown as part of the prototype"')}</div><p class="fine">Explore the prepared canteen meal. Photo upload is preview-only in this demonstration.</p></div><div class="hero-media">${photo()}<div class="photo-caption"><span>A real canteen lunch. A starting point for questions.</span><span class="caption-tag">Your everyday, connected.</span></div></div></section>`;
}
function ingredientsScreen() {
  return `<section class="fade-in">${head('Your meal', 'What’s on your plate?', 'Confirm the ingredients before following their journey.', 'You choose what to explore')}<div class="recognition"><div class="photo-panel">${photo('', true)}<p class="fine">Prepared example · the labels below are simulated recognition suggestions.</p></div><div><p class="section-label">${state.confirmed ? 'Your confirmed ingredients' : 'Ingredients to confirm'}</p><ul class="ingredient-list">${state.ingredients.map((item, i) => `<li class="ingredient-item"><span class="swatch ${item.type}" aria-hidden="true"></span><div class="ingredient-name">${escapeHTML(item.name)}<small>${escapeHTML(state.confirmed ? 'Confirmed by you' : item.note)}</small></div>${actionButton('edit', 'Edit', 'edit-button', `data-index="${i}"`)}</li>`).join('')}</ul><p class="notice">Mixed dishes can be difficult to identify. You can correct a name and choose its ingredient group.</p>${actionButton('confirm', 'Confirm ingredients')}<div class="buttons">${actionButton('upload-preview', 'Change photo', 'text-button', 'disabled title="Preview only"')}${actionButton('sample', 'Use the prepared meal', 'text-button')}</div></div></div></section>`;
}
function journeyScreen() {
  const chosen = selectedIngredient();
  return `<section class="fade-in">${actionButton('go-ingredients', 'Back to your ingredients', 'back')}${head('Its journey', 'A plate with a past.', 'Choose an ingredient, then open a stage to look closer.')}<div class="journey-context">${photo('meal-thumb')}<div class="ingredient-tabs" aria-label="Choose an ingredient">${state.ingredients.map((item, i) => actionButton('select-ingredient', escapeHTML(item.name), `ingredient-tab ${i === state.selected ? 'selected' : ''}`, `data-index="${i}" aria-pressed="${i === state.selected}"`)).join('')}</div></div><div class="journey-stage"><div class="journey-track">${stages.map(stage => `<button class="stage-card ${stage.id === 'transport' ? 'featured' : ''}" data-action="stage" data-stage="${stage.id}"><div class="stage-art" aria-hidden="true">${stage.art}</div><h3>${stage.title}</h3><p>${stage.id === 'production' ? productionCaption(chosen.type) : stage.caption}</p></button>`).join('')}</div><div class="journey-bottom"><span>A typical journey for <strong>${escapeHTML(chosen.name)}</strong>. Transport can connect several stages.</span>${actionButton('sources', 'View sources', 'info-link')}</div></div><p class="fine">This illustrates common processes. The actual route of this meal still needs supplier information.</p></section>`;
}
function productionCaption(type) { return ({ vegetable: 'Growing and harvesting', pork: 'Raising pigs and producing feed', tofu: 'Growing soybeans', other: 'Producing the ingredient' })[type] || 'Producing the ingredient'; }
function accordion(title, text, id, open = false) {
  return `<div class="process-choice"><button class="process-toggle" data-action="accordion" aria-expanded="${open}" aria-controls="${id}">${title}<span class="toggle-symbol" aria-hidden="true">${open ? '−' : '+'}</span></button><div class="process-detail ${open ? '' : 'hidden'}" id="${id}">${text}</div></div>`;
}
function missingInfo(tags) {
  return `<div class="question-box"><button class="question-toggle" data-action="unknown" aria-expanded="false" aria-controls="missing-body">What do we still need to know?<span aria-hidden="true">+</span></button><div class="question-body hidden" id="missing-body"><div class="unknown-tags">${tags.map(x => `<span>${x}</span>`).join('')}</div>The photo cannot verify these details. We would need supplier or kitchen records to describe this particular meal.</div></div>`;
}
function transportScreen() {
  return `<section class="fade-in">${actionButton('go-journey', 'Back to the journey', 'back')}${head('Transportation · '+escapeHTML(selectedIngredient().name), 'More than a delivery.', 'Food moves. Energy goes with it.')}<div class="process"><div><div class="transport-image" role="img" aria-label="Illustration of a refrigerated delivery truck"></div><p class="visual-label">Transport illustration from the supplied presentation.</p><div class="process-summary"><h3>A journey we rarely see.</h3><p>Vehicles move ingredients between farms, processors, storage and kitchens. Some foods also need cooling on the way.</p></div></div><div><div class="process-card">${accordion('Fuel', 'Vehicles can use fuel or electricity. Distance, vehicle type and how much food is carried all affect transport energy use.', 'fuel', true)}${accordion('Cooling', 'Some foods need temperature-controlled transport. Refrigeration uses energy and helps reduce food spoilage. Whether this meal used a cold chain is still unconfirmed.', 'cooling')}${accordion('Emissions', 'Burning fuel releases greenhouse gases. Cooling can also have impacts through energy use and refrigerants. A specific footprint needs more information than a photo.', 'emissions')}</div>${missingInfo(['Transport distance', 'Transport method', 'Storage conditions'])}</div></div>${processActions()}</section>`;
}
function processActions() {
  return `<div class="process-actions"><div class="process-links">${actionButton('sources', 'Sources & evidence', 'info-link')}${actionButton('curation', 'How was this explanation selected?', 'info-link')}</div>${actionButton('go-reflect', 'Back to your meal')}</div>`;
}
function genericStageScreen(id) {
  const stage = stages.find(s => s.id === id);
  const content = stageContent[id];
  const [title, text] = content[selectedIngredient().type] || content.other;
  return `<section class="fade-in">${actionButton('go-journey', 'Back to the journey', 'back')}${head(stage.title+' · '+escapeHTML(selectedIngredient().name), content.title, content.intro)}<div class="process"><div><div class="result-art" aria-hidden="true">${stage.art}</div><div class="process-summary"><h3>Follow one ingredient.</h3><p>The illustration changes with your selected ingredient group. Each explanation uses general food-system knowledge.</p></div></div><div><div class="process-card">${accordion(title, text, 'stage-specific', true)}${accordion(content.extra[0], content.extra[1], 'energy')}</div>${missingInfo(content.unknown)}</div></div>${processActions()}</section>`;
}
function reflectionScreen() {
  return `<section class="reflection fade-in"><div><div class="photo-panel">${photo()}<div class="photo-caption"><span>The same lunch. A little more visible.</span></div></div></div><div class="reflection-content"><p class="eyebrow">Your next meal</p><h2>What will you<br><span class="accent-word">take away?</span></h2><p class="question-title">Which of these is an example of energy use on a food journey?</p><div aria-label="Learning check">${['Cooling food during transport', 'The colour of the plate'].map((answer, i) => `<button class="answer-option ${state.quiz === i ? 'chosen' : ''}" data-action="quiz" data-index="${i}" aria-pressed="${state.quiz === i}">${answer}</button>`).join('')}</div><div class="feedback" role="status">${state.quiz === null ? '' : state.quiz === 0 ? 'Yes. Refrigeration uses energy to keep some foods at suitable temperatures during transport.' : 'Look again at the journey. Think about the equipment that keeps food cool while it moves.'}</div><div class="reflection-action"><p>At your next canteen meal, what will you do to value food and resources?</p><label for="response">One action, or a question you would ask the canteen</label><textarea id="response" maxlength="280" placeholder="I would like to find out…">${escapeHTML(state.response)}</textarea>${actionButton('save-response', 'Keep my reflection')}<div id="saved-response" class="hidden saved-response" role="status"></div><p class="local-note">Kept only in this tab until you restart or close it.</p></div><div class="buttons" style="margin-top:20px">${actionButton('go-journey', 'Explore another stage', 'text-button')}${actionButton('reset', 'Start again', 'text-button')}</div></div></section>`;
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
  let html;
  if (route === 'start') html = startScreen();
  else if (route === 'ingredients') html = ingredientsScreen();
  else if (route === 'journey') html = journeyScreen();
  else if (route === 'reflect') html = reflectionScreen();
  else if (route === 'process/transport') html = transportScreen();
  else html = genericStageScreen(route.split('/')[1]);
  app.innerHTML = html;
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
  openDialog('Sources & evidence', `<div class="modal-body"><p>These sources explain general processes. They do not identify the farm, supplier or route of the photographed meal.</p>${sources.map(s => `<a class="source-item" href="${s.url}" target="_blank" rel="noopener noreferrer"><strong>${s.org} · ${s.title}</strong><small>${s.supports}</small></a>`).join('')}<p class="fine">Explanations prepared for this student prototype. In a museum installation, designated staff would review and maintain the knowledge cards.</p></div>`);
}
function showCuration() {
  openDialog('How this explanation was selected', `<div class="modal-body"><p><strong>Hybrid curatorship</strong> connects institutional knowledge, AI support and visitor choice.</p><h3>Museum staff</h3><p>In the proposed installation, educators select reliable sources, write the knowledge cards and review their scope and accuracy.</p><h3>AI support</h3><p>The proposed AI suggests ingredients and connects the visitor’s confirmed choice to relevant cards. This demo uses preset labels and matching rules.</p><h3>You</h3><p>You correct the ingredient, choose a group and decide which stage to open.</p><h3>When information is missing</h3><p>The screen marks what is still unknown. Further external research would need checking before becoming a museum explanation.</p><p class="fine">Student proposal for the MoCC permanent exhibition. The prototype content has been prepared by the student project, with the sources linked here.</p></div>`);
}
function reset() {
  Object.assign(state, { ingredients: defaults(), selected: 1, confirmed: false, response: '', quiz: null });
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
  sample: () => { if(dialog.open)dialog.close(); Object.assign(state,{ingredients:defaults(),selected:1,confirmed:false}); navigate('ingredients'); },
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
