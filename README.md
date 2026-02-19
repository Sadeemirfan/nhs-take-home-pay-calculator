# NHS Take Home Pay Calculator 2025/26

A free, responsive, single-page NHS Take Home Pay Calculator built with HTML, CSS, and JavaScript. Calculates net salary after income tax, National Insurance, NHS pension contributions, and student loan deductions.

## Live Demo

Visit: [https://nhs-take-home-pay-calculator.github.io/](https://nhs-take-home-pay-calculator.github.io/)

## Features

### Calculator
- **NHS Pay Band Selection** â All Agenda for Change bands (2-9) with entry, intermediate, and top pay points
- **Manual Salary Input** â Enter any custom annual salary
- **Tax Region Support** â England/Wales/NI and Scottish tax rates
- **Income Tax Calculation** â Full marginal tax calculation including personal allowance tapering above Â£100,000
- **National Insurance** â Employee NI at 8% (main) and 2% (upper)
- **NHS Pension** â All 6 contribution tiers (5.2% to 12.5%) based on pensionable pay
- **Student Loans** â Plans 1, 2, 4, 5 and Postgraduate with correct thresholds
- **Additional Income** â Overtime, enhancements, and other taxable income
- **Salary Sacrifice** â Pre-tax deductions (cycle to work, childcare, etc.)
- **Period Toggle** â View results as annual, monthly, or weekly
- **Visual Breakdown** â Bar charts showing salary distribution
- **Detailed Tax Breakdown** â Line-by-line tax band calculations

### Design & SEO
- Fully responsive (mobile, tablet, desktop)
- NHS brand colours and clean, professional design
- Schema.org structured data (WebApplication, FAQPage, BreadcrumbList)
- Open Graph and Twitter Card meta tags
- Semantic HTML5 with proper heading hierarchy
- Print-friendly styles
- No external dependencies â pure HTML/CSS/JS

### Content
- Complete pay bands reference table (clickable to calculate)
- Income tax rates guide (England & Scotland)
- National Insurance rates guide
- NHS Pension contribution tiers
- Student loan thresholds and rates
- Tips for maximising take home pay
- Comprehensive FAQ section

## Tax Year 2025/26 Rates

### Income Tax (England/Wales/NI)
| Band | Taxable Income | Rate |
|------|---------------|------|
| Personal Allowance | Up to Â£12,570 | 0% |
| Basic | Â£12,571 - Â£50,270 | 20% |
| Higher | Â£50,271 - Â£125,140 | 40% |
| Additional | Over Â£125,140 | 45% |

### NHS Pension Tiers
| Pensionable Pay | Rate |
|----------------|------|
| Up to Â£13,259 | 5.2% |
| Â£13,260 - Â£27,797 | 6.5% |
| Â£27,798 - Â£33,868 | 8.3% |
| Â£33,869 - Â£50,845 | 9.8% |
| Â£50,846 - Â£65,190 | 10.7% |
| Above Â£65,190 | 12.5% |

## Technology

- **HTML5** â Semantic markup
- **CSS3** â Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript** â No frameworks or dependencies
- **Google AdSense Ready** â Clean code structure with proper meta tags

## Deployment

This is a static single-page site. Deploy to any static host:

```bash
# GitHub Pages
git push origin main
# Enable GitHub Pages in repo settings > Pages > Source: main branch

# Or any static host
# Just upload index.html
```

## Disclaimer

This calculator provides estimates only based on 2025/26 tax year rates. It is not financial advice. Always check your payslip and consult HMRC or a qualified adviser for personal tax matters.

## Sources

- [GOV.UK Income Tax Rates](https://www.gov.uk/income-tax-rates)
- [NHS BSA Pension Contribution Rates](https://www.nhsbsa.nhs.uk/nhs-pensions-contribution-rates-202526)
- [NHS Employers Pay Scales](https://www.nhsemployers.org/articles/pay-scales-202526)
- [GOV.UK Student Loan Repayments](https://www.gov.uk/repaying-your-student-loan)

## License

MIT License
