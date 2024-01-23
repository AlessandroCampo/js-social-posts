
// Milestone 1 - Creiamo il nostro array di oggetti che rappresentano ciascun post.
// Ogni post dovrà avere le informazioni necessarie per stampare la relativa card:
// - id del post, numero progressivo da 1 a n
// - nome autore,
// - foto autore,
// - data in formato americano (mm-gg-yyyy),
// - testo del post,
// - immagine (non tutti i post devono avere una immagine),
// - numero di likes.
// Non è necessario creare date casuali
// Per le immagini va bene utilizzare qualsiasi servizio di placeholder ad es. Unsplash (https://unsplash.it/300/300?image=<id>)
// Milestone 2 - Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.
// Milestone 3 - Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
// Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.
// BONUS:
// Formattare le date in formato italiano (gg/mm/aaaa)
// Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Luca Formicola > LF).
// Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.

const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": null
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

const body = document.querySelector("body")
const likedPosts = []

posts.forEach((post, index) => {
    let nameAndSurname = post.author.name
    let startingLetters = nameAndSurname.split(" ")[0].charAt(0) + nameAndSurname.split(" ")[1].charAt(0);
    let tag
    tag = post.author.image === null ? tag = `<h1 class ="fallback"> ${startingLetters} </h1>` : tag = `  <div style="background-image: url(${post.author.image});"
    class="w-[50px] h-[50px] bg-black rounded-full cursor-pointer"></div>`
    body.innerHTML += `<div class="card bg-slate-50 mx-auto w-1/3 mt-5 p-3 flex flex-col gap-4">
    <div class="card-info flex gap-5 items-center">
        ${tag}
        <p class="flex flex-col">
            <span class="font-bold text-sm"> ${post.author.name}</span>
            <span class="text-xs"> ${formatDateString(post.created)}</span>
        </p>
    </div>
    <p class="text text-xs">
        ${post.content}
    </p>
    <figure>
        <img src="${post.media}" alt="" srcset="">
    </figure>
    <div class="button-container flex justify-around py-3">
        <div class="like text-xs font-bold cursor-pointer">
            <i class="fa-solid fa-thumbs-up"></i>
            <span> Mi Piace </span>
        </div>
        <div class="text-xs">
            Piace a <span class="font-bold like-counter">${post.likes}</span> persone
        </div>
    </div>

</div>`
})

function formatDateString(inputDate) {
    // Split the input date string into parts
    var parts = inputDate.split('-');

    // Format the date as DD MM YYYY
    var formattedDate = parts[2] + '-' + parts[1] + '-' + parts[0];

    return formattedDate;
}


const likeButtons = document.querySelectorAll("div.like")

likeButtons.forEach((button, index) => {
    button.addEventListener("click", (e) => {
        button.classList.toggle("text-green-800")
        const likeCounter = button.parentElement.querySelector("span.like-counter")
        button.classList.contains("text-green-800") ? posts[index].likes++ : posts[index].likes--
        likeCounter.innerText = `${posts[index].likes}`
        if (!likedPosts.includes((posts[index].id))) {
            likedPosts.push(posts[index].id)
        } else {
            let postIndex = likedPosts.indexOf(posts[index].id)
            likedPosts.splice(postIndex, 1)
        }
        console.log(likedPosts)

    })
})