// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function() {
      links.classList.toggle('open');
    });
    // Close menu when clicking a link
    links.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        links.classList.remove('open');
      });
    });
  }

  initCookieConsent();
});

// Cookie Consent Banner (Google Consent Mode)
function initCookieConsent() {
  var CONSENT_KEY = 'cookieConsent';
  var stored = localStorage.getItem(CONSENT_KEY);

  if (stored === 'granted' && typeof gtag === 'function') {
    gtag('consent', 'update', {'analytics_storage': 'granted'});
  }
  if (stored) return;

  var privacyHref = (location.pathname.indexOf('/blog/') > -1 ? '../privacy.html' : 'privacy.html');

  var banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.innerHTML =
    '<p>We use cookies for basic site analytics (Google Analytics) to see how the calculator is used. ' +
    'No salary figures you enter are ever stored or sent anywhere. See our ' +
    '<a href="' + privacyHref + '">Privacy Policy</a>.</p>' +
    '<div class="cookie-banner-actions">' +
      '<button class="btn-decline" type="button">Decline</button>' +
      '<button class="btn-accept" type="button">Accept</button>' +
    '</div>';
  document.body.appendChild(banner);

  banner.querySelector('.btn-accept').addEventListener('click', function() {
    localStorage.setItem(CONSENT_KEY, 'granted');
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {'analytics_storage': 'granted'});
    }
    banner.remove();
  });
  banner.querySelector('.btn-decline').addEventListener('click', function() {
    localStorage.setItem(CONSENT_KEY, 'denied');
    banner.remove();
  });
}

// Contact Form Handler
function handleSubmit(e) {
  e.preventDefault();
  var form = document.getElementById('contactForm');
  var success = document.getElementById('formSuccess');

  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var subjectSelect = document.getElementById('subject');
  var subjectLabel = subjectSelect.options[subjectSelect.selectedIndex].text;
  var message = document.getElementById('message').value;

  var body = 'Name: ' + name + '\nEmail: ' + email + '\n\n' + message;
  var mailtoLink = 'mailto:nhstakehomepay@gmail.com' +
    '?subject=' + encodeURIComponent('[' + subjectLabel + '] Message from ' + name) +
    '&body=' + encodeURIComponent(body);

  window.location.href = mailtoLink;

  form.style.display = 'none';
  success.style.display = 'block';
  return false;
}

// NHS Pay Bands 2026/27 - Agenda for Change (England)
// Source: nhsemployers.org/articles/pay-scales-202627, effective 1 April 2026
var PAY_BANDS = {
  '2': [
    {label: 'Standard Rate', salary: 25272}
  ],
  '3': [
    {label: 'Entry Point', salary: 25760},
    {label: 'Top of Band', salary: 27476}
  ],
  '4': [
    {label: 'Entry Point', salary: 28392},
    {label: 'Top of Band', salary: 31157}
  ],
  '5': [
    {label: 'Entry Point', salary: 32073},
    {label: 'Intermediate', salary: 34592},
    {label: 'Top of Band', salary: 39043}
  ],
  '6': [
    {label: 'Entry Point', salary: 39959},
    {label: 'Intermediate', salary: 42170},
    {label: 'Top of Band', salary: 48117}
  ],
  '7': [
    {label: 'Entry Point', salary: 49387},
    {label: 'Intermediate', salary: 51932},
    {label: 'Top of Band', salary: 56515}
  ],
  '8a': [
    {label: 'Entry Point', salary: 57528},
    {label: 'Intermediate', salary: 60417},
    {label: 'Top of Band', salary: 64750}
  ],
  '8b': [
    {label: 'Entry Point', salary: 66582},
    {label: 'Intermediate', salary: 70896},
    {label: 'Top of Band', salary: 77368}
  ],
  '8c': [
    {label: 'Entry Point', salary: 79504},
    {label: 'Intermediate', salary: 84346},
    {label: 'Top of Band', salary: 91609}
  ],
  '8d': [
    {label: 'Entry Point', salary: 94356},
    {label: 'Intermediate', salary: 100140},
    {label: 'Top of Band', salary: 108814}
  ],
  '9': [
    {label: 'Entry Point', salary: 112782},
    {label: 'Intermediate', salary: 119583},
    {label: 'Top of Band', salary: 129783}
  ]
};

