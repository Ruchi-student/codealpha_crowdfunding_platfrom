let projects = [];

function createProject() {
  const name = document.getElementById('projectName').value.trim();
  const goal = parseFloat(document.getElementById('goalAmount').value);
  const description = document.getElementById('description').value.trim();

  if (!name || !goal || !description) return alert('Please fill all fields');

  const project = {
    id: Date.now(),
    name,
    goal,
    raised: 0,
    description,
    updates: [],
  };

  projects.push(project);
  displayProjects();
  clearForm();
}

function clearForm() {
  document.getElementById('projectName').value = '';
  document.getElementById('goalAmount').value = '';
  document.getElementById('description').value = '';
}

function displayProjects() {
  const list = document.getElementById('projectList');
  list.innerHTML = '';

  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';

    card.innerHTML = `
      <h3>${project.name}</h3>
      <p><strong>Description:</strong> ${project.description}</p>
      <p><strong>Goal:</strong> $${project.goal} | <strong>Raised:</strong> $${project.raised}</p>
      <input type="number" id="contribute-${project.id}" placeholder="Amount ($)" />
      <button onclick="contribute(${project.id})">Contribute</button>
      <br><br>
      <textarea id="update-${project.id}" placeholder="Post an update..."></textarea>
      <button onclick="postUpdate(${project.id})">Post Update</button>
      <div>
        <h4>Updates:</h4>
        <ul id="updates-${project.id}"></ul>
      </div>
    `;

    list.appendChild(card);
    renderUpdates(project.id);
  });
}

function contribute(id) {
  const input = document.getElementById(`contribute-${id}`);
  const amount = parseFloat(input.value);
  if (!amount || amount <= 0) return alert('Invalid amount');

  const project = projects.find(p => p.id === id);
  project.raised += amount;

  displayProjects();
}

function postUpdate(id) {
  const textarea = document.getElementById(`update-${id}`);
  const message = textarea.value.trim();
  if (!message) return;

  const project = projects.find(p => p.id === id);
  project.updates.push({ message, time: new Date().toLocaleString() });

  textarea.value = '';
  renderUpdates(id);
}

function renderUpdates(id) {
  const project = projects.find(p => p.id === id);
  const ul = document.getElementById(`updates-${id}`);
  ul.innerHTML = '';

  project.updates.forEach(update => {
    const li = document.createElement('li');
    li.textContent = `${update.time} - ${update.message}`;
    ul.appendChild(li);
  });
}
