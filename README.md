Group Project for CS 4096.

I just took a bootstrap template that made use of nice visual components and started modifying it. I didn't delete the other pages in /pages/ because they are good references for creating charts/buttons/etc, so I just took them out of the navbar. I'm developing all of this on XAMPP just cause it's easy. Once Wyatt sets up all the server stuff that I have no idea how to do, I'll switch over. We should all develop in the same environment or else debugging can turn nasty.

Tasks for Matt: 
1. Clean out everything else we don't need from the template.
2. Make a login form for new users
3. Wire it up to the logic that verifies their login with our db.

Current Issues/Bugs:
1. Template had ~300 lines of repeated code for the navbars in every single file, I tried putting them into a single file and including them into a div. For some reason this broke the collapsing animation on navbar elements, and there is now a gap between the top navbar and the search bar. 
