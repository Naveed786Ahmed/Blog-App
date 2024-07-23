import { storage, ref, uploadBytesResumable, getDownloadURL, db, collection, addDoc } from "./blogfirebase.js"

const goBack = document.getElementById("goBack");
const sendBtn = document.getElementById("sendBtn");
const errors = document.getElementById("error");
const succ = document.getElementById("succ");

function errorMessClose() {
    errors.style.display = "none"
}

function succMessClose() {
    succ.style.display = "none"
}

goBack.addEventListener("click", () => {
    location.pathname = '/pages/blog%20app/adminDashboard.html'
})

const sendBtnFux = () => {
    const file = document.getElementById("file");
    const fileName = file.files[0].name
    const fileObj = file.files[0]

    const storageRef = ref(storage, 'images/' + fileName);

    const uploadTask = uploadBytesResumable(storageRef, fileObj);

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            console.log(error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                const title = document.getElementById("title");
                const author = document.getElementById("author");
                const date = document.getElementById("date");
                const Blogcontent = document.getElementById("Blogcontent");
                try {
                    const docRef = await addDoc(collection(db, "blog"), {
                        title: title.value,
                        author: author.value,
                        date: date.value,
                        Blogcontent: Blogcontent.value,
                        image: downloadURL
                    });
                    succ.style.display = "block"
                    succ.innerHTML = "Upload Blog Successfully"
                    setTimeout(succMessClose, 1500);
                    console.log("Document written with ID: ", docRef.id);
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            });
        }
    );
}

sendBtn.addEventListener("click", sendBtnFux)