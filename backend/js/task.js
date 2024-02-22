
/**
 * Task 1
 */
function leafFiles(files) {
    // initialise array for names of leaf files
    let leafFileNames = []
    // loop through files
    for (let i = 0; i < files.length; i++) {
        // assume every file to be a leaf file
        let isLeaf = true;
        // check if this file is parent of any other files
        for (let j = 0; j < files.length; j++) {
            // if file is parent of any other file
            if (files[i].id === files[j].parent) {
                isLeaf = false;
                break;
            }
        }
        // push file of index i into leafFileNames if they are NOT parents of other files 
        if (isLeaf === true) {
            leafFileNames.push(files[i].name)
        }
    }
    return leafFileNames;
}

/**
 * Task 2
 */
function kLargestCategories(files, k) {
    // initialise an array to store categories
    const categoriesArray = [];
    // iterate through all files 
    for (const file of files) {
        // iterate through all categories of each file 
        for (const category of file.categories) {
            // use findIndex to determine if category already exists in categoriesArray
            const categoryIndex = categoriesArray.findIndex(obj => obj.name=== category);
            // if category already exists in categoriesArray i.e. findIndex returns -1
            if (categoryIndex !== -1) {
                // increment no. of files in that category 
                categoriesArray[categoryIndex].count++;
            }
            // if category does not exist in categoriesArray
            else {
                // create a new object with category name and count of 1
                categoriesArray.push({
                    name: category,
                    count: 1,
                })
            }
        }
    }
    // sort categories
    categoriesArray.sort((a,b) => {
        // if count is not the same 
        if (b.count !== a.count) {
            // sort by count in descending order
            return (b.count - a.count);
        }
        // if counts are the same, sort them lexicographically
        else {
            return (a.name.localeCompare(b.name));
        }
    })
    // create an array of strings containing sorted category names 
    let result = []
    for (let i = 0; i < categoriesArray.length; i++) {
        result.push(categoriesArray[i].name)
    }
    // if k < no. of categories, splice result array
    if (k < result.length) {
        return result.slice(0,k)
    }
    // if k >= no. of categories, return result 
    else {
        return result
    }
}

/**
 * Task 3
 */
function largestFileSize(files) {
    // initialise a variable which stores largest total size 
    let largestSize = 0

    // recursive function which traverses through all the children of a file and cumulatively adds to generate the total file size 
    function calculateSize (file) {
        let totalSize = file.size 
        // iterate through children of the file
        for (let i = 0; i < files.length; i++) {
            // if file is parent to another file
            if (file.id === files[i].parent) {
                // add size of child files 
                totalSize += calculateSize(files[i])
            }
        }

        return totalSize
    }
    // iterate through each file to find the largest total size
    for (const file of files) {
        // calculate the total size of the current file plus its children, grandchildren etc.
        let totalSize = calculateSize(file);
        // if totalSize > largestSize, update largestSize
        if (totalSize > largestSize) {
            largestSize = totalSize
        }
    }
    // console.log(largestSize)
    return largestSize
}


function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

const testFiles = [
    { id: 1, name: "Document.txt", categories: ["Documents"], parent: 3, size: 1024 },
    { id: 2, name: "Image.jpg", categories: ["Media", "Photos"], parent: 34, size: 2048 },
    { id: 3, name: "Folder", categories: ["Folder"], parent: -1, size: 0 },
    { id: 5, name: "Spreadsheet.xlsx", categories: ["Documents", "Excel"], parent: 3, size: 4096 },
    { id: 8, name: "Backup.zip", categories: ["Backup"], parent: 233, size: 8192 },
    { id: 13, name: "Presentation.pptx", categories: ["Documents", "Presentation"], parent: 3, size: 3072 },
    { id: 21, name: "Video.mp4", categories: ["Media", "Videos"], parent: 34, size: 6144 },
    { id: 34, name: "Folder2", categories: ["Folder"], parent: 3, size: 0 },
    { id: 55, name: "Code.py", categories: ["Programming"], parent: -1, size: 1536 },
    { id: 89, name: "Audio.mp3", categories: ["Media", "Audio"], parent: 34, size: 2560 },
    { id: 144, name: "Spreadsheet2.xlsx", categories: ["Documents", "Excel"], parent: 3, size: 2048 },
    { id: 233, name: "Folder3", categories: ["Folder"], parent: -1, size: 4096 },
    // { id: 300, name: "Big file", categories: [], parent: 233, size: 9999999},
];






console.assert(arraysEqual(
    leafFiles(testFiles).sort((a, b) => a.localeCompare(b)),
    [
        "Audio.mp3",
        "Backup.zip",
        "Code.py",
        "Document.txt",
        "Image.jpg",
        "Presentation.pptx",
        "Spreadsheet.xlsx",
        "Spreadsheet2.xlsx",
        "Video.mp4"
    ]
));

console.assert(arraysEqual(
    kLargestCategories(testFiles, 3),
    ["Documents", "Folder", "Media"]
));

console.assert(largestFileSize(testFiles) == 20992)

