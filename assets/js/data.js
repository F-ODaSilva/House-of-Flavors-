/* House of Flavors — menu & events data.
   Prices in South African Rand (R). VAT (15%) is added at checkout. */
window.HOF = window.HOF || {};

HOF.categories = [
  { id: "burgers", name: "Burgers", line: "Smash, stack, repeat.", img: "categorysection1" },
  { id: "chicken", name: "Chicken", line: "Brined overnight, fried to order.", img: "chicken4" },
  { id: "pizza", name: "Pizza", line: "48-hour dough, wood oven, 90 seconds.", img: "categorysection2" },
  { id: "steak", name: "Steak & Grill", line: "Dry-aged cuts over open coal.", img: "categorysection11" },
  { id: "seafood", name: "Seafood", line: "From the Indian Ocean, same morning.", img: "categorysection14" },
  { id: "sushi", name: "Sushi", line: "Rolled at the counter by Aki & Ira.", img: "categorysection13" },
  { id: "drinks", name: "Bar & Cellar", line: "Cocktails, whiskey and a serious wine list.", img: "categorysection4" }
];

/* tags: spicy | veg | share | new | top | signature */
HOF.menu = [
  // Burgers
  { id: "crispy-chicken-burger", name: "Crispy Chicken Burger", cat: "burgers", price: 50, img: "burger5", rate: 100, tags: ["top", "new"], desc: "Buttermilk thigh, pickled slaw and chipotle mayo on a toasted potato bun." },
  { id: "texas-double-decker", name: "Texas Double Decker BBQ", cat: "burgers", price: 105, img: "burguer14", rate: 96, tags: ["new", "signature", "share"], desc: "Two smashed patties, brisket burnt ends, smoked cheddar and house BBQ glaze." },
  { id: "juicy-turkey-burger", name: "Juicy Turkey Burger", cat: "burgers", price: 50, img: "burger6", rate: 88, tags: [], desc: "Herbed turkey patty, rocket, tomato jam and a soft brioche." },
  { id: "spicy-burger", name: "Spicy Burger", cat: "burgers", price: 45, img: "burger4", rate: 90, tags: ["spicy"], desc: "Beef patty with piri-piri butter, jalapeños and pepper-jack." },
  { id: "hammy-burger", name: "Hammy Burger", cat: "burgers", price: 62, img: "burger7", rate: 90, tags: [], desc: "Beef, crisp smoked ham, Swiss cheese and honey mustard." },
  { id: "rainbow-bbq-burger", name: "Rainbow BBQ Burger", cat: "burgers", price: 75, img: "burger8", rate: 82, tags: ["top"], desc: "Charred beef, red onion, heirloom tomato and a sticky BBQ crust." },
  { id: "crab-xl-burger", name: "Crab XL Burger", cat: "burgers", price: 94, img: "burger10", rate: 91, tags: [], desc: "Crisp soft-shell crab, lime mayo and shredded lettuce. Big enough to share." },
  { id: "florida-burger", name: "Florida Burger", cat: "burgers", price: 70, img: "burger12", rate: 87, tags: [], desc: "Double beef, grilled pineapple, bacon jam and American cheese." },
  { id: "new-york-burger", name: "New York Burger", cat: "burgers", price: 78, img: "burguer15", rate: 99, tags: ["top"], desc: "The classic: two patties, shredded iceberg, pickles and our burger sauce." },
  { id: "miami-burger", name: "Miami Burger", cat: "burgers", price: 72, img: "burger1", rate: 95, tags: [], desc: "Beef, beetroot relish, crispy onions and garlic aioli." },
  { id: "little-havana-burger", name: "Little Havana Burger", cat: "burgers", price: 65, img: "burger2", rate: 89, tags: [], desc: "Mojo pulled pork on beef, Swiss cheese, pickles and mustard." },
  { id: "cheesy-burger", name: "Cheesy Burger", cat: "burgers", price: 65, img: "burguer13", rate: 92, tags: [], desc: "Three cheeses melted under a dome, served with a pour of cheese sauce." },
  // Chicken
  { id: "chicken-fillet", name: "Chicken Fillet", cat: "chicken", price: 82, img: "chicken1", rate: 90, tags: [], desc: "Panko-crumbed breast, garlic cream and tenderstem broccoli." },
  { id: "fried-chicken-35-tray", name: "Fried Chicken 35 Tray", cat: "chicken", price: 140, img: "chicken2", rate: 97, tags: ["share", "top"], desc: "Thirty-five pieces, four dips and a stack of napkins. For the whole table." },
  { id: "chicken-muay-thai", name: "Chicken Muay Thai", cat: "chicken", price: 72, img: "chicken5", rate: 80, tags: ["spicy"], desc: "Wok-tossed thigh with Thai basil, bird's eye chilli and cashews." },
  { id: "tropical-panado", name: "Tropical Panado", cat: "chicken", price: 92, img: "chicken9", rate: 86, tags: [], desc: "Golden chicken cakes, mango salsa and coconut-lime dressing." },
  { id: "one-piece", name: "One Piece", cat: "chicken", price: 70, img: "chicken7", rate: 84, tags: [], desc: "Half-roasted bird on saffron rice with charred lemon." },
  { id: "zambeziana-chicken", name: "Zambeziana Chicken", cat: "chicken", price: 78, img: "chicken6", rate: 94, tags: ["signature", "spicy"], desc: "Our nod to Quelimane: coconut-chilli marinade, grilled over coal." },
  { id: "12-piece-chicken", name: "12 Piece Chicken", cat: "chicken", price: 85, img: "chicken4", rate: 91, tags: ["share"], desc: "Twelve crunchy pieces with honey-chilli glaze on the side." },
  { id: "chicken-salad", name: "Grilled Chicken Salad", cat: "chicken", price: 80, img: "chicken8", rate: 85, tags: [], desc: "Charred chicken, cos, cherry tomatoes, olives and feta." },
  { id: "fried-chicken-bucket", name: "Fried Chicken Bucket", cat: "chicken", price: 125, img: "chicken3", rate: 100, tags: ["share", "top"], desc: "A bucket of thighs and drums, crumbed twice." },
  { id: "chicken-cheesy-nuggets", name: "Chicken Cheesy Nuggets", cat: "chicken", price: 50, img: "chicken10", rate: 88, tags: [], desc: "Cheddar-stuffed nuggets with three dipping sauces." },
  // Pizza
  { id: "xl-6-seasons", name: "XL 6 Seasons", cat: "pizza", price: 100, img: "pizza6", rate: 93, tags: ["top", "share"], desc: "Six toppings in six slices. Nobody has to compromise." },
  { id: "mystery-avocado-pizza", name: "Mystery Avocado Pizza", cat: "pizza", price: 85, img: "pizza2", rate: 80, tags: ["new", "veg"], desc: "Avocado, charred corn, coriander and smoked chilli oil." },
  { id: "pizza-earthly-delights", name: "Pizza of Earthly Delights", cat: "pizza", price: 95, img: "pizza9", rate: 92, tags: ["new", "veg"], desc: "Basil pesto base, roasted tomatoes and wild rocket." },
  { id: "italiana", name: "Italiana", cat: "pizza", price: 80, img: "pizza8", rate: 86, tags: [], desc: "San Marzano tomato, mushrooms, olives and fior di latte." },
  { id: "earthly-green-pizza", name: "Earthly Green Pizza", cat: "pizza", price: 78, img: "pizza3", rate: 89, tags: ["veg"], desc: "Spinach, ricotta, garlic and lemon zest." },
  { id: "something-chilli", name: "Something Chilli", cat: "pizza", price: 75, img: "pizza1", rate: 87, tags: ["spicy"], desc: "Nduja, red onion, Calabrian chilli and hot honey." },
  { id: "old-school", name: "Old School", cat: "pizza", price: 70, img: "pizza5", rate: 85, tags: [], desc: "Ham, pineapple, olives and sweetcorn. Unapologetic." },
  { id: "turkey-pizza", name: "Turkey Pizza", cat: "pizza", price: 78, img: "pizza10", rate: 83, tags: [], desc: "Smoked turkey, red onion, peppers and mozzarella." },
  { id: "stuffed-pizza", name: "Stuffed Pizza", cat: "pizza", price: 95, img: "pizza11", rate: 90, tags: [], desc: "Cheese-stuffed crust, pepperoni and fresh oregano." },
  // Steak & Grill
  { id: "smoked-ribs", name: "Smoked Ribs", cat: "steak", price: 200, img: "meat9", rate: 98, tags: ["signature", "share"], desc: "Pork ribs smoked for nine hours, glazed, with grilled tomato." },
  { id: "pork-kyoto-ramen", name: "Pork Kyoto Ramen", cat: "steak", price: 95, img: "meat11", rate: 93, tags: ["top"], desc: "Chashu pork, soft egg and spring onion in a 12-hour tonkotsu." },
  { id: "seasoned-beefs", name: "Seasoned Beefs", cat: "steak", price: 82, img: "categorysection9", rate: 92, tags: [], desc: "Peppercorn-crusted sirloin bites with chimichurri." },
  { id: "thai-beef-kadai", name: "Thai Beef Kadai", cat: "steak", price: 70, img: "meat10", rate: 90, tags: ["new", "spicy"], desc: "Seared beef, glass noodles, herbs and nam jim dressing." },
  { id: "beef-on-sticks", name: "Beef on Sticks", cat: "steak", price: 78, img: "steak4", rate: 98, tags: ["top"], desc: "Rump skewers basted in garlic butter, served with peri-peri." },
  { id: "beef-roasted-potatoes", name: "Beef & Roasted Potatoes", cat: "steak", price: 95, img: "steak5", rate: 90, tags: ["top"], desc: "Sliced picanha, crushed baby potatoes and gravy." },
  { id: "10-stripes-beef", name: "10 Stripes Beef", cat: "steak", price: 100, img: "categorysection11", rate: 98, tags: [], desc: "Ten strips of flank, flame-kissed and rested, with salsa verde." },
  { id: "in-your-face", name: "In Your Face", cat: "steak", price: 240, img: "meat2", rate: 97, tags: ["share", "signature"], desc: "A 1 kg tomahawk carved at the table. Bring friends." },
  // Seafood
  { id: "sunshine-fish-fillets", name: "Sunshine Fish Fillets", cat: "seafood", price: 100, img: "fish2", rate: 100, tags: ["top"], desc: "Line fish in turmeric-coconut curry with steamed rice." },
  { id: "sweet-salmon-bulie", name: "Sweet Salmon Bulie", cat: "seafood", price: 82, img: "fish5", rate: 92, tags: [], desc: "Miso-glazed salmon, wilted greens and sesame." },
  { id: "the-sea-on-stick", name: "The Sea on Stick", cat: "seafood", price: 150, img: "seafood9", rate: 90, tags: ["share"], desc: "Prawn, calamari and line-fish skewers with sweet chilli." },
  { id: "fruits-of-the-sea", name: "Fruits of the Sea", cat: "seafood", price: 205, img: "seafood10", rate: 95, tags: ["share", "signature"], desc: "Crab legs, prawns, mussels, corn and potatoes poured onto the table." },
  { id: "paella-shrimp", name: "Paella Shrimp", cat: "seafood", price: 135, img: "seafood8", rate: 91, tags: ["new", "share"], desc: "Bomba rice, saffron, tiger prawns and chorizo, crisped at the base." },
  { id: "shrimp-rice-alfonse", name: "Shrimp Rice Alfonse", cat: "seafood", price: 100, img: "seafood6", rate: 89, tags: [], desc: "Prawn bisque over coconut rice, finished with herbs." },
  { id: "18-fish-sticks", name: "18 Fish Sticks", cat: "seafood", price: 50, img: "fish8", rate: 84, tags: [], desc: "Beer-battered hake fingers, tartare and lemon." },
  { id: "special-tiger-shrimps", name: "Special Tiger Shrimps", cat: "seafood", price: 122, img: "fish3", rate: 100, tags: ["top", "spicy"], desc: "Grilled tiger prawns in garlic-lemon butter with piri-piri." },
  { id: "ocean-flavored-pasta", name: "Ocean Flavoured Pasta", cat: "seafood", price: 95, img: "fish1", rate: 88, tags: [], desc: "Linguine, clams, prawns, chilli and white wine." },
  // Sushi
  { id: "flavors-of-kyoto", name: "Flavors of Kyoto", cat: "sushi", price: 150, img: "sushi2", rate: 94, tags: [], desc: "Sashimi, nigiri and tempura prawn on one platter." },
  { id: "12-piece-sushi", name: "12 Piece Sushi", cat: "sushi", price: 95, img: "categorysection13", rate: 90, tags: [], desc: "Salmon rolls and nigiri, house soy and pickled ginger." },
  { id: "8-piece-mijin", name: "8 Piece Mijin", cat: "sushi", price: 78, img: "categorysection12", rate: 88, tags: [], desc: "Torched salmon rolls with spicy mayo and tobiko." },
  { id: "20-piece-otanawa", name: "20 Piece Otanawa", cat: "sushi", price: 115, img: "categorysection3", rate: 92, tags: ["share"], desc: "Twenty pieces of rainbow and dragon rolls." },
  { id: "36-flavors-of-kyoto", name: "36 Flavors of Kyoto", cat: "sushi", price: 250, img: "sushi1", rate: 100, tags: ["top", "share", "signature"], desc: "Our chef's 36-piece platter, finished with edible flowers." },
  // Bar & Cellar
  { id: "purple-sundown", name: "Purple Sundown", cat: "drinks", price: 45, img: "cocktail2", rate: 93, tags: ["new"], desc: "Butterfly-pea gin, elderflower and lime. Changes colour as you stir." },
  { id: "blue-paradise", name: "Blue Paradise", cat: "drinks", price: 45, img: "cocktail3", rate: 88, tags: [], desc: "White rum, blue curaçao, pineapple and coconut." },
  { id: "caipirinha", name: "Caipirinha", cat: "drinks", price: 35, img: "cocktail", rate: 95, tags: [], desc: "Cachaça, muddled lime and raw sugar." },
  { id: "tropical-mix", name: "Tropical Mix", cat: "drinks", price: 50, img: "cocktail4", rate: 86, tags: [], desc: "Aged rum, passion fruit, orange and bitters." },
  { id: "raspberry-punch", name: "Raspberry Punch", cat: "drinks", price: 50, img: "cocktail5", rate: 90, tags: [], desc: "Vodka, raspberry, lemon and a sparkling top." },
  { id: "pink-colada", name: "Pink Colada", cat: "drinks", price: 45, img: "categorysection4", rate: 90, tags: ["top"], desc: "Our pink take on the colada, with watermelon and lime." },
  { id: "water", name: "Still or Sparkling Water", cat: "drinks", price: 25, img: "drink2", rate: 100, tags: [], desc: "750 ml bottle." },
  { id: "sodas", name: "Sodas", cat: "drinks", price: 30, img: "drink4", rate: 100, tags: [], desc: "Cola, lemonade, ginger ale or tonic." },
  { id: "energy-drink", name: "Energy Drink", cat: "drinks", price: 40, img: "drink", rate: 100, tags: [], desc: "250 ml can, served cold." },
  { id: "jack-daniels-honey", name: "Jack Daniel's Honey", cat: "drinks", price: 350, img: "whiskey", rate: 92, tags: [], desc: "Bottle, served with ice and soda on the side." },
  { id: "barterhouse-orphan-barrel", name: "Barterhouse Orphan Barrel", cat: "drinks", price: 430, img: "whiskey2", rate: 97, tags: [], desc: "20-year Kentucky bourbon. Bottle service." },
  { id: "jameson-triple-distilled", name: "Jameson Triple Distilled", cat: "drinks", price: 28, img: "whiskey3", rate: 94, tags: [], desc: "Single tot, neat or on the rocks." },
  { id: "vistalba", name: "Vistalba Malbec", cat: "drinks", price: 125, img: "wine", rate: 90, tags: [], desc: "Mendoza red with plum and cocoa. Made for the grill." },
  { id: "rasteau", name: "Rasteau", cat: "drinks", price: 170, img: "wine2", rate: 93, tags: [], desc: "Southern Rhône Grenache, warm and spiced." },
  { id: "roche-mazet-chardonnay", name: "Roche Mazet Chardonnay", cat: "drinks", price: 140, img: "wine3", rate: 88, tags: [], desc: "Round and buttery. Pairs with the seafood platter." },
  { id: "borsao", name: "Borsao Garnacha", cat: "drinks", price: 140, img: "wine4", rate: 86, tags: [], desc: "Spanish red with dark cherry and pepper." },
  { id: "sauvignon-blanc", name: "Sauvignon Blanc", cat: "drinks", price: 132, img: "wine5", rate: 91, tags: [], desc: "Cape crisp and zesty, served well chilled." }
];

