# coffeeNoted
## keep track of coffees you've drank

**phase 1**
* user creation
* text form fields for coffee notes

**phase 2**
* pull data from large third wave roasters
* allow user query DB for a coffee/origin

Eventually, create some simple business-facing API so that coffee data can be easily pulled and pushed from the coffeeNoted DB.

Coffee reviews - social???!

----------------------------------------------------

###REST structure:

/coffees/ -> GET (show), POST (create) 
/coffees/:id -> GET, PUT, DELETE

/notes/ -> GET, POST
/notes/:id -> GET, PUT, DELETE

/users/ -> GET(?), POST
/users/:id -> GET, PUT, DELETE

----------------------------------------------------

###DB schema structure:

**coffee:**
* roaster
* price(?)
* farmer
* region
* elevation
* varietals
* harvest
* process

**note:**
* date/time
* brew method
* brew temp
* brew time
* dose
* water
* comment

**user:**
* first name
* last name
* username
* email
* password