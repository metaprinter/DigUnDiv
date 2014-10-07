UPDATE:
Our LunchTime app was selected as Best Designed App
https://www.hackerleague.org/hackathons/global-mobile-hackathon/blogposts/54328a368365f05e3f000033

This repo was used to collaborate on a hack for DigitalUndivided - Global Mobile Hackathon, 4 October 2014 and submitted to https://www.hackerleague.org/hackathons/digitalundivideds-global-mobile-hack

Contributors: Justin Donato (parse and mustache), Natasha Dykes (design and artwork), Robert Ivan (concept and bootstrap).

High Level Overview:
Get NYC Public School lunch menus out of their current, stagnant, pdf implementation and into a database so we can then do stuff with it like present the menus in a web application to enable voting, photo submissions, alergy alerts, nutrition info, even alerts and menus via Twillio.

Submission:
http://robertivan.com/nyc/

Work:
We did what we could in ~5 hours and it actually works quite well, given that time constraint. 
- We scraped the meal info off schoolfoodnyc.org website for the month of November k-8 lunch menu http://www.schoolfoodnyc.org/public/PDF_Handler.ashx?t=m&id=2001&name=K-8+Lunch+Menu 
- brought menu data into parse.com for the database solution. 
- also set up parse to record the star rating data
- Templating for the meals and voting modules was done via mustache.js
- We use Bootstrap 3 for the presentation framework 
- IoS touch icons implemented. 
 
You can see a mockup here http://robertivan.com/nyc/img/lunchtime-mockup.png