HOF.events = [
  { id: "colours-of-summer", name: "Colours of Summer", img: "eventcolor", date: "2026-12-06", time: "14:00", kind: ["seasonal", "upcoming"], price: 120, place: "Garden terrace", desc: "Powder colour, a DJ on the terrace and a cold-press bar until sunset." },
  { id: "spiritual-sundays", name: "Spiritual Sundays", img: "heroimage2", date: "2026-11-01", time: "09:30", kind: ["new"], price: 80, place: "Upstairs room", desc: "Breathwork and meditation with Jack Pella & Melissa Cabelo, then a slow brunch." },
  { id: "flavors-concert", name: "Flavors Concert", img: "eventpaty", date: "2026-11-21", time: "20:00", kind: ["new", "upcoming"], price: 180, place: "Main hall", desc: "Live band, late kitchen and the bar open till two." },
  { id: "kids-day", name: "Kids Day", img: "kids", date: "2026-11-15", time: "11:00", kind: ["upcoming"], price: 0, place: "Courtyard", desc: "Pizza-making, face paint and a kids' menu at half price." },
  { id: "fireflies", name: "Fireflies", img: "event", date: "2026-11-28", time: "19:00", kind: ["upcoming"], price: 150, place: "Rooftop", desc: "A lantern night on the rooftop with charcoal-grill specials." },
  { id: "we-love-house-fest", name: "We Love House Fest", img: "eventfest", date: "2026-12-31", time: "21:00", kind: ["seasonal", "upcoming"], price: 450, place: "Main hall & terrace", desc: "Our New Year's Eve party: three DJs, a tasting menu and fireworks at midnight." },
  { id: "couple-competition", name: "Couple Competition Wedding", img: "eventwed", date: "2026-08-23", time: "16:00", kind: [], price: 0, place: "Garden", desc: "Zack & Munira won the year's dinner-for-life draw and married in our garden." },
  { id: "restaurant-to-app", name: "From One Restaurant to a Worldwide App", img: "eventtech", date: "2026-09-12", time: "18:00", kind: [], price: 0, place: "Main hall", desc: "The launch night of our ordering app, with talks from the team who built it." },
  { id: "womens-day", name: "Women's Day", img: "mother", date: "2026-04-07", time: "12:00", kind: ["seasonal"], price: 0, place: "All houses", desc: "A long lunch hosted by the women who run our kitchens, on 7 April." },
  { id: "taste-of-spring", name: "Taste of Spring", img: "eventtaste", date: "2026-09-26", time: "13:00", kind: ["seasonal"], price: 160, place: "Garden terrace", desc: "A small-plates market with eight producers and their wines." },
  { id: "renaissance-fair", name: "Renaissance Fair", img: "eventrena", date: "2026-07-18", time: "10:00", kind: [], price: 90, place: "Outdoor grounds", desc: "Costumes, a jousting show and a spit-roast feast." },
  { id: "fathers-day", name: "Father's Day", img: "father", date: "2026-06-21", time: "12:00", kind: ["seasonal"], price: 0, place: "All houses", desc: "A free dessert for every dad and a ribs-and-beer special." },
  { id: "happy-new-year", name: "Happy New Year Brunch", img: "eventyear", date: "2027-01-01", time: "11:00", kind: ["seasonal", "upcoming"], price: 220, place: "Main hall", desc: "Recovery brunch with bottomless coffee and mimosas." },
  { id: "ftt-business-conference", name: "FTT Business Conference", img: "eventbuss", date: "2026-10-03", time: "08:30", kind: [], price: 600, place: "Conference room", desc: "A day of hospitality-business talks, lunch included." },
  { id: "halloween", name: "Halloween", img: "halloween", date: "2026-10-31", time: "20:00", kind: ["seasonal", "new"], price: 150, place: "Bar", desc: "Costume night, a black menu and the bar dressed for the dead." },
  { id: "chateau-premiere", name: "Château Millogn Blanche Premiere", img: "eventwine", date: "2026-11-07", time: "19:30", kind: ["new", "upcoming"], price: 380, place: "The Winery", desc: "First pour of the 2023 vintage, paired with five courses." },
  { id: "valentines-day", name: "Valentine's Day", img: "valentines", date: "2027-02-14", time: "19:00", kind: ["seasonal", "upcoming"], price: 520, place: "All houses", desc: "A six-course dinner for two with a glass of bubbles on arrival." },
  { id: "workers-day", name: "Workers' Day", img: "worker", date: "2026-05-01", time: "12:00", kind: ["seasonal"], price: 0, place: "All houses", desc: "Staff family lunch, with the doors open to everyone." },
  { id: "environment-day", name: "World Environment Day", img: "clean", date: "2026-06-05", time: "07:00", kind: ["seasonal"], price: 0, place: "Costa do Sol beach", desc: "A morning beach clean-up, then breakfast on the house." }
];

HOF.reviews = [
  { name: "Thandi M.", where: "Johannesburg", img: "testimonial4", text: "We came for the Texas Double Decker and stayed for the cocktails. The staff remembered our names on the second visit." },
  { name: "Rui C.", where: "Maputo", img: "testimonial3", text: "The Zambeziana chicken tastes like my grandmother's in Quelimane. I didn't expect that from a place this big." },
  { name: "Lerato K.", where: "Cape Town", img: "testimonial2", text: "Booked the terrace for my mother's 60th. They handled 22 of us without a single wrong order." }
];

HOF.coupons = {
  "YLJF37S05": { type: "percent", value: 50, label: "50% off your first order" },
  "HOUSE10": { type: "percent", value: 10, label: "10% off" },
  "FREEDEL": { type: "delivery", value: 0, label: "Free delivery" }
};

HOF.delivery = {
  collect: { label: "Collect at the house", fee: 0, eta: "Ready in 25 min" },
  standard: { label: "Standard delivery", fee: 35, eta: "45–60 min" },
  express: { label: "Express delivery", fee: 60, eta: "25–35 min" },
  scheduled: { label: "Scheduled delivery", fee: 45, eta: "At the time you choose" }
};
HOF.VAT = 0.15;
