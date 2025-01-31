import app from "./IHDs-Common.js";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

const database = getDatabase(app);
const id = new URLSearchParams(window.location.search).get("id");
const postRef = query(ref(database, "posts/" + id));
onValue(postRef, (snapshot) => {
  const data = snapshot.val();
  // Convert Time
  const d = new Date(data.time);
  const time = d.toDateString();
  let caption = "";
  const caption_block = data.content.blocks;
  for (let i = 0; i < caption_block.length; i++) {
    caption += caption_block[i].data.text + "<br>";
    // console.log(caption_block[i].data.text, "\n");
  }
  // console.log(caption);
  // Display information
  document.querySelector("#info").innerHTML = `
    <img src="${data.thumbnail}" alt="" class="w-full rounded object-cover" />
    <h1 class="text-4xl font-bold leadi md:text-5xl">
      ${data.title}
    </h1>
    <p>${caption}</p>
    <p class="text-sm" style="color:gray">
      by
      <a
        rel="noopener noreferrer"
        href="#"
        target="_blank"
        class="underline text-black"
      >
        <span itemprop="name">${data.name}</span></a
      > on
      <time datetime="${d.toISOString()}">${time}</time>
    </p>
  `;
  console.log(data);

  // Editor ---------------------------------------------------------------------
  //   const editor = new EditorJS({
  //     holder: "editor",
  //     placeholder: "Let`s write an awesome story!",
  //     readOnly: true,
  //     tools: {
  //       header: {
  //         class: Header,
  //       },
  //       image: SimpleImage,
  //       checklist: {
  //         class: Checklist,
  //         inlineToolbar: true,
  //       },
  //       list: {
  //         class: EditorjsList,
  //         inlineToolbar: true,
  //         config: {
  //           defaultStyle: "unordered",
  //         },
  //       },
  //       embed: Embed,
  //       quote: Quote,
  //     },
  //     data: data.content,
  //   });
});
