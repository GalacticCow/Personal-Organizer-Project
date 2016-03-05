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
}

/**
 * Takes in the input-formatted (string) "tags".  Returns a list of indices into the master tags array,
 * adding new tags to the master tags array if they don't already exist.
 * @param tagsIn
 * @returns {Array}
 */
function getTagIndices(tagsIn) {
    //Get the array of tags instead of an input string.
    var tagsList = tagsIn.split(" ");
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

/**
 * Adds a new tag in the master tag array.
 * @param tagName
 */
function addNewTag(tagName) {
    masterTags.push(tagName);
}






