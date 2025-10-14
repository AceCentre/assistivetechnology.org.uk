<template>
  <div>
    <a class="skip-link" href="#overview">Skip to main content</a>
    <header class="hero">
      <div class="hero-overlay">
        <nav class="top-navigation" aria-label="Primary">
          <ul class="primary-links">
            <li>
              <a class="primary-link" href="https://servicefinder.acecentre.net/" target="_blank" rel="noopener noreferrer">
                Service Finder
              </a>
            </li>
            <li>
              <a
                class="primary-link"
                href="#covid-aac"
                @click.prevent="setTab('covid-aac')"
              >
                COVID-19 Resources
              </a>
            </li>
            <li>
              <a
                class="primary-link"
                href="#general-resources"
                @click.prevent="setTab('general-resources')"
              >
                Resources
              </a>
            </li>
            <li>
              <a class="primary-link" href="https://assistivetechnology.org.uk/humhub" target="_blank" rel="noopener noreferrer">
                Staff Login
              </a>
            </li>
          </ul>
        </nav>
        <div class="hero-content">
          <div class="brand-mark">
            <img
              :src="brandLogo"
              alt="NHS England logo"
              class="brand-logo"
            />
          </div>
          <h1 class="hero-title">NHS England Specialised AAC and EC Services</h1>
          <p class="hero-description">
            NHS England commission Specialised Assistive Technology Services for people of all ages in England. These are provided through a number of organisations, some of which only provide Augmentative and Alternative Communication (AAC) services, some only Environmental Control (EC) Services, and some both.
          </p>
          <div class="hero-actions">
            <a class="action-button" href="#covid-aac" @click.prevent="setTab('covid-aac')">COVID-19 Resources</a>
            <a class="action-button action-button-secondary" href="#general-resources" @click.prevent="setTab('general-resources')">
              Other Resources
            </a>
          </div>
        </div>
      </div>
    </header>

    <nav class="tab-navigation" aria-label="Content sections">
      <div class="tab-list" role="tablist" aria-label="Homepage sections">
        <button
          v-for="(tab, index) in tabs"
          :key="tab.id"
          type="button"
          role="tab"
          class="navigation-tab"
          :id="`${tab.id}-tab`"
          :aria-controls="tab.id"
          :aria-selected="String(isActive(tab.id))"
          :tabindex="isActive(tab.id) ? 0 : -1"
          @click="setTab(tab.id)"
          @keydown="handleKeyNavigation($event, index)"
          :ref="(el) => setTabButtonRef(el, index)"
        >
          {{ tab.label }}
        </button>
      </div>
    </nav>

    <main class="page-content">
      <section
        id="overview"
        class="tab-panel"
        role="tabpanel"
        tabindex="0"
        aria-labelledby="overview-tab"
        :hidden="!isActive('overview')"
      >
        <div class="section-intro">
          <h2 class="section-title">Specialised Assistive Technology Services in England</h2>
          <p class="section-summary">
            Specialised AAC and EC services assess for and provide assistive technologies that help people across England communicate and control their environments. Explore the tabs to find the COVID-19 resource collections, general resources, and complete listings of AAC and EC services.
          </p>
        </div>
        <div class="service-highlights">
          <article class="service-card" v-for="highlight in serviceHighlights" :key="highlight.id">
            <h3 class="service-title">{{ highlight.title }}</h3>
            <p class="service-description">{{ highlight.description }}</p>
            <a class="text-link" :href="'#' + highlight.target" @click.prevent="setTab(highlight.target)">
              View services
            </a>
          </article>
        </div>
      </section>

      <section
        v-for="section in resourceSections"
        :key="section.id"
        class="tab-panel"
        role="tabpanel"
        tabindex="0"
        :id="section.id"
        :aria-labelledby="`${section.id}-tab`"
        :hidden="!isActive(section.id)"
      >
        <div class="section-heading">
          <h2 class="section-title">{{ section.title }}</h2>
          <p v-if="section.description" class="section-summary">{{ section.description }}</p>
        </div>
        <div v-if="section.cards" class="resource-grid">
          <article class="resource-card" v-for="card in section.cards" :key="card.title">
            <div class="resource-image" v-if="card.image">
              <img :src="card.image" :alt="card.alt" />
            </div>
            <div class="resource-content">
              <h3 class="resource-title">{{ card.title }}</h3>
              <p class="resource-description">{{ card.description }}</p>
              <a class="text-link" :href="card.href" target="_blank" rel="noopener noreferrer">Read More</a>
            </div>
          </article>
        </div>
        <template v-else-if="section.id === 'aac-services'">
          <ul class="service-list">
            <li v-for="service in aacServices" :key="service.href">
              <a :href="service.href" target="_blank" rel="noopener noreferrer">{{ service.label }}</a>
            </li>
          </ul>
        </template>
        <template v-else-if="section.id === 'ec-services'">
          <ul class="service-list">
            <li v-for="service in ecServices" :key="service.href">
              <a :href="service.href" target="_blank" rel="noopener noreferrer">{{ service.label }}</a>
            </li>
          </ul>
        </template>
      </section>
    </main>

    <footer class="site-footer">
      <p class="footer-text">&copy; 2025 Specialised Assistive Technology Services.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue';

