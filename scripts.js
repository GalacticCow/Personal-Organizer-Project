/**
 * Created by Matthew on 3/5/2016.
 */

//items is the master list of all items.  The only things that can change this are adding, removing, and loading.
var masterItems = [];
//tags is the master list of all tags.  The only things that can change this are adding, removing, and loading.
var masterTags = [];




/**
 * Item is a constructor for an Item object.  It's the basic organizational element.
 * Item(...) returns an item that does great awesome fun stuff.
 * @param name
 * @param description
 * @param tags
 * @param startTime
 * @param endTime
 * @constructor
 */
function Item(name, description, tags, startTime, endTime) {
    var that = this;
    that.name = name;
    that.description = description;
    that.tags = getTagIndices(tags);
    that.startTime = startTime;
    that.endTime = endTime;
    return that;
}

/**
 * Deletes an item from the master list according to its index
 * @param itemIndex
 */
function deleteItem(itemIndex) {
    masterItems.splice(itemIndex,1);
    //Now that the item master item list is changed, the displayed list is all off-by-one!  Fix this by updating the
    //current filtered list using the modified master item list.
    updateFilter();
}

/**
 * Takes in the input-formatted (string) "tags".  Returns a list of indices into the master tags array,
 * adding new tags to the master tags array if they don't already exist.
 * @param tagsIn
 * @returns {Array}
 */
function getTagIndices(tagsIn) {
    //Get the array of tags instead of an input string.
    var tagsList = cleanTags(tagsIn);
    var indices = [];
    //If the tag already exists, push its index.  Otherwise, add it as a new tag, then push its index.
    for(var i = 0; i < tagsList.length; i++) {
        //Edge case when there are no tags right now
        if(masterTags.length == 0) {
            addNewTag(tagsList[i]);
            indices.push(0);
        }
        else { //Normal case.
            for (var j = 0; j < masterTags.length; j++) {
                if (tagsList[i] == masterTags[j]) {
                    //The tag is there, give the index.
                    indices.push(j);
                    break; //no need to stay in the loop, you've already found the index.  Next tag!
                }
                if (j == masterTags.length - 1) {
                    //if this is the last tag in the master list, it's not here.  Add the tag!
                    addNewTag(tagsList[i]);
                    //Now, the function will loop through one more time, since tags is one element bigger.
                    //It will hit the first condition, and push the correct index to the indices array.
                }
            }
        }
    }
    return indices;
}

function updateFilter() {
    //TODO:  When inputs are up, make this draw inputs from the filter dialogue and call filterByTags and filterByTime.
    alert("Updating!  Updating!"); //TODO:  Get rid of this.
}

/**
 * Takes in a list of tags.  Returns an array of indices into the item array.
 * @param tagsIn
 */
function filterByTags(tagsIn) {
    var tagsList = cleanTags(tagsIn);
    var indices = [];
    //if you stupidly inputted no tags, return indices for everything.
    if(tagsList.length == 0) {
        for(var m = 0; m < masterItems.length; m++) {
            indices.push(m);
        }
        return indices;
    }
    //Check each item in masterItems to make sure it matches the tags.
    for(var i = 0; i < masterItems.length; i++) {
        var cItem = masterItems[i]; //current item
        //If it has no tags, just don't include it
        if(cItem.tags.length == 0) {
            continue; //without pushing to indices.  It's dead to us.
        }
        //for each item, if it doesn't match ALL of the tags, don't include it.
        var itMatches = true;
        for(var j = 0; j < tagsList.length; j++) {
            //for each tag being filtered for...
            var tagIsThere = false;
            for(var k = 0; k < cItem.tags.length; k++) {
                //for each tag in the item...! (this is a really ugly triple nested for loop, ick)
                if(masterTags[cItem.tags[k]] == tagsList[j]) {
                    tagIsThere = true;
                }
            }
            if(!tagIsThere) {
                itMatches = false; //never can become true again for this item.  Filtered out.
            }
        }
        //Finally, if it made it through all that checking, it's legit.  Matches all the tags.
        if(itMatches) {
            indices.push(i);  //Add the index of the item in the master array.
        }
    }
    return indices;
}

/**
 * Formats a raw tag input string, removing junk whitespace tags and splitting it into an array of strings.
 * @param tagsIn
 */
function cleanTags (tagsIn) {
    //Get the array of tags instead of an input string.
    var tempTagsList = tagsIn.split(" ");
    //Remove all junk "" elements, so it works correctly and handles whitespace fine.
    var tagsList = [];
    for(var n = 0; n < tempTagsList.length; n++) {
        if(tempTagsList[n] != "") {
            tagsList.push(tempTagsList[n]);
        }
    }
    return tagsList;
}

/**
 * Adds a new tag in the master tag array.
 * @param tagName
 */
function addNewTag(tagName) {
    masterTags.push(tagName);
}


//test FilterByTags.

//Add these test items w/ tags
masterItems.push(new Item("dog", "", "animal cute", "", ""));
masterItems.push(new Item("cat", "", "animal cute", "", ""));
masterItems.push(new Item("horse", "", "animal", "", ""));
masterItems.push(new Item("doll", "", "cute", "", ""));
masterItems.push(new Item("human", "", "animal sentient", "", ""));
masterItems.push(new Item("rock", "", "", "", ""));
masterItems.push(new Item("moon", "", "space", "", ""));
masterItems.push(new Item("alien", "", "space animal sentient", "", ""));
masterItems.push(new Item("alien dog", "", "space animal sentient cute", "", ""));
masterItems.push(new Item("robot", "", "sentient", "", ""));

var animals = filterByTags("animal");
console.log("ANIMALS:  ");
for(var i = 0; i < animals.length; i++) {
    console.log(masterItems[animals[i]].name + " ");
}

var sentients = filterByTags("   sentient ");
console.log("SENTIENTS:  ");
for(var j = 0; j < sentients.length; j++) {
    console.log(masterItems[sentients[j]].name + " ");
}

var cuteanimals = filterByTags("cute animal");
console.log("CUTE ANIMALS:   ");
for(var k = 0; k < cuteanimals.length; k++) {
    console.log(masterItems[cuteanimals[k]].name + " ");
}

var nothing = filterByTags("");
console.log("FORGOT TO INCLUDE A TAG:   ");
for(var l = 0; l < nothing.length; l++) {
    console.log(masterItems[nothing[l]].name + " ");
}

var invalid = filterByTags("truck");
console.log("TRUCKS (WHYYYYYY THERE ARE NO TRUCKS):    ");
for(var m = 0; m < invalid.length; m++) {
    console.log(masterItems[invalid[m]].name + " ");
}





