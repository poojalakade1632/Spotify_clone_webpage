console.log("welcome to spotify");

//initialize the variable

let songIndex=0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay =  document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songitem =Array.from( document.getElementsByClassName('songitem'))


let songs=[
    {songName: "Love U Zindagi",filepath:"songs/1.mp3",coverpath:"images2/1.webp"},
    {songName: "Bhagere Man Kahi",filepath:"songs/2.mp3",coverpath:"images2/2.jpg"},
    {songName: "Kesariya/Lofi",filepath:"songs/3.mp3",coverpath:"images2/3.webp"},
    {songName: "Jaduii",filepath:"songs/4.mp3",coverpath:"images2/4.webp"},
    {songName: "Mileya Mileya",filepath:"songs/5.mp3",coverpath:"images2/5.jpg"},
    {songName: "Jhoome Jo Pathaan",filepath:"songs/6.mp3",coverpath:"images2/6.webp"},
    {songName: "Chedkhaniya",filepath:"songs/7.mp3",coverpath:"images2/7.webp"}
]

songitem.forEach((element, i)=>{
   // console.log(element , i);
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//audioElement.play()
//handle playpause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

//listen to events
audioElement.addEventListener('timeupdate', ()=>{
   // console.log('timeupdate');

    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
   // console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays =()=>{
     Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play')
    })

}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        //console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id)
        masterSongName.innerText = songs[songIndex].songName;
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById("next").addEventListener('click', ()=>{
    if(songIndex>=6){
        songIndex=0
    }
    else{
        songIndex +=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById("previous").addEventListener('click', ()=>{
    if(songIndex<0){
        songIndex=0
    }
    else{
        songIndex -=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})