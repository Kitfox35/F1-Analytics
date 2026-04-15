const tbody = document.querySelector("#driversTable tbody");

// Step 1: get a real session
fetch("https://api.openf1.org/v1/sessions?limit=1")
.then(res => res.json())
.then(session => {

    const sessionKey = session[0].session_key;

    // known driver numbers (you already used these)
    const drivers = [1, 4, 16, 44, 55, 63, 10, 14, 11, 18, 23, 31, 81];

    // Step 2: fetch each driver individually (THIS IS REQUIRED)
    const requests = drivers.map(num =>
        fetch(`https://api.openf1.org/v1/drivers?driver_number=${num}&session_key=${sessionKey}`)
            .then(res => res.json())
            .then(data => data[0])
    );

    return Promise.all(requests);
})
.then(drivers => {

    drivers.forEach((driver, index) => {

        if (!driver) return;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${driver.full_name}</td>
            <td>${driver.team_name}</td>
            <td>${driver.name_acronym}</td>
        `;

        tbody.appendChild(row);
    });

})
.catch(err => console.log("ERROR:", err));