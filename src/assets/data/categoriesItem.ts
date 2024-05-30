 const categoriesItem:string[]= [
    "backgrounds",
    "fashion",
    "nature",
    "science",
    "education",
    "feelings",
    "health",
    "people",
    "religion",
    "place",
    "animal",
    "computer",
    "industry",
    "food",
    "sport",
    "transportation",
    "travel",
    "buildings",
    "business",
    "music"
]
 interface Filter {
    order: string[];
    orientation: string[],
    type: string[];
    colors: string[];
 }

 
const filter:Filter = {
    order:["popular", "latest"],
    orientation: ["horizontal","vertical"],
    type: ["photo", "illustration", "vector"],
    colors: [
        "red",
        "black",
        "blue",
        "green",
        "orange",
        "white",
        "yellow",
         "pink",
         "grey",
         "brown",
         "turquoise"
    ]
}

export const data = {
    categoriesItem,filter
}