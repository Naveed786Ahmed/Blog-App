import { db, collection, getDocs, doc, getDoc } from "../pages/blog app/blogfirebase.js"

const cardsRow = document.getElementById("cardsRow");

const showCards = async () => {
    const querySnapshot = await getDocs(collection(db, "blog"));
    querySnapshot.forEach((item) => {
        cardsRow.innerHTML += `
            <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 col-xxl-3">
                <div class="card cards" style="width: 19rem; height: 22rem">
                    <div class="imgsCard">
                        <img src="${item.data().image}" class="card-img-top cardImg" alt="...">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title cardsHead">${item.data().title}</h5>
                        <div class="authPub">
                            <p class="parahsame">${item.data().author}</p>
                            <p class="parahsame">${item.data().date}</p>
                        </div>
                        <div class="btnSee">
                            <div class="btn seeMore" onclick = "fetchData('${item.id}')">See More</div>
                        </div>
                    </div>
                </div>
            </div>
        `
    });
}
showCards()

async function fetchData(id) {
    const navBarDiv = document.getElementById("navBarDiv");
    const bannaDiv = document.getElementById("bannaDiv");
    const cardContainerDiv = document.getElementById("cardContainerDiv");
    const footerDiv = document.getElementById("footerDiv")
    const contentBlogContDiv = document.getElementById("contentBlogContDiv");

    navBarDiv.style.display = "none";
    bannaDiv.style.display = "none";
    cardContainerDiv.style.display = "none";
    footerDiv.style.display = "none";
    contentBlogContDiv.style.display = "flex";

    const docRef = doc(db, "blog", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        contentBlogContDiv.innerHTML = `
            <div class="card" style="width: 60rem; height: auto;">
            <div class="card-body createCard">
                <h5 class="card-title createHead"><i class="fa-solid fa-backward" onclick="goBack()"></i>BLOG</h5>
                <div class="contentImgs">
                    <img src="${docSnap.data().image}" alt="" width="100%" height="100%">
                </div>
                <h1 class="contentHead">${docSnap.data().title}</h1>
                <div class="contentDateAuthor">
                    <div class="contentAuthor">${docSnap.data().author}</div>
                    <div class="contentpub">${docSnap.data().date}</div>
                </div>
                <div class="contentMainText">
                     ${docSnap.data().Blogcontent}
                </div>

                <div class="comments-head">
                    COMMENTS
                </div>
                <div class="nameEmail">
                    <input type="text" class="inputss" placeholder="Name (required)">
                    <input type="text" class="inputss" placeholder="Email (required)">
                </div>
                <div class="commentss">
                    <textarea name="" placeholder="Write your comment..."></textarea>
                </div>
                <div class="btn post">
                    Post Comment
                </div>
            </div>
        </div>
        `

    } else {
        console.log("No such document!");
    }
}

function goBack(){
    const navBarDiv = document.getElementById("navBarDiv");
    const bannaDiv = document.getElementById("bannaDiv");
    const cardContainerDiv = document.getElementById("cardContainerDiv");
    const footerDiv = document.getElementById("footerDiv")
    const contentBlogContDiv = document.getElementById("contentBlogContDiv");

    contentBlogContDiv.style.display = "none";
    navBarDiv.style.display = "flex";
    bannaDiv.style.display = "flex";
    cardContainerDiv.style.display = "flex";
    footerDiv.style.display = "flex";
}

window.fetchData = fetchData;
window.goBack = goBack;