// Current calculation results
var currentResults = null;
var currentPeriod = 'annual';

function formatCurrency(amount) {
  return '\u00A3' + amount.toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2});
}

function updatePayPoints() {
  var band = document.getElementById('payBand').value;
  var ppGroup = document.getElementById('payPointGroup');
  var csGroup = document.getElementById('customSalaryGroup');
  var ppSelect = document.getElementById('payPoint');

  if (band === 'custom') {
    ppGroup.style.display = 'none';
    csGroup.style.display = 'block';
    updateSalaryDisplay();
    return;
  }

  ppGroup.style.display = 'block';
  csGroup.style.display = 'none';
  ppSelect.innerHTML = '';

  if (band && PAY_BANDS[band]) {
    var points = PAY_BANDS[band];
    for (var i = 0; i < points.length; i++) {
      var opt = document.createElement('option');
      opt.value = points[i].salary;
      opt.textContent = points[i].label + ' - \u00A3' + points[i].salary.toLocaleString('en-GB');
      ppSelect.appendChild(opt);
    }
  }
  updateSalaryDisplay();
}

function updateSalaryDisplay() {
  var salary = getGrossSalary();
  var display = document.getElementById('salaryDisplay');
  var amount = document.getElementById('salaryAmount');

  if (salary > 0) {
    display.style.display = 'block';
    amount.textContent = formatCurrency(salary);
  } else {
    display.style.display = 'none';
  }
}

function getGrossSalary() {
  var band = document.getElementById('payBand').value;
  if (band === 'custom') {
    return parseFloat(document.getElementById('customSalary').value) || 0;
  }
  return parseFloat(document.getElementById('payPoint').value) || 0;
}

// Income Tax calculation - England/Wales
function calcTaxEngland(gross) {
  var pa = 12570;
  // Taper personal allowance for income over 100k
  if (gross > 100000) {
    pa = Math.max(0, pa - Math.floor((gross - 100000) / 2));
  }
  var taxable = Math.max(0, gross - pa);
  var tax = 0;

  // Basic rate: 20% on first 37700 of taxable income (up to 50270 total)
  var basicBand = Math.min(taxable, 37700);
  tax += basicBand * 0.20;

  // Higher rate: 40% from 50271 to 125140
  if (taxable > 37700) {
    var higherBand = Math.min(taxable - 37700, 125140 - 50270);
    tax += higherBand * 0.40;
  }

  // Additional rate: 45% above 125140
  if (gross > 125140) {
    tax += (gross - 125140) * 0.45;
  }

  return Math.max(0, tax);
}

// Income Tax calculation - Scotland
// TODO: thresholds below are last verified for 2025/26. Scottish Budget sets its own
// bands each year independently of rUK - 2026/27 thresholds not yet verified, do not
// assume unchanged. Rates (19/20/21/42/45/48%) are believed unchanged but unconfirmed here.
function calcTaxScotland(gross) {
  var pa = 12570;
  if (gross > 100000) {
    pa = Math.max(0, pa - Math.floor((gross - 100000) / 2));
  }
  var taxable = Math.max(0, gross - pa);
  var tax = 0;

  // Starter: 19% on first 2827 (12571-15397)
  var starterBand = Math.min(taxable, 2827);
  tax += starterBand * 0.19;

  // Basic: 20% from 15398-27491 (12094 wide)
  if (taxable > 2827) {
    var basicBand = Math.min(taxable - 2827, 12094);
    tax += basicBand * 0.20;
  }

  // Intermediate: 21% from 27492-43662 (16171 wide)
  if (taxable > 14921) {
    var intBand = Math.min(taxable - 14921, 16171);
    tax += intBand * 0.21;
  }

  // Higher: 42% from 43663-75000 (31338 wide)
  if (taxable > 31092) {
    var higherBand = Math.min(taxable - 31092, 31338);
    tax += higherBand * 0.42;
  }

  // Advanced: 45% from 75001-125140 (50140 wide)
  if (taxable > 62430) {
    var advBand = Math.min(taxable - 62430, 50140);
    tax += advBand * 0.45;
  }

  // Top: 48% above 125140
  if (gross > 125140) {
    tax += (gross - 125140) * 0.48;
  }

  return Math.max(0, tax);
}

