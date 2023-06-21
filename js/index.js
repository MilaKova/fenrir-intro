const today = new Date()
const thisYear = today.getFullYear()
const footer = document.querySelector("footer")
const copyright = document.createElement("p")

copyright.innerHTML = `Mila Kovach &#0169 ${thisYear}`
footer.appendChild(copyright)

const skills = ['Java Script', 'HTML', 'SCC' ]
//const skillsSection = document.getElementById("skills")
const skillsSection = document.querySelector("#skills")

const skillsList = skillsSection.querySelector('ul') 
for (let i = 0; i<skills.length; i++){
    let skill = document.createElement('li')
    skill.innerHTML = skills[i]
    skillsList.appendChild(skill)
}
const messageForm = document.querySelector('[name="leave_message"]');
const messageSection = document.getElementById('messages');
messageSection.hidden = true;
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.usersName.value;
    const email = e.target.usersEmail.value;
    const message = e.target.usersMessage.value;
  console.log("name:", name);
  console.log("email:", email);
  console.log("message:", message);

         //----Display Messages in List

  const messageList = messageSection.querySelector('ul');
  const newMessage = document.createElement('li');
  newMessage.innerHTML =`<a href="mailto:${email}">${name}</a>` + ' wrote: ' + `<span>${message}</span>`;
  
  const removeButton = document.createElement('button');
  removeButton.innerText = 'remove';
  removeButton.type = 'button';
  removeButton.addEventListener('click', () => {
     const entry = removeButton.parentNode;
     entry.remove();
  });
    
  newMessage.append(removeButton);
  messageList.appendChild(newMessage);

  messageSection.hidden = false;

  messageForm.reset();
});