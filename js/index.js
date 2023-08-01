//---Insert Copyright Text in Footer
const today = new Date();
const thisYear = today.getFullYear();
const footer = document.querySelector("footer");
const copyright = document.createElement("p");

copyright.innerHTML = `Mila Kovach &#0169 ${thisYear}`;
footer.appendChild(copyright);

//---Add Skills Section
const skills = ["Java Script", "HTML", "CSS", "Git"];
const skillsSection = document.querySelector("#skills");

const skillsList = skillsSection.querySelector("ul");
for (let i = 0; i < skills.length; i++) {
  let skill = document.createElement("li");
  skill.innerHTML = skills[i];
  skillsList.appendChild(skill);
}

//---Handle Message Form Submit
const messageForm = document.querySelector('[name="leave_message"]');
const messageSection = document.getElementById("messages");
messageSection.hidden = true;

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target.usersName.value;
  const email = e.target.usersEmail.value;
  const message = e.target.usersMessage.value;
  console.log("name:", name);
  console.log("email:", email);
  console.log("message:", message);

//----Display Messages in List
  const messageList = messageSection.querySelector("ul");
  const newMessage = document.createElement("li");
  const messagesHeader = messageSection.querySelector("h2");
  newMessage.innerHTML =
    `<a href="mailto:${email}">${name}</a>` +
    " wrote: " +
    `<span>${message}</span>`;

//--- create edit button
  const editButton = document.createElement("button");
  editButton.innerText = "edit";
  editButton.type = "button";

  editButton.addEventListener("click", (e) => {
    const button = e.target;
    const entry = editButton.parentNode;

    if (button.innerText === "edit") {
      const message = entry.querySelector("span");
      const input = document.createElement("input");
      input.type = "text";
      input.value = message.innerText;

      message.after(input);
      message.remove();

      button.innerText = "save";
    } else {
      const input = entry.querySelector("input");
      const message = document.createElement("span");
      message.innerText = input.value;

      input.after(message);
      input.remove();

      button.innerText = "edit";
    }
  });

//--- create remove button

  const removeButton = document.createElement("button");
  // removeButton.innerText = 'remove';
  removeButton.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
  removeButton.type = "button";

  removeButton.addEventListener("click", () => {
    const entry = removeButton.parentNode;
    entry.remove();
    if (messageList.childNodes.length === 0) {
      messagesHeader.style.visibility = "hidden";
    }
  });
  
  newMessage.append(removeButton);
  newMessage.appendChild(editButton);
  messageList.appendChild(newMessage);
  messageSection.hidden = false;
  messageForm.reset();
});

//----AJAX
// let githubRequest = new XMLHttpRequest();
// githubRequest.open('GET', "https://api.github.com/users/MilaKova/repos");
// githubRequest.send();

// githubRequest.addEventListener('load',function(){
//   const repositories = JSON.parse(this.response);
//   console.log("repositories:", repositories)
//   const projectSection = document.getElementById('projects');
//   const projectList = projectSection.querySelector('ul');
//     for (let i = 0; i < repositories.length; i++){
//       let project = document.createElement('li');
//       project.innerHTML = `<a href='${repositories[i].html_url}'>${repositories[i].name}</a>`;
//       projectList.appendChild(project);
//     }
// });

//---Fetch

fetch("https://api.github.com/users/MilaKova/repos")
  .then((response) => response.json())
  .then((repositories) => {
    const projectSection = document.getElementById("projects");
    const projectList = projectSection.querySelector("ul");
    for (let i = 0; i < repositories.length; i++) {
      let project = document.createElement("li");
      project.innerHTML = `<a href='${repositories[i].html_url}'>${repositories[i].name}</a>`;
      projectList.appendChild(project);
    }
  })
  .catch(function (err) {
    console.log("Error:", err);
  });