const brandLogo = 'https://www.england.nhs.uk/wp-content/uploads/2017/03/nhs-logo.png';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'covid-aac', label: 'COVID-19 AAC Resources' },
  { id: 'general-resources', label: 'General Resources' },
  { id: 'home-education', label: 'Home & Education' },
  { id: 'supplier-resources', label: 'Supplier Resources' },
  { id: 'aac-services', label: 'AAC Services' },
  { id: 'ec-services', label: 'EC Services' }
];

const serviceHighlights = [
  {
    id: 'aac-highlight',
    title: 'AAC Services',
    description:
      'Specialised AAC services assess for and provide appropriate assistive technologies for people with complex communication difficulties and a clear discrepancy between their understanding and their ability to speak.',
    target: 'aac-services'
  },
  {
    id: 'ec-highlight',
    title: 'EC Services',
    description:
      'Specialised EC services assess for and provide assistive technologies for people whose severe disabilities restrict independent use of standard controls for their environment and technology.',
    target: 'ec-services'
  }
];

const resourceSections = [
  {
    id: 'covid-aac',
    title: 'COVID-19 AAC Resources',
    cards: [
      {
        title: 'Ask the experts',
        description:
          'Zoe Clarke, Richard Cave and Julie Atkinson share how AAC and EC services across England have supported people who need AAC and Environmental Control during the pandemic.',
        image: 'https://assistivetechnology.org.uk/wordpress/wp-content/uploads/2020/07/ask-the-experts.png',
        alt: 'Ask the experts webinar graphic',
        href: 'https://www.mndassociation.org/videos/ask-the-experts'
      },
      {
        title: 'Ace Centre',
        description: 'Remote working tips and strategies for AAC professionals shared by Ace Centre.',
        image: 'https://assistivetechnology.org.uk/wordpress/wp-content/uploads/2020/04/ace-centre-remote-working.png',
        alt: 'Ace Centre remote working illustration',
        href: 'https://acecentre.org.uk/news/remote-working'
      },
      {
        title: 'Patient-Provider Communication Forum',
        description:
          'Free communication tools to download and print to support people who cannot speak while receiving breathing support during COVID-19.',
        image: 'https://assistivetechnology.org.uk/wordpress/wp-content/uploads/2020/04/patient-provider-communication.png',
        alt: 'Patient-Provider Communication Forum graphic',
        href: 'https://www.patientprovidercommunication.org'
      },
      {
        title: 'ATIA',
        description:
          'A collection of free webinars and resources from ATIA members and the wider AT community to support assistive technology use during COVID-19.',
        image: 'https://assistivetechnology.org.uk/wordpress/wp-content/uploads/2020/04/atia-covid.png',
        alt: 'ATIA webinars resources',
        href: 'https://www.atia.org/covid19-resources'
      },
      {
        title: 'RERC',
        description:
          'Communication supports for children and adults with complex communication needs during the COVID-19 pandemic from the Rehabilitation Engineering Research Center.',
        image: 'https://assistivetechnology.org.uk/wordpress/wp-content/uploads/2020/04/rerc-image.png',
        alt: 'RERC communication supports graphic',
        href: 'https://rerc-aac.psu.edu/communication-supports-for-children-and-adults-with-complex-communication-needs-during-the-covid-19-pandemic'
      }
    ]
  },
  {
    id: 'general-resources',
    title: 'General Resources',
    cards: [
      {
        title: 'Compass Assistive and Rehabilitation Technology Resources',
        description: 'A collection of resources created by Compass Specialised AAC Service, including COVID-19 materials.',
        image: 'https://assistivetechnology.org.uk/wordpress/wp-content/uploads/2020/04/compass-resources.png',
        alt: 'Compass resources graphic',
        href: 'https://www.rhn.org.uk/what-makes-us-special/services/compass'
      },
      {
        title: 'Barnsley AT How-to Videos',
        description: 'How-to videos from Barnsley Assistive Technology Service showing practical tasks related to provided equipment.',
        image: 'https://assistivetechnology.org.uk/wordpress/wp-content/uploads/2020/04/barnsley-resources.png',
        alt: 'Barnsley Assistive Technology videos',
        href: 'https://www.barnsleyhospital.nhs.uk/assistive-technology/resources-and-information/howto-videos'
      },
      {
        title: 'Ace Centre Resources',
        description: 'Regular resources from Ace Centre including starter guides, symbol and alphabet charts, and publications.',
        image: 'https://assistivetechnology.org.uk/wordpress/wp-content/uploads/2020/04/ace-centre-resources.png',
        alt: 'Ace Centre resources graphic',
        href: 'https://acecentre.org.uk/resources'
      },
      {
        title: 'ACT (Birmingham) Resources',
        description: 'Resources from Access to Communication and Technology (ACT) to support AAC and related topics.',
        image: 'https://assistivetechnology.org.uk/wordpress/wp-content/uploads/2020/04/act-resources.png',
        alt: 'ACT Birmingham resources',
        href: 'https://www.bhamcommunity.nhs.uk/patients-public/rehabilitation/act/information-and-resources'
      },
      {
        title: 'Assessment of Learning Process for AAC',
        description: 'ALP for AAC breaks learning into stages and phases to support progression across access methods.',
        image: 'https://assistivetechnology.org.uk/wordpress/wp-content/uploads/2020/06/alpforaac.png',
        alt: 'Assessment of Learning Process for AAC graphic',
        href: 'https://www.alpforaac.com'
      },
      {
        title: 'Understanding the virus and staying safe',
        description: 'Easy read resources to explain the virus and what actions to take to stay safe and informed.',
        image: 'https://assistivetechnology.org.uk/wordpress/wp-content/uploads/2021/02/include-org.png',
        alt: 'Understanding the virus and staying safe resources',
        href: 'https://include.org/understanding-the-virus-and-staying-safe'
      },
      {
        title: 'Communication Matters',
        description: 'UK-wide organisation supporting people of all ages who have little or no clear speech.',
        image: 'https://assistivetechnology.org.uk/wordpress/wp-content/uploads/2021/11/cropped-Screenshot-2021-11-05-at-14.56.51.png',
        alt: 'Communication Matters logo',
        href: 'https://www.communicationmatters.org.uk'
      },
      {
        title: 'Special Needs Jungle’s Distance education resources for children and young people with SEND',
        description: 'A comprehensive list of information and resources for children and young people with SEND and their families.',
        image: 'https://assistivetechnology.org.uk/wordpress/wp-content/uploads/2020/04/special-needs-jungle.png',
        alt: 'Special Needs Jungle distance education resources',
        href: 'https://www.specialneedsjungle.com/distance-education-resources-for-children-and-young-people-with-send'
      }
    ]
  },
  {
    id: 'home-education',
    title: 'COVID-19 Resources for Home and Education',
    cards: [
      {
        title: 'TechAbility',
        description: 'Useful links to technology and assistance from leading equipment suppliers and support organisations.',
        image: 'https://assistivetechnology.org.uk/wordpress/wp-content/uploads/2020/04/techability.png',
        alt: 'TechAbility resource logo',
        href: 'https://www.techability.org.uk/resources/aiding-learning-from-home'
      },
      {
        title: 'NEW Home Access Licence and free HelpKidzLearn Resources',
        description: 'HelpKidzLearn share free resources and a flexible Home Access licence to support families during the outbreak.',
        image: 'https://assistivetechnology.org.uk/wordpress/wp-content/uploads/2020/04/help-kidz-learn.png',
        alt: 'HelpKidzLearn resources graphic',
        href: 'https://www.helpkidzlearn.com/updates/school-closure.html'
      },
      {
        title: 'Chatterpack’s Home Learning Resource Kit',
        description: 'Chatterpack curates inclusive home learning resources for schools and families, including SEND-specific content.',
        image: 'https://assistivetechnology.org.uk/wordpress/wp-content/uploads/2020/04/chatterpack.png',
        alt: 'Chatterpack resource list',
        href: 'https://chatterpack.net/blogs/blog/resources-list-for-home-learning'
      },
      {
        title: 'Chatterpack’s specific SLCN & SEND free resource list',
        description: 'Direct access to Chatterpack’s list of free speech, language, communication and SEND resources.',
        image: 'https://assistivetechnology.org.uk/wordpress/wp-content/uploads/2020/04/chatterpack.png',
        alt: 'Chatterpack SEND resource list',
        href: 'https://chatterpack.net/blogs/blog/resources-list-for-home-learning'
      },
      {
        title: 'Cenmac Home Learning Information Page',
        description: 'Cenmac share SEN resource areas with downloads, guidance and online activities for home learning.',
        image: 'https://assistivetechnology.org.uk/wordpress/wp-content/uploads/2020/04/cenmac.png',
        alt: 'Cenmac home learning',
        href: 'https://cenmac.com/home-learning'
      },
      {
        title: 'PraAACtical Resources: Dealing with the Covid-19 Pandemic',
        description: 'An interactive graphic linking to free downloadable resources that support AAC learners with routines and learning.',
        image: 'https://assistivetechnology.org.uk/wordpress/wp-content/uploads/2020/04/praactical-aac.png',
        alt: 'PraAACtical AAC resources',
        href: 'https://praacticalaac.org/praactical/praactical-resources-dealing-with-the-covid-19-pandemic'
      },
      {
        title: 'Learning Disability England’s Resources for Individuals and Families',
        description: 'Information and resources to help people stay safe, well and connected during the pandemic.',
        image: 'https://assistivetechnology.org.uk/wordpress/wp-content/uploads/2020/04/learning-disability-england.png',
        alt: 'Learning Disability England resources',
        href: 'https://www.learningdisabilityengland.org.uk/what-we-do/keeping-informed-and-in-touch-during-coronavirus/resources-that-can-help'
      },
      {
        title: 'Special Needs Jungle’s Distance education resources for SEND',
        description: 'Distance education resources for children and young people with SEND compiled by Special Needs Jungle.',
        image: 'https://assistivetechnology.org.uk/wordpress/wp-content/uploads/2020/04/special-needs-jungle.png',
        alt: 'Special Needs Jungle resources',
        href: 'https://www.specialneedsjungle.com/distance-education-resources-for-children-and-young-people-with-send'
      }
    ]
  },
  {
    id: 'supplier-resources',
    title: 'COVID-19 Resources from Suppliers',
    cards: [
      {
        title: 'AssistiveWare’s Blog Resources',
        description: 'AssistiveWare share blogs covering AAC device hygiene, hospital communication, and using AAC at home.',
        image: 'https://assistivetechnology.org.uk/wordpress/wp-content/uploads/2020/03/assistive-ware.png',
        alt: 'AssistiveWare blog resources',
        href: 'https://www.assistiveware.com/blog'
      },
      {
        title: 'Liberator Coronavirus Update',
        description: 'Liberator outline their response to COVID-19 and how they are supporting their community during the pandemic.',
        image: 'https://assistivetechnology.org.uk/wordpress/wp-content/uploads/2020/10/cropped-Liberator_RGB-no-strap-White-Border.jpg',
        alt: 'Liberator coronavirus update',
        href: 'https://www.liberator.co.uk/support/coronavirus'
      },
      {
        title: 'ThinkSmartBox – Coronavirus Information',
        description: 'Smartbox provide coronavirus information and guidance on accessing communication and learning resources.',
        image: 'https://assistivetechnology.org.uk/wordpress/wp-content/uploads/2020/04/Coronavirus-learning-grid-blog-2.png',
        alt: 'Smartbox coronavirus information',
        href: 'https://thinksmartbox.com/category/news/coronavirus-information'
      },
      {
        title: 'Techcess – free Coronavirus communication boards',
        description: 'Techcess offer free communication boards for Mind Express covering information, health and preventative measures.',
        image: 'https://assistivetechnology.org.uk/wordpress/wp-content/uploads/2020/04/techcess.png',
        alt: 'Techcess communication boards',
        href: 'https://mailchi.mp/b127216f35cc/techcess-newsletter-2453873?e=%5BUNIQID%5D'
      },
      {
        title: 'Tobii Dynavox – free Communication & Teaching Resources',
        description: 'Tobii Dynavox provide free resources via MyTobiiDynavox to support communication and learning at home.',
        image: 'https://assistivetechnology.org.uk/wordpress/wp-content/uploads/2020/04/tobii-dynavox.png',
        alt: 'Tobii Dynavox resources',
        href: 'https://www.mytobiidynavox.com/Support/COVID-19-Downloads'
      },
      {
        title: 'Widgit Online free for 30 days',
        description: 'Widgit offer a free extended licence to their full online suite for anyone who needs it during the pandemic.',
        image: 'https://assistivetechnology.org.uk/wordpress/wp-content/uploads/2020/04/widgit.png',
        alt: 'Widgit Online free access',
        href: 'https://mailchi.mp/widgit/wo'
      }
    ]
  },
  {
    id: 'aac-services',
    title: 'AAC Services',
    description: 'Listed below are Augmentative and Alternative Communication Services in England.'
  },
  {
    id: 'ec-services',
    title: 'EC Services',
    description: 'Listed below are the Environmental Control Services in England.'
  }
];

