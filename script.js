const randomTrackBtn= document.querySelector("#randomTrackBtn");
  let currentMeetings=[];
  
  function loadRandomTrack(){


  fetch("https://api.openf1.org/v1/meetings?year=2026")
  .then(res => res.json())
  .then(meetings => {
  if(!meetings || !meetings.length) return;
  const data=meetings[Math.floor(Math.random() * meetings.length)];
  console.log("Selected track:", data);
const img=document.querySelector("#trackImage");
img.src=data.circuit_image;
document.querySelector("#raceName").innerText = data.meeting_name + " - " + data.location;
  document.querySelector("#nextRaceName").innerText = data.meeting_name;
startCountdown(data.date_start);
if (data.circuit_image)
{
applyThemeColor(data.circuit_image);
  }
})
.catch(err =>console.log("There is a track error!:", err));
  




  }



  
randomTrackBtn.addEventListener("click", loadRandomTrack);
  
window.addEventListener("DOMContentLoaded", loadRandomTrack);


const searchBox=document.querySelector("#searchBox");
const tbody=document.querySelector("#driversTable tbody");
fetch("https://api.openf1.org/v1/drivers?session_key=latest")
.then(res => {
if(!res.ok) throw new Error("Driver API failed!!!!! 😱");
return res.json();
})

.then(drivers=> {
console.log(drivers);
const legend= document.querySelector("#teamLegend");
const teams= {};




drivers.forEach((driver, index) => {
const row =document.createElement("tr");
row.classList.add("driverRow");
row.innerHTML =`
<td>${index + 1}</td>
<td>${driver.full_name}</td>

<td><img src="${driver.headshot_url}" width="65"></td>


<td class="teamCell" style="background:#${driver.team_colour}; color:white;">
${driver.team_name}
</td>


<td>${driver.name_acronym}</td>
`;

row.addEventListener("click", () => {
const panel =document.querySelector("#driverInfo");
panel.innerHTML=
`
<img src="${driver.headshot_url}">
<strong>${driver.full_name}</strong><br>
Team: ${driver.team_name}<br>
Driver Number: ${driver.driver_number}<br>
Acronym: ${driver.name_acronym}`;});

tbody.appendChild(row);
});

})
.catch(err => console.log(err));

searchBox.addEventListener("input", () => {
const value=searchBox.value.toLowerCase();
const rows =document.querySelectorAll(".driverRow");
rows. forEach(row=>{
if(row.innerText.toLowerCase().includes(value))
{row.style.display="";}
else {row.style.display="none";}

});

});

const toggle=document.querySelector("#darkToggle");

toggle.addEventListener("click", () => {
document.body.classList.toggle("dark");


});


const headers= document.querySelectorAll("th[data-col]");
headers.forEach(header=> {
header.addEventListener("click", () => {
const colIndex = header.getAttribute("data-col");
const rows=Array.from(document.querySelectorAll(".driverRow"));
rows.sort((a, b)=> {
const A=a.children[colIndex].innerText.toLowerCase();
const B =b.children[colIndex].innerText.toLowerCase();

if(!isNaN(A) && !isNaN(B)) {
return Number(A) - Number(B);
}
return A.localeCompare(B);


});



const tbody=document.querySelector("#driversTable tbody");
tbody.innerHTML="";
rows.forEach(r=> tbody.appendChild(r));


});




});


function applyThemeColor(imageURL)
{
const img=new Image();
img.crossOrigin="anonymous";
img.src=imageURL;
img.onload=()=>
{
const canvas=document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width=60;
canvas.height=50;
ctx.drawImage(img, 0,0,50,50);
const data=ctx.getImageData(0,0,50,50).data;



let r=0,g=0,b=0,count=0;

for (let i=0; i<data.length; i+= 4){
r+= data[i]
g +=data[i + 1];
b+=data[i+2];
count++;
}
r =Math.floor(r/count);
g= Math.floor(g / count);
b = Math.floor(b/count);
const color = `rgb(${r},${g}, ${b})`;
document.documentElement.style.setProperty("--theme", color);
};


}

let countdownInterval;

function startCountdown(dateString){
clearInterval(countdownInterval);
function update(){

if (!dateString) return;
const now= new Date();
const raceDate=new Date(dateString);
const diff=raceDate- now;
if(diff<=0)
{
document.querySelector("#countdown").innerText ="LIVE NOW!!";
return;}

const days = Math.floor((diff/ (1000*60*60)) % 24);
const hours =Math.floor((diff / (100*60*60)) %60);
const mins = Math.floor((diff/(1000*60))%60);
const secs= Math.floor((diff / 1000)% 60);
document.querySelector("#countdown").innerText = `${days}d ${hours}h ${mins}m ${secs}s`;
}
update();
countdownInterval = setInterval(update, 1000);
}