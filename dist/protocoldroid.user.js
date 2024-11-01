// ==UserScript==
// @name        ProtocolDroid
// @description A client side HedgeDoc extension that helps with protocols.
// @version     0.4.7
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

(()=>{var t={13:(t,e,n)=>{const a=n(477);t.exports=class extends a{constructor(t,e){super(t,e)}_setInputElemValue(t){this._input.checked=t}_getInputElemValue(){return this._input.checked}_prepareInputElement(){this._input.id=this._name,this._input.disabled=this._disabledFn(a._SETTINGS),this._input.type="checkbox",this._setInputElemValue(this._liveValue),this._input.addEventListener("input",(()=>{a.set(this._name,this._getInputElemValue())}))}}},676:(t,e,n)=>{const a=n(70);t.exports=class extends a{constructor(t,e){super(t,e),this._validateFn=t=>null!==t.match(/^\#[a-f\d]{3}(?:[a-f\d]{3})?$/gi)}_prepareInputElement(){const t=document.createElement("div");t.style.backgroundColor=this._liveValue,t.style.width="1em",t.style.height="1em",t.style.display="inline-block",t.style.marginRight="0.5em",t.style.border="1px solid black",t.style.borderRadius="0.25em",t.style.verticalAlign="middle",super._prepareInputElement(),document.addEventListener("protocolDroidReady",(()=>{this._input.before(t)})),this._input.addEventListener("input",(()=>{t.style.backgroundColor=this._getInputElemValue()}))}static toHex(t,e,n){return`#${t.toString(16).padStart(2,"0")}${e.toString(16).padStart(2,"0")}${n.toString(16).padStart(2,"0")}`}static toRGB(t){t.length<6&&(t=(t=t.replace(/^#/,""))[0]+t[0]+t[1]+t[1]+t[2]+t[2]);const e=t.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);return e?[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]:null}}},839:(t,e,n)=>{const a=n(477),o=n(13);class r{static _precedences=[];static _features=[];constructor(t,e,n=[],a=!0){if(!t.match(/^[a-z][a-z0-9]*(?:\-[a-z0-9]+)+$/i))throw new Error("Feature names must only contain letters, numbers and hyphens. They must start with a letter, have at least one hyphen and may not end with a hyphen.");this.name=t,this.code=e,this.options=n,this.enabledByDefault=a,this.description=""}register(t=0){return a.add(new o(["features",this.name],this.enabledByDefault)),this.options.forEach((t=>a.add(t.toNamespace(this.name).setDisabledFn((()=>!a.get(["features",this.name]).liveValue))))),r.add(this,t)}load(t,e,n,o){a.get(["features",this.name]).value&&(this.code(t,e,n,[this.name]),document.dispatchEvent(new CustomEvent("protocolDroidFeatureLoaded",{detail:this})))}setDescription(t){return this.description=t,this}static add(t,e=0){return e in r._features||(r._precedences.push(e),r._features[e]=[]),r._features[e].push(t),!0}static loadAll(t,e,n){r._precedences.sort();for(let a=r._precedences.length-1;a>=0;a--)r._features[r._precedences[a]].forEach((a=>a.load(t,e,n,"")))}}t.exports=r},75:(t,e,n)=>{const a=n(477);n(13),n(70),n(839);class o{static getByQuery=t=>"[object Array]"===Object.prototype.toString.call(t)?Promise.all(t.map((t=>o.getByQuery(t)))):new Promise(((e,n)=>{const a=setInterval((()=>{const n=document.querySelector(t);n&&(clearInterval(a),e(n))}),100)}));static getJQuery=()=>new Promise(((t,e)=>{const n=setInterval((()=>{unsafeWindow.$&&(clearInterval(n),t(unsafeWindow.$))}),100)}));static getCodeMirror=()=>new Promise(((t,e)=>{const n=setInterval((()=>{unsafeWindow.editor&&(clearInterval(n),t(unsafeWindow.editor))}),100)}));static getMardownIt=()=>new Promise(((t,e)=>{const n=setInterval((()=>{unsafeWindow.md&&(clearInterval(n),t(unsafeWindow.md))}),100)}));static addModal=(t,e,n,a)=>{let o=document.createElement("div");o.classList.add("modal","fade"),o.id=t,o.tabIndex=-1,o.role="dialog",o.setAttribute("aria-labelledby",t+"-label"),o.setAttribute("aria-hidden","true");let r=document.createElement("div");r.classList.add("modal-dialog","modal-lg"),r.role="document";let s=document.createElement("div");s.classList.add("modal-content");let i=document.createElement("div");i.classList.add("modal-header");let l=document.createElement("button");if(l.type="button",l.classList.add("close"),l.setAttribute("data-dismiss","modal"),l.setAttribute("aria-label","Close"),l.innerHTML='<span aria-hidden="true">&times;</span>',i.appendChild(l),e instanceof HTMLElement)e.classList.contains("modal-header")?i=e:(e.classList.add("modal-title"),e.id=t+"-label",i.appendChild(e));else{let n=document.createElement("h4");n.classList.add("modal-title"),n.id=t+"-label",n.innerText=e,i.appendChild(n)}if(s.appendChild(i),n instanceof HTMLElement)n.classList.add("modal-body"),s.appendChild(n);else{let t=document.createElement("div");t.classList.add("modal-body"),t.innerHTML=n,s.appendChild(t)}if(a instanceof HTMLElement)a.classList.add("modal-footer"),s.appendChild(a);else{let t=document.createElement("div");t.classList.add("modal-footer"),a.forEach((e=>t.appendChild(e))),s.appendChild(t)}return r.appendChild(s),o.appendChild(r),o};static addSettingMenu=()=>{console.log("Adding settings menu"),GM_addStyle("\n\t\t\t#short-online-user-list {\n\t\t\t\tline-height: 1;\n\t\t\t}\n\t\t\t@media (max-width: 821px) {\n\t\t\t\t.navbar-collapse.collapse {\n\t\t\t\t\tdisplay: none !important;\n\t\t\t\t}\n\t\t\t\t.visible-xs {\n\t\t\t\t\tdisplay: block !important;\n\t\t\t\t}\n\t\t\t\t.navbar-header {\n\t\t\t\t\tfloat: none;\n\t\t\t\t}\n\t\t\t}\n\t\t");let t=a.bundleHTML(),e=document.createElement("div");e.innerHTML="<em>WORK IN PROGRESS</em><hr>",t.prepend(e);let n=document.createElement("button");n.type="button",n.classList.add("btn","btn-default"),n.setAttribute("data-dismiss","modal"),n.innerText="Abbrechen",n.addEventListener("click",(()=>{a.cancelAll()}));let r=document.createElement("button");r.type="button",r.classList.add("btn","btn-danger"),r.innerText="Zurücksetzen",r.addEventListener("click",(()=>{a.resetAll()}));let s=document.createElement("button");s.type="button",s.classList.add("btn","btn-primary"),s.innerText="Speichern",s.addEventListener("click",(()=>{a.commitAll(),window.location.reload()}));let i=o.addModal("pd-settings-modal","Einstellungen",t,[n,r,s]);document.body.appendChild(i);let l=document.createElement("ul");l.classList.add("nav","navbar-nav","navbar-form","navbar-right"),l.style="padding: 0;",l.innerHTML='<span class="btn btn-link ui-settings" title="Einstellungen" data-toggle="modal" data-target="#pd-settings-modal"><i class="fa fa-gears"></i></span>';let d=document.createElement("div");d.classList.add("nav-mobile","pull-right","visible-xs"),d.innerHTML='<a class="btn btn-link ui-settings" title="Einstellungen" data-toggle="modal" data-target="#pd-settings-modal"><i class="fa fa-gears"></i></a>',o.getByQuery(".nav.navbar-nav.navbar-right").then((t=>t.after(l))),o.getByQuery(".nav-mobile.pull-right.visible-xs").then((t=>t.before(d)))};static cursorInHTMLComment=(t,e)=>{const n=e.line;let a,o,r,s=n+1;for(;s>0;){if(s--,a=t.getLine(s),s===n&&(a=a.slice(0,e.ch)),o=a.lastIndexOf("\x3c!--"),r=a.lastIndexOf("--\x3e"),o>=0&&r>=0)return o>r;if(o>=0)return!0;if(r>=0)return!1}};static ready=()=>{o.redraw(),document.dispatchEvent(new CustomEvent("protocolDroidReady"))};static redraw=()=>{o.getByQuery([".active input","#view-mode-toggle-view","#view-mode-toggle-both"]).then((([t,e,n])=>{e.click(),n.click(),t.click()}))}}t.exports=o},477:t=>{class e{static _SETTINGS={};_name;_defaultValue;_value;_liveValue;_input=document.createElement("input");_disabledFn=()=>!1;_validateFn=()=>!0;constructor(t,n){if(this.constructor===e)throw new TypeError("Cannot create instance of abstract class Setting");this._name=e.#t(t),this._defaultValue=n,this._value=GM_getValue(this._name.replace(".","_"),this._defaultValue),this._liveValue=this._value}setDisabledFn(t){return this._disabledFn=t,this}setValidateFn(t){return this._validateFn=t,this}toNamespace(t){return t=e.#t(t),this._name=e.#t([t,this._name]),this._value=GM_getValue(this._name.replace(".","_"),this._defaultValue),this._liveValue=this._value,this}_setInputElemValue(t){this._input.value=t}_getInputElemValue(){return this._input.value}_setInputElemValid(t){this._input.classList.toggle("is-invalid",!t)}_prepareInputElement(){this._input.id=this._name,this._input.disabled=this._disabledFn(e._SETTINGS),this._setInputElemValue(this._liveValue),this._input.addEventListener("input",(()=>{e.set(this._name,this._getInputElemValue())}))}getDOMElement(){let t=document.createElement("label");t.htmlFor=this._name,t.innerText=this._name,this._prepareInputElement(),this._input.addEventListener("input",(()=>{for(let t in e._SETTINGS)e._SETTINGS[t]._input.disabled=e._SETTINGS[t]._disabledFn(e._SETTINGS)}));let n=document.createElement("div");return n.appendChild(t),n.appendChild(this._input),n}static add(t){e._SETTINGS[t._name]=t}static get(t){return t=e.#t(t),{value:e._SETTINGS[t]._value,defaultValue:e._SETTINGS[t]._defaultValue,liveValue:e._SETTINGS[t]._liveValue}}static set(t,n){if(t=e.#t(t),e._SETTINGS[t]._disabledFn(e._SETTINGS))return;let a=e._SETTINGS[t]._validateFn(n);e._SETTINGS[t]._setInputElemValid(a),a&&(e._SETTINGS[t]._liveValue=n,e._SETTINGS[t]._getInputElemValue()!==n&&e._SETTINGS[t]._setInputElemValue(n))}static reset(t){t=e.#t(t),e.set(t,e.get(t).defaultValue)}static cancel(t){t=e.#t(t),e._SETTINGS[t]._liveValue=e._SETTINGS[t]._value,e._SETTINGS[t]._setInputElemValue(e._SETTINGS[t]._value)}static commit(t){t=e.#t(t),e._SETTINGS[t]._value=e._SETTINGS[t]._liveValue,GM_setValue(t.replace(".","_"),e._SETTINGS[t]._value)}static resetAll(){for(let t in e._SETTINGS)e.reset(t)}static commitAll(){for(let t in e._SETTINGS)e.commit(t)}static cancelAll(){for(let t in e._SETTINGS)e.cancel(t)}static bundleHTML(){let t=document.createElement("div");for(let n in e._SETTINGS)t.appendChild(e._SETTINGS[n].getDOMElement());return t}static#t(t){return Array.isArray(t)&&(t=t.join(".")),t}}t.exports=e},70:(t,e,n)=>{const a=n(477);t.exports=class extends a{constructor(t,e){super(t,e)}_setInputElemValue(t){this._input.value=t}_getInputElemValue(){return this._input.value}_prepareInputElement(){this._input.id=this._name,this._input.disabled=this._disabledFn(a._SETTINGS),this._input.type="text",this._setInputElemValue(this._liveValue),this._input.addEventListener("input",(()=>{a.set(this._name,this._getInputElemValue())}))}}},46:(t,e,n)=>{const a=n(75),o=n(839);n(477),n(13),n(70),t.exports=new o("clean-publishing",((t,e,n,o)=>{GM_addStyle("\n\t\t.ui-publish-link {\n\t\t\tfloat: right;\n\t\t\tfont-size: 0.7em;\n\t\t\tmargin-top: 4px;\n\t\t\tmargin-right: 8px;\n\t\t}\n\n\t\t.ui-publish-copy {\n\t\t\tfloat: right; \n\t\t\tcursor: pointer;\n\t\t\topacity: 0;\n\t\t\ttransition: opacity 0.2s;\n\t\t}\n\n\t\tpre:hover .ui-publish-copy {\n\t\t\topacity: 0.6;\n\t\t}\n\t");const r=t=>([t=>t.replace(/<!--.*?-->/gs,""),t=>t.replace(/\*\[[^\n]+?\]: .+?\n/gs,"").replace(/\*\[[^\n]+?\]: [^\n]+$/gs,""),t=>t.replace(/:::.*?\n[\s\S]*?\n:::/gs,""),t=>t.replace(/:\S+:/g,""),t=>t.replace(/^---\n[\s\S]*?\n---/gs,""),t=>t.replace(/(?:<(?:[^>]+)>)/gi,""),t=>t.replace(/^\s+|\s+$/g,""),t=>t.replace(/\n\n+/g,"\n\n")].forEach((e=>{t=e(t)})),t);document.querySelectorAll(".ui-publish").forEach((t=>{const n={href:t.href,target:t.target,rel:t.rel};t.removeAttribute("href"),t.removeAttribute("target"),t.removeAttribute("rel"),t.classList.add("ui-publish"),t.title="Veröffentlichen",t.setAttribute("data-toggle","modal"),t.setAttribute("data-target","#pd-publish-modal"),t.innerHTML='<i class="fa fa-upload fa-fw"></i> Veröffentlichen';let o=document.createElement("h4");o.classList.add("modal-title"),o.innerText="Veröffentlichen";let s=document.createElement("a");s.classList.add("ui-publish-link"),s.href=n.href,s.target=n.target,s.rel=n.rel,s.innerText="Default HedgeDoc publishing",o.appendChild(s);let i=document.createElement("button");i.type="button",i.classList.add("btn","btn-default"),i.setAttribute("data-dismiss","modal"),i.innerText="Schließen";let l=document.createElement("a");l.classList.add("btn","btn-primary"),l.innerHTML='<i class="fa fa-download"></i> Download',l.download="protocol.md";let d,c=document.createElement("div"),m=document.createElement("pre"),u=document.createElement("i");u.classList.add("fa","fa-file-o","fa-fw","ui-publish-copy"),u.title="In Zwischenablage kopieren",u.addEventListener("click",(()=>{d&&clearTimeout(d),navigator.clipboard.writeText(r(e.getValue())),u.classList.remove("fa-file-o"),u.classList.add("fa-check"),d=setTimeout((()=>{u.classList.remove("fa-check"),u.classList.add("fa-file-o")}),1e3)})),m.appendChild(u);let p=document.createElement("code");const h=()=>{let t=r(e.getValue());p.innerText=t,l.href="data:text/plain;charset=utf-8,"+encodeURIComponent(t)};e.on("change",h),m.appendChild(p),c.appendChild(m);let f=a.addModal("pd-publish-modal",o,c,[i,l]);$(f).on("shown.bs.modal",h),document.body.appendChild(f)}))}),[]).setDescription("Modify the publish button to open a dialog with a cleaned version of the document because our protocol parser is not able to handle most of the HedgeDoc/ProtocolDroid features.")},779:(t,e,n)=>{n(75);const a=n(839),o=n(477),r=(n(13),n(70));t.exports=new a("codemirror-tweaks",((t,e,n,a)=>{const r="JetBrainsMonoBold",s="JetBrainsMonoItalic",i="JetBrainsMonoBoldItalic",l="FiraCodeLight",d="FiraCodeRegular",c="FiraCodeMedium",m="FiraCodeSemiBold",u="FiraCodeBold";GM_addStyle(`\n\t\t\t@font-face {\n\t\t\t\tfont-family: 'JetBrains Mono';\n\t\t\t\tfont-style: normal;\n\t\t\t\tfont-weight: 400;\n\t\t\t\tfont-display: swap;\n\t\t\t\tsrc: local('JetBrains Mono'), \n\t\t\t\t\turl('${GM_getResourceURL("JetBrainsMonoRegular")}') format('woff2');\n\t\t\t}\n\n\t\t\t@font-face {\n\t\t\t\tfont-family: 'JetBrains Mono';\n\t\t\t\tfont-style: normal;\n\t\t\t\tfont-weight: 700;\n\t\t\t\tfont-display: swap;\n\t\t\t\tsrc: local('JetBrains Mono'), \n\t\t\t\t\turl('${GM_getResourceURL(r)}') format('woff2');\n\t\t\t}\n\n\t\t\t@font-face {\n\t\t\t\tfont-family: 'JetBrains Mono';\n\t\t\t\tfont-style: italic;\n\t\t\t\tfont-weight: 400;\n\t\t\t\tfont-display: swap;\n\t\t\t\tsrc: local('JetBrains Mono'),\n\t\t\t\t\turl('${GM_getResourceURL(s)}') format('woff2');\n\t\t\t}\n\n\t\t\t@font-face {\n\t\t\t\tfont-family: 'JetBrains Mono';\n\t\t\t\tfont-style: italic;\n\t\t\t\tfont-weight: 700;\n\t\t\t\tfont-display: swap;\n\t\t\t\tsrc: local('JetBrains Mono'),\n\t\t\t\t\turl('${GM_getResourceURL(i)}') format('woff2');\n\t\t\t}\n\n\t\t\t@font-face {\n\t\t\tfont-family: 'Fira Code';\n\t\t\t\tsrc: local('Fira Code'), \n\t\t\t\t\turl('${GM_getResourceURL(l)}') format('woff2');\n\t\t\t\tfont-weight: 300;\n\t\t\t\tfont-style: normal;\n\t\t\t}\n\n\t\t\t@font-face {\n\t\t\t\tfont-family: 'Fira Code';\n\t\t\t\tsrc: local('Fira Code'), \n\t\t\t\t\turl('${GM_getResourceURL(d)}') format('woff2');\n\t\t\t\tfont-weight: 400;\n\t\t\t\tfont-style: normal;\n\t\t\t}\n\n\t\t\t@font-face {\n\t\t\t\tfont-family: 'Fira Code';\n\t\t\t\tsrc: local('Fira Code'), \n\t\t\t\t\turl('${GM_getResourceURL(c)}') format('woff2');\n\t\t\t\tfont-weight: 500;\n\t\t\t\tfont-style: normal;\n\t\t\t}\n\n\t\t\t@font-face {\n\t\t\t\tfont-family: 'Fira Code';\n\t\t\t\tsrc: local('Fira Code'), \n\t\t\t\t\turl('${GM_getResourceURL(m)}') format('woff2');\n\t\t\t\tfont-weight: 600;\n\t\t\t\tfont-style: normal;\n\t\t\t}\n\n\t\t\t@font-face {\n\t\t\t\tfont-family: 'Fira Code';\n\t\t\t\tsrc: local('Fira Code'), \n\t\t\t\t\turl('${GM_getResourceURL(u)}') format('woff2');\n\t\t\t\tfont-weight: 700;\n\t\t\t\tfont-style: normal;\n\t\t\t}\n\n\t\t\t/* Custom font for CodeMirror */\n\t\t\t.CodeMirror {\n\t\t\t\tfont-family: ${o.get([a,"custom-font"]).value} !important;\n\t\t\t}\n\t\t`)}),[new r("custom-font",'"JetBrains Mono", "Fira Code", "Source Code Pro", "Courier New", "Consolas", monospace')]).setDescription("Small tweaks for CodeMirror")},726:(t,e,n)=>{n(75);const a=n(839),o=n(477),r=(n(13),n(70));t.exports=new a("custom-logo-overlay",((t,e,n,a)=>{GM_addStyle("\n\t\t\t.custom-logo-overlay {\n\t\t\t\ttransform: translateY(-100%);\n\t\t\t}\n\t\t");let r=document.createElement("img");r.classList.add("h-100","custom-logo-overlay","no-night"),r.src=o.get([a,"url-no-night"]).value,document.querySelector(".header-brand").append(r);let s=document.createElement("img");s.classList.add("h-100","custom-logo-overlay","night"),s.src=o.get([a,"url-night"]).value,document.querySelector(".header-brand").append(s)}),[new r("url-no-night","https://protocoldroid.yorik.dev/shades-no-night.svg"),new r("url-night","https://protocoldroid.yorik.dev/shades-night.svg")],!0).setDescription("Add a custom logo overlay")},91:(t,e,n)=>{n(75);const a=n(839);n(477),n(13),n(70),t.exports=new a("drag-n-drop-email",((t,e,n,a)=>{const o=t=>new Promise(((e,n)=>{let a=new FileReader;a.addEventListener("load",(()=>{let[t,n]=a.result.split(/\r\n\r\n/);t=t.replaceAll(/\r\n\s+/g," ");let o=t.split("\r\n"),r={};for(let t=0;t<o.length;t++){let e=o[t].trim(),[n,a]=e.split(/\:(.*)/s).map((t=>t.trim()));n&&(r[n]=a)}let s=new Date(r.Date).toISOString().slice(0,10),i=(t=>{let e="";for(let n=0;n<t.length;n++){let a=t[n];if("="===a){let a,[o,r,s]=t.slice(n+2).split("?",3),i=o.length+r.length+s.length+5,l=new TextDecoder(o);switch(r.toUpperCase()){case"B":let t=atob(s);a=new Uint8Array(t.length);for(let e=0;e<t.length;e++)a[e]=t.charCodeAt(e);break;case"Q":a=new Uint8Array(s.length-2*(s.split("=").length-1));let e=0;for(let t=0;t<s.length;t++){let n=s.charCodeAt(t);switch(n){case 95:a[t-e]=32;break;case 61:a[t-e]=parseInt(s.slice(t+1,t+3),16),t+=2,e+=2;break;default:a[t-e]=n}}}e+=l.decode(a),n+=i}else e+=a}return e})(r.Subject);e(`- \`${s}\`: ${i}\n`)}),!1),a.readAsText(t)}));e.on("drop",((t,e)=>{for(let n of e.dataTransfer.files)"message/rfc822"===n.type&&(e.preventDefault(),o(n).then((n=>{let a=cloneInto({left:e.x,top:e.y},window,{cloneFunctions:!1});t.replaceRange(n,t.coordsChar(a,"window"))})))}))}),[]).setDescription("Drag and drop emails into the editor")},20:(t,e,n)=>{n(75);const a=n(839),o=n(477),r=n(13),s=n(676),i=n(70);t.exports=new a("fs-mentions",((t,e,n,a)=>{const r=[];o.get([a,"me"]).value.length&&r.push(o.get([a,"me"]).value),o.get([a,"my-aliases"]).value.length&&r.push(...o.get([a,"my-aliases"]).value.split(",").map((t=>t.trim())));let i=GM_getValue(`${a}.fsNames`,{});const l=(t,e,n)=>o.get([a,"full-names"]).value?n??e:e,d=(t,e,n)=>o.get([a,"full-names"]).value?t:n??e,c=/([\s\S]+)\s\(([\S]+)\)/;new Promise(((t,e)=>{GM_xmlhttpRequest({method:"GET",url:"https://www.fs-infmath.uni-kiel.de/wiki/Aktive_Kommilitonen",onload:function(e){const n=(new DOMParser).parseFromString(e.responseText,"text/html"),a=Array.from(n.querySelectorAll("h3")).map((t=>t.innerText.trim().match(c)));t(a)}})})).then((t=>{i=t.reduce(((t,[e,n,a])=>(t[a]=n,t)),i),GM_setValue(`${a}.fsNames`,i)})).then((()=>document.querySelectorAll(".mention.deactivated").forEach((t=>{const e=t.getAttribute("data-mention"),n=t.getAttribute("data-username");i[n]?(t.classList.remove("deactivated"),t.setAttribute("data-fsname",i[username]),o.get([a,"tooltip"]).value&&(t.setAttribute("data-toggle","tooltip"),t.setAttribute("data-placement",o.get([a,"tooltip-placement"]).value),t.setAttribute("data-original-title",d(e,n,i[username]))),o.get([a,"full-names"]).value&&(t.innerText=l(0,n,i[username]),t.classList.remove("frontAt","backAt"))):t.classList.add("deactivated")})))).then((()=>{o.get([a,"tooltip"]).value&&t('[data-toggle="tooltip"]').tooltip()}));const m=s.toRGB(o.get([a,"mention-color"]).value).join(", "),u=s.toRGB(o.get([a,"mention-highlight-color"]).value).join(", ");GM_addStyle(`\n\t\t\t@media not print {\n\t\t\t\t.mention.me,\n\t\t\t\t.mention:not(.deactivated) {\n\t\t\t\t\tborder-radius: 3px;\n\t\t\t\t\tpadding: 0 2px;\n\t\t\t\t\ttransition: background-color 50ms ease-out, color 50ms ease-out;\n\t\t\t\t\tcursor: pointer;\n\n\t\t\t\t\tcolor: rgb(var(--mention-color)) !important;\n\t\t\t\t\tbackground-color: rgba(var(--mention-color), 0.1) !important;\n\t\t\t\t\t--mention-color: ${m};\n\t\t\t\t}\n\t\t\t\t.mention:not(.deactivated):hover {\n\t\t\t\t\ttext-decoration: underline;\n\t\t\t\t\tbackground-color: rgba(var(--mention-color), 0.3) !important;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t.mention.me {\n\t\t\t\t\t--mention-color: ${u};\n\t\t\t\t}\n\n\t\t\t\t.mention.me.deactivated {\n\t\t\t\t\tcursor: default;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t.mention.frontAt::before {\n\t\t\t\tcontent: '@';\n\t\t\t}\n\t\t\t.mention.backAt::after {\n\t\t\t\tcontent: '@';\n\t\t\t}\n\t\t`);const p=n.renderer.rules.text||((t,e,n,a,o)=>o.renderToken(t,e,n)),h=/(?<=[\s,;]|\b|^)(?:@([a-z]+)|([a-z]+)@)(?=[\s,;]|\b|$)/gi;n.renderer.rules.text=(t,e,s,c,m)=>{const u=t[e].content,f=Object.assign({},t[e],{content:""}),g=Array.from(u.matchAll(h)).map((([t,e,n])=>[t.trim(),e??n]));if(0===g.length)return p(t,e,s,c,m);const b=g.reduce(((t,[e,n],s)=>{const c=u.indexOf(e,t[1]),m=c+e.length,p=e.startsWith("@"),h=e.endsWith("@");c>0&&t[0].push(Object.assign({},f,{content:u.slice(t[1],c)}));const b=l(0,n,i[n]),v=d(e,n,i[n]),_=o.get([a,"full-names"]).value&&i[n],y=["mention"];p&&!_&&y.push("frontAt"),h&&!_&&y.push("backAt"),r.includes(n)&&y.push("me"),i[n]||y.push("deactivated");const w=[["data-mention",e],["data-username",n],["class",y.join(" ")]];return i[n]&&w.push(["data-fsname",i[n]]),i[n]&&o.get([a,"tooltip"]).value&&(w.push(["data-toggle","tooltip"]),w.push(["data-placement",o.get([a,"tooltip-placement"]).value]),w.push(["data-original-title",v])),t[0].push(Object.assign({},f,{type:"link_open",tag:"span",nesting:1,attrs:w}),Object.assign({},f,{content:b,level:1}),Object.assign({},f,{type:"link_close",tag:"span",nesting:-1})),s===g.length-1&&m<u.length&&t[0].push(Object.assign({},f,{content:u.slice(m)})),[t[0],m]}),[[],0])[0];return n.renderer.render(b,s,c)},document.addEventListener("mouseover",(e=>{e.target.classList.contains("mention")&&o.get([a,"tooltip"]).value&&t('[data-toggle="tooltip"]').tooltip()})),document.addEventListener("click",(t=>{if(t.target.classList.contains("mention")){if(t.target.classList.contains("deactivated"))return;const e=t.target.getAttribute("data-fsname"),n=t.target.getAttribute("data-username"),a=document.createElement("a");a.href=encodeURI(`mailto:${e} <${n}@fs-informatik.uni-kiel.de>`),a.click(),a.remove()}})),o.get([a,"autocomplete"]).value&&t(e.getInputField()).textcomplete([{id:a,match:/@((?:\S+\s\S)*[\S]*)/,search:(t,e,n)=>{e(Object.keys(i).filter((t=>t.startsWith(n[1].toLowerCase())||i[t].toLowerCase().includes(n[1].toLowerCase())),""===n[1]).sort(((t,e)=>{const a=t.startsWith(n[1])?0:1,o=e.startsWith(n[1])?0:1;return a===o?t.localeCompare(e):a-o})).map((t=>({username:t.toLowerCase(),fsName:i[t],usernameMatched:`<b>${t.slice(0,n[1].length)}</b>${t.slice(n[1].length)}`,fsNameMatched:i[t].replace(new RegExp(`(${n[1]})`,"i"),"<b>$1</b>")}))))},template:t=>`<i class="fa fa-at fa-fw"></i>&nbsp;${t.usernameMatched} (${t.fsNameMatched})`,replace:t=>`@${t.username}`,context:t=>!0}])}),[new r("autocomplete",!0),new r("full-names",!1),new i("me",""),new i("my-aliases",""),new s("mention-color","#0078d7"),new s("mention-highlight-color","#ff1100"),new r("tooltip",!0),new i("tooltip-placement","right")]).setDescription("Replace FS usernames with clickable links.")},451:(t,e,n)=>{n(75);const a=n(839),o=n(477),r=n(13);n(70),t.exports=new a("internal-spoiler",((t,e,n,a)=>{o.get([a,"blur"]).value?GM_addStyle("\n\t\t\t\t@media not print {\n\t\t\t\t\t.spoiler:not(:hover):not([data-open]) {\n\t\t\t\t\t\tfilter: blur(5px);\n\t\t\t\t\t}\n\n\t\t\t\t\t.spoiler::marker {\n\t\t\t\t\t\tfilter: blur(0px);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t"):GM_addStyle("\n\t\t\t\t@media not print {\n\t\t\t\t\t.spoiler {\n\t\t\t\t\t\tbackground-color: black;\n\t\t\t\t\t\ttransition: background-color 0.5s;\n\t\t\t\t\t}\n\n\t\t\t\t\t.spoiler:not(:hover):not([data-open]), \n\t\t\t\t\t.spoiler:not(:hover):not([data-open]) * {\n\t\t\t\t\t\tcolor: transparent !important;\n\t\t\t\t\t}\n\n\t\t\t\t\t.spoiler:hover, .spoiler[data-open] {\n\t\t\t\t\t\tbackground-color: #eee !important;\n\t\t\t\t\t}\n\n\t\t\t\t\t.spoiler::marker {\n\t\t\t\t\t\tcolor: #333 !important;\n\t\t\t\t\t}\n\n\t\t\t\t\t.night .spoiler, .night .spoiler[data-open] {\n\t\t\t\t\t\tbackground-color: black;\n\t\t\t\t\t\ttransition: color 0.5s;\n\t\t\t\t\t}\n\n\t\t\t\t\t.night .spoiler:not(:hover), .night .spoiler:not(:hover) *,\n\t\t\t\t\t.night .spoiler[data-open], .night .spoiler[data-open] * {\n\t\t\t\t\t\tcolor: transparent !important;\n\t\t\t\t\t}\n\n\t\t\t\t\t.night .spoiler:hover,\n\t\t\t\t\t.night .spoiler[data-open] {\n\t\t\t\t\t\tbackground-color: black !important;\n\t\t\t\t\t}\n\n\t\t\t\t\t.night .spoiler::marker {\n\t\t\t\t\t\tcolor: #ededed !important;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t");const r=n.renderer.rules.list_item_open||((t,e,n,a,o)=>o.renderToken(t,e,n)),s=/^\[(?:intern(?:al)?|spoiler)\]\s*(\S.*)$/i;n.renderer.rules.list_item_open=(t,e,n,a,o)=>{if(t[e+1]&&"paragraph_open"===t[e+1].type&&t[e+2]&&"inline"===t[e+2].type){let n=t[e],a=t[e+2],o=a.content.match(s);o&&(a.content=o[1],n.attrPush(["class","spoiler"]))}return r(t,e,n,a,o)},document.addEventListener("click",(t=>{const e=t.target.closest(".spoiler");e&&(e.hasAttribute("data-open")?e.removeAttribute("data-open"):e.setAttribute("data-open",""))}))}),[new r("blur",!1)]).setDescription("Blur or black out spoilers/internal notices in the generated HTML")},65:(t,e,n)=>{n(75);const a=n(839),o=n(477),r=n(13);n(70),t.exports=new a("markdownit-tweaks",((t,e,n,a)=>{o.get([a,"german-quotes"])&&(n.options.quotes="„“‚‘")}),[new r("german-quotes",!0)]).setDescription("Small tweaks for MarkdownIt")},323:(t,e,n)=>{n(75);const a=n(839);n(477),n(13),n(70),t.exports=new a("pride-logo",((t,e,n,a)=>{Array.from(document.querySelectorAll(".navbar-brand img.no-night"));const o=Array.from(document.querySelectorAll(".navbar-brand img.night"));GM_addStyle(`\n\t\t\t/* make the Logo rainbow colored */\n\t\t\t.header-brand {\n\t\t\t\tbackground-image: linear-gradient(\n                    #fe0000 24.7%,\n                    #fd8c00 24.7%, 37.35%,\n                    #ffd000 37.35%, 50%,\n                    #119f0b 50%, 62.65%,\n                    #457cdf 62.65%, 75.3%,\n                    #c22edc 75.3%\n                );\n\t\t\t\tmask: ${o.map((t=>`url(${t.src}) center/contain no-repeat`)).join(", ")};\n\t\t\t\tmask-origin: content-box;\n\t\t\t\tmask-mode: luminance, alpha;\n\t\t\t\tmask-composite: exclude;\n\t\t\t}\n\n\t\t\t.header-brand img {\n\t\t\t\tvisibility: hidden;\n\t\t\t}\n\n\t\t\tbody:not(.night) .header-brand {\n\t\t\t\tfilter: brightness(0.8) contrast(1.5);\n\t\t\t}\n\n\t\t\tbody.night .header-brand {\n\t\t\t\tfilter: saturate(2);\n\t\t\t}\n\t\t`)}),[],!0).setDescription('"Prideify" the logo')},628:(t,e,n)=>{n(75);const a=n(839),o=n(477),r=n(13);n(70),t.exports=new a("print-style",((t,e,n,a)=>{GM_addStyle('\n\t\t@media print {\n\t\t\tabbr[title] {\n\t\t\t\ttext-decoration: none;\n\t\t\t}\n\t\t\tabbr[title]::after {\n\t\t\t\tfont-size: 12px !important;\n\t\t\t}\n\t\t\t.markdown-body h1 {\n\t\t\t\tfont-size: 1.5em;\n\t\t\t}\n\t\t\t\n\t\t\t.markdown-body h2 {\n\t\t\t\tfont-size: 1.25em;\n\t\t\t\tmargin-bottom: 0;\n\t\t\t\tmargin-top: 12px;\n\t\t\t}\n\t\t\t\n\t\t\t:is(h1, h2, h3, h4) + :is(h1, h2, h3, h4) {\n\t\t\t\tmargin-top: 0 !important;\n\t\t\t\tpadding-top: 0 !important;\n\t\t\t}\n\t\t\t\n\t\t\t:is(h1, h2, h3, h4):has(+ :is(h1, h2, h3, h4)) {\n\t\t\t\tmargin-bottom: 0 !important;\n\t\t\t}\n\t\t\t\n\t\t\t:is(h1, h2, h3, h4) + :is(h1, h2, h3, h4)::before {\n\t\t\t\tdisplay: none !important;\n\t\t\t}\n\t\t\t\n\t\t\timg {\n\t\t\t\tmax-width: 15em !important;\n\t\t\t}\n\t\t\t\n\t\t\tabbr[title="Tagesordnungspunkt"]::after {\n\t\t\t\tdisplay: none;\n\t\t\t}\n\t\t\t\n\t\t\t.markdown-body {\n\t\t\t\tfont-size: 10pt;\n\t\t\t\tline-height: 1.125;\n\t\t\t}\n\t\t\t\n\t\t\t.markdown-body blockquote {\n\t\t\t\tfont-size: 10.5pt;\n\t\t\t\tmargin-bottom: 4px;\n\t\t\t}\n\t\t\t  \n\t\t\t.markdown-body li > p {\n\t\t\t\tmargin-top: inherit;\n\t\t\t\tmargin-bottom: inherit;\n\t\t\t}\n\t\t\t\n\t\t\th1, h2,\n\t\t\th2 + ul {\n\t\t\t\tpage-break-before: auto;\n\t\t\t\tbreak-before: auto;\n\t\t\t\tpage-break-after: avoid;\n\t\t\t\tbreak-before: avoid;\n\t\t\t}\n\t\t}\n\t'),o.get([a,"save-trees"]).value&&GM_addStyle("\n\t\t\t@media print {\n\t\t\t\t.markdown-body ul ul,\n\t\t\t\t.markdown-body ol ol {\n\t\t\t\t\tmargin-left: 1em;\n\t\t\t\t}\n\t\t\t}\n\t\t")}),[new r("save-trees",!0)]).setDescription("Add a print style")},391:(t,e,n)=>{const a=n(75),o=n(839),r=n(477),s=(n(13),n(676));n(70),t.exports=new o("todo-notes",((t,e,n,o)=>{const s=r.get([o,"default-color"]).value;GM_addStyle(`\n\t\t.todo-note {\n\t\t\tcolor: ${s};\n\t\t}\n\n\t\t.todo-text::before {\n\t\t\tcontent: 'TODO: ';\n\t\t\tfont-weight: bold;\n\t\t}\n\n\t\t.todo-text.empty::before {\n\t\t\tcontent: 'TODO';\n\t\t}\n\n\t\t@media print {\n\t\t\t.todo-note {\n\t\t\t\tdisplay: none !important;\n\t\t\t}\n\t\t}\n\t`);const i=(t,e,n,a,o)=>o.renderToken(t,e,n),l=n.renderer.rules.html_block||i,d=n.renderer.rules.html_inline||i,c=n.renderer.rules.text||i,m=/<!--\s*(?:\[TODO\]|TODO):?\s*((?:[^-\s]|-[^-\n]|--[^>\n])(?:[^-\n]|-[^-\n]|--[^>\n])*(?:[^-\s]|-[^-\s]|--[^>\s]) | (?:[^-\s]|-[^-\n]|--[^>\n]))?\s*-->/i,u=(t,e,n,a)=>c([{attrs:null,block:!1,children:null,content:t,hidden:!1,info:"",level:0,map:null,markup:"",meta:null,nesting:0,tag:"",type:"text"}],0,e,n,a);n.renderer.rules.html_block=(t,e,n,a,o)=>{let r=t[e].content;if(r.search(m)<0)return l(t,e,n,a,o);let s="",i=r.search(m);for(;i>=0;){let t=r.match(m);s+=r.slice(0,i),t[1]?s+=`<span class="todo-note"><span class="todo-icon fa fa-sticky-note fa-fw"></span><span class="todo-text">${u(t[1])}</span></span>`:s+='<span class="todo-note"><span class="todo-icon fa fa-sticky-note fa-fw"></span><span class="todo-text empty"></span></span>',r=r.slice(i+t[0].length),i=r.search(m)}return s+=r,t[e].content=`<p class="part" data-startline="${t[e].map[0]+1}" data-endline="${t[e].map[1]}">${s}</p>`,l(t,e,n,a,o)},n.renderer.rules.html_inline=(t,e,n,a,o)=>{const r=t[e].content.match(m);return r?r[1]?`<span class="todo-note"><span class="todo-icon fa fa-sticky-note fa-fw"></span><span class="todo-text">${u(r[1])}</span></span>`:'<span class="todo-note"><span class="todo-icon fa fa-sticky-note fa-fw"></span><span class="todo-text empty"></span></span>':d(t,e,n,a,o)};let p=document.createElement("a");p.classList.add("btn","btn-sm","text-uppercase"),p.id="makeTodo",p.innerHTML='<i class="fa fa-sticky-note fa-fw"></i>',p.title="Add TODO note",p.role="button",p.setAttribute("data-toggle","dropdown"),p.setAttribute("aria-haspopup","true"),p.setAttribute("aria-expanded","true"),p.addEventListener("click",(()=>{const t=e.getCursor();cursorInHTMLComment(e,t)?(e.replaceRange("--\x3e\x3c!-- TODO:  --\x3e\x3c!--",t,t),e.setCursor(t.line,t.ch+14)):(e.replaceRange("\x3c!-- TODO:  --\x3e",t,t),e.setCursor(t.line,t.ch+11)),e.focus()})),a.getByQuery(".toolbar .btn-group").then((t=>t.appendChild(p)))}),[new s("default-color","#eda35e")]).setDescription("Highlight TODO notes in the editor")},2:(t,e,n)=>{const a=n(75),o=n(839),r=n(477),s=n(13);n(70),t.exports=new o("visible-comments",((t,e,n,o)=>{GM_addStyle('\n\t\t.comment {\n\t\t\tuser-select: none;\n\t\t\tfilter: opacity(0.5);\n\t\t\tdisplay: inline;\n\t\t}\n\n\t\t.comment::before,\n\t\t.comment::after {\n\t\t\twhite-space: nowrap;\n\t\t}\n\n\t\t.comment-block {\n\t\t\tdisplay: block;\n\t\t}\n\n\t\t.comment[data-opened="true"] {\n\t\t\tuser-select: auto;\n\t\t}\n\n\t\t.comment[data-opened="true"]::before {\n\t\t\tcontent: \'\x3c!-- \';\n\t\t}\n\n\t\t.comment[data-opened="true"]::after {\n\t\t\tcontent: \' --\x3e\';\n\t\t}\n\n\t\t.comment *:not(.comment-icon) {\n\t\t\tdisplay: none;\n\t\t}\n\n\t\t.comment[data-opened="true"] *:not(.comment-icon) {\n\t\t\tdisplay: initial;\n\t\t}\n\n\t\t.comment[data-opened="true"] .comment-icon {\n\t\t\tdisplay: none;\n\t\t}\n\n\t\t.comment .comment-author {\n\t\t\tfont-style: italic;\n\t\t}\n\n\t\t.comment .comment-author::before {\n\t\t\tcontent: "~";\n\t\t}\n\n\t\t.comment .comment-content::after {\n\t\t\tcontent: " ";\n\t\t}\n\n\t\t@media print {\n\t\t\t.comment {\n\t\t\t\tdisplay: none !important;\n\t\t\t}\n\t\t}\n\t'),r.get([o,"hover-opens-comments"]).value&&GM_addStyle("\n\t\t\n\t\t\t@media (hover: hover) {\n\t\t\t\t.comment:hover {\n\t\t\t\t\tuser-select: auto;\n\t\t\t\t}\n\n\t\t\t\t.comment:hover::before {\n\t\t\t\t\tcontent: '\x3c!-- ';\n\t\t\t\t}\n\n\t\t\t\t.comment:hover::after {\n\t\t\t\t\tcontent: ' --\x3e';\n\t\t\t\t}\n\n\t\t\t\t.comment:hover *:not(.comment-icon) {\n\t\t\t\t\tdisplay: initial;\n\t\t\t\t}\n\n\t\t\t\t.comment:hover .comment-icon {\n\t\t\t\t\tdisplay: none;\n\t\t\t\t}\n\t\t\t}\n\t\t");const s=(t,e,n,a,o)=>o.renderToken(t,e,n),i=n.renderer.rules.html_block||s,l=n.renderer.rules.html_inline||s,d=n.renderer.rules.text||s,c=/<!--\s*((?:[^-\s]|-[^-]|--[^>])(?:[^-]|-[^-]|--[^>])*)\s+~\s*((?:[^~-\s\n]|-[^-\n]|--[^>\n])(?:[^-\n]|-[^-\n]|--[^>\n])*)\s*-->/,m=(t,e,n,a)=>d([{attrs:null,block:!1,children:null,content:t,hidden:!1,info:"",level:0,map:null,markup:"",meta:null,nesting:0,tag:"",type:"text"}],0,e,n,a);n.renderer.rules.html_block=(t,e,a,s,l)=>{let d=t[e].content;if(d.search(c)<0)return i(t,e,a,s,l);let u="",p=d.search(c);for(;p>=0;){let t=d.match(c);u+=d.slice(0,p),u+=`<span class="comment" data-opened="${r.get([o,"comment-opened-default"]).value}"><span class="comment-icon fa fa-comment fa-fw"></span><span class="comment-content">${m(t[1])}</span><span class="comment-author">${n.utils.escapeHtml(t[2].trim())}</span></span>`,d=d.slice(p+t[0].length),p=d.search(c)}return u+=d,t[e].content=`<p class="part" data-startline="${t[e].map[0]+1}" data-endline="${t[e].map[1]}">${u}</p>`,i(t,e,a,s,l)},n.renderer.rules.html_inline=(t,e,a,s,i)=>{const d=t[e].content.match(c);return d?`<span class="comment" data-opened="${r.get([o,"comment-opened-default"]).value}"><span class="comment-icon fa fa-comment fa-fw"></span><span class="comment-content">${m(d[1])}</span><span class="comment-author">${n.utils.escapeHtml(d[2].trim())}</span></span>`:l(t,e,a,s,i)},r.get([o,"original-comment-button"]).value||a.getByQuery("#makeComment").then((t=>{$("#makeComment").off("click"),t.addEventListener("click",(()=>{const t=document.querySelector(".ui-user-item").querySelector(".ui-user-name").innerText.split(" ",1)[0],n=e.getCursor();cursorInHTMLComment(e,n)?(e.replaceRange(`--\x3e\x3c!--  ~${t} --\x3e\x3c!--`,n,n),e.setCursor(n.line,n.ch+8)):(e.replaceRange(`\x3c!--  ~${t} --\x3e`,n,n),e.setCursor(n.line,n.ch+5)),e.focus()}))})),document.addEventListener("click",(t=>{let e=t.target;for(;e;)e.classList.contains("comment")&&(e.dataset.opened="true"===e.dataset.opened?"false":"true"),e=e.parentElement}))}),[new s("original-comment-button",!1),new s("comment-opened-default",!1),new s("hover-opens-comments",!0)]).setDescription("Make comments visible in the editor")}},e={};function n(a){var o=e[a];if(void 0!==o)return o.exports;var r=e[a]={exports:{}};return t[a](r,r.exports,n),r.exports}(()=>{const t=n(75),e=n(839),a=n(46),o=n(726),r=n(91),s=n(20),i=n(451),l=n(65),d=n(323),c=n(628),m=n(391),u=n(2),p=n(779);(()=>{"use strict";document.addEventListener("protocolDroidReady",(()=>{console.log("ProtocolDroid is ready")})),document.addEventListener("protocolDroidFeatureLoaded",(t=>{console.log("ProtocolDroid loaded feature:",t.detail.name)})),a.register(),p.register(),o.register(1),r.register(),s.register(2),i.register(),l.register(),d.register(),c.register(),m.register(),u.register(1),t.addSettingMenu(),Promise.all([t.getJQuery(),t.getCodeMirror(),t.getMardownIt()]).then((([n,a,o])=>{e.loadAll(n,a,o),t.ready()}))})()})()})();