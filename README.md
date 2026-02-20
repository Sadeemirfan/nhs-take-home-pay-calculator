# NHS Take Home Pay Calculator 2025/26

A free, responsive, single-page NHS Take Home Pay Calculator built with HTML, CSS, and JavaScript. Calculates net salary after income tax, National Insurance, NHS pension contributions, and student loan deductions.

## Live Demo

Visit: [https://sadeemirfan.github.io/nhs-take-home-pay-calculator/](https://sadeemirfan.github.io/nhs-take-home-pay-calculator/)

## Features

### Calculator
- **NHS Pay Band Selection** - All Agenda for Change bands (2-9) with entry, intermediate, and top pay points
- **Custom Salary Input** - Enter any annual salary amount
- **Tax Region Support** - England/Wales/NI and Scottish tax rates
- **Income Tax Calculation** - Full marginal tax calculation including personal allowance tapering above 100,000
- **National Insurance** - Employee NI at 8% (main) and 2% (upper)
- **NHS Pension** - All 6 contribution tiers (5.2% to 12.5%) based on pensionable pay
- **Student Loans** - Plans 1, 2, 4, 5 and Postgraduate with correct 2025/26 thresholds
- **Visual Breakdown** - Interactive donut chart showing salary distribution
- **Period Views** - Toggle between annual, monthly and weekly figures

### Design
- Modern, professional NHS blue colour scheme
- Fully mobile responsive
- SEO optimised with meta tags and Schema.org markup
- Single-file deployment (no dependencies)

## Tax Year 2025/26 Rates

### Income Tax (England/Wales/NI)
| Band | Threshold | Rate |
|------|-----------|------|
| Personal Allowance | Up to 12,570 | 0% |
| Basic | 12,571 - 50,270 | 20% |
| Higher | 50,271 - 125,140 | 40% |
| Additional | Over 125,140 | 45% |

### Income Tax (Scotland)
| Band | Threshold | Rate |
|------|-----------|------|
| Personal Allowance | Up to 12,570 | 0% |
| Starter | 12,571 - 15,397 | 19% |
| Basic | 15,398 - 27,491 | 20% |
| Intermediate | 27,492 - 43,662 | 21% |
| Higher | 43,663 - 75,000 | 42% |
| Advanced | 75,001 - 125,140 | 45% |
| Top | Over 125,140 | 48% |

### National Insurance
- 8% on earnings between 12,570 and 50,270
- 2% on earnings above 50,270

### NHS Pension Tiers
| Tier | Pensionable Pay | Rate |
|------|----------------|------|
| 1 | Up to 13,259 | 5.2% |
| 2 | 13,260 - 27,797 | 6.5% |
| 3 | 27,798 - 33,868 | 8.3% |
| 4 | 33,869 - 50,845 | 9.8% |
| 5 | 50,846 - 65,190 | 10.7% |
| 6 | 65,191+ | 12.5% |

## Tech Stack
- Pure HTML5, CSS3, and vanilla JavaScript
- No external dependencies or frameworks
- Hosted on GitHub Pages

## Disclaimer
This is an independent tool and is not affiliated with or endorsed by the NHS. Results are estimates based on standard tax rates and may differ from actual pay due to overtime, enhancements, HCAS, salary sacrifice, or other factors.

## License
MIT License
