import { auth, signOut, db, getDocs, collection, doc, deleteDoc } from "./blogfirebase.js"

const logOutBtn = document.getElementById("logOutBtn");
const CreateBlog = document.getElementById("CreateBlog");
const tableBody = document.getElementById("tableBody");

const logOutBtnfux = () => {
    signOut(auth).then(() => {
        alert(`Successfully LogOut!`);
        location.pathname = `/pages/blog%20app/blog.html`

    }).catch((error) => {
        console.log(error);
    });
}

const CreateBlogFux = () => {
    location.pathname = '/pages/blog%20app/createblog.html'
}

const getData = async () => {
    let count = 0
    const querySnapshot = await getDocs(collection(db, "blog"));
    querySnapshot.forEach((item) => {
        tableBody.innerHTML += `
                <tr class="table-warning">
                    <th scope="row">${count += 1}</th>
                    <td class="title">${item.data().title}</td>
                    <td>${item.data().author}</td>
                    <td>${item.data().date}</td>
                    <td><div class="btn btn-danger" onclick = "deleteFux('${item.id}')">delete</div></td>
                </tr>
        `
    });
}

getData()

async function deleteFux(id) {
    await deleteDoc(doc(db, "blog", id));
    location.reload()
}

logOutBtn.addEventListener("click", logOutBtnfux)
CreateBlog.addEventListener("click", CreateBlogFux)

window.deleteFux = deleteFux