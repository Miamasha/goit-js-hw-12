// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

import axios from "axios";

let key = '41863553-31a4ca98ea592d85823201a44'
var lightbox = new SimpleLightbox('.gallery a', {captionsData: 'alt', captions: true, captionPosition: 'bottom', captionDelay: 250,});

const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader-container"); 
const form = document.querySelector('.search-form');
const loadMoreButton = document.querySelector(".load-more-button");

let page = 1;
let lastSearchText = '';

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    event.stopPropagation();

    gallery.innerHTML = '';
    let searchText = form.elements["searchText"].value;
    if (lastSearchText === searchText) {
        page = page + 1;
    } else {
        page = 1;
    }

    lastSearchText = searchText;
    await loadFromPixabay(searchText, page).then((response) => {
        const jsonData = response.data;
        if (jsonData.hits.length === 0){
            iziToast.warning({message: 'Sorry, there are no images matching your search query. Please try again!', position: 'topRight'});
        }

        if(jsonData.totalHits < page * 40){
            loadMoreButton.style.display = 'none';
        } else { 
            loadMoreButton.style.display = 'block';
        }
        
        loader.style.display = 'none';
        const markup = galleryMarkup(jsonData);
        gallery.innerHTML = markup;
        lightbox.refresh();
    })
    .catch((error) => {
        loader.style.display = 'none';
        iziToast.error({ message: error.message, position: 'topRight' });
    })
});

loadMoreButton.addEventListener('click', async () => {
    page = page + 1;

    await loadFromPixabay(lastSearchText, page).then((response) => {
        const jsonData = response.data;
        if (jsonData.hits.length === 0){
            loadMoreButton.style.display = 'none';
        } else if(jsonData.totalHits < page * 40){
            loadMoreButton.style.display = 'none';
        } else { 
            loadMoreButton.style.display = 'block';
        }
        
        loader.style.display = 'none';

        const markup = galleryMarkup(jsonData);
        gallery.innerHTML += markup;

        const galleryItem = document.querySelector(".gallery li");
        window.scrollBy({ top: galleryItem.getBoundingClientRect().height * 2})
        
        lightbox.refresh();
    })
    .catch((error) => {
        loader.style.display = 'none';
        iziToast.error({ message: error.message, position: 'topRight' });
    })
})

async function loadFromPixabay(search, page){
    loadMoreButton.style.display = "none";
    loader.style.display = 'block';
    return await axios({
        method: 'get',
        url: `https://pixabay.com/api/?key=${key}&q=${search}&page=${page}&per_page=40&image_type=photo&orientation=horizontal&safesearch=true`
    });
}

function galleryMarkup(jsonData){
    return jsonData.hits
            .map((image) => `
                <li class="gallery-item">
                    <a 
                    class="gallery-link" 
                    href="${image.largeImageURL}"      
                    >
                        <img
                        class="gallery-image"
                        src="${image.previewURL}"
                        
                        alt="${image.tags}"
                        width="150"
                        height="100"
                        />
                    
                    <ul class="gallery-item-info">
                        <li>
                            <div class="gallery-item-info-title">Likes</div>
                            <div class="gallery-item-info-value">${image.likes}</div>
                        </li>
                        <li>
                            <div class="gallery-item-info-title">Views</div>
                            <div class="gallery-item-info-value">${image.views}</div>
                        </li>
                        <li>
                            <div class="gallery-item-info-title">Comments</div>
                            <div class="gallery-item-info-value">${image.comments}</div>
                        </li>
                        <li>
                            <div class="gallery-item-info-title">Downloads</div>
                            <div class="gallery-item-info-value">${image.downloads}</div>
                        </li>
                    </ul></a>
                </li>
                `)
            .join("");
}