// ==================================================================================================
// FURTHER TESTING 

const task1test1 = [
    {id: 1, name: "a", categories: [], parent: -1, size: 1},
    {id: 2, name: "b", categories: [], parent: -1, size: 1},
    {id: 3, name: "c", categories: [], parent: -1, size: 1},
    {id: 4, name: "d", categories: [], parent: -1, size: 1},
    {id: 5, name: "e", categories: [], parent: -1, size: 1},

];
// task1test1 - if all files are leaves 
console.assert(arraysEqual(
    leafFiles(task1test1).sort((a, b) => a.localeCompare(b)),
    [
        "a",
        "b",
        "c",
        "d",
        "e",
    ]
));

const task1test2 = [
    {id: 1, name: "a", categories: [], parent: 5, size: 1},
    {id: 2, name: "b", categories: [], parent: 4, size: 1},
    {id: 3, name: "c", categories: [], parent: 3, size: 1},
    {id: 4, name: "d", categories: [], parent: 2, size: 1},
    {id: 5, name: "e", categories: [], parent: 1, size: 1},

];

// task1test2 - no files are leaves (hypothetically)
console.assert(arraysEqual(
    leafFiles(task1test2).sort((a, b) => a.localeCompare(b)),
    []
));


const task2test1 = [
    {id: 1, name: "a", categories: ["a"], parent: 5, size: 1},
    {id: 2, name: "b", categories: ["b"], parent: 4, size: 1},
    {id: 3, name: "c", categories: ["c"], parent: 3, size: 1},
    {id: 4, name: "d", categories: ["d"], parent: 2, size: 1},
    {id: 5, name: "e", categories: ["e"], parent: 1, size: 1},

];

// task2test1 - all categories have same size, k = no. of categories
console.assert(arraysEqual(
    kLargestCategories(task2test1, 5),
    ["a", "b", "c", "d", "e"]
));

// task2test2 - all categories have same size, k < no. of categories
console.assert(arraysEqual(
    kLargestCategories(task2test1, 3),
    ["a", "b", "c"]
));

// task2test3 - all categories have same size. k = 0 
console.assert(arraysEqual(
    kLargestCategories(task2test1, 0),
    []
));
const task2test2 = [
    {id: 1, name: "a", categories: ["a"], parent: 5, size: 1},
    {id: 2, name: "b", categories: ["b"], parent: 4, size: 1},
    {id: 3, name: "c", categories: ["c"], parent: 3, size: 1},
    {id: 4, name: "d", categories: ["d"], parent: 2, size: 1},
    {id: 4, name: "d", categories: ["d"], parent: 2, size: 1},
    {id: 5, name: "e", categories: ["e"], parent: 1, size: 1},
    {id: 6, name: "f", categories: ["e"], parent: 1, size: 1},
    {id: 7, name: "g", categories: ["e"], parent: 1, size: 1}

];
// task2test4 - largest cat has latest letter. smallest cat has earliest letter. k = no. of categories  
console.assert(arraysEqual(
    kLargestCategories(task2test2, 7),
    ["e","d", "a", "b", "c"]
));

// task3test1. general test
const task3test1 = [
    { id: 1, name: "a.txt", categories: ["categoryA"], parent: -1, size: 100 },
    { id: 2, name: "b.txt", categories: ["categoryA"], parent: 1, size: 50 },
    { id: 3, name: "c.txt", categories: ["categoryA"], parent: -1, size: 75 },
    { id: 4, name: "d.txt", categories: ["categoryA"], parent: 1, size: 80 }
];

console.assert(largestFileSize(task3test1) === 230);

// task3test2. test with just 1 object
const task3test2 = [
    { id: 1, name: "a.txt", categories: ["categoryA"], parent: -1, size: 100 }
];
console.assert(largestFileSize(task3test2) === 100);

// task3test3. long chain of parents
const task3test3 = [
    { id: 1, name: "a.txt", categories: ["categoryA"], parent: -1, size: 100 },
    { id: 2, name: "b.txt", categories: ["categoryA"], parent: 1, size: 50 },
    { id: 3, name: "c.txt", categories: ["categoryA"], parent: 2, size: 75 },
    { id: 4, name: "d.txt", categories: ["categoryA"], parent: 3, size: 80 }
];

console.assert(largestFileSize(task3test3) === 305);

// task3test4. numerous children per parent
const task3test4 = [
    { id: 1, name: "a.txt", categories: ["categoryA"], parent: -1, size: 100 },
    { id: 2, name: "b.txt", categories: ["categoryA"], parent: 1, size: 50 },
    { id: 3, name: "c.txt", categories: ["categoryA"], parent: 1, size: 75 },
    { id: 4, name: "d.txt", categories: ["categoryA"], parent: 2, size: 80 },
    { id: 5, name: "e.txt", categories: ["categoryA"], parent: 2, size: 80 }
];

console.assert(largestFileSize(task3test4) === 385);

// task3test5. empty files 
const task3test5 = [];
console.assert(largestFileSize(task3test5) === 0);