// National Insurance
function calcNI(gross) {
  var pt = 12570;  // Primary threshold
  var uel = 50270; // Upper earnings limit
  var ni = 0;

  if (gross > pt) {
    // 8% between PT and UEL
    var mainBand = Math.min(gross, uel) - pt;
    ni += mainBand * 0.08;
  }

  if (gross > uel) {
    // 2% above UEL
    ni += (gross - uel) * 0.02;
  }

  return Math.max(0, ni);
}

// NHS Pension - 2026/27 tiers (England & Wales)
// Source: NHS Employers / NHSBSA, effective 1 April 2026, thresholds uplifted 3.8% (Sept 2025 CPI)
// TODO: Scotland (SPPA) and Northern Ireland (HSC) use different tier structures and a
// separate 2026/27 pay award - not verified, do not assume these tiers apply to them.
function calcPension(gross) {
  var optOutEl = document.getElementById('pensionOptOut');
  if (optOutEl && optOutEl.checked) return 0;

  // Tiers based on actual pensionable pay
  if (gross <= 13259) return gross * 0.052;
  if (gross <= 28854) return gross * 0.065;
  if (gross <= 35155) return gross * 0.083;
  if (gross <= 52778) return gross * 0.098;
  if (gross <= 67668) return gross * 0.107;
  return gross * 0.125;
}

// Student Loan
function calcStudentLoan(gross) {
  var plan = document.getElementById('studentLoan').value;
  if (plan === 'none') return 0;

  var thresholds = {
    'plan1': {threshold: 26900, rate: 0.09},
    'plan2': {threshold: 29385, rate: 0.09},
    'plan4': {threshold: 33795, rate: 0.09},
    'plan5': {threshold: 25000, rate: 0.09},
    'postgrad': {threshold: 21000, rate: 0.06}
  };

  var config = thresholds[plan];
  if (!config || gross <= config.threshold) return 0;

  return (gross - config.threshold) * config.rate;
}
// Main calculation
function calculate() {
  var gross = getGrossSalary();
  if (gross <= 0) {
    alert('Please select a pay band or enter a salary.');
    return;
  }

  var region = document.getElementById('taxRegion').value;
  var tax = (region === 'scotland') ? calcTaxScotland(gross) : calcTaxEngland(gross);
  var ni = calcNI(gross);
  var pension = calcPension(gross);
  var studentLoan = calcStudentLoan(gross);
  var totalDeductions = tax + ni + pension + studentLoan;
  var takeHome = gross - totalDeductions;

  currentResults = {
    gross: gross,
    tax: tax,
    ni: ni,
    pension: pension,
    studentLoan: studentLoan,
    totalDeductions: totalDeductions,
    takeHome: takeHome
  };

  // Show results
  document.getElementById('resultsSection').classList.add('visible');
  document.getElementById('placeholderCard').style.display = 'none';

  // Update take home box
  document.getElementById('takeHomeAmount').textContent = formatCurrency(takeHome);
  document.getElementById('takeHomeSub').textContent =
    formatCurrency(takeHome / 12) + '/month | ' + formatCurrency(takeHome / 52) + '/week';

  // Update breakdown
  currentPeriod = 'annual';
  updateBreakdown();

  // Update chart
  drawDonutChart(takeHome, tax, ni, pension, studentLoan, gross);

  // Scroll to results on mobile
  if (window.innerWidth < 769) {
    document.getElementById('resultsSection').scrollIntoView({behavior: 'smooth', block: 'start'});
  }
}

