// Verified public data for Central Store & Central Craft — Downtown Moline, IL
// Sources: facebook.com/centralstoremoline & untappd.com/v/central-store/8578130

window.CENTRAL_STORE_DATA = {
  business: {
    name: "Central Store",
    legalName: "Central Store LLC",
    owner: "Hong Nguyen",
    sisterVenue: "Central Craft",
    established: 2018,
    address: "1810 5th Ave, Suite D",
    sisterAddress: "1810 5th Ave, Suite F",
    cityStateZip: "Moline, IL 61265",
    phone: "(309) 524-4054",
    phoneHref: "tel:+13095244054",
    craftPhone: "(309) 517-3412",
    craftPhoneHref: "tel:+13095173412",
    email: "centralstorellc@gmail.com",
    orderUrl: "https://order.holiq.io/centralstore",
    facebookUrl: "https://www.facebook.com/centralstoremoline/",
    facebookReelsUrl: "https://www.facebook.com/centralstoremoline/reels/",
    untappdStoreUrl: "https://untappd.com/v/central-store/8578130",
    untappdCraftUrl: "https://untappd.com/v/central-craft/11512848",
    yelpUrl: "https://yelp.com/biz/ZCCMhdZ2OEPxtJt0U1kjQA",
    twitterUrl: "https://twitter.com/centralstoremo1",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Central+Store+1810+5th+Ave+Suite+D+Moline+IL+61265"
  },

  // Untappd verified hours (America/Chicago)
  // day: 0 = Sun, 1 = Mon, ... 6 = Sat
  hours: [
    { day: 1, label: "Monday",    open: 6,  close: 24, display: "6:00 AM – 12:00 AM" },
    { day: 2, label: "Tuesday",   open: 6,  close: 24, display: "6:00 AM – 12:00 AM" },
    { day: 3, label: "Wednesday", open: 6,  close: 24, display: "6:00 AM – 12:00 AM" },
    { day: 4, label: "Thursday",  open: 6,  close: 24, display: "6:00 AM – 12:00 AM" },
    { day: 5, label: "Friday",    open: 6,  close: 25, display: "6:00 AM – 1:00 AM" },
    { day: 6, label: "Saturday",  open: 6,  close: 25, display: "6:00 AM – 1:00 AM" },
    { day: 0, label: "Sunday",    open: 8,  close: 24, display: "8:00 AM – 12:00 AM" }
  ],

  breweries: [
    "Hop Butcher For The World",
    "Revolution Brewing",
    "Phase Three Brewing",
    "Mikerphone Brewing",
    "The Veil Brewing Co.",
    "Xül Beer Company",
    "Wax Wings Brewing",
    "Crooked Stave",
    "Anchorage Brewing",
    "Finback Brewery",
    "More Brewing",
    "Drekker Brewing",
    "Other Half",
    "Mortalis Brewing",
    "903 Brewers",
    "Great Notion",
    "Narrow Gauge",
    "BlackStack Brewing",
    "Young Blood Beer Co.",
    "The Brewing Projekt"
  ],

  // Interactive "Find Your Pour" Mood Matcher
  pourMoods: [
    {
      id: "hazy",
      label: "Hazy & Juicy IPAs",
      tag: "Hop Bombs",
      summary: "Pillow-soft Midwest & national hazy IPAs bursting with Citra, Mosaic, Nelson Sauvin, and tropical citrus.",
      picks: [
        {
          id: "draft-4",
          name: "Double NNazareth",
          maker: "Wax Wings Brewing Co.",
          spec: "8.5% ABV · ★ 4.25",
          where: "Suite F Draft ($0.66/oz)",
          note: "Saturated double dry-hopped hazy powerhouse pouring fresh on tap."
        },
        {
          id: "draft-7",
          name: "Hide Your Heart",
          maker: "The Veil Brewing Co.",
          spec: "8.0% ABV · ★ 4.20",
          where: "Suite F Draft ($0.81/oz)",
          note: "Rare Virginia cult hazy DIPA — hard to find anywhere in the Midwest."
        },
        {
          id: "cooler-1",
          name: "Triple Pepperoni",
          maker: "Hop Butcher For The World",
          spec: "10.5% ABV · 16oz Can",
          where: "Suite D Cold Cooler",
          note: "Chicago icon hopped with Citra, Nelson Sauvin, Galaxy & Vic Secret."
        }
      ]
    },
    {
      id: "stout",
      label: "Big Barrel-Aged Stouts",
      tag: "Dark & Rich",
      summary: "Velvety imperial stouts, bourbon barrel-aged Deep Wood legends, espresso roasts, and decadent dessert pours.",
      picks: [
        {
          id: "draft-1",
          name: "Hit Single Select Vol. 4",
          maker: "Mikerphone Brewing",
          spec: "16.4% ABV · ★ 4.39",
          where: "Suite F Draft ($1.50/oz)",
          note: "Our highest-rated tap pour — massive barrel-aged imperial stout."
        },
        {
          id: "draft-3",
          name: "Café Deth",
          maker: "Revolution Brewing",
          spec: "14.8% ABV · ★ 4.29",
          where: "Suite F Draft · Deep Wood",
          note: "Bourbon barrel-aged oatmeal stout conditioned on Dark Matter coffee."
        },
        {
          id: "draft-5",
          name: "Deth's Tar",
          maker: "Revolution Brewing",
          spec: "14.8% ABV · ★ 4.23",
          where: "Suite F Draft ($1.00/oz)",
          note: "Flagship Chicago barrel-aged imperial oatmeal stout — pay by the ounce."
        }
      ]
    },
    {
      id: "sour",
      label: "Fruited & Tart Sours",
      tag: "Bold Fruit",
      summary: "Jammy smoothie sours, nostalgic peanut-butter-and-jelly pours, real fruit Berliner Weisses, and crisp tart ales.",
      picks: [
        {
          id: "draft-2",
          name: "PB&J Mixtape",
          maker: "Xül Beer Company",
          spec: "6.5% ABV · ★ 4.36",
          where: "Suite F Draft ($0.70/oz)",
          note: "Cult-favorite Knoxville fruited sour — sweet berry jam & roasted peanut finish."
        },
        {
          id: "draft-12",
          name: "Crunchee Whip",
          maker: "Phase Three Brewing",
          spec: "7.0% ABV · ★ 3.96",
          where: "Suite F Draft ($0.75/oz)",
          note: "Lush Midwest fruited sour crafted by Chicagoland's Phase Three."
        },
        {
          id: "cooler-7",
          name: "PB&Jam Juice (Grape)",
          maker: "Mikerphone Brewing",
          spec: "5.0% ABV · 16oz Can",
          where: "Suite D Cold Cooler",
          note: "Grab singles or a 4-pack straight from our glowing cooler wall."
        }
      ]
    },
    {
      id: "crisp",
      label: "Crisp & Easy-Drinking",
      tag: "Clean Finish",
      summary: "Craft Italian pilsners, ultra-clean light lagers, and classic amber pours built for effortless sipping.",
      picks: [
        {
          id: "draft-15",
          name: "Hey Mambo, Mambo Italiano!",
          maker: "Mikerphone Brewing",
          spec: "5.0% ABV · ★ 3.72",
          where: "Suite F Draft ($0.35/oz)",
          note: "Crisp, floral noble-hopped Italian-style pilsner."
        },
        {
          id: "draft-14",
          name: "Numb",
          maker: "The Veil Brewing Co.",
          spec: "4.4% ABV · ★ 3.77",
          where: "Suite F Draft ($0.35/oz)",
          note: "Snap-crisp craft American light lager from Richmond's finest."
        },
        {
          id: "cooler-15",
          name: "Pocha",
          maker: "Hopewell Brewing Co.",
          spec: "5.0% ABV · 16oz Can",
          where: "Suite D Cold Cooler",
          note: "Ultra-refreshing Chicago craft lager made for food & easy nights."
        }
      ]
    },
    {
      id: "bourbon",
      label: "Bourbon & Store Picks",
      tag: "Whiskey Vault",
      summary: "Quad Cities-exclusive single barrels, allocated Kentucky staples, and 24+ whiskeys poured fairly by the ounce.",
      picks: [
        {
          id: "spirit-1",
          name: "Fiddler Steel Plow & Combine (8-Yr)",
          maker: "ASW Distillery × John Deere",
          spec: "8-Year · Oak Stave Finish",
          where: "Suite D & F Exclusive",
          note: "Quad Cities exclusive bottles celebrating Moline heritage."
        },
        {
          id: "spirit-6",
          name: "Starlight Distillery Barrel Finishes",
          maker: "Huber's Starlight Distillery",
          spec: "7 Finishes · $5.50–$7.25/oz",
          where: "Suite F Bourbon Bar",
          note: "VDN, Cognac, Calvados, Sherry, Double Oak, Apple Brandy & Rye."
        },
        {
          id: "spirit-2",
          name: "Blanton's Single Barrel",
          maker: "Buffalo Trace Distillery",
          spec: "Allocated · $6.50/oz",
          where: "Suite F Bourbon Bar",
          note: "Taste allocated classics alongside E.H. Taylor & Eagle Rare."
        }
      ]
    },
    {
      id: "zeroproof",
      label: "Zero-Proof & Hemp (21+)",
      tag: "No Alcohol",
      summary: "One of the Quad Cities' biggest zero-proof selections — craft THC-infused sodas, lemonades, ciders & NA brews.",
      picks: [
        {
          id: "na-1",
          name: "Oliphant THC Infused Lineup",
          maker: "Oliphant Brewing",
          spec: "10mg – 100mg · Zero Alcohol",
          where: "Suite D Cold Cooler",
          note: "Altar Rainbow Sherbet, Doom Lemonade, Extinct Blackberry & Evil POG."
        },
        {
          id: "na-2",
          name: "Looner Craft THC Sodas",
          maker: "Looner Sodas",
          spec: "50mg Extra-Strength · 12oz",
          where: "Suite D Cold Cooler",
          note: "Classic Root Beer, Sweet Orange, and Wild Grape craft sodas."
        },
        {
          id: "na-4",
          name: "Mary Jane's Mule (Ginger + Lime)",
          maker: "Craft Infused Beverages",
          spec: "10mg Δ9 THC · 12oz Can",
          where: "Suite D Cold Cooler",
          note: "Zesty ginger-lime mocktail alternative — crisp over ice."
        }
      ]
    }
  ],

  // Live Central Craft Draft List (from verified Untappd venue menu)
  drafts: [
    {
      id: "draft-1",
      tap: 1,
      name: "Hit Single Select Vol. 4",
      brewery: "Mikerphone Brewing",
      style: "Imperial / Double Stout",
      category: "Stout",
      abv: 16.4,
      price: "$1.50 / oz",
      priceNum: 1.50,
      rating: 4.39,
      highlight: "Top Rated"
    },
    {
      id: "draft-2",
      tap: 2,
      name: "PB&J Mixtape",
      brewery: "Xül Beer Company",
      style: "Fruited Sour",
      category: "Sour",
      abv: 6.5,
      price: "$0.70 / oz",
      priceNum: 0.70,
      rating: 4.36,
      highlight: "Fan Favorite"
    },
    {
      id: "draft-3",
      tap: 3,
      name: "Café Deth",
      brewery: "Revolution Brewing",
      style: "Barrel-Aged Imperial Coffee Stout",
      category: "Stout",
      abv: 14.8,
      price: "Ask Bartender",
      priceNum: 1.15,
      rating: 4.29,
      highlight: "Deep Wood Series"
    },
    {
      id: "draft-4",
      tap: 4,
      name: "Double NNazareth",
      brewery: "Wax Wings Brewing Co.",
      style: "Double NE / Hazy IPA",
      category: "Hazy IPA",
      abv: 8.5,
      price: "$0.66 / oz",
      priceNum: 0.66,
      rating: 4.25
    },
    {
      id: "draft-5",
      tap: 5,
      name: "Deth's Tar",
      brewery: "Revolution Brewing",
      style: "Barrel-Aged Imperial Oatmeal Stout",
      category: "Stout",
      abv: 14.8,
      price: "$1.00 / oz",
      priceNum: 1.00,
      rating: 4.23,
      highlight: "Deep Wood Series"
    },
    {
      id: "draft-6",
      tap: 6,
      name: "The Pursuit",
      brewery: "Wax Wings Brewing Co.",
      style: "Double NE / Hazy IPA",
      category: "Hazy IPA",
      abv: 8.5,
      price: "$0.66 / oz",
      priceNum: 0.66,
      rating: 4.21
    },
    {
      id: "draft-7",
      tap: 7,
      name: "Hide Your Heart",
      brewery: "The Veil Brewing Co.",
      style: "Double NE / Hazy IPA",
      category: "Hazy IPA",
      abv: 8.0,
      price: "$0.81 / oz",
      priceNum: 0.81,
      rating: 4.20,
      highlight: "Rare Pour"
    },
    {
      id: "draft-8",
      tap: 8,
      name: "Revenge",
      brewery: "Anchorage Brewing Co.",
      style: "Double NE / Hazy IPA",
      category: "Hazy IPA",
      abv: 8.4,
      price: "$0.80 / oz",
      priceNum: 0.80,
      rating: 4.17
    },
    {
      id: "draft-9",
      tap: 9,
      name: "That Tingle In Your Spine",
      brewery: "Hop Butcher For The World",
      style: "Double NE / Hazy IPA",
      category: "Hazy IPA",
      abv: 8.5,
      price: "$0.75 / oz",
      priceNum: 0.75,
      rating: 4.06
    },
    {
      id: "draft-10",
      tap: 10,
      name: "Shadows of Light",
      brewery: "Finback Brewery",
      style: "New England / Hazy IPA",
      category: "Hazy IPA",
      abv: 7.0,
      price: "$0.65 / oz",
      priceNum: 0.65,
      rating: 4.05
    },
    {
      id: "draft-11",
      tap: 11,
      name: "Nest of Vipers",
      brewery: "Xül Beer Company",
      style: "New England / Hazy IPA",
      category: "Hazy IPA",
      abv: 6.5,
      price: "$0.60 / oz",
      priceNum: 0.60,
      rating: 4.03
    },
    {
      id: "draft-12",
      tap: 12,
      name: "Crunchee Whip",
      brewery: "Phase Three Brewing",
      style: "Fruited Sour",
      category: "Sour",
      abv: 7.0,
      price: "$0.75 / oz",
      priceNum: 0.75,
      rating: 3.96
    },
    {
      id: "draft-13",
      tap: 13,
      name: "Finger Food",
      brewery: "Hop Butcher For The World",
      style: "American IPA",
      category: "IPA",
      abv: 7.0,
      price: "$0.75 / oz",
      priceNum: 0.75,
      rating: 3.94
    },
    {
      id: "draft-14",
      tap: 14,
      name: "Numb",
      brewery: "The Veil Brewing Co.",
      style: "American Light Lager",
      category: "Lager",
      abv: 4.4,
      price: "$0.35 / oz",
      priceNum: 0.35,
      rating: 3.77
    },
    {
      id: "draft-15",
      tap: 15,
      name: "Hey Mambo, Mambo Italiano!",
      brewery: "Mikerphone Brewing",
      style: "Italian Pilsner",
      category: "Lager",
      abv: 5.0,
      price: "$0.35 / oz",
      priceNum: 0.35,
      rating: 3.72
    },
    {
      id: "draft-16",
      tap: 16,
      name: "Traditional Lager",
      brewery: "Yuengling Brewery",
      style: "American Amber Lager",
      category: "Lager",
      abv: 4.5,
      price: "$0.13 / oz",
      priceNum: 0.13,
      rating: 3.50
    }
  ],

  // Curated highlights from the 304+ cooler inventory
  cooler: [
    {
      id: "cooler-1",
      name: "Triple Pepperoni",
      brewery: "Hop Butcher For The World",
      style: "Triple NE / Hazy IPA",
      category: "Hazy IPA",
      abv: 10.5,
      format: "16oz Can · Singles & 4-Packs",
      tag: "Fresh Drop"
    },
    {
      id: "cooler-2",
      name: "Anniversary Brew",
      brewery: "Hop Butcher For The World",
      style: "Double NE / Hazy IPA",
      category: "Hazy IPA",
      abv: 8.5,
      format: "16oz Can · Citra, Thora, Riwaka",
      tag: "Limited"
    },
    {
      id: "cooler-3",
      name: "Morever and Ever",
      brewery: "More Brewing Company",
      style: "Double NE / Hazy IPA",
      category: "Hazy IPA",
      abv: 8.0,
      format: "16oz Can · Cold Cooler",
      tag: "Fresh Drop"
    },
    {
      id: "cooler-4",
      name: "Beef Dipped",
      brewery: "Hop Butcher For The World",
      style: "Double NE / Hazy IPA",
      category: "Hazy IPA",
      abv: 7.5,
      format: "16oz Can · Simcoe-Hopped",
      tag: "Chicago Classic"
    },
    {
      id: "cooler-5",
      name: "Cheese Pull",
      brewery: "Hop Butcher For The World",
      style: "New England / Hazy IPA",
      category: "Hazy IPA",
      abv: 6.5,
      format: "16oz Can · Nelson Sauvin & Galaxy"
    },
    {
      id: "cooler-6",
      name: "Bottled Up",
      brewery: "Mikerphone Brewing",
      style: "Imperial / Double IPA",
      category: "IPA",
      abv: 8.2,
      format: "Large Format Bottle",
      tag: "Special Release"
    },
    {
      id: "cooler-7",
      name: "PB&Jam Juice (Grape)",
      brewery: "Mikerphone Brewing",
      style: "Fruited Sour",
      category: "Sour",
      abv: 5.0,
      format: "16oz Can · Cold Cooler",
      tag: "Fan Favorite"
    },
    {
      id: "cooler-8",
      name: "Ode To My Family",
      brewery: "Mikerphone Brewing",
      style: "Fruited Berliner Weisse",
      category: "Sour",
      abv: 6.3,
      format: "16oz Can · Cranberry & Orange Peel"
    },
    {
      id: "cooler-9",
      name: "Live From Chicago",
      brewery: "Hop Butcher For The World",
      style: "American IPA",
      category: "IPA",
      abv: 6.8,
      format: "16oz Can · Simcoe, Citra & Galaxy"
    },
    {
      id: "cooler-10",
      name: "Skeleton Cruise",
      brewery: "Hop Butcher For The World",
      style: "American IPA",
      category: "IPA",
      abv: 7.0,
      format: "16oz Can · Mosaic, Centennial & Simcoe"
    },
    {
      id: "cooler-11",
      name: "Holiday Ale",
      brewery: "Crooked Stave Brewing Co.",
      style: "Spiced Fruited Sour Ale",
      category: "Seasonal",
      abv: 6.0,
      format: "Bottle · Juniper & Spruce Tips",
      tag: "Seasonal"
    },
    {
      id: "cooler-12",
      name: "Sleigh Queen!",
      brewery: "Crooked Stave Brewing Co.",
      style: "Winter Holiday Ale",
      category: "Seasonal",
      abv: 6.2,
      format: "12oz Can · Cold Cooler",
      tag: "Seasonal"
    },
    {
      id: "cooler-13",
      name: "West Coast IPA",
      brewery: "Crooked Stave Brewing Co.",
      style: "West Coast IPA",
      category: "IPA",
      abv: 7.0,
      format: "12oz Can · Crisp & Piney"
    },
    {
      id: "cooler-14",
      name: "Just Peachy",
      brewery: "Crooked Stave Brewing Co.",
      style: "Fruited Sour Ale",
      category: "Sour",
      abv: 4.5,
      format: "12oz Can · Real Peach"
    },
    {
      id: "cooler-15",
      name: "Pocha",
      brewery: "Hopewell Brewing Co.",
      style: "Crisp Craft Lager",
      category: "Lager",
      abv: 5.0,
      format: "16oz Can · Cold Cooler"
    },
    {
      id: "cooler-16",
      name: "Double Stack",
      brewery: "Great Notion Brewing",
      style: "Imperial Breakfast Stout",
      category: "Stout",
      abv: 11.0,
      format: "Rotating Drop · Maple & Coffee",
      tag: "Hype Drop"
    }
  ],

  // Real Bourbon & Whiskey Program (Central Craft pours & Store Exclusives)
  spirits: [
    {
      id: "spirit-1",
      name: "Fiddler Steel Plow Rye & Combine Bourbon (8-Yr)",
      distillery: "ASW Distillery × John Deere",
      category: "Store Exclusive",
      price: "Retail Bottles",
      priceNum: 0,
      notes: "Aged 8 years, finished on hand-harvested oak staves. Exclusive to Central Store & Central Craft QC.",
      highlight: "QC Exclusive"
    },
    {
      id: "spirit-2",
      name: "Blanton's Single Barrel",
      distillery: "Buffalo Trace Distillery",
      category: "Allocated Bourbon",
      price: "$6.50 / oz",
      priceNum: 6.50,
      notes: "Classic allocated Kentucky Straight Bourbon poured by the ounce at Central Craft."
    },
    {
      id: "spirit-3",
      name: "E.H. Taylor Small Batch",
      distillery: "Buffalo Trace Distillery",
      category: "Allocated Bourbon",
      price: "$4.00 / oz",
      priceNum: 4.00,
      notes: "Bottled-in-Bond 100 proof classic with caramel corn, butterscotch, and subtle spice."
    },
    {
      id: "spirit-4",
      name: "Eagle Rare 10 Year",
      distillery: "Buffalo Trace Distillery",
      category: "Allocated Bourbon",
      price: "$4.00 / oz",
      priceNum: 4.00,
      notes: "Complex toffee, orange peel, herbs, honey, and oak."
    },
    {
      id: "spirit-5",
      name: "Smoke Wagon Uncut / Unfiltered Batch 142",
      distillery: "Nevada H&C Distilling",
      category: "Barrel Proof",
      price: "$6.25 / oz",
      priceNum: 6.25,
      notes: "High-rye cask strength powerhouse with bold baking spice and rich vanilla."
    },
    {
      id: "spirit-6",
      name: "Starlight Distillery Barrel Finishes",
      distillery: "Huber's Starlight Distillery",
      category: "Store Pick",
      price: "$5.50 – $7.25 / oz",
      priceNum: 5.50,
      notes: "VDN, Cognac, Cooper Grand Rye, Apple Brandy, Calvados, Double Oak & Sherry finishes.",
      highlight: "7 Finishes"
    },
    {
      id: "spirit-7",
      name: "New Riff Single Barrel Bourbon & Rye",
      distillery: "New Riff Distilling",
      category: "Store Pick",
      price: "$4.00 – $5.25 / oz",
      priceNum: 4.00,
      notes: "Straight Bourbon, Straight Rye, Single Barrel Bourbon & Single Barrel Rye lineups."
    },
    {
      id: "spirit-8",
      name: "Oak & Eden Central Store Pick",
      distillery: "Oak & Eden Whiskey",
      category: "Store Pick",
      price: "$5.00 / oz",
      priceNum: 5.00,
      notes: "Custom spire-finished store pick curated specifically for our Moline shelves.",
      highlight: "Store Pick"
    },
    {
      id: "spirit-9",
      name: "Redwood Empire Monarch & Pipe Dream",
      distillery: "Redwood Empire Whiskey",
      category: "Small Batch",
      price: "$4.50 / oz",
      priceNum: 4.50,
      notes: "Northern California craft bourbon & blended whiskey pours."
    },
    {
      id: "spirit-10",
      name: "Buffalo Trace",
      distillery: "Buffalo Trace Distillery",
      category: "Allocated Bourbon",
      price: "$2.50 / oz",
      priceNum: 2.50,
      notes: "Everyday favorite Kentucky Straight Bourbon poured fairly."
    },
    {
      id: "spirit-11",
      name: "Chicken Cock Kentucky Straight",
      distillery: "Chicken Cock Whiskey",
      category: "Small Batch",
      price: "$6.50 / oz",
      priceNum: 6.50,
      notes: "Historic heritage bourbon with rich dried fruit, pecan, and butterscotch."
    },
    {
      id: "spirit-12",
      name: "Breckenridge Dark Arts",
      distillery: "Breckenridge Distillery",
      category: "Rare Pour",
      price: "$36.00 / pour",
      priceNum: 36.00,
      notes: "Ultra-limited collector's malt mash expression for special occasions.",
      highlight: "Ultra Rare"
    }
  ],

  // Real Zero-Proof & 21+ Hemp-Derived THC Wall (from real store inventory photos)
  zeroproof: [
    {
      id: "na-1",
      name: "Altar, Doom, Extinct & Evil Series",
      brewery: "Oliphant Brewing",
      style: "Hemp-Infused Sodas & Lemonades (0.0% ABV)",
      category: "THC Infused (21+)",
      strength: "10mg – 100mg THC",
      format: "12oz Cans · Cold Cooler",
      tag: "Huge Selection"
    },
    {
      id: "na-2",
      name: "Classic Root Beer, Sweet Orange & Wild Grape",
      brewery: "Looner Craft Sodas",
      style: "Extra-Strength Craft THC Sodas (0.0% ABV)",
      category: "THC Infused (21+)",
      strength: "50mg THC / Can",
      format: "12oz Cans · Cold Cooler",
      tag: "Customer Favorite"
    },
    {
      id: "na-3",
      name: "Peaches & Cream / Blue Raspberry / Pineapple",
      brewery: "Eclectric Infused",
      style: "Fruit-Forward Infused Lemonades (0.0% ABV)",
      category: "THC Infused (21+)",
      strength: "25mg Δ9 THC",
      format: "12oz Cans · Cold Cooler"
    },
    {
      id: "na-4",
      name: "Mary Jane's Mule (Ginger + Lime)",
      brewery: "Craft Infused Mocktails",
      style: "Botanical Ginger Lime Mule (0.0% ABV)",
      category: "Infused Mocktail (21+)",
      strength: "10mg Δ9 THC",
      format: "12oz Cans · Cold Cooler",
      tag: "Crisp & Zesty"
    },
    {
      id: "na-5",
      name: "Honeycrisp Infused Cider",
      brewery: "Midwest Craft Cider",
      style: "Orchard Apple Infused Cider (0.0% ABV)",
      category: "Infused Cider (21+)",
      strength: "10mg THC · 5mg/serv",
      format: "12oz Cans · Cold Cooler"
    },
    {
      id: "na-6",
      name: "Puff Zilla Blue Raspberry & Blueberry Cheesecake",
      brewery: "Bent Paddle × Oliphant",
      style: "Midwest Craft Infused Specialties (0.0% ABV)",
      category: "THC Infused (21+)",
      strength: "10mg – 25mg THC",
      format: "12oz Cans · Cold Cooler"
    },
    {
      id: "na-7",
      name: "Hop Waters & Non-Alcoholic Craft Beers",
      brewery: "Rotating Craft Brewers",
      style: "Zero-Proof IPAs, Lagers & Sparkling Hop Water",
      category: "0.0% Non-Alcoholic",
      strength: "0.0% ABV · Zero THC",
      format: "Singles & 6-Packs",
      tag: "Largest NA Wall"
    },
    {
      id: "na-8",
      name: "Craft Sodas, Energy & Harvest Ridge Coffee",
      brewery: "Central Store Market",
      style: "Fresh Brewed Coffee, Cold Sodas & Grab-and-Go",
      category: "Everyday Drinks",
      strength: "All Ages",
      format: "Open 6 AM Daily"
    }
  ],

  // Real Facebook Reels from facebook.com/centralstoremoline
  reels: [
    {
      id: "reel-beer-more",
      title: "Great Beer & More",
      caption: "Wall-to-wall weekly craft beer & infused beverage drop — WeldWerks Juicy Bits, Phase Three, 903 Brewers, More Brewing, Oliphant & more.",
      views: "1.2K views",
      badge: "Craft Beer Drop",
      thumbnail: "assets/images/reel-4-beer-more.avif",
      url: "https://www.facebook.com/reel/1775825549907659/",
      embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1775825549907659%2F&show_text=false&width=360"
    },
    {
      id: "reel-gifts",
      title: "Gifts Galore in Downtown Moline",
      caption: "Bourbon, scotch (Johnnie Walker Blue Label, King George V, Penelope Toasted), gift cards, craft beer and so much more. Shop small & local.",
      views: "690 views",
      badge: "Bourbon & Scotch",
      thumbnail: "assets/images/reel-5-gifts.jpg",
      url: "https://www.facebook.com/reel/712660870841286/",
      embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F712660870841286%2F&show_text=false&width=360"
    },
    {
      id: "reel-latest",
      title: "Latest Spirits & #JackBlackFriday Feature",
      caption: "Fresh off the Central Store Facebook reel feed — holiday whiskey drops, Jack Daniel's features & weekend specials in Suite D.",
      views: "New Reel",
      badge: "Whiskey Feature",
      thumbnail: "assets/images/reel-1-latest.jpg",
      url: "https://www.facebook.com/reel/1878058370291806/",
      embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1878058370291806%2F&show_text=false&width=360"
    },
    {
      id: "reel-jack-coming",
      title: "#ComingSoon #JackBlackFriday",
      caption: "Holiday spirit spotlights & countdown promos straight from Central Store's downtown Moline team.",
      views: "152 views",
      badge: "Holiday Promo",
      thumbnail: "assets/images/fiddler-bourbon.jpg",
      url: "https://www.facebook.com/reel/2010019913011655/",
      embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2010019913011655%2F&show_text=false&width=360"
    }
  ],

  // Real Photos downloaded from Central Store Moline Facebook & Untappd
  gallery: [
    {
      id: "img-craft-drop",
      src: "assets/images/craft-beer-drop.jpg",
      title: "Wednesday Craft Beer Drop",
      caption: "Fresh stack on the granite counter: Hop Butcher (Cheese Pull, Triple Pepperoni, Beef Dipped, Anniversary Brew), More Brewing, Mikerphone & Crooked Stave.",
      category: "Craft Beer",
      featured: true
    },
    {
      id: "img-storefront",
      src: "assets/images/storefront-night.jpg",
      title: "1810 5th Ave, Suite D — Downtown Moline",
      caption: "Our glowing storefront sign in Moline Centre — clean, welcoming, and open late seven days a week.",
      category: "Inside the Store"
    },
    {
      id: "img-fiddler",
      src: "assets/images/fiddler-bourbon.jpg",
      title: "ASW × John Deere Exclusive Fiddler Whiskeys",
      caption: "8-Year Fiddler Steel Plow Rye & Combine Straight Bourbon finished on hand-harvested oak staves — exclusive to Central Store & Central Craft QC.",
      category: "Bourbon & Spirits",
      featured: true
    },
    {
      id: "img-cooler-wall",
      src: "assets/images/cooler-wall.jpg",
      title: "The Illuminated Cooler Wall",
      caption: "304+ chilled craft beers, single cans, 4-packs, seltzers, sodas, and seasonal favorites lined up cold and ready to grab.",
      category: "Inside the Store"
    },
    {
      id: "img-thirstday",
      src: "assets/images/thirstday-tower.jpg",
      title: "\"Thirstday\" Five-Story Can Wall",
      caption: "Weekly delivery day featuring Mikerphone Misty Mountain Hop, Drekker Chonk, 903 Brewers, More Brewing, and Young Blood Beer Co.",
      category: "Craft Beer"
    },
    {
      id: "img-barrel-pick",
      src: "assets/images/barrel-pick.jpg",
      title: "Rickhouse Barrel Selection",
      caption: "Putting the Central Store name directly on our hand-selected George Dickel / Goose Island barrel pick.",
      category: "Bourbon & Spirits"
    },
    {
      id: "img-interior-main",
      src: "assets/images/fb-profile-interior.jpg",
      title: "Modern Industrial Downtown Market",
      caption: "Matte-black ceilings, Harvest Ridge fresh coffee bar, grab-and-go case, wine barrel displays, and spotless aisles.",
      category: "Inside the Store"
    },
    {
      id: "img-hemp-na",
      src: "assets/images/oliphant-na.jpg",
      title: "Hemp-Infused & Zero-Proof Beverage Wall (21+)",
      caption: "One of the Quad Cities' largest lineups of zero-proof & hemp-derived THC sodas — Oliphant Brewing, Looner, Eclectric, and Mary Jane's Mule.",
      category: "Zero-Proof & Hemp"
    },
    {
      id: "img-hennessy",
      src: "assets/images/hennessy-rtd.jpg",
      title: "Hennessy Very Special Ready-to-Serve",
      caption: "Cognac-based Henny Iced Tea, Henny Berry & Henny Rita ready-to-serve bottles stocked alongside our spirits wall.",
      category: "Bourbon & Spirits"
    },
    {
      id: "img-aisles",
      src: "assets/images/fb-cover-interior.jpg",
      title: "Snacks, Sodas & Downtown Essentials",
      caption: "Wide polished concrete aisles stocked with snacks, chips, cold drinks, and neighborhood convenience favorites.",
      category: "Inside the Store"
    }
  ]
};
