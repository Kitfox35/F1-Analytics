const searchBox=document.querySelector("#searchBox");
const tbody=document.querySelector("#driversTable tbody");
fetch("https://api.openf1.org/v1/drivers?session_key=latest")
.then(res => res.json())
.then(drivers=> {
console.log(drivers);
drivers.forEach((driver, index) => {
const row =document.createElement("tr");
row.classList.add("driverRow");
row.innerHTML =`
<td>${index +1}</rd>
<td>${driver.full_name}</td>

<td><img src="${driver.headshot_url}" width="65"></td>


<td class="teamCell" style="background:#${driver.team_colour}; color:white;">
${driver.team_name}
</td>


<td>${driver.name_acronym}</td>
`;


row.addEventListener("click", ()=>{
  alert(`${driver.full_name}\nTeam: ${driver.team_name}\nNumber: ${driver.driver_number}`);  
    
    
    });

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