const aacServices = [
  { label: 'Suffolk Communication Aids Resource Centre (Ages 0 - 25)', href: 'https://assistivetechnology.org.uk/at-services/suffolk-communication-aids-resource-centre-ages-0-25/' },
  { label: 'Kent and Medway Communication and Assistive Technology Service (KM CAT) - Adult Team', href: 'https://assistivetechnology.org.uk/at-services/kent-and-medway-communication-and-assistive-technology-service-km-cat-adult-team/' },
  { label: 'Kent and Medway Communication and Assistive Technology Service (KM CAT) - CYP Team', href: 'https://assistivetechnology.org.uk/at-services/kent-and-medway-communication-and-assistive-technology-service-km-cat-cyp-team/' },
  { label: 'Regional Communication Aid Service (RCAS)', href: 'https://assistivetechnology.org.uk/at-services/regional-communication-aid-service-rcas/' },
  { label: 'Ace Centre North', href: 'https://assistivetechnology.org.uk/at-services/ace-centre-north/' },
  { label: "Guy's and St Thomas' Assistive Communication Service (GSTT ACS)", href: 'https://assistivetechnology.org.uk/at-services/guys-and-st-thomas-assistive-communication-service-gstt-acs/' },
  { label: 'Augmentative Communication Service - GOSH', href: 'https://assistivetechnology.org.uk/at-services/augmentative-communication-service-gosh/' },
  { label: 'Dame Hannah Rogers Trust', href: 'https://assistivetechnology.org.uk/at-services/dame-hannah-rogers-trust/' },
  { label: 'Electronic Assistive Technology Service - AAC (EATS)', href: 'https://assistivetechnology.org.uk/at-services/electronic-assistive-technology-service-aac-eats/' },
  { label: 'Compass Assistive and Rehabilitation Technology Service', href: 'https://assistivetechnology.org.uk/at-services/compass-assistive-and-rehabilitation-technology-service/' },
  { label: 'Assistive Communication Service - CLCH (ACS)', href: 'https://assistivetechnology.org.uk/at-services/assistive-communication-service-clch-acs/' },
  { label: 'Chailey Communication Aid Service (CCAS)', href: 'https://assistivetechnology.org.uk/at-services/chailey-communication-aid-service-ccas/' },
  { label: 'Communication Aid Service East of England (CASEE)', href: 'https://assistivetechnology.org.uk/at-services/communication-aid-service-east-of-england-casee/' },
  { label: 'Bristol Communication Aid Service (BCAS)', href: 'https://assistivetechnology.org.uk/at-services/bristol-communication-aid-service-bcas/' },
  { label: 'Barnsley Assistive Technology Team', href: 'https://assistivetechnology.org.uk/at-services/barnsley-assistive-technology-team/' },
  { label: 'Access to Communication and Technology (ACT), Birmingham', href: 'https://assistivetechnology.org.uk/at-services/access-to-communication-and-technology-act-birmingham/' },
  { label: 'Ace Centre South', href: 'https://assistivetechnology.org.uk/at-services/ace-centre-south/' }
];