function updateBreakdown() {
  if (!currentResults) return;
  var divisor = 1;
  if (currentPeriod === 'monthly') divisor = 12;
  if (currentPeriod === 'weekly') divisor = 52;

  var r = currentResults;
  document.getElementById('r-gross').textContent = formatCurrency(r.gross / divisor);
  document.getElementById('r-tax').textContent = '-' + formatCurrency(r.tax / divisor);
  document.getElementById('r-ni').textContent = '-' + formatCurrency(r.ni / divisor);
  document.getElementById('r-pension').textContent = '-' + formatCurrency(r.pension / divisor);

  var studentRow = document.getElementById('r-student-row');
  if (r.studentLoan > 0) {
    studentRow.style.display = '';
    document.getElementById('r-student').textContent = '-' + formatCurrency(r.studentLoan / divisor);
  } else {
    studentRow.style.display = 'none';
  }

  document.getElementById('r-takehome').textContent = formatCurrency(r.takeHome / divisor);
}

function switchPeriod(period) {
  currentPeriod = period;
  var tabs = document.querySelectorAll('.period-tab');
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('active');
    if (tabs[i].textContent.toLowerCase().indexOf(period) > -1) {
      tabs[i].classList.add('active');
    }
  }
  updateBreakdown();
}

function drawDonutChart(takeHome, tax, ni, pension, studentLoan, gross) {
  var svg = document.getElementById('donutChart');
  var legend = document.getElementById('chartLegend');

  var items = [
    {label: 'Take Home', value: takeHome, color: '#009639'},
    {label: 'Income Tax', value: tax, color: '#d4351c'},
    {label: 'National Insurance', value: ni, color: '#f47738'},
    {label: 'NHS Pension', value: pension, color: '#005EB8'}
  ];
  if (studentLoan > 0) {
    items.push({label: 'Student Loan', value: studentLoan, color: '#8B5CF6'});
  }

  var cx = 120, cy = 120, r = 90, strokeWidth = 35;
  var circumference = 2 * Math.PI * r;
  var total = gross;
  var offset = 0;

  var svgContent = '';
  for (var i = 0; i < items.length; i++) {
    var pct = items[i].value / total;
    var dashLen = pct * circumference;
    var dashGap = circumference - dashLen;
    svgContent += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" ' +
      'stroke="' + items[i].color + '" stroke-width="' + strokeWidth + '" ' +
      'stroke-dasharray="' + dashLen.toFixed(2) + ' ' + dashGap.toFixed(2) + '" ' +
      'stroke-dashoffset="' + (-offset).toFixed(2) + '" ' +
      'transform="rotate(-90 ' + cx + ' ' + cy + ')" ' +
      'style="transition:stroke-dasharray 0.5s,stroke-dashoffset 0.5s"/>';
    offset += dashLen;
  }
  svg.innerHTML = svgContent;

  // Update center text
  var thPct = ((takeHome / gross) * 100).toFixed(1) + '%';
  document.getElementById('chartPct').textContent = thPct;

  // Update legend
  var legendHtml = '';
  for (var j = 0; j < items.length; j++) {
    var pctVal = ((items[j].value / gross) * 100).toFixed(1);
    legendHtml += '<div class="legend-item"><div class="legend-dot" style="background:' +
      items[j].color + '"></div>' + items[j].label + ' (' + pctVal + '%)</div>';
  }
  legend.innerHTML = legendHtml;
}

// ============================================================
// NHS Unsocial Hours Enhancement Calculator
// Rates: Saturday +30%, Sunday +60%, weekday nights +30% of hourly rate,
// paid on top of basic pay for hours actually worked in those periods.
// ============================================================
var UNSOCIAL_RATES = {saturday: 0.30, sunday: 0.60, night: 0.30};
var WEEKS_PER_YEAR = 52.143; // 365.25 / 7
var currentUnsocialResults = null;

function calcHourlyRate(annualGross, weeklyHours) {
  if (!weeklyHours || weeklyHours <= 0) return 0;
  return annualGross / WEEKS_PER_YEAR / weeklyHours;
}

