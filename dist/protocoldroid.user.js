// ==UserScript==
// @name        ProtocolDroid
// @description A client side HedgeDoc extension that helps with protocols.
// @version     0.3.0
// @author      Yorik Hansen
// @homepage    https://protocoldroid.yorik.dev/
// @match       https://www.fs-infmath.uni-kiel.de/codimd/*
// @match       https://codimd.fs-infmath.uni-kiel.de/*
// @match       https://md.kif.rocks/*
// @match       https://md.fachschaften.org/*
// @connect     www.fs-infmath.uni-kiel.de
// @connect     protocoldroid.yorik.dev
// @downloadURL https://github.com/YorikHansen/ProtocolDroid/raw/main/dist/protocoldroid.user.js
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @grant       GM_getResourceURL
// @icon        https://www.fs-infmath.uni-kiel.de/codimd/icons/favicon.ico
// @namespace   https://protocoldroid.yorik.dev/
// @resource    JetBrainsMonoRegular https://protocoldroid.yorik.dev/fonts/jetbrains-mono/JetBrainsMono-Regular.woff2
// @resource    JetBrainsMonoBold https://protocoldroid.yorik.dev/fonts/jetbrains-mono/JetBrainsMono-Bold.woff2
// @resource    JetBrainsMonoItalic https://protocoldroid.yorik.dev/fonts/jetbrains-mono/JetBrainsMono-Italic.woff2
// @resource    JetBrainsMonoBoldItalic https://protocoldroid.yorik.dev/fonts/jetbrains-mono/JetBrainsMono-BoldItalic.woff2
// @resource    FiraCodeLight https://protocoldroid.yorik.dev/fonts/fira-code/FiraCode-Light.woff2
// @resource    FiraCodeRegular https://protocoldroid.yorik.dev/fonts/fira-code/FiraCode-Regular.woff2
// @resource    FiraCodeMedium https://protocoldroid.yorik.dev/fonts/fira-code/FiraCode-Medium.woff2
// @resource    FiraCodeSemiBold https://protocoldroid.yorik.dev/fonts/fira-code/FiraCode-SemiBold.woff2
// @resource    FiraCodeBold https://protocoldroid.yorik.dev/fonts/fira-code/FiraCode-Bold.woff2
// @run-at      document-body
// @updateURL   https://github.com/YorikHansen/ProtocolDroid/raw/main/dist/protocoldroid.meta.js
// ==/UserScript==