const ecServices = [
  { label: 'Access to Communication and Technology — Birmingham', href: 'https://assistivetechnology.org.uk/list-of-ec-services-2/access-to-communication-and-technology-birmingham' },
  { label: "Assistive Technology Service (London) — St George's", href: 'https://assistivetechnology.org.uk/list-of-ec-services-2/assistive-technology-service-st-georges-london' },
  { label: 'AT Telehealthcare Team — Cambridge', href: 'https://assistivetechnology.org.uk/list-of-ec-services-2/at-telehealthcare-team-cambridge' },
  { label: 'Barnsley AT Team — Barnsley', href: 'https://assistivetechnology.org.uk/list-of-ec-services-2/barnsley-at-team-barnsley' },
  { label: 'Bedfordshire EC Service — Dunstable', href: 'https://assistivetechnology.org.uk/list-of-ec-services-2/bedfordshire-ec-service-dunstable' },
  { label: 'Derbyshire and Nottinghamshire EAT Service — Derby', href: 'https://assistivetechnology.org.uk/list-of-ec-services-2/derbyshire-nottinghamshire-eat-service' },
  { label: 'Dorset, Hampshire and IOW ECS — Bournemouth', href: 'https://assistivetechnology.org.uk/list-of-ec-services-2/dorset-hampshire-and-iow-ecs-bournemouth' },
  { label: 'EAT Service — Lincoln', href: 'https://assistivetechnology.org.uk/list-of-ec-services-2/eat-service-lincoln' },
  { label: 'North Thames RECES (Regional Environmental Control Equipment Service)', href: 'https://assistivetechnology.org.uk/list-of-ec-services-2/north-thames-regional-environmental-control-equipment-service' },
  { label: 'North East Regional EC Service', href: 'https://assistivetechnology.org.uk/list-of-ec-services-2/north-east-regional-ec-service' },
  { label: 'North West AT Service — Liverpool', href: 'https://assistivetechnology.org.uk/list-of-ec-services-2/north-west-at-service' },
  { label: 'Specialist Disability Service — Oxford', href: 'https://assistivetechnology.org.uk/list-of-ec-services-2/specialist-disability-service-oxford' },
  { label: 'Peterborough EC Service', href: 'https://assistivetechnology.org.uk/list-of-ec-services-2/peterborough' },
  { label: 'Communication Aid Service East of England (CASEE)', href: 'https://assistivetechnology.org.uk/list-of-ec-services-2/communication-aid-service-east-of-england-casee' },
  { label: 'Norfolk EC Service — Norwich', href: 'https://assistivetechnology.org.uk/list-of-ec-services-2/norfolk-ec-service-norwich' },
  { label: 'Suffolk EC Service — Ipswich', href: 'https://assistivetechnology.org.uk/list-of-ec-services-2/suffolk-ecs-ipswich' },
  { label: 'Leicestershire & Rutland EC Service', href: 'https://assistivetechnology.org.uk/list-of-ec-services-2/leicestershire-rutland-ec-service' },
  { label: 'Luton EC Service', href: 'https://assistivetechnology.org.uk/list-of-ec-services-2/luton-ec-service' },
  { label: 'Electronic Assistive Technology South West — Bristol', href: 'https://assistivetechnology.org.uk/list-of-ec-services-2/electronic-assistive-technology-south-west/' },
  { label: 'Kent & Medway Specialist Equipment Service', href: 'https://assistivetechnology.org.uk/list-of-ec-services-2/kent-medway-specialist-equipment-service' }
];

