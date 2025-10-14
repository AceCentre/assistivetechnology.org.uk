const tabButtons = Array.from(document.querySelectorAll('[role="tab"][data-panel]'));
const tabPanels = Array.from(document.querySelectorAll('.tab-panel'));

function setActiveTab(targetId, { focus = true } = {}) {
  if (!targetId) {
    return;
  }

  const targetPanel = document.getElementById(targetId);
  const targetButton = tabButtons.find((button) => button.dataset.panel === targetId);

  if (!targetPanel || !targetButton) {
    return;
  }

  tabButtons.forEach((button) => {
    const isActive = button === targetButton;
    button.setAttribute('aria-selected', String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });

  tabPanels.forEach((panel) => {
    if (panel === targetPanel) {
      panel.removeAttribute('hidden');
    } else {
      panel.setAttribute('hidden', '');
    }
  });

  if (focus) {
    targetButton.focus();
  }
}

function getPanelIdFromHash() {
  const hash = window.location.hash.replace('#', '');
  return hash && tabPanels.some((panel) => panel.id === hash) ? hash : null;
}

function handleTabClick(event) {
  const button = event.currentTarget;
  setActiveTab(button.dataset.panel);
  history.replaceState(null, '', `#${button.dataset.panel}`);
}

function handleKeyNavigation(event) {
  const { key } = event;
  const currentIndex = tabButtons.indexOf(event.currentTarget);
  if (currentIndex === -1) {
    return;
  }

  if (key === 'ArrowRight' || key === 'ArrowDown') {
    event.preventDefault();
    const nextIndex = (currentIndex + 1) % tabButtons.length;
    setActiveTab(tabButtons[nextIndex].dataset.panel);
    history.replaceState(null, '', `#${tabButtons[nextIndex].dataset.panel}`);
  } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
    event.preventDefault();
    const prevIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;
    setActiveTab(tabButtons[prevIndex].dataset.panel);
    history.replaceState(null, '', `#${tabButtons[prevIndex].dataset.panel}`);
  } else if (key === 'Home') {
    event.preventDefault();
    setActiveTab(tabButtons[0].dataset.panel);
    history.replaceState(null, '', `#${tabButtons[0].dataset.panel}`);
  } else if (key === 'End') {
    event.preventDefault();
    const lastButton = tabButtons[tabButtons.length - 1];
    setActiveTab(lastButton.dataset.panel);
    history.replaceState(null, '', `#${lastButton.dataset.panel}`);
  }
}

function activateFromLink(event) {
  const link = event.currentTarget;
  const panelId = link.dataset.panelTrigger || link.getAttribute('href').replace('#', '');
  if (!panelId) {
    return;
  }
  if (tabPanels.some((panel) => panel.id === panelId)) {
    event.preventDefault();
    setActiveTab(panelId);
    history.replaceState(null, '', `#${panelId}`);
  }
}

tabButtons.forEach((button) => {
  button.addEventListener('click', handleTabClick);
  button.addEventListener('keydown', handleKeyNavigation);
});

const tabLinks = Array.from(document.querySelectorAll('.primary-link-tab, [data-panel-trigger]'));
tabLinks.forEach((link) => link.addEventListener('click', activateFromLink));

const initialPanel = getPanelIdFromHash();
if (initialPanel) {
  setActiveTab(initialPanel, { focus: false });
} else if (tabButtons.length > 0) {
  const defaultId = tabButtons[0].dataset.panel;
  setActiveTab(defaultId, { focus: false });
  history.replaceState(null, '', `#${defaultId}`);
}

window.addEventListener('hashchange', () => {
  const hashPanel = getPanelIdFromHash();
  if (hashPanel) {
    setActiveTab(hashPanel);
  }
});
