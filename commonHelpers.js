import{S as h,i as d,a as v}from"./assets/vendor-89feecc5.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function s(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerpolicy&&(i.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?i.credentials="include":t.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(t){if(t.ep)return;t.ep=!0;const i=s(t);fetch(t.href,i)}})();let w="41863553-31a4ca98ea592d85823201a44";var p=new h(".gallery a",{captionsData:"alt",captions:!0,captionPosition:"bottom",captionDelay:250});const y=document.querySelector(".gallery"),n=document.querySelector(".loader-container"),m=document.querySelector(".search-form"),r=document.querySelector(".load-more-button");let o=1,u="";m.addEventListener("submit",async l=>{l.preventDefault(),l.stopPropagation(),y.innerHTML="";let e=m.elements.searchText.value;u===e?o=o+1:o=1,u=e,await g(e,o).then(s=>{const a=s.data;a.hits.length===0&&d.warning({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),a.totalHits<o*40?r.style.display="none":r.style.display="block",n.style.display="none";const t=f(a);y.innerHTML=t,p.refresh()}).catch(s=>{n.style.display="none",d.error({message:s.message,position:"topRight"})})});r.addEventListener("click",async()=>{o=o+1,await g(u,o).then(l=>{const e=l.data;e.hits.length===0||e.totalHits<o*40?r.style.display="none":r.style.display="block",n.style.display="none";const s=f(e);y.innerHTML+=s;const a=document.querySelector(".gallery li");window.scrollBy({top:a.getBoundingClientRect().height*2}),p.refresh()}).catch(l=>{n.style.display="none",d.error({message:l.message,position:"topRight"})})});async function g(l,e){return n.style.display="block",await v({method:"get",url:`https://pixabay.com/api/?key=${w}&q=${l}&page=${e}&per_page=40&image_type=photo&orientation=horizontal&safesearch=true`})}function f(l){return l.hits.map(e=>`
                <li class="gallery-item">
                    <a 
                    class="gallery-link" 
                    href="${e.largeImageURL}"      
                    >
                        <img
                        class="gallery-image"
                        src="${e.previewURL}"
                        
                        alt="${e.tags}"
                        width="150"
                        height="100"
                        />
                    
                    <ul class="gallery-item-info">
                        <li>
                            <div class="gallery-item-info-title">Likes</div>
                            <div class="gallery-item-info-value">${e.likes}</div>
                        </li>
                        <li>
                            <div class="gallery-item-info-title">Views</div>
                            <div class="gallery-item-info-value">${e.views}</div>
                        </li>
                        <li>
                            <div class="gallery-item-info-title">Comments</div>
                            <div class="gallery-item-info-value">${e.comments}</div>
                        </li>
                        <li>
                            <div class="gallery-item-info-title">Downloads</div>
                            <div class="gallery-item-info-value">${e.downloads}</div>
                        </li>
                    </ul></a>
                </li>
                `).join("")}
//# sourceMappingURL=commonHelpers.js.map
