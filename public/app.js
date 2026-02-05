const API_BASE = '/api';
let currentUser = null;

// Navigation
function showView(viewName) {
  document.querySelectorAll('.view').forEach(v => v.style.display = 'none');
  document.getElementById(`${viewName}-view`).style.display = 'block';
  
  if (viewName === 'users') loadUsers();
  if (viewName === 'groups') loadGroups();
}

// Users
async function loadUsers() {
  try {
    const response = await fetch(`${API_BASE}/users`);
    const users = await response.json();
    
    const usersList = document.getElementById('users-list');
    usersList.innerHTML = users.map(user => `
      <div class="user-card" onclick="showUserDetail('${user.id}')">
        <h3>${user.name}</h3>
        <div class="email">${user.email}</div>
        <p>${user.description || 'No description provided'}</p>
        ${user.skills && user.skills.length > 0 ? `
          <div class="skills">
            ${user.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
          </div>
        ` : ''}
        <div style="margin-top: 12px; color: var(--text-muted); font-size: 0.9rem;">
          ${user.endorsements ? user.endorsements.length : 0} endorsements
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading users:', error);
  }
}

async function showUserDetail(userId) {
  try {
    const response = await fetch(`${API_BASE}/users/${userId}`);
    const user = await response.json();
    
    const detailDiv = document.getElementById('user-detail');
    detailDiv.innerHTML = `
      <h2>${user.name}</h2>
      <div class="email">${user.email}</div>
      <p style="margin: 15px 0;">${user.description || 'No description provided'}</p>
      
      ${user.skills && user.skills.length > 0 ? `
        <div>
          <h3>Skills</h3>
          <div class="skills">
            ${user.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
          </div>
        </div>
      ` : ''}
      
      <div class="endorsements">
        <h3>Endorsements (${user.endorsements ? user.endorsements.length : 0})</h3>
        ${user.endorsements && user.endorsements.length > 0 ? user.endorsements.map(e => `
          <div class="endorsement">
            <div class="endorsement-header">
              <div>
                <span class="endorser">${e.endorserName}</span> endorsed
                <span class="endorsement-skill">${e.skill}</span>
              </div>
              <span class="endorsement-date">${new Date(e.createdAt).toLocaleDateString()}</span>
            </div>
            ${e.comment ? `<p>${e.comment}</p>` : ''}
          </div>
        `).join('') : '<p style="color: var(--text-muted);">No endorsements yet</p>'}
      </div>
    `;
    
    document.getElementById('endorsement-user-id').value = userId;
    showView('user-detail');
  } catch (error) {
    console.error('Error loading user detail:', error);
  }
}

async function createUser(event) {
  event.preventDefault();
  
  const name = document.getElementById('user-name').value;
  const email = document.getElementById('user-email').value;
  const description = document.getElementById('user-description').value;
  const skillsInput = document.getElementById('user-skills').value;
  const skills = skillsInput ? skillsInput.split(',').map(s => s.trim()) : [];
  
  try {
    const response = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, description, skills })
    });
    
    if (response.ok) {
      alert('Profile created successfully!');
      document.getElementById('create-user-form').reset();
      showView('users');
    } else {
      const error = await response.json();
      alert('Error: ' + error.error);
    }
  } catch (error) {
    console.error('Error creating user:', error);
    alert('Failed to create profile');
  }
}

async function addEndorsement(event) {
  event.preventDefault();
  
  const userId = document.getElementById('endorsement-user-id').value;
  const endorserName = document.getElementById('endorser-name').value;
  const skill = document.getElementById('endorsement-skill').value;
  const comment = document.getElementById('endorsement-comment').value;
  
  try {
    const response = await fetch(`${API_BASE}/users/${userId}/endorsements`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ endorserName, skill, comment })
    });
    
    if (response.ok) {
      alert('Endorsement added successfully!');
      document.getElementById('endorsement-form').reset();
      showUserDetail(userId);
    } else {
      const error = await response.json();
      alert('Error: ' + error.error);
    }
  } catch (error) {
    console.error('Error adding endorsement:', error);
    alert('Failed to add endorsement');
  }
}

// Groups
async function loadGroups() {
  try {
    const response = await fetch(`${API_BASE}/groups`);
    const groups = await response.json();
    
    const groupsList = document.getElementById('groups-list');
    groupsList.innerHTML = groups.map(group => `
      <div class="group-card">
        <h3>${group.name}</h3>
        <p>${group.description || 'No description'}</p>
        <div class="members">${group.members.length} members</div>
        <button onclick="joinGroup('${group.id}')" class="btn-primary" style="margin-top: 10px;">
          Join Group
        </button>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading groups:', error);
  }
}

function showCreateGroup() {
  document.getElementById('create-group-form').style.display = 'block';
}

function hideCreateGroup() {
  document.getElementById('create-group-form').style.display = 'none';
  document.getElementById('group-name').value = '';
  document.getElementById('group-description').value = '';
}

async function createGroup(event) {
  event.preventDefault();
  
  const name = document.getElementById('group-name').value;
  const description = document.getElementById('group-description').value;
  
  try {
    const response = await fetch(`${API_BASE}/groups`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description })
    });
    
    if (response.ok) {
      alert('Group created successfully!');
      hideCreateGroup();
      loadGroups();
    } else {
      const error = await response.json();
      alert('Error: ' + error.error);
    }
  } catch (error) {
    console.error('Error creating group:', error);
    alert('Failed to create group');
  }
}

async function joinGroup(groupId) {
  const userId = prompt('Enter your user ID to join:');
  if (!userId) return;
  
  try {
    const response = await fetch(`${API_BASE}/groups/${groupId}/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });
    
    if (response.ok) {
      alert('Successfully joined group!');
      loadGroups();
    } else {
      const error = await response.json();
      alert('Error: ' + error.error);
    }
  } catch (error) {
    console.error('Error joining group:', error);
    alert('Failed to join group');
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  showView('home');
  
  // Check for user parameter in URL
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('user');
  if (userId) {
    showUserDetail(userId);
  }
});
