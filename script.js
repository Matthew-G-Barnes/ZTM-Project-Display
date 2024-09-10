const projectContainer = document.getElementById('project-container')

const username = 'Matthew-G-Barnes'
const apiUrl = `https://api.github.com/users/${username}/repos`

const githubInfo = []

// Retrives Repository info from gitup
async function fetchInfo() {
    try {
        const response = await fetch(apiUrl);
        let data = await response.json()
        data.forEach((item) => {
            // console.log(item);
            
            if (item.topics.includes('ztm-projects')) {
                githubInfo.push(item)
                console.log(item);
            } else {
                console.log(item.name + ' does not contain the required topic');
            }
        })
    } catch (error) {
        console.log(error);
    }
    console.log(githubInfo);
    createInfoBox();
}

// Generates project items
function createInfoBox() {
    // Retrives Github info and generates display elements
    githubInfo.forEach((item) => {
        const {name, homepage, html_url, description} = item
        // Item Container
        const itemContainer = document.createElement('div')
        itemContainer.classList.add('item-container')
        // Github link
        const githublink = document.createElement('a')
        githublink.setAttribute('href', `${html_url}`)
        githublink.setAttribute('target', '_blank')
        // Github icon
        const githubIcon = document.createElement('i')
        githubIcon.className = 'fab fa-github'
        // Project Title
        const title = document.createElement('a')
        title.setAttribute('href', `${homepage}`)
        title.setAttribute('target', '_blank')
        title.textContent = name
        // Description
        const info = document.createElement('h3')
        info.textContent = description
        // Append Elements
        githublink.append(githubIcon)
        itemContainer.append(githublink, title, info)
        projectContainer.appendChild(itemContainer)
    })
}


// On load
fetchInfo();