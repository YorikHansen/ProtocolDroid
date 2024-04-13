// ==UserScript==
// @name ProtocolDroid
// @description A client side HedgeDoc extension that helps with protocols.
// @version 0.1.1
// @author Yorik Hansen
// @homepage https://github.com/YorikHansen/ProtocolDroid
// @match https://www.fs-infmath.uni-kiel.de/codimd/*
// @match https://codimd.fs-infmath.uni-kiel.de/*
// @match https://md.kif.rocks/*
// @match https://md.fachschaften.org/*
// @connect www.fs-infmath.uni-kiel.de
// @downloadURL https://github.com/YorikHansen/ProtocolDroid/raw/main/dist/protocoldroid.user.js
// @grant GM_addStyle
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_xmlhttpRequest
// @icon https://www.fs-infmath.uni-kiel.de/codimd/icons/favicon.ico
// @namespace https://protocoldroid.yorik.dev/
// @run-at document-body
// @updateURL https://github.com/YorikHansen/ProtocolDroid/raw/main/dist/protocoldroid.meta.js
// ==/UserScript==

(()=>{var t={13:(t,e,n)=>{const a=n(477);t.exports=class extends a{constructor(t,e){super(t,e)}_setInputElemValue(t){this._input.checked=t}_getInputElemValue(){return this._input.checked}_prepareInputElement(){this._input.id=this._name,this._input.disabled=this._disabledFn(a._SETTINGS),this._input.type="checkbox",this._setInputElemValue(this._liveValue),this._input.addEventListener("input",(()=>{a.set(this._name,this._getInputElemValue())}))}}},839:(t,e,n)=>{const a=n(477),s=n(13);class l{static _precedences=[];static _features=[];constructor(t,e,n=[],a=!0){if(!t.match(/^[a-z][a-z0-9]*(?:\-[a-z0-9]+)+$/i))throw new Error("Feature names must only contain letters, numbers and hyphens. They must start with a letter, have at least one hyphen and may not end with a hyphen.");this.name=t,this.code=e,this.options=n,this.enabledByDefault=a,this.description=""}register(t=0){return a.add(new s(["features",this.name],this.enabledByDefault)),this.options.forEach((t=>a.add(t.toNamespace(this.name).setDisabledFn((()=>!a.get(["features",this.name]).liveValue))))),l.add(this,t)}load(t,e,n){a.get(["features",this.name]).value&&(this.code(t,e,[this.name]),console.log(`Feature ${this.name} loaded`))}setDescription(t){return this.description=t,this}static add(t,e=0){return e in l._features||(l._precedences.push(e),l._features[e]=[]),l._features[e].push(t),!0}static loadAll(t,e){l._precedences.sort();for(let n=l._precedences.length-1;n>=0;n--)l._features[l._precedences[n]].forEach((n=>n.load(t,e,"")))}}t.exports=l},75:(t,e,n)=>{const a=n(477);n(13),n(70),n(839);class s{static getByQuery=t=>new Promise(((e,n)=>{const a=setInterval((()=>{const n=document.querySelector(t);n&&(clearInterval(a),e(n))}),100)}));static getCodeMirror=()=>new Promise(((t,e)=>{const n=setInterval((()=>{unsafeWindow.editor&&(clearInterval(n),t(unsafeWindow.editor))}),100)}));static getMardownIt=()=>new Promise(((t,e)=>{const n=setInterval((()=>{unsafeWindow.md&&(clearInterval(n),t(unsafeWindow.md))}),100)}));static addModal=(t,e,n,a)=>{let s=document.createElement("div");s.classList.add("modal","fade"),s.id=t,s.tabIndex=-1,s.role="dialog",s.setAttribute("aria-labelledby",t+"-label"),s.setAttribute("aria-hidden","true");let l=document.createElement("div");l.classList.add("modal-dialog","modal-lg"),l.role="document";let i=document.createElement("div");i.classList.add("modal-content");let o=document.createElement("div");o.classList.add("modal-header");let r=document.createElement("button");if(r.type="button",r.classList.add("close"),r.setAttribute("data-dismiss","modal"),r.setAttribute("aria-label","Close"),r.innerHTML='<span aria-hidden="true">&times;</span>',o.appendChild(r),e instanceof HTMLElement)e.classList.contains("modal-header")?o=e:(e.classList.add("modal-title"),e.id=t+"-label",o.appendChild(e));else{let n=document.createElement("h4");n.classList.add("modal-title"),n.id=t+"-label",n.innerText=e,o.appendChild(n)}if(i.appendChild(o),n instanceof HTMLElement)n.classList.add("modal-body"),i.appendChild(n);else{let t=document.createElement("div");t.classList.add("modal-body"),t.innerHTML=n,i.appendChild(t)}if(a instanceof HTMLElement)a.classList.add("modal-footer"),i.appendChild(a);else{let t=document.createElement("div");t.classList.add("modal-footer"),a.forEach((e=>t.appendChild(e))),i.appendChild(t)}return l.appendChild(i),s.appendChild(l),s};static addSettingMenu=()=>{console.log("Adding settings menu"),GM_addStyle("\n\t\t\t#short-online-user-list {\n\t\t\t\tline-height: 1;\n\t\t\t}\n\t\t\t@media (max-width: 821px) {\n\t\t\t\t.navbar-collapse.collapse {\n\t\t\t\t\tdisplay: none !important;\n\t\t\t\t}\n\t\t\t\t.visible-xs {\n\t\t\t\t\tdisplay: block !important;\n\t\t\t\t}\n\t\t\t\t.navbar-header {\n\t\t\t\t\tfloat: none;\n\t\t\t\t}\n\t\t\t}\n\t\t");let t=a.bundleHTML(),e=document.createElement("div");e.innerHTML="<em>WORK IN PROGRESS</em><hr>",t.prepend(e);let n=document.createElement("button");n.type="button",n.classList.add("btn","btn-default"),n.setAttribute("data-dismiss","modal"),n.innerText="Abbrechen",n.addEventListener("click",(()=>{a.cancelAll()}));let l=document.createElement("button");l.type="button",l.classList.add("btn","btn-danger"),l.innerText="Zurücksetzen",l.addEventListener("click",(()=>{a.resetAll()}));let i=document.createElement("button");i.type="button",i.classList.add("btn","btn-primary"),i.innerText="Speichern",i.addEventListener("click",(()=>{a.commitAll(),window.location.reload()}));let o=s.addModal("pd-settings-modal","Einstellungen",t,[n,l,i]);document.body.appendChild(o);let r=document.createElement("ul");r.classList.add("nav","navbar-nav","navbar-form","navbar-right"),r.style="padding: 0;",r.innerHTML='<span class="btn btn-link ui-settings" title="Einstellungen" data-toggle="modal" data-target="#pd-settings-modal"><i class="fa fa-gears"></i></span>';let d=document.createElement("div");d.classList.add("nav-mobile","pull-right","visible-xs"),d.innerHTML='<a class="btn btn-link ui-settings" title="Einstellungen" data-toggle="modal" data-target="#pd-settings-modal"><i class="fa fa-gears"></i></a>',s.getByQuery(".nav.navbar-nav.navbar-right").then((t=>t.after(r))),s.getByQuery(".nav-mobile.pull-right.visible-xs").then((t=>t.before(d)))};static cursorInHTMLComment=(t,e)=>{const n=e.line;let a,s,l,i=n+1;for(;i>0;){if(i--,a=t.getLine(i),i===n&&(a=a.slice(0,e.ch)),s=a.lastIndexOf("\x3c!--"),l=a.lastIndexOf("--\x3e"),s>=0&&l>=0)return s>l;if(s>=0)return!0;if(l>=0)return!1}}}t.exports=s},477:t=>{class e{static _SETTINGS={};_name;_defaultValue;_value;_liveValue;_input=document.createElement("input");_disabledFn=()=>!1;_validateFn=()=>!0;constructor(t,n){if(this.constructor===e)throw new TypeError("Cannot create instance of abstract class Setting");this._name=e.#t(t),this._defaultValue=n,this._value=GM_getValue(this._name.replace(".","_"),this._defaultValue),this._liveValue=this._value}setDisabledFn(t){return this._disabledFn=t,this}setValidateFn(t){return this._validateFn=t,this}toNamespace(t){return t=e.#t(t),this._name=e.#t([t,this._name]),this._value=GM_getValue(this._name.replace(".","_"),this._defaultValue),this._liveValue=this._value,this}_setInputElemValue(t){this._input.value=t}_getInputElemValue(){return this._input.value}_setInputElemValid(t){this._input.classList.toggle("is-invalid",!t)}_prepareInputElement(){this._input.id=this._name,this._input.disabled=this._disabledFn(e._SETTINGS),this._setInputElemValue(this._liveValue),this._input.addEventListener("input",(()=>{e.set(this._name,this._getInputElemValue())}))}getDOMElement(){let t=document.createElement("label");t.htmlFor=this._name,t.innerText=this._name,this._prepareInputElement(),this._input.addEventListener("input",(()=>{for(let t in e._SETTINGS)e._SETTINGS[t]._input.disabled=e._SETTINGS[t]._disabledFn(e._SETTINGS)}));let n=document.createElement("div");return n.appendChild(t),n.appendChild(this._input),n}static add(t){e._SETTINGS[t._name]=t}static get(t){return t=e.#t(t),{value:e._SETTINGS[t]._value,defaultValue:e._SETTINGS[t]._defaultValue,liveValue:e._SETTINGS[t]._liveValue}}static set(t,n){if(t=e.#t(t),e._SETTINGS[t]._disabledFn(e._SETTINGS))return;let a=e._SETTINGS[t]._validateFn(n);e._SETTINGS[t]._setInputElemValid(a),a&&(e._SETTINGS[t]._liveValue=n,e._SETTINGS[t]._getInputElemValue()!==n&&e._SETTINGS[t]._setInputElemValue(n))}static reset(t){t=e.#t(t),e.set(t,e.get(t).defaultValue)}static cancel(t){t=e.#t(t),e._SETTINGS[t]._liveValue=e._SETTINGS[t]._value,e._SETTINGS[t]._setInputElemValue(e._SETTINGS[t]._value)}static commit(t){t=e.#t(t),e._SETTINGS[t]._value=e._SETTINGS[t]._liveValue,GM_setValue(t.replace(".","_"),e._SETTINGS[t]._value)}static resetAll(){for(let t in e._SETTINGS)e.reset(t)}static commitAll(){for(let t in e._SETTINGS)e.commit(t)}static cancelAll(){for(let t in e._SETTINGS)e.cancel(t)}static bundleHTML(){let t=document.createElement("div");for(let n in e._SETTINGS)t.appendChild(e._SETTINGS[n].getDOMElement());return t}static#t(t){return Array.isArray(t)&&(t=t.join(".")),t}}t.exports=e},70:(t,e,n)=>{const a=n(477);t.exports=class extends a{constructor(t,e){super(t,e)}_setInputElemValue(t){this._input.value=t}_getInputElemValue(){return this._input.value}_prepareInputElement(){this._input.id=this._name,this._input.disabled=this._disabledFn(a._SETTINGS),this._input.type="text",this._setInputElemValue(this._liveValue),this._input.addEventListener("input",(()=>{a.set(this._name,this._getInputElemValue())}))}}},46:(t,e,n)=>{const a=n(75),s=n(839);n(477),n(13),n(70),t.exports=new s("clean-publishing",((t,e,n)=>{GM_addStyle("\n\t\t.ui-publish-link {\n\t\t\tfloat: right;\n\t\t\tfont-size: 0.7em;\n\t\t\tmargin-top: 4px;\n\t\t\tmargin-right: 8px;\n\t\t}\n\n\t\t.ui-publish-copy {\n\t\t\tfloat: right; \n\t\t\tcursor: pointer;\n\t\t\topacity: 0;\n\t\t\ttransition: opacity 0.2s;\n\t\t}\n\n\t\tpre:hover .ui-publish-copy {\n\t\t\topacity: 0.6;\n\t\t}\n\t");const s=t=>([t=>t.replace(/<!--.*?-->/gs,""),t=>t.replace(/\*\[[^\n]+?\]: .+?\n/gs,"").replace(/\*\[[^\n]+?\]: [^\n]+$/gs,""),t=>t.replace(/:::.*\n[\s\S]*?\n:::/gs,""),t=>t.replace(/:\S+:/g,""),t=>t.replace(/^---\n[\s\S]*?\n---/gs,""),t=>t.replace(/(?:<(?:[^>]+)>)/gi,""),t=>t.replace(/^\s+|\s+$/g,""),t=>t.replace(/\n\n+/g,"\n\n")].forEach((e=>{t=e(t)})),t);document.querySelectorAll(".ui-publish").forEach((e=>{const n={href:e.href,target:e.target,rel:e.rel};e.removeAttribute("href"),e.removeAttribute("target"),e.removeAttribute("rel"),e.classList.add("ui-publish"),e.title="Veröffentlichen",e.setAttribute("data-toggle","modal"),e.setAttribute("data-target","#pd-publish-modal"),e.innerHTML='<i class="fa fa-upload fa-fw"></i> Veröffentlichen';let l=document.createElement("h4");l.classList.add("modal-title"),l.innerText="Veröffentlichen";let i=document.createElement("a");i.classList.add("ui-publish-link"),i.href=n.href,i.target=n.target,i.rel=n.rel,i.innerText="Default HedgeDoc publishing",l.appendChild(i);let o=document.createElement("button");o.type="button",o.classList.add("btn","btn-default"),o.setAttribute("data-dismiss","modal"),o.innerText="Schließen";let r=document.createElement("a");r.classList.add("btn","btn-primary"),r.innerHTML='<i class="fa fa-download"></i> Download',r.download="protocol.md";let d,c=document.createElement("div"),m=document.createElement("pre"),u=document.createElement("i");u.classList.add("fa","fa-file-o","fa-fw","ui-publish-copy"),u.title="In Zwischenablage kopieren",u.addEventListener("click",(()=>{d&&clearTimeout(d),navigator.clipboard.writeText(s(t.getValue())),u.classList.remove("fa-file-o"),u.classList.add("fa-check"),d=setTimeout((()=>{u.classList.remove("fa-check"),u.classList.add("fa-file-o")}),1e3)})),m.appendChild(u);let p=document.createElement("code");const h=()=>{let e=s(t.getValue());p.innerText=e,r.href="data:text/plain;charset=utf-8,"+encodeURIComponent(e)};t.on("change",h),m.appendChild(p),c.appendChild(m);let f=a.addModal("pd-publish-modal",l,c,[o,r]);$(f).on("shown.bs.modal",h),document.body.appendChild(f)}))})).setDescription("Modify the publish button to open a dialog with a cleaned version of the document because our protocol parser is not able to handle most of the HedgeDoc/ProtocolDroid features.")},726:(t,e,n)=>{n(75);const a=n(839),s=n(477),l=(n(13),n(70));t.exports=new a("custom-logo-overlay",((t,e,n)=>{GM_addStyle("\n\t\t.custom-logo-overlay {\n\t\t\ttransform: translateY(-100%);\n\t\t}\n\t");let a=document.createElement("img");a.classList.add("h-100","custom-logo-overlay","no-night"),a.src=s.get([n,"url-no-night"]).value,document.querySelector(".header-brand").append(a);let l=document.createElement("img");l.classList.add("h-100","custom-logo-overlay","night"),l.src=s.get([n,"url-night"]).value,document.querySelector(".header-brand").append(l)}),[new l("url-no-night","https://protocoldroid.yorik.dev/shades-no-night.svg"),new l("url-night","https://protocoldroid.yorik.dev/shades-night.svg")],!0).setDescription("Add a custom logo overlay")},91:(t,e,n)=>{n(75);const a=n(839);n(477),n(13),n(70),t.exports=new a("drag-n-drop-email",((t,e,n)=>{const a=t=>new Promise(((e,n)=>{let a=new FileReader;a.addEventListener("load",(()=>{let[t,n]=a.result.split(/\r\n\r\n/);t=t.replaceAll(/\r\n\s+/g," ");let s=t.split("\r\n"),l={};for(let t=0;t<s.length;t++){let e=s[t].trim(),[n,a]=e.split(/\:(.*)/s).map((t=>t.trim()));n&&(l[n]=a)}let i=new Date(l.Date).toISOString().slice(0,10),o=(t=>{let e="";for(let n=0;n<t.length;n++){let a=t[n];if("="===a){let a,[s,l,i]=t.slice(n+2).split("?",3),o=s.length+l.length+i.length+5,r=new TextDecoder(s);switch(l.toUpperCase()){case"B":let t=atob(i);a=new Uint8Array(t.length);for(let e=0;e<t.length;e++)a[e]=t.charCodeAt(e);break;case"Q":a=new Uint8Array(i.length-2*(i.split("=").length-1));let e=0;for(let t=0;t<i.length;t++){let n=i.charCodeAt(t);switch(n){case 95:a[t-e]=32;break;case 61:a[t-e]=parseInt(i.slice(t+1,t+3),16),t+=2,e+=2;break;default:a[t-e]=n}}}e+=r.decode(a),n+=o}else e+=a}return e})(l.Subject);e(`- \`${i}\`: ${o}\n`)}),!1),a.readAsText(t)}));t.on("drop",((t,e)=>{for(let n of e.dataTransfer.files)"message/rfc822"===n.type&&(e.preventDefault(),a(n).then((n=>{let a=cloneInto({left:e.x,top:e.y},window,{cloneFunctions:!1});t.replaceRange(n,t.coordsChar(a,"window"))})))}))}),[]).setDescription("Drag and drop emails into the editor")},65:(t,e,n)=>{n(75);const a=n(839),s=n(477),l=n(13);n(70),t.exports=new a("markdownit-tweaks",((t,e,n)=>{s.get([n,"german-quotes"])&&(e.options.quotes="„“‚‘")}),[new l("german-quotes",!0)]).setDescription("Small tweaks for MarkdownIt")},628:(t,e,n)=>{n(75);const a=n(839),s=n(477),l=n(13);n(70),t.exports=new a("print-style",((t,e,n)=>{GM_addStyle('\n\t\t@media print {\n\t\t\tabbr[title] {\n\t\t\t\ttext-decoration: none;\n\t\t\t}\n\t\t\tabbr[title]::after {\n\t\t\t\tfont-size: 12px !important;\n\t\t\t}\n\t\t\t.markdown-body h1 {\n\t\t\t\tfont-size: 1.5em;\n\t\t\t}\n\t\t\t\n\t\t\t.markdown-body h2 {\n\t\t\t\tfont-size: 1.25em;\n\t\t\t\tmargin-bottom: 0;\n\t\t\t\tmargin-top: 12px;\n\t\t\t}\n\t\t\t\n\t\t\t:is(h1, h2, h3, h4) + :is(h1, h2, h3, h4) {\n\t\t\t\tmargin-top: 0 !important;\n\t\t\t\tpadding-top: 0 !important;\n\t\t\t}\n\t\t\t\n\t\t\t:is(h1, h2, h3, h4):has(+ :is(h1, h2, h3, h4)) {\n\t\t\t\tmargin-bottom: 0 !important;\n\t\t\t}\n\t\t\t\n\t\t\t:is(h1, h2, h3, h4) + :is(h1, h2, h3, h4)::before {\n\t\t\t\tdisplay: none !important;\n\t\t\t}\n\t\t\t\n\t\t\timg {\n\t\t\t\tmax-width: 15em !important;\n\t\t\t}\n\t\t\t\n\t\t\tabbr[title="Tagesordnungspunkt"]::after {\n\t\t\t\tdisplay: none;\n\t\t\t}\n\t\t\t\n\t\t\t.markdown-body {\n\t\t\t\tfont-size: 10pt;\n\t\t\t\tline-height: 1.125;\n\t\t\t}\n\t\t\t\n\t\t\t.markdown-body blockquote {\n\t\t\t\tfont-size: 10.5pt;\n\t\t\t\tmargin-bottom: 4px;\n\t\t\t}\n\t\t\t  \n\t\t\t.markdown-body li > p {\n\t\t\t\tmargin-top: inherit;\n\t\t\t\tmargin-bottom: inherit;\n\t\t\t}\n\t\t\t\n\t\t\th1, h2,\n\t\t\th2 + ul {\n\t\t\t\tpage-break-before: auto;\n\t\t\t\tbreak-before: auto;\n\t\t\t\tpage-break-after: avoid;\n\t\t\t\tbreak-before: avoid;\n\t\t\t}\n\t\t}\n\t'),s.get([n,"save-trees"]).value&&GM_addStyle("\n\t\t\t@media print {\n\t\t\t\t.markdown-body ul ul,\n\t\t\t\t.markdown-body ol ol {\n\t\t\t\t\tmargin-left: 1em;\n\t\t\t\t}\n\t\t\t}\n\t\t")}),[new l("save-trees",!0)]).setDescription("Add a print style")},391:(t,e,n)=>{const a=n(75),s=n(839),l=n(477),i=(n(13),n(70));t.exports=new s("todo-notes",((t,e,n)=>{GM_addStyle(`\n\t\t.todo-note {\n\t\t\tcolor: ${l.get([n,"default-color"]).value};\n\t\t}\n\n\t\t.todo-text::before {\n\t\t\tcontent: 'TODO: ';\n\t\t\tfont-weight: bold;\n\t\t}\n\n\t\t.todo-text.empty::before {\n\t\t\tcontent: 'TODO';\n\t\t}\n\n\t\t@media print {\n\t\t\t.todo-note {\n\t\t\t\tdisplay: none !important;\n\t\t\t}\n\t\t}\n\t`);const s=(t,e,n,a,s)=>s.renderToken(t,e,n),i=e.renderer.rules.html_block||s,o=e.renderer.rules.html_inline||s,r=/<!--\s*(?:\[TODO\]|TODO):?\s*((?:[^-\s]|-[^-\n]|--[^>\n])(?:[^-\n]|-[^-\n]|--[^>\n])*(?:[^-\s]|-[^-\s]|--[^>\s]) | (?:[^-\s]|-[^-\n]|--[^>\n]))?\s*-->/i;e.renderer.rules.html_block=(t,n,a,s,l)=>{let o=t[n].content;if(o.search(r)<0)return i(t,n,a,s,l);let d="",c=o.search(r);for(;c>=0;){let t=o.match(r);d+=o.slice(0,c),t[1]?d+=`<span class="todo-note"><span class="todo-icon fa fa-sticky-note fa-fw"></span><span class="todo-text">${e.utils.escapeHtml(t[1].trim())}</span></span>`:d+='<span class="todo-note"><span class="todo-icon fa fa-sticky-note fa-fw"></span><span class="todo-text empty"></span></span>',o=o.slice(c+t[0].length),c=o.search(r)}return d+=o,t[n].content=`<p class="part" data-startline="${t[n].map[0]+1}" data-endline="${t[n].map[1]}">${d}</p>`,i(t,n,a,s,l)},e.renderer.rules.html_inline=(t,n,a,s,l)=>{const i=t[n].content.match(r);return i?i[1]?`<span class="todo-note"><span class="todo-icon fa fa-sticky-note fa-fw"></span><span class="todo-text">${e.utils.escapeHtml(i[1].trim())}</span></span>`:'<span class="todo-note"><span class="todo-icon fa fa-sticky-note fa-fw"></span><span class="todo-text empty"></span></span>':o(t,n,a,s,l)};let d=document.createElement("a");d.classList.add("btn","btn-sm","text-uppercase"),d.id="makeTodo",d.innerHTML='<i class="fa fa-sticky-note fa-fw"></i>',d.title="Add TODO note",d.role="button",d.setAttribute("data-toggle","dropdown"),d.setAttribute("aria-haspopup","true"),d.setAttribute("aria-expanded","true"),d.addEventListener("click",(()=>{const e=t.getCursor();cursorInHTMLComment(t,e)?(t.replaceRange("--\x3e\x3c!-- TODO:  --\x3e\x3c!--",e,e),t.setCursor(e.line,e.ch+14)):(t.replaceRange("\x3c!-- TODO:  --\x3e",e,e),t.setCursor(e.line,e.ch+11)),t.focus()})),a.getByQuery(".toolbar .btn-group").then((t=>t.appendChild(d)))}),[new i("default-color","#eda35e").setValidateFn((t=>null!==t.match(/^\#[a-f\d]{3}(?:[a-f\d]{3})?$/gi)))]).setDescription("Highlight TODO notes in the editor")},2:(t,e,n)=>{const a=n(75),s=n(839),l=n(477),i=n(13);n(70),t.exports=new s("visible-comments",((t,e,n)=>{GM_addStyle('\n\t\t.comment {\n\t\t\tuser-select: none;\n\t\t\tfilter: opacity(0.5);\n\t\t\tdisplay: inline;\n\t\t}\n\n\t\t.comment::before,\n\t\t.comment::after {\n\t\t\twhite-space: nowrap;\n\t\t}\n\n\t\t.comment-block {\n\t\t\tdisplay: block;\n\t\t}\n\n\t\t.comment[data-opened="true"] {\n\t\t\tuser-select: auto;\n\t\t}\n\n\t\t.comment[data-opened="true"]::before {\n\t\t\tcontent: \'\x3c!-- \';\n\t\t}\n\n\t\t.comment[data-opened="true"]::after {\n\t\t\tcontent: \' --\x3e\';\n\t\t}\n\n\t\t.comment *:not(.comment-icon) {\n\t\t\tdisplay: none;\n\t\t}\n\n\t\t.comment[data-opened="true"] *:not(.comment-icon) {\n\t\t\tdisplay: initial;\n\t\t}\n\n\t\t.comment[data-opened="true"] .comment-icon {\n\t\t\tdisplay: none;\n\t\t}\n\n\t\t.comment .comment-author {\n\t\t\tfont-style: italic;\n\t\t}\n\n\t\t.comment .comment-author::before {\n\t\t\tcontent: "~";\n\t\t}\n\n\t\t.comment .comment-content::after {\n\t\t\tcontent: " ";\n\t\t}\n\n\t\t@media print {\n\t\t\t.comment {\n\t\t\t\tdisplay: none !important;\n\t\t\t}\n\t\t}\n\t'),l.get([n,"hover-opens-comments"]).value&&GM_addStyle("\n\t\t\n\t\t\t@media (hover: hover) {\n\t\t\t\t.comment:hover {\n\t\t\t\t\tuser-select: auto;\n\t\t\t\t}\n\n\t\t\t\t.comment:hover::before {\n\t\t\t\t\tcontent: '\x3c!-- ';\n\t\t\t\t}\n\n\t\t\t\t.comment:hover::after {\n\t\t\t\t\tcontent: ' --\x3e';\n\t\t\t\t}\n\n\t\t\t\t.comment:hover *:not(.comment-icon) {\n\t\t\t\t\tdisplay: initial;\n\t\t\t\t}\n\n\t\t\t\t.comment:hover .comment-icon {\n\t\t\t\t\tdisplay: none;\n\t\t\t\t}\n\t\t\t}\n\t\t");const s=(t,e,n,a,s)=>s.renderToken(t,e,n),i=e.renderer.rules.html_block||s,o=e.renderer.rules.html_inline||s,r=/<!--\s*((?:[^-\s]|-[^-]|--[^>])(?:[^-]|-[^-]|--[^>])*)\s+~\s*((?:[^~-\s\n]|-[^-\n]|--[^>\n])(?:[^-\n]|-[^-\n]|--[^>\n])*)\s*-->/;e.renderer.rules.html_block=(t,a,s,o,d)=>{let c=t[a].content;if(c.search(r)<0)return i(t,a,s,o,d);let m="",u=c.search(r);for(;u>=0;){let t=c.match(r);m+=c.slice(0,u),m+=`<span class="comment" data-opened="${l.get([n,"comment-opened-default"]).value}"><span class="comment-icon fa fa-comment fa-fw"></span><span class="comment-content">${e.utils.escapeHtml(t[1].trim())}</span><span class="comment-author">${e.utils.escapeHtml(t[2].trim())}</span></span>`,c=c.slice(u+t[0].length),u=c.search(r)}return m+=c,t[a].content=`<p class="part" data-startline="${t[a].map[0]+1}" data-endline="${t[a].map[1]}">${m}</p>`,i(t,a,s,o,d)},e.renderer.rules.html_inline=(t,a,s,i,d)=>{const c=t[a].content.match(r);return c?`<span class="comment" data-opened="${l.get([n,"comment-opened-default"]).value}"><span class="comment-icon fa fa-comment fa-fw"></span><span class="comment-content">${e.utils.escapeHtml(c[1].trim())}</span><span class="comment-author">${e.utils.escapeHtml(c[2].trim())}</span></span>`:o(t,a,s,i,d)},l.get([n,"original-comment-button"]).value||a.getByQuery("#makeComment").then((e=>{$("#makeComment").off("click"),e.addEventListener("click",(()=>{const e=document.querySelector(".ui-user-item").querySelector(".ui-user-name").innerText.split(" ",1)[0],n=t.getCursor();cursorInHTMLComment(t,n)?(t.replaceRange(`--\x3e\x3c!--  ~${e} --\x3e\x3c!--`,n,n),t.setCursor(n.line,n.ch+8)):(t.replaceRange(`\x3c!--  ~${e} --\x3e`,n,n),t.setCursor(n.line,n.ch+5)),t.focus()}))})),document.addEventListener("click",(t=>{let e=t.target;for(;e;)e.classList.contains("comment")&&(e.dataset.opened="true"===e.dataset.opened?"false":"true"),e=e.parentElement}))}),[new i("original-comment-button",!1),new i("comment-opened-default",!1),new i("hover-opens-comments",!0)]).setDescription("Make comments visible in the editor")}},e={};function n(a){var s=e[a];if(void 0!==s)return s.exports;var l=e[a]={exports:{}};return t[a](l,l.exports,n),l.exports}(()=>{const t=n(75),e=n(839),a=n(46),s=n(726),l=n(91),i=n(65),o=n(628),r=n(391),d=n(2);!function(){"use strict";a.register(),s.register(),l.register(),i.register(),o.register(),r.register(),d.register(1),t.addSettingMenu(),t.getCodeMirror().then((n=>t.getMardownIt().then((t=>e.loadAll(n,t)))))}()})()})();