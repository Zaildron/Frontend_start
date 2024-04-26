//const listHolder = document.getElementById("entry");
//
//let entries = localStorage.getItem("entries");
////entries = entries.split(",");
//
//const buttonActions = {
//    'create-entry-line': createEntryLine, 
//}
//
//document.body.addEventListener("click", function(mouseEvent){
//    const customAction = buttonActions[mouseEvent.target.dataset.action];
//    if (!customAction) return;
//
//    mouseEvent.preventDefault();
//    return customAction(mouseEvent);
//}, 
//true);
//
//function createEntryLine(event){
//    const listHolder = document.querySelector(".section__grid"), 
//        newItemHolder = document.createElement("template");
//    newItemHolder.innerHTML = `
//        <div class="section__grid-item"><input style="color: black"></div>
//        <div class="section__grid-item"><input style="color: black"></div>
//        <div class="section__grid-item"><input style="color: black"></div>
//        <div class="section__grid-item"><input style="color: black"></div>
//        <div class="section__grid-item"><input type="file"></div>
//    `;
//
//    listHolder.appendChild(newItemHolder.content);
//
//    entries.push(text);
//}
//
//console.log(items);
//
//localStorage.setItem("entries", entries);