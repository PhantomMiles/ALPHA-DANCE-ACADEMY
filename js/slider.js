const sliders = [
    "./img/bg-img1.jpg",
    "./img/bg-img2.jpg",
    "./img/bg-img3.jpg",
    "./img/bg-img4.jpg",
    "./img/bg-img5.jpg",
]

const slide = document.getElementById('slide');

setInterval(() => {
    const randomPic = sliders[Math.floor(Math.random() * (sliders.length - 1))]
    console.log(randomPic)
    slide.style.backgroundImage = `url(${randomPic})`;
    slide.style.backgroundRepeat = "no-repeat";
    slide.style.backgroundSize = "cover";
    slide.style.backgroundPosition = "center";
    slide.style.backgroundAttachment = "fixed";
    slide.style.backgroundBlendMode = "darken";
    slide.style.backgroundColor = "rgba(0, 0, 0, 0.678)";
    slide.style.transition = "all 0.5s";
}, 5000);