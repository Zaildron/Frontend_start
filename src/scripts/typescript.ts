var imgs = document.querySelectorAll(".image__toggled");
    imgs.forEach((img) => {
            img.addEventListener("click", toggleImage);
        }
    )
function toggleImage(event) {
    var img =event.target;
        img.classList.toggle("image_toggled__on");
    }