document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".menu-btn");
    const title = document.getElementById("content-title");
    const text = document.getElementById("content-text");
    const contentArea = document.getElementById("dynamic-content");

    // Content Data for Each Section
    const contentData = {
        "pnp-acg": { 
            title: "PNP-ACG Branches", 
            text: "Find Philippine National Police Anti-Cybercrime Group branches near you.",
            ncrBranches: [
                { 
                    name: "Quezon City District Anti-Cybercrime Team (QCDACT)", 
                    contact: "0968-873-5132 / 0927-142-9620",
                    email: "operations.dact@gmail.com / qcpd.act2018@gmail.com / 2018dact@gmail.com",
                    address: "Makadios Street, Corner Maginhawa, Brgy. Sikatuna Village, Quezon City"
                },
                { 
                    name: "Manila District Anti-Cybercrime Team (MDACT)", 
                    contact: "0995-973-2432 / 0968-875-1396",
                    email: "mdact2022@gmail.com",
                    address: "Ground Floor, Manila Police District HQ, UN Ave, Ermita, Manila"
                },
                { 
                    name: "Eastern District Anti-Cybercrime Team (EDACT)", 
                    contact: "0968-859-3183",
                    email: "edact2020@gmail.com",
                    address: "Romulo Building, Sta. Rosa Street, Brgy. Kapitolyo, Pasig City"
                },
                { 
                    name: "Northern District Anti-Cybercrime Team (NDACT)", 
                    contact: "+82-888811-15 local 2217 / +63 928 512 8074",
                    email: "ndact.pnpacg@gmail.com",
                    address: "Northern Police District HQ, Tanigue St, Cor Dagat-Dagatan Ave, Caloocan City"
                },
                { 
                    name: "Southern District Anti-Cybercrime Team (SDACT)", 
                    contact: "+63 956 344 0075 / +63 968-858-9836",
                    email: "pnp.sdact@gmail.com",
                    address: "2nd Floor, SPD Building, Fort Bonifacio, Taguig City"
                }
            ],
            regionalBranches: [
                { name: "PNP-ACG Region 1", address: "San Fernando, La Union", contact: "(072) 607-6586 / acgregion1@pnp.gov.ph" },
                { name: "PNP-ACG Region 2", address: "Tuguegarao City, Cagayan", contact: "(078) 304-1860 / acgregion2@pnp.gov.ph" },
                { name: "PNP-ACG Region 3", address: "Camp Olivas, Pampanga", contact: "(045) 963-7753 / acgregion3@pnp.gov.ph" },
                { name: "PNP-ACG Region 4A", address: "Calamba City, Laguna", contact: "(049) 545-2223 / acgregion4a@pnp.gov.ph" },
                { name: "PNP-ACG MIMAROPA", address: "Calapan City, Oriental Mindoro", contact: "(043) 288-2329 / acgregion4b@pnp.gov.ph" },
                { name: "PNP-ACG Region 5", address: "Legazpi City, Albay", contact: "(052) 742-8155 / acgregion5@pnp.gov.ph" },
                { name: "PNP-ACG Region 6", address: "Iloilo City, Iloilo", contact: "(033) 329-9955 / acgregion6@pnp.gov.ph" },
                { name: "PNP-ACG Region 7", address: "Cebu City, Cebu", contact: "(032) 254-7417 / acgregion7@pnp.gov.ph" },
                { name: "PNP-ACG Region 8", address: "Tacloban City, Leyte", contact: "(053) 832-0405 / acgregion8@pnp.gov.ph" },
                { name: "PNP-ACG Region 9", address: "Pagadian City, Zamboanga del Sur", contact: "(062) 215-3677 / acgregion9@pnp.gov.ph" },
                { name: "PNP-ACG Region 10", address: "Cagayan de Oro City, Misamis Oriental", contact: "(088) 857-2955 / acgregion10@pnp.gov.ph" },
                { name: "PNP-ACG Region 11", address: "Davao City, Davao del Sur", contact: "(082) 224-1625 / acgregion11@pnp.gov.ph" },
                { name: "PNP-ACG Region 12", address: "General Santos City, South Cotabato", contact: "(083) 552-9735 / acgregion12@pnp.gov.ph" },
                { name: "PNP-ACG CAR", address: "Baguio City, Benguet", contact: "(074) 422-5515 / acgcar@pnp.gov.ph" },
                { name: "PNP-ACG ARMM", address: "Cotabato City, Maguindanao", contact: "(064) 421-2552 / acgarmm@pnp.gov.ph" },
                { name: "PNP-ACG CARAGA", address: "Butuan City, Agusan del Norte", contact: "(085) 342-6177 / acgcaraga@pnp.gov.ph" }
            ],
            otherContacts: [
                { 
                    name: "NBI Cybercrime Division", 
                    contact: "(632) 8523-8231", 
                    email: "ccd@nbi.gov.ph", 
                    address: "NBI Headquarters, 3rd Floor, JDC Center Building, No. 571 Engracia Cruz-Reyes Street, Ermita, Manila, Philippines 1000"
                },
                { 
                    name: "DOJ Office of Cybercrime", 
                    contact: "(632) 8523-8481", 
                    email: "cybercrime@doj.gov.ph", 
                    address: "DOJ Main Building, Padre Faura St, Ermita, Manila"
                },
                { 
                    name: "CICC (Cybercrime Investigation & Coordination Center)", 
                    contact: "1326", 
                    email: "complaints@cicc.gov.ph", 
                    address: "DICT Complex, C.P. Garcia Avenue, Diliman, Quezon City"
                },
                { 
                    name: "National Privacy Commission (NPC)", 
                    contact: "(632) 8234-2228", 
                    email: "info@privacy.gov.ph", 
                    address: "5th Floor, Delegation Building, PICC Complex, Pasay City"
                },
                { 
                    name: "DICT Cybersecurity Bureau", 
                    contact: "(632) 8920-0101", 
                    email: "cybersecurity@dict.gov.ph", 
                    address: "DICT Central Office, C.P. Garcia Ave, Diliman, Quezon City"
                }
            ]
        },
        "devcontacts": { 
            title: "The Developer Team Contacts", 
            text: "For support or collaboration, contact the development team.", 
            members: [
                { 
                    name: "Hanst Diether B. Abalos", 
                    role: "Team Leader / Researcher", 
                    email: "abaloshb@students.national-u.edu.ph" 
                },
                { 
                    name: "John Russell M. Castillo", 
                    role: "AI Chatbot Model Developer", 
                    email: "castillojm@students.national-u.edu.ph" 
                },
                { 
                    name: "Joshua M. Dia", 
                    role: "Frontend / Backend Developer", 
                    email: "diajm@students.national-u.edu.ph" 
                },
                { 
                    name: "Farrah V. Montalban", 
                    role: "Main UI/UX Designer", 
                    email: "montalbanfv@students.national-u.edu.ph" 
                },
                { 
                    name: "Vlademer Zane A. So", 
                    role: "Main Frontend Developer / Designer", 
                    email: "sova@students.national-u.edu.ph" 
                }
            ]
        },
        "offline": { 
            title: "Downloadable Materials",  
            text: "Access and download offline resources here.",
            files: [
                { name: "Cybercrime Awareness Infographic", url: "/downloadables/cybercrime-infographic.pdf" },
                { name: "ClickSmart Research Thesis", url: "/downloadables/clicksmart-thesis.pdf" }
            ]
        },
        "projects": { 
            title: "Cybercrime Prevention Projects", 
            text: "This section is still under development." 
        }
    };

      // Event Listener for Buttons
      buttons.forEach(button => {
        button.addEventListener("click", function () {
            const selectedContent = contentData[this.dataset.content];

            if (selectedContent) {
                title.textContent = selectedContent.title;
                text.textContent = selectedContent.text;
                contentArea.innerHTML = ""; // Clear previous content

                // **If Developer Team is selected, display team members**
                if (selectedContent.members) {
                    const memberList = document.createElement("div");
                    memberList.classList.add("contact-list");
                    memberList.innerHTML = "<h3>Meet the Development Team</h3>";
                    memberList.innerHTML += "<hr>";

                    const memberGrid = document.createElement("div");
                    memberGrid.classList.add("ncr-contact-grid");

                    selectedContent.members.forEach(member => {
                        const memberItem = document.createElement("div");
                        memberItem.classList.add("contact-item");
                        memberItem.innerHTML = `
                            <h4>${member.name}</h4>
                            <p><strong>Role:</strong> ${member.role}</p>
                            <p><strong>Email:</strong> <a href="mailto:${member.email}" class="email-link">${member.email}</a></p>
                        `;
                        memberGrid.appendChild(memberItem);
                    });

                    memberList.appendChild(memberGrid);
                    contentArea.appendChild(memberList);
                    return; // Prevent other sections from executing when Developer Team is selected
                }

                // **If PNP-ACG is selected, display branches**
                if (selectedContent.ncrBranches) {
                    const ncrList = document.createElement("div");
                    ncrList.classList.add("contact-list");
                    ncrList.innerHTML = "<h3>PNP-ACG Contact List (NCR)</h3>";
                    ncrList.innerHTML += "<hr>";

                    const ncrGrid = document.createElement("div");
                    ncrGrid.classList.add("ncr-contact-grid");

                    selectedContent.ncrBranches.forEach(branch => {
                        const contactItem = document.createElement("div");
                        contactItem.classList.add("contact-item");
                        contactItem.innerHTML = `
                            <h4>${branch.name}</h4>
                            <p><strong>Contact:</strong> ${branch.contact}</p>
                            <p><strong>Email:</strong> ${branch.email}</p>
                            <p><strong>Address:</strong> ${branch.address}</p>
                        `;
                        ncrGrid.appendChild(contactItem);
                    });

                    ncrList.appendChild(ncrGrid);
                    
                    // **Add Source Link Below the NCR Contacts**
                    const sourceLink = document.createElement("p");
                    sourceLink.classList.add("source-link");
                    sourceLink.innerHTML = `Source: <a href="https://acg.pnp.gov.ph/contact-us/" target="_blank">PNP-ACG Official Website</a>`;
                    ncrList.appendChild(sourceLink);

                    contentArea.appendChild(ncrList);
                    contentArea.innerHTML += "<hr>";
                }

                // **If regional branches exist, display them**
                if (selectedContent.regionalBranches) {
                    const regionalList = document.createElement("div");
                    regionalList.classList.add("contact-list");
                    regionalList.innerHTML = "<h3>PNP-ACG Regional Contact List</h3>";
                    regionalList.innerHTML += "<hr>";
                
                    const regionalGrid = document.createElement("div");
                    regionalGrid.classList.add("ncr-contact-grid");
                
                    selectedContent.regionalBranches.forEach(branch => {
                        const contactItem = document.createElement("div");
                        contactItem.classList.add("contact-item");
                        contactItem.innerHTML = `
                            <h4>${branch.name}</h4>
                            <p><strong>Address:</strong> ${branch.address}</p>
                            <p><strong>Contact:</strong> ${branch.contact}</p>
                        `;
                        regionalGrid.appendChild(contactItem);
                    });
                
                    regionalList.appendChild(regionalGrid);
                    
                
                    const sourceLink = document.createElement("p");
                    sourceLink.classList.add("source-link");
                    sourceLink.innerHTML = `Source: <a href="https://acg.pnp.gov.ph/contact-us/" target="_blank">PNP-ACG Official Website</a>`;
                    regionalList.appendChild(sourceLink);
                
                    contentArea.appendChild(regionalList);
                    contentArea.innerHTML += "<hr>";
                }

                // **If cybercrime-related agencies exist, display them**
                if (selectedContent.otherContacts) {
                    const agencyList = document.createElement("div");
                    agencyList.classList.add("contact-list");
                    agencyList.innerHTML = "<h3>Other Cybercrime-Related Agencies in the Philippines</h3>";
                    agencyList.innerHTML += "<hr>";

                    const agencyGrid = document.createElement("div");
                    agencyGrid.classList.add("ncr-contact-grid");

                    selectedContent.otherContacts.forEach(agency => {
                        const agencyItem = document.createElement("div");
                        agencyItem.classList.add("contact-item");
                        agencyItem.innerHTML = `
                            <h4>${agency.name}</h4>
                            <p><strong>Contact:</strong> ${agency.contact}</p>
                            <p><strong>Email:</strong> ${agency.email}</p>
                            <p><strong>Address:</strong> ${agency.address}</p>
                        `;
                        agencyGrid.appendChild(agencyItem);
                    });

                    agencyList.appendChild(agencyGrid);
                    contentArea.appendChild(agencyList);
                    contentArea.innerHTML += "<hr>";
                }

                // **If Offline Resources is selected, show download links**
                if (selectedContent.files) {
                    const fileList = document.createElement("ul");
                    fileList.classList.add("file-list");

                    selectedContent.files.forEach(file => {
                        const listItem = document.createElement("li");
                        listItem.innerHTML = `<a href="${file.url}" target="_blank" class="download-link">${file.name}</a>`;
                        fileList.appendChild(listItem);
                    });

                    contentArea.appendChild(fileList);
                    contentArea.innerHTML += "<hr>";
                }
            }
        });
    });
});