const activeTab = ref('overview');
const tabButtonRefs = ref([]);

const setTabButtonRef = (el, index) => {
  if (el) {
    tabButtonRefs.value[index] = el;
  }
};

const isActive = (id) => activeTab.value === id;

const focusTabButton = (id) => {
  const index = tabs.findIndex((tab) => tab.id === id);
  if (index > -1) {
    nextTick(() => {
      const target = tabButtonRefs.value[index];
      target?.focus();
    });
  }
};

const setTab = (id, { focus = true } = {}) => {
  if (!tabs.some((tab) => tab.id === id)) {
    return;
  }
  activeTab.value = id;
  window.history.replaceState(null, '', `#${id}`);
  if (focus) {
    focusTabButton(id);
  }
};

const handleKeyNavigation = (event, index) => {
  const { key } = event;
  if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(key)) {
    event.preventDefault();
  }

  if (key === 'ArrowRight' || key === 'ArrowDown') {
    const nextIndex = (index + 1) % tabs.length;
    setTab(tabs[nextIndex].id);
  } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
    const prevIndex = (index - 1 + tabs.length) % tabs.length;
    setTab(tabs[prevIndex].id);
  } else if (key === 'Home') {
    setTab(tabs[0].id);
  } else if (key === 'End') {
    setTab(tabs[tabs.length - 1].id);
  }
};

const applyHash = () => {
  const hash = window.location.hash.replace('#', '');
  if (hash && tabs.some((tab) => tab.id === hash)) {
    setTab(hash, { focus: false });
  }
};

onMounted(() => {
  applyHash();
  window.addEventListener('hashchange', applyHash);
});

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', applyHash);
});
</script>