function calculateUnsocialHours() {
  var gross = getGrossSalary();
  if (gross <= 0) {
    alert('Please select a pay band or enter a salary.');
    return;
  }

  var weeklyHours = parseFloat(document.getElementById('uhWeeklyHours').value) || 37.5;
  var satHours = parseFloat(document.getElementById('uhSatHours').value) || 0;
  var sunHours = parseFloat(document.getElementById('uhSunHours').value) || 0;
  var nightHours = parseFloat(document.getElementById('uhNightHours').value) || 0;

  if (satHours <= 0 && sunHours <= 0 && nightHours <= 0) {
    alert('Enter your typical Saturday, Sunday or night hours to calculate your enhancement.');
    return;
  }

  var hourlyRate = calcHourlyRate(gross, weeklyHours);

  var satEnhancement = satHours * hourlyRate * UNSOCIAL_RATES.saturday;
  var sunEnhancement = sunHours * hourlyRate * UNSOCIAL_RATES.sunday;
  var nightEnhancement = nightHours * hourlyRate * UNSOCIAL_RATES.night;
  var weeklyEnhancement = satEnhancement + sunEnhancement + nightEnhancement;
  var annualEnhancement = weeklyEnhancement * WEEKS_PER_YEAR;

  var region = document.getElementById('taxRegion').value;
  var calcTax = (region === 'scotland') ? calcTaxScotland : calcTaxEngland;

  var baseTax = calcTax(gross);
  var baseNI = calcNI(gross);
  var basePension = calcPension(gross);
  var baseTakeHome = gross - baseTax - baseNI - basePension;

  var enhancedGross = gross + annualEnhancement;
  var enhancedTax = calcTax(enhancedGross);
  var enhancedNI = calcNI(enhancedGross);
  var enhancedPension = calcPension(enhancedGross);
  var enhancedTakeHome = enhancedGross - enhancedTax - enhancedNI - enhancedPension;

  currentUnsocialResults = {
    hourlyRate: hourlyRate,
    satHours: satHours, sunHours: sunHours, nightHours: nightHours,
    satEnhancement: satEnhancement, sunEnhancement: sunEnhancement, nightEnhancement: nightEnhancement,
    weeklyEnhancement: weeklyEnhancement, annualEnhancement: annualEnhancement,
    baseGross: gross, enhancedGross: enhancedGross,
    baseTakeHome: baseTakeHome, enhancedTakeHome: enhancedTakeHome,
    takeHomeUplift: enhancedTakeHome - baseTakeHome
  };

  renderUnsocialResults();

  if (window.innerWidth < 769) {
    document.getElementById('uhResultsSection').scrollIntoView({behavior: 'smooth', block: 'start'});
  }
}

function renderUnsocialResults() {
  var r = currentUnsocialResults;
  if (!r) return;

  document.getElementById('uhResultsSection').classList.add('visible');
  document.getElementById('uhPlaceholderCard').style.display = 'none';

  document.getElementById('uhHourlyRate').textContent = formatCurrency(r.hourlyRate);
  document.getElementById('uhWeeklyEnhancement').textContent = formatCurrency(r.weeklyEnhancement);
  document.getElementById('uhAnnualEnhancement').textContent = formatCurrency(r.annualEnhancement);
  document.getElementById('uhMonthlyEnhancement').textContent = formatCurrency(r.annualEnhancement / 12);

  document.getElementById('r-uh-sat').textContent = formatCurrency(r.satEnhancement) + ' / week';
  document.getElementById('r-uh-sun').textContent = formatCurrency(r.sunEnhancement) + ' / week';
  document.getElementById('r-uh-night').textContent = formatCurrency(r.nightEnhancement) + ' / week';

  document.getElementById('r-uh-base-gross').textContent = formatCurrency(r.baseGross);
  document.getElementById('r-uh-enhanced-gross').textContent = formatCurrency(r.enhancedGross);
  document.getElementById('r-uh-base-takehome').textContent = formatCurrency(r.baseTakeHome);
  document.getElementById('r-uh-enhanced-takehome').textContent = formatCurrency(r.enhancedTakeHome);
  document.getElementById('r-uh-uplift').textContent = formatCurrency(r.takeHomeUplift) + ' / year (' + formatCurrency(r.takeHomeUplift / 12) + ' / month)';
}