(()=>{var t={13:(t,e,n)=>{const a=n(477);t.exports=class extends a{constructor(t,e){super(t,e)}_setInputElemValue(t){this._input.checked=t}_getInputElemValue(){return this._input.checked}_prepareInputElement(){this._input.id=this._name,this._input.disabled=this._disabledFn(a._SETTINGS),this._input.type="checkbox",this._setInputElemValue(this._liveValue),this._input.addEventListener("input",(()=>{a.set(this._name,this._getInputElemValue())}))}}},839:(t,e,n)=>{const a=n(477),o=n(13);class s{static _precedences=[];static _features=[];constructor(t,e,n=[],a=!0){if(!t.match(/^[a-z][a-z0-9]*(?:\-[a-z0-9]+)+$/i))throw new Error("Feature names must only contain letters, numbers and hyphens. They must start with a letter, have at least one hyphen and may not end with a hyphen.");this.name=t,this.code=e,this.options=n,this.enabledByDefault=a,this.description=""}register(t=0){return a.add(new o(["features",this.name],this.enabledByDefault)),this.options.forEach((t=>a.add(t.toNamespace(this.name).setDisabledFn((()=>!a.get(["features",this.name]).liveValue))))),s.add(this,t)}load(t,e,n){a.get(["features",this.name]).value&&(this.code(t,e,[this.name]),console.log(`Feature ${this.name} loaded`))}setDescription(t){return this.description=t,this}static add(t,e=0){return e in s._features||(s._precedences.push(e),s._features[e]=[]),s._features[e].push(t),!0}static loadAll(t,e){s._precedences.sort();for(let n=s._precedences.length-1;n>=0;n--)s._features[s._precedences[n]].forEach((n=>n.load(t,e,"")))}}t.exports=s},75:(t,e,n)=>{const a=n(477);n(13),n(70),n(839);class o{static getByQuery=t=>new Promise(((e,n)=>{const a=setInterval((()=>{const n=document.querySelector(t);n&&(clearInterval(a),e(n))}),100)}));static getCodeMirror=()=>new Promise(((t,e)=>{const n=setInterval((()=>{unsafeWindow.editor&&(clearInterval(n),t(unsafeWindow.editor))}),100)}));static getMardownIt=()=>new Promise(((t,e)=>{const n=setInterval((()=>{unsafeWindow.md&&(clearInterval(n),t(unsafeWindow.md))}),100)}));static addModal=(t,e,n,a)=>{let o=document.createElement("div");o.classList.add("modal","fade"),o.id=t,o.tabIndex=-1,o.role="dialog",o.setAttribute("aria-labelledby",t+"-label"),o.setAttribute("aria-hidden","true");let s=document.createElement("div");s.classList.add("modal-dialog","modal-lg"),s.role="document";let r=document.createElement("div");r.classList.add("modal-content");let l=document.createElement("div");l.classList.add("modal-header");let i=document.createElement("button");if(i.type="button",i.classList.add("close"),i.setAttribute("data-dismiss","modal"),i.setAttribute("aria-label","Close"),i.innerHTML='<span aria-hidden="true">&times;</span>',l.appendChild(i),e instanceof HTMLElement)e.classList.contains("modal-header")?l=e:(e.classList.add("modal-title"),e.id=t+"-label",l.appendChild(e));else{let n=document.createElement("h4");n.classList.add("modal-title"),n.id=t+"-label",n.innerText=e,l.appendChild(n)}if(r.appendChild(l),n instanceof HTMLElement)n.classList.add("modal-body"),r.appendChild(n);else{let t=document.createElement("div");t.classList.add("modal-body"),t.innerHTML=n,r.appendChild(t)}if(a instanceof HTMLElement)a.classList.add("modal-footer"),r.appendChild(a);else{let t=document.createElement("div");t.classList.add("modal-footer"),a.forEach((e=>t.appendChild(e))),r.appendChild(t)}return s.appendChild(r),o.appendChild(s),o};static addSettingMenu=()=>{console.log("Adding settings menu"),GM_addStyle("\n\t\t\t#short-online-user-list {\n\t\t\t\tline-height: 1;\n\t\t\t}\n\t\t\t@media (max-width: 821px) {\n\t\t\t\t.navbar-collapse.collapse {\n\t\t\t\t\tdisplay: none !important;\n\t\t\t\t}\n\t\t\t\t.visible-xs {\n\t\t\t\t\tdisplay: block !important;\n\t\t\t\t}\n\t\t\t\t.navbar-header {\n\t\t\t\t\tfloat: none;\n\t\t\t\t}\n\t\t\t}\n\t\t");let t=a.bundleHTML(),e=document.createElement("div");e.innerHTML="<em>WORK IN PROGRESS</em><hr>",t.prepend(e);let n=document.createElement("button");n.type="button",n.classList.add("btn","btn-default"),n.setAttribute("data-dismiss","modal"),n.innerText="Abbrechen",n.addEventListener("click",(()=>{a.cancelAll()}));let s=document.createElement("button");s.type="button",s.classList.add("btn","btn-danger"),s.innerText="Zurücksetzen",s.addEventListener("click",(()=>{a.resetAll()}));let r=document.createElement("button");r.type="button",r.classList.add("btn","btn-primary"),r.innerText="Speichern",r.addEventListener("click",(()=>{a.commitAll(),window.location.reload()}));let l=o.addModal("pd-settings-modal","Einstellungen",t,[n,s,r]);document.body.appendChild(l);let i=document.createElement("ul");i.classList.add("nav","navbar-nav","navbar-form","navbar-right"),i.style="padding: 0;",i.innerHTML='<span class="btn btn-link ui-settings" title="Einstellungen" data-toggle="modal" data-target="#pd-settings-modal"><i class="fa fa-gears"></i></span>';let d=document.createElement("div");d.classList.add("nav-mobile","pull-right","visible-xs"),d.innerHTML='<a class="btn btn-link ui-settings" title="Einstellungen" data-toggle="modal" data-target="#pd-settings-modal"><i class="fa fa-gears"></i></a>',o.getByQuery(".nav.navbar-nav.navbar-right").then((t=>t.after(i))),o.getByQuery(".nav-mobile.pull-right.visible-xs").then((t=>t.before(d)))};static cursorInHTMLComment=(t,e)=>{const n=e.line;let a,o,s,r=n+1;for(;r>0;){if(r--,a=t.getLine(r),r===n&&(a=a.slice(0,e.ch)),o=a.lastIndexOf("\x3c!--"),s=a.lastIndexOf("--\x3e"),o>=0&&s>=0)return o>s;if(o>=0)return!0;if(s>=0)return!1}}}t.exports=o},477:t=>{class e{static _SETTINGS={};_name;_defaultValue;_value;_liveValue;_input=document.createElement("input");_disabledFn=()=>!1;_validateFn=()=>!0;constructor(t,n){if(this.constructor===e)throw new TypeError("Cannot create instance of abstract class Setting");this._name=e.#t(t),this._defaultValue=n,this._value=GM_getValue(this._name.replace(".","_"),this._defaultValue),this._liveValue=this._value}setDisabledFn(t){return this._disabledFn=t,this}setValidateFn(t){return this._validateFn=t,this}toNamespace(t){return t=e.#t(t),this._name=e.#t([t,this._name]),this._value=GM_getValue(this._name.replace(".","_"),this._defaultValue),this._liveValue=this._value,this}_setInputElemValue(t){this._input.value=t}_getInputElemValue(){return this._input.value}_setInputElemValid(t){this._input.classList.toggle("is-invalid",!t)}_prepareInputElement(){this._input.id=this._name,this._input.disabled=this._disabledFn(e._SETTINGS),this._setInputElemValue(this._liveValue),this._input.addEventListener("input",(()=>{e.set(this._name,this._getInputElemValue())}))}getDOMElement(){let t=document.createElement("label");t.htmlFor=this._name,t.innerText=this._name,this._prepareInputElement(),this._input.addEventListener("input",(()=>{for(let t in e._SETTINGS)e._SETTINGS[t]._input.disabled=e._SETTINGS[t]._disabledFn(e._SETTINGS)}));let n=document.createElement("div");return n.appendChild(t),n.appendChild(this._input),n}static add(t){e._SETTINGS[t._name]=t}static get(t){return t=e.#t(t),{value:e._SETTINGS[t]._value,defaultValue:e._SETTINGS[t]._defaultValue,liveValue:e._SETTINGS[t]._liveValue}}static set(t,n){if(t=e.#t(t),e._SETTINGS[t]._disabledFn(e._SETTINGS))return;let a=e._SETTINGS[t]._validateFn(n);e._SETTINGS[t]._setInputElemValid(a),a&&(e._SETTINGS[t]._liveValue=n,e._SETTINGS[t]._getInputElemValue()!==n&&e._SETTINGS[t]._setInputElemValue(n))}static reset(t){t=e.#t(t),e.set(t,e.get(t).defaultValue)}static cancel(t){t=e.#t(t),e._SETTINGS[t]._liveValue=e._SETTINGS[t]._value,e._SETTINGS[t]._setInputElemValue(e._SETTINGS[t]._value)}static commit(t){t=e.#t(t),e._SETTINGS[t]._value=e._SETTINGS[t]._liveValue,GM_setValue(t.replace(".","_"),e._SETTINGS[t]._value)}static resetAll(){for(let t in e._SETTINGS)e.reset(t)}static commitAll(){for(let t in e._SETTINGS)e.commit(t)}static cancelAll(){for(let t in e._SETTINGS)e.cancel(t)}static bundleHTML(){let t=document.createElement("div");for(let n in e._SETTINGS)t.appendChild(e._SETTINGS[n].getDOMElement());return t}static#t(t){return Array.isArray(t)&&(t=t.join(".")),t}}t.exports=e},70:(t,e,n)=>{const a=n(477);t.exports=class extends a{constructor(t,e){super(t,e)}_setInputElemValue(t){this._input.value=t}_getInputElemValue(){return this._input.value}_prepareInputElement(){this._input.id=this._name,this._input.disabled=this._disabledFn(a._SETTINGS),this._input.type="text",this._setInputElemValue(this._liveValue),this._input.addEventListener("input",(()=>{a.set(this._name,this._getInputElemValue())}))}}},46:(t,e,n)=>{const a=n(75),o=n(839);n(477),n(13),n(70),t.exports=new o("clean-publishing",((t,e,n)=>{GM_addStyle("\n\t\t.ui-publish-link {\n\t\t\tfloat: right;\n\t\t\tfont-size: 0.7em;\n\t\t\tmargin-top: 4px;\n\t\t\tmargin-right: 8px;\n\t\t}\n\n\t\t.ui-publish-copy {\n\t\t\tfloat: right; \n\t\t\tcursor: pointer;\n\t\t\topacity: 0;\n\t\t\ttransition: opacity 0.2s;\n\t\t}\n\n\t\tpre:hover .ui-publish-copy {\n\t\t\topacity: 0.6;\n\t\t}\n\t");const o=t=>([t=>t.replace(/<!--.*?-->/gs,""),t=>t.replace(/\*\[[^\n]+?\]: .+?\n/gs,"").replace(/\*\[[^\n]+?\]: [^\n]+$/gs,""),t=>t.replace(/:::.*?\n[\s\S]*?\n:::/gs,""),t=>t.replace(/:\S+:/g,""),t=>t.replace(/^---\n[\s\S]*?\n---/gs,""),t=>t.replace(/(?:<(?:[^>]+)>)/gi,""),t=>t.replace(/^\s+|\s+$/g,""),t=>t.replace(/\n\n+/g,"\n\n")].forEach((e=>{t=e(t)})),t);document.querySelectorAll(".ui-publish").forEach((e=>{const n={href:e.href,target:e.target,rel:e.rel};e.removeAttribute("href"),e.removeAttribute("target"),e.removeAttribute("rel"),e.classList.add("ui-publish"),e.title="Veröffentlichen",e.setAttribute("data-toggle","modal"),e.setAttribute("data-target","#pd-publish-modal"),e.innerHTML='<i class="fa fa-upload fa-fw"></i> Veröffentlichen';let s=document.createElement("h4");s.classList.add("modal-title"),s.innerText="Veröffentlichen";let r=document.createElement("a");r.classList.add("ui-publish-link"),r.href=n.href,r.target=n.target,r.rel=n.rel,r.innerText="Default HedgeDoc publishing",s.appendChild(r);let l=document.createElement("button");l.type="button",l.classList.add("btn","btn-default"),l.setAttribute("data-dismiss","modal"),l.innerText="Schließen";let i=document.createElement("a");i.classList.add("btn","btn-primary"),i.innerHTML='<i class="fa fa-download"></i> Download',i.download="protocol.md";let d,c=document.createElement("div"),m=document.createElement("pre"),p=document.createElement("i");p.classList.add("fa","fa-file-o","fa-fw","ui-publish-copy"),p.title="In Zwischenablage kopieren",p.addEventListener("click",(()=>{d&&clearTimeout(d),navigator.clipboard.writeText(o(t.getValue())),p.classList.remove("fa-file-o"),p.classList.add("fa-check"),d=setTimeout((()=>{p.classList.remove("fa-check"),p.classList.add("fa-file-o")}),1e3)})),m.appendChild(p);let u=document.createElement("code");const h=()=>{let e=o(t.getValue());u.innerText=e,i.href="data:text/plain;charset=utf-8,"+encodeURIComponent(e)};t.on("change",h),m.appendChild(u),c.appendChild(m);let f=a.addModal("pd-publish-modal",s,c,[l,i]);$(f).on("shown.bs.modal",h),document.body.appendChild(f)}))}),[]).setDescription("Modify the publish button to open a dialog with a cleaned version of the document because our protocol parser is not able to handle most of the HedgeDoc/ProtocolDroid features.")},779:(t,e,n)=>{n(75);const a=n(839),o=n(477),s=(n(13),n(70));t.exports=new a("codemirror-tweaks",((t,e,n)=>{const a="JetBrainsMonoRegular",s="JetBrainsMonoBold",r="JetBrainsMonoItalic",l="JetBrainsMonoBoldItalic",i="FiraCodeLight",d="FiraCodeRegular",c="FiraCodeMedium",m="FiraCodeSemiBold",p="FiraCodeBold";GM_addStyle(`\n\t\t\t@font-face {\n\t\t\t\tfont-family: 'JetBrains Mono';\n\t\t\t\tfont-style: normal;\n\t\t\t\tfont-weight: 400;\n\t\t\t\tfont-display: swap;\n\t\t\t\tsrc: local('JetBrains Mono'), \n\t\t\t\t\turl('${GM_getResourceURL(a)}') format('woff2');\n\t\t\t}\n\n\t\t\t@font-face {\n\t\t\t\tfont-family: 'JetBrains Mono';\n\t\t\t\tfont-style: normal;\n\t\t\t\tfont-weight: 700;\n\t\t\t\tfont-display: swap;\n\t\t\t\tsrc: local('JetBrains Mono'), \n\t\t\t\t\turl('${GM_getResourceURL(s)}') format('woff2');\n\t\t\t}\n\n\t\t\t@font-face {\n\t\t\t\tfont-family: 'JetBrains Mono';\n\t\t\t\tfont-style: italic;\n\t\t\t\tfont-weight: 400;\n\t\t\t\tfont-display: swap;\n\t\t\t\tsrc: local('JetBrains Mono'),\n\t\t\t\t\turl('${GM_getResourceURL(r)}') format('woff2');\n\t\t\t}\n\n\t\t\t@font-face {\n\t\t\t\tfont-family: 'JetBrains Mono';\n\t\t\t\tfont-style: italic;\n\t\t\t\tfont-weight: 700;\n\t\t\t\tfont-display: swap;\n\t\t\t\tsrc: local('JetBrains Mono'),\n\t\t\t\t\turl('${GM_getResourceURL(l)}') format('woff2');\n\t\t\t}\n\n\t\t\t@font-face {\n\t\t\tfont-family: 'Fira Code';\n\t\t\t\tsrc: local('Fira Code'), \n\t\t\t\t\turl('${GM_getResourceURL(i)}') format('woff2');\n\t\t\t\tfont-weight: 300;\n\t\t\t\tfont-style: normal;\n\t\t\t}\n\n\t\t\t@font-face {\n\t\t\t\tfont-family: 'Fira Code';\n\t\t\t\tsrc: local('Fira Code'), \n\t\t\t\t\turl('${GM_getResourceURL(d)}') format('woff2');\n\t\t\t\tfont-weight: 400;\n\t\t\t\tfont-style: normal;\n\t\t\t}\n\n\t\t\t@font-face {\n\t\t\t\tfont-family: 'Fira Code';\n\t\t\t\tsrc: local('Fira Code'), \n\t\t\t\t\turl('${GM_getResourceURL(c)}') format('woff2');\n\t\t\t\tfont-weight: 500;\n\t\t\t\tfont-style: normal;\n\t\t\t}\n\n\t\t\t@font-face {\n\t\t\t\tfont-family: 'Fira Code';\n\t\t\t\tsrc: local('Fira Code'), \n\t\t\t\t\turl('${GM_getResourceURL(m)}') format('woff2');\n\t\t\t\tfont-weight: 600;\n\t\t\t\tfont-style: normal;\n\t\t\t}\n\n\t\t\t@font-face {\n\t\t\t\tfont-family: 'Fira Code';\n\t\t\t\tsrc: local('Fira Code'), \n\t\t\t\t\turl('${GM_getResourceURL(p)}') format('woff2');\n\t\t\t\tfont-weight: 700;\n\t\t\t\tfont-style: normal;\n\t\t\t}\n\n\t\t\t/* Custom font for CodeMirror */\n\t\t\t.CodeMirror {\n\t\t\t\tfont-family: ${o.get([n,"custom-font"]).value} !important;\n\t\t\t}\n\t\t`),console.log(GM_getResourceURL(a))}),[new s("custom-font",'"JetBrains Mono", "Fira Code", "Source Code Pro", "Courier New", "Consolas", monospace')]).setDescription("Small tweaks for CodeMirror")},726:(t,e,n)=>{n(75);const a=n(839),o=n(477),s=(n(13),n(70));t.exports=new a("custom-logo-overlay",((t,e,n)=>{GM_addStyle("\n\t\t\t.custom-logo-overlay {\n\t\t\t\ttransform: translateY(-100%);\n\t\t\t}\n\t\t");let a=document.createElement("img");a.classList.add("h-100","custom-logo-overlay","no-night"),a.src=o.get([n,"url-no-night"]).value,document.querySelector(".header-brand").append(a);let s=document.createElement("img");s.classList.add("h-100","custom-logo-overlay","night"),s.src=o.get([n,"url-night"]).value,document.querySelector(".header-brand").append(s)}),[new s("url-no-night","https://protocoldroid.yorik.dev/shades-no-night.svg"),new s("url-night","https://protocoldroid.yorik.dev/shades-night.svg")],!0).setDescription("Add a custom logo overlay")},91:(t,e,n)=>{n(75);const a=n(839);n(477),n(13),n(70),t.exports=new a("drag-n-drop-email",((t,e,n)=>{const a=t=>new Promise(((e,n)=>{let a=new FileReader;a.addEventListener("load",(()=>{let[t,n]=a.result.split(/\r\n\r\n/);t=t.replaceAll(/\r\n\s+/g," ");let o=t.split("\r\n"),s={};for(let t=0;t<o.length;t++){let e=o[t].trim(),[n,a]=e.split(/\:(.*)/s).map((t=>t.trim()));n&&(s[n]=a)}let r=new Date(s.Date).toISOString().slice(0,10),l=(t=>{let e="";for(let n=0;n<t.length;n++){let a=t[n];if("="===a){let a,[o,s,r]=t.slice(n+2).split("?",3),l=o.length+s.length+r.length+5,i=new TextDecoder(o);switch(s.toUpperCase()){case"B":let t=atob(r);a=new Uint8Array(t.length);for(let e=0;e<t.length;e++)a[e]=t.charCodeAt(e);break;case"Q":a=new Uint8Array(r.length-2*(r.split("=").length-1));let e=0;for(let t=0;t<r.length;t++){let n=r.charCodeAt(t);switch(n){case 95:a[t-e]=32;break;case 61:a[t-e]=parseInt(r.slice(t+1,t+3),16),t+=2,e+=2;break;default:a[t-e]=n}}}e+=i.decode(a),n+=l}else e+=a}return e})(s.Subject);e(`- \`${r}\`: ${l}\n`)}),!1),a.readAsText(t)}));t.on("drop",((t,e)=>{for(let n of e.dataTransfer.files)"message/rfc822"===n.type&&(e.preventDefault(),a(n).then((n=>{let a=cloneInto({left:e.x,top:e.y},window,{cloneFunctions:!1});t.replaceRange(n,t.coordsChar(a,"window"))})))}))}),[]).setDescription("Drag and drop emails into the editor")},451:(t,e,n)=>{n(75);const a=n(839),o=n(477),s=n(13);n(70),t.exports=new a("internal-spoiler",((t,e,n)=>{o.get([n,"blur"]).value?GM_addStyle("\n\t\t\t\t.spoiler:not(:hover):not([data-open]) {\n\t\t\t\t\tfilter: blur(5px);\n\t\t\t\t}\n\n\t\t\t\t.spoiler::marker {\n\t\t\t\t\tfilter: blur(0px);\n\t\t\t\t}\n\t\t\t"):GM_addStyle("\n\t\t\t\t.spoiler {\n\t\t\t\t\tbackground-color: black;\n\t\t\t\t\ttransition: background-color 0.5s;\n\t\t\t\t}\n\n\t\t\t\t.spoiler:not(:hover):not([data-open]), \n\t\t\t\t.spoiler:not(:hover):not([data-open]) * {\n\t\t\t\t\tcolor: transparent !important;\n\t\t\t\t}\n\n\t\t\t\t.spoiler:hover, .spoiler[data-open] {\n\t\t\t\t\tbackground-color: lightgray !important;\n\t\t\t\t}\n\n\t\t\t\t.spoiler::marker {\n\t\t\t\t\tcolor: #333 !important;\n\t\t\t\t}\n\n\t\t\t\t.night .spoiler, .night .spoiler[data-open] {\n\t\t\t\t\tbackground-color: black;\n\t\t\t\t\ttransition: color 0.5s;\n\t\t\t\t}\n\n\t\t\t\t.night .spoiler:not(:hover), .night .spoiler:not(:hover) *,\n\t\t\t\t.night .spoiler[data-open], .night .spoiler[data-open] * {\n\t\t\t\t\tcolor: transparent !important;\n\t\t\t\t}\n\n\t\t\t\t.night .spoiler:hover,\n\t\t\t\t.night .spoiler[data-open] {\n\t\t\t\t\tbackground-color: black !important;\n\t\t\t\t}\n\n\t\t\t\t.night .spoiler::marker {\n\t\t\t\t\tcolor: #ededed !important;\n\t\t\t\t}\n\n\t\t\t\t@media print {\n\t\t\t\t\t.spoiler * {\n\t\t\t\t\t\tcolor: black !important;\n\t\t\t\t\t\tbackground-color: lightgray !important;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t");const a=e.renderer.rules.list_item_open||((t,e,n,a,o)=>o.renderToken(t,e,n)),s=/^\[(?:intern(?:al)?|spoiler)\]\s*(\S.*)$/i;e.renderer.rules.list_item_open=(t,e,n,o,r)=>{if(t[e+1]&&"paragraph_open"===t[e+1].type&&t[e+2]&&"inline"===t[e+2].type){let n=t[e],a=t[e+2],o=a.content.match(s);o&&(console.log(t[e-1]),a.content=o[1],n.attrPush(["class","spoiler"]))}return a(t,e,n,o,r)},document.addEventListener("click",(t=>{const e=t.target.closest(".spoiler");e&&(e.hasAttribute("data-open")?e.removeAttribute("data-open"):e.setAttribute("data-open",""))}))}),[new s("blur","Blur Spoilers",!1)]).setDescription("Highlight TODO notes in the editor")},65:(t,e,n)=>{n(75);const a=n(839),o=n(477),s=n(13);n(70),t.exports=new a("markdownit-tweaks",((t,e,n)=>{o.get([n,"german-quotes"])&&(e.options.quotes="„“‚‘")}),[new s("german-quotes",!0)]).setDescription("Small tweaks for MarkdownIt")},323:(t,e,n)=>{n(75);const a=n(839);n(477),n(13),n(70),t.exports=new a("pride-logo",((t,e,n)=>{Array.from(document.querySelectorAll(".navbar-brand img.no-night"));const a=Array.from(document.querySelectorAll(".navbar-brand img.night"));GM_addStyle(`\n\t\t\t/* make the Logo rainbow colored */\n\t\t\t.header-brand {\n\t\t\t\tbackground-image: linear-gradient(\n                    #fe0000 24.7%,\n                    #fd8c00 24.7%, 37.35%,\n                    #ffd000 37.35%, 50%,\n                    #119f0b 50%, 62.65%,\n                    #457cdf 62.65%, 75.3%,\n                    #c22edc 75.3%\n                );\n\t\t\t\tmask: ${a.map((t=>`url(${t.src}) center/contain no-repeat`)).join(", ")};\n\t\t\t\tmask-origin: content-box;\n\t\t\t\tmask-mode: luminance, alpha;\n\t\t\t\tmask-composite: exclude;\n\t\t\t}\n\n\t\t\t.header-brand img {\n\t\t\t\tvisibility: hidden;\n\t\t\t}\n\n\t\t\tbody:not(.night) .header-brand {\n\t\t\t\tfilter: brightness(0.8) contrast(1.5);\n\t\t\t}\n\n\t\t\tbody.night .header-brand {\n\t\t\t\tfilter: saturate(2);\n\t\t\t}\n\t\t`)}),[],!0).setDescription('"Prideify" the logo')},628:(t,e,n)=>{n(75);const a=n(839),o=n(477),s=n(13);n(70),t.exports=new a("print-style",((t,e,n)=>{GM_addStyle('\n\t\t@media print {\n\t\t\tabbr[title] {\n\t\t\t\ttext-decoration: none;\n\t\t\t}\n\t\t\tabbr[title]::after {\n\t\t\t\tfont-size: 12px !important;\n\t\t\t}\n\t\t\t.markdown-body h1 {\n\t\t\t\tfont-size: 1.5em;\n\t\t\t}\n\t\t\t\n\t\t\t.markdown-body h2 {\n\t\t\t\tfont-size: 1.25em;\n\t\t\t\tmargin-bottom: 0;\n\t\t\t\tmargin-top: 12px;\n\t\t\t}\n\t\t\t\n\t\t\t:is(h1, h2, h3, h4) + :is(h1, h2, h3, h4) {\n\t\t\t\tmargin-top: 0 !important;\n\t\t\t\tpadding-top: 0 !important;\n\t\t\t}\n\t\t\t\n\t\t\t:is(h1, h2, h3, h4):has(+ :is(h1, h2, h3, h4)) {\n\t\t\t\tmargin-bottom: 0 !important;\n\t\t\t}\n\t\t\t\n\t\t\t:is(h1, h2, h3, h4) + :is(h1, h2, h3, h4)::before {\n\t\t\t\tdisplay: none !important;\n\t\t\t}\n\t\t\t\n\t\t\timg {\n\t\t\t\tmax-width: 15em !important;\n\t\t\t}\n\t\t\t\n\t\t\tabbr[title="Tagesordnungspunkt"]::after {\n\t\t\t\tdisplay: none;\n\t\t\t}\n\t\t\t\n\t\t\t.markdown-body {\n\t\t\t\tfont-size: 10pt;\n\t\t\t\tline-height: 1.125;\n\t\t\t}\n\t\t\t\n\t\t\t.markdown-body blockquote {\n\t\t\t\tfont-size: 10.5pt;\n\t\t\t\tmargin-bottom: 4px;\n\t\t\t}\n\t\t\t  \n\t\t\t.markdown-body li > p {\n\t\t\t\tmargin-top: inherit;\n\t\t\t\tmargin-bottom: inherit;\n\t\t\t}\n\t\t\t\n\t\t\th1, h2,\n\t\t\th2 + ul {\n\t\t\t\tpage-break-before: auto;\n\t\t\t\tbreak-before: auto;\n\t\t\t\tpage-break-after: avoid;\n\t\t\t\tbreak-before: avoid;\n\t\t\t}\n\t\t}\n\t'),o.get([n,"save-trees"]).value&&GM_addStyle("\n\t\t\t@media print {\n\t\t\t\t.markdown-body ul ul,\n\t\t\t\t.markdown-body ol ol {\n\t\t\t\t\tmargin-left: 1em;\n\t\t\t\t}\n\t\t\t}\n\t\t")}),[new s("save-trees",!0)]).setDescription("Add a print style")},391:(t,e,n)=>{const a=n(75),o=n(839),s=n(477),r=(n(13),n(70));t.exports=new o("todo-notes",((t,e,n)=>{GM_addStyle(`\n\t\t.todo-note {\n\t\t\tcolor: ${s.get([n,"default-color"]).value};\n\t\t}\n\n\t\t.todo-text::before {\n\t\t\tcontent: 'TODO: ';\n\t\t\tfont-weight: bold;\n\t\t}\n\n\t\t.todo-text.empty::before {\n\t\t\tcontent: 'TODO';\n\t\t}\n\n\t\t@media print {\n\t\t\t.todo-note {\n\t\t\t\tdisplay: none !important;\n\t\t\t}\n\t\t}\n\t`);const o=(t,e,n,a,o)=>o.renderToken(t,e,n),r=e.renderer.rules.html_block||o,l=e.renderer.rules.html_inline||o,i=/<!--\s*(?:\[TODO\]|TODO):?\s*((?:[^-\s]|-[^-\n]|--[^>\n])(?:[^-\n]|-[^-\n]|--[^>\n])*(?:[^-\s]|-[^-\s]|--[^>\s]) | (?:[^-\s]|-[^-\n]|--[^>\n]))?\s*-->/i;e.renderer.rules.html_block=(t,n,a,o,s)=>{let l=t[n].content;if(l.search(i)<0)return r(t,n,a,o,s);let d="",c=l.search(i);for(;c>=0;){let t=l.match(i);d+=l.slice(0,c),t[1]?d+=`<span class="todo-note"><span class="todo-icon fa fa-sticky-note fa-fw"></span><span class="todo-text">${e.utils.escapeHtml(t[1].trim())}</span></span>`:d+='<span class="todo-note"><span class="todo-icon fa fa-sticky-note fa-fw"></span><span class="todo-text empty"></span></span>',l=l.slice(c+t[0].length),c=l.search(i)}return d+=l,t[n].content=`<p class="part" data-startline="${t[n].map[0]+1}" data-endline="${t[n].map[1]}">${d}</p>`,r(t,n,a,o,s)},e.renderer.rules.html_inline=(t,n,a,o,s)=>{const r=t[n].content.match(i);return r?r[1]?`<span class="todo-note"><span class="todo-icon fa fa-sticky-note fa-fw"></span><span class="todo-text">${e.utils.escapeHtml(r[1].trim())}</span></span>`:'<span class="todo-note"><span class="todo-icon fa fa-sticky-note fa-fw"></span><span class="todo-text empty"></span></span>':l(t,n,a,o,s)};let d=document.createElement("a");d.classList.add("btn","btn-sm","text-uppercase"),d.id="makeTodo",d.innerHTML='<i class="fa fa-sticky-note fa-fw"></i>',d.title="Add TODO note",d.role="button",d.setAttribute("data-toggle","dropdown"),d.setAttribute("aria-haspopup","true"),d.setAttribute("aria-expanded","true"),d.addEventListener("click",(()=>{const e=t.getCursor();cursorInHTMLComment(t,e)?(t.replaceRange("--\x3e\x3c!-- TODO:  --\x3e\x3c!--",e,e),t.setCursor(e.line,e.ch+14)):(t.replaceRange("\x3c!-- TODO:  --\x3e",e,e),t.setCursor(e.line,e.ch+11)),t.focus()})),a.getByQuery(".toolbar .btn-group").then((t=>t.appendChild(d)))}),[new r("default-color","#eda35e").setValidateFn((t=>null!==t.match(/^\#[a-f\d]{3}(?:[a-f\d]{3})?$/gi)))]).setDescription("Highlight TODO notes in the editor")},2:(t,e,n)=>{const a=n(75),o=n(839),s=n(477),r=n(13);n(70),t.exports=new o("visible-comments",((t,e,n)=>{GM_addStyle('\n\t\t.comment {\n\t\t\tuser-select: none;\n\t\t\tfilter: opacity(0.5);\n\t\t\tdisplay: inline;\n\t\t}\n\n\t\t.comment::before,\n\t\t.comment::after {\n\t\t\twhite-space: nowrap;\n\t\t}\n\n\t\t.comment-block {\n\t\t\tdisplay: block;\n\t\t}\n\n\t\t.comment[data-opened="true"] {\n\t\t\tuser-select: auto;\n\t\t}\n\n\t\t.comment[data-opened="true"]::before {\n\t\t\tcontent: \'\x3c!-- \';\n\t\t}\n\n\t\t.comment[data-opened="true"]::after {\n\t\t\tcontent: \' --\x3e\';\n\t\t}\n\n\t\t.comment *:not(.comment-icon) {\n\t\t\tdisplay: none;\n\t\t}\n\n\t\t.comment[data-opened="true"] *:not(.comment-icon) {\n\t\t\tdisplay: initial;\n\t\t}\n\n\t\t.comment[data-opened="true"] .comment-icon {\n\t\t\tdisplay: none;\n\t\t}\n\n\t\t.comment .comment-author {\n\t\t\tfont-style: italic;\n\t\t}\n\n\t\t.comment .comment-author::before {\n\t\t\tcontent: "~";\n\t\t}\n\n\t\t.comment .comment-content::after {\n\t\t\tcontent: " ";\n\t\t}\n\n\t\t@media print {\n\t\t\t.comment {\n\t\t\t\tdisplay: none !important;\n\t\t\t}\n\t\t}\n\t'),s.get([n,"hover-opens-comments"]).value&&GM_addStyle("\n\t\t\n\t\t\t@media (hover: hover) {\n\t\t\t\t.comment:hover {\n\t\t\t\t\tuser-select: auto;\n\t\t\t\t}\n\n\t\t\t\t.comment:hover::before {\n\t\t\t\t\tcontent: '\x3c!-- ';\n\t\t\t\t}\n\n\t\t\t\t.comment:hover::after {\n\t\t\t\t\tcontent: ' --\x3e';\n\t\t\t\t}\n\n\t\t\t\t.comment:hover *:not(.comment-icon) {\n\t\t\t\t\tdisplay: initial;\n\t\t\t\t}\n\n\t\t\t\t.comment:hover .comment-icon {\n\t\t\t\t\tdisplay: none;\n\t\t\t\t}\n\t\t\t}\n\t\t");const o=(t,e,n,a,o)=>o.renderToken(t,e,n),r=e.renderer.rules.html_block||o,l=e.renderer.rules.html_inline||o,i=/<!--\s*((?:[^-\s]|-[^-]|--[^>])(?:[^-]|-[^-]|--[^>])*)\s+~\s*((?:[^~-\s\n]|-[^-\n]|--[^>\n])(?:[^-\n]|-[^-\n]|--[^>\n])*)\s*-->/;e.renderer.rules.html_block=(t,a,o,l,d)=>{let c=t[a].content;if(c.search(i)<0)return r(t,a,o,l,d);let m="",p=c.search(i);for(;p>=0;){let t=c.match(i);m+=c.slice(0,p),m+=`<span class="comment" data-opened="${s.get([n,"comment-opened-default"]).value}"><span class="comment-icon fa fa-comment fa-fw"></span><span class="comment-content">${e.utils.escapeHtml(t[1].trim())}</span><span class="comment-author">${e.utils.escapeHtml(t[2].trim())}</span></span>`,c=c.slice(p+t[0].length),p=c.search(i)}return m+=c,t[a].content=`<p class="part" data-startline="${t[a].map[0]+1}" data-endline="${t[a].map[1]}">${m}</p>`,r(t,a,o,l,d)},e.renderer.rules.html_inline=(t,a,o,r,d)=>{const c=t[a].content.match(i);return c?`<span class="comment" data-opened="${s.get([n,"comment-opened-default"]).value}"><span class="comment-icon fa fa-comment fa-fw"></span><span class="comment-content">${e.utils.escapeHtml(c[1].trim())}</span><span class="comment-author">${e.utils.escapeHtml(c[2].trim())}</span></span>`:l(t,a,o,r,d)},s.get([n,"original-comment-button"]).value||a.getByQuery("#makeComment").then((e=>{$("#makeComment").off("click"),e.addEventListener("click",(()=>{const e=document.querySelector(".ui-user-item").querySelector(".ui-user-name").innerText.split(" ",1)[0],n=t.getCursor();cursorInHTMLComment(t,n)?(t.replaceRange(`--\x3e\x3c!--  ~${e} --\x3e\x3c!--`,n,n),t.setCursor(n.line,n.ch+8)):(t.replaceRange(`\x3c!--  ~${e} --\x3e`,n,n),t.setCursor(n.line,n.ch+5)),t.focus()}))})),document.addEventListener("click",(t=>{let e=t.target;for(;e;)e.classList.contains("comment")&&(e.dataset.opened="true"===e.dataset.opened?"false":"true"),e=e.parentElement}))}),[new r("original-comment-button",!1),new r("comment-opened-default",!1),new r("hover-opens-comments",!0)]).setDescription("Make comments visible in the editor")}},e={};function n(a){var o=e[a];if(void 0!==o)return o.exports;var s=e[a]={exports:{}};return t[a](s,s.exports,n),s.exports}(()=>{const t=n(75),e=n(839),a=n(46),o=n(726),s=n(91),r=n(451),l=n(65),i=n(323),d=n(628),c=n(391),m=n(2),p=n(779);!function(){"use strict";a.register(),p.register(),o.register(1),s.register(),r.register(),l.register(),i.register(),d.register(),c.register(),m.register(1),t.addSettingMenu(),t.getCodeMirror().then((n=>t.getMardownIt().then((t=>e.loadAll(n,t)))))}()})()})();